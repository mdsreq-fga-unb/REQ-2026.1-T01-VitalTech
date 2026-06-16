# Sprint 2 - Execução

## Sobre este documento

Este documento registra as atividades realizadas durante a execução da Sprint 2, incluindo as práticas de Elicitação e Descoberta (E/D) e Verificação e Validação (V/V) aplicadas ao longo do desenvolvimento das histórias de usuário US01, US08, US09 e US10.

---

## Elicitação e Descoberta (E/D)

Durante a execução da Sprint 2, parte do trabalho envolveu entender melhor o que precisava ser construído antes de escrever o código. As atividades de elicitação e descoberta foram conduzidas de forma informal, mas com intenção clara.

### Análise dos formulários físicos da ILPI

O grupo havia recebido na Sprint 1 os formulários físicos que a instituição usa hoje para registrar os dados dos residentes. Na Sprint 2, retomamos esses documentos especificamente para definir quais campos deveriam estar no formulário de cadastro de residente (US01). Os campos obrigatórios do sistema — nome completo, CPF, data de nascimento, grau de dependência e responsável legal — foram diretamente derivados do que o próprio Marcelo preenche hoje em papel.

### Conversa com o cliente sobre o fluxo de acesso

Antes de implementar a lógica de permissões, Alberto fez uma breve consulta ao Marcelo via WhatsApp para confirmar quem deveria ter acesso ao quê. O cliente confirmou que somente o gestor pode criar novos usuários e cadastrar residentes, enquanto os cuidadores podem apenas visualizar e registrar evoluções. Essa informação foi usada diretamente para definir os três perfis (Gestor, Cuidador, Equipe Multidisciplinar) e suas respectivas permissões no sistema.

### Levantamento das restrições de segurança

A implementação do timeout de sessão de 15 minutos e da mensagem de erro genérica no login partiram de uma discussão interna da equipe sobre boas práticas para sistemas que lidam com dados sensíveis de pacientes. O requisito RNF10 estava documentado, mas os detalhes de implementação foram definidos durante a própria execução da sprint.

---

## Verificação e Validação (V/V)

### Verificação durante o desenvolvimento

Ao longo da sprint, cada membro verificou o próprio trabalho antes de abrir o Pull Request. O PR #43 incluiu um checklist de DoD preenchido pelo Alberto com os itens do escopo da issue #39.

O Enzo Menali realizou a revisão técnica do PR e identificou cinco inconsistências no código:

1. O fallback de autenticação local era acionado mesmo quando a API estava online e havia retornado 401, permitindo que credenciais inválidas fossem aceitas pelo cache local.
2. A sessão estava sendo salva no `localStorage` do navegador ao invés do `sessionStorage`, o que fazia os dados persistirem após fechar o browser.
3. Os campos de foto, especialidade e registro do usuário eram preenchidos na tela mas descartados pelo service antes de salvar.
4. O campo de foto do residente tinha o mesmo problema.
5. A idade exibida na listagem de residentes aparecia como "undefined anos" porque o campo nunca era calculado nem salvo.

As inconsistências identificadas durante a revisão do PR #43 foram corrigidas e receberam testes de regressão. Naquele estágio, a suíte possuía 16 testes.

Após a integração do PR #43, uma nova verificação encontrou três problemas adicionais: o login de usuários recém-cadastrados falhava por conflito entre os IDs local e remoto; as listagens não importavam registros do backend; e a validação de login e CPF duplicados considerava apenas o armazenamento local. Esses pontos foram corrigidos na branch `fix/integracao-sprint2`, a partir do commit `20d7d00`.

### Verificação pela equipe — Testes manuais

Após as correções, os seguintes cenários foram testados manualmente com o sistema rodando localmente (frontend na porta 5173, backend mock na porta 3001):

**Autenticação (US08)**

- Login com usuário `gestor` e senha correta: redirecionou para o painel de residentes.
- Login com usuário `gestor` e senha errada: exibiu mensagem de erro genérica sem logar.
- Acesso direto a `/residentes` sem estar logado: redirecionou para `/login`.
- Login com servidor offline (json-server parado): autenticou pelo cache local do IndexedDB.

**Sessão e logout (US09)**

- Após login, a sessão foi localizada no `sessionStorage` do navegador (verificado no DevTools).
- Após fechar e reabrir o navegador, a sessão não estava mais presente.
- O botão de logout limpou a sessão e redirecionou para o login.

**Cadastro de residente (US01)**

- Cadastro com todos os campos obrigatórios: registro salvo com sucesso no IndexedDB e no json-server.
- Cadastro com foto: a imagem apareceu no avatar da listagem de residentes após o cadastro.
- A idade exibida na listagem foi calculada corretamente a partir da data de nascimento.
- Registros existentes no backend foram importados para a listagem local e reconciliados pelo CPF.
- Tentativa de cadastro com CPF já existente foi rejeitada localmente e pelo backend.

**Cadastro de usuário (US10)**

- Cadastro de usuário com especialidade e registro profissional: campos salvos corretamente.
- Tentativa de cadastro com login já existente: exibiu mensagem de erro de login duplicado.
- Cadastro de usuário com perfil Equipe, logout do Gestor e autenticação com a nova conta: fluxo concluído com sucesso.
- Registros existentes no backend foram importados para a listagem local e reconciliados pelo login.
- Tentativa de duplicidade no backend foi rejeitada com HTTP `409`.

### Verificação automatizada

A suíte de testes unitários cobre os seguintes cenários automaticamente:

| Teste | Resultado |
|-------|-----------|
| Autentica gestor seedado e expõe permissões | Passou |
| Rejeita credenciais inválidas com erro genérico | Passou |
| Cria usuário com rastreabilidade e rejeita login duplicado | Passou |
| Cria residente com campos obrigatórios e isAtivo | Passou |
| Bloqueia criação de residente com campos faltando | Passou |
| Limpa sessão no logout | Passou |
| Rejeita senha errada mesmo com usuário no cache local | Passou |
| Autentica pelo cache quando API está offline | Passou |
| Persiste foto, especialidade e registro do usuário | Passou |
| Persiste usuário sem campos opcionais sem quebrar | Passou |
| Persiste foto no residente | Passou |
| Persiste residente sem foto sem quebrar | Passou |
| Calcula idade corretamente para data válida | Passou |
| Retorna "—" para data de nascimento vazia ou nula | Passou |
| Retorna "—" para data inválida | Passou |
| Não retorna "undefined anos" (bug original) | Passou |
| Mantém o usuário local quando o backend retorna erro de sincronização | Passou |
| Mantém o residente local quando o backend retorna erro de sincronização | Passou |
| Autentica usuário Equipe recém-cadastrado sem duplicar o registro local | Passou |
| Rejeita login já existente no backend antes do cadastro local | Passou |
| Mescla usuários e residentes remotos preservando os IDs locais | Passou |

**Total atual: 21/21 testes passando**

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 14/06/2026 | 1.0 | Criação do documento de execução da Sprint 2 com E/D e V/V | Alberto Côrtes |
| 15/06/2026 | 1.1 | Registro das correções posteriores à integração e atualização da suíte para 21 testes. | Enzo Menali |
