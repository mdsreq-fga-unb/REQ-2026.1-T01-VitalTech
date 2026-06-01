<template>
  <div class="page-wrapper">
    <aside class="sidebar">
      <router-link to="/residentes" class="sidebar-icon brand-logo active" title="Painel de Residentes">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
          <path d="M5 9.5H8L9.5 6L11.5 13L13.5 8L15 10.5H19" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </router-link>
      <a href="#" class="sidebar-icon disabled-link" title="Dashboard">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
      </a>
      <router-link to="/usuarios" class="sidebar-icon" v-if="sessionState.session?.user?.perfil === 'gestor'" title="Administração de Usuários">
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
      <header class="header">
        <h1 class="header-title">Painel de Residentes</h1>
        <div class="header-right">
          <div class="sync-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#276749" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Sistema Sincronizado
          </div>
          <span class="user-name" style="font-weight: 500; font-size: 14px; color: #4a5568;">
            {{ sessionState.session?.user?.nomeCompleto }}
          </span>
          <div class="avatar" style="background: #3B6FE8; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600;">
            {{ iniciais(sessionState.session?.user?.nomeCompleto) }}
          </div>
        </div>
      </header>

      <div class="layout">
        <!-- Lista lateral -->
        <div class="lista-lateral">
          <div class="search-wrapper">
            <svg class="search-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input v-model="busca" type="text" placeholder="Buscar residente..." class="search-input" />
          </div>

          <div
            v-for="residente in residentesFiltrados"
            :key="residente.id"
            class="residente-card"
            :class="{ selecionado: residenteSelecionado?.id === residente.id }"
            @click="residenteSelecionado = residente"
          >
            <div class="residente-avatar" :style="residente.foto ? `background-image: url(${residente.foto}); background-size: cover;` : ''">
              <span v-if="!residente.foto">{{ iniciais(residente.nomeCompleto) }}</span>
            </div>
            <div>
              <div class="residente-nome">{{ residente.nomeCompleto }}</div>
              <div class="residente-info">{{ residente.idade }} anos • Quarto {{ residente.quarto }}</div>
            </div>
          </div>

          <div v-if="residentesFiltrados.length === 0" class="estado-vazio">Nenhum residente encontrado.</div>

          <!-- Botão flutuante -->
          <router-link to="/cadastro" class="btn-fab" v-if="sessionState.session?.user?.perfil === 'gestor'">+</router-link>
        </div>

        <!-- Painel de detalhes -->
        <div class="painel">
          <div v-if="!residenteSelecionado" class="painel-vazio">
            Selecione um residente para ver os detalhes.
          </div>

          <div v-else>
            <div class="painel-header">
              <div>
                <p class="painel-label">PERFIL DO RESIDENTE</p>
                <h2 class="painel-nome">{{ residenteSelecionado.nomeCompleto }}</h2>
              </div>
              <div class="painel-acoes" v-if="sessionState.session?.user?.perfil === 'gestor'">
                <button class="btn-acao btn-editar" title="Editar">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="btn-acao btn-excluir" title="Excluir" @click="confirmarExclusao(residenteSelecionado)">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/></svg>
                </button>
              </div>
            </div>

            <div class="info-grid">
              <div class="info-item"><span class="info-label">CPF</span><span class="info-valor">{{ residenteSelecionado.cpf }}</span></div>
              <div class="info-item"><span class="info-label">Data de Nascimento</span><span class="info-valor">{{ residenteSelecionado.dataNascimento }}</span></div>
              <div class="info-item"><span class="info-label">Quarto</span><span class="info-valor">{{ residenteSelecionado.quarto || '—' }}</span></div>
              <div class="info-item"><span class="info-label">Grau de Dependência</span><span class="badge" :class="badgeDep(residenteSelecionado.grauDependencia)">{{ residenteSelecionado.grauDependencia }}</span></div>
              <div class="info-item info-full"><span class="info-label">Responsável Legal</span><span class="info-valor">{{ residenteSelecionado.responsavelLegal }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div v-if="residenteParaExcluir" class="modal-overlay" @click.self="residenteParaExcluir = null">
      <div class="modal">
        <h3 class="modal-title">Excluir residente?</h3>
        <p class="modal-desc">Tem certeza que deseja excluir <strong>{{ residenteParaExcluir.nomeCompleto }}</strong>?</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="residenteParaExcluir = null">Cancelar</button>
          <button class="btn-danger" @click="excluir">Confirmar</button>
        </div>
      </div>
    </div>

    <div v-if="mensagemSucesso" class="toast">✓ {{ mensagemSucesso }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { residenteService } from '../services'
import { sessionState, logout } from '../stores/session.js'

const router = useRouter()
const residentes = ref([])
const busca = ref('')
const carregando = ref(true)
const residenteSelecionado = ref(null)
const residenteParaExcluir = ref(null)
const mensagemSucesso = ref('')

async function efetuarLogout() {
  await logout()
  router.push('/login')
}

onMounted(async () => {
  try {
    residentes.value = await residenteService.listarResidentes()
    if (residentes.value.length > 0) residenteSelecionado.value = residentes.value[0]
  } catch (error) {
    console.error('Erro ao listar residentes:', error)
  } finally {
    carregando.value = false
  }
})

const residentesFiltrados = computed(() => {
  const t = busca.value.toLowerCase()
  return residentes.value.filter(r =>
    r.nomeCompleto.toLowerCase().includes(t) ||
    r.cpf?.includes(t)
  )
})

function iniciais(nome) {
  if (!nome) return ''
  return nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

function badgeDep(grau) {
  return {
    'badge-independente': grau === 'Independente',
    'badge-parcial': grau === 'Auxílio Parcial',
    'badge-dependente': grau === 'Dependente total',
    'badge-acamado': grau === 'Acamado',
  }
}

function confirmarExclusao(r) { residenteParaExcluir.value = r }

async function excluir() {
  try {
    await residenteService.inativarResidente(residenteParaExcluir.value.id)
    residentes.value = residentes.value.filter(r => r.id !== residenteParaExcluir.value.id)
    if (residenteSelecionado.value?.id === residenteParaExcluir.value.id) {
      residenteSelecionado.value = residentes.value[0] || null
    }
    mensagemSucesso.value = 'Residente inativado com sucesso.'
  } catch (error) {
    console.error('Erro ao inativar residente:', error)
  } finally {
    residenteParaExcluir.value = null
    setTimeout(() => mensagemSucesso.value = '', 3000)
  }
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.page-wrapper { display: flex; min-height: 100vh; background: #f0f2f7; font-family: 'Segoe UI', sans-serif; }

.sidebar {
  width: 60px; background: #1a1f2e;
  display: flex; flex-direction: column; align-items: center;
  padding: 20px 0; gap: 8px;
  position: fixed; top: 0; left: 0; bottom: 0; z-index: 10;
}
.sidebar-icon {
  width: 40px; height: 40px; border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: #718096; cursor: pointer; transition: all 0.2s;
  text-decoration: none;
}
.sidebar-icon:hover { background: #2d3748; color: #fff; }
.sidebar-icon.active { background: #eef2ff; color: #3B6FE8; }
.sidebar-icon.brand-logo { background: #3B6FE8; color: #fff; }
.sidebar-icon.brand-logo.active { background: #eef2ff; color: #3B6FE8; }
.sidebar-icon.disabled-link { cursor: default; }
.sidebar-icon.disabled-link:hover { background: transparent; color: #718096; }

.main { margin-left: 60px; flex: 1; display: flex; flex-direction: column; }

.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 32px; background: #fff; border-bottom: 1px solid #e2e8f0;
}
.header-title { font-size: 18px; font-weight: 600; color: #1a1a2e; }
.header-right { display: flex; align-items: center; gap: 16px; }
.sync-badge {
  display: flex; align-items: center; gap: 6px;
  background: #f0fff4; border: 1px solid #9ae6b4;
  color: #276749; font-size: 13px; font-weight: 500;
  padding: 6px 14px; border-radius: 20px;
}

.layout { display: flex; height: calc(100vh - 57px); }

/* Lista lateral */
.lista-lateral {
  width: 280px; background: #fff;
  border-right: 1px solid #e2e8f0;
  display: flex; flex-direction: column;
  overflow-y: auto; padding: 16px; gap: 8px;
  position: relative;
  flex-shrink: 0;
}

.search-wrapper { position: relative; margin-bottom: 8px; }
.search-icon { position: absolute; left: 10px; top: 50%; transform: translateY(-50%); }
.search-input {
  width: 100%; height: 36px;
  border: 1px solid #e2e8f0; border-radius: 8px;
  padding: 0 12px 0 30px; font-size: 13px; outline: none;
}
.search-input:focus { border-color: #3B6FE8; }

.residente-card {
  display: flex; align-items: center; gap: 12px;
  padding: 12px; border-radius: 10px;
  cursor: pointer; transition: all 0.15s;
  border: 1px solid transparent;
}
.residente-card:hover { background: #f8faff; }
.residente-card.selecionado { background: #eef2ff; border-color: #3B6FE8; }

.residente-avatar {
  width: 44px; height: 44px; border-radius: 50%;
  background: #3B6FE8; color: #fff;
  font-size: 14px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
}
.residente-nome { font-size: 14px; font-weight: 600; color: #1a1a2e; }
.residente-info { font-size: 12px; color: #a0aec0; margin-top: 2px; }

.btn-fab {
  position: fixed; bottom: 28px; left: 90px;
  width: 48px; height: 48px; border-radius: 50%;
  background: #3B6FE8; color: #fff;
  font-size: 26px; font-weight: 300;
  display: flex; align-items: center; justify-content: center;
  text-decoration: none; box-shadow: 0 4px 14px rgba(59,111,232,0.4);
  z-index: 50;
}

/* Painel de detalhes */
.painel { flex: 1; padding: 32px; overflow-y: auto; }

.painel-vazio {
  display: flex; align-items: center; justify-content: center;
  height: 100%; color: #a0aec0; font-size: 15px;
}

.painel-header {
  display: flex; align-items: flex-start; justify-content: space-between;
  margin-bottom: 28px;
}
.painel-label { font-size: 11px; font-weight: 700; letter-spacing: 0.08em; color: #3B6FE8; margin-bottom: 6px; }
.painel-nome { font-size: 28px; font-weight: 700; color: #1a1a2e; }

.painel-acoes { display: flex; gap: 8px; margin-top: 8px; }
.btn-acao {
  width: 36px; height: 36px; border-radius: 8px;
  border: 1px solid #e2e8f0; background: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.15s;
}
.btn-editar:hover { border-color: #3B6FE8; color: #3B6FE8; background: #eef2ff; }
.btn-excluir { color: #e53e3e; }
.btn-excluir:hover { border-color: #feb2b2; background: #fff5f5; }

.info-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  gap: 20px; background: #fff;
  border-radius: 12px; padding: 24px;
  border: 1px solid #e8ecf2;
}
.info-item { display: flex; flex-direction: column; gap: 4px; }
.info-full { grid-column: 1 / -1; }
.info-label { font-size: 11px; font-weight: 600; letter-spacing: 0.05em; color: #a0aec0; }
.info-valor { font-size: 15px; color: #1a1a2e; font-weight: 500; }

.badge { display: inline-block; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; }
.badge-independente { background: #f0fff4; color: #276749; }
.badge-parcial { background: #fffaf0; color: #c05621; }
.badge-dependente { background: #fff5f5; color: #c53030; }
.badge-acamado { background: #faf5ff; color: #6b46c1; }

.estado-vazio { text-align: center; padding: 32px 0; color: #a0aec0; font-size: 14px; }

.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center; z-index: 100; padding: 16px;
}
.modal { background: #fff; border-radius: 12px; padding: 28px; max-width: 420px; width: 100%; }
.modal-title { font-size: 17px; font-weight: 700; margin-bottom: 10px; }
.modal-desc { font-size: 14px; color: #4a5568; line-height: 1.6; margin-bottom: 24px; }
.modal-actions { display: flex; gap: 12px; justify-content: flex-end; }
.btn-cancel { padding: 10px 20px; background: #e2e8f0; color: #4a5568; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; }
.btn-danger { padding: 10px 20px; background: #e53e3e; color: #fff; border: none; border-radius: 8px; font-size: 14px; cursor: pointer; }

.toast {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
  background: #276749; color: #fff; padding: 12px 24px;
  border-radius: 8px; font-size: 14px; font-weight: 500;
  z-index: 200; box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

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

.user-name {
  font-size: 14px;
  font-weight: 500;
  color: #4a5568;
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
  .layout { flex-direction: column; height: auto; }
  .lista-lateral { width: 100%; height: 280px; border-right: none; border-bottom: 1px solid #e2e8f0; }
  .painel { padding: 16px; }
  .btn-fab { left: auto; right: 16px; bottom: 72px; }
  .info-grid { grid-template-columns: 1fr; }
}
</style>