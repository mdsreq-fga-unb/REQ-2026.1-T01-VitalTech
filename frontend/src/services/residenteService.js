import { ERROR_CODES, ServiceError } from './errors.js';
import { authService } from './authService.js';
import { assertPermission, PERMISSOES } from './permissions.js';
import { defaultStorage } from './storage.js';
import { assertRequiredFields, generateId, nowIso } from './validation.js';

const REQUIRED_RESIDENT_FIELDS = [
  'nomeCompleto',
  'dataNascimento',
  'cpf',
  'grauDependencia',
  'responsavelLegal',
];

export function createResidenteService({ storage = defaultStorage, getCurrentUser } = {}) {
  async function resolveActor(actor) {
    return actor ?? (getCurrentUser ? await getCurrentUser() : null);
  }

  return {
    async criarResidente(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.RESIDENTES_CREATE);
      assertRequiredFields(payload, REQUIRED_RESIDENT_FIELDS);

      const cpf = String(payload.cpf).trim();
      const duplicate = await storage.findBy('residentes', 'cpf', cpf);

      if (duplicate) {
        throw new ServiceError(
          ERROR_CODES.DUPLICATE_CPF,
          'CPF ja cadastrado para outro residente.',
          { cpf },
        );
      }

      const residente = {
        id: generateId('res'),
        nomeCompleto: String(payload.nomeCompleto).trim(),
        dataNascimento: String(payload.dataNascimento).trim(),
        cpf,
        grauDependencia: String(payload.grauDependencia).trim(),
        responsavelLegal: String(payload.responsavelLegal).trim(),
        dadosClinicos: payload.dadosClinicos ? String(payload.dadosClinicos).trim() : '',
        setor: payload.setor ? String(payload.setor).trim() : '',
        quarto: payload.quarto ? String(payload.quarto).trim() : '',
        isAtivo: true,
        createdAt: nowIso(),
        createdBy: currentUser.id,
      };

      return storage.put('residentes', residente);
    },

    async listarResidentes(actor = null, { apenasAtivos = true } = {}) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.RESIDENTES_LIST);
      const residentes = await storage.list('residentes');
      return apenasAtivos ? residentes.filter((residente) => residente.isAtivo) : residentes;
    },

    async buscarPorId(id, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.RESIDENTES_LIST);
      return storage.get('residentes', id);
    },
  };
}

export const residenteService = createResidenteService({
  getCurrentUser: () => authService.getCurrentUser(),
});
