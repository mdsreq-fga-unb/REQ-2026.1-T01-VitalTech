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

