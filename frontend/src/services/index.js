export { authService, createAuthService } from './authService.js';
export { residenteService, createResidenteService } from './residenteService.js';
export { usuarioService, createUsuarioService } from './usuarioService.js';
export { createIndexedDbStorage, createMemoryStorage, defaultStorage } from './storage.js';
export { createBrowserSessionStorage, createMemorySessionStorage } from './sessionStorage.js';
export { ERROR_CODES, ServiceError, toServiceResult } from './errors.js';
export { PERFIS, PERMISSOES, getPermissoesPorPerfil, hasPermission } from './permissions.js';

