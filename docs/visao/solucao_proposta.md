# 2. Solução Proposta

## 2.1 Objetivo Geral do Produto
Desenvolver uma solução digital para apoiar o registro e o acompanhamento da rotina assistencial dos idosos do Lar dos Velhinhos, reduzindo o retrabalho manual e ampliando a rastreabilidade das informações de cuidado.

## 2.2 Objetivos Específicos (OE) do Produto
Para alcançar o objetivo geral e enfrentar a inviabilidade do monitoramento preventivo gerada pelo fluxo manual, o desenvolvimento do Vital Tech baseia-se nos seguintes objetivos específicos:

* **(OE1)** Reduzir a dependência de registros em papel no acompanhamento de sinais vitais e rotinas de saúde dos idosos. 

* **(OE2)** Eliminar o retrabalho e a dupla digitação dos registros assistenciais realizados pela equipe. 
* **(OE3)** Garantir a continuidade da operação assistencial independente da infraestrutura de rede.
* **(OE4)** Reduzir a incidência de erros humanos e o tempo de preenchimento mitigando os impactos da alta rotatividade de funcionários.

* **(OE5)** Facilitar o acesso ao histórico cronológico das aferições e rotinas de saúde dos idosos, apoiando a tomada de decisão da equipe multidisciplinar. 

## 2.3 Características de Produto
*(mapeadas com os Objetivos Específicos do Produto)*

| ID | Característica do Produto (CP) | Descrição resumida | Valor de Negócio (VN) Principal | Contribuição Principal | Contribuição Secundária |
| --- | --- | --- | --- | --- | --- |
| **CP1** | Interface de Acesso e Autenticação | Tela de login simples para identificar qual funcionário está utilizando o dispositivo em determinado turno. | Segurança e rastreabilidade de quem inseriu ou alterou cada dado. | OE2 | OE4 |
| **CP2** | Painel de Seleção de Residentes | Lista digital contendo os 74 idosos cadastrados, com busca rápida e separação por setores/quartos. | Agilidade para encontrar o paciente e fim da fragmentação em várias pranchetas físicas. | OE1 | OE4 |
| **CP3** | Prontuário "Click-Based" (Preenchimento Rápido) | Formulários de entrada de dados (alimentação, higiene, sinais vitais) compostos majoritariamente por botões grandes e opções de seleção, limitando o teclado. | Padronização das anotações, usabilidade imediata para novos funcionários e velocidade na beira do leito. | OE4 | OE1 |
| **CP4** | Validação de Dados em Tempo Real | Sistema que impede o avanço da tela ou emite alertas visuais caso o cuidador insira um sinal vital fora do padrão humano possível (ex: temperatura de 45ºC) | Redução de erros operacionais e aumento da confiabilidade da informação médica. | OE4 | OE2 |
| **CP5** | Visualização de Histórico Local | Tela que exibe um resumo cronológico das últimas aferições e anotações feitas para o idoso selecionado. | Suporte imediato à tomada de decisão clínica sem precisar consultar arquivos de papel. | OE5 | OE1 |
| **CP6** | Módulo de Sincronização Offline-First | Arquitetura que salva os dados no tablet temporariamente e sincroniza automaticamente com o servidor quando houver rede Wi-Fi estável. | Garantia de que o trabalho não será interrompido ou perdido por falhas de infraestrutura do asilo. | OE3 | OE2 |
| **CP7** | Integração com banco de dados Local (MySQL) | A estrutura de backend (API) que recebe os dados do aplicativo e os organiza nas tabelas corretas do banco de dados relacional. | Criação da base centralizada única, preparando o terreno para futuros paineis de monitoramento da diretoria. | OE2 | OE5 |

## 2.4 Tecnologias a Serem Utilizadas
Para atender às restrições de custo, viabilizar o funcionamento em rede local instável (offline-first) e garantir que o código-fonte seja leve e de fácil manutenção futura por parte da equipe do cliente, o projeto Vital Tech adotará a arquitetura de Progressive Web App (PWA) em conjunto com uma API leve, utilizando as seguintes tecnologias:

### 1. Frontend (Interface Mobile e Web):
* **Tecnologia:** PWA (Progressive Web App) utilizando HTML5, CSS3 e JavaScript (com um framework leve como Vue.js).
* **Justificativa:** O PWA permite que a aplicação seja acessada pelo navegador do tablet e instalada na tela inicial como um aplicativo nativo, sem a necessidade de publicação em lojas de aplicativos (Play Store) ou de pesados ambientes de compilação mobile (como React Native). O código em padrão web garante uma curva de aprendizado suave para a futura manutenção pelo cliente.
* **Armazenamento Local (Offline):** Service Workers e IndexedDB. Essa tecnologia nativa dos navegadores modernos permite que o aplicativo funcione sem internet, armazenando os prontuários localmente no tablet e sincronizando-os em segundo plano assim que a conexão Wi-Fi for restabelecida.

### 2. Backend (Servidor de Aplicação / API):
* **Tecnologia:** Python (utilizando o framework FastAPI).
* **Justificativa:** Acatando recomendações arquiteturais para evitar ambientes de execução pesados, o Python apresenta-se como a linguagem ideal. É extremamente legível, possui sintaxe amigável e facilita a transferência de tecnologia para o cliente. O framework servirá como uma API REST ágil, hospedada no servidor local da instituição, responsável por validar e injetar os dados sincronizados pelo tablet no banco de dados.

### 3. Banco de Dados (SGBD):
* **Tecnologia:** MySQL.
* **Justificativa:** O MySQL será utilizado como o banco de dados relacional central no servidor físico da instituição. Trata-se de uma solução open-source robusta, capaz de centralizar os prontuários e garantir o controle de integridade referencial, resolvendo definitivamente os gargalos de concorrência e instabilidade do atual legado em Microsoft Access.

A comunicação entre a interface móvel (PWA) e o banco de dados central (MySQL) será orquestrada de forma assíncrona por meio de APIs, viabilizando a sincronização segura dos prontuários médicos sempre que o dispositivo restabelecer a conexão de rede. Para o gerenciamento do código-fonte e o fluxo colaborativo da equipe, adotaremos o sistema de versionamento Git com repositório remoto no GitHub, suportado por rotinas de testes e integração contínua (CI) alinhadas ao ciclo de vida do projeto.

## 2.5 Pesquisa de Mercado e Análise Competitiva
O mercado atual de software para gestão de Instituições de Longa Permanência para Idosos (ILPIs) possui soluções consolidadas, mas muitas vezes inacessíveis para algumas instituições devido ao alto custo de licenciamento e/ou à dificuldade técnica envolvida. No caso específico do Lar dos Velhinhos Bezerra de Menezes, os cuidadores dependem de processos manuais - papel e planilhas - que geram silos de informação e dificultam o acesso. 

| Solução | Perfil | Pontos fortes | Gaps |
| --- | --- | --- | --- |
| **Microsoft Access** | Solução atual da instituição. | Custo zero de licenciamento; customizado pelo diretor. | Dados isolados; difícil acesso mobile; risco de perda de dados; não suporta múltiplos acessos simultâneos de forma eficiente. |
| **Sistemas Comerciais (Ex: IW Software)** | Software de prateleira para ILPIs. | Completo; prontuário robusto; atende normas da ANVISA. | Custo de assinatura elevado; interface complexa com excesso de digitação; curva de aprendizado alta para cuidadores com rotatividade. |
| **Prontuários em Papel** | Método tradicional manual. | Custo imediato zero; não exige tecnologia. | Difícil busca de histórico; rasuras; perda de informações críticas; impossibilidade de gerar alertas automáticos; silos de informação. |

## 2.6 Viabilidade da Proposta
A execução do projeto Vital Tech foi analisada sob quatro dimensões (Técnica, Financeira, Operacional e Legal), comprovando o alinhamento entre as exigências acadêmicas da disciplina e as severas restrições de recursos do Lar dos Velhinhos Bezerra de Menezes.

A escolha da stack tecnológica (PWA, Python/FastAPI e MySQL) apresenta uma curva de aprendizado factível para a equipe de desenvolvimento dentro do cronograma do semestre. Para garantir a viabilidade acadêmica (que exige acesso remoto contínuo para avaliação do professor e da monitoria), o sistema operará em um ambiente de staging (homologação) na nuvem, utilizando infraestruturas gratuitas como Vercel (para o frontend PWA) e Fly.io (para a API).

Visando a entrega de um produto real e sustentável no longo prazo para o cliente uma ONG com orçamento restrito, o deploy em ambiente de produção será On-Premise (Servidor Local). A API Python e o banco de dados MySQL serão hospedados em uma máquina física já existente na própria instituição. Essa arquitetura garante custo zero de licenciamento de software e elimina qualquer dependência de mensalidades de servidores em nuvem (Cloud), inviáveis para o asilo.

O risco de interrupção do sistema por falhas no provedor de internet do asilo é mitigado pela arquitetura offline-first do PWA (via Service Workers), que garante o registro nos tablets e sincronização assíncrona via rede Wi-Fi local (Intranet). Além disso, visando reduzir o atrito na adoção da nova tecnologia e preservar a autonomia gerencial do cliente, o sistema implementa uma arquitetura de transição inteligente: os dados legados serão migrados para o MySQL, mas a interface atual do Microsoft Access será reconfigurada via conexão ODBC (Tabelas Vinculadas). Dessa forma, o Access passa a atuar exclusivamente como uma ferramenta de visualização local (Frontend) do MySQL. Isso garante a estabilidade do banco para inserções via dispositivos móveis, ao mesmo tempo em que mantém a familiaridade do cliente para a geração de relatórios administrativos já consolidados. 

Ao adotar o deploy On-Premise, a solução isola o tráfego de informações na Intranet da instituição. Como os prontuários contêm dados sensíveis de saúde, mantê-los armazenados fisicamente no servidor interno da ONG sem exposição a bancos de dados públicos em nuvem de terceiros facilita a conformidade com a Lei Geral de Proteção de Dados (LGPD) e atende aos critérios de segurança da informação. A estratégia de segregar o ambiente acadêmico (Cloud) do ambiente de produção (On-Premise), aliada à coexistência pacífica com o legado via ODBC, torna o projeto altamente executável pela equipe universitária e garante uma adoção operacional livre de custos extras e barreiras técnicas para o cliente bem como a manutenibilidade por parte do gestor do produto.

## 2.7 Benefícios Esperados

**Para o Cliente (Diretoria e Equipe Multidisciplinar de Saúde):**
* **Fim do Retrabalho Operacional:** Mudança no processo de dupla digitação (transcrição do papel para o computador), otimizando o tempo da equipe e centralizando a informação em uma base de dados estruturada (MySQL).
* **Monitoramento Clínico em Tempo Real:** Capacidade de acompanhar o status de saúde e as rotinas dos 74 idosos de forma instantânea, permitindo intervenções médicas preventivas em vez de apenas reativas.
* **Conformidade e Rastreabilidade (LGPD):** Facilidade na geração de relatórios precisos para órgãos fiscalizadores, garantindo a autoria de cada registro e a segurança dos dados sensíveis mantidos na rede local.
* **Transição Tecnológica sem Atrito:** Adoção de um novo sistema sem custos de mensalidade em nuvem (deploy On-Premise) e sem perda do legado gerencial, mantendo o Microsoft Access do cliente conectado como ferramenta de visualização.

**Para os Usuários (Cuidadores na Beira do Leito):**
* **Agilidade no cuidado dos idosos:** Substituição das pranchetas e formulários físicos por um aplicativo de interface ágil (click-based), reduzindo drasticamente o tempo gasto escrevendo e permitindo maior foco no cuidado com o idoso.
* **Resiliência de Infraestrutura:** Segurança de que nenhum dado inserido será perdido devido a quedas de energia ou falhas no Wi-Fi do asilo, graças ao funcionamento offline-first do aplicativo.
* **Mitigação de Erros de Preenchimento:** Redução da carga cognitiva e de falhas humanas na passagem de plantão mitigando os impactos da alta rotatividade da equipe por meio de validações automáticas no momento da inserção do dado.
* **Acesso Imediato ao Histórico:** Disponibilidade do resumo cronológico das últimas aferições do idoso diretamente na tela do tablet, eliminando viagens desnecessárias até os arquivos físicos ou postos de enfermagem.


---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 03/04/2026 | 1.0 | Criação do documento (Seções 1 a 2.3) para submissão da proposta. | Alberto Côrtes, João Pedro Sampaio, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 10/04/2026 | 1.1 | Finalização e correção do documento para primeira entrega (Seções 1 a 6) para submissão. | Alberto Côrtes, Ana Carolina, Enzo Menali e Gustavo Xavier |
|13/04/2026 | 1.2 | Lançamento dessa seção no GitPages | Gustavo Xavier |


---