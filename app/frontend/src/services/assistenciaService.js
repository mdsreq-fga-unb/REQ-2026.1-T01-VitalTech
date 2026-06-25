import { authService } from './authService.js';
import { ERROR_CODES, ServiceError } from './errors.js';
import { assertPermission, PERMISSOES } from './permissions.js';
import { defaultStorage } from './storage.js';
import { assertRequiredFields, generateId } from './validation.js';

const SINAIS_VITAIS_API_URL = 'http://localhost:3001/sinaisVitais';
const ROTINAS_ASSISTENCIAIS_API_URL = 'http://localhost:3001/rotinasAssistenciais';

const REQUIRED_SINAIS_VITAIS_FIELDS = [
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

const FAIXAS_CLINICAS = Object.freeze({
  pressaoSistolica: { min: 60, max: 250, unidade: 'mmHg' },
  pressaoDiastolica: { min: 30, max: 160, unidade: 'mmHg' },
  frequenciaCardiaca: { min: 30, max: 220, unidade: 'bpm' },
  temperatura: { min: 34, max: 42, unidade: 'C' },
  glicemia: { min: 20, max: 600, unidade: 'mg/dL' },
});

function toTrimmedString(value) {
  return String(value ?? '').trim();
}

function toNumber(value, field) {
  const normalized = toTrimmedString(value).replace(',', '.');
  const parsed = Number(normalized);

  if (!Number.isFinite(parsed)) {
    throw new ServiceError(
      ERROR_CODES.INVALID_VALUES,
      'Revise os valores informados.',
      { field },
    );
  }

  return parsed;
}

function parsePressaoArterial(value) {
  const normalized = toTrimmedString(value).replace(/\s+/g, '');
  const match = normalized.match(/^(\d{2,3})\/(\d{2,3})$/);

  if (!match) {
    throw new ServiceError(
      ERROR_CODES.INVALID_VALUES,
      'Informe a pressao arterial no formato 120/80.',
      { field: 'pressaoArterial' },
    );
  }

  return {
    sistolica: Number(match[1]),
    diastolica: Number(match[2]),
    texto: normalized,
  };
}

function pad2(value) {
  return String(value).padStart(2, '0');
}

function getTimestampParts(now) {
  const date = now instanceof Date ? now : new Date(now);
  const registradoEm = date.toISOString();

  return {
    registradoEm,
    data: `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`,
    horario: `${pad2(date.getHours())}:${pad2(date.getMinutes())}`,
  };
}

function identifyOutOfRange(field, value, range, extra = {}) {
  if (value >= range.min && value <= range.max) return null;

  return {
    campo: field,
    valor: value,
    minimo: range.min,
    maximo: range.max,
    unidade: range.unidade,
    ...extra,
  };
}

function identificarCamposForaDoParametro(vitais) {
  const campos = [
    identifyOutOfRange(
      'pressaoArterial',
      vitais.pressaoArterial.sistolica,
      FAIXAS_CLINICAS.pressaoSistolica,
      { medida: 'sistolica' },
    ),
    vitais.pressaoArterial.diastolica === null
      ? null
      : identifyOutOfRange(
        'pressaoArterial',
        vitais.pressaoArterial.diastolica,
        FAIXAS_CLINICAS.pressaoDiastolica,
        { medida: 'diastolica' },
      ),
    identifyOutOfRange(
      'frequenciaCardiaca',
      vitais.frequenciaCardiaca,
      FAIXAS_CLINICAS.frequenciaCardiaca,
    ),
    identifyOutOfRange(
      'temperatura',
      vitais.temperatura,
      FAIXAS_CLINICAS.temperatura,
    ),
    identifyOutOfRange(
      'glicemia',
      vitais.glicemia,
      FAIXAS_CLINICAS.glicemia,
    ),
  ].filter(Boolean);

  return campos;
}

function normalizeRotinaValue(value) {
  return typeof value === 'boolean' ? value : toTrimmedString(value);
}

function normalizePercentual(value) {
  const percentual = toNumber(value, 'percentualAceitacao');

  if (percentual < 0 || percentual > 100) {
    throw new ServiceError(
      ERROR_CODES.INVALID_VALUES,
      'O percentual de aceitacao deve estar entre 0 e 100.',
      { field: 'percentualAceitacao', min: 0, max: 100 },
    );
  }

  return percentual;
}

async function assertResidenteExiste(storage, residenteId) {
  const residente = await storage.get('residentes', residenteId);

  if (!residente || residente.isAtivo === false) {
    throw new ServiceError(
      ERROR_CODES.NOT_FOUND,
      'Residente nao encontrado.',
      { residenteId },
    );
  }

  return residente;
}

async function persistirRegistro(storage, storeName, apiUrl, registro) {
  await storage.put(storeName, registro);

  try {
    const remotePayload = { ...registro };
    delete remotePayload.id;
    delete remotePayload.remoteId;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(remotePayload),
    });

    if (!response.ok) {
      throw new Error(`Backend Mock respondeu com HTTP ${response.status}.`);
    }

    const remoteRecord = await response.json();
    const syncedRecord = {
      ...registro,
      remoteId: String(remoteRecord.id ?? registro.remoteId ?? ''),
    };

    await storage.put(storeName, syncedRecord);
    return syncedRecord;
  } catch (error) {
    console.warn('Nao foi possivel sincronizar o registro assistencial. Registro salvo apenas localmente.', error);
    return registro;
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

  function buildMetadata(currentUser) {
    const timestamp = getTimestampParts(getNow());

    return {
      ...timestamp,
      responsavelId: currentUser.id,
      responsavelNome: currentUser.nomeCompleto,
      createdAt: timestamp.registradoEm,
      createdBy: currentUser.id,
    };
  }

  async function listarRegistrosAssistenciaisPorResidente(residenteId, actor = null) {
    const currentUser = await resolveActor(actor);
    assertPermission(currentUser, PERMISSOES.ASSISTENCIA_LIST);

    if (!residenteId) {
      throw new ServiceError(
        ERROR_CODES.REQUIRED_FIELDS,
        'Informe o residente para consultar o historico.',
        { missingFields: ['residenteId'] },
      );
    }

    await assertResidenteExiste(storage, residenteId);

    const [sinaisVitais, rotinasAssistenciais] = await Promise.all([
      storage.list('sinaisVitais'),
      storage.list('rotinasAssistenciais'),
    ]);

    return [...sinaisVitais, ...rotinasAssistenciais]
      .filter((registro) => registro.residenteId === residenteId)
      .sort((a, b) => new Date(b.registradoEm).getTime() - new Date(a.registradoEm).getTime());
  }

  return {
    async registrarSinaisVitais(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ASSISTENCIA_CREATE);
      assertRequiredFields(payload, REQUIRED_SINAIS_VITAIS_FIELDS);
      await assertResidenteExiste(storage, payload.residenteId);

      const vitais = {
        pressaoArterial: parsePressaoArterial(payload.pressaoArterial),
        frequenciaCardiaca: toNumber(payload.frequenciaCardiaca, 'frequenciaCardiaca'),
        temperatura: toNumber(payload.temperatura, 'temperatura'),
        glicemia: toNumber(payload.glicemia, 'glicemia'),
      };
      const camposForaDoParametro = identificarCamposForaDoParametro(vitais);

      if (camposForaDoParametro.length > 0 && !payload.confirmarForaDoParametro) {
        throw new ServiceError(
          ERROR_CODES.VALUES_OUT_OF_RANGE,
          'Existem valores fora dos parametros clinicos. Confirme antes de salvar.',
          { camposForaDoParametro },
        );
      }

      const registro = {
        id: generateId('sv'),
        tipoRegistro: 'sinais_vitais',
        residenteId: payload.residenteId,
        pressaoArterial: vitais.pressaoArterial.texto,
        pressaoSistolica: vitais.pressaoArterial.sistolica,
        pressaoDiastolica: vitais.pressaoArterial.diastolica,
        frequenciaCardiaca: vitais.frequenciaCardiaca,
        temperatura: vitais.temperatura,
        glicemia: vitais.glicemia,
        foraDosParametros: camposForaDoParametro.length > 0,
        camposForaDoParametro,
        observacoes: payload.observacoes ? toTrimmedString(payload.observacoes) : '',
        ...buildMetadata(currentUser),
      };

      return persistirRegistro(storage, 'sinaisVitais', SINAIS_VITAIS_API_URL, registro);
    },

    async registrarRotinaAssistencial(payload, actor = null) {
      const currentUser = await resolveActor(actor);
      assertPermission(currentUser, PERMISSOES.ASSISTENCIA_CREATE);
      assertRequiredFields(payload, REQUIRED_ROTINA_FIELDS);
      await assertResidenteExiste(storage, payload.residenteId);

      const registro = {
        id: generateId('rot'),
        tipoRegistro: 'rotina_assistencial',
        residenteId: payload.residenteId,
        tipoRefeicao: toTrimmedString(payload.tipoRefeicao),
        percentualAceitacao: normalizePercentual(payload.percentualAceitacao),
        banho: normalizeRotinaValue(payload.banho),
        troca: normalizeRotinaValue(payload.troca),
        cuidadosBucais: normalizeRotinaValue(payload.cuidadosBucais),
        observacoes: payload.observacoes ? toTrimmedString(payload.observacoes) : '',
        ...buildMetadata(currentUser),
      };

      return persistirRegistro(
        storage,
        'rotinasAssistenciais',
        ROTINAS_ASSISTENCIAIS_API_URL,
        registro,
      );
    },

    listarRegistrosAssistenciaisPorResidente,

    async listarSinaisVitaisPorResidente(residenteId, actor = null) {
      return (await listarRegistrosAssistenciaisPorResidente(residenteId, actor))
        .filter((registro) => registro.tipoRegistro === 'sinais_vitais');
    },

    async listarRotinasAssistenciaisPorResidente(residenteId, actor = null) {
      return (await listarRegistrosAssistenciaisPorResidente(residenteId, actor))
        .filter((registro) => registro.tipoRegistro === 'rotina_assistencial');
    },
  };
}

export const assistenciaService = createAssistenciaService({
  getCurrentUser: () => authService.getCurrentUser(),
});
