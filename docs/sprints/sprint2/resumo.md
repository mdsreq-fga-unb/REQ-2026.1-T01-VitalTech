# VitalTech - Sprint 2: Resumo de Entrega

A integração original da Sprint 2 foi realizada pelo PR #43. Após o merge, uma nova verificação identificou inconsistências na autenticação de usuários recém-cadastrados, na sincronização das listagens e na validação de duplicidades. As correções complementares foram implementadas na branch `fix/integracao-sprint2`

---

## User Stories Implementadas

| US | Título | Status |
| --- | --- | --- |
| **US08** | Autenticar usuário no sistema | Implementada e verificada após as correções |
| **US09** | Encerrar sessão do usuário | Implementada e verificada após as correções |
| **US01** | Cadastrar residente | Implementada e verificada após as correções |
| **US10** | Cadastrar usuário | Implementada e verificada após as correções |

---

## Autenticação e Sessão

### Fluxo de login

1. O `authService` tenta autenticar pela API mock na porta 3001.
2. Uma resposta HTTP `401` rejeita as credenciais sem consultar o cache local.
3. O fallback pelo IndexedDB ocorre somente quando a API está inacessível.
4. Ao autenticar pela API, o usuário remoto é reconciliado com o registro local pelo login, preservando o ID local e armazenando o ID remoto separadamente.
5. A sessão é armazenada no `sessionStorage`, com expiração após 15 minutos de inatividade.
6. Senhas não são incluídas nos dados da sessão.

### Usuários padrão

| Login | Perfil | Senha |
| --- | --- | --- |
| `gestor` | Gestor | `123456` |
| `cuidador` | Cuidador | `123456` |
| `multidisciplinar` | Equipe Multidisciplinar | `123456` |

### Logout

- Limpa a sessão armazenada no navegador.
- Tenta notificar a API sem impedir o logout em caso de indisponibilidade.
- Redireciona o usuário para `/login`.

---

## Permissões por Perfil

| Perfil | Permissões disponíveis |
| --- | --- |
| Gestor | Listar e cadastrar usuários; listar, cadastrar e editar residentes |
| Cuidador | Listar residentes |
| Equipe Multidisciplinar | Listar residentes |

Somente o Gestor pode acessar as rotas administrativas `/usuarios` e `/cadastro`. Usuários sem permissão são redirecionados para `/residentes`.

---

## Persistência e Sincronização

O incremento utiliza IndexedDB, por meio do Dexie, em conjunto com o backend mock em json-server.

- Cadastros de usuários e residentes são persistidos localmente e enviados ao backend quando ele está disponível.
- As listagens consultam o backend e atualizam o armazenamento local.
- Usuários são reconciliados pelo login.
- Residentes são reconciliados pelo CPF.
- Login e CPF duplicados são verificados localmente e no backend.
- O backend responde com HTTP `409` quando identifica uma duplicidade.

A sincronização bidirecional completa, com fila de operações e resolução de conflitos offline, permanece fora do escopo desta entrega.

### Endpoints utilizados

| Método | Endpoint | Finalidade |
| --- | --- | --- |
| POST | `/auth/login` | Autenticar usuário |
| POST | `/auth/logout` | Notificar encerramento de sessão |
| GET/POST | `/usuarios` | Consultar e cadastrar usuários |
| GET/POST | `/residentes` | Consultar e cadastrar residentes |

---

## Verificação Técnica

- Cadastro de usuário com perfil Equipe concluído.
- Logout do Gestor e login com o novo usuário concluídos.
- Dados existentes no backend carregados nas listagens locais.
- Login e CPF duplicados rejeitados.
- Build de produção concluído.
- **21 de 21 testes automatizados passando.**

---

## Itens Posteriores

- Backend definitivo em substituição ao json-server.
- Sincronização offline completa e resolução de conflitos.
- Testes ponta a ponta.
- Edição e histórico de alterações de residentes.
- Componente reutilizável de toast/snackbar.
- Adequação completa dos alvos de toque para tablets.

---

## Como Rodar Localmente

```bash
# Terminal 1 - backend mock
cd app/backend
npm install
npm run mock

# Terminal 2 - frontend
cd app/frontend
npm install
npm run dev
```

Credencial principal de teste: `gestor` / `123456`.

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| --- | --- | --- | --- |
| 15/06/2026 | 2.0 | Atualização do resumo conforme a integração final, as correções posteriores e a verificação técnica com 21 testes. | Enzo Menali |
