# 5. Cronograma e Entregas

Considerando a estratégia ScrumXP, iterativa e incremental, o cronograma foi estruturado em sprints com entregas funcionais associadas às User Stories planejadas no Story Map do projeto. Cada sprint buscou entregar uma fatia funcional do sistema que pudesse ser demonstrada, verificada pela equipe e validada com o cliente quando houvesse evidência externa disponível.

O sequenciamento das sprints segue a jornada principal do usuário no sistema: acesso, cadastros, registros assistenciais, consulta de histórico, governança de acesso e visão consolidada do residente.

## Cronograma Consolidado

| Sprint | Período | Objetivo principal | Entregas esperadas | Atividades de ER na sprint | Evidência de resultado |
| --- | --- | --- | --- | --- | --- |
| **Sprint 0** | 31/03/2026 a 02/05/2026 | Compreender o problema e alinhar o escopo inicial com o cliente. | Identificação das dores do cliente, definição inicial do escopo, cenário atual, solução proposta e registros de reunião. | Entrevistas semiestruturadas, análise do contexto, identificação de stakeholders e discussão inicial da solução. | [Reunião 1](../sprints/sprint0/reuniao1.md), [Reunião 2](../sprints/sprint0/reuniao2.md), [Cenário Atual](cenario_atual.md) e [Solução Proposta](solucao_proposta.md). |
| **Sprint 1** | 03/05/2026 a 16/05/2026 | Estruturar requisitos, User Stories, protótipos e documentação inicial. | Requisitos iniciais, primeiras User Stories, prototipagem, documentação MkDocs e DoR inicial. | Brainstorm, escrita e revisão inicial de User Stories, aplicação inicial de DoR e atualização da rastreabilidade. | [Planning](../sprints/sprint1/planning.md), [Dailys](../sprints/sprint1/dailys.md), [Review](../sprints/sprint1/review.md), [Retrospectiva](../sprints/sprint1/retrospectiva.md) e [User Stories](user_stories.md). |
| **Sprint 2** | 17/05/2026 a 30/05/2026 | Criar a base de acesso, usuários, residentes e encerramento de sessão. | US08, US09, US10 e US01. Fluxo demonstrável: login, cadastro de usuário, cadastro de residente e logout. | Refinamento do escopo da sprint, DoR das histórias, revisão dos critérios de aceitação e atualização da rastreabilidade. | [Planning](../sprints/sprint2/planning.md), [Execução](../sprints/sprint2/execucao.md), [Review](../sprints/sprint2/review.md), [Retrospectiva](../sprints/sprint2/retrospectiva.md) e [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). |
| **Sprint 3** | 31/05/2026 a 13/06/2026 | Iniciar o ciclo de registro e consulta assistencial. | US04, US05 e US14 planejadas para sinais vitais, rotinas assistenciais e histórico. | Revisão dos critérios de aceitação, validação dos campos assistenciais, análise dos RNFs aplicáveis e registro do débito técnico. | [Planning](../sprints/sprint3/planning.md), [Dailys](../sprints/sprint3/dailys.md), [Review](../sprints/sprint3/review.md) e [Retrospectiva](../sprints/sprint3/retrospectiva.md). A sprint foi encerrada com débito técnico. |
| **Sprint 4** | 14/06/2026 a 27/06/2026 | Recuperar o débito técnico da Sprint 3 e consolidar cadastros, medicação e filtro de histórico. | US04, US05 e US14 realocadas; US11, US02, US06 e US15 como escopo da Sprint 4. | Replanejamento das histórias realocadas, revisão dos critérios de aceitação, DoR/DoD e atualização do Story Map, matriz de priorização e rastreabilidade. | [Planning](../sprints/sprint4/planning.md), [Review](../sprints/sprint4/review.md), [Retrospectiva](../sprints/sprint4/retrospectiva.md), PRs [#83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83), [#84](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/84), [#85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85), [#90](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/90), [#91](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/91), [#92](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/92) e [#93](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/93). |
| **Sprint 5** | 28/06/2026 a 01/07/2026 | Finalizar governança de acesso, inativação, ocorrências clínicas e resumo assistencial. | US12, US13, US03, US07 e US16. | Refinamento final dos critérios de aceitação, revisão de RNFs, aplicação de DoR/DoD e registro da verificação técnica final. | [Planning](../sprints/sprint5/planning.md), [Review](../sprints/sprint5/review.md), [Retrospectiva](../sprints/sprint5/retrospectiva.md), [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) e 51 testes automatizados aprovados. |

## Replanejamento após a Sprint 3

A Sprint 3 foi encerrada com débito técnico porque as histórias US04, US05 e US14 não tiveram incremento funcional concluído dentro do período de 31/05/2026 a 13/06/2026. Para preservar a rastreabilidade, as histórias não foram renumeradas: o status histórico permaneceu registrado na Sprint 3, e a execução foi realocada para a Sprint 4.

Na Sprint 4, o MVP cobriu o recorte de registro, persistência, validação e consulta via histórico para US04 e US05. A edição de registros assistenciais permanece registrada como evolução posterior do produto, sem alterar a rastreabilidade das histórias originais.

## Execução Geral do Projeto

| Marco | Status | Observação |
| --- | --- | --- |
| Fechamento da Unidade 3 | **43%** | Percentual histórico registrado antes da recuperação do débito técnico. Considerava as entregas consolidadas até a Sprint 2 e a Sprint 3 encerrada com débito técnico. |
| Fechamento técnico das User Stories do MVP | **100% do escopo funcional final planejado e evidenciado** | As histórias do MVP foram implementadas ou registradas no recorte entregue, com PRs, testes, reviews, prints e rastreabilidade. O percentual se refere às User Stories do MVP final da disciplina; RN-01/RNF09 e a edição de registros assistenciais permanecem como evolução técnica posterior, sem impedir a demonstração do MVP. |

## Status Real por User Story

| Sprint | User Story | Status real | Evidência | Observação |
| --- | --- | :---: | --- | --- |
| Sprint 2 | [US08](user_stories.md#us08), [US09](user_stories.md#us09), [US10](user_stories.md#us10) e [US01](user_stories.md#us01). | **Concluídas** | [Execução Sprint 2](../sprints/sprint2/execucao.md), [Review Sprint 2](../sprints/sprint2/review.md) e [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | Fluxo base de login, logout, cadastro de usuário e cadastro de residente implementado. |
| Sprint 3 | [US04](user_stories.md#us04), [US05](user_stories.md#us05) e [US14](user_stories.md#us14). | **Débito técnico / realocadas** | [Review Sprint 3](../sprints/sprint3/review.md) e [Retrospectiva Sprint 3](../sprints/sprint3/retrospectiva.md). | Não houve incremento funcional concluído dentro do período da sprint. |
| Sprint 4 | [US04](user_stories.md#us04) e [US05](user_stories.md#us05). | **Concluídas no recorte MVP** | [Review Sprint 4](../sprints/sprint4/review.md), [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83), [PR #84](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/84) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). | Recorte entregue: registro, persistência, validação e consulta via histórico; edição fica como evolução posterior. |
| Sprint 4 | [US14](user_stories.md#us14), [US11](user_stories.md#us11), [US02](user_stories.md#us02), [US06](user_stories.md#us06) e [US15](user_stories.md#us15). | **Concluídas** | [Review Sprint 4](../sprints/sprint4/review.md) e PRs da Sprint 4. | Histórico, edição cadastral, medicamentos e filtro por período foram integrados ao produto. |
| Sprint 5 | [US12](user_stories.md#us12), [US13](user_stories.md#us13), [US07](user_stories.md#us07) e [US16](user_stories.md#us16). | **Concluídas tecnicamente** | [Review Sprint 5](../sprints/sprint5/review.md), [Retrospectiva Sprint 5](../sprints/sprint5/retrospectiva.md) e [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | Governança de acesso, ocorrências clínicas e resumo assistencial implementados e testados. |
| Sprint 5 | [US03](user_stories.md#us03). | **Concluída como incremento adicional** | [Review Sprint 5](../sprints/sprint5/review.md) e [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | Implementada fora do recorte formal do MVP definido na matriz de priorização. |

## 5.1 Evidências de Execução e Resultados

| Sprint | Evidências de Engenharia de Software | Evidências de Engenharia de Requisitos | Resultado evidenciado |
| --- | --- | --- | --- |
| **Sprint 0** | [Reunião de alinhamento com o monitor](../sprints/sprint0/reuniao3.md) e definição da estratégia ScrumXP. | [Reunião de elicitação](../sprints/sprint0/reuniao1.md), [reunião com cliente](../sprints/sprint0/reuniao2.md), [cenário atual](cenario_atual.md) e [solução proposta](solucao_proposta.md). | Problema, contexto operacional, restrições do cliente e escopo inicial definidos. |
| **Sprint 1** | [Planning](../sprints/sprint1/planning.md), [Dailys](../sprints/sprint1/dailys.md), [Review](../sprints/sprint1/review.md), [Retrospectiva](../sprints/sprint1/retrospectiva.md), [gravação da Review](../assets/videos/sprint1_review.mp4) e [gravação da Retrospectiva](../assets/videos/sprint1_retrospective.mp4). | [Requisitos](requisitos.md), [User Stories](user_stories.md), [DoR/DoD](dor_dod.md) e [Story Map](story_map.md). | Requisitos iniciais, primeiras User Stories, protótipos e DoR registrados. |
| **Sprint 2** | [Planning](../sprints/sprint2/planning.md), [Execução](../sprints/sprint2/execucao.md), [Review](../sprints/sprint2/review.md), [Retrospectiva](../sprints/sprint2/retrospectiva.md) e [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | [User Stories](user_stories.md), [Requisitos](requisitos.md), [DoR/DoD](dor_dod.md) e [Story Map](story_map.md). | Fluxo base de acesso e cadastros implementado e verificado. |
| **Sprint 3** | [Planning](../sprints/sprint3/planning.md), [Dailys](../sprints/sprint3/dailys.md), [Review](../sprints/sprint3/review.md) e [Retrospectiva](../sprints/sprint3/retrospectiva.md). | [User Stories](user_stories.md), [Requisitos](requisitos.md), [DoR/DoD](dor_dod.md) e [Story Map](story_map.md). | Débito técnico identificado e realocado para a Sprint 4. |
| **Sprint 4** | [Planning](../sprints/sprint4/planning.md), [Review](../sprints/sprint4/review.md), [Retrospectiva](../sprints/sprint4/retrospectiva.md) e PRs vinculados às histórias da sprint. | [User Stories](user_stories.md), [Requisitos](requisitos.md), [DoR/DoD](dor_dod.md), [Story Map](story_map.md) e [matriz de priorização](priorizacao.md#101-mvp-implementado-e-evidenciado-por-user-story). | Recuperação do débito técnico da Sprint 3, consolidação de cadastros, medicamentos, filtro e validação do produto por formulário. |
| **Sprint 5** | [Planning](../sprints/sprint5/planning.md), [Review](../sprints/sprint5/review.md), [Retrospectiva](../sprints/sprint5/retrospectiva.md), [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) e testes automatizados. | [User Stories](user_stories.md), [Requisitos](requisitos.md), [DoR/DoD](dor_dod.md), [Story Map](story_map.md) e [matriz de priorização](priorizacao.md#101-mvp-implementado-e-evidenciado-por-user-story). | Fechamento técnico do MVP, governança de acesso, ocorrências clínicas e resumo assistencial. |

A situação por User Story do MVP está detalhada na [matriz de priorização](priorizacao.md#101-mvp-implementado-e-evidenciado-por-user-story), preservando este cronograma como visão de planejamento, execução e evidências por sprint.

---

# Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 03/04/2026 | 1.0 | Criação do documento de cronograma e entregas. | Alberto Côrtes, João Pedro Sampaio, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 10/04/2026 | 1.1 | Finalização e correção do documento para primeira entrega. | Alberto Côrtes, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 12/04/2026 | 1.2 | Ajustes no cronograma para melhor sincronização com o Plano de Ensino. | Alberto Côrtes |
| 13/04/2026 | 1.3 | Correção de ambiguidades de ER, distinção entre verificação e validação e ajustes arquiteturais PWA. | Gustavo Xavier, Alberto Côrtes |
| 23/05/2026 | 1.4 | Reestruturação do cronograma para alinhamento com o Story Map oficial. | Enzo Menali |
| 05/06/2026 | 1.5 | Atualização do status das sprints e inclusão de evidências de execução. | Enzo Menali |
| 15/06/2026 | 1.6 | Correção do escopo cadastral da Sprint 2 e ampliação das referências às evidências disponíveis. | Enzo Menali |
| 16/06/2026 | 1.7 | Inclusão do percentual histórico de execução da Unidade 3, encerramento da Sprint 3 com débito técnico e realocação operacional das US04, US05 e US14. | Enzo Menali |
| 28/06/2026 | 1.8 | Remoção da Sprint 6 do cronograma e realocação da US16 para a Sprint 5. | Enzo Menali |
| 01/07/2026 | 1.9 | Inclusão do status real por User Story, evidências da Sprint 4 e registro da validação do cliente por formulário. | Enzo Menali |
| 02/07/2026 | 2.0 | Ajuste do status de US04 e US05 para concluídas no recorte do MVP. | Enzo Menali |
| 02/07/2026 | 2.1 | Registro da Sprint 5 como concluída tecnicamente, com Review, Retrospectiva, PR #110 e testes automatizados. | Enzo Menali |
| 02/07/2026 | 2.2 | Consolidação do cronograma em tabela única, remoção de duplicidade e separação entre percentual histórico da Unidade 3 e status final do MVP. | Enzo Menali |
