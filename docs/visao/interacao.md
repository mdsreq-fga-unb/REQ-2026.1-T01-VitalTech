# 6. Interação entre Equipe e Cliente

## 6.1 Composição da Equipe
A equipe é composta por cinco membros que exercem os três papéis formais do framework Scrum. Em razão do tamanho reduzido do time, os papéis de Product Owner e Scrum Master são acumulados com a atuação técnica no Time de Desenvolvimento, conforme prática comum em projetos acadêmicos. 
Além disso, todos os membros da equipe são responsáveis pelas atividades de Engenharia de Requisitos (ER), incluindo elicitação, análise, refinamento, validação e rastreabilidade dos requisitos. 


| Papel no Scrum | Descrição | Responsável |
| --- | --- | --- |
| **Product Owner (PO)** | Representa os interesses do cliente, gerencia e prioriza o Product Backlog e valida requisitos com stakeholders. Atua diretamente na elicitação, refinamento e validação dos requisitos. | Alberto Côrtes |
| **Scrum Master (SM)** | Facilita o processo, remove impedimentos e garante a aplicação das práticas ágeis. Apoia a organização das atividades de Engenharia de Requisitos e garante sua execução contínua.  | Gustavo Xavier |
| **Time de Desenvolvimento** | Equipe responsável pela implementação e também pela Engenharia de Requisitos, incluindo análise, refinamento, prototipação e validação contínua com usuários. | Enzo Menali, Ana Caroline, João Pedro Sampaio |

### Especializações Técnicas do Time de Desenvolvimento

| Especialização | Descrição | Responsável Principal | Apoio |
| --- | --- | --- | --- |
| **Frontend** | Interface do usuário, design e implementação focada em usabilidade no contexto de uso (beira do leito).| Alberto Côrtes (PO) | Ana Caroline |
| **Backend** | Implementação de regras de negócio, processamento de dados e integração com o sistema. | Gustavo Xavier (SM) | Enzo Menali |
| **QA (Qualidade)** | Testes funcionais, validação de requisitos e apoio na verificação e validação contínua.. | Ana Caroline | João Pedro Sampaio |
| **Requisitos / Backlog** | Elicitação, análise, refinamento, escrita de User Stories, definição de critérios de aceitação e validação com stakeholders. | João Pedro Sampaio | Enzo Menali |

## 6.2 Estratégia de Comunicação e Validação
Para garantir transparência, alinhamento contínuo e aderência às práticas de Engenharia de Requisitos, a equipe adota uma estratégia de comunicação integrada com validação iterativa junto aos stakeholders, incluindo diretoria e cuidadores (usuários finais). 


### Ferramentas de Comunicação
* **Microsoft Teams**: Será utilizado primariamente para a realização de reuniões síncronas entre os membros da equipe de desenvolvimento e para os encontros periódicos de acompanhamento com a monitoria da disciplina. A ferramenta suportará o alinhamento arquitetural, o Pair Programming (prática do XP) e as discussões de decisões técnicas.
* **Google Meet**: Ambiente designado para as reuniões formais com o cliente (diretor Marcelo Souza), especialmente nas etapas de Sprint Review e planejamento de entregas. Essas reuniões permitirão o compartilhamento de tela para a validação das interfaces do PWA, coleta formal de feedback e alinhamento do impacto operacional no Lar dos Velhinhos.
* **WhatsApp**: Comunicação assíncrona diária, utilizada tanto para alinhamento interno da equipe quanto para elicitação contínua e esclarecimento rápido de dúvidas com o cliente. 


### Métodos e Frequência de Reuniões
A cadência de reuniões seguirá os ritos do framework Scrum, adaptados à realidade acadêmica:
* **Reuniões de Planejamento e Revisão (Sprint Planning e Review)**: Quinzenais (a cada 2 semanas), marcando o início e o fim de cada ciclo de desenvolvimento.
* **Acompanhamento Técnico (Status reports assíncronos)**: Diário, via grupo de WhatsApp da equipe, onde cada membro reporta o que fez, o que fará e se há impedimentos técnicos.
* **Refinamento de Backlog:**: Contínuo ao longo da sprint, com foco em requisitos e protótipos.
* **Monitoria**: Frequência sob demanda, conforme o calendário estipulado pela equipe de monitores da disciplina.

### Frequência de Interações com o Cliente
O envolvimento dos stakeholders ocorre em duas frentes complementares. A diretoria atua na validação estratégica do sistema, participando de reuniões quinzenais de Sprint Review, nas quais são discutidas funcionalidades implementadas e prioridades do produto. Já os cuidadores, enquanto usuários finais, participam da validação prática da solução por meio da avaliação de protótipos, simulações de uso em cenários de plantão e fornecimento de feedback sobre usabilidade e fluxo de registro. 

## 6.3 Processo de Validação
O processo de validação do sistema VitalTech foi estruturado para garantir que o produto atenda às necessidades reais do contexto de uso, mantendo coerência com o escopo de um projeto acadêmico e com as práticas de Engenharia de Requisitos. Inicialmente, antes que qualquer requisito seja incluído em uma sprint, é realizada uma etapa de preparação dos requisitos antes da entrada na sprint, na qual as User Stories precisam estar claramente definidas, com critérios de aceitação compreensíveis e, sempre que possível, acompanhadas de protótipos de baixa ou média fidelidade. Esses protótipos são avaliados junto aos stakeholders, incluindo o diretor da instituição e, quando viável, os cuidadores, assegurando que o fluxo de uso e a disposição das informações estejam alinhados com a realidade do ambiente de trabalho.
Durante o desenvolvimento, a equipe realiza verificações contínuas dos requisitos por meio de implementação incremental, testes frequentes e revisão por pares. Esse processo garante que as funcionalidades desenvolvidas permaneçam consistentes com os requisitos definidos e reduz a ocorrência de erros de interpretação. A validação não é deixada apenas para o final do ciclo, mas ocorre de forma iterativa, permitindo ajustes ao longo do desenvolvimento.
Ao final de cada sprint, ocorre a validação funcional por meio da Sprint Review, na qual um incremento do sistema é apresentado aos stakeholders. Esse incremento representa uma funcionalidade integrada, ainda que simplificada, permitindo que o cliente compreenda seu uso na prática. Nesse momento, são coletados feedbacks que alimentam diretamente o Product Backlog, promovendo refinamento contínuo dos requisitos.
Na etapa final do projeto, é realizada uma validação mais ampla do sistema, com simulação de uso baseada em cenários reais, como o registro de informações de um plantão. Essa validação envolve especialmente os cuidadores, que avaliam a usabilidade e a adequação do sistema ao fluxo de trabalho. O objetivo dessa fase não é a implantação completa da solução, mas sim demonstrar que o MVP atende à principal necessidade identificada, que é apoiar ou substituir o registro manual em papel de forma viável e eficiente.


---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 10/04/2026 | 1.0 | Finalização e correção do documento para primeira entrega (Seções 1 a 6) para submissão. | Alberto Côrtes, Ana Caroline, Enzo Menali e Gustavo Xavier |
| 12/04/2026 | 1.1 | Últimas alterações nas seções 4 a 6 e seção 10 para submissão | Alberto Côrtes, Ana Caroline, Enzo Menali e Gustavo Xavier |
|13/04/2026 | 1.2 | Lançamento dessa seção no GitPages | Gustavo Xavier |
| 07/05/2026 | 1.3 | Revisão da seção 6, incluindo ajustes no processo de comunicação, definição de responsabilidades em Engenharia de Requisitos, adaptação do Scrum ao contexto acadêmico e reformulação do processo de validação contínua. | Ana Caroline|



---