import { ERROR_CODES, ServiceError } from './errors.js'
import { getPermissoesPorPerfil, PERFIS } from './permissions.js'
import { defaultSessionStorage } from './sessionStorage.js'
import { defaultStorage } from './storage.js'
import { generateId, normalizeLogin, normalizePerfil, nowIso } from './validation.js'

// Tempo de expiracao da sessao (15 minutos) conforme RNF11
const SESSION_TTL_MS = 15 * 60 * 1000

// Usuarios padrao para seed local (IndexedDB)
const DEFAULT_USERS = [
  {
    id: 'usr_gestor',
    nomeCompleto: 'Gestor VitalTech',
    login: 'gestor',
    perfil: PERFIS.GESTOR,
    senhaProvisoria: '123456',
    ativo: true,
    createdAt: '2026-05-17T00:00:00.000Z',
    createdBy: 'system',
  },
  {
    id: 'usr_cuidador',
    nomeCompleto: 'Cuidador VitalTech',
    login: 'cuidador',
    perfil: PERFIS.CUIDADOR,
    senhaProvisoria: '123456',
    ativo: true,
    createdAt: '2026-05-17T00:00:00.000Z',
    createdBy: 'system',
  },
  {
    id: 'usr_multidisciplinar',
    nomeCompleto: 'Equipe Multidisciplinar',
    login: 'multidisciplinar',
    perfil: PERFIS.MULTIDISCIPLINAR,
    senhaProvisoria: '123456',
    ativo: true,
    createdAt: '2026-05-17T00:00:00.000Z',
    createdBy: 'system',
  }
]

// Sanitiza os dados do usuario para a sessao (remove a senha)
function sanitizeUser(user) {
  return {
    id: user.id,
    nomeCompleto: user.nomeCompleto,
    login: user.login,
    perfil: user.perfil,
    permissoes: getPermissoesPorPerfil(user.perfil),
  }
}

export function createAuthService({
  storage = defaultStorage,
  sessionStorage = defaultSessionStorage,
  sessionTtlMs = SESSION_TTL_MS,
} = {}) {
  // Semeia usuarios padrao se a tabela local de usuarios estiver vazia
  async function seedDefaultUsers() {
    try {
      const users = await storage.list('usuarios')
      if (users.length > 0) return
      await Promise.all(DEFAULT_USERS.map((user) => storage.put('usuarios', user)))
    } catch (e) {
      console.warn('Erro ao semear usuarios locais:', e)
    }
  }

  // Verifica se a sessao atual na sessionStorage ainda e valida
  async function getValidSession() {
    const session = await sessionStorage.get()

    if (!session) return null

    if (new Date(session.expiresAt).getTime() <= Date.now()) {
      await sessionStorage.clear()
      return null
    }

    return session
  }

  return {
    // Realiza login conectando ao json-server (porta 3001) com fallback offline local
    async login({ login, senha }) {
      const normalizedLogin = normalizeLogin(login)
      let user = null
      let logadoPelaApi = false
      // Indica que a API respondeu 401 — usuario pode existir apenas localmente (criado pelo Gestor offline)
      let apiRecusouCredenciais = false

      try {
        // Tenta autenticar na API mock do Mateiki
        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login: normalizedLogin, senha })
        })

        if (response.ok) {
          const data = await response.json()
          user = {
            id: String(data.user.id),
            nomeCompleto: data.user.nome || data.user.nomeCompleto,
            login: data.user.login,
            perfil: normalizePerfil(data.user.perfil),
            senhaProvisoria: senha, // Salva a senha localmente para futuros logins offline
            ativo: true
          }
          logadoPelaApi = true
        } else if (response.status === 401) {
          // A API nao conhece este usuario — pode ter sido criado localmente pelo Gestor.
          // Nao lanca erro ainda: tenta o fallback no IndexedDB local primeiro (Offline-First).
          console.info('API retornou 401. Verificando base local (usuario pode ter sido criado offline)...')
          apiRecusouCredenciais = true
        }
      } catch (error) {
        if (error instanceof ServiceError) throw error
        console.warn('Servidor offline. Tentando autenticacao local...', error)
      }

      // Se a API nao autenticou (offline ou 401), tenta o IndexedDB local (Offline-First)
      if (!user) {
        await seedDefaultUsers()
        const localUser = await storage.findBy('usuarios', 'login', normalizedLogin)

        // Verifica a senha provisoria local (suporta "123" ou "123456" de fallback)
        const senhaLocal = localUser ? (localUser.senhaProvisoria || localUser.senha) : null
        const senhaValida = senhaLocal === senha || (senha === '123' && senhaLocal === '123456') || (senha === '123456' && senhaLocal === '123')

        if (!localUser || !localUser.ativo || !senhaValida) {
          // Nem a API nem a base local reconheceram as credenciais
          throw new ServiceError(
            ERROR_CODES.INVALID_CREDENTIALS,
            'Login ou senha invalidos.'
          )
        }
        user = localUser
        // Suprime log de aviso se a API simplesmente nao conhecia o usuario local
        if (!apiRecusouCredenciais) {
          console.info('Autenticado localmente (modo offline).')
        }
      } else if (logadoPelaApi) {
        // Se logou com sucesso pela API, atualiza a base local para suportar uso futuro offline
        await storage.put('usuarios', user)
      }

      const safeUser = sanitizeUser(user)
      const session = {
        token: generateId('session'),
        user: safeUser,
        authenticatedAt: nowIso(),
        expiresAt: new Date(Date.now() + sessionTtlMs).toISOString(),
      }

      await sessionStorage.set(session)
      return session
    },

    // Encerra a sessao do usuario (limpa storage local e notifica API se online)
    async logout() {
      try {
        await fetch('http://localhost:3001/auth/logout', { method: 'POST' }).catch(() => {})
      } catch (e) {
        // Ignora erros de rede no logout offline
      }
      await sessionStorage.clear()
      return { loggedOut: true }
    },

    async getCurrentSession() {
      return getValidSession()
    },

    async getCurrentUser() {
      return (await getValidSession())?.user ?? null
    },

    async isAuthenticated() {
      return Boolean(await getValidSession())
    },
  }
}

export const authService = createAuthService()
