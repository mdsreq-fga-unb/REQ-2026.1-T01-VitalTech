<script setup>
import { reactive, ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getServiceErrorMessage } from '../utils/serviceErrors.js'
import { login } from '../stores/session.js'

const router = useRouter()
const route = useRoute()
const loading = ref(false)
const errorMessage = ref('')
const showSenha = ref(false)

// RNF11: exibe aviso quando a sessao foi encerrada por inatividade
const encerradoPorInatividade = computed(() => route.query.motivo === 'inatividade')

const form = reactive({
  login: '',
  senha: ''
})

async function submit() {
  loading.value = true
  errorMessage.value = ''

  try {
    await login(form)
    // Redireciona para a rota desejada ou para a home de residentes
    router.push(route.query.redirect?.toString() || '/residentes')
  } catch (error) {
    errorMessage.value = getServiceErrorMessage(error)
  } finally {
    loading.value = false
  }
}

function esqueciSenha() {
  alert('Esta funcionalidade está em desenvolvimento. Por favor, solicite a alteração da sua senha diretamente ao administrador/gestor do sistema.')
}
</script>

<template>
  <div class="login-wrapper">
    <!-- Painel Esquerdo: Identidade Visual e Blobs Gradient -->
    <div class="left-panel">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      
      <div class="brand-container">
        <div class="logo-card">
          <!-- Coração preenchido com linha de batimento cardíaco (ECG) embutida -->
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#2563eb"/>
            <path d="M5 9.5H8L9.5 6L11.5 13L13.5 8L15 10.5H19" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        <h1 class="brand-title">VitalTech</h1>
        <p class="brand-subtitle">Lar dos Velhinhos Bezerra de Menezes</p>
      </div>
    </div>

    <!-- Painel Direito: Formulário de Acesso -->
    <div class="right-panel">
      <div class="login-card">
        <h2 class="card-title">Acesso ao Sistema</h2>
        <p class="card-subtitle">Insira suas credenciais para continuar.</p>

        <form class="login-form" @submit.prevent="submit">
          <div class="form-group">
            <label for="login-input" class="form-label">Usuário ou E-mail</label>
            <input
              id="login-input"
              name="username"
              v-model.trim="form.login"
              type="text"
              class="form-input"
              autocomplete="username"
              required
              placeholder="exemplo@vitaltech.com"
            />
          </div>

          <div class="form-group">
            <label for="password-input" class="form-label">Senha</label>
            <div class="password-wrapper">
              <input
                id="password-input"
                name="password"
                v-model="form.senha"
                :type="showSenha ? 'text' : 'password'"
                class="form-input password-input"
                autocomplete="current-password"
                required
                placeholder="••••••••"
              />
              <button type="button" class="visibility-toggle" @click="showSenha = !showSenha" title="Alternar visibilidade da senha">
                <svg v-if="showSenha" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
                  <line x1="1" y1="1" x2="23" y2="23"/>
                </svg>
                <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Aviso de sessao encerrada por inatividade (RNF11) -->
          <div v-if="encerradoPorInatividade" class="warning-banner" role="status">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            <span>Sua sessão foi encerrada por inatividade. Por favor, faça login novamente.</span>
          </div>

          <div v-if="errorMessage" class="error-banner" role="alert">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{{ errorMessage }}</span>
          </div>

          <button type="submit" class="btn-submit" :disabled="loading">
            <span v-if="loading">Entrando...</span>
            <span v-else class="btn-content">
              Entrar
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/>
                <polyline points="12 5 19 12 12 19"/>
              </svg>
            </span>
          </button>
          
          <a href="#" class="forgot-password" @click.prevent="esqueciSenha">Esqueci minha senha</a>
        </form>
      </div>

      <div class="demo-info">
        <span>Acesso Demo: <strong>gestor</strong> (senha <code>123</code> ou <code>123456</code>) ou <strong>cuidador</strong> (senha <code>123456</code>)</span>
      </div>

      <!-- Rodapé -->
      <footer class="footer">
        <span>© 2026 VitalTech. <a href="#" @click.prevent>Termos</a> e <a href="#" @click.prevent>Privacidade</a>.</span>
      </footer>
    </div>
  </div>
</template>

<style scoped>
.login-wrapper {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #f8fafc;
}

.left-panel {
  flex: 4.5;
  background: linear-gradient(135deg, #f5f8ff 0%, #fae8ff 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  border-right: 1px solid #e2e8f0;
}

/* Background Blobs */
.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
  z-index: 1;
}

.blob-1 {
  top: 15%;
  right: -5%;
  width: 320px;
  height: 320px;
  background: #fbcfe8; /* rosa suave */
}

.blob-2 {
  top: 45%;
  left: -10%;
  width: 380px;
  height: 380px;
  background: #dbeafe; /* azul suave */
}

.blob-3 {
  bottom: -5%;
  right: 15%;
  width: 300px;
  height: 300px;
  background: #ede9fe; /* roxo suave */
}

.brand-container {
  position: relative;
  z-index: 2;
  text-align: center;
  padding: 20px;
}

.logo-card {
  width: 72px;
  height: 72px;
  background: #ffffff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
}

.brand-title {
  font-size: 28px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 6px 0;
  letter-spacing: -0.5px;
}

.brand-subtitle {
  font-size: 14px;
  color: #475569;
  margin: 0;
  font-weight: 500;
}

.right-panel {
  flex: 5.5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* padding-bottom maior para garantir que o rodape nao sobreponha o conteudo em telas pequenas */
  padding: 40px 40px 80px;
  background-color: #f8fafc;
  overflow-y: auto;
}

.login-card {
  width: 100%;
  max-width: 420px;
  background: #ffffff;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04), 0 1px 3px rgba(0, 0, 0, 0.02);
  border: 1px solid #f1f5f9;
}

.card-title {
  font-size: 24px;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.card-subtitle {
  font-size: 14px;
  color: #64748b;
  margin: 0 0 28px 0;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-label {
  font-size: 13px;
  font-weight: 600;
  color: #1e293b;
}

.form-input {
  height: 44px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 0 14px;
  font-size: 14px;
  color: #0f172a;
  background: #ffffff;
  outline: none;
  transition: all 0.2s;
}

.form-input::placeholder {
  color: #94a3b8;
}

.form-input:focus {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.password-wrapper {
  position: relative;
  display: flex;
  width: 100%;
}

.password-input {
  width: 100%;
  padding-right: 44px;
}

.visibility-toggle {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.visibility-toggle:hover {
  color: #64748b;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fef2f2;
  border: 1px solid #fee2e2;
  border-radius: 8px;
  padding: 12px;
  color: #ef4444;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
}

/* Banner de aviso para sessao encerrada por inatividade (RNF11) */
.warning-banner {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background: #fffbeb;
  border: 1px solid #fde68a;
  border-radius: 8px;
  padding: 12px;
  color: #92400e;
  font-size: 13px;
  font-weight: 500;
  line-height: 1.4;
}

.btn-submit {
  height: 46px;
  border: none;
  border-radius: 8px;
  background: #2563eb;
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.2);
}

.btn-content {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-submit:hover:not(:disabled) {
  background: #1d4ed8;
  box-shadow: 0 4px 16px rgba(29, 78, 216, 0.3);
}

.btn-submit:active:not(:disabled) {
  transform: scale(0.98);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  box-shadow: none;
}

.forgot-password {
  font-size: 13px;
  font-weight: 500;
  color: #2563eb;
  text-decoration: none;
  text-align: center;
  margin-top: 4px;
}

.forgot-password:hover {
  text-decoration: underline;
}

.demo-info {
  margin-top: 24px;
  font-size: 12px;
  color: #64748b;
  text-align: center;
}

.demo-info strong {
  color: #334155;
}

/* Rodape fica no fluxo normal — nao sobrepoe o conteudo em telas menores */
.footer {
  margin-top: 24px;
  font-size: 12px;
  color: #94a3b8;
  text-align: center;
  width: 100%;
  max-width: 420px;
}

.footer a {
  color: #64748b;
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
}

@media (max-width: 900px) {
  .left-panel {
    display: none;
  }
  .right-panel {
    flex: 1;
    padding: 20px;
  }
}
</style>
