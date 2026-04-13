# 5. Cronograma e Entregas

Considerando a estratégia de desenvolvimento iterativa e incremental (Scrum XP) adotada para o projeto Vital Tech, o cronograma foi estruturado em Sprints de duas semanas. Essa cadência garante o alinhamento contínuo com as entregas acadêmicas exigidas no Plano de Ensino e permite ciclos curtos de feedback com o cliente.

| Sprint | Início | Fim | Objetivo Principal | Entregas Esperadas | Validação do Cliente |
| --- | --- | --- | --- | --- | --- |
| **Sprint 0** | 31/03/2026 | 14/04/2026 | Concepção e Alinhamento | Documento de Visão, Diagrama de Ishikawa, e Backlog Inicial. | Aprovação do escopo focado em prontuário de sinais vitais. |
| **Sprint 1** | 15/04/2026 | 28/04/2026 | Estrutura de Acesso e UX | Repositório (GitHub), Priorização MoSCoW, Configuração do PWA, Tela de Login e Lista de Residentes. | Validação do layout para uso em tablets na beira do leito. |
| **Sprint 2** | 29/04/2026 | 12/05/2026 | Core do Produto (Unidade 2) | Formulário digital de sinais vitais e rotinas de higiene (CRUD Local). | Março Acadêmico: Simulação de preenchimento completo de um plantão. |
| **Sprint 3** | 13/05/2026 | 26/05/2026 | Backend e Persistência | API em FastAPI (Python) integrada ao Banco de Dados MySQL local. | N/A (Validação técnica de integridade de dados). |
| **Sprint 4** | 27/05/2026 | 09/06/2026 | Sincronização (Unidade 3) | Módulo de Service Workers finalizado para operação offline-first. | Teste de queda de Wi-Fi para garantir que os dados não se percam. |
| **Sprint 5** | 10/06/2026 | 23/06/2026 | Monitoramento e Alertas | Histórico clínico no dispositivo e alertas de segurança para sinais vitais anômalos. | Conferência das faixas de alerta com a equipe de enfermagem. |
| **Sprint 6** | 24/06/2026 | 07/07/2026 | Transição e Entrega Final | Conexão ODBC (Access/MySQL) e treinamento para os cuidadores. | Entrega Final: Aceite do usuário e encerramento do uso de papel. |

O cronograma e a distribuição de entregas apresentados foram estruturados estrategicamente para garantir a viabilidade do projeto Vital Tech, equilibrando o rigor da disciplina com a realidade operacional da equipe. A definição das datas e entregas sustenta-se em três pilares fundamentais:

* A cadência das Sprints foi ajustada para sincronizar perfeitamente com o Plano de Ensino da disciplina. O encerramento da Sprint 2 coincide com o prazo de avaliação da Unidade 2, assegurando a entrega e demonstração do "core" funcional do produto (o PWA para coleta de dados). Da mesma forma, a Sprint 4 atende aos prazos da Unidade 3, cobrindo a validação da etapa arquitetural mais complexa do sistema: o módulo de sincronização offline-first.
* O sequenciamento das atividades foi desenhado para evitar a desconexão de código. O desenvolvimento do backend (Sprint 3) ocorre imediatamente após a consolidação do frontend (Sprint 2). Além disso, para assegurar a qualidade do produto sem onerar o quadro de recursos humanos com um papel exclusivo de testes, a equipe adotou a prática de QA Cruzado. Nesta abordagem, os responsáveis pela interface de usuário validam os fluxos da API, enquanto os desenvolvedores de backend testam a usabilidade da interface, garantindo uma cobertura de testes ampla e colaborativa.
* O planejamento prevê a finalização da carga de desenvolvimento na primeira semana de julho. Essa decisão cria uma "janela de respiro", essencial para a homologação técnica, correção de bugs tardios e refinamento da integração legada (ODBC) no cliente. Esta margem de segurança assegura que o produto chegue maduro e estável para o Teste de Aceite do Usuário (UAT) e para a apresentação final.
