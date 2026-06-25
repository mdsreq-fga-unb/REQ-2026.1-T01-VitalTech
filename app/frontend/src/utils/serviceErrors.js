import { ERROR_CODES, ServiceError } from '../services/index.js';

const GENERIC_MESSAGES = {
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Login ou senha inválidos.',
  [ERROR_CODES.REQUIRED_FIELDS]: 'Preencha todos os campos obrigatórios.',
  [ERROR_CODES.DUPLICATE_LOGIN]: 'Este login já está em uso.',
  [ERROR_CODES.DUPLICATE_CPF]: 'Este CPF já está cadastrado.',
  [ERROR_CODES.INVALID_VALUES]: 'Revise os valores informados.',
  [ERROR_CODES.VALUES_OUT_OF_RANGE]: 'Existem valores fora dos parâmetros clínicos.',
  [ERROR_CODES.UNAUTHORIZED]: 'Sua sessão expirou. Faça login novamente.',
  [ERROR_CODES.FORBIDDEN]: 'Seu perfil não possui permissão para esta ação.',
  [ERROR_CODES.NOT_FOUND]: 'Registro não encontrado.',
};

export function getServiceErrorMessage(error) {
  if (error instanceof ServiceError) {
    return GENERIC_MESSAGES[error.code] ?? error.message;
  }

  return 'Não foi possível concluir a operação. Tente novamente.';
}

export function getMissingFields(error) {
  if (error instanceof ServiceError && error.code === ERROR_CODES.REQUIRED_FIELDS) {
    return error.details?.missingFields ?? [];
  }

  return [];
}
