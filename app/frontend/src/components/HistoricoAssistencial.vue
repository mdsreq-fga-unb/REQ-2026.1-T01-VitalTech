<script setup>
import { ref, watch } from 'vue'
import { assistenciaService } from '../services'
import { getServiceErrorMessage } from '../utils/serviceErrors.js'

const props = defineProps({
  residente: {
    type: Object,
    required: true,
  },
  refreshKey: {
    type: Number,
    default: 0,
  },
})

const registros = ref([])
const resumo = ref(null)
const carregando = ref(false)
const errorMessage = ref('')

async function carregarHistorico() {
  if (!props.residente?.id) {
    registros.value = []
    resumo.value = null
    return
  }

  carregando.value = true
  errorMessage.value = ''

  try {
    const [historico, resumoAssistencial] = await Promise.all([
      assistenciaService.listarHistoricoPorResidente(props.residente.id),
      assistenciaService.obterResumoAssistencial(props.residente.id),
    ])
    registros.value = historico
    resumo.value = resumoAssistencial
  } catch (error) {
    registros.value = []
    resumo.value = null
    errorMessage.value = getServiceErrorMessage(error)
  } finally {
    carregando.value = false
  }
}

function formatarData(data) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(data ?? ''))
  if (!match) return data || '--'
  return `${match[3]}/${match[2]}/${match[1]}`
}

function formatarDataHoraEvento(dataHora) {
  const match = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(String(dataHora ?? ''))
  if (!match) return dataHora || '--'
  return `${match[3]}/${match[2]}/${match[1]} as ${match[4]}:${match[5]}`
}

function detalheRegistro(registro) {
  if (registro.tipoRegistro === 'Sinais vitais') {
    return `PA ${registro.pressaoArterial || '--'} | FC ${registro.frequenciaCardiaca || '--'} bpm | Temp. ${registro.temperatura || '--'} C | Glicemia ${registro.glicemia || '--'} mg/dL`
  }
  if (registro.tipoRegistro === 'Hidratacao') {
    let detalhe = `Água: ${registro.agua || 0} copos | Suco: ${registro.suco || 0} copos`
    if (registro.recusou) detalhe += ` | Recusou`
    if (registro.observacoes) detalhe += ` | Obs: Sim`
    return detalhe
  }

  if (registro.tipoRegistro === 'Higiene') {
    const p = registro.procedimentos || {}
    const e = registro.eliminacoes || {}
    const banhos = p.banhos?.filter(b => !b.recusou)?.length || 0
    const recusasBanho = p.banhos?.filter(b => b.recusou)?.length || 0
    let det = `Banhos: ${banhos} | Trocas: ${p.trocaFralda?.length || 0}`
    if (recusasBanho > 0) det += ` (${recusasBanho} recusas)`
    if (e.urina?.length) det += ` | Urina: ${e.urina.join(', ')}`
    if (e.fezes?.length) det += ` | Fezes: ${e.fezes.join(', ')}`
    return det
  }

  if (registro.tipoRegistro === 'Medicamentos') {
    const meds = registro.registros || []
    const dados = meds.filter(m => String(m.status || '').toLowerCase() === 'administrado').length
    const recusas = meds.filter(m => ['nao_administrado', 'não administrado', 'nao administrado', 'recusa'].includes(String(m.status || '').toLowerCase())).length
    return `Administrados: ${dados} | Não administrados: ${recusas}`
  }

  if (registro.tipoRegistro === 'Ocorrência') {
    return `${registro.tipoOcorrencia} (${registro.gravidade}) | Evento: ${formatarDataHoraEvento(registro.dataHora)} | Família comunicada: ${registro.comunicadoFamilia || 'N/A'} | Medidas adotadas: ${registro.medidasAdotadas ? 'Sim' : 'Não'}`
  }

  return `${registro.tipoRefeicao || 'Rotina'} | Aceitacao ${registro.percentualAceitacao || '--'}% | Banho: ${registro.banho || '--'} | Troca: ${registro.troca || '--'} | Bucal: ${registro.cuidadosBucais || '--'}`
}

function tipoHistorico(tipoRegistro) {
  if (tipoRegistro === 'sinais_vitais') return 'Sinais vitais'
  if (tipoRegistro === 'rotina_assistencial') return 'Rotina assistencial'
  if (tipoRegistro === 'ocorrencia_clinica' || tipoRegistro === 'Ocorrencia') return 'Ocorrência'
  return tipoRegistro
}

function resumoItem(registro) {
  if (!registro) return 'Sem registro'
  return `${tipoHistorico(registro.tipoRegistro)} - ${formatarData(registro.data)} as ${registro.horario} - ${registro.responsavelNome || 'Responsavel nao informado'}`
}

watch(
  () => [props.residente?.id, props.refreshKey],
  carregarHistorico,
  { immediate: true },
)
</script>

<template>
  <section class="historico-assistencial">
    <div class="section-header">
      <div>
        <p class="section-label">HISTORICO ASSISTENCIAL</p>
        <h3 class="section-title">Registros do residente</h3>
      </div>
      <span class="contador">{{ registros.length }} registro{{ registros.length === 1 ? '' : 's' }}</span>
    </div>

    <div v-if="carregando" class="estado">Carregando historico...</div>

    <div v-else-if="errorMessage" class="estado estado-erro" role="alert">
      {{ errorMessage }}
    </div>

    <div v-else-if="resumo" class="resumo-assistencial">
      <div class="resumo-item" :class="{ vazio: resumo.estadosVazios.sinaisVitais }">
        <span>Sinais vitais</span>
        <strong>{{ resumoItem(resumo.modulos.sinaisVitais) }}</strong>
      </div>
      <div class="resumo-item" :class="{ vazio: resumo.estadosVazios.rotinasAssistenciais }">
        <span>Rotinas</span>
        <strong>{{ resumoItem(resumo.modulos.rotinasAssistenciais) }}</strong>
      </div>
      <div class="resumo-item" :class="{ vazio: resumo.estadosVazios.medicamentos }">
        <span>Medicamentos</span>
        <strong>{{ resumoItem(resumo.modulos.medicamentos) }}</strong>
      </div>
      <div class="resumo-item" :class="{ vazio: resumo.estadosVazios.ocorrencias }">
        <span>Ocorrências</span>
        <strong>{{ resumoItem(resumo.modulos.ocorrencias) }}</strong>
      </div>
    </div>

    <div v-if="!carregando && !errorMessage && registros.length === 0" class="estado">
      Nao ha registros assistenciais disponiveis para este residente.
    </div>

    <div v-else-if="!carregando && !errorMessage" class="historico-lista">
      <article
        v-for="registro in registros"
        :key="`${registro.origem}-${registro.id}`"
        class="historico-item"
        :class="{ alerta: registro.foraDosParametros || registro.tipoRegistro === 'Ocorrência' }"
      >
        <div class="historico-topo">
          <span class="tipo">{{ registro.tipoRegistro }}</span>
          <span class="data-hora">{{ formatarData(registro.data) }} as {{ registro.horario }}</span>
        </div>
        <p class="detalhe">{{ detalheRegistro(registro) }}</p>
        <div class="responsavel">
          Responsavel: <strong>{{ registro.responsavelNome }}</strong>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.historico-assistencial {
  background: #fff;
  border: 1px solid #e8ecf2;
  border-radius: 12px;
  padding: 20px;
}

.section-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.section-label {
  color: #3B6FE8;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  margin: 0 0 4px;
}

.section-title {
  color: #1a1a2e;
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.contador {
  background: #f0f4f8;
  border-radius: 999px;
  color: #4a5568;
  font-size: 12px;
  font-weight: 700;
  padding: 6px 10px;
  white-space: nowrap;
}

.estado {
  border: 1px dashed #cbd5e0;
  border-radius: 10px;
  color: #718096;
  font-size: 14px;
  padding: 24px;
  text-align: center;
}

.estado-erro {
  background: #fff5f5;
  border-color: #feb2b2;
  color: #c53030;
}

.resumo-assistencial {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 16px;
}

.resumo-item {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  padding: 10px 12px;
  min-height: 74px;
}

.resumo-item span {
  display: block;
  color: #3B6FE8;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.06em;
  margin-bottom: 6px;
  text-transform: uppercase;
}

.resumo-item strong {
  color: #1a1a2e;
  display: block;
  font-size: 12px;
  line-height: 1.35;
}

.resumo-item.vazio strong {
  color: #718096;
  font-weight: 600;
}

.historico-lista {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-height: 420px;
  overflow-y: auto;
  padding-right: 4px;
}

.historico-item {
  border: 1px solid #edf2f7;
  border-left: 4px solid #3B6FE8;
  border-radius: 8px;
  padding: 12px 14px;
}

.historico-item.alerta {
  border-left-color: #e53e3e;
  background: #fffafa;
}

.historico-topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
}

.tipo {
  color: #1a1a2e;
  font-size: 14px;
  font-weight: 800;
}

.data-hora {
  color: #718096;
  font-size: 12px;
  font-weight: 700;
  white-space: nowrap;
}

.detalhe {
  color: #4a5568;
  font-size: 13px;
  line-height: 1.45;
  margin: 0 0 8px;
}

.responsavel {
  color: #718096;
  font-size: 12px;
}

.responsavel strong {
  color: #1a1a2e;
}

@media (max-width: 640px) {
  .historico-assistencial {
    padding: 16px;
  }

  .section-header {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }

  .historico-topo {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  .resumo-assistencial {
    grid-template-columns: 1fr;
  }

  .data-hora {
    white-space: normal;
  }

  .historico-lista {
    max-height: 50vh;
  }
}
</style>
