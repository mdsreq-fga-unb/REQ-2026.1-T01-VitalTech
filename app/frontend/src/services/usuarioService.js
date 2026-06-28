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
const REQUIRED_USER_UPDATE_FIELDS = ['nomeCompleto', 'login', 'perfil'];
const USERS_API_URL = 'http://localhost:3001/usuarios';

function hasField(payload, field) {
  return Object.prototype.hasOwnProperty.call(payload ?? {}, field);
}

function remoteIdValue(remoteId) {
  const numericId = Number(remoteId);
  return Number.isNaN(numericId) ? remoteId : numericId;
}

function readRequiredText(payload, original, field, normalizer = (value) => String(value).trim()) {
  if (!hasField(payload, field)) {
    return original[field];
  }

  const value = payload[field];
  return value === undefined || value === null ? '' : normalizer(value);
}

function readOptionalText(payload, original, field) {
  if (!hasField(payload, field)) {
    return original[field] ?? '';
  }

  const value = payload[field];
  return value === undefined || value === null ? '' : String(value).trim();
}

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
    updatedAt: remoteUser.updatedAt || existingUser?.updatedAt,
    updatedBy: remoteUser.updatedBy || existingUser?.updatedBy,
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

    async buscarPorId(id, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.USUARIOS_LIST);
      return storage.get('usuarios', id);
    },

    async buscarPorLogin(login, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.USUARIOS_LIST);
      return storage.findBy('usuarios', 'login', normalizeLogin(login));
    },

    async atualizarUsuario(id, payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.USUARIOS_EDIT);

      const usuarioOriginal = await storage.get('usuarios', id);
      if (!usuarioOriginal) {
        throw new ServiceError(ERROR_CODES.NOT_FOUND, 'Usuario nao encontrado.');
      }

      const login = readRequiredText(payload, usuarioOriginal, 'login', normalizeLogin);
      const perfil = readRequiredText(payload, usuarioOriginal, 'perfil', normalizePerfil);
      const camposObrigatorios = {
        nomeCompleto: readRequiredText(payload, usuarioOriginal, 'nomeCompleto'),
        login,
        perfil,
      };

      assertRequiredFields(camposObrigatorios, REQUIRED_USER_UPDATE_FIELDS);

      const duplicate = await storage.findBy('usuarios', 'login', login);

      if (duplicate && duplicate.id !== usuarioOriginal.id) {
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
        const hasRemoteDuplicate = remoteDuplicates.some((remoteUser) => (
          String(remoteUser.id) !== String(usuarioOriginal.remoteId ?? '')
        ));

        if (hasRemoteDuplicate) {
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

      const usuarioEditado = {
        ...usuarioOriginal,
        nomeCompleto: camposObrigatorios.nomeCompleto,
        login,
        perfil,
        senhaProvisoria: usuarioOriginal.senhaProvisoria,
        especialidade: readOptionalText(payload, usuarioOriginal, 'especialidade'),
        registro: readOptionalText(payload, usuarioOriginal, 'registro'),
        foto: hasField(payload, 'foto') ? (payload.foto ?? null) : usuarioOriginal.foto,
        ativo: hasField(payload, 'ativo') ? payload.ativo !== false : usuarioOriginal.ativo !== false,
        updatedAt: nowIso(),
        updatedBy: currentUser.id,
      };

      try {
        if (usuarioEditado.remoteId) {
          const response = await fetch(`${USERS_API_URL}/${usuarioEditado.remoteId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: remoteIdValue(usuarioEditado.remoteId),
              nome: usuarioEditado.nomeCompleto,
              login: usuarioEditado.login,
              perfil: usuarioEditado.perfil,
              senha: usuarioEditado.senhaProvisoria,
              especialidade: usuarioEditado.especialidade,
              registro: usuarioEditado.registro,
              foto: usuarioEditado.foto,
              ativo: usuarioEditado.ativo,
              createdAt: usuarioEditado.createdAt,
              createdBy: usuarioEditado.createdBy,
              updatedAt: usuarioEditado.updatedAt,
              updatedBy: usuarioEditado.updatedBy,
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
        }
      } catch (error) {
        if (error instanceof ServiceError) throw error;
        console.warn('Nao foi possivel sincronizar a edicao do usuario. Registro atualizado apenas localmente.', error);
      }

      return storage.put('usuarios', usuarioEditado);
    },

    async inativarUsuario(id, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.USUARIOS_EDIT);
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
