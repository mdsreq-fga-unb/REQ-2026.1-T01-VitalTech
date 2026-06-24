export class ServiceError extends Error {
  constructor(code, message, details = {}) {
    super(message);
    this.name = 'ServiceError';
    this.code = code;
    this.details = details;
  }
}

export const ERROR_CODES = Object.freeze({
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  REQUIRED_FIELDS: 'REQUIRED_FIELDS',
  DUPLICATE_LOGIN: 'DUPLICATE_LOGIN',
  DUPLICATE_CPF: 'DUPLICATE_CPF',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALUES_OUT_OF_RANGE: 'VALUES_OUT_OF_RANGE',
});

export function toServiceResult(callback) {
  return Promise.resolve()
    .then(callback)
    .then((data) => ({
      success: true,
      data,
      message: 'Operacao realizada com sucesso.',
    }))
    .catch((error) => {
      if (error instanceof ServiceError) {
        return {
          success: false,
          message: error.message,
          error: {
            code: error.code,
            details: error.details,
          },
        };
      }

      throw error;
    });
}

