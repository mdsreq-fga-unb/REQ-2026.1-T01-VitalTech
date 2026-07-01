<template>
  <div class="page-wrapper">
    <aside class="sidebar">
      <router-link to="/residentes" class="sidebar-icon brand-logo" title="Painel de Residentes">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          <path d="M5 9.5H8L9.5 6L11.5 13L13.5 8L15 10.5H19" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </router-link>
      <a href="#" class="sidebar-icon disabled-link" title="Dashboard">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
      </a>
      <router-link to="/usuarios" class="sidebar-icon active" v-if="sessionState.session?.user?.perfil === 'gestor'" title="Administração de Usuários">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      </router-link>
      <a href="#" class="sidebar-icon disabled-link" title="Agenda">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
      </a>
      <a href="#" class="sidebar-icon disabled-link" title="Prontuários">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      </a>
      <div class="sidebar-spacer"></div>
      <button @click="efetuarLogout" class="sidebar-icon logout-btn" title="Encerrar Sessão">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
      </button>
    </aside>

    <div class="main">
      <!-- Header -->
      <header class="header">
        <div class="header-left">
          <button class="icon-btn" @click="router.back()" style="margin-right: 12px; background: #f8fafc; border-radius: 50%; padding: 8px;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" stroke-width="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <div class="header-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" stroke-width="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          </div>
          <h1 class="header-title">Editar Residente</h1>
        </div>
        <div class="header-right">
          <span class="user-name">{{ sessionState.session?.user?.nomeCompleto }}</span>
          <div class="avatar" style="background: #3B6FE8; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600;">
            {{ iniciais(sessionState.session?.user?.nomeCompleto) }}
          </div>
        </div>
      </header>

    <div class="content">
      <!-- Banner de erro geral -->
      <div v-if="tentouEnviar && temErros" class="error-banner">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        Preencha todos os campos obrigatórios antes de continuar.
      </div>

      <!-- Banner de erro de servico/validacao especifica -->
      <div v-if="errorMessage" class="error-banner">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
        {{ errorMessage }}
      </div>

      <div>
        <div class="card">
          <div class="card-header-row">
            <h2 class="section-title">IDENTIFICAÇÃO</h2>
            <div class="subtle-avatar-upload" @click="$refs.fotoResidente.click()" title="Adicionar Foto de Residente">
              <img v-if="residente.fotoPreview" :src="residente.fotoPreview" class="subtle-avatar-preview" />
              <div v-else class="subtle-avatar-placeholder">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                  <circle cx="12" cy="13" r="4"/>
                </svg>
                <span>+ Foto</span>
              </div>
            </div>
            <input ref="fotoResidente" type="file" accept="image/*" class="input-hidden" @change="e => carregarFoto(e, 'residente')" />
          </div>
          <div class="info-box">
            Somente gestores podem cadastrar novos residentes. Após salvar, o perfil ficará disponível para toda a equipe.
          </div>

          <div class="form-row">
            <div class="form-group">
              <label for="r-nome" class="form-label">NOME COMPLETO *</label>
              <input
                id="r-nome"
                name="nomeCompleto"
                v-model="residente.nomeCompleto"
                type="text"
                class="form-input"
                :class="{ 'input-error': tentouEnviar && !residente.nomeCompleto }"
                autocomplete="name"
              />
              <span v-if="tentouEnviar && !residente.nomeCompleto" class="error-msg">Campo obrigatório</span>
            </div>
            <div class="form-group">
              <label for="r-data-nascimento" class="form-label">DATA DE NASCIMENTO *</label>
              <input
                id="r-data-nascimento"
                name="dataNascimento"
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
              <label for="r-cpf" class="form-label">CPF *</label>
              <input
                id="r-cpf"
                name="cpf"
                v-model="residente.cpf"
                type="text"
                class="form-input"
                :class="{ 'input-error': tentouEnviar && erroCpf }"
                placeholder="000.000.000-00"
                @input="formatarCpf"
                maxlength="14"
                autocomplete="off"
              />
              <span v-if="tentouEnviar && !residente.cpf" class="error-msg">Campo obrigatório</span>
              <span v-else-if="tentouEnviar && residente.cpf && !cpfValido" class="error-msg">CPF inválido</span>
            </div>
            <div class="form-group">
              <label for="r-quarto" class="form-label">QUARTO</label>
              <select id="r-quarto" name="quarto" v-model="residente.quarto" class="form-input form-select">
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
            <label for="r-responsavel" class="form-label">RESPONSÁVEL LEGAL *</label>
            <input
              id="r-responsavel"
              name="responsavelLegal"
              v-model="residente.responsavelLegal"
              type="text"
              class="form-input"
              :class="{ 'input-error': tentouEnviar && !residente.responsavelLegal }"
              autocomplete="name"
            />
            <span v-if="tentouEnviar && !residente.responsavelLegal" class="error-msg">Campo obrigatório</span>
          </div>
        </div>

        <div class="card mt-6">
          <div class="card-header-row">
            <h2 class="section-title">MEDICAMENTOS PREVISTOS</h2>
          </div>
          <div class="info-box">
            Adicione as medicações contínuas que o residente deve tomar. O registro assistencial diário dessas medicações será gerado a partir dessa lista.
          </div>

          <div v-for="(med, index) in residente.medicamentos" :key="index" class="form-row" style="background: var(--bg-body); padding: 16px; border-radius: 8px; margin-bottom: 16px; border: 1px solid var(--border-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; width: 100%;">
              <h4 style="margin: 0; font-size: 14px; color: var(--text-dark); font-weight: 600;">Medicamento {{ index + 1 }}</h4>
              <button class="btn-cancel" style="padding: 4px 8px; font-size: 12px; height: auto;" @click="removerMedicamento(index)">
                Remover Medicamento
              </button>
            </div>
            
            <div class="form-row" style="width: 100%;">
              <div class="form-group" style="flex: 2;">
                <label class="form-label">NOME / DOSAGEM *</label>
                <input
                  v-model="med.nome"
                  type="text"
                  class="form-input"
                  placeholder="Ex: Losartana 50mg"
                />
              </div>
              <div class="form-group" style="flex: 1;">
                <label class="form-label">VIA *</label>
                <select v-model="med.via" class="form-input form-select">
                  <option value="">Selecione</option>
                  <option value="Oral">Oral</option>
                  <option value="Sublingual">Sublingual</option>
                  <option value="Endovenosa">Endovenosa</option>
                  <option value="Subcutânea">Subcutânea</option>
                  <option value="Intramuscular">Intramuscular</option>
                  <option value="Tópica">Tópica</option>
                  <option value="Inalatória">Inalatória</option>
                  <option value="Ocular">Ocular</option>
                  <option value="Otológica">Otológica</option>
                </select>
              </div>
            </div>

            <div class="form-group" style="width: 100%;">
              <label class="form-label">HORÁRIOS *</label>
              <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 8px;">
                <div v-for="(h, hIndex) in med.horarios" :key="hIndex" style="display: flex; align-items: center; background: white; border: 1px solid var(--border-color); border-radius: 4px; padding: 4px 8px;">
                  <input type="time" v-model="med.horarios[hIndex]" style="border: none; outline: none; font-family: inherit; font-size: 14px; background: transparent; padding: 0;" />
                  <button @click="removerHorario(index, hIndex)" style="background: none; border: none; color: var(--danger-color); cursor: pointer; margin-left: 8px; padding: 0; display: flex; align-items: center;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  </button>
                </div>
                <button class="btn-proc-outline" style="padding: 4px 12px; font-size: 13px; height: 32px;" @click="adicionarHorario(index)">
                  + Horário
                </button>
              </div>
            </div>
          </div>

          <button class="btn-proc-blue" style="width: 100%; margin-top: 8px; margin-bottom: 16px;" @click="adicionarMedicamento">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 6px; vertical-align: middle;"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            Adicionar Medicamento
          </button>
        </div>

        <div class="form-actions" style="margin-top: 24px;">
          <button class="btn-cancel" @click="cancelar">Cancelar</button>
          <button class="btn-primary" :disabled="salvando" @click="salvarEdicao">{{ salvando ? 'Salvando...' : 'Salvar alterações' }}</button>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { residenteService } from '../services'
import { sessionState, logout } from '../stores/session.js'
import { useToastStore } from '../stores/toast.js'

const router = useRouter()
const route = useRoute()
const toast = useToastStore()
const tentouEnviar = ref(false)
const errorMessage = ref('')
const salvando = ref(false)

async function efetuarLogout() {
  await logout()
  router.push('/login')
}

function iniciais(nome) {
  if (!nome) return ''
  return nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

const grausDependencia = ['Independente', 'Auxílio Parcial', 'Dependente total', 'Acamado']
const quartos = ['101', '102', '103', '104', '201', '202', '203', '204']

const residente = reactive({
  nomeCompleto: '',
  dataNascimento: '',
  cpf: '',
  quarto: '',
  grauDependencia: 'Independente',
  responsavelLegal: '',
  medicamentos: [],
  foto: null,
  fotoPreview: null
})

onMounted(async () => {
  try {
    const res = await residenteService.buscarPorId(route.params.id)
    if (res) {
      Object.assign(residente, res)
      if (!residente.medicamentos) residente.medicamentos = []
      residente.fotoPreview = res.foto
    } else {
      errorMessage.value = 'Residente não encontrado.'
    }
  } catch (error) {
    errorMessage.value = 'Erro ao carregar residente.'
  }
})

function adicionarMedicamento() {
  residente.medicamentos.push({ nome: '', via: '', horarios: ['08:00'] })
}

function removerMedicamento(index) {
  residente.medicamentos.splice(index, 1)
}

function adicionarHorario(medIndex) {
  residente.medicamentos[medIndex].horarios.push('12:00')
}

function removerHorario(medIndex, hIndex) {
  residente.medicamentos[medIndex].horarios.splice(hIndex, 1)
}

function carregarFoto(event) {
  const file = event.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    residente.foto = file
    residente.fotoPreview = e.target.result
  }
  reader.readAsDataURL(file)
}

const cpfValido = computed(() => {
  const cpf = residente.cpf ? residente.cpf.replace(/\D/g, '') : ''
  return cpf.length === 11
})

const erroCpf = computed(() =>
  !residente.cpf || !cpfValido.value
)

const temErrosResidente = computed(() =>
  !residente.nomeCompleto ||
  !residente.dataNascimento ||
  erroCpf.value ||
  !residente.responsavelLegal
)

const temErros = computed(() => temErrosResidente.value)

function limparErro(form, campo) {
  // Ao digitar, o erro some automaticamente pelo computed
}

function formatarCpf() {
  if(!residente.cpf) return;
  let v = residente.cpf.replace(/\D/g, '')
  if (v.length > 9) v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4')
  else if (v.length > 6) v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3')
  else if (v.length > 3) v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2')
  residente.cpf = v
}

async function salvarEdicao() {
  tentouEnviar.value = true
  errorMessage.value = ''
  if (temErrosResidente.value) return
  salvando.value = true
  try {
    await residenteService.atualizarResidente(route.params.id, {
      nomeCompleto: residente.nomeCompleto,
      dataNascimento: residente.dataNascimento,
      cpf: residente.cpf,
      quarto: residente.quarto,
      grauDependencia: residente.grauDependencia,
      responsavelLegal: residente.responsavelLegal,
      medicamentos: JSON.parse(JSON.stringify(residente.medicamentos)),
      foto: residente.fotoPreview
    })
    mostrarSucesso('Residente atualizado com sucesso!')
    setTimeout(() => router.push('/residentes'), 1800)
  } catch (error) {
    errorMessage.value = error.message || 'Erro ao atualizar residente.'
  } finally {
    salvando.value = false
  }
}

function mostrarSucesso(msg) {
  toast.show(msg, 'success')
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
  display: flex;
  min-height: 100vh;
  background-color: #f0f2f7;
  font-family: 'Segoe UI', sans-serif;
  color: #1a1a2e;
}

.sidebar {
  width: 60px;
  background: #1a1f2e;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;
  gap: 8px;
  position: fixed;
  top: 0; left: 0; bottom: 0;
  z-index: 10;
}

.sidebar-icon {
  width: 40px; height: 40px;
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: #718096;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
}
.sidebar-icon:hover { background: #2d3748; color: #fff; }
.sidebar-icon.active { background: #eef2ff; color: #3B6FE8; }
.sidebar-icon.brand-logo { background: #3B6FE8; color: #fff; }
.sidebar-icon.brand-logo.active { background: #eef2ff; color: #3B6FE8; }
.sidebar-icon.disabled-link { cursor: default; }
.sidebar-icon.disabled-link:hover { background: transparent; color: #718096; }

.sidebar-spacer {
  flex-grow: 1;
}

.logout-btn {
  background: transparent;
  border: none;
  margin-top: auto;
  color: #718096 !important;
}

.logout-btn:hover {
  background: #2d3748 !important;
  color: #ef4444 !important;
}

.main {
  margin-left: 60px;
  flex: 1;
  display: flex;
  flex-direction: column;
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

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #f1f5f9;
  padding-bottom: 12px;
}

.subtle-avatar-upload {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: 1px dashed #cbd5e1;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s;
  position: relative;
}

.subtle-avatar-upload:hover {
  border-color: #2563eb;
  background: #eff6ff;
}

.subtle-avatar-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.subtle-avatar-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #94a3b8;
  font-size: 8px;
  font-weight: 700;
  gap: 2px;
}

.subtle-avatar-placeholder svg {
  color: #94a3b8;
}

.subtle-avatar-upload:hover .subtle-avatar-placeholder svg,
.subtle-avatar-upload:hover .subtle-avatar-placeholder {
  color: #2563eb;
}

.input-hidden { display: none; }

.btn-primary:hover {
  background: #2c5ce0;
}

@media (max-width: 640px) {
  .sidebar {
    width: 100%;
    height: 56px;
    flex-direction: row;
    justify-content: space-around;
    padding: 0;
    position: fixed;
    bottom: 0;
    top: auto;
    left: 0;
    right: 0;
    z-index: 100;
    border-top: 1px solid #2d3748;
    background: #1a1f2e;
  }
  .sidebar-spacer { display: none; }
  .logout-btn { margin-top: 0; }
  .main { margin-left: 0; margin-bottom: 56px; }
  .header { padding: 12px 16px; }
  .content { padding: 16px; }
  .form-row { grid-template-columns: 1fr; }
  .form-actions { flex-direction: column; }
  .btn-cancel, .btn-primary { width: 100%; }
}
</style>
