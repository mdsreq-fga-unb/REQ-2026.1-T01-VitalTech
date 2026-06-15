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
      // apiAcessivel indica se chegamos a obter uma resposta HTTP da API (mesmo que 4xx)
      let apiAcessivel = false

      try {
        // Tenta autenticar na API mock do Mateiki
        const response = await fetch('http://localhost:3001/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ login: normalizedLogin, senha })
        })

        apiAcessivel = true // A API respondeu — está online

        if (response.ok) {
          const data = await response.json()
          const existingLocalUser = await storage.findBy(
            'usuarios',
            'login',
            normalizedLogin,
          )
          user = {
            ...existingLocalUser,
            id: existingLocalUser?.id ?? `api_usr_${data.user.id}`,
            remoteId: String(data.user.id),
            nomeCompleto: data.user.nome || data.user.nomeCompleto || existingLocalUser?.nomeCompleto,
            login: data.user.login,
            perfil: normalizePerfil(data.user.perfil),
            senhaProvisoria: senha, // Salva a senha localmente para futuros logins offline
            ativo: true
          }
          logadoPelaApi = true
        } else if (response.status === 401) {
          // A API está ONLINE e rejeitou as credenciais explicitamente.
          // NÃO tentar fallback local — isso seria uma brecha de segurança.
          // Um usuário com senha errada não deve entrar por ter um cache local.
          throw new ServiceError(
            ERROR_CODES.INVALID_CREDENTIALS,
            'Login ou senha invalidos.'
          )
        }
      } catch (error) {
        // Re-lança ServiceErrors (ex: o 401 acima) sem tentar fallback
        if (error instanceof ServiceError) throw error
        // Outros erros são falhas de rede — API inacessível, tenta fallback offline
        console.warn('Servidor offline. Tentando autenticacao local...', error)
      }

      // Fallback offline: só executa se a API estava inacessível (apiAcessivel === false)
      if (!user && !apiAcessivel) {
        await seedDefaultUsers()
        const localUser = await storage.findBy('usuarios', 'login', normalizedLogin)

        // Verifica a senha provisória local (suporta "123" ou "123456" de fallback)
        const senhaLocal = localUser ? (localUser.senhaProvisoria || localUser.senha) : null
        const senhaValida = senhaLocal === senha || (senha === '123' && senhaLocal === '123456') || (senha === '123456' && senhaLocal === '123')

        if (!localUser || !localUser.ativo || !senhaValida) {
          throw new ServiceError(
            ERROR_CODES.INVALID_CREDENTIALS,
            'Login ou senha invalidos.'
          )
        }
        user = localUser
        console.info('Autenticado localmente (modo offline).')
      } else if (logadoPelaApi && user) {
        // Se logou com sucesso pela API, atualiza a base local para uso futuro offline
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
