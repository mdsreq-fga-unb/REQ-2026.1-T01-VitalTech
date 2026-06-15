import { ERROR_CODES, ServiceError } from './errors.js';
import { authService } from './authService.js';
import { assertPermission, PERMISSOES } from './permissions.js';
import { defaultStorage } from './storage.js';
import {
  assertRequiredFields,
  generateId,
  normalizeLogin,
  normalizePerfil,
  nowIso,
} from './validation.js';

const REQUIRED_USER_FIELDS = ['nomeCompleto', 'login', 'perfil', 'senhaProvisoria'];
const USERS_API_URL = 'http://localhost:3001/usuarios';

function mapRemoteUser(remoteUser, existingUser = null) {
  return {
    ...existingUser,
    id: existingUser?.id ?? `api_usr_${remoteUser.id}`,
    remoteId: String(remoteUser.id),
    nomeCompleto: remoteUser.nome || remoteUser.nomeCompleto || '',
    login: normalizeLogin(remoteUser.login),
    perfil: normalizePerfil(remoteUser.perfil),
    senhaProvisoria: existingUser?.senhaProvisoria || remoteUser.senha || '',
    especialidade: remoteUser.especialidade || existingUser?.especialidade || '',
    registro: remoteUser.registro || existingUser?.registro || '',
    foto: remoteUser.foto || existingUser?.foto || null,
    ativo: remoteUser.ativo !== false,
    createdAt: remoteUser.createdAt || existingUser?.createdAt || nowIso(),
    createdBy: remoteUser.createdBy || existingUser?.createdBy || 'backend',
  };
}

export function createUsuarioService({ storage = defaultStorage, getCurrentUser } = {}) {
  async function resolveActor(actor) {
    return actor ?? (getCurrentUser ? await getCurrentUser() : null);
  }

  return {
    async criarUsuario(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.USUARIOS_CREATE);
      assertRequiredFields(payload, REQUIRED_USER_FIELDS);

      const login = normalizeLogin(payload.login);
      const duplicate = await storage.findBy('usuarios', 'login', login);

      if (duplicate) {
        throw new ServiceError(
          ERROR_CODES.DUPLICATE_LOGIN,
          'Login ja esta em uso.',
          { login },
        );
      }

      try {
        const response = await fetch(`${USERS_API_URL}?login=${encodeURIComponent(login)}`);

        if (!response.ok) {
          throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
        }

        const remoteDuplicates = await response.json();
        if (remoteDuplicates.length > 0) {
          throw new ServiceError(
            ERROR_CODES.DUPLICATE_LOGIN,
            'Login ja esta em uso.',
            { login },
          );
        }
      } catch (error) {
        if (error instanceof ServiceError) throw error;
        console.warn('Nao foi possivel validar o login no servidor. Validacao local mantida.', error);
      }

      const usuario = {
        id: generateId('usr'),
        nomeCompleto: String(payload.nomeCompleto).trim(),
        login,
        perfil: normalizePerfil(payload.perfil),
        senhaProvisoria: String(payload.senhaProvisoria),
        // Campos opcionais — eram descartados antes (bug do review)
        especialidade: payload.especialidade ? String(payload.especialidade).trim() : '',
        registro: payload.registro ? String(payload.registro).trim() : '',
        foto: payload.foto || null,
        ativo: true,
        createdAt: nowIso(),
        createdBy: currentUser.id,
      };

      // Sincroniza com o Backend Mock (json-server). Se estiver offline, segue sem erro.
      try {
        const response = await fetch(USERS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: usuario.nomeCompleto,
            login: usuario.login,
            perfil: usuario.perfil,
            senha: usuario.senhaProvisoria,
            especialidade: usuario.especialidade,
            registro: usuario.registro,
            foto: usuario.foto,
            createdAt: usuario.createdAt,
            createdBy: usuario.createdBy,
          }),
        });

        if (response.status === 409) {
          throw new ServiceError(
            ERROR_CODES.DUPLICATE_LOGIN,
            'Login ja esta em uso.',
            { login },
          );
        }

        if (!response.ok) {
          throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
        }

        const remoteUser = await response.json();
        usuario.remoteId = String(remoteUser.id);
      } catch (error) {
        if (error instanceof ServiceError) throw error;
        console.warn('Não foi possível sincronizar o usuário. Registro salvo apenas localmente.', error);
      }

      return storage.put('usuarios', usuario);
    },

    async listarUsuarios(actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.USUARIOS_LIST);

      try {
        const response = await fetch(USERS_API_URL);
        if (!response.ok) {
          throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
        }

        const remoteUsers = await response.json();
        for (const remoteUser of remoteUsers) {
          const login = normalizeLogin(remoteUser.login);
          const existingUser = await storage.findBy('usuarios', 'login', login);
          await storage.put('usuarios', mapRemoteUser(remoteUser, existingUser));
        }
      } catch (error) {
        console.warn('Nao foi possivel atualizar a lista de usuarios pelo servidor.', error);
      }

      const list = await storage.list('usuarios');
      return list.filter((u) => u.ativo !== false);
    },

    async buscarPorLogin(login, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.USUARIOS_LIST);
      return storage.findBy('usuarios', 'login', normalizeLogin(login));
    },

    async inativarUsuario(id, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.USUARIOS_CREATE);
      const usuario = await storage.get('usuarios', id);
      if (!usuario) {
        throw new ServiceError(ERROR_CODES.NOT_FOUND, 'Usuario nao encontrado.');
      }
      usuario.ativo = false;
      return storage.put('usuarios', usuario);
    },
  };
}

export const usuarioService = createUsuarioService({
  getCurrentUser: () => authService.getCurrentUser(),
});
