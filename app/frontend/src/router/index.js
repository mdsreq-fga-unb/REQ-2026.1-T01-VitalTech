import { createRouter, createWebHistory } from 'vue-router'
import NovoCadastro from '../components/NovoCadastro.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: { template: '<div>VitalTech Home</div>' }
  },
  {
    path: '/cadastro',
    component: NovoCadastro
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router