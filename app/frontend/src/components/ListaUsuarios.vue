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
          <div class="header-icon-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" stroke-width="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
          </div>
          <h1 class="header-title">Administração de Perfis</h1>
        </div>
        <div class="header-right">
          <router-link to="/cadastro" class="btn-primary" v-if="sessionState.session?.user?.perfil === 'gestor'">+ Novo Usuário</router-link>
          <span class="user-name" style="font-weight: 500; font-size: 14px; color: #4a5568;">
            {{ sessionState.session?.user?.nomeCompleto }}
          </span>
          <div class="avatar" style="background: #3B6FE8; color: #fff; width: 36px; height: 36px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 600;">
            {{ iniciais(sessionState.session?.user?.nomeCompleto) }}
          </div>
        </div>
      </header>

      <div class="content">
        <!-- Busca + total -->
        <div class="top-bar">
          <div class="search-wrapper">
            <svg class="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a0aec0" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            <input v-model="busca" type="text" placeholder="Buscar por nome ou função..." class="search-input" />
          </div>
          <span class="total-label">Total: {{ usuarios.length }} usuários</span>
        </div>

        <!-- Loading -->
        <div v-if="carregando" class="estado-vazio">Carregando...</div>

        <!-- Vazio -->
        <div v-else-if="usuariosPaginados.length === 0" class="estado-vazio">Nenhum usuário encontrado.</div>

        <!-- Lista -->
        <div v-else class="card">
          <div class="table-header">
            <span class="col-usuario">USUÁRIO</span>
            <span class="col-funcao">FUNÇÃO</span>
            <span class="col-acoes">AÇÕES</span>
          </div>

          <div v-for="usuario in usuariosPaginados" :key="usuario.id" class="table-row">
            <div class="col-usuario user-info">
              <div class="user-avatar" :style="usuario.foto ? `background-image: url(${usuario.foto}); background-size: cover;` : ''">
                <span v-if="!usuario.foto">{{ iniciais(usuario.nomeCompleto) }}</span>
              </div>
              <div>
                <div class="user-name">{{ usuario.nomeCompleto }}</div>
                <div class="user-email">{{ usuario.login }}@vitaltech.com</div>
              </div>
            </div>
            <div class="col-funcao">
              <span class="badge" :class="badgePerfil(usuario.perfil)">{{ usuario.perfil === 'multidisciplinar' ? 'EQUIPE' : usuario.perfil.toUpperCase() }}</span>
            </div>
            <div class="col-acoes acoes">
              <button class="btn-acao btn-editar" title="Editar">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="btn-acao btn-excluir" title="Excluir" @click="confirmarExclusao(usuario)">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Paginação -->
        <div v-if="totalPaginas > 1" class="paginacao">
          <span class="paginacao-info">Exibindo {{ usuariosPaginados.length }} de {{ usuariosFiltrados.length }} resultados</span>
          <div class="paginacao-btns">
            <button class="pag-btn" :disabled="paginaAtual === 1" @click="paginaAtual--">‹</button>
            <button
              v-for="p in totalPaginas" :key="p"
              class="pag-btn"
              :class="{ active: paginaAtual === p }"
              @click="paginaAtual = p"
            >{{ p }}</button>
            <button class="pag-btn" :disabled="paginaAtual === totalPaginas" @click="paginaAtual++">›</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de confirmação -->
    <div v-if="usuarioParaExcluir" class="modal-overlay" @click.self="usuarioParaExcluir = null">
      <div class="modal">
        <h3 class="modal-title">Excluir usuário?</h3>
        <p class="modal-desc">Tem certeza que deseja excluir <strong>{{ usuarioParaExcluir.nomeCompleto }}</strong>? Essa ação não pode ser desfeita.</p>
        <div class="modal-actions">
          <button class="btn-cancel" @click="usuarioParaExcluir = null">Cancelar</button>
          <button class="btn-danger" @click="excluir">Confirmar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { usuarioService } from '../services'
import { sessionState, logout } from '../stores/session.js'
import { useToastStore } from '../stores/toast.js'

const router = useRouter()
const toast = useToastStore()
const usuarios = ref([])

async function efetuarLogout() {
  await logout()
  router.push('/login')
}
const busca = ref('')
const carregando = ref(true)
const usuarioParaExcluir = ref(null)
const paginaAtual = ref(1)
const porPagina = 6

onMounted(async () => {
  try {
    usuarios.value = await usuarioService.listarUsuarios()
  } catch (error) {
    console.error('Erro ao listar usuários:', error)
  } finally {
    carregando.value = false
  }
})

const usuariosFiltrados = computed(() => {
  const t = busca.value.toLowerCase()
  return usuarios.value.filter(u =>
    u.nomeCompleto.toLowerCase().includes(t) ||
    u.perfil.toLowerCase().includes(t)
  )
})

const totalPaginas = computed(() => Math.ceil(usuariosFiltrados.value.length / porPagina))

const usuariosPaginados = computed(() => {
  const start = (paginaAtual.value - 1) * porPagina
  return usuariosFiltrados.value.slice(start, start + porPagina)
})

function iniciais(nome) {
  if (!nome) return ''
  return nome.split(' ').slice(0, 2).map(n => n[0]).join('').toUpperCase()
}

function badgePerfil(perfil) {
  const normalized = String(perfil ?? '').toLowerCase();
  return {
    'badge-gestor': normalized === 'gestor',
    'badge-equipe': normalized === 'equipe' || normalized === 'multidisciplinar',
    'badge-cuidador': normalized === 'cuidador',
  }
}

function confirmarExclusao(u) { usuarioParaExcluir.value = u }

async function excluir() {
  try {
    await usuarioService.inativarUsuario(usuarioParaExcluir.value.id)
    usuarios.value = usuarios.value.filter(u => u.id !== usuarioParaExcluir.value.id)
    toast.show('Usuário inativado com sucesso.', 'success')
  } catch (error) {
    console.error('Erro ao inativar usuário:', error)
  } finally {
    usuarioParaExcluir.value = null
  }
}
</script>

<style scoped>
* { box-sizing: border-box; margin: 0; padding: 0; }

.page-wrapper {
  display: flex;
  min-height: 100vh;
  background: #f0f2f7;
  font-family: 'Segoe UI', sans-serif;
}

/* Sidebar */
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

/* Main */
.main { margin-left: 60px; flex: 1; display: flex; flex-direction: column; }

/* Header */
.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 32px;
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
}
.header-left { display: flex; align-items: center; gap: 12px; }
.header-icon-box {
  width: 36px; height: 36px; background: #eef2ff; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
}
.header-title { font-size: 18px; font-weight: 600; color: #1a1a2e; }
.header-right { display: flex; align-items: center; gap: 16px; }
.btn-primary {
  padding: 10px 20px; background: #3B6FE8; color: #fff;
  border: none; border-radius: 8px; font-size: 14px; font-weight: 500;
  cursor: pointer; text-decoration: none; white-space: nowrap;
}
.avatar {
  width: 36px; height: 36px; border-radius: 50%;
  background: #3B6FE8; color: #fff;
  font-size: 13px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
}

/* Content */
.content { padding: 28px 32px; }

.top-bar {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 20px; gap: 16px; flex-wrap: wrap;
}
.search-wrapper {
  position: relative; flex: 1; max-width: 360px;
}
.search-icon {
  position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
}
.search-input {
  width: 100%; height: 40px;
  border: 1px solid #e2e8f0; border-radius: 20px;
  padding: 0 16px 0 36px; font-size: 14px; outline: none;
  background: #fff;
}
.search-input:focus { border-color: #3B6FE8; }
.total-label { font-size: 14px; color: #718096; white-space: nowrap; }

/* Card / Table */
.card {
  background: #fff; border-radius: 12px;
  border: 1px solid #e8ecf2; overflow: hidden;
}

.table-header {
  display: grid;
  grid-template-columns: 1fr 180px 120px;
  padding: 12px 24px;
  font-size: 11px; font-weight: 700;
  letter-spacing: 0.07em; color: #a0aec0;
  border-bottom: 1px solid #f0f2f7;
}

.table-row {
  display: grid;
  grid-template-columns: 1fr 180px 120px;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f7f8fa;
  transition: background 0.15s;
}
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: #f8faff; }

.user-info { display: flex; align-items: center; gap: 14px; }

.user-avatar {
  width: 42px; height: 42px; border-radius: 50%;
  background: #3B6FE8;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 14px; font-weight: 600;
  flex-shrink: 0;
  background-size: cover;
  background-position: center;
}

.user-name { font-size: 15px; font-weight: 600; color: #1a1a2e; }
.user-email { font-size: 13px; color: #a0aec0; margin-top: 2px; }

.badge {
  display: inline-block;
  padding: 4px 12px; border-radius: 6px;
  font-size: 11px; font-weight: 700; letter-spacing: 0.05em;
}
.badge-gestor { background: #eef2ff; color: #3B6FE8; }
.badge-equipe { background: #f0f4f8; color: #4a5568; }
.badge-cuidador { background: #fdf2f8; color: #b83280; }

.acoes { display: flex; gap: 8px; }
.btn-acao {
  width: 44px; height: 44px; border-radius: 8px;
  border: 1px solid #e2e8f0; background: #fff;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.15s;
}
.btn-editar { color: #3B6FE8; border-color: #c7d2fe; background: #eef2ff; }
.btn-editar:hover { border-color: #3B6FE8; }
.btn-excluir { color: #e53e3e; }
.btn-excluir:hover { border-color: #feb2b2; background: #fff5f5; }

/* Paginação */
.paginacao {
  display: flex; align-items: center; justify-content: space-between;
  margin-top: 20px; flex-wrap: wrap; gap: 12px;
}
.paginacao-info { font-size: 13px; color: #718096; }
.paginacao-btns { display: flex; gap: 6px; }
.pag-btn {
  width: 34px; height: 34px; border-radius: 8px;
  border: 1px solid #e2e8f0; background: #fff;
  font-size: 14px; cursor: pointer; color: #4a5568;
  display: flex; align-items: center; justify-content: center;
}
.pag-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.pag-btn.active { background: #3B6FE8; color: #fff; border-color: #3B6FE8; }

/* Estado vazio */
.estado-vazio { text-align: center; padding: 60px; color: #a0aec0; font-size: 15px; }

/* Modal */
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
  .content { padding: 16px; }
  .table-header { display: none; }
  .table-row { grid-template-columns: 1fr auto; grid-template-rows: auto auto; gap: 8px; }
  .col-funcao { grid-column: 1; }
  .col-acoes { grid-column: 2; grid-row: 1 / 3; align-self: center; }
}
</style>
