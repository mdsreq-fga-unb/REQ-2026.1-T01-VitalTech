<script setup>
import { computed, ref, watch } from 'vue'
import { assistenciaService } from '../services'
import { filtrarHistoricoPorPeriodo, isDataInicialPosterior } from '../utils/date.js'
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
const carregando = ref(false)
const errorMessage = ref('')
const filtroDataInicio = ref('')
const filtroDataFim = ref('')
const filtroDataInicioAplicado = ref('')
const filtroDataFimAplicado = ref('')
const filtroAplicado = ref(false)
const filtroErrorMessage = ref('')

const registrosExibidos = computed(() => {
  if (!filtroAplicado.value) return registros.value

  return filtrarHistoricoPorPeriodo(
    registros.value,
    filtroDataInicioAplicado.value,
    filtroDataFimAplicado.value,
  )
})

const contadorTexto = computed(() => {
  const total = registrosExibidos.value.length
  return `${total} registro${total === 1 ? '' : 's'}`
})

async function carregarHistorico() {
  if (!props.residente?.id) {
    registros.value = []
    return
  }

  carregando.value = true
  errorMessage.value = ''

  try {
    registros.value = await assistenciaService.listarHistoricoPorResidente(props.residente.id)
  } catch (error) {
    registros.value = []
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

function aplicarFiltro() {
  filtroErrorMessage.value = ''

  if (isDataInicialPosterior(filtroDataInicio.value, filtroDataFim.value)) {
    filtroErrorMessage.value = 'A data inicial nao pode ser posterior a data final.'
    return
  }

  filtroDataInicioAplicado.value = filtroDataInicio.value
  filtroDataFimAplicado.value = filtroDataFim.value
  filtroAplicado.value = Boolean(filtroDataInicio.value || filtroDataFim.value)
}

function limparFiltro() {
  filtroDataInicio.value = ''
  filtroDataFim.value = ''
  filtroDataInicioAplicado.value = ''
  filtroDataFimAplicado.value = ''
  filtroAplicado.value = false
  filtroErrorMessage.value = ''
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
    return `${registro.tipoOcorrencia} (${registro.gravidade}) | Família comunicada: ${registro.comunicadoFamilia || 'N/A'} | Medidas adotadas: ${registro.medidasAdotadas ? 'Sim' : 'Não'}`
  }

  return `${registro.tipoRefeicao || 'Rotina'} | Aceitacao ${registro.percentualAceitacao || '--'}% | Banho: ${registro.banho || '--'} | Troca: ${registro.troca || '--'} | Bucal: ${registro.cuidadosBucais || '--'}`
}

watch(
  () => props.residente?.id,
  () => {
    limparFiltro()
    carregarHistorico()
  },
  { immediate: true },
)

watch(
  () => props.refreshKey,
  carregarHistorico,
)
</script>

<template>
  <section class="historico-assistencial">
    <div class="section-header">
      <div>
        <p class="section-label">HISTORICO ASSISTENCIAL</p>
        <h3 class="section-title">Registros do residente</h3>
      </div>
      <span class="contador">{{ contadorTexto }}</span>
    </div>

    <form class="filtro-periodo" @submit.prevent="aplicarFiltro">
      <label class="field">
        <span>Data inicial</span>
        <input v-model="filtroDataInicio" type="date" />
      </label>

      <label class="field">
        <span>Data final</span>
        <input v-model="filtroDataFim" type="date" />
      </label>

      <div class="filtro-acoes">
        <button class="btn-primary" type="submit">Aplicar filtro</button>
        <button class="btn-secondary" type="button" @click="limparFiltro">Limpar filtro</button>
      </div>
    </form>

    <div v-if="filtroErrorMessage" class="feedback feedback-error" role="alert">
      {{ filtroErrorMessage }}
    </div>

    <div v-if="carregando" class="estado">Carregando historico...</div>

    <div v-else-if="errorMessage" class="estado estado-erro" role="alert">
      {{ errorMessage }}
    </div>

    <div v-else-if="registros.length === 0" class="estado">
      Nao ha registros assistenciais disponiveis para este residente.
    </div>

    <div v-else-if="registrosExibidos.length === 0" class="estado">
      Nao ha registros no periodo selecionado.
    </div>

    <div v-else class="historico-lista">
      <article
        v-for="registro in registrosExibidos"
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

.filtro-periodo {
  align-items: flex-end;
  border: 1px solid #edf2f7;
  border-radius: 10px;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(2, minmax(0, 1fr)) auto;
  margin-bottom: 12px;
  padding: 12px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field span {
  color: #718096;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.field input {
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  color: #1a1a2e;
  font: inherit;
  height: 38px;
  padding: 0 10px;
}

.filtro-acoes {
  display: flex;
  gap: 8px;
}

.btn-primary,
.btn-secondary {
  border: 0;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  height: 38px;
  padding: 0 14px;
  white-space: nowrap;
}

.btn-primary {
  background: #3B6FE8;
  color: #fff;
}

.btn-secondary {
  background: #edf2f7;
  color: #4a5568;
}

.feedback {
  border-radius: 8px;
  font-size: 13px;
  margin-bottom: 12px;
  padding: 10px 12px;
}

.feedback-error {
  background: #fff5f5;
  border: 1px solid #feb2b2;
  color: #c53030;
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

  .data-hora {
    white-space: normal;
  }

  .filtro-periodo {
    grid-template-columns: 1fr;
  }

  .filtro-acoes {
    flex-direction: column;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
  }

  .historico-lista {
    max-height: 50vh;
  }
}
</style>
