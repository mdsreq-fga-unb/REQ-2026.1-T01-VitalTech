import { createRouter, createWebHistory } from 'vue-router';
import { hasPermission, PERMISSOES } from '../services/index.js';
import { loadSession, sessionState } from '../stores/session.js';
import DashboardView from '../views/DashboardView.vue';
import LoginView from '../views/LoginView.vue';
import ResidentesView from '../views/ResidentesView.vue';
import UsuariosView from '../views/UsuariosView.vue';

const routes = [
  {
    path: '/',
    name: 'dashboard',
    component: DashboardView,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: UsuariosView,
    meta: { requiresAuth: true, permission: PERMISSOES.USUARIOS_LIST },
  },
  {
    path: '/residentes',
    name: 'residentes',
    component: ResidentesView,
    meta: { requiresAuth: true, permission: PERMISSOES.RESIDENTES_LIST },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (sessionState.loading) {
    await loadSession();
  }

  const user = sessionState.session?.user ?? null;

  if (to.meta.requiresAuth && !user) {
    return {
      name: 'login',
      query: { redirect: to.fullPath },
    };
  }

  if (to.name === 'login' && user) {
    return { name: 'dashboard' };
  }

  if (to.meta.permission && !hasPermission(user, to.meta.permission)) {
    return { name: 'dashboard' };
  }

  return true;
});

export default router;
