import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

// Mock global fetch para isolar os testes unitários de rede e mock server ativo
globalThis.fetch = async () => {
  throw new TypeError('fetch failed (mocked offline for unit tests)');
};

import { createAuthService } from '../authService.js';
import { createAssistenciaService } from '../assistenciaService.js';
import { ERROR_CODES, ServiceError } from '../errors.js';
import { PERFIS } from '../permissions.js';
import { createMemorySessionStorage } from '../sessionStorage.js';
import { createMemoryStorage } from '../storage.js';
import { createResidenteService } from '../residenteService.js';
import { createUsuarioService } from '../usuarioService.js';
import { calcularIdade } from '../../utils/date.js';

function createServices({ getNow } = {}) {
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
  const assistenciaService = createAssistenciaService({
    storage,
    getCurrentUser: () => authService.getCurrentUser(),
    ...(getNow ? { getNow } : {}),
  });

  return { assistenciaService, authService, residenteService, storage, usuarioService };
}

const CUIDADOR_ATOR = {
  id: 'usr_cuidador',
  nomeCompleto: 'Cuidador VitalTech',
  perfil: PERFIS.CUIDADOR,
};

const EQUIPE_ATOR = {
  id: 'usr_equipe',
  nomeCompleto: 'Equipe Multidisciplinar',
  perfil: PERFIS.MULTIDISCIPLINAR,
};

async function seedResidente(storage, overrides = {}) {
  const residente = {
    id: 'res_1',
    nomeCompleto: 'Dona Maria',
    dataNascimento: '1940-05-10',
    cpf: '12345678900',
    grauDependencia: 'II',
    responsavelLegal: 'Jose Maria',
    isAtivo: true,
    ...overrides,
  };

  await storage.put('residentes', residente);
  return residente;
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

describe('Sprint 3 services - persistencia dos registros assistenciais', () => {
  it('persiste sinais vitais com residente, data, horario e responsavel automaticos', async () => {
    const { assistenciaService, storage } = createServices({
      getNow: () => new Date(2026, 5, 14, 12, 34, 0),
    });
    await seedResidente(storage);

    const registro = await assistenciaService.registrarSinaisVitais({
      residenteId: 'res_1',
      pressaoArterial: '120/80',
      frequenciaCardiaca: '72',
      temperatura: '36.5',
      glicemia: '110',
      observacoes: 'Paciente estavel',
    }, CUIDADOR_ATOR);

    assert.equal(registro.tipoRegistro, 'sinais_vitais');
    assert.equal(registro.residenteId, 'res_1');
    assert.equal(registro.data, '2026-06-14');
    assert.equal(registro.horario, '12:34');
    assert.equal(registro.responsavelId, 'usr_cuidador');
    assert.equal(registro.responsavelNome, 'Cuidador VitalTech');
    assert.equal(registro.pressaoSistolica, 120);
    assert.equal(registro.pressaoDiastolica, 80);
    assert.equal(registro.foraDosParametros, false);

    assert.equal((await storage.get('sinaisVitais', registro.id)).id, registro.id);
    assert.equal((await storage.get('residentes', 'res_1')).nomeCompleto, 'Dona Maria');
  });

  it('persiste rotina assistencial com metadados e campos obrigatorios da US05', async () => {
    const { assistenciaService, storage } = createServices({
      getNow: () => new Date(2026, 5, 14, 13, 15, 0),
    });
    await seedResidente(storage);

    const registro = await assistenciaService.registrarRotinaAssistencial({
      residenteId: 'res_1',
      tipoRefeicao: 'almoco',
      percentualAceitacao: '80',
      banho: 'realizado',
      troca: 'realizada',
      cuidadosBucais: 'realizados',
    }, CUIDADOR_ATOR);

    assert.equal(registro.tipoRegistro, 'rotina_assistencial');
    assert.equal(registro.residenteId, 'res_1');
    assert.equal(registro.percentualAceitacao, 80);
    assert.equal(registro.data, '2026-06-14');
    assert.equal(registro.horario, '13:15');
    assert.equal(registro.responsavelId, 'usr_cuidador');
    assert.equal((await storage.get('rotinasAssistenciais', registro.id)).id, registro.id);
  });

  it('rejeita pressao arterial sem valor diastolico', async () => {
    const { assistenciaService, storage } = createServices();
    await seedResidente(storage);

    await assert.rejects(
      () => assistenciaService.registrarSinaisVitais({
        residenteId: 'res_1',
        pressaoArterial: '120',
        frequenciaCardiaca: '72',
        temperatura: '36.5',
        glicemia: '110',
      }, CUIDADOR_ATOR),
      (error) => error instanceof ServiceError
        && error.code === ERROR_CODES.INVALID_VALUES
        && error.details.field === 'pressaoArterial',
    );

    assert.equal((await storage.list('sinaisVitais')).length, 0);
  });

  it('bloqueia persistencia quando campos obrigatorios estao ausentes', async () => {
    const { assistenciaService, storage } = createServices();
    await seedResidente(storage);

    await assert.rejects(
      () => assistenciaService.registrarSinaisVitais({
        residenteId: 'res_1',
        pressaoArterial: '120/80',
        frequenciaCardiaca: '72',
        temperatura: '36.5',
        glicemia: '',
      }, CUIDADOR_ATOR),
      (error) => error instanceof ServiceError
        && error.code === ERROR_CODES.REQUIRED_FIELDS
        && error.details.missingFields.includes('glicemia'),
    );

    assert.equal((await storage.list('sinaisVitais')).length, 0);
  });

  it('identifica valores fora da faixa clinica e exige confirmacao antes de salvar', async () => {
    const { assistenciaService, storage } = createServices();
    await seedResidente(storage);

    const payload = {
      residenteId: 'res_1',
      pressaoArterial: '120/80',
      frequenciaCardiaca: '72',
      temperatura: '43',
      glicemia: '110',
    };

    await assert.rejects(
      () => assistenciaService.registrarSinaisVitais(payload, CUIDADOR_ATOR),
      (error) => error instanceof ServiceError
        && error.code === ERROR_CODES.VALUES_OUT_OF_RANGE
        && error.details.camposForaDoParametro.some((campo) => campo.campo === 'temperatura'),
    );
    assert.equal((await storage.list('sinaisVitais')).length, 0);

    const registro = await assistenciaService.registrarSinaisVitais({
      ...payload,
      confirmarForaDoParametro: true,
    }, CUIDADOR_ATOR);

    assert.equal(registro.foraDosParametros, true);
    assert.ok(registro.camposForaDoParametro.some((campo) => campo.campo === 'temperatura'));
    assert.equal((await storage.list('sinaisVitais')).length, 1);
  });

  it('lista historico por residente sem misturar registros de outros residentes', async () => {
    const moments = [
      new Date(2026, 5, 14, 8, 0, 0),
      new Date(2026, 5, 14, 9, 0, 0),
      new Date(2026, 5, 14, 10, 0, 0),
    ];
    const { assistenciaService, storage } = createServices({
      getNow: () => moments.shift(),
    });
    await seedResidente(storage, { id: 'res_1', cpf: '11111111111' });
    await seedResidente(storage, { id: 'res_2', cpf: '22222222222', nomeCompleto: 'Seu Joao' });

    await assistenciaService.registrarSinaisVitais({
      residenteId: 'res_1',
      pressaoArterial: '118/78',
      frequenciaCardiaca: '70',
      temperatura: '36.2',
      glicemia: '100',
    }, CUIDADOR_ATOR);
    await assistenciaService.registrarRotinaAssistencial({
      residenteId: 'res_2',
      tipoRefeicao: 'cafe',
      percentualAceitacao: '90',
      banho: 'nao se aplica',
      troca: 'realizada',
      cuidadosBucais: 'realizados',
    }, CUIDADOR_ATOR);
    await assistenciaService.registrarRotinaAssistencial({
      residenteId: 'res_1',
      tipoRefeicao: 'jantar',
      percentualAceitacao: '60',
      banho: 'realizado',
      troca: 'realizada',
      cuidadosBucais: 'realizados',
    }, CUIDADOR_ATOR);

    const historico = await assistenciaService
      .listarRegistrosAssistenciaisPorResidente('res_1', CUIDADOR_ATOR);

    assert.equal(historico.length, 2);
    assert.ok(historico.every((registro) => registro.residenteId === 'res_1'));
    assert.equal(historico[0].tipoRegistro, 'rotina_assistencial');
    assert.equal(historico[1].tipoRegistro, 'sinais_vitais');
  });

  it('respeita permissoes de registro e permite consulta pela equipe multidisciplinar', async () => {
    const { assistenciaService, storage } = createServices();
    await seedResidente(storage);

    await assert.rejects(
      () => assistenciaService.registrarRotinaAssistencial({
        residenteId: 'res_1',
        tipoRefeicao: 'almoco',
        percentualAceitacao: '80',
        banho: 'realizado',
        troca: 'realizada',
        cuidadosBucais: 'realizados',
      }, EQUIPE_ATOR),
      (error) => error instanceof ServiceError
        && error.code === ERROR_CODES.FORBIDDEN,
    );

    await assistenciaService.registrarRotinaAssistencial({
      residenteId: 'res_1',
      tipoRefeicao: 'almoco',
      percentualAceitacao: '80',
      banho: 'realizado',
      troca: 'realizada',
      cuidadosBucais: 'realizados',
    }, CUIDADOR_ATOR);

    const historico = await assistenciaService
      .listarRegistrosAssistenciaisPorResidente('res_1', EQUIPE_ATOR);

    assert.equal(historico.length, 1);
  });

  it('sincroniza registros com o Backend Mock quando a API esta disponivel', async () => {
    const previousFetch = globalThis.fetch;
    const { assistenciaService, storage } = createServices();
    await seedResidente(storage);

    let postedPayload = null;
    globalThis.fetch = async (url, options = {}) => {
      if (url.endsWith('/sinaisVitais') && options.method === 'POST') {
        postedPayload = JSON.parse(options.body);
        return {
          ok: true,
          status: 201,
          json: async () => ({ ...postedPayload, id: 77 }),
        };
      }

      throw new TypeError(`Unexpected fetch: ${url}`);
    };

    try {
      const registro = await assistenciaService.registrarSinaisVitais({
        residenteId: 'res_1',
        pressaoArterial: '120/80',
        frequenciaCardiaca: '72',
        temperatura: '36.5',
        glicemia: '110',
      }, CUIDADOR_ATOR);

      assert.equal(registro.remoteId, '77');
      assert.equal(postedPayload.residenteId, 'res_1');
      assert.equal(postedPayload.responsavelId, 'usr_cuidador');
      assert.equal(postedPayload.id, undefined);
      assert.equal((await storage.get('sinaisVitais', registro.id)).remoteId, '77');
    } finally {
      globalThis.fetch = previousFetch;
    }
  });

  describe('US06 - Administracao de Medicamentos', () => {
    it('CA06.1 - salva medicamento administrado com horario corretamente', async () => {
      const { assistenciaService, storage } = createServices();
      await seedResidente(storage);

      const payload = {
        residenteId: 'res_1',
        registros: [
          {
            nome: 'Paracetamol 500mg',
            status: 'administrado',
            horarioExato: '08:00',
          },
        ],
      };

      const result = await assistenciaService.registrarMedicamentos(payload, CUIDADOR_ATOR);
      assert.ok(result.id);
      assert.equal(result.tipoRegistro, 'Medicamentos');
      assert.equal(result.residenteId, 'res_1');
      assert.equal(result.registros.length, 1);
      assert.equal(result.registros[0].nome, 'Paracetamol 500mg');
      assert.equal(result.registros[0].status, 'administrado');
      assert.equal(result.registros[0].horarioExato, '08:00');

      // RNF06/RNF07 - Rastreabilidade
      assert.equal(result.responsavelId, 'usr_cuidador');
      assert.ok(result.createdAt);
      assert.ok(result.data);
      assert.ok(result.horario);
    });

    it('CA06.2 - salva medicamento nao administrado com motivo corretamente', async () => {
      const { assistenciaService, storage } = createServices();
      await seedResidente(storage);

      const payload = {
        residenteId: 'res_1',
        registros: [
          {
            nome: 'Losartana 50mg',
            status: 'nao_administrado',
            motivo: 'Residente recusou e cuspiu o comprimido',
          },
        ],
      };

      const result = await assistenciaService.registrarMedicamentos(payload, CUIDADOR_ATOR);
      assert.equal(result.registros[0].status, 'nao_administrado');
      assert.equal(result.registros[0].motivo, 'Residente recusou e cuspiu o comprimido');
      assert.equal(result.registros[0].horarioExato, '');
    });

    it('RN-08 - rejeita medicamento administrado sem horario exato', async () => {
      const { assistenciaService, storage } = createServices();
      await seedResidente(storage);

      const payload = {
        residenteId: 'res_1',
        registros: [
          {
            nome: 'Dipirona Gotas',
            status: 'administrado',
            horarioExato: '', // Faltando horario
          },
        ],
      };

      await assert.rejects(
        () => assistenciaService.registrarMedicamentos(payload, CUIDADOR_ATOR),
        (error) => error instanceof ServiceError
          && error.code === ERROR_CODES.MISSING_MEDICATION_TIME
          && error.details.nome === 'Dipirona Gotas'
      );
    });

    it('CA06.2 - rejeita nao administracao sem motivo', async () => {
      const { assistenciaService, storage } = createServices();
      await seedResidente(storage);

      const payload = {
        residenteId: 'res_1',
        registros: [
          {
            nome: 'Sinvastatina 20mg',
            status: 'nao_administrado',
            motivo: '   ', // Vazio
          },
        ],
      };

      await assert.rejects(
        () => assistenciaService.registrarMedicamentos(payload, CUIDADOR_ATOR),
        (error) => error instanceof ServiceError
          && error.code === ERROR_CODES.MISSING_MEDICATION_REASON
      );
    });

    it('RN-05 - rejeita registros com campos obrigatorios vazios (nome, status)', async () => {
      const { assistenciaService, storage } = createServices();
      await seedResidente(storage);

      // Sem nome
      await assert.rejects(
        () => assistenciaService.registrarMedicamentos({
          residenteId: 'res_1',
          registros: [{ nome: '', status: 'administrado', horarioExato: '10:00' }],
        }, CUIDADOR_ATOR),
        (error) => error instanceof ServiceError && error.code === ERROR_CODES.REQUIRED_FIELDS
      );

      // Sem status
      await assert.rejects(
        () => assistenciaService.registrarMedicamentos({
          residenteId: 'res_1',
          registros: [{ nome: 'Med', status: '', horarioExato: '10:00' }],
        }, CUIDADOR_ATOR),
        (error) => error instanceof ServiceError && error.code === ERROR_CODES.REQUIRED_FIELDS
      );

      // Sem nenhum registro na lista
      await assert.rejects(
        () => assistenciaService.registrarMedicamentos({
          residenteId: 'res_1',
          registros: [],
        }, CUIDADOR_ATOR),
        (error) => error instanceof ServiceError && error.code === ERROR_CODES.REQUIRED_FIELDS
      );
    });

    it('RNF12 - impede perfil multidisciplinar de registrar medicamentos', async () => {
      const { assistenciaService, storage } = createServices();
      await seedResidente(storage);

      const MULTI_ATOR = { id: 'usr_psico', nomeCompleto: 'Psicologo', perfil: 'MULTIDISCIPLINAR' };

      const payload = {
        residenteId: 'res_1',
        registros: [{ nome: 'Xarope', status: 'administrado', horarioExato: '12:00' }],
      };

      await assert.rejects(
        () => assistenciaService.registrarMedicamentos(payload, MULTI_ATOR),
        (error) => error instanceof ServiceError && error.code === ERROR_CODES.FORBIDDEN
      );
    });

    it('RNF15/RNF01 - registro salvo aparece no historico do residente', async () => {
      const { assistenciaService, storage } = createServices();
      await seedResidente(storage);

      const payload = {
        residenteId: 'res_1',
        registros: [{ nome: 'Vitamina C', status: 'administrado', horarioExato: '09:00' }],
      };

      await assistenciaService.registrarMedicamentos(payload, CUIDADOR_ATOR);

      const historico = await assistenciaService.listarHistoricoPorResidente('res_1', CUIDADOR_ATOR);
      assert.equal(historico.length, 1);
      assert.equal(historico[0].tipoRegistro, 'Medicamentos');
      assert.equal(historico[0].registros[0].nome, 'Vitamina C');
    });
  });
});
