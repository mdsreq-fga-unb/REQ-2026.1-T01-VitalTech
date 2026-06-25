import { ERROR_CODES, ServiceError } from './errors.js';
import { authService } from './authService.js';
import { assertPermission, PERMISSOES } from './permissions.js';
import { defaultStorage } from './storage.js';
import { assertRequiredFields, generateId } from './validation.js';

const SINAIS_VITAIS_STORE = 'sinaisVitais';
const ROTINAS_ASSISTENCIAIS_STORE = 'rotinasAssistenciais';

const SINAIS_VITAIS_API_URL = 'http://localhost:3001/sinaisVitais';
const ROTINAS_ASSISTENCIAIS_API_URL = 'http://localhost:3001/rotinasAssistenciais';

const REQUIRED_SINAIS_FIELDS = [
  'residenteId',
  'pressaoArterial',
  'frequenciaCardiaca',
  'temperatura',
  'glicemia',
];

const REQUIRED_ROTINA_FIELDS = [
  'residenteId',
  'tipoRefeicao',
  'percentualAceitacao',
  'banho',
  'troca',
  'cuidadosBucais',
];

const REQUIRED_HIDRATACAO_FIELDS = [
  'residenteId',
];

const REQUIRED_HIGIENE_FIELDS = [
  'residenteId',
];

function pad(value) {
  return String(value).padStart(2, '0');
}

function normalizeDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function formatDate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatTime(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function buildMetadata(currentUser, getNow) {
  const date = normalizeDate(getNow());
  const responsavelNome =
    currentUser.nomeCompleto
    || currentUser.nome
    || currentUser.login
    || 'Responsavel nao informado';

  return {
    data: formatDate(date),
    horario: formatTime(date),
    registradoEm: date.toISOString(),
    responsavelId: currentUser.id,
    responsavelNome,
    createdAt: date.toISOString(),
    createdBy: currentUser.id,
  };
}

function parseNumber(value) {
  const normalized = String(value ?? '').replace(',', '.').trim();
  const parsed = Number(normalized);
  return Number.isFinite(parsed) ? parsed : null;
}

function getPressureValues(value) {
  const match = String(value ?? '').match(/(\d{2,3})\D+(\d{2,3})/);
  if (!match) return null;

  return {
    sistolica: Number(match[1]),
    diastolica: Number(match[2]),
  };
}

function getOutOfRangeFields(payload) {
  const outOfRange = [];
  const pressure = getPressureValues(payload.pressaoArterial);
  const frequencia = parseNumber(payload.frequenciaCardiaca);
  const temperatura = parseNumber(payload.temperatura);
  const glicemia = parseNumber(payload.glicemia);

  const saturacao = parseNumber(payload.saturacaoO2);
  const respiracao = parseNumber(payload.respiracao);

  if (
    pressure
    && (
      pressure.sistolica < 60
      || pressure.sistolica > 250
      || pressure.diastolica < 30
      || pressure.diastolica > 150
      || pressure.diastolica >= pressure.sistolica
    )
  ) {
    outOfRange.push('pressaoArterial');
  }

  if (frequencia !== null && (frequencia < 30 || frequencia > 220)) {
    outOfRange.push('frequenciaCardiaca');
  }

  if (temperatura !== null && (temperatura < 34 || temperatura > 42)) {
    outOfRange.push('temperatura');
  }

  if (glicemia !== null && (glicemia < 20 || glicemia > 600)) {
    outOfRange.push('glicemia');
  }

  if (payload.saturacaoO2 && saturacao !== null && (saturacao < 85 || saturacao > 100)) {
    outOfRange.push('saturacaoO2');
  }

  if (payload.respiracao && respiracao !== null && (respiracao < 10 || respiracao > 35)) {
    outOfRange.push('respiracao');
  }

  return outOfRange;
}

function combineDateTime(record) {
  if (!record.data) return null;
  return `${record.data}T${record.horario || '00:00'}:00.000Z`;
}

function resolveRegisteredAt(record) {
  return record.registradoEm || record.createdAt || combineDateTime(record) || new Date(0).toISOString();
}

function normalizeRecord(record, tipoRegistro, storeName) {
  const registradoEm = resolveRegisteredAt(record);
  const date = normalizeDate(registradoEm);
  const responsavelId =
    record.responsavelId
    || record.cuidadorId
    || record.userId
    || record.createdBy
    || '';

  return {
    ...record,
    id: record.id ?? generateId(storeName === SINAIS_VITAIS_STORE ? 'sv' : 'ra'),
    residenteId: String(record.residenteId ?? record.residentId ?? record.idResidente ?? ''),
    tipoRegistro: record.tipoRegistro || tipoRegistro,
    data: record.data || formatDate(date),
    horario: record.horario || formatTime(date),
    registradoEm,
    responsavelId,
    responsavelNome:
      record.responsavelNome
      || record.cuidadorNome
      || record.nomeCuidador
      || record.responsavel
      || 'Responsavel nao informado',
    createdAt: record.createdAt || registradoEm,
    createdBy: record.createdBy || responsavelId,
    origem: storeName,
  };
}

function remoteIdFor(storeName, remoteRecord) {
  if (typeof remoteRecord.id === 'string' && remoteRecord.id.includes('_')) {
    return remoteRecord.id;
  }

  const prefix = storeName === SINAIS_VITAIS_STORE ? 'api_sv' : 'api_ra';
  return `${prefix}_${remoteRecord.id}`;
}

async function syncRemoteStore(storage, storeName, apiUrl, tipoRegistro) {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) return;

    const remoteRecords = await response.json();
    for (const remoteRecord of remoteRecords) {
      const record = normalizeRecord(
        {
          ...remoteRecord,
          id: remoteIdFor(storeName, remoteRecord),
          remoteId: String(remoteRecord.id),
        },
        tipoRegistro,
        storeName,
      );
      await storage.put(storeName, record);
    }
  } catch {
    // O historico permanece funcional offline, consumindo os registros locais.
  }
}

async function persistRemote(apiUrl, record, isUpdate = false) {
  try {
    const isUpdateOp = isUpdate || Boolean(record.remoteId);
    const idToUse = record.remoteId || record.id;
    const url = isUpdateOp ? `${apiUrl}/${idToUse}` : apiUrl;
    const method = isUpdateOp ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record),
    });

    if (!response.ok) return record;

    const remoteRecord = await response.json();
    return {
      ...record,
      remoteId: String(remoteRecord.id),
    };
  } catch {
    return record;
  }
}

export function createAssistenciaService({
  storage = defaultStorage,
  getCurrentUser,
  getNow = () => new Date(),
} = {}) {
  async function resolveActor(actor) {
    return actor ?? (getCurrentUser ? await getCurrentUser() : null);
  }

  return {
    async registrarSinaisVitais(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ASSISTENCIA_REGISTRAR);
      assertRequiredFields(payload, REQUIRED_SINAIS_FIELDS);

      const camposForaDoParametro = getOutOfRangeFields(payload);
      if (camposForaDoParametro.length > 0 && !payload.confirmarForaDoParametro) {
        throw new ServiceError(
          ERROR_CODES.VALUES_OUT_OF_RANGE,
          'Confirme os valores fora dos parametros clinicos antes de salvar.',
          { campos: camposForaDoParametro },
        );
      }

      const registro = {
        id: generateId('sv'),
        residenteId: String(payload.residenteId),
        tipoRegistro: 'Sinais vitais',
        pressaoArterial: String(payload.pressaoArterial).trim(),
        frequenciaCardiaca: String(payload.frequenciaCardiaca).trim(),
        temperatura: String(payload.temperatura).trim(),
        glicemia: String(payload.glicemia).trim(),
        saturacaoO2: payload.saturacaoO2 ? String(payload.saturacaoO2).trim() : '',
        respiracao: payload.respiracao ? String(payload.respiracao).trim() : '',
        foraDosParametros: camposForaDoParametro.length > 0,
        camposForaDoParametro,
        ...buildMetadata(currentUser, getNow),
      };

      const syncedRecord = await persistRemote(SINAIS_VITAIS_API_URL, registro);
      return storage.put(SINAIS_VITAIS_STORE, syncedRecord);
    },

    async registrarRotinaAssistencial(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ASSISTENCIA_REGISTRAR);
      assertRequiredFields(payload, REQUIRED_ROTINA_FIELDS);

      const registro = {
        id: generateId('ra'),
        residenteId: String(payload.residenteId),
        tipoRegistro: 'Rotina assistencial',
        tipoRefeicao: String(payload.tipoRefeicao).trim(),
        percentualAceitacao: String(payload.percentualAceitacao).trim(),
        banho: String(payload.banho).trim(),
        troca: String(payload.troca).trim(),
        cuidadosBucais: String(payload.cuidadosBucais).trim(),
        observacoes: payload.observacoes ? String(payload.observacoes).trim() : '',
        ...buildMetadata(currentUser, getNow),
      };

      const syncedRecord = await persistRemote(ROTINAS_ASSISTENCIAIS_API_URL, registro);
      return storage.put(ROTINAS_ASSISTENCIAIS_STORE, syncedRecord);
    },

    async registrarHidratacao(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ASSISTENCIA_REGISTRAR);
      assertRequiredFields(payload, REQUIRED_HIDRATACAO_FIELDS);

      const dataHoje = formatDate(normalizeDate(getNow()));
      const horarioAtual = formatTime(normalizeDate(getNow()));

      // Tenta encontrar o registro de hidratacao do dia
      const historicoRotinas = await storage.list(ROTINAS_ASSISTENCIAIS_STORE);
      const registroHoje = historicoRotinas.find(r => 
        r.residenteId === String(payload.residenteId) && 
        r.tipoRegistro === 'Hidratacao' &&
        r.data === dataHoje
      );

      const novoHistorico = {
        horario: horarioAtual,
        aguaAdded: payload.agua || 0,
        sucoAdded: payload.suco || 0
      };

      if (registroHoje) {
        // Atualiza o registro existente
        registroHoje.agua = (registroHoje.agua || 0) + (payload.agua || 0);
        registroHoje.suco = (registroHoje.suco || 0) + (payload.suco || 0);
        registroHoje.recusou = payload.recusou;
        if (payload.observacoes) {
           registroHoje.observacoes = (registroHoje.observacoes ? registroHoje.observacoes + '\n' : '') + `[${horarioAtual}] ` + payload.observacoes.trim();
        }
        
        if (!registroHoje.historicoConsumo) registroHoje.historicoConsumo = [];
        registroHoje.historicoConsumo.push(novoHistorico);

        // Atualizar remote (simulado) e local com mesmo ID
        const syncedRecord = await persistRemote(ROTINAS_ASSISTENCIAIS_API_URL, registroHoje, true);
        return storage.put(ROTINAS_ASSISTENCIAIS_STORE, syncedRecord);
      } else {
        // Cria um novo registro
        const registro = {
          id: generateId('ra'), // Pode manter o prefixo ra por estar no mesmo store
          residenteId: String(payload.residenteId),
          tipoRegistro: 'Hidratacao',
          agua: payload.agua || 0,
          suco: payload.suco || 0,
          recusou: payload.recusou,
          observacoes: payload.observacoes ? `[${horarioAtual}] ` + String(payload.observacoes).trim() : '',
          historicoConsumo: [novoHistorico],
          ...buildMetadata(currentUser, getNow),
        };

        const syncedRecord = await persistRemote(ROTINAS_ASSISTENCIAIS_API_URL, registro);
        return storage.put(ROTINAS_ASSISTENCIAIS_STORE, syncedRecord);
      }
    },

    async registrarMedicamentos(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ASSISTENCIA_REGISTRAR);
      if (!payload.residenteId) throw new ServiceError(ERROR_CODES.VALIDATION_ERROR, 'residenteId é obrigatório');

      const dataHoje = formatDate(normalizeDate(getNow()));
      
      const historicoRotinas = await storage.list(ROTINAS_ASSISTENCIAIS_STORE);
      const registroHoje = historicoRotinas.find(r => 
        r.residenteId === String(payload.residenteId) && 
        r.tipoRegistro === 'Medicamentos' &&
        r.data === dataHoje
      );

      if (registroHoje) {
        if (payload.registros) {
          registroHoje.registros = payload.registros;
        }

        const syncedRecord = await persistRemote(ROTINAS_ASSISTENCIAIS_API_URL, registroHoje, true);
        return storage.put(ROTINAS_ASSISTENCIAIS_STORE, syncedRecord);
      } else {
        const registro = {
          id: generateId('ra'),
          residenteId: String(payload.residenteId),
          tipoRegistro: 'Medicamentos',
          registros: payload.registros || [],
          ...buildMetadata(currentUser, getNow),
        };

        const syncedRecord = await persistRemote(ROTINAS_ASSISTENCIAIS_API_URL, registro);
        return storage.put(ROTINAS_ASSISTENCIAIS_STORE, syncedRecord);
      }
    },

    async registrarHigiene(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ASSISTENCIA_REGISTRAR);
      assertRequiredFields(payload, REQUIRED_HIGIENE_FIELDS);

      const dataHoje = formatDate(normalizeDate(getNow()));
      
      const historicoRotinas = await storage.list(ROTINAS_ASSISTENCIAIS_STORE);
      const registroHoje = historicoRotinas.find(r => 
        r.residenteId === String(payload.residenteId) && 
        r.tipoRegistro === 'Higiene' &&
        r.data === dataHoje
      );

      if (registroHoje) {
        // Atualiza arrays substituindo ou inserindo dados
        if (payload.procedimentos) {
          registroHoje.procedimentos = payload.procedimentos;
        }
        if (payload.eliminacoes) {
          registroHoje.eliminacoes = payload.eliminacoes;
        }

        const syncedRecord = await persistRemote(ROTINAS_ASSISTENCIAIS_API_URL, registroHoje, true);
        return storage.put(ROTINAS_ASSISTENCIAIS_STORE, syncedRecord);
      } else {
        const registro = {
          id: generateId('ra'),
          residenteId: String(payload.residenteId),
          tipoRegistro: 'Higiene',
          procedimentos: payload.procedimentos || {},
          eliminacoes: payload.eliminacoes || {},
          ...buildMetadata(currentUser, getNow),
        };

        const syncedRecord = await persistRemote(ROTINAS_ASSISTENCIAIS_API_URL, registro);
        return storage.put(ROTINAS_ASSISTENCIAIS_STORE, syncedRecord);
      }
    },

    async listarHistoricoPorResidente(residenteId, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ASSISTENCIA_LIST);
      assertRequiredFields({ residenteId }, ['residenteId']);

      await Promise.all([
        syncRemoteStore(storage, SINAIS_VITAIS_STORE, SINAIS_VITAIS_API_URL, 'Sinais vitais'),
        syncRemoteStore(storage, ROTINAS_ASSISTENCIAIS_STORE, ROTINAS_ASSISTENCIAIS_API_URL, 'Rotina assistencial/Hidratacao/Higiene'),
      ]);

      const [sinaisVitais, rotinasAssistenciais] = await Promise.all([
        storage.list(SINAIS_VITAIS_STORE),
        storage.list(ROTINAS_ASSISTENCIAIS_STORE),
      ]);
      const selectedResidentId = String(residenteId);

      return [
        ...sinaisVitais.map((record) => normalizeRecord(record, 'Sinais vitais', SINAIS_VITAIS_STORE)),
        ...rotinasAssistenciais.map((record) => normalizeRecord(record, 'Rotina assistencial', ROTINAS_ASSISTENCIAIS_STORE)),
      ]
        .filter((record) => record.residenteId === selectedResidentId)
        .sort((a, b) => new Date(b.registradoEm).getTime() - new Date(a.registradoEm).getTime());
    },
  };
}

export const assistenciaService = createAssistenciaService({
  getCurrentUser: () => authService.getCurrentUser(),
});
