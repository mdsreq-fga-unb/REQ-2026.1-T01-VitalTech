# 2. Solução Proposta

## 2.1 Objetivo Geral do Produto
Desenvolver uma aplicação responsiva para Tablet e Mobile (celular) voltada para o registro estruturado dos sinais vitais e rotinas de saúde dos 74 idosos do Lar dos Velhinhos, substituindo os atuais prontuários de papel. A solução deve enviar os dados coletados de forma segura para o servidor da instituição, garantindo confiabilidade e disponibilidade do histórico de saúde.

O propósito do produto é otimizar a administração das informações e dos processos operacionais do Lar dos Velhinhos por meio de um sistema informatizado centralizado, que possibilite o registro, monitoramento e consulta de dados relativos aos idosos, funcionários, atendimentos e atividades da instituição. A solução deve permitir uma melhor organização e integração das informações, diminuindo as inconsistências e tornando o acesso aos dados em tempo real mais fácil. Como também, oferecer suporte à equipe gestora na tomada de decisões, otimizar os processos administrativos e assistenciais e garantir o acompanhamento contínuo dos residentes. O sistema deve auxiliar no atendimento às demandas dos órgãos reguladores e na proteção dos direitos dos idosos acolhidos, garantindo uma gestão institucional mais eficiente, transparente e confiável.

## 2.2 Objetivos Específicos (OE) do Produto
*   **(OE1)** Centralizar e organizar as informações dos residentes em um único banco de dados, permitindo acesso rápido, seguro e estruturado por meio de dispositivos como tablets;
*   **(OE2)** Melhorar a qualidade e a padronização dos registros de saúde dos residentes, reduzindo inconsistências nas informações coletadas.
*   **(OE3)** Garantir o acompanhamento contínuo e confiável da rotina assistencial dos idosos, permitindo maior controle sobre os cuidados prestados.
*   **(OE4)** Apoiar a tomada de decisão da equipe por meio da disponibilização de informações históricas organizadas e acessíveis.
*   **(OE5)** Melhorar a eficiência operacional da equipe, reduzindo o tempo gasto com registros manuais e retrabalho, e aumentando a confiabilidade das informações;
*   **(OE6)** Facilitar a adaptação de novos funcionários ao sistema, por meio de uma interface intuitiva e de fácil aprendizado, considerando a alta rotatividade da equipe;
*   **(OE7)** Possibilitar a análise e o monitoramento das informações institucionais, contribuindo para uma gestão mais eficiente e orientada a dados.
*   **(OE8)** Reduzir erros humanos de preenchimento através de formulários de atendimento.
*   **(OE9)** Garantir a continuidade das operações de registro de dados, mesmo em cenários de limitação de conectividade.

## 2.3 Características de Produto
*(mapeadas com os Objetivos Específicos do Produto)*

| ID | Característica do Produto (CP) | Descrição resumida | Valor de Negócio (VN) | Principal Contribuição OE |
| --- | --- | --- | --- | --- |
| **CP1** | Interface de Acesso e Autenticação | Tela de login simples para identificar qual funcionário está utilizando o dispositivo em determinado turno. | Segurança e rastreabilidade de quem inseriu ou alterou cada dado. | OE2 |
| **CP2** | Painel de Seleção de Residentes | Lista digital contendo os 74 idosos cadastrados, com busca rápida e separação por setores/quartos. | Agilidade para encontrar o paciente e fim da fragmentação em várias pranchetas físicas. | OE1 |
| **CP3** | Prontuário "Click-Based" (Preenchimento Rápido) | Formulários de entrada de dados (alimentação, higiene, sinais vitais) compostos majoritariamente por botões grandes e opções de seleção, limitando o teclado. | Padronização das anotações, usabilidade imediata para novos funcionários e velocidade na beira do leito. | OE3, OE4 |
| **CP4** | Validação de Dados em Tempo Real | Sistema que impede o avanço da tela ou emite alertas visuais caso o cuidador insira um sinal vital fora do padrão humano possível (ex: temperatura de 45ºC). | Redução de erros operacionais e aumento da confiabilidade da informação médica. | OE9 |
| **CP5** | Visualização de Histórico Local | Tela que exibe um resumo cronológico das últimas aferições e anotações feitas para o idoso selecionado. | Suporte imediato à tomada de decisão clínica sem precisar consultar arquivos de papel. | OE5 |
| **CP6** | Módulo de Sincronização Offline-First | Arquitetura que salva os dados no tablet temporariamente e sincroniza automaticamente com o servidor quando houver rede Wi-Fi estável. | Garantia de que o trabalho não será interrompido ou perdido por falhas de infraestrutura do asilo. | OE9, OE2 |
| **CP7** | Integração com Servidor Local (MySQL) | A estrutura de backend (API) que recebe os dados do aplicativo e os organiza nas tabelas corretas do banco de dados relacional. | Criação da base centralizada única, preparando o terreno para futuros painéis de monitoramento da diretoria. | OE8 |

## 2.4 Tecnologias a Serem Utilizadas
*(A serem preenchidas/detalhadas pela equipe de desenvolvimento)*

## 2.5 Pesquisa de Mercado e Análise Competitiva
O mercado atual de software para gestão de Instituições de Longa Permanência para Idosos (ILPIs) possui soluções consolidadas, mas muitas vezes inacessíveis para algumas instituições devido ao alto custo de licenciamento e/ou à dificuldade técnica envolvida. No caso específico do Lar dos Velhinhos Bezerra de Menezes, os cuidadores dependem de processos manuais - papel e planilhas - que geram silos de informação e dificultam o acesso.

Diferente das soluções genéricas de mercado, o sistema proposto foca em três pilares estratégicos baseados na realidade do nosso cliente:

*   **Interface de Baixa Carga Cognitiva (Checklist Sim/Não):** O principal diferencial competitivo é o foco no cuidador. Enquanto sistemas de mercado exigem preenchimento de formulários extensos, nossa solução prioriza a entrada de dados via checklists e botões de ação rápida, minimizando o tempo de digitação e mitigando o impacto da alta rotatividade de funcionários.
*   **Arquitetura Híbrida Web/Mobile (PWA/Flutter):** Diferente do Access, que é restrito a um terminal local, a nova solução permite que o cliente tenha uma visão gerencial via Web, enquanto os cuidadores utilizam tablets distribuídos pela instituição para o registro em tempo real à beira do leito.
*   **Custo e Sustentabilidade:** Por ser uma solução desenvolvida sob medida e focada no essencial (MVP), elimina-se a dependência de mensalidades de softwares proprietários, adequando-se ao orçamento de uma instituição que vive de convênios e doações.

| Solução | Perfil | Pontos fortes | Gaps |
| --- | --- | --- | --- |
| **Microsoft Access** | Solução atual da instituição. | Custo zero de licenciamento; customizado pelo diretor. | Dados isolados; difícil acesso mobile; risco de perda de dados; não suporta múltiplos acessos simultâneos de forma eficiente. |
| **Sistemas Comerciais (Ex: IW Software)** | Software de prateleira para ILPIs. | Completo; prontuário robusto; atende normas da ANVISA. | Custo de assinatura elevado; interface complexa com excesso de digitação; curva de aprendizado alta para cuidadores com rotatividade. |
| **Prontuários em Papel** | Método tradicional manual. | Custo imediato zero; não exige tecnologia. | Difícil busca de histórico; rasuras; perda de informações críticas; impossibilidade de gerar alertas automáticos; silos de informação. |

## 2.6 Viabilidade da Proposta
A proposta foi considerada viável, haja vista que o cliente possui alta disponibilidade para comunicação com a equipe e agendamento de reuniões, o escopo do projeto bem definido e experiência dos participantes com o método de desenvolvimento Scrum, o que auxiliará na entrega de um MVP funcional ao final do semestre. Em relação a organização do grupo, embora alguns participantes não possuam total domínio sobre tecnologias e ferramentas utilizadas no contexto da disciplina, somado ao fato da grande demanda oriunda de matérias no semestre, o grupo se prontificou a estar plenamente disponível para reuniões semanais e aprendizado da tecnologias que seriam implementadas no desenvolvimento do software.

## 2.7 Benefícios Esperados
*   **Para o cliente:** ampliar a capacidade de gestão das informações do Lar dos Velhinhos por meio da digitalização dos processos assistenciais, com maior controle operacional, redução de inconsistências nos registros e melhoria na confiabilidade dos dados clínicos dos residentes. A solução também deverá fortalecer a organização institucional, facilitar o atendimento às exigências dos órgãos reguladores e criar melhores condições para a tomada de decisão e evolução dos serviços prestados.
*   **Para os usuários:** uma experiência de uso mais simples, rápida e segura no registro das rotinas de cuidado, com interface intuitiva, redução de erros de preenchimento, maior agilidade no acesso às informações dos idosos e melhor acompanhamento do histórico de saúde. Além disso, o sistema proporcionará maior praticidade no dia a dia e contribuirá para a melhoria da qualidade do atendimento aos residentes.
