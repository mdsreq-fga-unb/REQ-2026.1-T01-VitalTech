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
const RESIDENTS_API_URL = 'http://localhost:3001/residentes';

function mapRemoteResident(remoteResident, existingResident = null) {
  return {
    ...existingResident,
    id: existingResident?.id ?? `api_res_${remoteResident.id}`,
    remoteId: String(remoteResident.id),
    nomeCompleto: remoteResident.nome || remoteResident.nomeCompleto || '',
    dataNascimento: remoteResident.dataNascimento || '',
    cpf: String(remoteResident.cpf || '').trim(),
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

      const cpf = String(payload.cpf).trim();
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

      const residenteEditado = {
        ...residenteOriginal,
        nomeCompleto: payload.nomeCompleto ? String(payload.nomeCompleto).trim() : residenteOriginal.nomeCompleto,
        dataNascimento: payload.dataNascimento ? String(payload.dataNascimento).trim() : residenteOriginal.dataNascimento,
        cpf: payload.cpf ? payload.cpf.replace(/\D/g, '') : residenteOriginal.cpf,
        grauDependencia: payload.grauDependencia ? String(payload.grauDependencia).trim() : residenteOriginal.grauDependencia,
        responsavelLegal: payload.responsavelLegal ? String(payload.responsavelLegal).trim() : residenteOriginal.responsavelLegal,
        dadosClinicos: payload.dadosClinicos !== undefined ? String(payload.dadosClinicos).trim() : residenteOriginal.dadosClinicos,
        setor: payload.setor !== undefined ? String(payload.setor).trim() : residenteOriginal.setor,
        quarto: payload.quarto !== undefined ? String(payload.quarto).trim() : residenteOriginal.quarto,
        medicamentos: payload.medicamentos || residenteOriginal.medicamentos || [],
        foto: payload.foto !== undefined ? payload.foto : residenteOriginal.foto,
      };

      try {
        if (residenteEditado.remoteId) {
          const response = await fetch(`${RESIDENTS_API_URL}/${residenteEditado.remoteId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
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
            }),
          });
          if (!response.ok) {
            throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
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
          const cpf = String(remoteResident.cpf || '').trim();
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
