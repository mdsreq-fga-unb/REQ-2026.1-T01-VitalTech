<template>
  <div class="page-wrapper">
    <!-- Header -->
    <header class="header">
      <div class="header-left">
        <div class="header-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
        </div>
        <h1 class="header-title">Novo Cadastro</h1>
      </div>
      <div class="header-right">
        <span class="user-name">Gestor XY</span>
        <div class="avatar">GX</div>
      </div>
    </header>

    <div class="content">
      <!-- Tabs -->
      <div class="tabs">
        <button class="tab" :class="{ active: activeTab === 'usuario' }" @click="trocarAba('usuario')">
          Novo Usuário
        </button>
        <button class="tab" :class="{ active: activeTab === 'residente' }" @click="trocarAba('residente')">
          Novo Residente
        </button>
      </div>

      <!-- Banner de erro geral -->
      <div v-if="tentouEnviar && temErros" class="error-banner">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Preencha todos os campos obrigatórios antes de continuar.
      </div>

      <!-- Formulário Novo Usuário -->
      <div v-if="activeTab === 'usuario'">
        <div class="card">
          <h2 class="section-title">DADOS DE ACESSO</h2>
          <div class="info-box">
            Somente gestores podem criar novos usuários. O novo membro poderá se autenticar imediatamente após o cadastro.
          </div>

          <!-- Upload de foto -->
          <div class="form-group foto-group">
            <label class="form-label">FOTO DO USUÁRIO</label>
            <div class="foto-upload" @click="$refs.fotoUsuario.click()">
              <img v-if="usuario.fotoPreview" :src="usuario.fotoPreview" class="foto-preview" />
              <div v-else class="foto-placeholder">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Clique para adicionar foto</span>
              </div>
            </div>
            <input ref="fotoUsuario" type="file" accept="image/*" class="input-hidden" @change="e => carregarFoto(e, 'usuario')" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">NOME COMPLETO *</label>
              <input
                v-model="usuario.nomeCompleto"
                type="text"
                class="form-input"
                :class="{ 'input-error': tentouEnviar && !usuario.nomeCompleto }"
                @input="limparErro('usuario', 'nomeCompleto')"
              />
              <span v-if="tentouEnviar && !usuario.nomeCompleto" class="error-msg">Campo obrigatório</span>
            </div>
            <div class="form-group">
              <label class="form-label">LOGIN *</label>
              <input
                v-model="usuario.login"
                type="text"
                class="form-input"
                :class="{ 'input-error': tentouEnviar && !usuario.login }"
                @input="limparErro('usuario', 'login')"
              />
              <span v-if="tentouEnviar && !usuario.login" class="error-msg">Campo obrigatório</span>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">PERFIL / FUNÇÃO *</label>
            <div class="toggle-group">
              <button
                v-for="perfil in perfis"
                :key="perfil"
                class="toggle-btn"
                :class="{ active: usuario.perfil === perfil }"
                @click="usuario.perfil = perfil"
              >
                {{ perfil }}
              </button>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">SENHA PROVISÓRIA *</label>
              <div class="input-icon-wrapper">
                <input
                  v-model="usuario.senha"
                  :type="showSenha ? 'text' : 'password'"
                  class="form-input"
                  :class="{ 'input-error': tentouEnviar && !usuario.senha }"
                  placeholder="Digite uma senha"
                />
                <button class="icon-btn" @click="showSenha = !showSenha" type="button">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <span v-if="tentouEnviar && !usuario.senha" class="error-msg">Campo obrigatório</span>
            </div>
            <div class="form-group">
              <label class="form-label">CONFIRMAR SENHA *</label>
              <div class="input-icon-wrapper">
                <input
                  v-model="usuario.confirmarSenha"
                  :type="showConfirmar ? 'text' : 'password'"
                  class="form-input"
                  :class="{ 'input-error': tentouEnviar && erroConfirmarSenha }"
                />
                <button class="icon-btn" @click="showConfirmar = !showConfirmar" type="button">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <span v-if="tentouEnviar && !usuario.confirmarSenha" class="error-msg">Campo obrigatório</span>
              <span v-else-if="tentouEnviar && usuario.senha !== usuario.confirmarSenha" class="error-msg">As senhas não coincidem</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h2 class="section-title">
            DADOS COMPLEMENTARES <span class="optional">(opcional)</span>
          </h2>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">ESPECIALIDADE</label>
              <select v-model="usuario.especialidade" class="form-input form-select">
                <option value="">Selecione</option>
                <option>Enfermagem</option>
                <option>Medicina</option>
                <option>Fisioterapia</option>
                <option>Nutrição</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">REGISTRO</label>
              <input v-model="usuario.registro" type="text" class="form-input" />
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button class="btn-cancel" @click="cancelar">Cancelar</button>
          <button class="btn-primary" @click="criarUsuario">✓ Criar usuário</button>
        </div>
      </div>

      <!-- Formulário Novo Residente -->
      <div v-if="activeTab === 'residente'">
        <div class="card">
          <h2 class="section-title">IDENTIFICAÇÃO</h2>
          <div class="info-box">
            Somente gestores podem cadastrar novos residentes. Após salvar, o perfil ficará disponível para toda a equipe.
          </div>

          <!-- Upload de foto -->
          <div class="form-group foto-group">
            <label class="form-label">FOTO DO RESIDENTE</label>
            <div class="foto-upload" @click="$refs.fotoResidente.click()">
              <img v-if="residente.fotoPreview" :src="residente.fotoPreview" class="foto-preview" />
              <div v-else class="foto-placeholder">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span>Clique para adicionar foto</span>
              </div>
            </div>
            <input ref="fotoResidente" type="file" accept="image/*" class="input-hidden" @change="e => carregarFoto(e, 'residente')" />
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">NOME COMPLETO *</label>
              <input
                v-model="residente.nomeCompleto"
                type="text"
                class="form-input"
                :class="{ 'input-error': tentouEnviar && !residente.nomeCompleto }"
              />
              <span v-if="tentouEnviar && !residente.nomeCompleto" class="error-msg">Campo obrigatório</span>
            </div>
            <div class="form-group">
              <label class="form-label">DATA DE NASCIMENTO *</label>
              <input
                v-model="residente.dataNascimento"
                type="date"
                class="form-input"
                :class="{ 'input-error': tentouEnviar && !residente.dataNascimento }"
              />
              <span v-if="tentouEnviar && !residente.dataNascimento" class="error-msg">Campo obrigatório</span>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">CPF *</label>
              <input
                v-model="residente.cpf"
                type="text"
                class="form-input"
                :class="{ 'input-error': tentouEnviar && erroCpf }"
                placeholder="000.000.000-00"
                @input="formatarCpf"
                maxlength="14"
              />
              <span v-if="tentouEnviar && !residente.cpf" class="error-msg">Campo obrigatório</span>
              <span v-else-if="tentouEnviar && residente.cpf && !cpfValido" class="error-msg">CPF inválido</span>
            </div>
            <div class="form-group">
              <label class="form-label">QUARTO</label>
              <select v-model="residente.quarto" class="form-input form-select">
                <option value="">Selecione</option>
                <option v-for="q in quartos" :key="q">{{ q }}</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">GRAU DE DEPENDÊNCIA *</label>
            <div class="dependency-grid">
              <button
                v-for="grau in grausDependencia"
                :key="grau"
                class="toggle-btn dependency-btn"
                :class="{ active: residente.grauDependencia === grau }"
                @click="residente.grauDependencia = grau"
              >
                {{ grau }}
              </button>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">RESPONSÁVEL LEGAL *</label>
            <input
              v-model="residente.responsavelLegal"
              type="text"
              class="form-input"
              :class="{ 'input-error': tentouEnviar && !residente.responsavelLegal }"
            />
            <span v-if="tentouEnviar && !residente.responsavelLegal" class="error-msg">Campo obrigatório</span>
          </div>
        </div>

        <div class="form-actions">
          <button class="btn-cancel" @click="cancelar">Cancelar</button>
          <button class="btn-primary" @click="criarResidente">✓ Criar residente</button>
        </div>
      </div>
    </div>

    <!-- Toast de sucesso -->
    <div v-if="mensagemSucesso" class="toast">✓ {{ mensagemSucesso }}</div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { usuarioService } from '../services/usuarioService'
import { residenteService } from '../services/residenteService'

const router = useRouter()
const activeTab = ref('usuario')
const showSenha = ref(false)
const showConfirmar = ref(false)
const tentouEnviar = ref(false)
const mensagemSucesso = ref('')
const salvando = ref(false)

const perfis = ['Gestor', 'Equipe', 'Cuidador']
const grausDependencia = ['Independente', 'Auxílio Parcial', 'Dependente total', 'Acamado']
const quartos = ['101', '102', '103', '104', '201', '202', '203', '204']

const usuario = reactive({
  nomeCompleto: '',
  login: '',
  perfil: 'Gestor',
  senha: '',
  confirmarSenha: '',
  especialidade: '',
  registro: '',
  foto: null,
  fotoPreview: null
})

const residente = reactive({
  nomeCompleto: '',
  dataNascimento: '',
  cpf: '',
  quarto: '',
  grauDependencia: 'Independente',
  responsavelLegal: '',
  foto: null,
  fotoPreview: null
})

function carregarFoto(event, tipo) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    if (tipo === 'usuario') {
      usuario.foto = file
      usuario.fotoPreview = e.target.result
    } else {
      residente.foto = file
      residente.fotoPreview = e.target.result
    }
  }
  reader.readAsDataURL(file)
}

// Validações computadas
const erroConfirmarSenha = computed(() =>
  !usuario.confirmarSenha || usuario.senha !== usuario.confirmarSenha
)

const cpfValido = computed(() => {
  const cpf = residente.cpf.replace(/\D/g, '')
  return cpf.length === 11
})

const erroCpf = computed(() =>
  !residente.cpf || !cpfValido.value
)

const temErrosUsuario = computed(() =>
  !usuario.nomeCompleto ||
  !usuario.login ||
  !usuario.senha ||
  erroConfirmarSenha.value
)

const temErrosResidente = computed(() =>
  !residente.nomeCompleto ||
  !residente.dataNascimento ||
  erroCpf.value ||
  !residente.responsavelLegal
)

const temErros = computed(() =>
  activeTab.value === 'usuario' ? temErrosUsuario.value : temErrosResidente.value
)

function trocarAba(aba) {
  activeTab.value = aba
  tentouEnviar.value = false
}

function limparErro(form, campo) {
  // Ao digitar, o erro some automaticamente pelo computed
}

function formatarCpf() {
  let v = residente.cpf.replace(/\D/g, '')
  if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3')
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2')
  residente.cpf = v
}

async function criarUsuario() {
  tentouEnviar.value = true
  if (temErrosUsuario.value) return
  salvando.value = true
  await usuarioService.criar({ ...usuario })
  salvando.value = false
  mostrarSucesso('Usuário criado com sucesso!')
  setTimeout(() => router.push('/usuarios'), 1800)
}

async function criarResidente() {
  tentouEnviar.value = true
  if (temErrosResidente.value) return
  salvando.value = true
  await residenteService.criar({ ...residente })
  salvando.value = false
  mostrarSucesso('Residente criado com sucesso!')
  setTimeout(() => router.push('/residentes'), 1800)
}

function mostrarSucesso(msg) {
  mensagemSucesso.value = msg
  setTimeout(() => mensagemSucesso.value = '', 3000)
}

function cancelar() {
  tentouEnviar.value = false
  router.back()
}
</script>

<style scoped>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.page-wrapper {
  min-height: 100vh;
  background-color: #f0f2f7;
  font-family: 'Segoe UI', sans-serif;
  color: #1a1a2e;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 32px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header-icon {
  width: 36px;
  height: 36px;
  background: #eef2ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a2e;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #3B6FE8;
  color: #fff;
  font-size: 13px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.content {
  max-width: 860px;
  margin: 0 auto;
  padding: 28px 24px;
}

.tabs {
  display: flex;
  background: #fff;
  border-radius: 8px;
  padding: 4px;
  width: fit-content;
  margin-bottom: 24px;
  border: 1px solid #e2e8f0;
}

.tab {
  padding: 8px 28px;
  border: none;
  background: transparent;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #718096;
  cursor: pointer;
  transition: all 0.2s;
}

.tab.active {
  background: #eef2ff;
  color: #3B6FE8;
  font-weight: 600;
}

/* Banner de erro geral */
.error-banner {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff5f5;
  border: 1px solid #feb2b2;
  border-radius: 8px;
  padding: 12px 16px;
  color: #c53030;
  font-size: 14px;
  margin-bottom: 16px;
}

.card {
  background: #fff;
  border-radius: 10px;
  padding: 24px 28px;
  margin-bottom: 16px;
  border: 1px solid #e8ecf2;
}

.section-title {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #3B6FE8;
  margin-bottom: 16px;
}

.optional {
  color: #a0aec0;
  font-weight: 400;
  font-size: 11px;
}

.info-box {
  background: #eef2ff;
  border: 1px solid #c7d7fa;
  border-radius: 8px;
  padding: 12px 16px;
  font-size: 13px;
  color: #3B6FE8;
  text-align: center;
  margin-bottom: 20px;
  line-height: 1.5;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 18px;
}

.form-row .form-group {
  margin-bottom: 0;
}

.form-label {
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  color: #718096;
}

.form-input {
  height: 40px;
  border: 1px solid #d1d9e6;
  border-radius: 6px;
  padding: 0 12px;
  font-size: 14px;
  color: #1a1a2e;
  background: #fff;
  outline: none;
  transition: border-color 0.2s;
  width: 100%;
}

.form-input:focus {
  border-color: #3B6FE8;
}

.form-input.input-error {
  border-color: #e53e3e;
  background: #fff5f5;
}

.error-msg {
  font-size: 11px;
  color: #e53e3e;
  margin-top: 2px;
}

.form-select {
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23718096' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  padding-right: 32px;
  cursor: pointer;
}

.input-icon-wrapper {
  position: relative;
}

.input-icon-wrapper .form-input {
  padding-right: 40px;
}

.icon-btn {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #a0aec0;
  display: flex;
  align-items: center;
}

.toggle-group {
  display: flex;
  border: 1px solid #d1d9e6;
  border-radius: 6px;
  overflow: hidden;
}

.toggle-btn {
  flex: 1;
  padding: 10px;
  border: none;
  background: #fff;
  font-size: 14px;
  color: #4a5568;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn:not(:last-child) {
  border-right: 1px solid #d1d9e6;
}

.toggle-btn.active {
  background: #eef2ff;
  color: #3B6FE8;
  font-weight: 600;
}

.dependency-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border: 1px solid #d1d9e6;
  border-radius: 6px;
  overflow: hidden;
}

.dependency-btn {
  flex: none;
  padding: 14px;
  border-radius: 0;
  font-size: 14px;
}

.dependency-btn:nth-child(odd) {
  border-right: 1px solid #d1d9e6;
}

.dependency-btn:nth-child(1),
.dependency-btn:nth-child(2) {
  border-bottom: 1px solid #d1d9e6;
}

.form-actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 24px;
}

.btn-cancel {
  padding: 12px 40px;
  border: none;
  border-radius: 8px;
  background: #718096;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #4a5568;
}

.btn-primary {
  padding: 12px 40px;
  border: none;
  border-radius: 8px;
  background: #3B6FE8;
  color: #fff;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.foto-group { margin-bottom: 20px; }

.foto-upload {
  width: 110px; height: 110px; border-radius: 50%;
  border: 2px dashed #d1d9e6;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; overflow: hidden;
  transition: border-color 0.2s;
}
.foto-upload:hover { border-color: #3B6FE8; }

.foto-placeholder {
  display: flex; flex-direction: column; align-items: center;
  gap: 6px; color: #a0aec0; font-size: 11px; text-align: center;
  padding: 8px;
}

.foto-preview {
  width: 100%; height: 100%; object-fit: cover;
}

.input-hidden { display: none; }

.btn-primary:hover {
  background: #2c5ce0;
}

.toast {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  background: #276749;
  color: #fff;
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  z-index: 200;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

@media (max-width: 600px) {
  .header { padding: 12px 16px; }
  .content { padding: 16px; }
  .form-row { grid-template-columns: 1fr; }
  .form-actions { flex-direction: column; }
  .btn-cancel, .btn-primary { width: 100%; }
}
</style>