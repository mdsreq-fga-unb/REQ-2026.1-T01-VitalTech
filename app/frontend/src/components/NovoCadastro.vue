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
        <button
          class="tab"
          :class="{ active: activeTab === 'usuario' }"
          @click="activeTab = 'usuario'"
        >
          Novo Usuário
        </button>
        <button
          class="tab"
          :class="{ active: activeTab === 'residente' }"
          @click="activeTab = 'residente'"
        >
          Novo Residente
        </button>
      </div>

      <!-- Formulário Novo Usuário -->
      <div v-if="activeTab === 'usuario'">
        <div class="card">
          <h2 class="section-title">DADOS DE ACESSO</h2>

          <div class="info-box">
            Somente gestores podem criar novos usuários. O novo membro poderá se autenticar imediatamente após o cadastro.
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">NOME COMPLETO *</label>
              <input v-model="usuario.nomeCompleto" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">LOGIN *</label>
              <input v-model="usuario.login" type="text" class="form-input" />
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
                  placeholder="Digite uma senha"
                />
                <button class="icon-btn" @click="showSenha = !showSenha">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
              <span class="hint">Digite uma senha</span>
            </div>
            <div class="form-group">
              <label class="form-label">CONFIRMAR SENHA *</label>
              <div class="input-icon-wrapper">
                <input
                  v-model="usuario.confirmarSenha"
                  :type="showConfirmar ? 'text' : 'password'"
                  class="form-input"
                />
                <button class="icon-btn" @click="showConfirmar = !showConfirmar">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
              </div>
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

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">NOME COMPLETO *</label>
              <input v-model="residente.nomeCompleto" type="text" class="form-input" />
            </div>
            <div class="form-group">
              <label class="form-label">DATA DE NASCIMENTO *</label>
              <div class="input-icon-wrapper">
                <input v-model="residente.dataNascimento" type="date" class="form-input" />
              </div>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">CPF *</label>
              <input v-model="residente.cpf" type="text" class="form-input" placeholder="000.000.000-00" />
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
            <input v-model="residente.responsavelLegal" type="text" class="form-input half-width" />
          </div>
        </div>

        <div class="form-actions">
          <button class="btn-cancel" @click="cancelar">Cancelar</button>
          <button class="btn-primary" @click="criarResidente">✓ Criar residente</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

const activeTab = ref('usuario')
const showSenha = ref(false)
const showConfirmar = ref(false)

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
  registro: ''
})

const residente = reactive({
  nomeCompleto: '',
  dataNascimento: '',
  cpf: '',
  quarto: '',
  grauDependencia: 'Independente',
  responsavelLegal: ''
})

function criarUsuario() {
  console.log('Criar usuário:', usuario)
}

function criarResidente() {
  console.log('Criar residente:', residente)
}

function cancelar() {
  console.log('Cancelado')
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

/* Header */
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

/* Content */
.content {
  max-width: 860px;
  margin: 0 auto;
  padding: 28px 24px;
}

/* Tabs */
.tabs {
  display: flex;
  gap: 0;
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

/* Card */
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

/* Info box */
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

/* Form */
.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 18px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
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

.hint {
  font-size: 11px;
  color: #a0aec0;
}

/* Toggle group */
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

/* Dependency grid */
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

.half-width {
  max-width: 48%;
}

/* Actions */
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

.btn-primary:hover {
  background: #2c5ce0;
}
</style>