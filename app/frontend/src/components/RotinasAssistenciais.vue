<template>
  <div class="routine-page">
    <div class="routine-shell">
      <header class="topbar">
        <button class="back-button" type="button" title="Voltar" @click="router.push('/residentes')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
        </button>
        <h1>Rotina Assistencial</h1>

        <label class="resident-pill" :class="{ 'pill-error': tentouEnviar && !form.residenteId }">
          <div class="resident-avatar" :style="residenteSelecionado?.foto ? `background-image: url(${residenteSelecionado.foto})` : ''">
            <span v-if="!residenteSelecionado?.foto">{{ iniciais(residenteSelecionado?.nomeCompleto) }}</span>
          </div>
          <div class="resident-copy">
            <span>Residente</span>
            <select v-model="form.residenteId" aria-label="Selecionar residente"
              :class="{ 'select-error': tentouEnviar && !form.residenteId }">
              <option value="">Selecione</option>
              <option v-for="residente in residentes" :key="residente.id" :value="residente.id">
                {{ residente.nomeCompleto }}
              </option>
            </select>
          </div>
        </label>
      </header>

      <main class="routine-canvas">

         <div v-if="tentouEnviar && temErros" class="error-banner">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            {{ errorMessage }}
        </div>

        <section class="routine-grid">
          <article class="routine-card food-card">
            <CardTitle icon="meal" title="Alimentação e Hidratação" />

            <div class="field-block" :class="{ 'field-error': tentouEnviar && !form.alimentacao.desjejum }">
              <span class="field-label">Desjejum</span>
              <SegmentedControl v-model="form.alimentacao.desjejum" :options="consumoOptions"
                :has-error="tentouEnviar && !form.alimentacao.desjejum" />

            </div>

            <div class="counter-grid">
              <CounterField label="Hidratação (água)" unit="copo" v-model="form.hidratacao.aguaManha" />
              <CounterField label="Hidratação (suco)" unit="copo" v-model="form.hidratacao.sucoManha" />
            </div>

            <div class="field-block" :class="{ 'field-error': tentouEnviar && !form.alimentacao.almoco }">
              <span class="field-label">Almoço</span>
              <SegmentedControl v-model="form.alimentacao.almoco" :options="consumoOptions"
                :has-error="tentouEnviar && !form.alimentacao.almoco" />
            </div>

            <div class="field-block" :class="{ 'field-error': tentouEnviar && !form.alimentacao.lanche }">
              <span class="field-label">Colação / Lanche</span>
              <SegmentedControl v-model="form.alimentacao.lanche" :options="consumoOptions"
                :has-error="tentouEnviar && !form.alimentacao.lanche"/>
            </div>

            <div class="counter-grid">
              <CounterField label="Água PM" unit="copo" v-model="form.hidratacao.aguaTarde" />
              <CounterField label="Suco PM" unit="copo" v-model="form.hidratacao.sucoTarde" />
            </div>

            <div class="field-block" :class="{ 'field-error': tentouEnviar && !form.alimentacao.jantar}">
              <span class="field-label">Jantar / Ceia</span>
              <SegmentedControl v-model="form.alimentacao.jantar" :options="consumoOptions"
                :has-error="tentouEnviar && !form.alimentacao.jantar" />
            </div>
          </article>

          <div class="right-column">
            <article class="routine-card">
              <CardTitle icon="care" title="Higiene e Cuidados" />

              <div class="care-list">
                <CareItem
                  v-for="item in cuidados"
                  :key="item.key"
                  v-model="form.cuidados[item.key]"
                  :icon="item.icon"
                  :label="item.label"
                  :refused="item.refused"
                />
              </div>
            </article>

            <article class="routine-card">
              <CardTitle icon="toilet" title="Eliminações" />

              <div class="chips-section" :class="{ 'field-error': tentouEnviar && !form.eliminacoes.urina }">
                <div class="chip-heading urine-dot">Urina</div>
                <ChipGroup v-model="form.eliminacoes.urina" :options="urinaOptions"
                 :has-error="tentouEnviar && !form.eliminacoes.urina" />
              </div>

              <div class="chips-section" :class="{ 'field-error': tentouEnviar && !form.eliminacoes.fezes }">
                <div class="chip-heading feces-dot">Fezes</div>
                <ChipGroup v-model="form.eliminacoes.fezes" :options="fezesOptions"
                 :has-error="tentouEnviar && !form.eliminacoes.fezes"/>
              </div>
            </article>
          </div>
        </section>
      </main>

      <footer class="save-bar">
        <div v-if="errorMessage && !temErros" class="error-message">{{ errorMessage }}</div>
        <p class="save-meta">
          Registrado por <strong>{{ sessionState.session?.user?.nomeCompleto }}</strong> em {{ dataHoraExibicao }}
        </p>
        <button class="save-button" type="button" :disabled="salvando" @click="salvarRegistro">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {{ salvando ? 'Salvando...' : 'Salvar Registro' }}
        </button>
      </footer>
    </div>

    <div v-if="mensagemSucesso" class="toast">✓ Registro salvo com sucesso.</div>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { assistenciaService, residenteService } from '../services'
import { sessionState } from '../stores/session.js'

const router = useRouter()
const residentes = ref([])
const salvando = ref(false)
const errorMessage = ref('')
const mensagemSucesso = ref(false)
const tentouEnviar = ref(false)
const temErros = computed(() =>

  !form.alimentacao.desjejum ||
  !form.alimentacao.almoco ||
  !form.alimentacao.lanche ||
  !form.alimentacao.jantar ||
  !form.eliminacoes.urina ||
  !form.eliminacoes.fezes ||
  !form.residenteId)


const consumoOptions = ['Recusou', 'Pouco', 'Metade', 'Tudo']
const consumoPercentual = {
  Recusou: 0,
  Pouco: 25,
  Metade: 50,
  Tudo: 100,
}
const urinaOptions = ['Ausência', 'Normal', 'Excessiva', 'Turva', 'Escura', 'Avermelhada']
const fezesOptions = ['Ausência', 'Líquida', 'Pastosa', 'Endurecida', 'Presença de Sangue', 'Excessiva']

const cuidados = [
  { key: 'banho', label: 'Banho', icon: 'bath', refused: true },
  { key: 'hidratacaoPele', label: 'Hidratação da Pele', icon: 'hand' },
  { key: 'higieneOral', label: 'Higiene Oral', icon: 'tooth' },
  { key: 'repelente', label: 'Repelente de Insetos', icon: 'spray' },
  { key: 'trocaFralda', label: 'Troca de Fralda', icon: 'baby' },
]

const form = reactive({
  residenteId: '',
  alimentacao: {
    desjejum: '',
    almoco: '',
    lanche: '',
    jantar: '',
  },
  hidratacao: {
    aguaManha: 0,
    sucoManha: 0,
    aguaTarde: 0,
    sucoTarde: 0,
  },
  cuidados: {
    banho: false,
    hidratacaoPele: false,
    higieneOral: false,
    repelente: false,
    trocaFralda: false,
  },
  eliminacoes: {
    urina: '',
    fezes: '',
  },
})

const residenteSelecionado = computed(() =>
  residentes.value.find((residente) => residente.id === form.residenteId) ?? null
)

const dataHoraExibicao = computed(() => {
  const agora = new Date()
  return agora.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
})

onMounted(async () => {
  try {
    residentes.value = await residenteService.listarResidentes()
    form.residenteId = residentes.value[0]?.id ?? ''
  } catch (error) {
    errorMessage.value = error.message || 'Não foi possível carregar os residentes.'
  }
})

async function salvarRegistro() {
  tentouEnviar.value = true
  errorMessage.value = ''

  if (temErros.value) {
    errorMessage.value = 'Preencha todos os campos obrigatórios antes de salvar.'
    return
  }
  salvando.value = true

  try {
    await assistenciaService.registrarRotinaAssistencial({
      residenteId: form.residenteId,
      tipoRefeicao: 'rotina_diaria',
      percentualAceitacao: calcularPercentualAceitacao(),
      banho: form.cuidados.banho ? 'realizado' : 'nao_realizado',
      troca: form.cuidados.trocaFralda ? 'realizada' : 'nao_realizada',
      cuidadosBucais: form.cuidados.higieneOral ? 'realizados' : 'nao_realizados',
      observacoes: montarResumoRotina(),
    })
    mensagemSucesso.value = true
    tentouEnviar.value = false
    setTimeout(() => mensagemSucesso.value = false, 2600)
  } catch (error) {
    errorMessage.value = error.message || 'Erro ao salvar a rotina assistencial.'
  } finally {
    salvando.value = false
  }
}

function iniciais(nome) {
  if (!nome) return ''
  return nome.split(' ').slice(0, 2).map((parte) => parte[0]).join('').toUpperCase()
}

function calcularPercentualAceitacao() {
  const consumos = Object.values(form.alimentacao)
  const total = consumos.reduce((acc, consumo) => acc + consumoPercentual[consumo], 0)
  return Math.round(total / consumos.length)
}

function montarResumoRotina() {
  const hidratacaoTotal = Object.values(form.hidratacao)
    .reduce((acc, quantidade) => acc + Number(quantidade), 0)

  const cuidadosExtras = [
    form.cuidados.hidratacaoPele ? 'hidratacao_pele' : null,
    form.cuidados.repelente ? 'repelente' : null,
  ].filter(Boolean)

  return [
    `desjejum=${form.alimentacao.desjejum}`,
    `almoco=${form.alimentacao.almoco}`,
    `lanche=${form.alimentacao.lanche}`,
    `jantar=${form.alimentacao.jantar}`,
    `hidratacao_total_copos=${hidratacaoTotal}`,
    `urina=${form.eliminacoes.urina}`,
    `fezes=${form.eliminacoes.fezes}`,
    `cuidados_extras=${cuidadosExtras.join(',') || 'nenhum'}`,
  ].join('; ')
}

const CardTitle = defineComponent({
  props: {
    icon: { type: String, required: true },
    title: { type: String, required: true },
  },
  setup(props) {
    return () => h('div', { class: 'card-title' }, [
      h('div', { class: 'title-icon' }, [iconSvg(props.icon)]),
      h('h2', props.title),
    ])
  },
})

const SegmentedControl = defineComponent({
  props: {
    modelValue: { type: String, default: '' },
    options: { type: Array, required: true },
    hasError: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => h('div', { class: 'segmented' },
      props.options.map((option) =>
        h('button', {
          class: ['segment-button', { active: props.modelValue === option }],
          type: 'button',
          onClick: () => emit('update:modelValue', option),
        }, option)
      )
    )
  },
})

const CounterField = defineComponent({
  props: {
    modelValue: { type: Number, required: true },
    label: { type: String, required: true },
    unit: { type: String, required: true },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const update = (delta) => emit('update:modelValue', Math.max(0, props.modelValue + delta))
    return () => h('div', { class: 'counter-field' }, [
      h('span', { class: 'field-label' }, props.label),
      h('div', { class: 'counter-box' }, [
        h('button', { type: 'button', onClick: () => update(-1) }, '-'),
        h('div', { class: 'counter-value' }, [
          h('strong', props.modelValue),
          h('span', props.modelValue === 1 ? props.unit : `${props.unit}s`),
        ]),
        h('button', { type: 'button', onClick: () => update(1) }, '+'),
      ]),
    ])
  },
})

const CareItem = defineComponent({
  props: {
    modelValue: { type: Boolean, default: false },
    icon: { type: String, required: true },
    label: { type: String, required: true },
    refused: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => h('button', {
      class: 'care-item',
      type: 'button',
      onClick: () => emit('update:modelValue', !props.modelValue),
    }, [
      h('span', { class: 'care-icon' }, [iconSvg(props.icon)]),
      h('span', { class: 'care-label' }, props.label),
      props.refused ? h('span', { class: 'refused-label' }, 'Recusou') : null,
      props.refused ? h('span', { class: ['mini-switch', { on: !props.modelValue }] }) : null,
      h('span', { class: ['check-box', { checked: props.modelValue }] }, props.modelValue ? '✓' : ''),
    ])
  },
})

const ChipGroup = defineComponent({
  props: {
    modelValue: { type: String, default: '' },
    options: { type: Array, required: true },
    hasError: { type: Boolean, default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => h('div', { class: 'chip-group' },
      props.options.map((option) =>
        h('button', {
          class: ['chip-button', { active: props.modelValue === option }],
          type: 'button',
          onClick: () => emit('update:modelValue', option),
        }, option)
      )
    )
  },
})

function iconSvg(name) {
  const attrs = {
    width: '22',
    height: '22',
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': '2.2',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  }

  const icons = {
    meal: [h('path', { d: 'M4 3v8' }), h('path', { d: 'M8 3v8' }), h('path', { d: 'M6 3v18' }), h('path', { d: 'M14 3v18' }), h('path', { d: 'M14 3c3 2 4 5 4 8v1h-4' })],
    care: [h('path', { d: 'M5 4v16' }), h('path', { d: 'M5 5h5l1 2h6l-2 4 2 4h-7l-1-2H5' })],
    toilet: [h('path', { d: 'M7 4h10v5a5 5 0 0 1-10 0V4z' }), h('path', { d: 'M9 20h6' }), h('path', { d: 'M12 14v6' })],
    bath: [h('path', { d: 'M4 12h16' }), h('path', { d: 'M6 12v5a3 3 0 0 0 3 3h6a3 3 0 0 0 3-3v-5' }), h('path', { d: 'M7 12V7a3 3 0 0 1 6 0' })],
    hand: [h('path', { d: 'M8 11V5a2 2 0 0 1 4 0v6' }), h('path', { d: 'M12 10V4a2 2 0 0 1 4 0v8' }), h('path', { d: 'M16 12V7a2 2 0 0 1 4 0v6a8 8 0 0 1-8 8h-1a7 7 0 0 1-7-7v-2a2 2 0 0 1 4 0v1' })],
    tooth: [h('path', { d: 'M12 5c2-2 6-1 7 2 1 4-2 12-4 12-1 0-1-4-3-4s-2 4-3 4c-2 0-5-8-4-12 1-3 5-4 7-2z' })],
    spray: [h('path', { d: 'M9 3h6v4H9z' }), h('path', { d: 'M10 7h4v14h-4z' }), h('path', { d: 'M15 5h4' }), h('path', { d: 'M19 5v3' }), h('path', { d: 'M20 11h1' }), h('path', { d: 'M20 15h1' })],
    baby: [h('circle', { cx: '12', cy: '7', r: '3' }), h('path', { d: 'M6 21c1-5 11-5 12 0' }), h('path', { d: 'M8 13l4 3 4-3' })],
  }

  return h('svg', attrs, icons[name] ?? icons.care)
}
</script>

<style>
* {
  box-sizing: border-box;
}

.routine-page {
  min-height: 100vh;
  background: #f0f2f7;
  color: #1a1a2e;
  font-family: 'Segoe UI', sans-serif;
  padding: 28px 24px;
}

.routine-shell {
  max-width: 1120px;
  margin: 0 auto;
  min-height: calc(100vh - 56px);
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 72px;
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: center;
  gap: 16px;
  padding: 0 28px;
  border-bottom: 1px solid #e2e8f0;
}


.back-button {
  width: 36px;
  height: 36px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 0;
  background: #eef2ff;
  color: #3B6FE8;
  cursor: pointer;
}

.topbar h1 {
  font-size: 18px;
  line-height: 1.2;
  font-weight: 600;
  color: #1a1a2e;
  margin: 0;
  text-align: left;
}

.resident-pill {
  min-width: 240px;
  height: 52px;
  display: grid;
  grid-template-columns: 36px 1fr;
  align-items: center;
  gap: 10px;
  padding: 6px 14px 6px 8px;
  border: 1px solid #e2e8f0;
  border-radius: 999px;
  background: #eef2ff;
   text-align: left;
}

.resident-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3B6FE8;
  background-size: cover;
  background-position: center;
  color: #fff;
  font-size: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.resident-copy {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.resident-copy span {
  color: #718096;
  font-size: 10px;
  line-height: 1;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.resident-copy select {
  width: 100%;
  border: 0;
  background: transparent;
  color: #3B6FE8;
  font-size: 14px;
  font-weight: 600;
  outline: none;
  appearance: none;
}

.routine-canvas {
  flex: 1;
  background: #f0f2f7;
  padding: 28px;
}

.routine-grid {
  display: grid;
  grid-template-columns: minmax(360px, 1fr) minmax(360px, 1fr);
  gap: 20px;
  align-items: start;
}

.right-column {
  display: grid;
  gap: 20px;
}

.routine-card {
  background: #ffffff;
  border: 1px solid #e8ecf2;
  border-radius: 10px;
  padding: 24px 28px;
}

.card-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 12px;
}

.title-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eef2ff;
  color: #3B6FE8;
}

.card-title h2 {
  margin: 0;
  color: #3B6FE8;
  font-size: 12px;
  line-height: 1.2;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.field-block {
  display: grid;
  gap: 8px;
  margin-top: 18px;
}

.field-label {
  color: #718096;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.segmented {
  height: 44px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border: 1px solid #d1d9e6;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
}

.segment-button {
  border: 0;
  border-right: 1px solid #d1d9e6;
  background: #fff;
  color: #4a5568;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.segment-button:last-child {
  border-right: 0;
}

.segment-button.active {
  background: #eef2ff;
  color: #3B6FE8;
  font-weight: 600;
}

.counter-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 18px;
}

.counter-field {
  display: grid;
  gap: 8px;
}

.counter-field .field-label {
  font-size: 11px;
}

.counter-box {
  height: 48px;
  display: grid;
  grid-template-columns: 34px 1fr 34px;
  align-items: center;
  gap: 10px;
  padding: 0 8px;
  border: 1px solid #d1d9e6;
  border-radius: 6px;
  background: #fff;
}

.counter-box button {
  width: 30px;
  height: 30px;
  border: 1px solid #d1d9e6;
  border-radius: 6px;
  background: #eef2ff;
  color: #3B6FE8;
  font-size: 18px;
  line-height: 1;
  font-weight: 600;
  cursor: pointer;
}

.counter-value {
  min-width: 0;
  text-align: center;
  color: #a0aec0;
  font-size: 13px;
  font-weight: 500;
}

.counter-value strong {
  color: #1a1a2e;
  font-size: 16px;
  margin-right: 4px;
}

.care-list {
  display: grid;
  gap: 12px;
}

.care-item {
  min-height: 48px;
  display: grid;
  grid-template-columns: 24px 1fr auto auto auto;
  align-items: center;
  gap: 10px;
  width: 100%;
  border: 1px solid #e8ecf2;
  border-radius: 6px;
  background: #fff;
  padding: 10px 14px;
  color: #4a5568;
  cursor: pointer;
  text-align: left;
}

.care-icon {
  color: #718096;
  display: inline-flex;
}

.care-label {
  font-size: 14px;
  font-weight: 500;
  color: #1a1a2e;
}

.refused-label {
  color: #718096;
  font-size: 12px;
  font-weight: 600;
}

.mini-switch {
  width: 40px;
  height: 22px;
  border-radius: 999px;
  background: #e2e8f0;
  position: relative;
}

.mini-switch::after {
  content: '';
  width: 14px;
  height: 14px;
  position: absolute;
  top: 4px;
  left: 4px;
  border-radius: 50%;
  background: #fff;
}

.mini-switch.on {
  background: #eef2ff;
}

.mini-switch.on::after {
  left: 22px;
  background: #3B6FE8;
}

.check-box {
  width: 24px;
  height: 24px;
  border: 1.5px solid #d1d9e6;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 13px;
  font-weight: 700;
}

.check-box.checked {
  background: #3B6FE8;
  border-color: #3B6FE8;
}

.chips-section {
  margin-top: 18px;
}

.chip-heading {
  color: #718096;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.chip-heading::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.urine-dot::before {
  background: #60a5fa;
}

.feces-dot::before {
  background: #fb923c;
}

.chip-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip-button {
  min-height: 34px;
  border: 1px solid #3B6FE8;
  border-radius: 6px;
  background: #fff;
  color: #3B6FE8;
  padding: 0 14px;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
}

.chip-button.active {
  background: #3B6FE8;
  color: #fff;
}

.save-bar {
  min-height: 100px;
  display: grid;
  align-content: center;
  justify-items: center;
  gap: 10px;
  background: #fff;
  border-top: 1px solid #e2e8f0;
}

.save-button {
  width: min(420px, calc(100% - 48px));
  height: 48px;
  border: 0;
  border-radius: 8px;
  background: #3B6FE8;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.save-button:hover {
  background: #2c5ce0;
}

.save-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  background: #276749;
  color: #fff;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 500;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.segmented-error {
  border: 2px solid #e53e3e !important;
  background: #fff5f5;
}

.field-error .field-label,
.field-error .chip-heading {
  color: #e53e3e;
}

.chip-group-error .chip-button {
  border-color: #e53e3e;
  border-width: 2px;
}

.field-error .field-label {
  color: #e53e3e;
}

.select-error {
  color: #e53e3e !important;
}

.resident-pill.pill-error {
  border: 2px solid #e53e3e;
  background: #fff5f5;
}

.save-meta {
  font-size: 12px;
  color: #718096;
  text-align: center;
  margin: 0;
}

.save-meta strong {
  color: #1a1a2e;
  font-weight: 600;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  padding: 12px 16px;
  color: #c53030;
  font-size: 14px;
  margin-bottom: 16px;
  text-align: left;
}

.error-banner svg {
  flex-shrink: 0;
}

.error-message {
  color: #c53030;
  font-size: 13px;
  font-weight: 500;
}

@media (max-width: 1050px) {
  .routine-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .routine-page {
    padding: 0;
  }
  .routine-shell {
    min-height: 100vh;
    border: 0;
    border-radius: 0;
  }
  .topbar {
    height: auto;
    grid-template-columns: 32px 1fr;
    padding: 12px 16px;
  }
  .resident-pill {
    grid-column: 1 / -1;
    width: 100%;
  }
  .routine-canvas {
    padding: 16px;
  }
  .routine-card {
    padding: 18px;
  }
  .counter-grid {
    grid-template-columns: 1fr;
  }
  .care-item {
    grid-template-columns: 22px 1fr auto;
  }
  .refused-label,
  .mini-switch {
    display: none;
  }


}
</style>
