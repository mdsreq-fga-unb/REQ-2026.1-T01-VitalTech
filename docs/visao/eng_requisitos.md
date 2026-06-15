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
* **Critérios de Aceitação**: Para cada funcionalidade, definimos as condições que devem ser satisfeitas para que o requisito seja considerado "pronto", como a obrigatoriedade de sincronização dos dados ao detectar conexão Wi-Fi.
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
A tabela a seguir mapeia como as atividades de Engenharia de Requisitos (ER) serão executadas ao longo das fases do processo ScrumXP adotado pela equipe, garantindo rastreabilidade desde a concepção do produto até a validação contínua com o cliente.

| Fases do ScrumXP | Atividades da ER | Prática | Técnica | Resultados Esperados |
| --- | --- | --- | --- | --- |
| **Planejamento da Release** | Elicitação e Descoberta | Levantamento de Requisitos | Entrevistas Semiestruturadas, Brainstorm e Análise de Documentos | Visão inicial do problema, das personas, das funcionalidades esperadas e dos pontos de refinamento do produto, mantendo rastreabilidade com os registros disponíveis. |
| | Análise e Consenso | Priorização de Requisitos | Matriz Valor × Esforço | Requisitos de maior valor e menor esforço identificados e priorizados para o escopo do produto. |
| | Declaração | Registro dos Requisitos | User Stories e Critérios de Aceitação | Necessidades dos cuidadores documentadas com foco em usabilidade no tablet. |
| **Planejamento da Sprint** | Elicitação e Descoberta | Refinamento de Requisitos | Brainstorm | User Stories refinadas antes da entrada no ciclo de desenvolvimento. |
| | Verificação e Validação | Avaliação de Prontidão | DoR e checklist de verificação | Clareza, consistência, critérios de aceitação e dependências verificados internamente, com a prontidão das User Stories validada pela equipe ([Sprint Dois](../sprints/sprint2/resumo.md)). |
| | Análise e Consenso | Análise de Dependências | Reuniões de Negociação técnica | Consenso sobre a viabilidade da arquitetura offline-first para as histórias da sprint. |
| | Declaração | Definição de Critérios de Aceitação | Critérios detalhados no formato Dado / Quando / Então | User Stories com critérios claros e verificáveis, alinhados às necessidades da instituição. |
| | Organização e Atualização | Refinamento do Mapa de Histórias | Revisão do User Story Map | User Stories revisadas, priorizadas e distribuídas nas sprints conforme a jornada do usuário ([Sprint Dois](../sprints/sprint2/resumo.md)). |
| **Execução da Sprint** | Representação | Criação de Protótipos | Prototipagem de Baixa/Média Fidelidade | Telas focadas em botões de seleção rápida (click-based) para guiar o desenvolvimento. |
| | Verificação e Validação | Validação Técnica Interna | Checklist de Verificação | Garantia de que as regras clínicas estão corretas antes da codificação final ([Sprint Dois](../sprints/sprint2/resumo.md)). |
| | Organização e Atualização | Gestão de Rastreabilidade | Matriz de Rastreabilidade | Story Map e rastreabilidade atualizados para refletir descobertas técnicas durante a programação ([Sprint Dois](../sprints/sprint2/resumo.md)). |
| **Revisão da Sprint** | Verificação e Validação | Demonstração ao Cliente | Revisão de Prototipagem / Teste de Usabilidade | Funcionalidades de prontuário validadas diretamente com a diretoria e cuidadores. |
| | Declaração | Atualização de User Stories | Incorporar Feedback | User stories ajustadas com base nos testes de uso real no "chão de fábrica". |
| **Retrospectiva da Sprint** | Análise e Organização | Revisão do Processo | Discussões em Grupo | Ajustes na forma de coletar requisitos com o cliente para aprimorar a próxima iteração. |


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


---
