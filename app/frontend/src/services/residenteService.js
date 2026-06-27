import { ERROR_CODES, ServiceError } from './errors.js';
import { authService } from './authService.js';
import { assertPermission, PERMISSOES } from './permissions.js';
import { defaultStorage } from './storage.js';
import { assertRequiredFields, generateId, normalizeCpf, nowIso } from './validation.js';

const REQUIRED_RESIDENT_FIELDS = [
  'nomeCompleto',
  'dataNascimento',
  'cpf',
  'grauDependencia',
  'responsavelLegal',
];
const RESIDENTS_API_URL = 'http://localhost:3001/residentes';

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

function mapRemoteResident(remoteResident, existingResident = null) {
  return {
    ...existingResident,
    id: existingResident?.id ?? `api_res_${remoteResident.id}`,
    remoteId: String(remoteResident.id),
    nomeCompleto: remoteResident.nome || remoteResident.nomeCompleto || '',
    dataNascimento: remoteResident.dataNascimento || '',
    cpf: normalizeCpf(remoteResident.cpf),
    grauDependencia: remoteResident.grauDependencia || '',
    responsavelLegal: remoteResident.responsavelLegal || '',
    dadosClinicos: remoteResident.dadosClinicos || existingResident?.dadosClinicos || '',
    setor: remoteResident.setor || existingResident?.setor || '',
    quarto: remoteResident.quarto || existingResident?.quarto || '',
    medicamentos: remoteResident.medicamentos || existingResident?.medicamentos || [],
    foto: remoteResident.foto || existingResident?.foto || null,
    isAtivo: remoteResident.isAtivo !== false,
    createdAt: remoteResident.createdAt || existingResident?.createdAt || nowIso(),
    createdBy: remoteResident.createdBy || existingResident?.createdBy || 'backend',
    updatedAt: remoteResident.updatedAt || existingResident?.updatedAt,
    updatedBy: remoteResident.updatedBy || existingResident?.updatedBy,
  };
}

export function createResidenteService({ storage = defaultStorage, getCurrentUser } = {}) {
  async function resolveActor(actor) {
    return actor ?? (getCurrentUser ? await getCurrentUser() : null);
  }

  return {
    async criarResidente(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.RESIDENTES_CREATE);
      assertRequiredFields(payload, REQUIRED_RESIDENT_FIELDS);

      const cpf = normalizeCpf(payload.cpf);
      const duplicate = await storage.findBy('residentes', 'cpf', cpf);

      if (duplicate) {
        throw new ServiceError(
          ERROR_CODES.DUPLICATE_CPF,
          'CPF ja cadastrado para outro residente.',
          { cpf },
        );
      }

      try {
        const response = await fetch(`${RESIDENTS_API_URL}?cpf=${encodeURIComponent(cpf)}`);

        if (!response.ok) {
          throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
        }

        const remoteDuplicates = await response.json();
        if (remoteDuplicates.length > 0) {
          throw new ServiceError(
            ERROR_CODES.DUPLICATE_CPF,
            'CPF ja cadastrado para outro residente.',
            { cpf },
          );
        }
      } catch (error) {
        if (error instanceof ServiceError) throw error;
        console.warn('Nao foi possivel validar o CPF no servidor. Validacao local mantida.', error);
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
        medicamentos: payload.medicamentos || [],
        foto: payload.foto || null,
        isAtivo: true,
        createdAt: nowIso(),
        createdBy: currentUser.id,
      };

      try {
        const response = await fetch(RESIDENTS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome: residente.nomeCompleto,
            dataNascimento: residente.dataNascimento,
            cpf: residente.cpf,
            quarto: residente.quarto,
            setor: residente.setor,
            grauDependencia: residente.grauDependencia,
            responsavelLegal: residente.responsavelLegal,
            dadosClinicos: residente.dadosClinicos,
            medicamentos: residente.medicamentos,
            foto: residente.foto,
            isAtivo: residente.isAtivo,
            createdAt: residente.createdAt,
            createdBy: residente.createdBy,
          }),
        });

        if (response.status === 409) {
          throw new ServiceError(
            ERROR_CODES.DUPLICATE_CPF,
            'CPF ja cadastrado para outro residente.',
            { cpf },
          );
        }

        if (!response.ok) {
          throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
        }

        const remoteResident = await response.json();
        residente.remoteId = String(remoteResident.id);
      } catch (error) {
        if (error instanceof ServiceError) throw error;
        console.warn('Não foi possível sincronizar o residente. Registro salvo apenas localmente.', error);
      }

      return storage.put('residentes', residente);
    },

    async atualizarResidente(id, payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.RESIDENTES_EDIT);

      const residenteOriginal = await storage.get('residentes', id);
      if (!residenteOriginal) {
        throw new ServiceError(ERROR_CODES.NOT_FOUND, 'Residente não encontrado.');
      }

      const cpf = readRequiredText(payload, residenteOriginal, 'cpf', normalizeCpf);
      const duplicate = await storage.findBy('residentes', 'cpf', cpf);

      if (duplicate && duplicate.id !== residenteOriginal.id) {
        throw new ServiceError(
          ERROR_CODES.DUPLICATE_CPF,
          'CPF ja cadastrado para outro residente.',
          { cpf },
        );
      }

      const residenteEditado = {
        ...residenteOriginal,
        nomeCompleto: readRequiredText(payload, residenteOriginal, 'nomeCompleto'),
        dataNascimento: readRequiredText(payload, residenteOriginal, 'dataNascimento'),
        cpf,
        grauDependencia: readRequiredText(payload, residenteOriginal, 'grauDependencia'),
        responsavelLegal: readRequiredText(payload, residenteOriginal, 'responsavelLegal'),
        dadosClinicos: readOptionalText(payload, residenteOriginal, 'dadosClinicos'),
        setor: readOptionalText(payload, residenteOriginal, 'setor'),
        quarto: readOptionalText(payload, residenteOriginal, 'quarto'),
        medicamentos: hasField(payload, 'medicamentos')
          ? (Array.isArray(payload.medicamentos) ? payload.medicamentos : [])
          : (residenteOriginal.medicamentos || []),
        foto: hasField(payload, 'foto') ? (payload.foto ?? null) : residenteOriginal.foto,
        updatedAt: nowIso(),
        updatedBy: currentUser.id,
      };

      assertRequiredFields(residenteEditado, REQUIRED_RESIDENT_FIELDS);

      try {
        const response = await fetch(`${RESIDENTS_API_URL}?cpf=${encodeURIComponent(cpf)}`);

        if (!response.ok) {
          throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
        }

        const remoteDuplicates = await response.json();
        const hasRemoteDuplicate = remoteDuplicates.some((remoteResident) => (
          String(remoteResident.id) !== String(residenteOriginal.remoteId ?? '')
        ));

        if (hasRemoteDuplicate) {
          throw new ServiceError(
            ERROR_CODES.DUPLICATE_CPF,
            'CPF ja cadastrado para outro residente.',
            { cpf },
          );
        }

        if (residenteEditado.remoteId) {
          const updateResponse = await fetch(`${RESIDENTS_API_URL}/${residenteEditado.remoteId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: remoteIdValue(residenteEditado.remoteId),
              nome: residenteEditado.nomeCompleto,
              dataNascimento: residenteEditado.dataNascimento,
              cpf: residenteEditado.cpf,
              quarto: residenteEditado.quarto,
              setor: residenteEditado.setor,
              grauDependencia: residenteEditado.grauDependencia,
              responsavelLegal: residenteEditado.responsavelLegal,
              dadosClinicos: residenteEditado.dadosClinicos,
              medicamentos: residenteEditado.medicamentos,
              foto: residenteEditado.foto,
              isAtivo: residenteEditado.isAtivo,
              createdAt: residenteEditado.createdAt,
              createdBy: residenteEditado.createdBy,
              updatedAt: residenteEditado.updatedAt,
              updatedBy: residenteEditado.updatedBy,
            }),
          });
          if (updateResponse.status === 409) {
            throw new ServiceError(
              ERROR_CODES.DUPLICATE_CPF,
              'CPF ja cadastrado para outro residente.',
              { cpf },
            );
          }

          if (!updateResponse.ok) {
            throw new Error(`Backend Mock respondeu com HTTP ${updateResponse.status}.`);
          }
        }
      } catch (error) {
        if (error instanceof ServiceError) throw error;
        console.warn('Não foi possível sincronizar a edição do residente. Registro atualizado apenas localmente.', error);
      }

      return storage.put('residentes', residenteEditado);
    },

    async listarResidentes(actor = null, { apenasAtivos = true } = {}) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.RESIDENTES_LIST);

      try {
        const response = await fetch(RESIDENTS_API_URL);
        if (!response.ok) {
          throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
        }

        const remoteResidents = await response.json();
        for (const remoteResident of remoteResidents) {
          const cpf = normalizeCpf(remoteResident.cpf);
          const existingResident = await storage.findBy('residentes', 'cpf', cpf);
          await storage.put(
            'residentes',
            mapRemoteResident(remoteResident, existingResident),
          );
        }
      } catch (error) {
        console.warn('Nao foi possivel atualizar a lista de residentes pelo servidor.', error);
      }

      const residentes = await storage.list('residentes');
      return apenasAtivos ? residentes.filter((residente) => residente.isAtivo) : residentes;
    },

    async buscarPorId(id, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.RESIDENTES_LIST);
      return storage.get('residentes', id);
    },
    async inativarResidente(id, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.RESIDENTES_EDIT);
      const residente = await storage.get('residentes', id);
      if (!residente) {
        throw new ServiceError(ERROR_CODES.NOT_FOUND, 'Residente nao encontrado.');
      }
      residente.isAtivo = false;
      return storage.put('residentes', residente);
    },
  };
}

export const residenteService = createResidenteService({
  getCurrentUser: () => authService.getCurrentUser(),
});
