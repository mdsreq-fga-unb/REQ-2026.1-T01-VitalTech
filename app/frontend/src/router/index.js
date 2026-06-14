import { createRouter, createWebHistory } from 'vue-router'
import NovoCadastro from '../components/NovoCadastro.vue'
import ListaUsuarios from '../components/ListaUsuarios.vue'
import ListaResidentes from '../components/ListaResidentes.vue'
import LoginView from '../views/LoginView.vue'
import { hasPermission, PERMISSOES } from '../services/index.js'
import { loadSession, sessionState } from '../stores/session.js'

const routes = [
  {
    path: '/',
    redirect: '/residentes'
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/cadastro',
    name: 'cadastro',
    component: NovoCadastro,
    meta: { requiresAuth: true, permission: PERMISSOES.RESIDENTES_CREATE }
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: ListaUsuarios,
    meta: { requiresAuth: true, permission: PERMISSOES.USUARIOS_LIST }
  },
  {
    path: '/residentes',
    name: 'residentes',
    component: ListaResidentes,
    meta: { requiresAuth: true, permission: PERMISSOES.RESIDENTES_LIST }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Guarda global de rotas para verificar autenticacao e permissoes
router.beforeEach(async (to) => {
  // Carrega a sessao local caso esteja pendente
  if (sessionState.loading) {
    await loadSession()
  }

  const user = sessionState.session?.user ?? null

  // Rota protegida sem usuario autenticado redireciona para login
  if (to.meta.requiresAuth && !user) {
    return {
      name: 'login',
      query: { redirect: to.fullPath }
    }
  }

  // Usuario ja logado tentando acessar tela de login e mandado para a home
  if (to.name === 'login' && user) {
    return { name: 'residentes' }
  }

  // Verifica permissao especifica do perfil para a rota (ex: Gestor no cadastro/usuarios)
  if (to.meta.permission && !hasPermission(user, to.meta.permission)) {
    console.warn(`Usuario ${user.login} sem permissao para acessar ${to.path}`)
    return { name: 'residentes' }
  }

  return true
})

export default router