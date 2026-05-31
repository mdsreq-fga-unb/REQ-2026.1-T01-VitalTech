<script setup>
import { onMounted, reactive, ref } from 'vue';
import { usuarioService } from '../services/index.js';
import { showToast } from '../stores/toast.js';
import { getMissingFields, getServiceErrorMessage } from '../utils/serviceErrors.js';

const usuarios = ref([]);
const loading = ref(false);
const errorMessage = ref('');
const missingFields = ref([]);

const form = reactive({
  nomeCompleto: '',
  login: '',
  perfil: 'cuidador',
  senhaProvisoria: '',
});

function resetForm() {
  form.nomeCompleto = '';
  form.login = '';
  form.perfil = 'cuidador';
  form.senhaProvisoria = '';
}

function hasFieldError(field) {
  return missingFields.value.includes(field);
}

async function carregarUsuarios() {
  usuarios.value = await usuarioService.listarUsuarios();
}

async function salvarUsuario() {
  loading.value = true;
  errorMessage.value = '';
  missingFields.value = [];

  try {
    await usuarioService.criarUsuario(form);
    await carregarUsuarios();
    resetForm();
    showToast('Usuário cadastrado com sucesso.');
  } catch (error) {
    missingFields.value = getMissingFields(error);
    errorMessage.value = getServiceErrorMessage(error);
  } finally {
    loading.value = false;
  }
}

onMounted(carregarUsuarios);
</script>

<template>
  <section class="page-header">
    <div>
      <p class="eyebrow">US10</p>
      <h1>Cadastro de usuários</h1>
      <p class="muted">
        Apenas o gestor cadastra novos acessos individuais para a equipe.
      </p>
    </div>
  </section>

  <section class="two-column">
    <form class="work-panel form-stack" @submit.prevent="salvarUsuario">
      <h2>Novo usuário</h2>

      <label :class="{ invalid: hasFieldError('nomeCompleto') }">
        Nome completo
        <input v-model.trim="form.nomeCompleto" />
      </label>

      <label :class="{ invalid: hasFieldError('login') }">
        Login
        <input v-model.trim="form.login" autocomplete="off" />
      </label>

      <label :class="{ invalid: hasFieldError('perfil') }">
        Perfil
        <select v-model="form.perfil">
          <option value="cuidador">Cuidador</option>
          <option value="multidisciplinar">Multidisciplinar</option>
          <option value="gestor">Gestor</option>
        </select>
      </label>

      <label :class="{ invalid: hasFieldError('senhaProvisoria') }">
        Senha provisória
        <input v-model="form.senhaProvisoria" type="password" autocomplete="new-password" />
      </label>

      <p v-if="errorMessage" class="form-alert" role="alert">
        {{ errorMessage }}
      </p>

      <button class="button button-primary" type="submit" :disabled="loading">
        {{ loading ? 'Salvando...' : 'Cadastrar usuário' }}
      </button>
    </form>

    <section class="work-panel">
      <h2>Usuários cadastrados</h2>
      <div class="data-list">
        <article v-for="usuario in usuarios" :key="usuario.id" class="data-row">
          <div>
            <strong>{{ usuario.nomeCompleto }}</strong>
            <span>{{ usuario.login }}</span>
          </div>
          <span class="tag">{{ usuario.perfil }}</span>
        </article>
      </div>
    </section>
  </section>
</template>
