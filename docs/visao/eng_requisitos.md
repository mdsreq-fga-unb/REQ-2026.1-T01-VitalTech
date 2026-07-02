# 4. Engenharia de Requisitos

## 4.1 Atividades e Técnicas de ER
Nesta seção, descrevemos as práticas adotadas para garantir que os requisitos do sistema VitalTech sejam descobertos, analisados, documentados e validados, assegurando o alinhamento entre a necessidade clínica do Lar dos Velhinhos e a solução técnica proposta.

### Elicitação e Descoberta
* **Entrevistas Semiestruturadas**: Reuniões realizadas com o diretor da instituição elucidam os desafios enfrentados diariamente na gestão de uma organização social e sem fim lucrativos voltada ao acolhimento de idosos, servindo como base para as funcionalidades que serão implementadas no produto final. Os acompanhamentos visam identificar os objetivos de negócio, servindo como base para as funcionalidades de monitoramento preventivo.
* **Brainstorm**: Sessões internas utilizadas para levantar, discutir e refinar funcionalidades iniciais a partir do problema apresentado pelo cliente e das necessidades identificadas pela equipe.
* **Análise de Documentos**: Revisão dos registros de reuniões com o cliente e dos artefatos derivados, como Regras de Negócio, requisitos e critérios de aceitação, para preservar a origem das decisões e apoiar a rastreabilidade. A técnica considera apenas documentos e registros disponíveis no repositório, sem pressupor acesso a prontuários físicos.


### Análise e Consenso
* **Matriz Valor × Esforço**: Técnica de priorização utilizada para classificar os requisitos em dois eixos — o valor entregue ao usuário e o esforço técnico de implementação — permitindo que a equipe identifique os itens de maior impacto e menor custo para compor o escopo prioritário do produto.
* **Reuniões de Negociação**: Sessões de alinhamento com os stakeholders para resolver conflitos entre o desejo de funcionalidades administrativas complexas e a viabilidade técnica de uma arquitetura offline-first no prazo do semestre.

### Declaração de Requisitos
* **User Stories (Histórias de Usuário)**: Descrição das necessidades sob a ótica dos perfis identificados. Exemplo: "Como cuidador, eu quero registrar a temperatura do idoso em dois cliques, para que eu possa focar no atendimento direto ao residente".
* **Critérios de Aceitação**: Para cada funcionalidade, definimos as condições que devem ser satisfeitas para que o requisito seja considerado "pronto", incluindo preservação local dos dados, tentativa de sincronização.
* **Definition of Ready (DoR)**: Checklist usado para verificar internamente a clareza, a consistência, o valor, os critérios de aceitação e as dependências de uma User Story, além de validar, pela equipe, se ela possui condições mínimas para entrar em uma sprint.

### Representação de Requisitos
* **Prototipagem de Baixa e Média Fidelidade**: Criação de telas (wireframes) focadas na interface de tablets. Esta representação visual é crucial para validar com o cliente se o layout dos botões está adequado para usuários com diferentes níveis de familiaridade tecnológica.

### Verificação e Validação de Requisitos
* **Checklist de Verificação**: Revisão técnica dos requisitos para garantir que não existam ambiguidades, inconsistências ou requisitos genéricos (como os apontados anteriormente pelo professor).
* **Validação por Prototipagem**: Apresentação das telas do sistema ao Marcelo Souza para confirmar se a lógica de registro de saúde reflete fielmente o protocolo da instituição, garantindo que o software realmente resolva o problema da "inviabilidade do acompanhamento preventivo".

### Organização e Atualização de Requisitos
* **User Story Mapping**: Organização visual das funcionalidades do sistema em dois eixos — a jornada do usuário (eixo horizontal) e a prioridade de implementação (eixo vertical) — permitindo visualizar o produto, distribuir as User Stories por sprint e manter o planejamento atualizado.
* **Refinamento do Mapa de Histórias**: Atividade contínua de revisão das User Stories, de seus critérios de aceitação, prioridades, dependências e distribuição por sprint no Story Map. Novos detalhes identificados durante o projeto são incorporados ao mapa sem perder a rastreabilidade entre requisitos, histórias e entregas planejadas.
* **Matriz de Rastreabilidade Simples**: Mapeamento que conecta cada requisito à sua origem (entrevista, documento ou lei regulatória), permitindo entender o impacto de qualquer mudança solicitada pelo cliente ao longo do semestre.

## 4.2 Engenharia de Requisitos e o Processo ScrumXP
A tabela a seguir mapeia como as atividades de Engenharia de Requisitos (ER) foram executadas ao longo do ScrumXP adotado pela equipe, garantindo rastreabilidade desde a concepção do produto até a validação e o fechamento técnico do MVP.

| Fase do ScrumXP | Atividades de ER | Técnicas aplicadas | Evidências registradas |
| --- | --- | --- | --- |
| **Planejamento inicial / release** | Elicitação, descoberta, análise e consenso sobre o problema. | Entrevistas semiestruturadas, brainstorm, análise de documentos e matriz Valor × Esforço. | [Reunião de elicitação](../sprints/sprint0/reuniao1.md), [reunião de alinhamento](../sprints/sprint0/reuniao2.md), [cenário atual](cenario_atual.md), [solução proposta](solucao_proposta.md) e [matriz de priorização](priorizacao.md). |
| **Planejamento das sprints** | Refinamento de User Stories, critérios de aceitação, dependências, DoR e relação com RFs/RNFs. | DoR, INVEST, critérios Dado/Quando/Então e análise de dependências. | [Planning Sprint 2](../sprints/sprint2/planning.md), [Planning Sprint 3](../sprints/sprint3/planning.md), [Planning Sprint 4](../sprints/sprint4/planning.md), [Planning Sprint 5](../sprints/sprint5/planning.md) e [DoR/DoD](dor_dod.md). |
| **Execução das sprints** | Atualização de requisitos, ajustes de escopo, rastreabilidade e verificação técnica dos critérios planejados. | Checklist de verificação, revisão por pares, análise de inconsistências e atualização do Story Map. | [Story Map](story_map.md), [requisitos](requisitos.md), [MVP implementado e evidenciado](priorizacao.md#101-mvp-implementado-e-evidenciado-por-user-story), [Review Sprint 4](../sprints/sprint4/review.md) e [Review Sprint 5](../sprints/sprint5/review.md). |
| **Revisão das sprints** | Validação do incremento, separação entre validação do cliente e verificação técnica, e registro de decisões de replanejamento. | Sprint Review, validação por formulário, inspeção dos fluxos implementados e análise dos PRs. | [Review Sprint 2](../sprints/sprint2/review.md), [Review Sprint 3](../sprints/sprint3/review.md), [Review Sprint 4](../sprints/sprint4/review.md), [Review Sprint 5](../sprints/sprint5/review.md) e [interação equipe-cliente](interacao.md). |
| **Retrospectiva e melhoria contínua** | Registro de lições aprendidas, problemas de rastreabilidade, dívida técnica e ações de melhoria. | Retrospectiva, análise de causa, revisão documental e plano de ação. | [Retrospectiva Sprint 3](../sprints/sprint3/retrospectiva.md), [Retrospectiva Sprint 4](../sprints/sprint4/retrospectiva.md), [Retrospectiva Sprint 5](../sprints/sprint5/retrospectiva.md) e [lições aprendidas](licoes_aprendidas.md). |

## 4.3 Evidências de Execução de ER por Sprint

| Sprint | Atividades de ER evidenciadas | Artefatos relacionados |
| --- | --- | --- |
| **Sprint 0** | Elicitação inicial, compreensão do problema, restrições do cliente e definição de oportunidade. | [Reunião 1](../sprints/sprint0/reuniao1.md), [Reunião 2](../sprints/sprint0/reuniao2.md), [cenário atual](cenario_atual.md) e [solução proposta](solucao_proposta.md). |
| **Sprint 1** | Levantamento inicial de requisitos, prototipagem, refinamento de RFs/RNFs e estruturação de DoR/DoD. | [Planning Sprint 1](../sprints/sprint1/planning.md), [Review Sprint 1](../sprints/sprint1/review.md), [requisitos](requisitos.md), [user stories](user_stories.md) e [DoR/DoD](dor_dod.md). |
| **Sprint 2** | Aplicação de DoR/DoD, verificação de critérios de aceitação e validação do fluxo base de acesso/cadastros. | [Planning Sprint 2](../sprints/sprint2/planning.md), [execução Sprint 2](../sprints/sprint2/execucao.md), [Review Sprint 2](../sprints/sprint2/review.md) e [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). |
| **Sprint 3** | Identificação de débito técnico, realocação de US04, US05 e US14 e atualização de rastreabilidade. | [Planning Sprint 3](../sprints/sprint3/planning.md), [Review Sprint 3](../sprints/sprint3/review.md), [Retrospectiva Sprint 3](../sprints/sprint3/retrospectiva.md) e [cronograma](cronograma.md). |
| **Sprint 4** | Replanejamento do débito técnico, validação do cliente, atualização do status do MVP e refinamento do recorte de US04/US05. | [Planning Sprint 4](../sprints/sprint4/planning.md), [Review Sprint 4](../sprints/sprint4/review.md), [matriz de priorização](priorizacao.md#101-mvp-implementado-e-evidenciado-por-user-story) e [Story Map](story_map.md#status-de-execução-das-user-stories). |
| **Sprint 5** | Fechamento técnico do MVP, verificação de critérios de aceite, atualização de DoR/DoD e registro de incrementos finais. | [Planning Sprint 5](../sprints/sprint5/planning.md), [Review Sprint 5](../sprints/sprint5/review.md), [Retrospectiva Sprint 5](../sprints/sprint5/retrospectiva.md), [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) e [DoR/DoD](dor_dod.md#aplicação-do-dod-por-user-story). |


---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 10/04/2026 | 1.0 | Finalização e correção do documento para primeira entrega (Seções 1 a 6) para submissão. | Alberto Côrtes, Ana Caroline, Enzo Menali e Gustavo Xavier |
| 12/04/2026 | 1.1 | Últimas alterações nas seções 4 a 6 e seção 10 para submissão | Alberto Côrtes, Ana Caroline, Enzo Menali e Gustavo Xavier |
|13/04/2026 | 1.2 | Lançamento dessa seção no GitPages | Gustavo Xavier |
| 18/05/2026 | 1.3 | Correções: remoção da Observação Passiva (não realizada), substituição da Priorização MoSCoW por Matriz Valor × Esforço e do Product Backlog por User Story Mapping. | Gustavo Xavier |
| 05/06/2026 | 1.4 | Ajuste das técnicas do processo de ER para manter apenas práticas com evidência registrada, explicitando Brainstorm e DoR. | Enzo Menali |
| 12/06/2026 | 1.5 | Inclusão da Análise de Documentos com escopo rastreável e explicitação do DoR como atividade de verificação e validação da prontidão das User Stories. | Enzo Menali |
| 14/06/2026 | 1.6 | Reclassificação do User Story Mapping como atividade de organização e atualização e substituição do refinamento de backlog pelo refinamento do mapa de histórias. | Enzo Menali |
| 02/07/2026 | 1.7 | Atualização do processo de ER com evidências executadas nas Sprints 0 a 5 e fechamento técnico do MVP. | Enzo Menali |


---
