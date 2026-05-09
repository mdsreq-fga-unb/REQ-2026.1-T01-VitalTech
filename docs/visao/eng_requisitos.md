# 4. Engenharia de Requisitos

## 4.1 Atividades e Técnicas de ER
Esta seção descreve as práticas adotadas para garantir que os requisitos do sistema VitalTech sejam descobertos, analisados, documentados e validados ao longo do projeto, assegurando alinhamento contínuo entre as necessidades do Lar dos Velhinhos e a solução técnica proposta.

### Elicitação e Descoberta
* **Entrevistas Semiestruturadas**: Utilizadas nas conversas com o diretor Marcelo Souza e, quando possível, com os cuidadores, para compreender as dores e necessidades da instituição, coletando insumos para escrever histórias de usuário alinhadas à rotina assistencial real.
* **Análise de Documentos**: Aplicada no estudo dos prontuários em papel, planilhas e formulários utilizados pelos cuidadores, permitindo mapear os campos obrigatórios de sinais vitais (PA, glicemia, temperatura) e rotinas assistenciais (higiene, hidratação, medicação), evidenciando a necessidade de campos de seleção rápida (click-based).
* **Observação Passiva (Etnografia Leve)**: Acompanhamento do fluxo de trabalho dos cuidadores na beira do leito para compreender como fatores como alta rotatividade e pressão de tempo impactam a qualidade dos dados coletados. Retomada no planejamento de cada sprint para refinar requisitos específicos de usabilidade.

### Análise e Consenso
* **Matriz SWOT por Requisito**: Técnica aplicada para analisar cada requisito ou conjunto de requisitos sob quatro dimensões, Forças, Fraquezas, Oportunidades e Ameaças, fundamentando a priorização com base no valor assistencial e nos riscos técnicos. Por exemplo, o módulo offline-first representa uma força diante da infraestrutura instável do asilo (oportunidade), mas exige esforço técnico elevado (fraqueza) e pode atrasar entregas se mal dimensionado (ameaça).
* **Análise de Custo-Benefício**: Avaliação complementar para estimar o esforço técnico de cada requisito frente ao valor entregue, apoiando decisões quando dois requisitos possuem análises SWOT semelhantes.
* **Reuniões de Negociação e Alinhamento**: Sessões com os stakeholders para resolver conflitos identificados na análise SWOT, como a tensão entre o desejo por funcionalidades administrativas completas e a viabilidade da arquitetura offline-first dentro do prazo do semestre.
* **Walkthrough**: Utilizado na revisão dos requisitos, apresentando histórias de usuário à equipe para validação e consenso interno, assegurando o alinhamento de todos com os objetivos definidos antes de cada sprint.

### Declaração de Requisitos
* **Histórias de Usuário (User Stories)**: Descrição das necessidades sob a perspectiva dos perfis identificados, promovendo a colaboração da equipe para refinar e ajustar as histórias conforme evolui a compreensão do problema. Exemplo: "Como cuidador, eu quero registrar a temperatura do idoso em dois cliques, para que eu possa focar no atendimento direto ao residente."
* **Critérios de Aceitação**: Definição das condições que precisam ser satisfeitas para que cada história seja considerada concluída, como a obrigatoriedade de sincronização dos dados ao detectar conexão Wi-Fi.

### Representação de Requisitos
* **Wireframes**: Produção de esboços de telas para dispositivos tablet, apresentados ao cliente para validação prévia das funcionalidades antes da implementação, facilitando o alinhamento sobre o layout click-based.
* **Sketches**: Criação de representações visuais rápidas e simples produzidas durante sessões de alinhamento da equipe, promovendo o entendimento compartilhado sobre soluções propostas e apoiando o detalhamento das histórias de usuário.

### Verificação e Validação de Requisitos
* **Definition of Ready (DoR)**: Aplicada para confirmar que os itens do backlog estão suficientemente definidos e prontos para serem desenvolvidos durante o Sprint Planning, garantindo que não haja ambiguidades antes do início da implementação.
* **INVEST**: Utilizado como critério interno do DoR, validando se cada história de usuário está escrita de forma a permitir seu desenvolvimento de maneira independente, negociável, valiosa, estimável, pequena e testável.
* **Definition of Done (DoD)**: Utilizado para verificar se a entrega realizada pode ser apresentada ao cliente, avaliando se cada história de usuário atende aos critérios estabelecidos de conclusão e às regras clínicas da instituição.
* **Feedback do Cliente**: Técnica central na Sprint Review, onde as funcionalidades desenvolvidas são apresentadas ao cliente para validação e ajuste, garantindo que o produto esteja alinhado com as expectativas e com a rotina real dos cuidadores.
* **Walkthrough (com a equipe)**: Realizado ao final de cada sprint, com a equipe, para rever como a sprint foi conduzida, identificar pontos de melhoria no processo de ER e ajustar a forma de coletar e especificar requisitos nas próximas iterações.

### Organização e Atualização de Requisitos
* **DEEP**: Técnica aplicada na organização do backlog, garantindo que ele esteja Detalhado, Emergente, Estimável e Priorizado, viabilizando o desenvolvimento contínuo e sustentável ao longo das sprints.
* **Reuniões de Revisão**: Aplicadas para coletar feedback da equipe sobre os requisitos, ajustando e melhorando o backlog conforme necessário ao longo do desenvolvimento.
* **Organização do Backlog**: Mantida por meio das técnicas DEEP e da Matriz de Rastreabilidade, assegurando que os requisitos estejam atualizados, bem estruturados e priorizados de acordo com o valor assistencial e a viabilidade técnica. A rastreabilidade cobre a cadeia completa: Objetivos Específicos (OE) → Características do Produto (CP) → Requisitos Funcionais e Não Funcionais     (RF/RNF) → US → Critérios de Aceitação → Entrega/Sprint.

## 4.2 Engenharia de Requisitos e o Processo ScrumXP
A tabela a seguir mapeia como as atividades de Engenharia de Requisitos (ER) serão executadas ao longo das fases do processo ScrumXP adotado pela equipe, garantindo rastreabilidade desde a concepção do produto até a validação contínua com o cliente.

| Fases do ScrumXP | Atividades da ER | Prática | Técnica | Resultados Esperados |
| --- | --- | --- | --- | --- |
| **Planejamento da Release** | Elicitação e Descoberta | Levantamento de Requisitos | Entrevistas Semiestruturadas, Análise de Domínio | Visão clara do fluxo de rotina atual e mapeamento dos campos vitais obrigatórios. |
| | Análise e Consenso | Priorização de Requisitos | Priorização MoSCoW | Requisitos vitais isolados e escopo limitado conforme acordado. |
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


---