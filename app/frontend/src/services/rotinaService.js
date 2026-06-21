import { ERROR_CODES, ServiceError } from './errors.js';
import { authService } from './authService.js';
import { assertPermission, PERMISSOES } from './permissions.js';
import { defaultStorage } from './storage.js';
import { assertRequiredFields, generateId, nowIso } from './validation.js';

const REQUIRED_ROTINA_FIELDS = ['residenteId', 'registradoEm', 'tipoRegistro', 'status'];
const STORE_NAME = 'rotinasAssistenciais';
const ROTINAS_API_URL = 'http://localhost:3001/rotinasAssistenciais';

function mapRemoteRotina(remoteRotina, existingRotina = null) {
  return {
    ...existingRotina,
    id: existingRotina?.id ?? `api_rot_${remoteRotina.id}`,
    remoteId: String(remoteRotina.id),
    residenteId: remoteRotina.residenteId || existingRotina?.residenteId || '',
    residenteNome: remoteRotina.residenteNome || existingRotina?.residenteNome || '',
    registradoEm: remoteRotina.registradoEm || existingRotina?.registradoEm || '',
    tipoRegistro: remoteRotina.tipoRegistro || existingRotina?.tipoRegistro || '',
    status: remoteRotina.status || existingRotina?.status || '',
    observacoes: remoteRotina.observacoes || existingRotina?.observacoes || '',
    sinaisAlerta: remoteRotina.sinaisAlerta ?? existingRotina?.sinaisAlerta ?? false,
    detalhes: remoteRotina.detalhes || existingRotina?.detalhes || null,
    responsavelId: remoteRotina.responsavelId || existingRotina?.responsavelId || 'backend',
    responsavelNome: remoteRotina.responsavelNome || existingRotina?.responsavelNome || '',
    createdAt: remoteRotina.createdAt || existingRotina?.createdAt || nowIso(),
  };
}

export function createRotinaService({ storage = defaultStorage, getCurrentUser } = {}) {
  async function resolveActor(actor) {
    return actor ?? (getCurrentUser ? await getCurrentUser() : null);
  }

  return {
    async criarRotina(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ASSISTENCIA_CREATE);
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
        registradoEm: String(payload.registradoEm).trim(),
        tipoRegistro: String(payload.tipoRegistro).trim(),
        status: String(payload.status).trim(),
        observacoes: payload.observacoes ? String(payload.observacoes).trim() : '',
        sinaisAlerta: Boolean(payload.sinaisAlerta),
        detalhes: payload.detalhes ?? null,
        responsavelId: currentUser.id,
        responsavelNome: currentUser.nomeCompleto,
        createdAt: nowIso(),
      };

      // Sincroniza com o Backend Mock (json-server). Se estiver offline, segue sem erro.
      try {
        const response = await fetch(ROTINAS_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            residenteId: rotina.residenteId,
            residenteNome: rotina.residenteNome,
            registradoEm: rotina.registradoEm,
            tipoRegistro: rotina.tipoRegistro,
            status: rotina.status,
            observacoes: rotina.observacoes,
            sinaisAlerta: rotina.sinaisAlerta,
            detalhes: rotina.detalhes,
            responsavelId: rotina.responsavelId,
            responsavelNome: rotina.responsavelNome,
            createdAt: rotina.createdAt,
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

      return storage.put(STORE_NAME, rotina);
    },

    async listarRotinas(actor = null, filtros = {}) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ASSISTENCIA_LIST);

      try {
        const response = await fetch(ROTINAS_API_URL);
        if (!response.ok) {
          throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
        }

        const remoteRotinas = await response.json();
        for (const remoteRotina of remoteRotinas) {
          const existingRotina = await storage.get(STORE_NAME, `api_rot_${remoteRotina.id}`);
          await storage.put(STORE_NAME, mapRemoteRotina(remoteRotina, existingRotina));
        }
      } catch (error) {
        console.warn('Nao foi possivel atualizar a lista de rotinas pelo servidor.', error);
      }

      const rotinas = await storage.list(STORE_NAME);
      return rotinas
        .filter((rotina) => {
          if (filtros.residenteId && rotina.residenteId !== filtros.residenteId) return false;
          if (filtros.data && !rotina.registradoEm.startsWith(filtros.data)) return false;
          return true;
        })
        .sort((a, b) => b.registradoEm.localeCompare(a.registradoEm));
    },

    async atualizarStatus(id, status, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ASSISTENCIA_CREATE);

      const rotina = await storage.get(STORE_NAME, id);
      if (!rotina) {
        throw new ServiceError(ERROR_CODES.NOT_FOUND, 'Rotina nao encontrada.');
      }

      rotina.status = String(status).trim();
      rotina.updatedAt = nowIso();
      rotina.updatedBy = currentUser.id;
      return storage.put(STORE_NAME, rotina);
    },
  };
}

export const rotinaService = createRotinaService({
  getCurrentUser: () => authService.getCurrentUser(),
});