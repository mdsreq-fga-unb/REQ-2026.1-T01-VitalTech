# Sprint 2 - Planning

## Registro do Planejamento

Nao ha ata formal de reuniao registrada para esta Sprint Planning. Este documento consolida o planejamento da Sprint 2 a partir do HTML atualizado de planejamento da sprint, do Story Map, das User Stories, do DoR/DoD oficial e das regras de negocio documentadas no repositorio.

Tambem nao ha gravacao registrada para esta planning.

## Objetivo da Sprint

Entregar a fundacao inicial do sistema VitalTech, contemplando autenticacao, encerramento de sessao, cadastro de usuarios e cadastro de residentes.

Ao final da sprint, o sistema deve permitir o fluxo demonstravel:

```text
login -> cadastro de usuario -> cadastro de residente -> logout
```

Esse fluxo cria a base necessaria para que a Sprint 3 inicie o ciclo assistencial, com registro de sinais vitais, rotinas assistenciais e consulta ao historico.

## Escopo Selecionado

| User Story | Funcionalidade | Persona | Objetivo na Sprint 2 |
| --- | --- | --- | --- |
| US08 | Autenticar usuario no sistema | Usuario autorizado | Permitir acesso seguro ao sistema por credenciais individuais. |
| US09 | Encerrar sessao do usuario | Usuario autorizado | Evitar uso indevido em dispositivos compartilhados. |
| US10 | Cadastrar usuario | Gestor | Permitir que o gestor crie acessos individuais para a equipe. |
| US01 | Cadastrar dados do residente | Gestor | Criar a base de residentes para uso nos registros assistenciais das proximas sprints. |

## Criterios de Aceitacao da Sprint

### US08 - Autenticar usuario no sistema

- CA08.1: Dado que o usuario esta na tela de login, quando informar login e senha corretos e confirmar, entao o sistema libera o acesso e direciona para a tela inicial.
- CA08.2: Dado que o usuario informa credenciais incorretas, quando tenta confirmar, entao o sistema exibe mensagem de erro generica sem revelar qual campo esta incorreto, e o acesso e negado.

### US09 - Encerrar sessao do usuario

- CA09.1: Dado que o usuario esta autenticado, quando clicar em "Encerrar sessao", entao a sessao e encerrada e o usuario e redirecionado para a tela de login.
- CA09.2: Dado que a sessao foi encerrada, quando outro usuario acessar o dispositivo, entao os dados da sessao anterior nao estao mais visiveis nem acessiveis.

### US10 - Cadastrar usuario

- CA10.1: Dado que o Gestor esta autenticado, quando preencher os campos obrigatorios (nome completo, login, perfil e senha provisoria) e confirmar, entao o novo usuario e criado e pode se autenticar com as credenciais definidas.
- CA10.2: Dado que o Gestor tenta cadastrar um login ja existente no sistema, quando confirmar, entao o sistema exibe mensagem de erro indicando que o login ja esta em uso e nao realiza o cadastro.

### US01 - Cadastrar dados do residente

- CA01.1: Dado que o Gestor esta autenticado, quando preencher os campos obrigatorios (nome completo, data de nascimento, CPF, grau de dependencia e responsavel legal) e confirmar, entao o perfil digital do residente e criado e fica disponivel para toda a equipe.
- CA01.2: Dado que o Gestor tenta cadastrar sem preencher campos obrigatorios, quando confirmar, entao o sistema indica os campos em falta e nao realiza o cadastro.

## Definition of Ready Aplicada

As historias da Sprint 2 foram consideradas prontas para desenvolvimento porque atendem aos criterios principais do DoR oficial do projeto:

- estao descritas como User Stories com persona, acao e beneficio;
- possuem criterios de aceitacao em formato Dado / Quando / Entao;
- possuem valor claro para o fluxo administrativo e operacional da instituicao;
- foram relacionadas ao Story Map e ao cronograma da Sprint 2;
- possuem dependencias tecnicas identificadas;
- possuem regras de negocio e RNFs associados quando aplicavel;
- possuem tarefas tecnicas planejadas para frontend, services, persistencia, testes e evidencias;
- foram avaliadas pelo criterio INVEST.

## Analise INVEST por Funcionalidade

### US08 - Autenticar usuario no sistema

| Criterio | Avaliacao |
| --- | --- |
| Independent | Parcialmente independente. Pode ser implementada como tela e service de login, mas serve de base para as demais telas autenticadas. A dependencia foi identificada e planejada. |
| Negotiable | O escopo permite ajustes em mensagens, fluxo visual e comportamento de erro sem alterar o objetivo da historia. |
| Valuable | Entrega valor claro ao impedir acesso nao autorizado ao sistema. |
| Estimable | A equipe consegue estimar a funcionalidade a partir dos campos login/senha, mock de usuarios, authService e criterios de aceite. |
| Small | Possui tamanho compativel com a sprint, pois cobre login e feedback de erro generico. |
| Testable | E testavel por login valido, login invalido e verificacao de redirecionamento/negacao de acesso. |

### US09 - Encerrar sessao do usuario

| Criterio | Avaliacao |
| --- | --- |
| Independent | Parcialmente independente. Depende de existir sessao autenticada, mas seu comportamento e isolado e verificavel. |
| Negotiable | Permite ajustes no posicionamento do botao, texto exibido e detalhes de timeout. |
| Valuable | Entrega valor de seguranca em dispositivos compartilhados. |
| Estimable | A equipe consegue estimar a partir de logout, limpeza de sessao, router guard e timeout de inatividade. |
| Small | E pequena e compatível com a sprint, pois envolve encerrar sessao e limpar dados locais. |
| Testable | E testavel por logout manual, tentativa de retorno a telas internas e verificacao de dados da sessao. |

### US10 - Cadastrar usuario

| Criterio | Avaliacao |
| --- | --- |
| Independent | Parcialmente independente. Depende de autenticacao do Gestor, mas a criacao/listagem de usuarios e um modulo claro. |
| Negotiable | Campos, mensagens e regras de exibicao podem ser refinados com a equipe e cliente. |
| Valuable | Entrega valor ao permitir acesso individual para membros da equipe. |
| Estimable | A equipe consegue estimar a partir do formulario, usuarioService, validacao de duplicidade e controle por perfil. |
| Small | Tem escopo adequado para a sprint: cadastrar, listar e bloquear login duplicado. |
| Testable | E testavel por cadastro valido, campos obrigatorios, login duplicado e restricao por perfil. |

### US01 - Cadastrar dados do residente

| Criterio | Avaliacao |
| --- | --- |
| Independent | Parcialmente independente. Depende de usuario autenticado, mas o cadastro de residente e funcionalidade propria e prioritaria. |
| Negotiable | Campos complementares e organizacao visual podem ser ajustados conforme feedback. |
| Valuable | Entrega valor central ao criar o perfil digital do residente, base para registros assistenciais futuros. |
| Estimable | A equipe consegue estimar a partir dos campos obrigatorios, residenteService, persistencia local e regras de validacao. |
| Small | O escopo foi limitado ao cadastro inicial e listagem, deixando edicao/inativacao para sprints futuras. |
| Testable | E testavel por cadastro valido, campos obrigatorios vazios, CPF duplicado, persistencia e listagem de residentes ativos. |

## Regras de Negocio Consideradas

| Regra | Aplicacao na Sprint 2 |
| --- | --- |
| RN-02 | Preparar schema local em IndexedDB para usuarios e residentes, mantendo compatibilidade com consolidacao futura no backend institucional. |
| RN-03 | Preparar o campo `isAtivo` no schema de residente, viabilizando soft delete futuro sem excluir historico. |
| RN-05 | Bloquear submissao de formularios com campos obrigatorios vazios em cadastro de usuario e cadastro de residente. |
| RN-09 | Exibir confirmacao visual apos salvar usuario ou residente. |

Observacao: RN-01 entra com maior forca na Sprint 3, com registros assistenciais offline. RN-04, RN-06, RN-07 e RN-08 sao regras relacionadas a funcionalidades previstas para sprints futuras.

## Planejamento Tecnico por Membro

### Membro 1 - Dupla A

Responsavel por frontend lead, componentes Vue e telas de autenticacao/sessao.

- Setup Vite, Vue 3, vue-router e estrutura inicial de pastas.
- Implementar LoginView com campos login/senha, validacao reativa e mensagem de erro generica.
- Implementar encerramento de sessao e router guard.
- Apoiar telas de usuario e residente.
- Implementar toast/snackbar reutilizavel para confirmacao de salvamento.
- Testar services de autenticacao e persistencia da Dupla B.
- Apoiar ensaio da demo e coleta de evidencias.

### Membro 2 - Dupla A

Responsavel por formularios, gestao de usuarios e cadastro de residentes.

- Criar wireframes das telas de cadastro de usuario e residente.
- Definir modelo visual de Usuario e Residente.
- Implementar formulario e listagem de usuarios.
- Implementar formulario e listagem de residentes.
- Integrar telas com usuarioService e residenteService da Dupla B.
- Validar campos obrigatorios, feedback de erro e usabilidade touch.
- Testar persistencia, metadados e controle de acesso com a Dupla B.

### Membro 3 - Dupla B

Responsavel por logica de negocio, persistencia local, IndexedDB e autenticacao.

- Projetar schema IndexedDB com object stores para `usuarios` e `residentes`.
- Documentar contrato de API mock para `/auth/login`, `/usuarios` e `/residentes`.
- Implementar `authService.js` com login, sessao, perfil/permissoes e logout.
- Implementar `usuarioService.js` com salvar, listar, buscar por login e validar duplicidade.
- Implementar `residenteService.js` com salvar, listar, buscar por ID, metadados e `isAtivo`.
- Preparar metadados de rastreabilidade, como `createdAt` e `createdBy`.
- Apoiar testes da Dupla A e ensaio da demonstracao.

### Membro 4 - Dupla B

Responsavel por integracao, testes funcionais, qualidade e evidencias.

- Configurar backend mock/json-server com dados de autenticacao, usuarios e residentes.
- Escrever checklist de testes de permissao por perfil.
- Testar cenarios de erro do authService: credenciais invalidas, usuario inexistente e sessao expirada.
- Testar US10, incluindo cadastro de usuario, login duplicado e controle de perfil.
- Testar US01, incluindo campos obrigatorios, persistencia e metadados.
- Consolidar evidencias para DoD, como prints, status por criterio de aceite e demonstracao do fluxo.

## Artefatos Planejados

| Artefato | Objetivo | Responsavel principal |
| --- | --- | --- |
| DoR validado para US08, US09, US10 e US01 | Confirmar que as historias estao prontas para desenvolvimento. | Equipe |
| Setup Vue/Vite | Disponibilizar base do frontend para implementacao das telas. | Membro 1 |
| Wireframes de usuario e residente | Apoiar implementacao dos formularios. | Membro 2 |
| Contrato de API mock | Alinhar frontend, services e backend mock. | Membro 3 |
| Schema IndexedDB | Preparar persistencia local para usuarios e residentes. | Membro 3 |
| Checklist de testes por perfil | Apoiar validacao cruzada da sprint. | Membro 4 |
| Evidencias de validacao | Registrar atendimento aos criterios de aceite e DoD. | Membro 4 e equipe |

## Definition of Done Aplicada

A Sprint 2 segue o DoD oficial documentado em `docs/visao/dor_dod.md`. Para cada User Story, a entrega deve ser considerada concluida quando:

- a funcionalidade corresponder ao objetivo da User Story;
- todos os criterios de aceitacao aplicaveis forem verificados;
- cenarios principais e cenarios de erro forem testados;
- regras de negocio e requisitos associados forem considerados;
- mensagens ao usuario forem claras e adequadas ao contexto da instituicao;
- a interface for adequada ao uso em dispositivos moveis/tablets, quando aplicavel;
- a funcionalidade nao comprometer dados existentes nem interferir negativamente em historias ja entregues;
- testes manuais, automatizados ou inspecoes suficientes forem realizados;
- evidencias de validacao forem registradas;
- documentacao e artefatos forem atualizados quando necessario;
- a entrega passar por revisao de outro membro via Pull Request.

## Roteiro de Demo

1. Acessar a aplicacao e exibir a tela de login.
2. Tentar autenticar com credenciais invalidas e demonstrar erro generico.
3. Autenticar com usuario Gestor.
4. Cadastrar um novo usuario com nome, login, perfil e senha provisoria.
5. Demonstrar bloqueio de login duplicado.
6. Cadastrar um residente com campos obrigatorios.
7. Demonstrar bloqueio de campos obrigatorios vazios no cadastro de residente.
8. Exibir confirmacao visual de salvamento.
9. Encerrar sessao.
10. Fazer login com outro perfil e demonstrar restricoes de acesso quando aplicavel.
11. Exibir listagem de residentes como base para a Sprint 3.

## Riscos e Mitigacoes

| Risco | Impacto | Mitigacao |
| --- | --- | --- |
| Backend definitivo nao estar disponivel | Pode bloquear integracao real. | Usar contrato mock e json-server/IndexedDB enquanto backend FastAPI nao estiver pronto. |
| Schema IndexedDB ficar desalinhado do backend futuro | Pode gerar retrabalho na sincronizacao. | Documentar contrato e manter campos compativeis com estrutura futura. |
| Falta de validacao de campos obrigatorios | Pode comprometer RN-05 e qualidade dos dados. | Aplicar validacao nos services e nos formularios. |
| Falta de evidencias para DoD | Pode dificultar revisao da sprint. | Registrar prints, resultado de testes e status por criterio de aceite. |
| Escopo visual crescer demais | Pode desviar do objetivo da fundacao da Sprint 2. | Manter foco em login, usuarios, residentes e logout. |


---

## Historico de Revisao

| Data | Versao | Descricao | Autor |
| :---: | :---: | --- | --- |
| 31/05/2026 | 1.0 | Preenchimento do planning da Sprint 2 com base no HTML atualizado, DoR, DoD e analise INVEST das funcionalidades. | Enzo Menali |
