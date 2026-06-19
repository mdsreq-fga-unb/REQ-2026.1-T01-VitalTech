<script setup>
import { onMounted, onUnmounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import ToastNotification from './components/ToastNotification.vue'
import { sessionState, logout } from './stores/session.js'

const router = useRouter()

// RNF11: Timeout automatico de 15 minutos de inatividade
const INATIVIDADE_MS = 15 * 60 * 1000
let timerInatividade = null

// Reinicia o contador de inatividade a cada interacao do usuario
function resetarTimer() {
  // So monitora se houver uma sessao ativa
  if (!sessionState.session) return
  clearTimeout(timerInatividade)
  timerInatividade = setTimeout(async () => {
    await logout()
    // Redireciona para login informando o motivo (exibido como aviso na tela de login)
    router.push({ name: 'login', query: { motivo: 'inatividade' } })
  }, INATIVIDADE_MS)
}

// Cancela o timer quando a sessao e encerrada manualmente (logout voluntario)
watch(() => sessionState.session, (novaSessao) => {
  if (!novaSessao) {
    clearTimeout(timerInatividade)
    timerInatividade = null
  } else {
    resetarTimer()
  }
})

// Eventos que indicam atividade do usuario no dispositivo
const EVENTOS_ATIVIDADE = ['mousemove', 'keydown', 'click', 'touchstart', 'scroll']

onMounted(() => {
  EVENTOS_ATIVIDADE.forEach(evt =>
    window.addEventListener(evt, resetarTimer, { passive: true })
  )
  // Inicia o timer se ja houver sessao ao montar (ex: recarregamento de pagina)
  resetarTimer()
})

onUnmounted(() => {
  EVENTOS_ATIVIDADE.forEach(evt =>
    window.removeEventListener(evt, resetarTimer)
  )
  clearTimeout(timerInatividade)
})
</script>

<template>
  <RouterView />
  <ToastNotification />
</template>
