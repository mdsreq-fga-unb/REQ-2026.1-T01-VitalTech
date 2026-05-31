<script setup>
import { computed, onMounted } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router';
import ToastHost from './components/ToastHost.vue';
import { hasPermission, PERMISSOES } from './services/index.js';
import { loadSession, logout, sessionState } from './stores/session.js';

const router = useRouter();
const user = computed(() => sessionState.session?.user ?? null);
const canManageUsers = computed(() => hasPermission(user.value, PERMISSOES.USUARIOS_LIST));

onMounted(() => {
  loadSession();
});

async function handleLogout() {
  await logout();
  router.push({ name: 'login' });
}
</script>

<template>
  <ToastHost />

  <div class="app-shell">
    <header v-if="user" class="topbar">
      <RouterLink class="brand" :to="{ name: 'dashboard' }">
        <span class="brand-mark">VT</span>
        <span>
          <strong>VitalTech</strong>
          <small>Sprint 2</small>
        </span>
      </RouterLink>

      <nav class="main-nav" aria-label="Navegação principal">
        <RouterLink :to="{ name: 'dashboard' }">Painel</RouterLink>
        <RouterLink v-if="canManageUsers" :to="{ name: 'usuarios' }">Usuários</RouterLink>
        <RouterLink :to="{ name: 'residentes' }">Residentes</RouterLink>
      </nav>

      <div class="session-box">
        <span>{{ user.nomeCompleto }}</span>
        <small>{{ user.perfil }}</small>
        <button class="button button-ghost" type="button" @click="handleLogout">
          Sair
        </button>
      </div>
    </header>

    <main class="app-main" :class="{ 'app-main-authenticated': user }">
      <RouterView />
    </main>
  </div>
</template>
