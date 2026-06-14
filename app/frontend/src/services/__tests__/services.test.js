import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Mock global fetch para isolar os testes unitários de rede e mock server ativo
globalThis.fetch = async () => {
  throw new TypeError('fetch failed (mocked offline for unit tests)');
};

import { createAuthService } from '../authService.js';
import { ERROR_CODES, ServiceError } from '../errors.js';
import { PERFIS } from '../permissions.js';
import { createMemorySessionStorage } from '../sessionStorage.js';
import { createMemoryStorage } from '../storage.js';
import { createResidenteService } from '../residenteService.js';
import { createUsuarioService } from '../usuarioService.js';

function createServices() {
  const storage = createMemoryStorage();
  const sessionStorage = createMemorySessionStorage();
  const authService = createAuthService({ storage, sessionStorage });
  const usuarioService = createUsuarioService({
    storage,
    getCurrentUser: () => authService.getCurrentUser(),
  });
  const residenteService = createResidenteService({
    storage,
    getCurrentUser: () => authService.getCurrentUser(),
  });

  return { authService, residenteService, storage, usuarioService };
}

describe('Sprint 2 services', () => {
  it('authenticates a seeded gestor user and exposes permissions', async () => {
    const { authService } = createServices();

    const session = await authService.login({ login: 'gestor', senha: '123456' });

    assert.equal(session.user.perfil, PERFIS.GESTOR);
    assert.ok(session.user.permissoes.includes('usuarios:create'));
    assert.equal(await authService.isAuthenticated(), true);
  });

  it('rejects invalid credentials with a generic error', async () => {
    const { authService } = createServices();

    await assert.rejects(
      () => authService.login({ login: 'gestor', senha: 'senha-errada' }),
      (error) => error instanceof ServiceError
        && error.code === ERROR_CODES.INVALID_CREDENTIALS
        && error.message === 'Login ou senha invalidos.',
    );
  });

  it('creates users with traceability metadata and rejects duplicate login', async () => {
    const { authService, usuarioService } = createServices();
    await authService.login({ login: 'gestor', senha: '123456' });

    const usuario = await usuarioService.criarUsuario({
      nomeCompleto: 'Ana Cuidadora',
      login: 'ana',
      perfil: PERFIS.CUIDADOR,
      senhaProvisoria: '123',
    });

    assert.equal(usuario.login, 'ana');
    assert.equal(usuario.createdBy, 'usr_gestor');
    assert.ok(usuario.createdAt);

    await assert.rejects(
      () => usuarioService.criarUsuario({
        nomeCompleto: 'Outra Ana',
        login: 'ana',
        perfil: PERFIS.CUIDADOR,
        senhaProvisoria: '123',
      }),
      (error) => error instanceof ServiceError
        && error.code === ERROR_CODES.DUPLICATE_LOGIN,
    );
  });

  it('creates residents with required fields, isAtivo and traceability metadata', async () => {
    const { authService, residenteService } = createServices();
    await authService.login({ login: 'gestor', senha: '123456' });

    const residente = await residenteService.criarResidente({
      nomeCompleto: 'Maria Oliveira',
      dataNascimento: '1942-08-12',
      cpf: '12345678900',
      grauDependencia: 'II',
      responsavelLegal: 'Joao Oliveira',
      setor: 'A',
      quarto: '12',
    });

    assert.equal(residente.isAtivo, true);
    assert.equal(residente.createdBy, 'usr_gestor');

    const residentes = await residenteService.listarResidentes();
    assert.equal(residentes.length, 1);
  });

  it('blocks resident creation with missing required fields', async () => {
    const { authService, residenteService } = createServices();
    await authService.login({ login: 'gestor', senha: '123456' });

    await assert.rejects(
      () => residenteService.criarResidente({
        nomeCompleto: 'Maria Oliveira',
        dataNascimento: '',
        cpf: '12345678900',
        grauDependencia: 'II',
        responsavelLegal: 'Joao Oliveira',
      }),
      (error) => error instanceof ServiceError
        && error.code === ERROR_CODES.REQUIRED_FIELDS
        && error.details.missingFields.includes('dataNascimento'),
    );
  });

  it('clears session on logout', async () => {
    const { authService } = createServices();
    await authService.login({ login: 'gestor', senha: '123456' });

    await authService.logout();

    assert.equal(await authService.isAuthenticated(), false);
    assert.equal(await authService.getCurrentUser(), null);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Testes de regressão — bugs corrigidos no review do PR #43 (menali17)
// ─────────────────────────────────────────────────────────────────────────────

describe('Regressão PR #43 — Bug 1: fallback local não deve ocorrer após 401 da API', () => {
  it('rejeita credenciais erradas mesmo com usuario existente no cache local (API offline simulada)', async () => {
    // Simula API offline (fetch já lança erro no topo do arquivo)
    const { authService } = createServices();

    // Tenta logar com senha errada — deve rejeitar mesmo com o seed local existindo
    await assert.rejects(
      () => authService.login({ login: 'gestor', senha: 'senha-incorreta' }),
      (error) => error instanceof ServiceError
        && error.code === ERROR_CODES.INVALID_CREDENTIALS,
    );
  });

  it('autentica normalmente quando senha bate com o cache local e API está offline', async () => {
    const { authService } = createServices();
    // API offline → deve autenticar pelo seed local com senha correta
    const session = await authService.login({ login: 'gestor', senha: '123456' });
    assert.ok(session.token);
    assert.equal(session.user.perfil, PERFIS.GESTOR);
  });
});

describe('Regressão PR #43 — Bug 3: campos foto, especialidade e registro do usuário', () => {
  it('persiste foto, especialidade e registro no objeto do usuario criado', async () => {
    const { authService, usuarioService } = createServices();
    await authService.login({ login: 'gestor', senha: '123456' });

    const usuario = await usuarioService.criarUsuario({
      nomeCompleto: 'Dr. Rodrigo',
      login: 'rodrigo',
      perfil: PERFIS.MULTIDISCIPLINAR,
      senhaProvisoria: 'abc123',
      especialidade: 'Fisioterapia',
      registro: 'CREFITO-12345',
      foto: 'data:image/png;base64,AAAA',
    });

    assert.equal(usuario.especialidade, 'Fisioterapia');
    assert.equal(usuario.registro, 'CREFITO-12345');
    assert.equal(usuario.foto, 'data:image/png;base64,AAAA');
  });

  it('persiste usuario sem campos opcionais sem quebrar', async () => {
    const { authService, usuarioService } = createServices();
    await authService.login({ login: 'gestor', senha: '123456' });

    const usuario = await usuarioService.criarUsuario({
      nomeCompleto: 'Simples',
      login: 'simples',
      perfil: PERFIS.CUIDADOR,
      senhaProvisoria: '123',
    });

    assert.equal(usuario.especialidade, '');
    assert.equal(usuario.registro, '');
    assert.equal(usuario.foto, null);
  });
});

describe('Regressão PR #43 — Bug 4: campo foto do residente', () => {
  it('persiste foto no objeto do residente criado', async () => {
    const { authService, residenteService } = createServices();
    await authService.login({ login: 'gestor', senha: '123456' });

    const residente = await residenteService.criarResidente({
      nomeCompleto: 'Dona Rosa',
      dataNascimento: '1945-03-10',
      cpf: '98765432100',
      grauDependencia: 'Dependente total',
      responsavelLegal: 'Carlos Rosa',
      foto: 'data:image/jpeg;base64,BBBB',
    });

    assert.equal(residente.foto, 'data:image/jpeg;base64,BBBB');
  });

  it('persiste residente sem foto sem quebrar', async () => {
    const { authService, residenteService } = createServices();
    await authService.login({ login: 'gestor', senha: '123456' });

    const residente = await residenteService.criarResidente({
      nomeCompleto: 'Seu Mané',
      dataNascimento: '1938-11-20',
      cpf: '11122233344',
      grauDependencia: 'Independente',
      responsavelLegal: 'Filho Mané',
    });

    assert.equal(residente.foto, null);
  });
});

describe('Regressão PR #43 — Bug 5: cálculo de idade a partir de dataNascimento', () => {
  // Função extraída da ListaResidentes.vue para teste isolado
  function calcularIdade(dataNascimento) {
    if (!dataNascimento) return '—';
    const nascimento = new Date(dataNascimento);
    if (isNaN(nascimento)) return '—';
    const hoje = new Date();
    let anos = hoje.getFullYear() - nascimento.getFullYear();
    const passouAniversario =
      hoje.getMonth() > nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() >= nascimento.getDate());
    if (!passouAniversario) anos--;
    return `${anos} anos`;
  }

  it('calcula corretamente a idade para data válida', () => {
    // Pessoa que já fez aniversário este ano (data fixa no passado distante)
    const resultado = calcularIdade('1950-01-01');
    assert.match(resultado, /^\d+ anos$/);
    const anos = parseInt(resultado);
    assert.ok(anos >= 74, `Esperava pelo menos 74 anos, recebeu: ${anos}`);
  });

  it('retorna "—" para dataNascimento vazia ou nula', () => {
    assert.equal(calcularIdade(''), '—');
    assert.equal(calcularIdade(null), '—');
    assert.equal(calcularIdade(undefined), '—');
  });

  it('retorna "—" para data inválida', () => {
    assert.equal(calcularIdade('nao-e-uma-data'), '—');
  });

  it('não retorna undefined (bug original)', () => {
    const resultado = calcularIdade('1960-06-01');
    assert.notEqual(resultado, 'undefined anos');
    assert.notEqual(resultado, undefined);
  });
});


