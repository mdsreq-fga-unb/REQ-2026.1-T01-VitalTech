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

| Fase do Processo | Atividade de ER | Prática | Técnica | Resultado Esperado |
| --- | --- | --- | --- | --- |
| **Captura e Representação** (Antes da primeira sprint) | Elicitação e Descoberta | Conversa com o cliente (Entrevista com diretor e cuidadores) | Entrevistas Semiestruturadas | Entender a dor do cliente e capturar necessidades direto da fonte. |
| | Elicitação e Descoberta | Análise de documentos existentes (prontuários e formulários em papel) | Análise de Documentos | Mapear campos obrigatórios e rotinas assistenciais que precisam ser digitalizados. |
| | Elicitação e Descoberta | Observação da rotina de cuidado (Acompanhamento na beira do leito) | Observação Passiva / Etnografia Leve | Compreender o contexto real de uso e identificar restrições de usabilidade. |
| | Organização e Atualização | Estruturação dos requisitos (Organização hierárquica) | Histórias de Usuário por perfil (cuidador, equipe multidisciplinar, diretoria) | Requisitos estruturados de forma compreensível para toda a equipe. |
| **Priorização e Refinamento** (Planejamento da Release) | Análise e Consenso | Priorização de requisitos (Análise por dimensões estratégicas) | Matriz SWOT por Requisito + Análise de Custo-Benefício | Requisitos priorizados com base em valor assistencial, esforço técnico e riscos identificados. |
| | Análise e Consenso | Revisão interna dos requisitos (Apresentação à equipe para validação) | Walkthrough | Consenso interno sobre histórias, critérios de aceitação e escopo da release. |
| | Declaração | Detalhamento inicial (Escrita de histórias por perfil de usuário) | Histórias de Usuário + Critérios de Aceitação | Backlog inicial com histórias claras e critérios mensuráveis. |
| | Organização e Atualização | Organização do backlog (Aplicação do critério DEEP) | DEEP | Backlog detalhado, emergente, estimável e priorizado para o início do desenvolvimento. |
| | Verificação e Validação | Revisão de completude e consistência dos requisitos da release | Checklist de Verificação Interna | Confirmação de que os requisitos da release estão completos, sem ambiguidades e alinhados aos objetivos específicos do produto antes do início do desenvolvimento. |
| **Compromisso e Planejamento** (Sprint Planning) | Verificação e Validação | Validação de prontidão (Checagem de critérios de entrada) | Definition of Ready (DoR) | Confirmação de que os itens do backlog estão bem definidos e prontos para desenvolvimento. |
| | Verificação e Validação | Validação da qualidade da história (Critério interno do DoR) | INVEST | Cada US validada como independente, negociável, valiosa, estimável, pequena e testável. |
| | Organização e Atualização | Refinamento do backlog da sprint (Grooming focado no ciclo atual) | DEEP | Itens prioritários no formato que permite desenvolvimento imediato. |
| | Representação  | Prototipagem Inicial  | Wireframes / Sketches | Esboços das interfaces validados com o cliente antes de a história do usuário entrar para a fila de codificação. |
| **Execução da Sprint** | Representação | Criação de protótipos para guiar o desenvolvimento | Wireframes de Baixa/Média Fidelidade  | Telas click-based que orientam a implementação e são validadas com o cliente antes da codificação final. |
| | Análise e Consenso | Alinhamento técnico incremental (Resolução de conflitos surgidos durante o desenvolvimento) | Reuniões de Negociação — dailies assíncronas via WhatsApp | Resolução ágil de conflitos técnicos ou de requisitos que surgem durante a codificação, mantendo as decisões alinhadas ao backlog e aos critérios de aceitação. |
| | Verificação e Validação | Verificação técnica interna dos requisitos implementados | Checklist de Verificação Interna (regras clínicas e validações em tempo real) | Garantia de que as regras clínicas e os critérios de aceitação estão corretamente implementados antes da entrega na Sprint Review. |
| | Organização e Atualização | Gestão de rastreabilidade durante o desenvolvimento | Atualização da Matriz de Rastreabilidade (OE → CP → RF/RNF → US → Critério → Sprint) | Backlog e rastreabilidade atualizados para refletir descobertas técnicas realizadas durante a codificação. |
| **Validação e Feedback** (Sprint Review) | Verificação e Validação | Verificação da entrega (Checagem dos critérios de conclusão) | Definition of Done (DoD) | Confirmação de que a US desenvolvida atende aos critérios estabelecidos e pode ser apresentada. |
| | Verificação e Validação | Apresentação ao cliente (Demonstração das funcionalidades entregues) | Feedback do Cliente | Validação com o cliente de que o incremento atende à necessidade assistencial real. |
| | Declaração | Atualização de histórias com base no feedback recebido | Incorporação de Feedback (negociação com cliente) | Histórias ajustadas com base nos testes de uso real no contexto assistencial. |
| | Organização e Atualização | Atualização e repriorização do backlog pós-review | Revisão e repriorização do Backlog com base no feedback da sprint | Backlog atualizado com novas descobertas e ajustes de prioridade, pronto para o planejamento do próximo ciclo. |
| **Adaptação** (Retrospectiva) | Verificação e Validação | Feedback da equipe sobre o processo (Revisão crítica da sprint) | Walkthrough | Identificação de pontos de melhoria no processo de ER para a próxima iteração. |
| | Organização e Atualização | Ajuste do backlog e rastreabilidade (Atualização pós-retrospectiva) | Reuniões de Revisão + Matriz de Rastreabilidade | Backlog e rastreabilidade atualizados para refletir aprendizados e mudanças de escopo. |

### Observações Adicionais:

* O Walkthrough aparece em dois momentos distintos: como técnica de Análise e Consenso (revisão interna pela equipe antes da sprint) e como técnica de Verificação e Validação na Retrospectiva (revisão do processo ao final do ciclo). São usos complementares da mesma técnica.
* A Observação Passiva (Etnografia Leve) é retomada no planejamento para refinar requisitos de usabilidade.
* Uma User Story (US) é uma forma de descrever uma funcionalidade do sistema sempre a partir da perspectiva de quem a vai usar (o utilizador final), e não do ponto de vista técnico do programador.


---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 10/04/2026 | 1.0 | Finalização e correção do documento para primeira entrega (Seções 1 a 6) para submissão. | Alberto Côrtes, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 12/04/2026 | 1.1 | Últimas alterações nas seções 4 a 6 e seção 10 para submissão | Alberto Côrtes, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 13/04/2026 | 1.2 | Lançamento dessa seção no GitPages | Gustavo Xavier |
| 09/05/2026 | 1.3 | Reformulação das seções 4.1 - Atividades e Técnicas de ER e 4.2 - Engenharia de Requisitos e o Processo ScrumXP (issues #12 e #14); Adição de Backlog como técnica; Ajuste terminológico em Sprint 1 (issues #13 e #15) | Alberto Côrtes, Ana Carolina |


---