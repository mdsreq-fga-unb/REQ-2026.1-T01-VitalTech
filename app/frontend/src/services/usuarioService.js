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
        const response = await fetch('http://localhost:3001/usuarios', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: usuario.nomeCompleto,
            login: usuario.login,
            perfil: usuario.perfil,
            senha: usuario.senhaProvisoria,
            especialidade: usuario.especialidade,
            registro: usuario.registro,
            createdAt: usuario.createdAt,
            createdBy: usuario.createdBy,
          }),
        });

        if (!response.ok) {
          throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
        }
      } catch (error) {
        console.warn('Não foi possível sincronizar o usuário. Registro salvo apenas localmente.', error);
      }

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
