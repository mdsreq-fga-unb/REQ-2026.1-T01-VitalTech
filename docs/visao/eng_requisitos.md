# 4. Engenharia de Requisitos

## 4.1 Atividades e Técnicas de ER
Nesta seção, descrevemos as práticas adotadas para garantir que os requisitos do sistema VitalTech sejam descobertos, analisados, documentados e validados, assegurando o alinhamento entre a necessidade clínica do Lar dos Velhinhos e a solução técnica proposta.

### Elicitação e Descoberta
* **Entrevistas Semiestruturadas**: Reuniões realizadas com o diretor da instituição elucidam os desafios enfrentados diariamente na gestão de uma organização social e sem fim lucrativos voltada ao acolhimento de idosos, servindo como base para as funcionalidades que serão implementadas no produto final. Os acompanhamentos visam identificar os objetivos de negócio, servindo como base para as funcionalidades de monitoramento preventivo.
* **Análise de Documentos**: Estudo aprofundado das planilhas e prontuários de papel utilizados pelos cuidadores. Esta técnica permitiu mapear os campos obrigatórios de sinais vitais (PA, Glicemia, Temperatura) e rotinas (higiene, hidratação), evidenciando a complexidade do registro manual e a necessidade de campos de seleção rápida (click-based).


### Análise e Consenso
* **Matriz Valor × Esforço**: Técnica de priorização utilizada para classificar os requisitos em dois eixos — o valor entregue ao usuário e o esforço técnico de implementação — permitindo que a equipe identifique os itens de maior impacto e menor custo para compor o escopo prioritário do produto.
* **Reuniões de Negociação**: Sessões de alinhamento com os stakeholders para resolver conflitos entre o desejo de funcionalidades administrativas complexas e a viabilidade técnica de uma arquitetura offline-first no prazo do semestre.

### Declaração de Requisitos
* **User Stories (Histórias de Usuário)**: Descrição das necessidades sob a ótica dos perfis identificados. Exemplo: "Como cuidador, eu quero registrar a temperatura do idoso em dois cliques, para que eu possa focar no atendimento direto ao residente".
* **Critérios de Aceitação**: Para cada funcionalidade, definimos as condições que devem ser satisfeitas para que o requisito seja considerado "pronto", como a obrigatoriedade de sincronização dos dados ao detectar conexão Wi-Fi.

### Representação de Requisitos
* **User Story Mapping**: Mapeamento visual das funcionalidades do sistema organizado em dois eixos — a jornada do usuário (eixo horizontal) e a prioridade de implementação (eixo vertical) — permitindo visualizar o produto completo e planejar entregas incrementais por sprints.
* **Prototipagem de Baixa e Média Fidelidade**: Criação de telas (wireframes) focadas na interface de tablets. Esta representação visual é crucial para validar com o cliente se o layout dos botões está adequado para usuários com diferentes níveis de familiaridade tecnológica.

### Verificação e Validação de Requisitos
* **Checklist de Verificação**: Revisão técnica dos requisitos para garantir que não existam ambiguidades, inconsistências ou requisitos genéricos (como os apontados anteriormente pelo professor).
* **Validação por Prototipagem**: Apresentação das telas do sistema ao Marcelo Souza para confirmar se a lógica de registro de saúde reflete fielmente o protocolo da instituição, garantindo que o software realmente resolva o problema da "inviabilidade do acompanhamento preventivo".

### Organização e Atualização de Requisitos
* **Refinamento do Backlog**: Atividade contínua de revisão e detalhamento dos itens do backlog a cada Sprint. Isso permite que novos detalhes descobertos durante o desenvolvimento (como uma nova regra da Vigilância Sanitária) sejam incorporados sem perder a integridade do projeto.
* **Matriz de Rastreabilidade Simples**: Mapeamento que conecta cada requisito à sua origem (entrevista, documento ou lei regulatória), permitindo entender o impacto de qualquer mudança solicitada pelo cliente ao longo do semestre.

## 4.2 Engenharia de Requisitos e o Processo ScrumXP
A tabela a seguir mapeia como as atividades de Engenharia de Requisitos (ER) serão executadas ao longo das fases do processo ScrumXP adotado pela equipe, garantindo rastreabilidade desde a concepção do produto até a validação contínua com o cliente.

| Fases do ScrumXP | Atividades da ER | Prática | Técnica | Resultados Esperados |
| --- | --- | --- | --- | --- |
| **Planejamento da Release** | Elicitação e Descoberta | Levantamento de Requisitos | Entrevistas Semiestruturadas, Análise de Domínio | Visão clara do fluxo de rotina atual e mapeamento dos campos vitais obrigatórios. |
| | Análise e Consenso | Priorização de Requisitos | Matriz Valor × Esforço | Requisitos de maior valor e menor esforço identificados e priorizados para o escopo do produto. |
| | Declaração | Registro dos Requisitos | User Stories e Critérios de Aceitação | Necessidades dos cuidadores documentadas com foco em usabilidade no tablet. |
| **Planejamento da Sprint** | Elicitação e Descoberta | Refinamento de Requisitos | Etnografia Leve, Comunicação via WhatsApp | Requisitos específicos (ex: limites de alertas de saúde) refinados para o ciclo atual. |
| | Análise e Consenso | Análise de Dependências | Reuniões de Negociação técnica | Consenso sobre a viabilidade da arquitetura offline-first para as histórias da sprint. |
| | Declaração | Definição de Critérios de Aceitação | Critérios Detalhados (Definition of Ready) | User stories com critérios claros alinhados aos protocolos de saúde da instituição. |
| | Organização e Atualização | Refinamento do Backlog | Grooming do Backlog | Requisitos priorizados e preparados para o desenvolvimento imediato. |
| **Execução da Sprint** | Representação | Criação de Protótipos | Prototipagem de Baixa/Média Fidelidade | Telas focadas em botões de seleção rápida (click-based) para guiar o desenvolvimento. |
| | Verificação e Validação | Validação Técnica Interna | Checklist de Verificação | Garantia de que as regras clínicas estão corretas antes da codificação final. |
| | Organização e Atualização | Gestão de Rastreabilidade | Matriz de Rastreabilidade | Backlog atualizado para refletir descobertas técnicas durante a programação. |
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


---