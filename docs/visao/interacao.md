# 6. Interação entre Equipe e Cliente

## 6.1 Composição da Equipe
A equipe de desenvolvimento será composta por:

| Papel | Descrição | Responsável | Participantes |
| --- | --- | --- | --- |
| **Gerente de Projeto** | Coordena o projeto, garante a comunicação entre cliente e equipe, controla prazos e entregas. | Alberto Côrtes | - |
| **Desenvolvedor Frontend** | Responsável pela interface do usuário, design e implementação das funcionalidades no lado do cliente. | Alberto | Ana Carolina |
| **Desenvolvedor Backend** | Implementa a lógica de negócios, integração com banco de dados e APIs. | Gustavo | Enzo |
| **Analista de QA** | Garante a qualidade do produto, executando testes de funcionalidade, performance e usabilidade. | Ana Carolina | João Pedro |
| **Analista de Requisitos** | Define os requisitos funcionais e não funcionais do sistema e garante que eles sejam atendidos. | João Pedro | Enzo |

## 6.2 Estratégia de Comunicação e Validação
Para assegurar a transparência, o engajamento dos stakeholders e o alinhamento contínuo com as restrições metodológicas da disciplina, a equipe estabeleceu um plano de comunicação ágil e um rigoroso fluxo de validação clínica e técnica.

### Ferramentas de Comunicação
* **Microsoft Teams**: Será utilizado primariamente para a realização de reuniões síncronas entre os membros da equipe de desenvolvimento e para os encontros periódicos de acompanhamento com a monitoria da disciplina. A ferramenta suportará o alinhamento arquitetural, o Pair Programming (prática do XP) e as discussões de decisões técnicas.
* **Google Meet**: Ambiente designado para as reuniões formais com o cliente (diretor Marcelo Souza), especialmente nas etapas de Sprint Review e planejamento de entregas. Essas reuniões permitirão o compartilhamento de tela para a validação das interfaces do PWA, coleta formal de feedback e alinhamento do impacto operacional no Lar dos Velhinhos.
* **WhatsApp**: Canal oficial para comunicação assíncrona diária. Será subdividido em fluxos:
    * **Interno**: Acompanhamento diário da equipe (substituindo a Daily Scrum tradicional por status reports assíncronos) e contatos rápidos com o monitor.
    * **Externo**: Elicitação contínua com o cliente. Servirá para sanar dúvidas rápidas de regras de negócio sem a necessidade de aguardar uma reunião formal.

### Métodos e Frequência de Reuniões
A cadência de reuniões seguirá os ritos do framework Scrum, adaptados à realidade acadêmica:
* **Reuniões de Planejamento e Revisão (Sprint Planning e Review)**: Quinzenais (a cada 2 semanas), marcando o início e o fim de cada ciclo de desenvolvimento.
* **Acompanhamento Técnico (Status reports assíncronos)**: Diário, via grupo de WhatsApp da equipe, onde cada membro reporta o que fez, o que fará e se há impedimentos técnicos.
* **Monitoria**: Frequência sob demanda, conforme o calendário estipulado pela equipe de monitores da disciplina.

### Frequência de Interações com o Cliente
O envolvimento de Marcelo Souza e da equipe do Lar dos Velhinhos ocorrerá em duas frentes para otimizar o tempo da diretoria (que é voluntária):
* **Interações de Alto Nível (A cada 15 dias)**: Reuniões de Sprint Review (via Google Meet ou presencial) para apresentar o software funcional, demonstrar o preenchimento dos prontuários e garantir que o produto mitiga a dor raiz (fluxo manual de papel).
* **Interações de Baixo Nível (Sob Demanda)**: Comunicação via WhatsApp para validar critérios de aceitação específicos durante a execução da Sprint.

## 6.3 Processo de Validação
O processo de validação da solução garante que o VitalTech atenda às exigências técnicas acadêmicas e às necessidades reais dos cuidadores, operando sob o rigor das práticas do ScrumXP. Este fluxo é estruturado em 4 etapas principais:

1. **Validação de Entrada (Definition of Ready - DoR)**: Antes que qualquer requisito seja puxado para a Sprint Backlog, ele passa por uma etapa de concepção rigorosa. A User Story deve possuir critérios de aceitação claros e, primariamente, protótipos de baixa ou média fidelidade aprovados pelo cliente. Isso garante que a usabilidade e a disposição dos campos (click-based) estejam validadas com a realidade dos cuidadores antes de a equipe escrever qualquer linha de código.
2. **Validação Técnica no Desenvolvimento (TDD e QA Cruzado)**: Durante a execução, a qualidade técnica é assegurada pela abordagem orientada a testes (TDD - Test-Driven Development), garantindo a robustez da API (FastAPI) ao tratar dados clínicos e alertas de sinais vitais. Ao finalizar uma implementação, o código passa pelo QA Cruzado (revisão por pares entre front e back) e pela verificação do módulo de sincronização offline-first.
3. **Validação Funcional e de Saída (Definition of Done - DoD)**: Ao final de cada ciclo quinzenal, o incremento só é considerado "Pronto" (atingindo o DoD) se estiver implantado em ambiente de staging (homologação), com o código versionado no GitHub sem bugs impeditivos e após a simulação de um plantão real (inserção de dados simulados) ter sido validada clinicamente pelo cliente na Sprint Review.
4. **Teste de Aceite do Usuário (UAT) e Entrega Final**: Na última Sprint, o sistema será implantado On-Premise no servidor local do Lar dos Velhinhos. O cliente e os cuidadores farão a validação final diretamente no ambiente de produção (com o banco MySQL estruturado e o acesso via Microsoft Access configurado via ODBC). O processo culmina com a descontinuação oficial do uso de pranchetas físicas.
