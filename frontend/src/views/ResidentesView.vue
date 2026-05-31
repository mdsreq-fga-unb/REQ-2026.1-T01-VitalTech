<script setup>
import { onMounted, reactive, ref } from 'vue';
import { residenteService } from '../services/index.js';
import { showToast } from '../stores/toast.js';
import { getMissingFields, getServiceErrorMessage } from '../utils/serviceErrors.js';

const residentes = ref([]);
const loading = ref(false);
const errorMessage = ref('');
const missingFields = ref([]);

const form = reactive({
  nomeCompleto: '',
  dataNascimento: '',
  cpf: '',
  grauDependencia: '',
  responsavelLegal: '',
  setor: '',
  quarto: '',
  dadosClinicos: '',
});

function resetForm() {
  Object.assign(form, {
    nomeCompleto: '',
    dataNascimento: '',
    cpf: '',
    grauDependencia: '',
    responsavelLegal: '',
    setor: '',
    quarto: '',
    dadosClinicos: '',
  });
}

function hasFieldError(field) {
  return missingFields.value.includes(field);
}

async function carregarResidentes() {
  residentes.value = await residenteService.listarResidentes();
}

async function salvarResidente() {
  loading.value = true;
  errorMessage.value = '';
  missingFields.value = [];

  try {
    await residenteService.criarResidente(form);
    await carregarResidentes();
    resetForm();
    showToast('Residente cadastrado com sucesso.');
  } catch (error) {
    missingFields.value = getMissingFields(error);
    errorMessage.value = getServiceErrorMessage(error);
  } finally {
    loading.value = false;
  }
}

onMounted(carregarResidentes);
</script>

<template>
  <section class="page-header">
    <div>
      <p class="eyebrow">US01</p>
      <h1>Cadastro de residentes</h1>
      <p class="muted">
        Cria a base de residentes para o ciclo assistencial da Sprint 3.
      </p>
    </div>
  </section>

  <section class="two-column two-column-wide">
    <form class="work-panel form-stack" @submit.prevent="salvarResidente">
      <h2>Novo residente</h2>

      <div class="form-grid">
        <label :class="{ invalid: hasFieldError('nomeCompleto') }">
          Nome completo
          <input v-model.trim="form.nomeCompleto" />
        </label>

        <label :class="{ invalid: hasFieldError('dataNascimento') }">
          Data de nascimento
          <input v-model="form.dataNascimento" type="date" />
        </label>

        <label :class="{ invalid: hasFieldError('cpf') }">
          CPF
          <input v-model.trim="form.cpf" inputmode="numeric" />
        </label>

        <label :class="{ invalid: hasFieldError('grauDependencia') }">
          Grau de dependência
          <input v-model.trim="form.grauDependencia" />
        </label>

        <label :class="{ invalid: hasFieldError('responsavelLegal') }">
          Responsável legal
          <input v-model.trim="form.responsavelLegal" />
        </label>

        <label>
          Setor
          <input v-model.trim="form.setor" />
        </label>

        <label>
          Quarto
          <input v-model.trim="form.quarto" />
        </label>
      </div>

      <label>
        Dados clínicos iniciais
        <textarea v-model.trim="form.dadosClinicos" rows="4" />
      </label>

      <p v-if="errorMessage" class="form-alert" role="alert">
        {{ errorMessage }}
      </p>

      <button class="button button-primary" type="submit" :disabled="loading">
        {{ loading ? 'Salvando...' : 'Cadastrar residente' }}
      </button>
    </form>

    <section class="work-panel">
      <h2>Residentes ativos</h2>
      <div class="data-list">
        <article v-for="residente in residentes" :key="residente.id" class="data-row resident-row">
          <div>
            <strong>{{ residente.nomeCompleto }}</strong>
            <span>CPF {{ residente.cpf }} · {{ residente.grauDependencia }}</span>
            <small>
              Setor {{ residente.setor || 'não informado' }} · Quarto {{ residente.quarto || 'não informado' }}
            </small>
          </div>
          <span class="tag">Ativo</span>
        </article>
      </div>
    </section>
  </section>
</template>
