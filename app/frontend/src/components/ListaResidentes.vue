<template>
  <div class="page-wrapper">
    <aside class="sidebar">
      <div class="sidebar-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
      </div>
      <div class="sidebar-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
      </div>
      <div class="sidebar-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
      </div>
      <div class="sidebar-icon active">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3B6FE8" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
      </div>
      <div class="sidebar-icon">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
      </div>
    </aside>

    <div class="main">
      <header class="header">
        <h1 class="header-title">Painel de Residentes</h1>
        <div class="header-right">
          <div class="sync-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#276749" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
            Sistema Sincronizado
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
          <router-link to="/cadastro" class="btn-fab">+</router-link>
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
              <div class="painel-acoes">
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
import { residenteService } from '../services/residenteService'

const residentes = ref([])
const busca = ref('')
const carregando = ref(true)
const residenteSelecionado = ref(null)
const residenteParaExcluir = ref(null)
const mensagemSucesso = ref('')

onMounted(async () => {
  residentes.value = await residenteService.listar()
  if (residentes.value.length > 0) residenteSelecionado.value = residentes.value[0]
  carregando.value = false
})

const residentesFiltrados = computed(() => {
  const t = busca.value.toLowerCase()
  return residentes.value.filter(r =>
    r.nomeCompleto.toLowerCase().includes(t) ||
    r.cpf?.includes(t)
  )
})

function iniciais(nome) {
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
  await residenteService.excluir(residenteParaExcluir.value.id)
  residentes.value = residentes.value.filter(r => r.id !== residenteParaExcluir.value.id)
  if (residenteSelecionado.value?.id === residenteParaExcluir.value.id) {
    residenteSelecionado.value = residentes.value[0] || null
  }
  residenteParaExcluir.value = null
  mensagemSucesso.value = 'Residente excluído com sucesso.'
  setTimeout(() => mensagemSucesso.value = '', 3000)
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
}
.sidebar-icon:hover { background: #2d3748; color: #fff; }
.sidebar-icon.active { background: #eef2ff; }

.main { margin-left: 60px; flex: 1; display: flex; flex-direction: column; }

.header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 16px 28px; background: #fff; border-bottom: 1px solid #e2e8f0;
}
.header-title { font-size: 20px; font-weight: 700; color: #1a1a2e; }
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

@media (max-width: 640px) {
  .sidebar { display: none; }
  .main { margin-left: 0; }
  .layout { flex-direction: column; height: auto; }
  .lista-lateral { width: 100%; height: 280px; border-right: none; border-bottom: 1px solid #e2e8f0; }
  .painel { padding: 16px; }
  .btn-fab { left: 16px; }
  .info-grid { grid-template-columns: 1fr; }
}
</style>