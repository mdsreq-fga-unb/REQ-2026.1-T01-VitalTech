<script setup>
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { hasPermission, PERMISSOES } from '../services/index.js';
import { sessionState } from '../stores/session.js';

const user = computed(() => sessionState.session?.user ?? null);
const canCreateUsers = computed(() => hasPermission(user.value, PERMISSOES.USUARIOS_CREATE));
</script>

<template>
  <section class="page-header">
    <div>
      <p class="eyebrow">Sprint 2</p>
      <h1>Fundação do sistema</h1>
      <p class="muted">
        Fluxo demonstrável: login, cadastro de usuário, cadastro de residente e logout.
      </p>
    </div>
  </section>

  <section class="summary-grid">
    <article class="summary-card">
      <h2>Autenticação</h2>
      <p>Login com credenciais individuais, sessão temporária e logout seguro.</p>
      <span class="tag">US08 · US09</span>
    </article>

    <article class="summary-card">
      <h2>Usuários</h2>
      <p>Cadastro pelo gestor, perfis institucionais e validação de login duplicado.</p>
      <RouterLink v-if="canCreateUsers" class="button button-secondary" :to="{ name: 'usuarios' }">
        Gerenciar usuários
      </RouterLink>
      <span v-else class="tag">Acesso restrito ao gestor</span>
    </article>

    <article class="summary-card">
      <h2>Residentes</h2>
      <p>Cadastro base com campos obrigatórios, rastreabilidade e preparação para soft delete.</p>
      <RouterLink class="button button-secondary" :to="{ name: 'residentes' }">
        Ver residentes
      </RouterLink>
    </article>
  </section>

  <section class="work-panel">
    <h2>Regras de negócio cobertas nesta base</h2>
    <div class="rule-list">
      <span>RN-02: schema local compatível com backend futuro</span>
      <span>RN-03: residente já nasce com isAtivo para soft delete futuro</span>
      <span>RN-05: bloqueio de campos obrigatórios</span>
      <span>RN-09: confirmação visual após salvar</span>
    </div>
  </section>
</template>
