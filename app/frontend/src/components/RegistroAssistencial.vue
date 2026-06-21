<script setup>
import { reactive, ref } from 'vue'
import { assistenciaService, ERROR_CODES } from '../services'
import { getServiceErrorMessage } from '../utils/serviceErrors.js'

const props = defineProps({
  residente: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['registrado'])

const activeTab = ref('sinais')
const salvando = ref(false)
const mensagemSucesso = ref('')
const errorMessage = ref('')

const sinaisVitais = reactive({
  pressaoArterial: '',
  frequenciaCardiaca: '',
  temperatura: '',
  glicemia: '',
  confirmarForaDoParametro: false,
})

const rotina = reactive({
  tipoRefeicao: '',
  percentualAceitacao: '',
  banho: '',
  troca: '',
  cuidadosBucais: '',
  observacoes: '',
})

function limparSinaisVitais() {
  sinaisVitais.pressaoArterial = ''
  sinaisVitais.frequenciaCardiaca = ''
  sinaisVitais.temperatura = ''
  sinaisVitais.glicemia = ''
  sinaisVitais.confirmarForaDoParametro = false
}

function limparRotina() {
  rotina.tipoRefeicao = ''
  rotina.percentualAceitacao = ''
  rotina.banho = ''
  rotina.troca = ''
  rotina.cuidadosBucais = ''
  rotina.observacoes = ''
}

function mostrarSucesso(mensagem) {
  mensagemSucesso.value = mensagem
  setTimeout(() => {
    mensagemSucesso.value = ''
  }, 3000)
}

async function salvarSinaisVitais() {
  salvando.value = true
  errorMessage.value = ''

  try {
    await assistenciaService.registrarSinaisVitais({
      residenteId: props.residente.id,
      pressaoArterial: sinaisVitais.pressaoArterial,
      frequenciaCardiaca: sinaisVitais.frequenciaCardiaca,
      temperatura: sinaisVitais.temperatura,
      glicemia: sinaisVitais.glicemia,
      confirmarForaDoParametro: sinaisVitais.confirmarForaDoParametro,
    })
    limparSinaisVitais()
    mostrarSucesso('Sinais vitais registrados.')
    emit('registrado')
  } catch (error) {
    if (error.code === ERROR_CODES.VALUES_OUT_OF_RANGE && !sinaisVitais.confirmarForaDoParametro) {
      const confirmado = window.confirm('Existem valores fora dos parametros clinicos. Deseja salvar mesmo assim?')
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

async function salvarRotinaAssistencial() {
  salvando.value = true
  errorMessage.value = ''

  try {
    await assistenciaService.registrarRotinaAssistencial({
      residenteId: props.residente.id,
      tipoRefeicao: rotina.tipoRefeicao,
      percentualAceitacao: rotina.percentualAceitacao,
      banho: rotina.banho,
      troca: rotina.troca,
      cuidadosBucais: rotina.cuidadosBucais,
      observacoes: rotina.observacoes,
    })
    limparRotina()
    mostrarSucesso('Rotina assistencial registrada.')
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
    <div class="section-header">
      <div>
        <p class="section-label">REGISTRO ASSISTENCIAL</p>
        <h3 class="section-title">Novo lancamento</h3>
      </div>
      <div class="tabs" role="tablist" aria-label="Tipo de registro assistencial">
        <button
          class="tab"
          :class="{ active: activeTab === 'sinais' }"
          type="button"
          @click="activeTab = 'sinais'"
        >
          Sinais vitais
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'rotina' }"
          type="button"
          @click="activeTab = 'rotina'"
        >
          Rotina
        </button>
      </div>
    </div>

    <div v-if="errorMessage" class="feedback feedback-error" role="alert">
      {{ errorMessage }}
    </div>

    <div v-if="mensagemSucesso" class="feedback feedback-success" role="status">
      {{ mensagemSucesso }}
    </div>

    <form v-if="activeTab === 'sinais'" class="assistencia-form" @submit.prevent="salvarSinaisVitais">
      <label class="field">
        <span>Pressao arterial</span>
        <input v-model.trim="sinaisVitais.pressaoArterial" type="text" placeholder="120/80" required />
      </label>

      <label class="field">
        <span>Frequencia cardiaca</span>
        <input v-model.trim="sinaisVitais.frequenciaCardiaca" type="number" min="0" required />
      </label>

      <label class="field">
        <span>Temperatura</span>
        <input v-model.trim="sinaisVitais.temperatura" type="number" step="0.1" min="0" required />
      </label>

      <label class="field">
        <span>Glicemia</span>
        <input v-model.trim="sinaisVitais.glicemia" type="number" min="0" required />
      </label>

      <button class="btn-primary" type="submit" :disabled="salvando">
        {{ salvando ? 'Salvando...' : 'Registrar sinais' }}
      </button>
    </form>

    <form v-else class="assistencia-form" @submit.prevent="salvarRotinaAssistencial">
      <label class="field">
        <span>Refeicao</span>
        <select v-model="rotina.tipoRefeicao" required>
          <option value="">Selecione</option>
          <option>Cafe da manha</option>
          <option>Almoco</option>
          <option>Lanche</option>
          <option>Jantar</option>
          <option>Ceia</option>
        </select>
      </label>

      <label class="field">
        <span>Aceitacao (%)</span>
        <input v-model.trim="rotina.percentualAceitacao" type="number" min="0" max="100" required />
      </label>

      <label class="field">
        <span>Banho</span>
        <select v-model="rotina.banho" required>
          <option value="">Selecione</option>
          <option>Realizado</option>
          <option>Nao realizado</option>
        </select>
      </label>

      <label class="field">
        <span>Troca</span>
        <select v-model="rotina.troca" required>
          <option value="">Selecione</option>
          <option>Realizada</option>
          <option>Nao realizada</option>
        </select>
      </label>

      <label class="field">
        <span>Cuidados bucais</span>
        <select v-model="rotina.cuidadosBucais" required>
          <option value="">Selecione</option>
          <option>Realizados</option>
          <option>Nao realizados</option>
        </select>
      </label>

      <label class="field field-full">
        <span>Observacoes</span>
        <textarea v-model.trim="rotina.observacoes" rows="3"></textarea>
      </label>

      <button class="btn-primary" type="submit" :disabled="salvando">
        {{ salvando ? 'Salvando...' : 'Registrar rotina' }}
      </button>
    </form>
  </section>
</template>

<style scoped>
.registro-assistencial {
  background: #fff;
  border: 1px solid #e8ecf2;
  border-radius: 12px;
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
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

.tabs {
  display: flex;
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.tab {
  min-height: 44px;
  padding: 0 14px;
  border: none;
  background: #fff;
  color: #4a5568;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
}

.tab + .tab {
  border-left: 1px solid #d1d9e6;
}

.tab.active {
  background: #eef2ff;
  color: #3B6FE8;
}

.assistencia-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-full {
  grid-column: 1 / -1;
}

.field span {
  color: #718096;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  min-height: 44px;
  border: 1px solid #d1d9e6;
  border-radius: 8px;
  background: #fff;
  color: #1a1a2e;
  font-size: 14px;
  padding: 0 12px;
  outline: none;
}

.field textarea {
  padding: 10px 12px;
  resize: vertical;
}

.field input:focus,
.field select:focus,
.field textarea:focus {
  border-color: #3B6FE8;
  box-shadow: 0 0 0 3px rgba(59, 111, 232, 0.12);
}

.btn-primary {
  min-height: 44px;
  border: none;
  border-radius: 8px;
  background: #3B6FE8;
  color: #fff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 700;
  padding: 0 18px;
  justify-self: start;
}

.btn-primary:disabled {
  cursor: not-allowed;
  opacity: 0.65;
}

.feedback {
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: 12px;
  padding: 10px 12px;
}

.feedback-error {
  background: #fff5f5;
  border: 1px solid #feb2b2;
  color: #c53030;
}

.feedback-success {
  background: #f0fff4;
  border: 1px solid #9ae6b4;
  color: #276749;
}

@media (max-width: 900px) {
  .section-header {
    flex-direction: column;
  }

  .tabs {
    width: 100%;
  }

  .tab {
    flex: 1;
  }
}

@media (max-width: 640px) {
  .registro-assistencial {
    padding: 16px;
  }

  .assistencia-form {
    grid-template-columns: 1fr;
  }
}
</style>
