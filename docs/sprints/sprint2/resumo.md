# VitalTech — Sprint 2: Resumo de Entrega

> Branch atual: feature/integracao-sprint2 -> PR #43 (aberto para develop)
> Último commit: 194ee01 — feat: base de frontend, fluxo de autenticação e cadastros da sprint 2 (US08, US09, US01, US10)

---

## O que foi feito nesta Sprint

### User Stories implementadas

| US | Título | Status |
|----|--------|--------|
| **US08** | Autenticar usuário no sistema | Implementado |
| **US09** | Encerrar sessão do usuário | Implementado |
| **US01** | Cadastrar residente | Implementado |
| **US10** | Cadastrar usuário (Gestor) | Implementado |

---

## Estrutura de arquivos modificados (vs develop)

```text
app/
├── backend/
│   └── package.json                  ← atualizado para json-server
└── frontend/src/
    ├── App.vue                        ← layout com navbar e controle de sessão
    ├── router/index.js                ← rotas protegidas + guard de autenticação
    ├── stores/session.js              ← store Pinia para sessão reativa
    ├── db/index.js                    ← IndexedDB via Dexie (ajustado)
    ├── views/
    │   └── LoginView.vue              ← tela de login completa (US08/US09)
    ├── components/
    │   ├── NovoCadastro.vue           ← formulário de cadastro residente/usuário
    │   ├── ListaResidentes.vue        ← lista de residentes com busca e filtros
    │   └── ListaUsuarios.vue          ← lista de usuários (acesso restrito Gestor)
    ├── services/
    │   ├── authService.js             ← login/logout com fallback offline
    │   ├── usuarioService.js          ← CRUD de usuários
    │   ├── residenteService.js        ← CRUD de residentes
    │   ├── permissions.js             ← controle de perfis (GESTOR, CUIDADOR, MULTIDISCIPLINAR)
    │   ├── sessionStorage.js          ← abstração da sessão persistida
    │   ├── storage.js                 ← abstração do IndexedDB (Dexie)
    │   ├── validation.js              ← helpers de normalização/geração de ID
    │   ├── errors.js                  ← ServiceError + ERROR_CODES
    │   ├── index.js                   ← re-export de hasPermission e PERMISSOES
    │   └── __tests__/services.test.js ← testes de unit dos services
    └── utils/
        └── serviceErrors.js           ← utilitários de erro para a UI
```

---

## Arquitetura de Autenticação (US08 / US09)

### Fluxo de login (authService.js)
1. Tenta autenticar via API mock (json-server na porta 3001)
2. Se a API está offline -> fallback para IndexedDB local (modo Offline-First)
3. Se a API retorna 401 -> verifica se o usuário foi criado offline pelo Gestor
4. Sessão salva com TTL de 15 minutos (RNF11)
5. sanitizeUser() garante que a senha nunca vai para a sessão

### Usuários padrão seedados localmente
| login | perfil | senha |
|-------|--------|-------|
| `gestor` | GESTOR | `123456` |
| `cuidador` | CUIDADOR | `123456` |
| `multidisciplinar` | MULTIDISCIPLINAR | `123456` |

### Logout (US09)
- Limpa sessionStorage local
- Tenta notificar a API (silencia erro se offline)
- Redireciona para /login

---

## Proteção de Rotas (router/index.js)

| Rota | Autenticação | Permissão |
|------|-------------|-----------|
| `/login` | Pública | — |
| `/residentes` | Requer auth | `RESIDENTES_LIST` |
| `/cadastro` | Requer auth | `RESIDENTES_CREATE` |
| `/usuarios` | Requer auth | `USUARIOS_LIST` (só Gestor) |

- Usuário não autenticado -> redirecionado para /login
- Usuário já logado tentando acessar /login -> redirecionado para /residentes
- Usuário sem permissão -> redirecionado para /residentes com log de aviso

---

## Controle de Permissões por Perfil

```text
GESTOR         → RESIDENTES_LIST, RESIDENTES_CREATE, USUARIOS_LIST, USUARIOS_CREATE
CUIDADOR       → RESIDENTES_LIST, RESIDENTES_CREATE
MULTIDISCIPLINAR → RESIDENTES_LIST (somente leitura)
```

---

## Integração com json-server (Mateiki — PR #41)

- Backend mock rodando em http://localhost:3001
- Endpoints utilizados:
  - POST /auth/login
  - POST /auth/logout
- authService tem fallback offline para quando o server não está disponível

---

## Evidências de DoD verificadas

- [x] Funcionalidades implementadas conforme escopo (US08, US09, US01, US10)
- [x] Critérios de aceite verificados
- [x] Requisitos RF08, RF09 e RNFs 10, 11, 12, 14 considerados
- [x] Cenários de erro testados (credenciais inválidas, usuário inativo, offline)
- [x] Integração com serviços da Dupla B (json-server) validada
- [x] PR #43 aberto para develop (não mergeia para main)

---

## O que NÃO entra neste PR / fica para Sprint 3

- Tela de edição de residente (US02)
- Tela de visualização de prontuário
- Integração com backend real (substituir json-server)
- Timeout automático de sessão com aviso visual
- Testes E2E
- Histórico de alterações de residente

---

## Como rodar localmente

```bash
# Terminal 1 — backend mock
cd app/backend
npm install
npm run dev   # json-server na porta 3001

# Terminal 2 — frontend
cd app/frontend
npm install
npm run dev   # Vite na porta 5173
```

Credenciais de teste: gestor / 123456
