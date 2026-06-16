import { ERROR_CODES, ServiceError } from './errors.js';

export function normalizeLogin(login) {
  return String(login ?? '').trim().toLowerCase();
}

export function normalizePerfil(perfil) {
  const p = String(perfil ?? '').trim().toLowerCase();
  if (p === 'equipe') return 'multidisciplinar';
  return p;
}

export function assertRequiredFields(payload, requiredFields) {
  const missingFields = requiredFields.filter((field) => {
    const value = payload[field];
    return value === undefined || value === null || String(value).trim() === '';
  });

  if (missingFields.length > 0) {
    throw new ServiceError(
      ERROR_CODES.REQUIRED_FIELDS,
      'Preencha todos os campos obrigatorios.',
      { missingFields },
    );
  }
}

export function generateId(prefix) {
  const randomPart = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now()}_${randomPart}`;
}

export function nowIso() {
  return new Date().toISOString();
}

