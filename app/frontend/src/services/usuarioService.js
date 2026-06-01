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

      const usuario = {
        id: generateId('usr'),
        nomeCompleto: String(payload.nomeCompleto).trim(),
        login,
        perfil: normalizePerfil(payload.perfil),
        senhaProvisoria: String(payload.senhaProvisoria),
        ativo: true,
        createdAt: nowIso(),
        createdBy: currentUser.id,
      };

      return storage.put('usuarios', usuario);
    },

    async listarUsuarios(actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.USUARIOS_LIST);
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
