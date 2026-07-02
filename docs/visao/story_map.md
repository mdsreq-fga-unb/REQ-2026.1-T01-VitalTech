# Story Map — VitalTech

O Story Map do VitalTech organiza as User Stories a partir da jornada principal de uso do sistema, apresentando como as funcionalidades se distribuem ao longo das sprints.

Este documento não substitui a lista de Requisitos Funcionais, Requisitos Não Funcionais, Regras de Negócio ou Critérios de Aceitação. Seu objetivo é representar a jornada dos usuários no sistema e mostrar a ordem planejada de entrega das histórias.

---

## Metodologia

A organização do Story Map segue dois eixos principais:

- **Eixo horizontal:** representa a jornada principal do usuário no sistema.
- **Eixo vertical:** representa a ordem de entrega das User Stories por sprint.

A construção do mapa seguiu os seguintes passos:

1. Identificação das personas envolvidas no uso do sistema;
2. Definição dos objetivos principais do produto;
3. Organização das atividades conforme a jornada do usuário;
4. Distribuição das User Stories nas sprints;
5. Representação visual das entregas em formato de Story Map.

---

## Personas consideradas

| Persona | Papel no sistema |
|---|---|
| **Usuário autorizado** | Qualquer usuário com credenciais válidas para acessar o sistema conforme seu perfil de permissão. |
| **Gestor** | Responsável por cadastros base, gestão de usuários e controle administrativo do sistema. |
| **Cuidador** | Responsável pelo registro assistencial durante a rotina de cuidado dos residentes. |
| **Membro da equipe multidisciplinar** | Profissional que consulta dados assistenciais para acompanhamento e tomada de decisão clínica. |

---

## Objetivos do Produto no Story Map

| Objetivo | Descrição |
|---|---|
| **Garantir acesso seguro e rastreabilidade das ações** | Permitir que apenas usuários autorizados acessem o sistema e que suas ações sejam identificáveis. |
| **Centralizar registros assistenciais dos residentes** | Substituir registros dispersos em papel por registros digitais organizados e consultáveis. |
| **Apoiar a consulta e a tomada de decisão clínica** | Permitir que a equipe acesse o histórico assistencial dos residentes para acompanhar sua evolução. |

---

## Jornada principal

A jornada principal considerada para o VitalTech é:

```text
Acessar sistema → Administrar usuários → Cadastrar e atualizar residentes → Registrar assistência → Consultar histórico → Encerrar uso
```

Essa jornada representa o fluxo esperado de uso do sistema: usuários autorizados acessam a plataforma, cadastros base são mantidos, residentes são registrados, informações assistenciais são preenchidas durante o cuidado e os registros ficam disponíveis para consulta posterior.

---

## Atividades do Story Map

| Atividade | Descrição |
|---|---|
| **Acessar sistema** | Entrada do usuário autorizado no sistema por meio de credenciais individuais. |
| **Administrar usuários** | Cadastro, atualização e controle de acesso dos membros da equipe. |
| **Cadastrar e atualizar residentes** | Criação, edição e inativação de cadastros de residentes. |
| **Registrar assistência** | Registro digital das informações assistenciais realizadas durante o turno. |
| **Consultar histórico** | Acesso aos registros assistenciais anteriores para acompanhamento do residente. |
| **Encerrar uso** | Finalização da sessão para evitar uso indevido em dispositivos compartilhados. |

---

## Relação com as Características de Produto

| Característica de Produto | Atividade relacionada | User Stories relacionadas |
|---|---|---|
| **CP3 — Autenticação de usuários** | Acessar sistema / Encerrar uso | US08, US09 |
| **CP4 — Gerenciamento de usuários** | Administrar usuários | US10, US11, US12, US13 |
| **CP1 — Gestão de residentes** | Cadastrar e atualizar residentes | US01, US02, US03 |
| **CP2 — Registro assistencial digital** | Registrar assistência | US04, US05, US06, US07 |
| **CP5 — Consulta do histórico assistencial** | Consultar histórico | US14, US15, US16 |

> Observação: a ordem das atividades segue a jornada de uso do sistema, e não a numeração sequencial das Características de Produto.

---

## Representação Visual do Story Map

As imagens abaixo registram a organização visual do User Story Mapping utilizada para distribuir as histórias ao longo da jornada principal e das sprints planejadas.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/design/dCVQsxWpKfmww3jwn19H2M/Untitled?node-id=0-1&embed-host=share" allowfullscreen></iframe>

---

## Mapa de Histórias por Sprint

| Sprint / Jornada | Acessar sistema | Administrar usuários | Cadastrar e atualizar residentes | Registrar assistência | Consultar histórico | Encerrar uso |
|---|---|---|---|---|---|---|
| **Sprint 2** | **US08** — Autenticar usuário no sistema | **US10** — Cadastrar usuário | **US01** — Cadastrar dados do residente | — | — | **US09** — Encerrar sessão do usuário |
| **Sprint 3** | — | — | — | **US04** — Registrar, editar e consultar sinais vitais do residente<br>**US05** — Registrar, editar e consultar rotinas assistenciais do residente | **US14** — Consultar histórico de registros do residente | — |
| **Sprint 4** | — | **US11** — Atualizar dados cadastrais do usuário | **US02** — Editar dados pessoais e clínicos do residente | **US06** — Registrar, editar e consultar administração de medicamentos | **US15** — Filtrar histórico por período | — |
| **Sprint 5** | — | **US12** — Redefinir senha de acesso do usuário<br>**US13** — Revogar acesso do usuário | **US03** — Inativar cadastro do residente | **US07** — Registrar, editar e consultar ocorrências clínicas do residente | **US16** — Visualizar resumo assistencial do residente | — |

> **Nota:** As histórias US04, US05, US06 e US07 representam fluxos assistenciais completos. Seus critérios de aceitação detalham os cenários de registro, edição e consulta, mantendo a rastreabilidade com os RFs, a priorização e o cronograma.

---

## Detalhamento das Sprints

### Sprint 2 — Fundação do sistema

A Sprint 2 concentra a base necessária para iniciar o uso do sistema: autenticação, cadastro inicial de usuários, cadastro de residentes e encerramento de sessão.

| User Story | Justificativa |
|---|---|
| **US08 — Autenticar usuário no sistema** | Garante que apenas usuários autorizados possam acessar o sistema. |
| **US10 — Cadastrar usuário** | Permite criar acessos individuais para os membros da equipe. |
| **US01 — Cadastrar dados do residente** | Cria a base mínima de residentes para que os registros assistenciais possam ser feitos. |
| **US09 — Encerrar sessão do usuário** | Evita uso indevido em dispositivos compartilhados. |

---

### Sprint 3 — Registro e consulta assistencial inicial

A Sprint 3 introduz o núcleo assistencial do sistema, permitindo registrar informações essenciais do turno e consultá-las posteriormente.

| User Story | Justificativa |
|---|---|
| **US04 — Registrar, editar e consultar sinais vitais do residente** | Permite registrar dados clínicos básicos e recorrentes do residente. |
| **US05 — Registrar, editar e consultar rotinas assistenciais do residente** | Permite registrar cuidados prestados no turno, substituindo parte do formulário em papel. |
| **US14 — Consultar histórico de registros do residente** | Permite que a equipe acompanhe os registros realizados e utilize as informações para continuidade do cuidado. |

---

### Sprint 4 — Consolidação operacional

A Sprint 4 amplia o uso operacional do sistema, permitindo atualização de cadastros, registro de medicamentos e consulta mais precisa do histórico.

| User Story | Justificativa |
|---|---|
| **US11 — Atualizar dados cadastrais do usuário** | Permite corrigir ou atualizar informações de membros da equipe. |
| **US02 — Editar dados pessoais e clínicos do residente** | Mantém os dados do residente atualizados após o cadastro inicial. |
| **US06 — Registrar, editar e consultar administração de medicamentos** | Amplia o escopo do registro assistencial. |
| **US15 — Filtrar histórico por período** | Facilita a localização de registros em intervalos específicos. |

---

### Sprint 5 — Governança e expansão assistencial

A Sprint 5 fortalece o controle administrativo e amplia os tipos de registros assistenciais disponíveis.

| User Story | Justificativa |
|---|---|
| **US12 — Redefinir senha de acesso do usuário** | Apoia a recuperação de acesso de membros da equipe. |
| **US13 — Revogar acesso do usuário** | Impede que usuários desligados ou não autorizados continuem acessando o sistema. |
| **US03 — Inativar cadastro do residente** | Remove residentes do fluxo operacional ativo sem apagar seu histórico. |
| **US07 — Registrar, editar e consultar ocorrências clínicas do residente** | Permite documentar eventos relevantes observados durante o turno. |
| **US16 — Visualizar resumo assistencial do residente** | Permite obter uma visão geral do estado recente do residente antes de uma intervenção ou reunião clínica. |

---

## Aspectos transversais

Algumas necessidades do sistema não aparecem como histórias isoladas no Story Map, pois afetam várias funcionalidades ao mesmo tempo.

| Aspecto transversal | Como aparece no produto |
|---|---|
| **Operação offline e sincronização** | Deve estar presente principalmente nas funcionalidades de registro assistencial, permitindo uso mesmo em caso de instabilidade de rede. |
| **Rastreabilidade** | Cada registro deve armazenar data, horário e usuário responsável. |
| **Controle de acesso** | Cada perfil deve acessar apenas as funcionalidades compatíveis com sua responsabilidade. |
| **Usabilidade em tablets** | As telas devem priorizar botões, listas e seleção rápida, reduzindo digitação. |
| **Integridade dos registros** | Campos obrigatórios e validações devem reduzir registros incompletos ou inconsistentes. |

Esses aspectos devem ser tratados principalmente como Requisitos Não Funcionais, regras de negócio ou critérios de aceitação associados às User Stories.

---

## Visão resumida por sprint

| Sprint | Objetivo | User Stories |
|---|---|---|
| **Sprint 2** | Criar a base de acesso, usuários e residentes. | US08, US10, US01, US09 |
| **Sprint 3** | Iniciar o ciclo de registro e consulta assistencial. | US04, US05, US14 |
| **Sprint 4** | Consolidar cadastros, medicação e consulta por período. | US11, US02, US06, US15 |
| **Sprint 5** | Ampliar governança, registros assistenciais e visão consolidada. | US12, US13, US03, US07, US16 |

---

## Rastreabilidade das User Stories

| User Story | Persona principal | Atividade da jornada | Sprint |
|---|---|---|---|
| **US01** | Gestor | Cadastrar e atualizar residentes | Sprint 2 |
| **US02** | Gestor | Cadastrar e atualizar residentes | Sprint 4 |
| **US03** | Gestor | Cadastrar e atualizar residentes | Sprint 5 |
| **US04** | Cuidador | Registrar assistência | Sprint 3 |
| **US05** | Cuidador | Registrar assistência | Sprint 3 |
| **US06** | Cuidador | Registrar assistência | Sprint 4 |
| **US07** | Cuidador | Registrar assistência | Sprint 5 |
| **US08** | Usuário autorizado | Acessar sistema | Sprint 2 |
| **US09** | Usuário autorizado | Encerrar uso | Sprint 2 |
| **US10** | Gestor | Administrar usuários | Sprint 2 |
| **US11** | Gestor | Administrar usuários | Sprint 4 |
| **US12** | Gestor | Administrar usuários | Sprint 5 |
| **US13** | Gestor | Administrar usuários | Sprint 5 |
| **US14** | Membro da equipe multidisciplinar | Consultar histórico | Sprint 3 |
| **US15** | Membro da equipe multidisciplinar | Consultar histórico | Sprint 4 |
| **US16** | Membro da equipe multidisciplinar | Consultar histórico | Sprint 5 |

---

## Status de execução das User Stories

Esta seção registra a leitura operacional do Story Map a partir das evidências disponíveis no repositório. A distribuição original das histórias por sprint é preservada, enquanto o status real de implementação fica detalhado na [matriz de MVP implementado e evidenciado](priorizacao.md#101-mvp-implementado-e-evidenciado-por-user-story) e na [aplicação do DoR/DoD por User Story](dor_dod.md#aplicacao-do-dor-por-user-story).

| User Story | Sprint planejada | Status de execução | Evidência principal | Registro |
| --- | :---: | :---: | --- | --- |
| **US08** | Sprint 2 | **Concluída** | [Execução Sprint 2](../sprints/sprint2/execucao.md) e [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | Fluxo de autenticação validado e testado. |
| **US09** | Sprint 2 | **Concluída** | [Review Sprint 2](../sprints/sprint2/review.md) e [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | Logout e limpeza de sessão verificados. |
| **US10** | Sprint 2 | **Concluída** | [Execução Sprint 2](../sprints/sprint2/execucao.md) e [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | Cadastro de usuário e autenticação de usuário recém-cadastrado evidenciados. |
| **US01** | Sprint 2 | **Concluída** | [Execução Sprint 2](../sprints/sprint2/execucao.md) e [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | Cadastro de residente, campos obrigatórios e CPF duplicado testados. |
| **US04** | Sprint 3 | **Concluída no recorte MVP / realocada** | [Review Sprint 3](../sprints/sprint3/review.md), [Planning Sprint 4](../sprints/sprint4/planning.md), [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). | Ficou como débito técnico na Sprint 3 e teve registro, persistência e consulta via histórico tratados na Sprint 4; edição fica como evolução posterior. |
| **US05** | Sprint 3 | **Concluída no recorte MVP / realocada** | [Review Sprint 3](../sprints/sprint3/review.md), [Planning Sprint 4](../sprints/sprint4/planning.md), [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83), [PR #84](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/84) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). | Ficou como débito técnico na Sprint 3 e teve registro, persistência e consulta via histórico tratados na Sprint 4; edição fica como evolução posterior. |
| **US14** | Sprint 3 | **Concluída / realocada** | [Review Sprint 3](../sprints/sprint3/review.md), [Planning Sprint 4](../sprints/sprint4/planning.md), [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). | O PR específico de histórico (#82) foi fechado; a entrega foi absorvida por PRs integrados da Sprint 4. |
| **US11** | Sprint 4 | **Concluída** | [PR #90](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/90) e [PR #93](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/93). | Atualização cadastral de usuário implementada e testada. |
| **US02** | Sprint 4 | **Concluída** | [PR #90](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/90) e [PR #93](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/93). | Edição de residente implementada e testada. |
| **US06** | Sprint 4 | **Concluída** | [PR #91](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/91). | Registro de administração de medicamentos integrado ao fluxo assistencial. |
| **US15** | Sprint 4 | **Concluída** | [PR #92](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/92). | Filtro por período considerado integrado pela equipe no fechamento da Sprint 4. |
| **US12** | Sprint 5 | **Concluída** | [Planning Sprint 5](../sprints/sprint5/planning.md), [Review Sprint 5](../sprints/sprint5/review.md) e [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | Redefinição de senha testada, com invalidação da credencial anterior e bloqueio por perfil. |
| **US13** | Sprint 5 | **Concluída** | [Planning Sprint 5](../sprints/sprint5/planning.md), [Review Sprint 5](../sprints/sprint5/review.md) e [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | Revogação de acesso implementada, impedindo nova sessão e preservando registros históricos. |
| **US03** | Sprint 5 | **Concluída** | [Planning Sprint 5](../sprints/sprint5/planning.md), [Review Sprint 5](../sprints/sprint5/review.md) e [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | Inativação lógica remove residente da lista operacional e preserva histórico assistencial. |
| **US07** | Sprint 5 | **Concluída** | [Planning Sprint 5](../sprints/sprint5/planning.md), [Review Sprint 5](../sprints/sprint5/review.md) e [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | Ocorrências clínicas registradas, consultadas e editadas com rastreabilidade e sinalização de notificação. |
| **US16** | Sprint 5 | **Concluída** | [Planning Sprint 5](../sprints/sprint5/planning.md), [Review Sprint 5](../sprints/sprint5/review.md) e [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | Resumo assistencial consolida últimos registros por módulo e explicita estados vazios. |

---

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 18/05/2026 | 1.0 | Reestruturação do documento de Story Map com foco em jornada do usuário, organização por sprints e rastreabilidade das User Stories revisadas. | Enzo Menali |
| 16/06/2026 | 1.1 | Inclusão das imagens do User Story Mapping como evidência visual do planejamento. | Enzo Menali |
| 28/06/2026 | 1.2 | Ajuste da nota de leitura sobre histórias assistenciais compostas e critérios de aceitação por cenário. | Enzo Menali |
| 28/06/2026 | 1.3 | Realocação da US16 para a Sprint 5 e remoção da Sprint 6 do planejamento. | Enzo Menali |
| 28/06/2026 | 1.4 | Inclusão do status de execução das User Stories com vínculo às evidências, PRs, matriz de priorização e DoR/DoD. | Enzo Menali |
| 02/07/2026 | 1.5 | Ajuste do status de US04 e US05 para concluídas no recorte do MVP, preservando a realocação histórica da Sprint 3 para Sprint 4. | Enzo Menali |
| 02/07/2026 | 1.6 | Atualização do status das User Stories da Sprint 5 com Review, PR #110 e testes automatizados. | Enzo Menali |
