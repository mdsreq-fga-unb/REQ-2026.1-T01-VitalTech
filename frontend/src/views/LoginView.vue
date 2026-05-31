<script setup>
import { reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getServiceErrorMessage } from '../utils/serviceErrors.js';
import { login } from '../stores/session.js';

const router = useRouter();
const route = useRoute();
const loading = ref(false);
const errorMessage = ref('');
const form = reactive({
  login: 'gestor',
  senha: '123',
});

async function submit() {
  loading.value = true;
  errorMessage.value = '';

  try {
    await login(form);
    router.push(route.query.redirect?.toString() || '/');
  } catch (error) {
    errorMessage.value = getServiceErrorMessage(error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <section class="login-page">
    <div class="login-panel">
      <div>
        <p class="eyebrow">VitalTech</p>
        <h1>Acesso ao sistema</h1>
        <p class="muted">
          Use uma conta autorizada para acessar os cadastros da Sprint 2.
        </p>
      </div>

      <form class="form-stack" @submit.prevent="submit">
        <label>
          Login
          <input v-model.trim="form.login" autocomplete="username" required />
        </label>

        <label>
          Senha
          <input v-model="form.senha" type="password" autocomplete="current-password" required />
        </label>

        <p v-if="errorMessage" class="form-alert" role="alert">
          {{ errorMessage }}
        </p>

        <button class="button button-primary" type="submit" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </button>
      </form>

      <div class="demo-access">
        <strong>Conta de demonstração</strong>
        <span>gestor / 123</span>
      </div>
    </div>
  </section>
</template>
