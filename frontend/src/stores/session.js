import { reactive } from 'vue';
import { authService } from '../services/index.js';

export const sessionState = reactive({
  session: null,
  loading: true,
});

export async function loadSession() {
  sessionState.session = await authService.getCurrentSession();
  sessionState.loading = false;
  return sessionState.session;
}

export async function login(credentials) {
  sessionState.session = await authService.login(credentials);
  sessionState.loading = false;
  return sessionState.session;
}

export async function logout() {
  await authService.logout();
  sessionState.session = null;
  sessionState.loading = false;
}
