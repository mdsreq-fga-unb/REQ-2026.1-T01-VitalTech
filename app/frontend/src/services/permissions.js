import { ERROR_CODES, ServiceError } from './errors.js';
import { normalizePerfil } from './validation.js';

export const PERFIS = Object.freeze({
  GESTOR: 'gestor',
  CUIDADOR: 'cuidador',
  MULTIDISCIPLINAR: 'multidisciplinar',
});

export const PERMISSOES = Object.freeze({
  USUARIOS_CREATE: 'usuarios:create',
  USUARIOS_EDIT: 'usuarios:edit',
  USUARIOS_LIST: 'usuarios:list',
  USUARIOS_RESET_PASSWORD: 'usuarios:reset-password',
  USUARIOS_REVOKE: 'usuarios:revoke',
  RESIDENTES_CREATE: 'residentes:create',
  RESIDENTES_LIST: 'residentes:list',
  RESIDENTES_EDIT: 'residentes:edit',
  RESIDENTES_DEACTIVATE: 'residentes:deactivate',
  ASSISTENCIA_CREATE: 'assistencia:create',
  ASSISTENCIA_LIST: 'assistencia:list',
  OCORRENCIAS_CREATE: 'ocorrencias:create',
  OCORRENCIAS_EDIT: 'ocorrencias:edit',
  OCORRENCIAS_LIST: 'ocorrencias:list',
  RESUMO_ASSISTENCIAL_LIST: 'resumo-assistencial:list',
});

const PROFILE_PERMISSIONS = Object.freeze({
  [PERFIS.GESTOR]: [
    PERMISSOES.USUARIOS_CREATE,
    PERMISSOES.USUARIOS_EDIT,
    PERMISSOES.USUARIOS_LIST,
    PERMISSOES.USUARIOS_RESET_PASSWORD,
    PERMISSOES.USUARIOS_REVOKE,
    PERMISSOES.RESIDENTES_CREATE,
    PERMISSOES.RESIDENTES_LIST,
    PERMISSOES.RESIDENTES_EDIT,
    PERMISSOES.RESIDENTES_DEACTIVATE,
    PERMISSOES.ASSISTENCIA_CREATE,
    PERMISSOES.ASSISTENCIA_LIST,
    PERMISSOES.OCORRENCIAS_CREATE,
    PERMISSOES.OCORRENCIAS_EDIT,
    PERMISSOES.OCORRENCIAS_LIST,
    PERMISSOES.RESUMO_ASSISTENCIAL_LIST,
  ],
  [PERFIS.CUIDADOR]: [
    PERMISSOES.RESIDENTES_LIST,
    PERMISSOES.ASSISTENCIA_CREATE,
    PERMISSOES.ASSISTENCIA_LIST,
    PERMISSOES.OCORRENCIAS_CREATE,
    PERMISSOES.OCORRENCIAS_EDIT,
    PERMISSOES.OCORRENCIAS_LIST,
    PERMISSOES.RESUMO_ASSISTENCIAL_LIST,
  ],
  [PERFIS.MULTIDISCIPLINAR]: [
    PERMISSOES.RESIDENTES_LIST,
    PERMISSOES.ASSISTENCIA_LIST,
    PERMISSOES.OCORRENCIAS_LIST,
    PERMISSOES.RESUMO_ASSISTENCIAL_LIST,
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
      'Usuario sem permissao para executar esta acao.',
      { permission },
    );
  }
}

