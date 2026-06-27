<script setup>
import { reactive, ref, computed } from 'vue'
import { assistenciaService, ERROR_CODES } from '../services'
import { useToastStore } from '../stores/toast.js'
import { getServiceErrorMessage } from '../utils/serviceErrors.js'

const props = defineProps({
  residente: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['registrado'])
const toastStore = useToastStore()

const activeForm = ref(null) // null = Menu, 'sinais' = Sinais Vitais, 'rotina' = Rotina
const salvando = ref(false)
const errorMessage = ref('')
const confirmacaoPendente = ref(false)

const sinaisVitais = reactive({
  sistolica: '',
  diastolica: '',
  frequenciaCardiaca: '',
  temperatura: '',
  glicemia: '',
  saturacaoO2: '',
  respiracao: '',
  confirmarForaDoParametro: false,
})

// Categorias de refeição conforme protótipo do cliente
const MEAL_CATEGORIES = [
  { key: 'desjejum', label: 'Desjejum (Café da Manhã)', section: 'alimentacao' },
  { key: 'almoco', label: 'Almoço', section: 'alimentacao' },
  { key: 'colacao', label: 'Colação (vitamina)', section: 'alimentacao' },
  { key: 'lanche', label: 'Lanche', section: 'alimentacao' },
  { key: 'jantar', label: 'Jantar', section: 'alimentacao' },
  { key: 'ceia', label: 'Ceia', section: 'alimentacao' },
]

const ACCEPTANCE_OPTIONS = ['Recusou', 'Pouco', 'Metade', 'Tudo']

const ACCEPTANCE_MAP = { 'Recusou': 0, 'Pouco': 25, 'Metade': 50, 'Tudo': 100 }

const refeicoes = reactive(
  Object.fromEntries(MEAL_CATEGORIES.map(m => [m.key, '']))
)

const cuidados = reactive({
  banho: '',
  troca: '',
  cuidadosBucais: '',
})

const observacoesRotina = ref('')

const hidratacao = reactive({
  agua: 0,
  suco: 0,
  recusou: false,
  observacoes: ''
})

const totaisHidratacaoHoje = reactive({
  agua: 0,
  suco: 0
})

const procedimentosHigiene = reactive({
  banhos: [],
  recusouBanho: false,
  hidratacaoPele: [],
  higieneOral: [],
  repelente: [],
  trocaFralda: []
})

const CARACT_URINA = ['Ausência', 'Normal', 'Excessiva', 'Turva', 'Escura', 'Avermelhada']
const CARACT_FEZES = ['Ausência', 'Líquida', 'Pastosa', 'Endurecida', 'Presença de Sangue', 'Excessiva']

const eliminacoes = reactive({
  urina: [],
  fezes: []
})

const ocorrencia = reactive({
  tipoOcorrencia: '',
  gravidade: '',
  descricao: '',
  medidasAdotadas: '',
  comunicadoFamilia: ''
})

function toggleEliminacao(tipo, valor) {
  const arr = eliminacoes[tipo]
  const idx = arr.indexOf(valor)
  if (idx > -1) {
    arr.splice(idx, 1)
  } else {
    arr.push(valor)
  }
}

function registrarHora(procedimento, isRecusa = false) {
  const agora = new Date()
  const hh = String(agora.getHours()).padStart(2, '0')
  const mm = String(agora.getMinutes()).padStart(2, '0')
  procedimentosHigiene[procedimento].push({ hora: `${hh}:${mm}`, recusou: isRecusa })
}

function removerHora(procedimento, index) {
  procedimentosHigiene[procedimento].splice(index, 1)
}


function toggleMeal(key, value) {
  refeicoes[key] = refeicoes[key] === value ? '' : value
}

function toggleCuidado(field, value) {
  cuidados[field] = cuidados[field] === value ? '' : value
}

// RN-07: Alerta Visual Reativo
const isCritical = computed(() => {
  const sis = Number(sinaisVitais.sistolica)
  const dia = Number(sinaisVitais.diastolica)
  const freq = Number(sinaisVitais.frequenciaCardiaca)
  const temp = Number(sinaisVitais.temperatura)
  const glic = Number(sinaisVitais.glicemia)
  const sat = Number(sinaisVitais.saturacaoO2)
  const resp = Number(sinaisVitais.respiracao)

  if (sis && (sis < 60 || sis > 250)) return true;
  if (dia && (dia < 30 || dia > 150 || dia >= sis)) return true;
  if (freq && (freq < 30 || freq > 220)) return true;
  if (temp && (temp < 34 || temp > 42)) return true;
  if (glic && (glic < 20 || glic > 600)) return true;
  if (sat && (sat < 85 || sat > 100)) return true;
  if (resp && (resp < 10 || resp > 35)) return true;

  return false;
})

function formatVal(val, step) {
  if (val === '') return ''
  return step < 1 ? Number(val).toFixed(1) : Number(val).toFixed(0)
}

function incr(field, step = 1, max = null) {
  let val = Number(sinaisVitais[field]) || 0
  if (max && val >= max) return
  sinaisVitais[field] = formatVal(val + step, step)
}

function decr(field, step = 1, min = 0) {
  let val = Number(sinaisVitais[field]) || 0
  if (val <= min) return
  sinaisVitais[field] = formatVal(val - step, step)
}

function incrH(field) {
  hidratacao[field]++
}

function decrH(field) {
  if (hidratacao[field] > 0) hidratacao[field]--
}

function limparSinaisVitais() {
  sinaisVitais.sistolica = ''
  sinaisVitais.diastolica = ''
  sinaisVitais.frequenciaCardiaca = ''
  sinaisVitais.temperatura = ''
  sinaisVitais.glicemia = ''
  sinaisVitais.saturacaoO2 = ''
  sinaisVitais.respiracao = ''
  sinaisVitais.confirmarForaDoParametro = false
  confirmacaoPendente.value = false
}

function limparRotina() {
  MEAL_CATEGORIES.forEach(m => { refeicoes[m.key] = '' })
  cuidados.banho = ''
  cuidados.troca = ''
  cuidados.cuidadosBucais = ''
  observacoesRotina.value = ''
}

async function salvarOcorrencia() {
  if (salvando.value) return
  
  if (!ocorrencia.tipoOcorrencia || !ocorrencia.gravidade || !ocorrencia.descricao) {
    errorMessage.value = 'Preencha todos os campos obrigatórios (*)'
    return
  }

  salvando.value = true
  errorMessage.value = ''

  try {
    await assistenciaService.registrarOcorrencia({
      residenteId: props.residente.id,
      ...ocorrencia
    })

    // Resetar o form
    ocorrencia.tipoOcorrencia = ''
    ocorrencia.gravidade = ''
    ocorrencia.descricao = ''
    ocorrencia.medidasAdotadas = ''
    ocorrencia.comunicadoFamilia = ''
    
    toastStore.success('Ocorrência registrada com sucesso!')
    emit('registrado')
    setForm(null)
  } catch (err) {
    console.error('Erro ao salvar ocorrência:', err)
    errorMessage.value = getServiceErrorMessage(err)
  } finally {
    salvando.value = false
  }
}

async function salvarSinaisVitais() {
  salvando.value = true
  errorMessage.value = ''

  try {
    await assistenciaService.registrarSinaisVitais({
      residenteId: props.residente.id,
      pressaoArterial: `${sinaisVitais.sistolica}/${sinaisVitais.diastolica}`,
      frequenciaCardiaca: sinaisVitais.frequenciaCardiaca,
      temperatura: sinaisVitais.temperatura,
      glicemia: sinaisVitais.glicemia,
      saturacaoO2: sinaisVitais.saturacaoO2,
      respiracao: sinaisVitais.respiracao,
      confirmarForaDoParametro: sinaisVitais.confirmarForaDoParametro,
    })
    limparSinaisVitais()
    toastStore.show('Sinais vitais registrados com sucesso!', 'success')
    activeForm.value = null
    emit('registrado')
  } catch (error) {
    if (error.code === ERROR_CODES.VALUES_OUT_OF_RANGE && !sinaisVitais.confirmarForaDoParametro) {
      // RN-06: Em vez de window.confirm nativo que quebra o fluxo UI, usamos flag reativa se quisermos
      // Mas para manter a consistência com o que existia e garantir que seja bloqueante:
      const confirmado = window.confirm('Existem valores fora dos parâmetros clínicos. Deseja salvar mesmo assim?')
      if (confirmado) {
        sinaisVitais.confirmarForaDoParametro = true
        await salvarSinaisVitais()
        return
      }
    }
    errorMessage.value = getServiceErrorMessage(error)
  } finally {
    salvando.value = false
  }
}

async function carregarTotaisHidratacao() {
  try {
    const dataHoje = new Date()
    const anoMesDia = `${dataHoje.getFullYear()}-${String(dataHoje.getMonth() + 1).padStart(2, '0')}-${String(dataHoje.getDate()).padStart(2, '0')}`
    
    // Lista historico e filtra
    const result = await assistenciaService.listarHistoricoPorResidente(props.residente.id)
    const registros = result.filter(r => r.tipoRegistro === 'Hidratacao' && r.data === anoMesDia)
    
    if (registros.length > 0) {
      totaisHidratacaoHoje.agua = registros[0].agua || 0
      totaisHidratacaoHoje.suco = registros[0].suco || 0
    } else {
      totaisHidratacaoHoje.agua = 0
      totaisHidratacaoHoje.suco = 0
    }
  } catch (err) {
    console.error('Erro ao carregar totais de hidratação:', err)
  }
}

function setForm(formName) {
  activeForm.value = formName
  errorMessage.value = ''
  if (formName === 'hidratacao') {
    hidratacao.agua = 0
    hidratacao.suco = 0
    hidratacao.recusou = false
    hidratacao.observacoes = ''
    carregarTotaisHidratacao()
  } else if (formName === 'higiene') {
    carregarDadosHigiene()
  } else if (formName === 'medicamentos') {
    carregarDadosMedicamentos()
  }
}

async function carregarDadosHigiene() {
  try {
    const dataHoje = new Date()
    const anoMesDia = `${dataHoje.getFullYear()}-${String(dataHoje.getMonth() + 1).padStart(2, '0')}-${String(dataHoje.getDate()).padStart(2, '0')}`
    
    const result = await assistenciaService.listarHistoricoPorResidente(props.residente.id)
    const registros = result.filter(r => r.tipoRegistro === 'Higiene' && r.data === anoMesDia)
    
    if (registros.length > 0) {
      const reg = registros[0]
      const loadedProc = reg.procedimentos || {}
      const keys = ['banhos', 'hidratacaoPele', 'higieneOral', 'repelente', 'trocaFralda']
      
      keys.forEach(key => {
        if (loadedProc[key] && Array.isArray(loadedProc[key])) {
          procedimentosHigiene[key] = loadedProc[key].map(item => {
            if (typeof item === 'string') return { hora: item, recusou: false }
            return item
          })
        } else {
          procedimentosHigiene[key] = []
        }
      })
      Object.assign(eliminacoes, reg.eliminacoes || { urina: [], fezes: [] })
    } else {
      Object.assign(procedimentosHigiene, { banhos: [], hidratacaoPele: [], higieneOral: [], repelente: [], trocaFralda: [] })
      Object.assign(eliminacoes, { urina: [], fezes: [] })
    }
  } catch (err) {
    console.error('Erro ao carregar higiene:', err)
  }
}

const medicamentosLista = reactive([])

function setMedicamentoStatus(index, status) {
  medicamentosLista[index].status = status
  if (status === 'administrado') {
    medicamentosLista[index].motivo = ''
  }
}

async function carregarDadosMedicamentos() {
  medicamentosLista.splice(0, medicamentosLista.length)
  if (props.residente && Array.isArray(props.residente.medicamentos)) {
    props.residente.medicamentos.forEach(med => {
      medicamentosLista.push({
        nome: med.nome,
        dose: med.dose,
        frequencia: med.frequencia || '',
        via: med.via,
        status: '',
        motivo: '',
        observacoes: ''
      })
    })
  }
}

async function salvarMedicamentos() {
  salvando.value = true
  errorMessage.value = ''

  const registrosPreenchidos = medicamentosLista.filter(m => m.status !== '')

  if (registrosPreenchidos.length === 0) {
    errorMessage.value = 'Preencha o status de pelo menos um medicamento antes de salvar.'
    salvando.value = false
    return
  }

  for (let i = 0; i < registrosPreenchidos.length; i++) {
    const reg = registrosPreenchidos[i]
    if (reg.status === 'nao_administrado' && !reg.motivo.trim()) {
      errorMessage.value = `Informe o motivo da não administração para o medicamento "${reg.nome}".`
      salvando.value = false
      return
    }
  }

  try {
    await assistenciaService.registrarMedicamentos({
      residenteId: props.residente.id,
      registros: JSON.parse(JSON.stringify(registrosPreenchidos)),
    })

    carregarDadosMedicamentos() // Limpa os status novamente
    toastStore.show('Medicamentos registrados com sucesso!', 'success')
    activeForm.value = null
    emit('registrado')
  } catch (error) {
    errorMessage.value = getServiceErrorMessage(error)
  } finally {
    salvando.value = false
  }
}


async function salvarHigiene() {
  salvando.value = true
  errorMessage.value = ''

  try {
    await assistenciaService.registrarHigiene({
      residenteId: props.residente.id,
      procedimentos: JSON.parse(JSON.stringify(procedimentosHigiene)),
      eliminacoes: JSON.parse(JSON.stringify(eliminacoes))
    })
    
    toastStore.show('Registro de Higiene salvo com sucesso!', 'success')
    activeForm.value = null
    emit('registrado')
  } catch (error) {
    errorMessage.value = getServiceErrorMessage(error)
  } finally {
    salvando.value = false
  }
}

async function salvarHidratacao() {
  salvando.value = true
  errorMessage.value = ''

  if (hidratacao.agua === 0 && hidratacao.suco === 0 && !hidratacao.recusou && !hidratacao.observacoes) {
    errorMessage.value = 'Insira alguma quantidade, observação ou marque como recusado antes de salvar.'
    salvando.value = false
    return
  }

  try {
    await assistenciaService.registrarHidratacao({
      residenteId: props.residente.id,
      agua: hidratacao.agua,
      suco: hidratacao.suco,
      recusou: hidratacao.recusou,
      observacoes: hidratacao.observacoes
    })
    
    toastStore.show('Hidratação registrada com sucesso!', 'success')
    activeForm.value = null
    emit('registrado')
  } catch (error) {
    errorMessage.value = getServiceErrorMessage(error)
  } finally {
    salvando.value = false
  }
}

async function salvarRotinaAssistencial() {
  salvando.value = true
  errorMessage.value = ''

  // Validar que ao menos uma refeição foi preenchida
  const mealsSelected = MEAL_CATEGORIES.filter(m => refeicoes[m.key] !== '')
  if (mealsSelected.length === 0) {
    errorMessage.value = 'Selecione ao menos uma refeição antes de salvar.'
    salvando.value = false
    return
  }

  // Mapear para o formato do serviço existente (compatibilidade)
  const labels = mealsSelected.map(m => `${m.label}: ${refeicoes[m.key]}`).join('; ')
  const avgPercent = Math.round(
    mealsSelected.reduce((sum, m) => sum + (ACCEPTANCE_MAP[refeicoes[m.key]] || 0), 0) / mealsSelected.length
  )

  try {
    await assistenciaService.registrarRotinaAssistencial({
      residenteId: props.residente.id,
      tipoRefeicao: labels,
      percentualAceitacao: String(avgPercent),
      banho: cuidados.banho || 'Nao informado',
      troca: cuidados.troca || 'Nao informada',
      cuidadosBucais: cuidados.cuidadosBucais || 'Nao informados',
      observacoes: observacoesRotina.value,
      refeicoes: { ...refeicoes },
    })
    limparRotina()
    toastStore.show('Rotina assistencial registrada com sucesso!', 'success')
    activeForm.value = null
    emit('registrado')
  } catch (error) {
    errorMessage.value = getServiceErrorMessage(error)
  } finally {
    salvando.value = false
  }
}
</script>

<template>
  <section class="registro-assistencial">
    
    <!-- MENU DE EVOLUÇÃO (Grid) -->
    <div v-if="!activeForm" class="menu-evolucao">
      <div class="section-header">
        <div>
          <p class="section-label">REGISTRO ASSISTENCIAL</p>
          <h3 class="section-title">Nova Evolução</h3>
        </div>
      </div>
      <div class="grid-menu">
        <button class="menu-btn" @click="setForm('sinais')">
          <div class="icon-circle red-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path><polyline points="3 12 8 12 10 7 14 17 16 12 21 12"></polyline></svg>
          </div>
          <span>Sinais Vitais</span>
        </button>
        <button class="menu-btn" @click="setForm('rotina')">
          <div class="icon-circle blue-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <span>Alimentação / Rotina</span>
        </button>
        <button class="menu-btn" @click="setForm('hidratacao')">
          <div class="icon-circle blue-icon">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg>
          </div>
          <span>Hidratação</span>
        </button>
        <!-- Outras opções visuais desativadas/mapeadas para rotina para compor o UI proposto -->
        <button class="menu-btn" @click="setForm('higiene')">
          <div class="icon-circle gray-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v2H4z"/><path d="M6 6v2m4-2v2m4-2v2m4-2v2"/><circle cx="12" cy="16" r="4"/><path d="M12 12v-2"/></svg></div>
          <span>Higiene</span>
        </button>
        <button class="menu-btn" @click="setForm('medicamentos')">
          <div class="icon-circle gray-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.5 1.5l-8 8a5.66 5.66 0 0 0 8 8l8-8a5.66 5.66 0 0 0-8-8z"/><line x1="6" y1="14" x2="14" y2="6"/></svg></div>
          <span>Medicamentos</span>
        </button>
        <button class="menu-btn" @click="setForm('ocorrencias')">
          <div class="icon-circle red-icon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></div>
          <span>Ocorrências</span>
        </button>
      </div>
    </div>

    <!-- FORMULÁRIO DE SINAIS VITAIS -->
    <div v-else-if="activeForm === 'sinais'" class="sinais-wrapper">
      <div class="form-header">
        <button class="btn-back" @click="setForm(null)" aria-label="Voltar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h3 class="section-title">Sinais Vitais</h3>
      </div>

      <div v-if="errorMessage" class="feedback feedback-error" role="alert">
        {{ errorMessage }}
      </div>

      <form class="sinais-form" @submit.prevent="salvarSinaisVitais">
        <div class="sinais-cards-grid">
          
          <!-- Pressão Arterial -->
          <div class="sinais-card">
            <span class="card-label">Pressão Arterial (mmHg)</span>
            <div class="inputs-row">
              <input v-model.trim="sinaisVitais.sistolica" type="number" min="0" placeholder="120" required class="large-input" />
              <span class="divider-x">X</span>
              <input v-model.trim="sinaisVitais.diastolica" type="number" min="0" placeholder="80" required class="large-input" />
            </div>
          </div>

          <!-- Frequência Cardíaca -->
          <div class="sinais-card">
            <span class="card-label">Frequência Cardíaca (bpm)</span>
            <input v-model.trim="sinaisVitais.frequenciaCardiaca" type="number" min="0" placeholder="80" required class="large-input full-width" />
          </div>

          <!-- Glicemia -->
          <div class="sinais-card">
            <span class="card-label">Glicemia (mg/dL)</span>
            <input v-model.trim="sinaisVitais.glicemia" type="number" min="0" placeholder="90" required class="large-input full-width" />
          </div>

          <!-- Temperatura -->
          <div class="sinais-card controls-card">
            <span class="card-label">Temperatura (°C)</span>
            <div class="stepper">
              <button type="button" class="btn-step" @click="decr('temperatura', 0.1, 30)">-</button>
              <input v-model.trim="sinaisVitais.temperatura" type="number" step="0.1" min="0" placeholder="36.5" required class="large-input text-center" />
              <button type="button" class="btn-step" @click="incr('temperatura', 0.1, 45)">+</button>
            </div>
          </div>

          <!-- Saturação -->
          <div class="sinais-card controls-card">
            <span class="card-label">Saturação O2 (%)</span>
            <div class="stepper">
              <button type="button" class="btn-step" @click="decr('saturacaoO2', 1, 0)">-</button>
              <input v-model.trim="sinaisVitais.saturacaoO2" type="number" min="0" max="100" placeholder="98" class="large-input text-center" />
              <button type="button" class="btn-step" @click="incr('saturacaoO2', 1, 100)">+</button>
            </div>
          </div>

          <!-- Respiração -->
          <div class="sinais-card controls-card">
            <span class="card-label">Respiração (rpm)</span>
            <div class="stepper">
              <button type="button" class="btn-step" @click="decr('respiracao', 1, 0)">-</button>
              <input v-model.trim="sinaisVitais.respiracao" type="number" min="0" placeholder="16" class="large-input text-center" />
              <button type="button" class="btn-step" @click="incr('respiracao', 1, 60)">+</button>
            </div>
          </div>

        </div>

        <!-- RN-07: Alerta de nível crítico -->
        <div v-if="isCritical" class="critical-alert">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          Atenção: Nível Crítico Detectado
        </div>

        <button class="btn-primary btn-block" type="submit" :disabled="salvando">
          {{ salvando ? 'Salvando...' : 'Salvar Medição' }}
        </button>
      </form>
    </div>

    <!-- FORMULÁRIO DE ROTINA ASSISTENCIAL -->
    <div v-else-if="activeForm === 'rotina'" class="sinais-wrapper">
      <div class="form-header">
        <button class="btn-back" @click="setForm(null)" aria-label="Voltar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h3 class="section-title">Rotina Assistencial</h3>
        <span class="section-subtitle">Gestão de Cuidados Diários</span>
      </div>

      <div v-if="errorMessage" class="feedback feedback-error" role="alert">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="salvarRotinaAssistencial">
        <!-- Seção: Alimentação e Hidratação -->
        <div class="rotina-section">
          <h4 class="rotina-section-title">
            <span class="rotina-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg></span>
            Alimentação e Hidratação
          </h4>

          <div
            v-for="meal in MEAL_CATEGORIES"
            :key="meal.key"
            class="meal-row"
          >
            <span class="meal-label">{{ meal.label }}</span>
            <div class="toggle-group">
              <button
                v-for="opt in ACCEPTANCE_OPTIONS"
                :key="opt"
                type="button"
                class="toggle-btn"
                :class="{ active: refeicoes[meal.key] === opt }"
                @click="toggleMeal(meal.key, opt)"
              >
                {{ opt }}
              </button>
            </div>
          </div>
        </div>


        <!-- Observações -->
        <div class="rotina-section">
          <h4 class="rotina-section-title">
            <span class="rotina-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>
            Observações
          </h4>
          <textarea v-model.trim="observacoesRotina" class="obs-textarea" rows="3" placeholder="Observações adicionais..."></textarea>
        </div>

        <button class="btn-primary btn-block" type="submit" :disabled="salvando">
          {{ salvando ? 'Salvando...' : 'Salvar Registro' }}
        </button>
      </form>
    </div>

    <!-- FORMULÁRIO DE HIDRATAÇÃO -->
    <div v-else-if="activeForm === 'hidratacao'" class="sinais-wrapper">
      <div class="form-header">
        <button class="btn-back" @click="setForm(null)" aria-label="Voltar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h3 class="section-title">Hidratação</h3>
        <span class="section-subtitle">Adicionar copos agora</span>
      </div>

      <div v-if="errorMessage" class="feedback feedback-error" role="alert">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="salvarHidratacao">
        <div class="rotina-section">
          <!-- Totais do Dia -->
          <div class="totais-dia" v-if="totaisHidratacaoHoje.agua > 0 || totaisHidratacaoHoje.suco > 0">
            <span class="totais-title">Total registrado hoje:</span>
            <div class="totais-badges">
              <span class="total-badge" v-if="totaisHidratacaoHoje.agua > 0">Água: {{ totaisHidratacaoHoje.agua }}</span>
              <span class="total-badge" v-if="totaisHidratacaoHoje.suco > 0">Suco: {{ totaisHidratacaoHoje.suco }}</span>
            </div>
          </div>

          <div class="hidratacao-grid">
            <div class="hidratacao-item">
              <span class="meal-label">HIDRATAÇÃO (ÁGUA)</span>
              <div class="stepper stepper-hid">
                <button type="button" @click="decrH('agua')" class="stepper-btn stepper-btn-hid">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <div class="stepper-value-hid">
                  <span class="hid-num">{{ hidratacao.agua }}</span>
                  <span class="hid-unit">{{ hidratacao.agua === 1 ? 'copo' : 'copos' }}</span>
                </div>
                <button type="button" @click="incrH('agua')" class="stepper-btn stepper-btn-hid">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>

            <div class="hidratacao-item">
              <span class="meal-label">HIDRATAÇÃO (SUCO)</span>
              <div class="stepper stepper-hid">
                <button type="button" @click="decrH('suco')" class="stepper-btn stepper-btn-hid">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
                <div class="stepper-value-hid">
                  <span class="hid-num">{{ hidratacao.suco }}</span>
                  <span class="hid-unit">{{ hidratacao.suco === 1 ? 'copo' : 'copos' }}</span>
                </div>
                <button type="button" @click="incrH('suco')" class="stepper-btn stepper-btn-hid">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                </button>
              </div>
            </div>
          </div>

          <div class="meal-row mt-4">
            <span class="meal-label">Aceitação</span>
            <div class="toggle-group">
              <button type="button" class="toggle-btn" :class="{ active: hidratacao.recusou === true }" @click="hidratacao.recusou = !hidratacao.recusou">Recusou hidratação</button>
            </div>
          </div>
        </div>

        <!-- Observações -->
        <div class="rotina-section">
          <h4 class="rotina-section-title">
            <span class="rotina-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>
            Observações
          </h4>
          <textarea v-model.trim="hidratacao.observacoes" class="obs-textarea" rows="3" placeholder="Observações adicionais..."></textarea>
        </div>

        <button class="btn-primary btn-block" type="submit" :disabled="salvando">
          {{ salvando ? 'Salvando...' : 'Adicionar ao Histórico' }}
        </button>
      </form>
    </div>

    <!-- FORMULÁRIO DE HIGIENE E ELIMINAÇÕES -->
    <div v-else-if="activeForm === 'higiene'" class="sinais-wrapper">
      <div class="form-header">
        <button class="btn-back" @click="setForm(null)" aria-label="Voltar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h3 class="section-title">Registro de Higiene</h3>
      </div>

      <div v-if="errorMessage" class="feedback feedback-error" role="alert">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="salvarHigiene">
        <div class="higiene-grid">
          
          <!-- Bloco 1: Procedimentos de Higiene -->
          <div class="higiene-card">
            <h4 class="higiene-card-title">
              <span class="higiene-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" stroke-width="2"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/></svg></span>
              Procedimentos de Higiene
            </h4>

            <!-- BANHO -->
            <div class="procedimento-row-col">
              <span class="proc-label mb-2">Banho</span>
              <div class="proc-actions-new">
                <button type="button" class="btn-proc-red" @click="registrarHora('banhos', true)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  Registrar recusa
                </button>
                <button type="button" class="btn-proc-blue" @click="registrarHora('banhos', false)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Novo registro
                </button>
              </div>
              <div v-if="procedimentosHigiene.banhos.length > 0" class="proc-list mt-3">
                <div class="proc-badge" :class="{ 'badge-red': rec.recusou }" v-for="(rec, idx) in procedimentosHigiene.banhos" :key="'b'+idx">
                  <div class="badge-content">
                    <svg v-if="rec.recusou" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Banho {{ idx + 1 }} - {{ rec.hora }} {{ rec.recusou ? '(Recusado)' : '' }}
                  </div>
                  <button type="button" class="btn-del-proc" @click="removerHora('banhos', idx)" title="Excluir"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                </div>
              </div>
            </div>

            <div class="proc-divider"></div>

            <!-- HIDRATACAO -->
            <div class="procedimento-row-col">
              <span class="proc-label mb-2">Hidratação da Pele</span>
              <div class="proc-actions-new">
                <button type="button" class="btn-proc-red" @click="registrarHora('hidratacaoPele', true)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  Registrar recusa
                </button>
                <button type="button" class="btn-proc-blue" @click="registrarHora('hidratacaoPele', false)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Novo registro
                </button>
              </div>
              <div v-if="procedimentosHigiene.hidratacaoPele.length > 0" class="proc-list mt-3">
                <div class="proc-badge" :class="{ 'badge-red': rec.recusou }" v-for="(rec, idx) in procedimentosHigiene.hidratacaoPele" :key="'hp'+idx">
                  <div class="badge-content">
                    <svg v-if="rec.recusou" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Hidrat. {{ idx + 1 }} - {{ rec.hora }} {{ rec.recusou ? '(Recusado)' : '' }}
                  </div>
                  <button type="button" class="btn-del-proc" @click="removerHora('hidratacaoPele', idx)" title="Excluir"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                </div>
              </div>
            </div>

            <div class="proc-divider"></div>

            <!-- HIGIENE ORAL -->
            <div class="procedimento-row-col">
              <span class="proc-label mb-2">Higiene Oral</span>
              <div class="proc-actions-new">
                <button type="button" class="btn-proc-red" @click="registrarHora('higieneOral', true)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  Registrar recusa
                </button>
                <button type="button" class="btn-proc-blue" @click="registrarHora('higieneOral', false)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Novo registro
                </button>
              </div>
              <div v-if="procedimentosHigiene.higieneOral.length > 0" class="proc-list mt-3">
                <div class="proc-badge" :class="{ 'badge-red': rec.recusou }" v-for="(rec, idx) in procedimentosHigiene.higieneOral" :key="'ho'+idx">
                  <div class="badge-content">
                    <svg v-if="rec.recusou" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Oral {{ idx + 1 }} - {{ rec.hora }} {{ rec.recusou ? '(Recusado)' : '' }}
                  </div>
                  <button type="button" class="btn-del-proc" @click="removerHora('higieneOral', idx)" title="Excluir"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                </div>
              </div>
            </div>

            <div class="proc-divider"></div>

            <!-- REPELENTE -->
            <div class="procedimento-row-col">
              <span class="proc-label mb-2">Repelente de Insetos</span>
              <div class="proc-actions-new">
                <button type="button" class="btn-proc-red" @click="registrarHora('repelente', true)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  Registrar recusa
                </button>
                <button type="button" class="btn-proc-blue" @click="registrarHora('repelente', false)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Novo registro
                </button>
              </div>
              <div v-if="procedimentosHigiene.repelente.length > 0" class="proc-list mt-3">
                <div class="proc-badge" :class="{ 'badge-red': rec.recusou }" v-for="(rec, idx) in procedimentosHigiene.repelente" :key="'r'+idx">
                  <div class="badge-content">
                    <svg v-if="rec.recusou" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Repelente {{ idx + 1 }} - {{ rec.hora }} {{ rec.recusou ? '(Recusado)' : '' }}
                  </div>
                  <button type="button" class="btn-del-proc" @click="removerHora('repelente', idx)" title="Excluir"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                </div>
              </div>
            </div>

            <div class="proc-divider"></div>

            <!-- TROCA DE FRALDA -->
            <div class="procedimento-row-col">
              <span class="proc-label mb-2">Troca de Fralda</span>
              <div class="proc-actions-new">
                <button type="button" class="btn-proc-red" @click="registrarHora('trocaFralda', true)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  Registrar recusa
                </button>
                <button type="button" class="btn-proc-blue" @click="registrarHora('trocaFralda', false)">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  Novo registro
                </button>
              </div>
              <div v-if="procedimentosHigiene.trocaFralda.length > 0" class="proc-list mt-3">
                <div class="proc-badge" :class="{ 'badge-red': rec.recusou }" v-for="(rec, idx) in procedimentosHigiene.trocaFralda" :key="'tf'+idx">
                  <div class="badge-content">
                    <svg v-if="rec.recusou" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Troca {{ idx + 1 }} - {{ rec.hora }} {{ rec.recusou ? '(Recusado)' : '' }}
                  </div>
                  <button type="button" class="btn-del-proc" @click="removerHora('trocaFralda', idx)" title="Excluir"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
                </div>
              </div>
            </div>
          </div>

          <!-- Bloco 2: Observação das Eliminações -->
          <div class="higiene-card">
            <h4 class="higiene-card-title">
              <span class="higiene-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" stroke-width="2"><path d="M6 2h12v6H6z"/><path d="M4 8h16l-2 10H6L4 8z"/><path d="M9 18v4m6-4v4"/></svg></span>
              Observação das Eliminações
            </h4>

            <div class="eliminacoes-section">
              <h5 class="elim-subtitle">CARACTERÍSTICAS DA URINA</h5>
              <div class="toggle-group wrap-group">
                <button
                  v-for="opt in CARACT_URINA"
                  :key="opt"
                  type="button"
                  class="toggle-btn slim-btn"
                  :class="{ active: eliminacoes.urina.includes(opt) }"
                  @click="toggleEliminacao('urina', opt)"
                >
                  {{ opt }}
                </button>
              </div>
            </div>

            <div class="eliminacoes-section mt-4">
              <h5 class="elim-subtitle">CARACTERÍSTICAS DAS FEZES</h5>
              <div class="toggle-group wrap-group">
                <button
                  v-for="opt in CARACT_FEZES"
                  :key="opt"
                  type="button"
                  class="toggle-btn slim-btn"
                  :class="{ active: eliminacoes.fezes.includes(opt) }"
                  @click="toggleEliminacao('fezes', opt)"
                >
                  {{ opt }}
                </button>
              </div>
            </div>
          </div>

        </div>

        <div class="mt-4">
          <button class="btn-primary btn-block" type="submit" :disabled="salvando">
            {{ salvando ? 'Salvando...' : 'Salvar Registro de Higiene' }}
          </button>
        </div>
      </form>
    </div>

    <!-- FORMULÁRIO DE MEDICAMENTOS (US06 / RF06) -->
    <div v-else-if="activeForm === 'medicamentos'" class="sinais-wrapper">
      <div class="form-header">
        <button class="btn-back" @click="setForm(null)" aria-label="Voltar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h3 class="section-title">ADMINISTRAÇÃO DE MEDICAMENTOS</h3>
      </div>

      <div v-if="errorMessage" class="feedback feedback-error" role="alert">
        {{ errorMessage }}
      </div>

      <!-- Lista de medicamentos pré-cadastrados -->
      <div v-if="medicamentosLista.length > 0" style="margin-bottom: 24px;">
        <p style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">MEDICAMENTOS DO RESIDENTE ({{ medicamentosLista.length }})</p>
        
        <div v-for="(med, idx) in medicamentosLista" :key="idx" class="card" style="margin-bottom: 16px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background: #fff;">
          <!-- Informações do Medicamento -->
          <div style="margin-bottom: 16px;">
            <strong style="font-size: 18px; color: #1e293b; display: block; margin-bottom: 4px;">{{ med.nome }}</strong>
            <div style="display: flex; gap: 12px; color: #64748b; font-size: 14px;">
              <span v-if="med.dose"><strong>Dose:</strong> {{ med.dose }}</span>
              <span v-if="med.frequencia"><strong>Frequência:</strong> {{ med.frequencia }}</span>
              <span v-if="med.via"><strong>Via:</strong> {{ med.via }}</span>
            </div>
          </div>

          <!-- Status: Administrado / Não Administrado -->
          <div style="margin-bottom: 16px;">
            <div style="display: flex; gap: 12px; height: 52px;">
              <button
                type="button"
                @click="setMedicamentoStatus(idx, 'administrado')"
                style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; border-radius: 10px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.2s;"
                :style="med.status === 'administrado' ? 'background: #22c55e; border: 2px solid #16a34a; color: white; box-shadow: 0 2px 8px rgba(34,197,94,0.3);' : 'background: white; border: 2px solid #cbd5e1; color: #64748b;'"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="med.status === 'administrado' ? '3' : '2'"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Administrado
              </button>
              <button
                type="button"
                @click="setMedicamentoStatus(idx, 'nao_administrado')"
                style="flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px; border-radius: 10px; font-weight: 700; font-size: 15px; cursor: pointer; transition: all 0.2s;"
                :style="med.status === 'nao_administrado' ? 'background: #ef4444; border: 2px solid #dc2626; color: white; box-shadow: 0 2px 8px rgba(239,68,68,0.3);' : 'background: white; border: 2px solid #cbd5e1; color: #64748b;'"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" :stroke-width="med.status === 'nao_administrado' ? '3' : '2'"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                Não Administrado
              </button>
            </div>
          </div>

          <!-- Motivo (obrigatório quando não administrado — CA06.2) -->
          <div v-if="med.status === 'nao_administrado'" style="margin-bottom: 16px;">
            <label style="display: block; font-size: 11px; font-weight: 700; color: #dc2626; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">MOTIVO DA NÃO ADMINISTRAÇÃO *</label>
            <textarea
              v-model.trim="med.motivo"
              rows="2"
              required
              placeholder="Informe o motivo: recusa do residente, indisponibilidade, etc."
              style="width: 100%; padding: 14px 16px; background: #fff5f5; border: 2px solid #fecaca; border-radius: 10px; font-size: 15px; font-family: inherit; color: #991b1b; outline: none; resize: vertical;"
            ></textarea>
          </div>

          <!-- Observações (opcional) -->
          <div v-if="med.status" style="margin-bottom: 0;">
            <label style="display: block; font-size: 11px; font-weight: 700; color: #94a3b8; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.5px;">OBSERVAÇÕES (OPCIONAL)</label>
            <textarea
              v-model.trim="med.observacoes"
              rows="2"
              placeholder="Observações adicionais..."
              style="width: 100%; padding: 14px 16px; background: #fff; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 14px; font-family: inherit; color: #334155; outline: none; resize: vertical;"
            ></textarea>
          </div>
        </div>
      </div>

      <div v-else style="padding: 32px 16px; text-align: center; color: #64748b; background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 12px; margin-bottom: 24px;">
        <svg style="margin: 0 auto 12px auto; color: #94a3b8;" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M10.5 20.5l-6-6M4.5 14.5l6-6M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
        <p style="font-weight: 600; font-size: 16px; margin: 0 0 4px 0; color: #334155;">Nenhum medicamento cadastrado</p>
        <p style="font-size: 14px; margin: 0;">O perfil deste residente ainda não possui medicamentos prescritos.</p>
      </div>

      <!-- Erro geral -->
      <div v-if="errorMessage" class="feedback feedback-error" role="alert" style="margin-bottom: 16px;">
        {{ errorMessage }}
      </div>

      <!-- Botão salvar todos -->
      <button
        v-if="medicamentosLista.length > 0"
        class="btn-primary btn-block"
        type="button"
        @click="salvarMedicamentos"
        :disabled="salvando || !medicamentosLista.some(m => m.status)"
      >
        {{ salvando ? 'Salvando...' : `Salvar Registros de Medicamentos` }}
      </button>
    </div>

    <!-- FORMULÁRIO DE OCORRÊNCIAS -->
    <div v-else-if="activeForm === 'ocorrencias'" class="sinais-wrapper">
      <div class="form-header">
        <button class="btn-back" @click="setForm(null)" aria-label="Voltar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
        </button>
        <h3 class="section-title">REGISTRO DE OCORRÊNCIAS</h3>
      </div>

      <div v-if="errorMessage" class="feedback feedback-error" role="alert">
        {{ errorMessage }}
      </div>

      <form @submit.prevent="salvarOcorrencia">
        
        <div class="rotina-section">
          <h4 class="rotina-section-title">
            <span class="rotina-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg></span>
            Detalhes da Ocorrência
          </h4>
          
          <div class="form-row" style="margin-bottom: 16px;">
            <div class="form-group" style="flex: 2;">
              <label class="form-label">TIPO DE OCORRÊNCIA *</label>
              <select v-model="ocorrencia.tipoOcorrencia" class="form-input" required>
                <option value="" disabled>Selecione...</option>
                <option value="Queda">Queda</option>
                <option value="Erro de Medicação">Erro de Medicação</option>
                <option value="Recusa de Cuidados">Recusa de Cuidados</option>
                <option value="Alteração Clínica/Comportamental">Alteração Clínica/Comportamental</option>
                <option value="Ferimento/Lesão">Ferimento/Lesão</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
            <div class="form-group" style="flex: 1;">
              <label class="form-label">GRAVIDADE *</label>
              <select v-model="ocorrencia.gravidade" class="form-input" required>
                <option value="" disabled>Selecione...</option>
                <option value="Leve">Leve</option>
                <option value="Moderada">Moderada</option>
                <option value="Grave">Grave</option>
              </select>
            </div>
          </div>
        </div>

        <div class="rotina-section">
          <h4 class="rotina-section-title">
            <span class="rotina-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg></span>
            Descrição e Condutas
          </h4>
          
          <div style="margin-bottom: 16px;">
            <label class="form-label">DESCRIÇÃO DETALHADA DO FATO *</label>
            <textarea v-model="ocorrencia.descricao" class="obs-textarea" rows="3" placeholder="Descreva exatamente o que aconteceu..." required></textarea>
          </div>

          <div style="margin-bottom: 24px;">
            <label class="form-label">MEDIDAS ADOTADAS IMEDIATAMENTE</label>
            <textarea v-model="ocorrencia.medidasAdotadas" class="obs-textarea" rows="2" placeholder="Ex: Primeiros socorros aplicados, SAMU acionado..."></textarea>
          </div>

          <div class="meal-row">
            <span class="meal-label">A família foi comunicada?</span>
            <div class="toggle-group">
              <button type="button" class="toggle-btn" :class="{ active: ocorrencia.comunicadoFamilia === 'Sim' }" @click="ocorrencia.comunicadoFamilia = 'Sim'">Sim</button>
              <button type="button" class="toggle-btn" :class="{ active: ocorrencia.comunicadoFamilia === 'Não' }" @click="ocorrencia.comunicadoFamilia = 'Não'">Não</button>
            </div>
          </div>
        </div>

        <button class="btn-primary btn-block" type="submit" :disabled="salvando">
          {{ salvando ? 'Salvando...' : 'Registrar Ocorrência' }}
        </button>
      </form>
    </div>

  </section>
</template>

<style scoped>
.registro-assistencial {
  background: #fff;
  border: 1px solid #e8ecf2;
  border-radius: 16px;
  padding: 24px;
  overflow: hidden;
  min-width: 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;
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
  font-size: 20px;
  font-weight: 700;
  margin: 0;
}

/* MENU GRID */
.grid-menu {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
  gap: 16px;
}

.menu-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 20px 10px;
  border: 1px solid #e8ecf2;
  border-radius: 16px;
  background: #f8faff;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.menu-btn:hover:not(.disabled-btn) {
  border-color: #3B6FE8;
  background: #eef2ff;
  transform: translateY(-2px);
}

.menu-btn span {
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  text-align: center;
}

.icon-circle {
  width: 54px;
  height: 54px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.red-icon { background: #fee2e2; color: #ef4444; }
.blue-icon { background: #e0e7ff; color: #3b82f6; }
.gray-icon { background: #f1f5f9; color: #94a3b8; filter: grayscale(1); }

.disabled-btn {
  opacity: 0.6;
  cursor: not-allowed;
}

/* FORM HEADERS */
.form-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
}

.btn-back {
  background: #f1f5f9;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #4a5568;
  transition: all 0.2s;
}

.btn-back:hover {
  background: #e2e8f0;
  color: #1a1a2e;
}

/* SINAIS FORM */
.sinais-cards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.sinais-card {
  background: #f8faff;
  border: 1px solid #e8ecf2;
  border-radius: 16px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 0;
  overflow: hidden;
}

.card-label {
  font-size: 13px;
  font-weight: 600;
  color: #718096;
}

.inputs-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.divider-x {
  font-weight: 700;
  color: #a0aec0;
}

.large-input {
  width: 100%;
  min-width: 0;
  height: 48px;
  border: 1px solid #d1d9e6;
  border-radius: 10px;
  background: #fff;
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
  padding: 0 12px;
  outline: none;
  box-sizing: border-box;
}

.large-input::placeholder {
  color: #cbd5e1;
  font-weight: 400;
}

.large-input:focus {
  border-color: #3B6FE8;
  box-shadow: 0 0 0 3px rgba(59, 111, 232, 0.12);
}

.text-center { text-align: center; }

/* Stepper para +/- */
.stepper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-step {
  background: #fff;
  border: 1px solid #d1d9e6;
  width: 48px;
  height: 48px;
  border-radius: 10px;
  font-size: 24px;
  font-weight: 600;
  color: #4a5568;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s;
}

.btn-step:hover {
  border-color: #3B6FE8;
  color: #3B6FE8;
}

/* Alertas e Botões */
.critical-alert {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fef2f2;
  color: #dc2626;
  padding: 14px 16px;
  border-radius: 12px;
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 24px;
  border: 1px solid #fecaca;
}

.btn-primary {
  min-height: 52px;
  border: none;
  border-radius: 12px;
  background: #3B6FE8;
  color: #fff;
  cursor: pointer;
  font-size: 16px;
  font-weight: 700;
  padding: 0 24px;
}

.btn-block {
  width: 100%;
}

.btn-primary:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

/* ROTINA FORM — Toggle buttons conforme Figma */
.rotina-section {
  background: #f8faff;
  border: 1px solid #e8ecf2;
  border-radius: 16px;
  padding: 20px;
  margin-bottom: 20px;
}

.rotina-section-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 20px;
}

.rotina-icon {
  font-size: 20px;
}

.meal-row {
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #edf2f7;
}

.meal-row:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.meal-label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 10px;
}

.toggle-group {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.toggle-btn {
  min-height: 42px;
  padding: 0 18px;
  border: 1px solid #d1d9e6;
  border-radius: 10px;
  background: #fff;
  color: #4a5568;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn:hover {
  border-color: #3B6FE8;
  color: #3B6FE8;
}

.toggle-btn.active {
  background: #3B6FE8;
  border-color: #3B6FE8;
  color: #fff;
}

.section-subtitle {
  font-size: 13px;
  color: #a0aec0;
  font-weight: 400;
  margin-left: auto;
}

.obs-textarea {
  width: 100%;
  min-height: 80px;
  border: 1px solid #d1d9e6;
  border-radius: 10px;
  background: #fff;
  color: #1a1a2e;
  font-size: 14px;
  font-weight: 500;
  padding: 12px;
  outline: none;
  resize: vertical;
  box-sizing: border-box;
}

.obs-textarea:focus {
  border-color: #3B6FE8;
  box-shadow: 0 0 0 3px rgba(59, 111, 232, 0.12);
}

.feedback {
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 12px;
  margin-bottom: 16px;
}
.feedback-error {
  background: #fff5f5;
  border: 1px solid #feb2b2;
  color: #c53030;
}

/* HIDRATAÇÃO FORM */
.totais-dia {
  background: #fff;
  border: 1px solid #d1d9e6;
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.totais-title {
  font-size: 13px;
  font-weight: 700;
  color: #4a5568;
}
.totais-badges {
  display: flex;
  gap: 8px;
}
.total-badge {
  background: #eef2ff;
  color: #3B6FE8;
  font-weight: 700;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 12px;
  border: 1px solid #c7d2fe;
}
.hidratacao-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.hidratacao-item {
  display: flex;
  flex-direction: column;
}
.stepper-hid {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border: 1px solid #d1d9e6;
  border-radius: 12px;
  height: 56px;
  padding: 4px;
}
.stepper-btn-hid {
  background: #fff;
  border: 1px solid #e2e8f0;
  width: 46px;
  height: 46px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
}
.stepper-btn-hid:hover {
  background: #f8faff;
  border-color: #3B6FE8;
}
.stepper-value-hid {
  display: flex;
  align-items: baseline;
  gap: 4px;
}
.hid-num {
  font-size: 20px;
  font-weight: 700;
  color: #1a1a2e;
}
.hid-unit {
  font-size: 14px;
  font-weight: 500;
  color: #a0aec0;
}
.mt-4 { margin-top: 24px; }

@media (max-width: 900px) {
  .sinais-cards-grid { grid-template-columns: 1fr; }
  .grid-menu { grid-template-columns: 1fr; }
  .higiene-grid { grid-template-columns: 1fr; }
}

@media (max-width: 640px) {
  .assistencia-form { grid-template-columns: 1fr; }
  .grid-menu { grid-template-columns: 1fr 1fr; }
}

/* HIGIENE E ELIMINAÇÕES FORM */
.higiene-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.higiene-card {
  background: #fff;
  border: 1px solid #e8ecf2;
  border-radius: 12px;
  padding: 24px;
}
.higiene-card-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 18px;
  color: #1a1a2e;
  margin: 0 0 24px 0;
}
.higiene-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: #eef2ff;
  border-radius: 8px;
  color: #3B6FE8;
}
.procedimento-row-col {
  display: flex;
  flex-direction: column;
}
.proc-actions-new {
  display: flex;
  gap: 12px;
  width: 100%;
}
.btn-proc-red {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #fecaca;
  color: #dc2626;
  font-weight: 600;
  font-size: 13px;
  padding: 10px 0;
  flex: 1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-proc-red:hover {
  background: #fef2f2;
}
.btn-proc-blue {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #bfdbfe;
  color: #2563eb;
  font-weight: 600;
  font-size: 13px;
  padding: 10px 0;
  flex: 1;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}
.btn-proc-blue:hover {
  background: #eff6ff;
}
.proc-label {
  font-size: 15px;
  font-weight: 600;
  color: #4a5568;
}
.proc-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.proc-badge {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
}
.proc-badge.badge-red {
  background: #fef2f2;
  border-color: #fecaca;
  color: #b91c1c;
}
.badge-content {
  display: flex;
  align-items: center;
  gap: 8px;
}
.btn-del-proc {
  background: transparent;
  border: none;
  color: inherit;
  opacity: 0.6;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}
.btn-del-proc:hover {
  opacity: 1;
}
.proc-divider {
  height: 1px;
  background: #e8ecf2;
  margin: 16px 0;
}
.mb-2 { margin-bottom: 8px; }
.mt-3 { margin-top: 12px; }

/* Eliminações */
.eliminacoes-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.elim-subtitle {
  font-size: 12px;
  font-weight: 700;
  color: #64748b;
  margin: 0;
  letter-spacing: 0.5px;
}
.wrap-group {
  flex-wrap: wrap;
  gap: 8px;
}
.slim-btn {
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  flex: 0 1 auto;
}

/* Responsividade Geral */
@media (max-width: 900px) {
  .sinais-cards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .hidratacao-grid,
  .higiene-grid,
  .rotina-section {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    flex-direction: column !important;
    gap: 12px !important;
  }

  .form-row > .form-group,
  .form-row > div {
    width: 100% !important;
    flex: none !important;
  }

  /* Medicamentos: Botão e Input de Horário */
  [style*="gap: 24px"] {
    flex-direction: column !important;
    gap: 12px !important;
  }
  [style*="flex: 3; display: flex"] {
    width: 100% !important;
  }

  .toggle-group {
    flex-wrap: wrap;
  }

  .stepper-hid {
    width: 100%;
    justify-content: space-between;
  }
  
  .rotina-icon {
    width: 24px;
    height: 24px;
  }
  
  .meal-row {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }
  
  .totais-dia {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
