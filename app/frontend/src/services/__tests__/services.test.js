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
import { calcularIdade } from '../../utils/date.js';

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
  it('rejeita o login após 401 mesmo com credenciais válidas no cache local', async () => {
    const previousFetch = globalThis.fetch;
    const { authService, storage } = createServices();

    await storage.put('usuarios', {
      id: 'usr_cache',
      nomeCompleto: 'Gestor Cache',
      login: 'gestor-cache',
      perfil: PERFIS.GESTOR,
      senhaProvisoria: 'senha-local',
      ativo: true,
    });

    globalThis.fetch = async () => ({ ok: false, status: 401 });

    try {
      await assert.rejects(
        () => authService.login({ login: 'gestor-cache', senha: 'senha-local' }),
        (error) => error instanceof ServiceError
          && error.code === ERROR_CODES.INVALID_CREDENTIALS,
      );
    } finally {
      globalThis.fetch = previousFetch;
    }
  });

  it('autentica usuario criado localmente quando a API responde 401', async () => {
    const previousFetch = globalThis.fetch;
    const { authService, usuarioService } = createServices();

    await authService.login({ login: 'gestor', senha: '123456' });

    await usuarioService.criarUsuario({
      nomeCompleto: 'Cuidadora Local',
      login: 'cuidadora-local',
      perfil: PERFIS.CUIDADOR,
      senhaProvisoria: '123',
    });

    globalThis.fetch = async (url, options = {}) => {
      if (url.endsWith('/auth/login') && options.method === 'POST') {
        return { ok: false, status: 401 };
      }
      throw new TypeError(`Unexpected fetch: ${url}`);
    };

    try {
      const session = await authService.login({
        login: 'cuidadora-local',
        senha: '123',
      });

      assert.equal(session.user.login, 'cuidadora-local');
      assert.equal(session.user.perfil, PERFIS.CUIDADOR);
    } finally {
      globalThis.fetch = previousFetch;
    }
  });

  it('rejeita senha incorreta de usuario local pendente quando a API responde 401', async () => {
    const previousFetch = globalThis.fetch;
    const { authService, usuarioService } = createServices();

    await authService.login({ login: 'gestor', senha: '123456' });

    await usuarioService.criarUsuario({
      nomeCompleto: 'Cuidador Pendente',
      login: 'cuidador-pendente',
      perfil: PERFIS.CUIDADOR,
      senhaProvisoria: 'senha-correta',
    });

    globalThis.fetch = async (url, options = {}) => {
      if (url.endsWith('/auth/login') && options.method === 'POST') {
        return { ok: false, status: 401 };
      }
      throw new TypeError(`Unexpected fetch: ${url}`);
    };

    try {
      await assert.rejects(
        () => authService.login({
          login: 'cuidador-pendente',
          senha: 'senha-errada',
        }),
        (error) => error instanceof ServiceError
          && error.code === ERROR_CODES.INVALID_CREDENTIALS,
      );
    } finally {
      globalThis.fetch = previousFetch;
    }
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
  it('calcula a idade sem antecipar o aniversário por conversão UTC', () => {
    const hoje = new Date(2026, 5, 14);

    assert.equal(calcularIdade('2000-06-14', hoje), '26 anos');
    assert.equal(calcularIdade('2000-06-15', hoje), '25 anos');
  });

  it('retorna "—" para dataNascimento vazia ou nula', () => {
    assert.equal(calcularIdade(''), '—');
    assert.equal(calcularIdade(null), '—');
    assert.equal(calcularIdade(undefined), '—');
  });

  it('retorna "—" para data inválida', () => {
    assert.equal(calcularIdade('nao-e-uma-data'), '—');
    assert.equal(calcularIdade('2026-02-30'), '—');
  });

  it('não retorna undefined (bug original)', () => {
    const resultado = calcularIdade('1960-06-01');
    assert.notEqual(resultado, 'undefined anos');
    assert.notEqual(resultado, undefined);
  });
});

describe('Regressão PR #43 — sincronização com o Backend Mock', () => {
  it('detecta resposta HTTP de erro ao sincronizar usuário e mantém o registro local', async () => {
    const previousFetch = globalThis.fetch;
    const { authService, storage, usuarioService } = createServices();
    await authService.login({ login: 'gestor', senha: '123456' });

    let responseChecked = false;
    globalThis.fetch = async () => ({
      get ok() {
        responseChecked = true;
        return false;
      },
      status: 500,
    });

    try {
      const usuario = await usuarioService.criarUsuario({
        nomeCompleto: 'Usuário Local',
        login: 'usuario-local',
        perfil: PERFIS.CUIDADOR,
        senhaProvisoria: '123',
      });

      assert.equal(responseChecked, true);
      assert.equal((await storage.get('usuarios', usuario.id)).login, 'usuario-local');
    } finally {
      globalThis.fetch = previousFetch;
    }
  });

  it('detecta resposta HTTP de erro ao sincronizar residente e mantém o registro local', async () => {
    const previousFetch = globalThis.fetch;
    const { authService, residenteService, storage } = createServices();
    await authService.login({ login: 'gestor', senha: '123456' });

    let responseChecked = false;
    globalThis.fetch = async () => ({
      get ok() {
        responseChecked = true;
        return false;
      },
      status: 503,
    });

    try {
      const residente = await residenteService.criarResidente({
        nomeCompleto: 'Residente Local',
        dataNascimento: '1940-06-14',
        cpf: '55566677788',
        grauDependencia: 'II',
        responsavelLegal: 'Responsável Local',
      });

      assert.equal(responseChecked, true);
      assert.equal((await storage.get('residentes', residente.id)).cpf, '55566677788');
    } finally {
      globalThis.fetch = previousFetch;
    }
  });
});

describe('Regressao Sprint 2 - integracao entre cadastro, login e backend', () => {
  it('autentica usuario Equipe recem-cadastrado sem duplicar o login local', async () => {
    const previousFetch = globalThis.fetch;
    const { authService, storage, usuarioService } = createServices();
    const gestor = { id: 'usr_gestor', perfil: PERFIS.GESTOR };

    globalThis.fetch = async (url, options = {}) => {
      if (url.includes('/usuarios?login=')) {
        return { ok: true, status: 200, json: async () => [] };
      }

      if (url.endsWith('/usuarios') && options.method === 'POST') {
        const payload = JSON.parse(options.body);
        return {
          ok: true,
          status: 201,
          json: async () => ({ ...payload, id: 42 }),
        };
      }

      if (url.endsWith('/auth/login') && options.method === 'POST') {
        return {
          ok: true,
          status: 200,
          json: async () => ({
            token: 'mock-token-42',
            user: {
              id: 42,
              nome: 'Equipe Teste',
              login: 'equipe-teste',
              perfil: 'multidisciplinar',
            },
          }),
        };
      }

      throw new TypeError(`Unexpected fetch: ${url}`);
    };

    try {
      const createdUser = await usuarioService.criarUsuario({
        nomeCompleto: 'Equipe Teste',
        login: 'equipe-teste',
        perfil: 'Equipe',
        senhaProvisoria: 'teste123',
      }, gestor);

      const session = await authService.login({
        login: 'equipe-teste',
        senha: 'teste123',
      });
      const cachedUser = await storage.findBy('usuarios', 'login', 'equipe-teste');
      const users = await storage.list('usuarios');

      assert.equal(session.user.perfil, PERFIS.MULTIDISCIPLINAR);
      assert.equal(cachedUser.id, createdUser.id);
      assert.equal(cachedUser.remoteId, '42');
      assert.equal(users.length, 1);
    } finally {
      globalThis.fetch = previousFetch;
    }
  });

  it('rejeita login que ja existe no backend antes de criar localmente', async () => {
    const previousFetch = globalThis.fetch;
    const { storage, usuarioService } = createServices();
    const gestor = { id: 'usr_gestor', perfil: PERFIS.GESTOR };

    globalThis.fetch = async (url) => {
      if (url.includes('/usuarios?login=')) {
        return {
          ok: true,
          status: 200,
          json: async () => [{ id: 7, login: 'existente' }],
        };
      }
      throw new TypeError(`Unexpected fetch: ${url}`);
    };

    try {
      await assert.rejects(
        () => usuarioService.criarUsuario({
          nomeCompleto: 'Usuario Duplicado',
          login: 'existente',
          perfil: PERFIS.CUIDADOR,
          senhaProvisoria: '123456',
        }, gestor),
        (error) => error instanceof ServiceError
          && error.code === ERROR_CODES.DUPLICATE_LOGIN,
      );
      assert.equal((await storage.list('usuarios')).length, 0);
    } finally {
      globalThis.fetch = previousFetch;
    }
  });

  it('mescla usuarios e residentes remotos preservando IDs locais', async () => {
    const previousFetch = globalThis.fetch;
    const { residenteService, storage, usuarioService } = createServices();
    const gestor = { id: 'usr_gestor', perfil: PERFIS.GESTOR };

    await storage.put('usuarios', {
      id: 'usr_local',
      login: 'equipe-local',
      nomeCompleto: 'Nome Local',
      perfil: PERFIS.MULTIDISCIPLINAR,
      ativo: true,
    });
    await storage.put('residentes', {
      id: 'res_local',
      cpf: '12345678900',
      nomeCompleto: 'Residente Local',
      isAtivo: true,
    });

    globalThis.fetch = async (url) => {
      if (url.endsWith('/usuarios')) {
        return {
          ok: true,
          status: 200,
          json: async () => [{
            id: 12,
            nome: 'Equipe Atualizada',
            login: 'equipe-local',
            perfil: 'multidisciplinar',
            senha: '123456',
          }],
        };
      }

      if (url.endsWith('/residentes')) {
        return {
          ok: true,
          status: 200,
          json: async () => [{
            id: 21,
            nome: 'Residente Atualizado',
            cpf: '12345678900',
            dataNascimento: '1940-01-01',
            grauDependencia: 'II',
            responsavelLegal: 'Responsavel',
            isAtivo: true,
          }],
        };
      }

      throw new TypeError(`Unexpected fetch: ${url}`);
    };

    try {
      const users = await usuarioService.listarUsuarios(gestor);
      const residents = await residenteService.listarResidentes(gestor);

      assert.equal(users.length, 1);
      assert.equal(users[0].id, 'usr_local');
      assert.equal(users[0].remoteId, '12');
      assert.equal(users[0].nomeCompleto, 'Equipe Atualizada');

      assert.equal(residents.length, 1);
      assert.equal(residents[0].id, 'res_local');
      assert.equal(residents[0].remoteId, '21');
      assert.equal(residents[0].nomeCompleto, 'Residente Atualizado');
    } finally {
      globalThis.fetch = previousFetch;
    }
  });
});
