import { ERROR_CODES, ServiceError } from './errors.js';
import { authService } from './authService.js';
import { assertPermission, PERMISSOES } from './permissions.js';
import { defaultStorage } from './storage.js';
import { assertRequiredFields, generateId, nowIso } from './validation.js';

const REQUIRED_ROTINA_FIELDS = ['residenteId', 'data', 'horario', 'tipo', 'status'];
const ROTINAS_API_URL = 'http://localhost:3001/rotinas';

function mapRemoteRotina(remoteRotina, existingRotina = null) {
  return {
    ...existingRotina,
    id: existingRotina?.id ?? `api_rot_${remoteRotina.id}`,
    remoteId: String(remoteRotina.id),
    residenteId: remoteRotina.residenteId || existingRotina?.residenteId || '',
    residenteNome: remoteRotina.residenteNome || existingRotina?.residenteNome || '',
    data: remoteRotina.data || existingRotina?.data || '',
    horario: remoteRotina.horario || existingRotina?.horario || '',
    tipo: remoteRotina.tipo || existingRotina?.tipo || '',
    status: remoteRotina.status || existingRotina?.status || '',
    observacoes: remoteRotina.observacoes || existingRotina?.observacoes || '',
    sinaisAlerta: remoteRotina.sinaisAlerta ?? existingRotina?.sinaisAlerta ?? false,
    detalhes: remoteRotina.detalhes || existingRotina?.detalhes || null,
    createdAt: remoteRotina.createdAt || existingRotina?.createdAt || nowIso(),
    createdBy: remoteRotina.createdBy || existingRotina?.createdBy || 'backend',
    createdByName: remoteRotina.createdByName || existingRotina?.createdByName || '',
  };
}


export function createRotinaService({ storage = defaultStorage, getCurrentUser } = {}) {
  async function resolveActor(actor) {
    return actor ?? (getCurrentUser ? await getCurrentUser() : null);
  }

  return {
    async criarRotina(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ROTINAS_CREATE);
      assertRequiredFields(payload, REQUIRED_ROTINA_FIELDS);

      const residente = await storage.get('residentes', payload.residenteId);
      if (!residente) {
        throw new ServiceError(
          ERROR_CODES.NOT_FOUND,
          'Residente nao encontrado.',
          { residenteId: payload.residenteId },
        );
      }

      const rotina = {
        id: generateId('rot'),
        residenteId: payload.residenteId,
        residenteNome: residente.nomeCompleto,
        data: String(payload.data).trim(),
        horario: String(payload.horario).trim(),
        tipo: String(payload.tipo).trim(),
        status: String(payload.status).trim(),
        observacoes: payload.observacoes ? String(payload.observacoes).trim() : '',
        sinaisAlerta: Boolean(payload.sinaisAlerta),
        detalhes: payload.detalhes ?? null,
        createdAt: nowIso(),
        createdBy: currentUser.id,
        createdByName: currentUser.nomeCompleto,
      };

       // Sincroniza com o Backend Mock (json-server). Se estiver offline, segue sem erro.
      try {
        const response = await fetch(ROTINAS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            residenteId: rotina.residenteId,
            residenteNome: rotina.residenteNome,
            data: rotina.data,
            horario: rotina.horario,
            tipo: rotina.tipo,
            status: rotina.status,
            observacoes: rotina.observacoes,
            sinaisAlerta: rotina.sinaisAlerta,
            detalhes: rotina.detalhes,
            createdAt: rotina.createdAt,
            createdBy: rotina.createdBy,
            createdByName: rotina.createdByName,
          }),
        });

        if (!response.ok) {
          throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
        }

        const remoteRotina = await response.json();
        rotina.remoteId = String(remoteRotina.id);
      } catch (error) {
        if (error instanceof ServiceError) throw error;
        console.warn('Não foi possível sincronizar a rotina. Registro salvo apenas localmente.', error);
      }

      return storage.put('rotinas', rotina);
    },


    async listarRotinas(actor = null, filtros = {}) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ROTINAS_LIST);

      try {
        const response = await fetch(ROTINAS_API_URL);
        if (!response.ok) {
          throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
        }

        const remoteRotinas = await response.json();
        for (const remoteRotina of remoteRotinas) {
          const existingRotina = await storage.get('rotinas', `api_rot_${remoteRotina.id}`);
          await storage.put('rotinas', mapRemoteRotina(remoteRotina, existingRotina));
        }
      } catch (error) {
        console.warn('Nao foi possivel atualizar a lista de rotinas pelo servidor.', error);
      }


      const rotinas = await storage.list('rotinas');
      return rotinas
        .filter((rotina) => {
          if (filtros.residenteId && rotina.residenteId !== filtros.residenteId) return false;
          if (filtros.data && rotina.data !== filtros.data) return false;
          return true;
        })
        .sort((a, b) => `${b.data}T${b.horario}`.localeCompare(`${a.data}T${a.horario}`));
    },

    async atualizarStatus(id, status, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ROTINAS_CREATE);

      const rotina = await storage.get('rotinas', id);
      if (!rotina) {
        throw new ServiceError(ERROR_CODES.NOT_FOUND, 'Rotina nao encontrada.');
      }

      rotina.status = String(status).trim();
      rotina.updatedAt = nowIso();
      rotina.updatedBy = currentUser.id;
      return storage.put('rotinas', rotina);
    },
  };
}

export const rotinaService = createRotinaService({
  getCurrentUser: () => authService.getCurrentUser(),
});
