# 6. Interação entre Equipe e Cliente

## 6.1 Composição da Equipe
A equipe é composta por cinco membros que exercem os três papéis formais do framework Scrum. Em razão do tamanho reduzido do time, os papéis de Product Owner e Scrum Master são acumulados com a atuação técnica no Time de Desenvolvimento, conforme prática comum em projetos acadêmicos. 
Além disso, todos os membros da equipe são responsáveis pelas atividades de Engenharia de Requisitos (ER), incluindo elicitação, análise, refinamento, validação e rastreabilidade dos requisitos. 


| Papel no Scrum | Descrição | Responsável |
| --- | --- | --- |
| **Product Owner (PO)** | Representa os interesses do cliente, prioriza o conjunto de User Stories e valida requisitos com stakeholders. Atua diretamente na elicitação, refinamento e validação dos requisitos. | Alberto Côrtes |
| **Scrum Master (SM)** | Facilita o processo, remove impedimentos e garante a aplicação das práticas ágeis. Apoia a organização das atividades de Engenharia de Requisitos e garante sua execução contínua.  | Gustavo Xavier |
| **Time de Desenvolvimento** | Equipe responsável pela implementação e também pela Engenharia de Requisitos, incluindo análise, refinamento, prototipação e validação contínua com usuários. | Enzo Menali, Ana Caroline, João Pedro Sampaio |

### Especializações Técnicas do Time de Desenvolvimento

| Especialização | Descrição | Responsável Principal | Apoio |
| --- | --- | --- | --- |
| **Frontend** | Interface do usuário, design e implementação focada em usabilidade no contexto de uso (beira do leito).| Alberto Côrtes (PO) | Ana Caroline |
| **Backend** | Implementação de regras de negócio, processamento de dados e integração com o sistema. | Gustavo Xavier (SM) | Enzo Menali |
| **QA (Qualidade)** | Testes funcionais, validação de requisitos e apoio na verificação e validação contínua.. | Ana Caroline | João Pedro Sampaio |
| **Requisitos / Priorização** | Elicitação, análise, refinamento, escrita de User Stories, definição de critérios de aceitação e validação com stakeholders. | João Pedro Sampaio | Enzo Menali |

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
* **Refinamento de requisitos e priorização:** Contínuo ao longo da sprint, com foco em User Stories, critérios de aceitação, matriz de priorização e protótipos.
* **Monitoria**: Frequência sob demanda, conforme o calendário estipulado pela equipe de monitores da disciplina.

### Frequência de Interações com o Cliente
O envolvimento dos stakeholders ocorre em duas frentes complementares. A diretoria atua na validação estratégica do sistema, participando de reuniões quinzenais de Sprint Review, nas quais são discutidas funcionalidades implementadas e prioridades do produto. Já os cuidadores, enquanto usuários finais, participam da validação prática da solução por meio da avaliação de protótipos, simulações de uso em cenários de plantão e fornecimento de feedback sobre usabilidade e fluxo de registro. 

## 6.3 Processo de Validação
O processo de validação do sistema VitalTech foi estruturado para garantir que o produto atenda às necessidades reais do contexto de uso, mantendo coerência com o escopo de um projeto acadêmico e com as práticas de Engenharia de Requisitos. Inicialmente, antes que qualquer requisito seja incluído em uma sprint, é realizada uma etapa de preparação dos requisitos antes da entrada na sprint, na qual as User Stories precisam estar claramente definidas, com critérios de aceitação compreensíveis e, sempre que possível, acompanhadas de protótipos de baixa ou média fidelidade. Esses protótipos são avaliados junto aos stakeholders, incluindo o diretor da instituição e, quando viável, os cuidadores, assegurando que o fluxo de uso e a disposição das informações estejam alinhados com a realidade do ambiente de trabalho.
Durante o desenvolvimento, a equipe realiza verificações contínuas dos requisitos por meio de implementação incremental, testes frequentes e revisão por pares. Esse processo garante que as funcionalidades desenvolvidas permaneçam consistentes com os requisitos definidos e reduz a ocorrência de erros de interpretação. A validação não é deixada apenas para o final do ciclo, mas ocorre de forma iterativa, permitindo ajustes ao longo do desenvolvimento.
Ao final de cada sprint, ocorre a validação funcional por meio da Sprint Review, na qual um incremento do sistema é apresentado aos stakeholders. Esse incremento representa uma funcionalidade integrada, ainda que simplificada, permitindo que o cliente compreenda seu uso na prática. Nesse momento, são coletados feedbacks que alimentam diretamente o Story Map, a matriz de priorização, as issues e os critérios de aceitação, promovendo refinamento contínuo dos requisitos.
Na etapa final do projeto, é realizada uma validação mais ampla do sistema, com simulação de uso baseada em cenários reais, como o registro de informações de um plantão. Essa validação envolve especialmente os cuidadores, que avaliam a usabilidade e a adequação do sistema ao fluxo de trabalho. O objetivo dessa fase não é a implantação completa da solução, mas sim demonstrar que o MVP atende à principal necessidade identificada, que é apoiar ou substituir o registro manual em papel de forma viável e eficiente.

## 6.4 Feedback Consolidado por Incremento e User Story

A tabela abaixo consolida os feedbacks registrados ao longo do projeto, separando validação de escopo, protótipo, documentação e software funcional. Quando a validação foi feita pelo Product Owner ou pela equipe, isso é indicado explicitamente para não confundir verificação técnica com validação direta do cliente.

| Sprint | Tipo de feedback | US ou incremento avaliado | Cliente / stakeholder | Feedback recebido | Decisão e status | Impacto no projeto | Evidência |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Sprint 0 | Produto e escopo | Problema central, contexto da ILPI e direção da solução. | Marcelo Souza e equipe VitalTech. | O processo manual de registros assistenciais precisava ser apoiado por uma solução digital simples e adequada à rotina da instituição. | **Aprovado com direcionamento.** | Definição do escopo inicial, stakeholders, cenário atual e proposta de solução. | [Reunião de elicitação](../sprints/sprint0/reuniao1.md), [reunião com cliente](../sprints/sprint0/reuniao2.md), [cenário atual](cenario_atual.md) e [solução proposta](solucao_proposta.md). |
| Sprint 1 | Documentação e prototipagem | Primeiras User Stories, requisitos, Story Map e protótipos. | Cliente, PO e equipe. | O produto deveria priorizar telas simples, fluxo direto e uso em tablets/dispositivos móveis. | **Aprovado com ajustes de documentação.** | Refinamento das User Stories, requisitos, prototipagem e DoR inicial. | [Review Sprint 1](../sprints/sprint1/review.md), [User Stories](user_stories.md), [Requisitos](requisitos.md), [Story Map](story_map.md) e [Prototipagem](prototipagem.md). |
| Sprint 2 | Software funcional | US08, US09, US10 e US01. | Product Owner, representando o valor esperado para gestor e cuidador. | Login, cadastro de usuário, cadastro de residente e controle de acesso foram considerados adequados; foi registrada sugestão futura de observações clínicas iniciais no cadastro de residente. | **Aprovado com ressalva.** | Fluxo base mantido no MVP; sugestão tratada como possível refinamento futuro, sem alterar o escopo entregue da Sprint 2. | [Review Sprint 2](../sprints/sprint2/review.md), [Execução Sprint 2](../sprints/sprint2/execucao.md) e [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). |
| Sprint 3 | Processo e planejamento | US04, US05 e US14. | Equipe, PO e cliente acadêmico da disciplina. | As histórias planejadas para o ciclo assistencial não tiveram incremento funcional concluído nem evidência suficiente dentro do período da Sprint 3. | **Ajustes solicitados.** | Registro de débito técnico, realocação para a Sprint 4 e atualização de cronograma, Story Map, DoR/DoD e matriz de priorização. | [Review Sprint 3](../sprints/sprint3/review.md), [Planning Sprint 4](../sprints/sprint4/planning.md), [Cronograma](cronograma.md), [Story Map](story_map.md) e [DoR/DoD](dor_dod.md). |
| Sprint 4 | Software funcional e validação de produto | US04, US05, US14, US11, US02, US06 e US15. | Marcelo Souza, por formulário de validação; equipe e PO por revisão técnica. | O produto foi validado por formulário externo do cliente. A equipe manteve a separação entre validação do produto e status técnico de cada User Story. | **Validado pelo cliente, com status técnico por US.** | US04, US05, US14, US11, US02, US06 e US15 registradas como concluídas no recorte entregue; para US04 e US05, o MVP cobriu registro e consulta via histórico, mantendo edição como evolução posterior. | [Review Sprint 4](../sprints/sprint4/review.md), [registro da validação do cliente](../sprints/sprint4/review.md#validacao-do-cliente), [Matriz de Priorização](priorizacao.md#101-mvp-implementado-e-evidenciado-por-user-story) e PRs da Sprint 4. |
| Sprint 5 | Fechamento técnico do MVP | US12, US13, US03, US07 e US16. | Equipe e PO por revisão técnica. | Não houve nova validação externa do cliente após o formulário da Sprint 4; a Sprint 5 foi verificada tecnicamente por PR, testes automatizados e inspeção dos fluxos implementados. | **Verificada tecnicamente.** | US12, US13, US07 e US16 registradas como concluídas; US03 registrada como incremento adicional fora do recorte formal do MVP. | [Review Sprint 5](../sprints/sprint5/review.md), [Retrospectiva Sprint 5](../sprints/sprint5/retrospectiva.md), [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) e [Matriz de Priorização](priorizacao.md#101-mvp-implementado-e-evidenciado-por-user-story). |

As decisões decorrentes desses feedbacks foram refletidas nos artefatos de rastreabilidade: [User Stories](user_stories.md), [Requisitos](requisitos.md), [Story Map](story_map.md), [Cronograma](cronograma.md), [DoR/DoD](dor_dod.md) e [Matriz de Priorização](priorizacao.md#101-mvp-implementado-e-evidenciado-por-user-story).


---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 10/04/2026 | 1.0 | Finalização e correção do documento para primeira entrega (Seções 1 a 6) para submissão. | Alberto Côrtes, Ana Caroline, Enzo Menali e Gustavo Xavier |
| 12/04/2026 | 1.1 | Últimas alterações nas seções 4 a 6 e seção 10 para submissão | Alberto Côrtes, Ana Caroline, Enzo Menali e Gustavo Xavier |
|13/04/2026 | 1.2 | Lançamento dessa seção no GitPages | Gustavo Xavier |
| 07/05/2026 | 1.3 | Revisão da seção 6, incluindo ajustes no processo de comunicação, definição de responsabilidades em Engenharia de Requisitos, adaptação do Scrum ao contexto acadêmico e reformulação do processo de validação contínua. | Ana Caroline|
| 01/07/2026 | 1.4 | Consolidação dos feedbacks por incremento e User Story, incluindo validação do cliente via formulário. | Enzo Menali |
| 02/07/2026 | 1.5 | Ajuste do registro de validação da Sprint 4 para refletir US04 e US05 como concluídas no recorte do MVP. | Enzo Menali |
| 02/07/2026 | 1.6 | Inclusão da Sprint 5 como verificação técnica final do MVP, separada da validação externa do cliente. | Enzo Menali |



---
