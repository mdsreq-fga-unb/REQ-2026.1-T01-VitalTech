import { createRouter, createWebHistory } from 'vue-router'
import NovoCadastro from '../components/NovoCadastro.vue'
import ListaUsuarios from '../components/ListaUsuarios.vue'
import ListaResidentes from '../components/ListaResidentes.vue'

const routes = [
  { path: '/cadastro', component: NovoCadastro },
  { path: '/usuarios', component: ListaUsuarios },
  { path: '/residentes', component: ListaResidentes },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router