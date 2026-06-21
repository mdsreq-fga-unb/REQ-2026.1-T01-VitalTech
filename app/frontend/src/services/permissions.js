import { ERROR_CODES, ServiceError } from './errors.js';
import { normalizePerfil } from './validation.js';

export const PERFIS = Object.freeze({
  GESTOR: 'gestor',
  CUIDADOR: 'cuidador',
  MULTIDISCIPLINAR: 'multidisciplinar',
});

export const PERMISSOES = Object.freeze({
  USUARIOS_CREATE: 'usuarios:create',
  USUARIOS_LIST: 'usuarios:list',
  RESIDENTES_CREATE: 'residentes:create',
  RESIDENTES_LIST: 'residentes:list',
  RESIDENTES_EDIT: 'residentes:edit',
  ROTINAS_CREATE: 'rotinas:create',
  ROTINAS_LIST: 'rotinas:list',
});

const PROFILE_PERMISSIONS = Object.freeze({
  [PERFIS.GESTOR]: [
    PERMISSOES.USUARIOS_CREATE,
    PERMISSOES.USUARIOS_LIST,
    PERMISSOES.RESIDENTES_CREATE,
    PERMISSOES.RESIDENTES_LIST,
    PERMISSOES.RESIDENTES_EDIT,

  ],
  [PERFIS.CUIDADOR]: [
    PERMISSOES.RESIDENTES_LIST,
    PERMISSOES.ROTINAS_CREATE,
    PERMISSOES.ROTINAS_LIST,
    PERMISSOES.ROTINAS_CREATE,
    PERMISSOES.ROTINAS_LIST,
  ],
  [PERFIS.MULTIDISCIPLINAR]: [
    PERMISSOES.RESIDENTES_LIST,
    PERMISSOES.ROTINAS_CREATE,
    PERMISSOES.ROTINAS_LIST,

  ],
});

export function getPermissoesPorPerfil(perfil) {
  return PROFILE_PERMISSIONS[normalizePerfil(perfil)] ?? [];
}

export function hasPermission(user, permission) {
  if (!user) return false;
  return getPermissoesPorPerfil(user.perfil).includes(permission);
}

export function assertAuthenticated(user) {
  if (!user) {
    throw new ServiceError(
      ERROR_CODES.UNAUTHORIZED,
      'Usuario nao autenticado.',
    );
  }
}

export function assertPermission(user, permission) {
  assertAuthenticated(user);

  if (!hasPermission(user, permission)) {
    throw new ServiceError(
      ERROR_CODES.FORBIDDEN,
      'Usuario sem permissão para executar esta ação.',
      { permission },
    );
  }
}

