import { ERROR_CODES, ServiceError } from './errors.js';
import { getPermissoesPorPerfil, PERFIS } from './permissions.js';
import { defaultSessionStorage } from './sessionStorage.js';
import { defaultStorage } from './storage.js';
import { generateId, normalizeLogin, nowIso } from './validation.js';

const SESSION_TTL_MS = 15 * 60 * 1000;

const DEFAULT_USERS = [
  {
    id: 'usr_gestor',
    nomeCompleto: 'Gestor VitalTech',
    login: 'gestor',
    perfil: PERFIS.GESTOR,
    senhaProvisoria: '123',
    ativo: true,
    createdAt: '2026-05-17T00:00:00.000Z',
    createdBy: 'system',
  },
  {
    id: 'usr_cuidador',
    nomeCompleto: 'Cuidador VitalTech',
    login: 'cuidador',
    perfil: PERFIS.CUIDADOR,
    senhaProvisoria: '123',
    ativo: true,
    createdAt: '2026-05-17T00:00:00.000Z',
    createdBy: 'system',
  },
  {
    id: 'usr_multidisciplinar',
    nomeCompleto: 'Equipe Multidisciplinar',
    login: 'multidisciplinar',
    perfil: PERFIS.MULTIDISCIPLINAR,
    senhaProvisoria: '123',
    ativo: true,
    createdAt: '2026-05-17T00:00:00.000Z',
    createdBy: 'system',
  },
];

function sanitizeUser(user) {
  return {
    id: user.id,
    nomeCompleto: user.nomeCompleto,
    login: user.login,
    perfil: user.perfil,
    permissoes: getPermissoesPorPerfil(user.perfil),
  };
}

export function createAuthService({
  storage = defaultStorage,
  sessionStorage = defaultSessionStorage,
  sessionTtlMs = SESSION_TTL_MS,
} = {}) {
  async function seedDefaultUsers() {
    const users = await storage.list('usuarios');

    if (users.length > 0) return;

    await Promise.all(DEFAULT_USERS.map((user) => storage.put('usuarios', user)));
  }

  async function getValidSession() {
    const session = await sessionStorage.get();

    if (!session) return null;

    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      await sessionStorage.clear();
      return null;
    }

    return session;
  }

  return {
    async login({ login, senha }) {
      await seedDefaultUsers();

      const normalizedLogin = normalizeLogin(login);
      const user = await storage.findBy('usuarios', 'login', normalizedLogin);

      if (!user || !user.ativo || user.senhaProvisoria !== senha) {
        throw new ServiceError(
          ERROR_CODES.INVALID_CREDENTIALS,
          'Login ou senha invalidos.',
        );
      }

      const safeUser = sanitizeUser(user);
      const session = {
        token: generateId('session'),
        user: safeUser,
        authenticatedAt: nowIso(),
        expiresAt: new Date(Date.now() + sessionTtlMs).toISOString(),
      };

      await sessionStorage.set(session);
      return session;
    },

    async logout() {
      await sessionStorage.clear();
      return { loggedOut: true };
    },

    async getCurrentSession() {
      return getValidSession();
    },

    async getCurrentUser() {
      return (await getValidSession())?.user ?? null;
    },

    async isAuthenticated() {
      return Boolean(await getValidSession());
    },
  };
}

export const authService = createAuthService();

