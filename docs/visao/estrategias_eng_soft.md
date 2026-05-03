# 3. Estratégias de Engenharia de Software

## 3.1 Estratégia Priorizada
* **Abordagem de Desenvolvimento de Software:** Ágil
* **Ciclo de vida:** Ágil/Adaptativo
* **Processo de Engenharia de Software:** Scrum XP

## 3.2 Quadro Comparativo
A tabela a seguir compara dois processos ágeis de desenvolvimento de software, com o objetivo de esclarecer as características de cada um e justificar a escolha mais adequada no contexto da disciplina e do projeto VitalTech.

| Características | Scrum com práticas de XP (ScrumXP) | FDD (Feature Driven Development) |
| --- | --- | --- |
| **Abordagem Geral** | Abordagem ágil, iterativa e incremental, organizada em sprints, com foco em entregas frequentes, feedback contínuo e incorporação de práticas técnicas de qualidade oriundas do XP. | Processo ágil orientado a funcionalidades (features), estruturado em cinco atividades: desenvolvimento de modelo geral, lista de features, planejamento por feature, design por feature e construção por feature. |
| **Foco em Estruturação do Trabalho** | Possui estrutura de trabalho bem definida, com backlog priorizado, planejamento de sprint, reuniões de acompanhamento, revisão e retrospectiva. Essa organização favorece maior previsibilidade e acompanhamento do progresso. | Organiza o trabalho em torno de uma lista de features priorizadas, decompostas em entregas de no máximo duas semanas. O planejamento é orientado por funcionalidades de negócio, o que facilita a comunicação com o cliente. |
| **Estrutura de Processos** | O desenvolvimento ocorre em ciclos curtos e regulares (sprints), permitindo entregas incrementais e validação frequente com os stakeholders. A combinação com XP acrescenta disciplina técnica ao processo. | O desenvolvimento segue cinco processos bem definidos e sequenciais dentro de cada feature, garantindo rastreabilidade e controle. Cada feature é projetada, revisada e construída de forma disciplinada. |
| **Flexibilidade de Requisitos** | Oferece flexibilidade para mudanças, especialmente entre sprints, mantendo maior estabilidade durante a execução de cada ciclo. Isso permite equilíbrio entre adaptação e organização. | Apresenta menor flexibilidade para mudanças durante o ciclo de uma feature, pois o processo de design e construção é planejado previamente. Mudanças são incorporadas nas próximas iterações de features. |
| **Colaboração com Cliente** | Envolve participação frequente do cliente ou stakeholders, especialmente nas revisões de sprint e nas interações de refinamento do backlog, garantindo alinhamento constante com o valor esperado. | A colaboração com o cliente ocorre principalmente nas fases iniciais (modelo geral e lista de features) e nas entregas de cada feature, com menos cerimônias formais de validação intermediária. |
| **Complexidade do Método** | Mais estruturado e mais completo, por combinar gestão ágil com práticas técnicas de engenharia. Exige maior disciplina da equipe e melhor organização dos papéis e atividades. | Também estruturado, com papéis definidos (Chief Architect, Chief Programmer, Feature Teams), mas com foco mais restrito à entrega de funcionalidades, sem incorporar explicitamente práticas técnicas como TDD. |
| **Processo** | Combina a estrutura de gerenciamento do Scrum com práticas de XP, como TDD, refatoração, integração contínua e valorização da comunicação entre os membros da equipe. | Estruturado em cinco processos: modelagem de domínio, lista de features, planejamento por feature, design por feature e build por feature. O foco é garantir que cada funcionalidade seja entregue com qualidade e rastreabilidade. |
| **Qualidade Técnica** | Alta ênfase na qualidade técnica, pois incorpora práticas do XP voltadas à construção de software mais confiável, testável e de melhor manutenção ao longo do tempo. | Prezar pela qualidade do design antes da implementação, com revisões de design obrigatórias por feature. Porém, não prescreve práticas de teste automatizado ou refatoração contínua como o XP. |
| **Práticas de Desenvolvimento** | Inclui práticas como testes automatizados, refatoração contínua, integração contínua, programação em par e desenvolvimento orientado a testes, promovendo maior robustez do produto. | Utiliza modelagem de objetos, inspeções de design e desenvolvimento orientado a features. Não define práticas técnicas tão detalhadas quanto o XP, mas exige rigor no processo de design. |
| **Adaptação ao Projeto** | Mostra-se adequado para projetos que necessitam de organização, acompanhamento frequente, evolução incremental e maior preocupação com a qualidade técnica da solução desenvolvida. | Mostra-se adequado para projetos de médio a grande porte com escopo bem definido em termos de funcionalidades, onde a rastreabilidade por feature e a divisão em equipes especializadas são vantajosas. |
| **Documentação** | Trabalha com documentação enxuta, porém suficiente para apoiar backlog, critérios de aceitação, acompanhamento das entregas e comunicação entre equipe e stakeholders. | Gera artefatos orientados a features, como lista de features, plano de projeto e relatórios de progresso por feature, mantendo rastreabilidade clara entre requisitos e entregáveis. |
| **Controle de Qualidade** | O controle de qualidade está embutido tanto na cadência do Scrum quanto nas práticas técnicas do XP, permitindo validações frequentes e prevenção de defeitos ao longo do desenvolvimento. | O controle de qualidade ocorre por meio de revisões de design obrigatórias antes da implementação de cada feature, garantindo que problemas sejam identificados antes da codificação. |
| **Escalabilidade** | Pode ser aplicado em equipes pequenas e médias com bom nível de coordenação, especialmente quando se busca equilíbrio entre gestão, colaboração e qualidade técnica. | Projetado para escalar bem em projetos maiores, com múltiplas equipes de feature coordenadas por Chief Programmers, sendo eficaz em contextos com grande volume de funcionalidades a desenvolver. |
| **Suporte a Equipes de Desenvolvimento** | Oferece maior suporte organizacional para a equipe, com papéis, eventos e práticas mais claramente definidas, o que facilita o acompanhamento do trabalho e das responsabilidades. | Define papéis específicos orientados à entrega de features (Chief Architect, Chief Programmer, Domain Expert, Feature Teams), proporcionando uma estrutura clara de responsabilidades por funcionalidade. |

## 3.3 Justificativa
A escolha pela abordagem Ágil, operando sob um ciclo de vida Iterativo e Incremental, fundamenta-se na natureza do projeto VitalTech. Dentre os processos ágeis considerados, o FDD (Feature Driven Development) foi avaliado como alternativa ao ScrumXP. Embora o FDD seja um processo estruturado e orientado a funcionalidades, ele apresenta menor flexibilidade para mudanças durante o ciclo de uma feature, colaboração menos frequente com o cliente e ausência de práticas técnicas explícitas como TDD e integração contínua. Para um projeto de pequeno porte, com equipe reduzida, cliente acessível e necessidade constante de validação, o ScrumXP se mostra mais adequado. Com base nas características do projeto e nos desafios enfrentados pelo Lar dos Velhinhos, a utilização do ScrumXP se justifica pelos seguintes motivos:

* **Flexibilidade e adaptação às necessidades do cliente**: Diferentemente do FDD, que planeja o design da feature antes da implementação e absorve mudanças apenas nas próximas iterações, o ScrumXP permite ajustes contínuos nos requisitos entre sprints. Isso é essencial para um projeto que envolve contato direto com o cliente e possibilidade de mudanças frequentes ao longo do desenvolvimento.
* **Entregas graduais e validação constante**: O desenvolvimento incremental em sprints possibilita a entrega de funcionalidades em etapas e revisões formais com o cliente, ao contrário do FDD, que prevê validação principalmente no início (modelo geral e lista de features). Isso facilita a identificação de melhorias e garante que o produto final esteja alinhado com a rotina dos usuários.
* **Foco na experiência do usuário e qualidade técnica**: O ScrumXP incorpora práticas do XP — como TDD, refatoração e programação em par — que o FDD não prescreve. Considerando que o sistema será utilizado por cuidadores com diferentes níveis de familiaridade com tecnologia, garantir qualidade técnica e usabilidade desde as primeiras entregas é fundamental.
* **Adequação ao porte da equipe**: O FDD define papéis especializados (Chief Architect, Chief Programmer, Feature Teams) mais adequados a projetos de médio e grande porte. O ScrumXP é mais leve nesse aspecto e se adapta melhor ao contexto de uma equipe pequena e multidisciplinar como a do VitalTech.




---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 03/04/2026 | 1.0 | Criação do documento (Seções 1 a 2.3) para submissão da proposta. | Alberto Côrtes, João Pedro Sampaio, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 10/04/2026 | 1.1 | Finalização e correção do documento para primeira entrega (Seções 1 a 6) para submissão. | Alberto Côrtes, Ana Carolina, Enzo Menali e Gustavo Xavier |
|13/04/2026 | 1.2 | Lançamento dessa seção no GitPages | Gustavo Xavier |
| 03/05/2026 | 1.3 | Correção do quadro comparativo: substituição do Kanban pelo FDD, que é um processo ágil de ER, conforme apontado pelo professor (issues #10 e #11). Reescrita da seção 3.3 para citar o FDD como alternativa considerada e rejeitada, eliminando a inconsistência com o quadro comparativo. | Gustavo Xavier |




---
