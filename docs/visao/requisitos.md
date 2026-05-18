# REQUISITOS DE SOFTWARE

## VitalTech — Requisitos Funcionais e Não Funcionais

Este documento consolida a lista de requisitos funcionais e não funcionais do VitalTech, além de sua matriz de rastreabilidade com as Características do Produto (CP). Os requisitos funcionais são apresentados no formato verbo no infinitivo + objeto. Os requisitos não funcionais incluem nome, descrição técnica e classificação segundo os modelos URPS+ e/ou Sommerville.

---

## 1. Relação de Requisitos Funcionais (RFs) com as Características do Produto (CP)

A tabela abaixo apresenta os requisitos funcionais do VitalTech. Cada RF deriva de exatamente uma Característica do Produto (CP) e representa uma ação realizada pelo usuário.

| Código | Requisito | CP | Justificativa |
| :--- | :--- | :--- | :--- |
| **RF01** | Cadastrar dados do residente | CP1 | Cria o perfil digital do residente, substituindo a ficha em papel. |
| **RF02** | Editar dados pessoais e clínicos do residente | CP1 | Atualiza informações do residente conforme necessidade clínica ou administrativa. |
| **RF03** | Inativar o cadastro do residente | CP1 | Remove o residente do fluxo operacional ativo sem excluir o histórico (soft delete). |
| **RF04** | Registrar sinais vitais do residente | CP2 | Digitaliza a aferição periódica de saúde no ponto de cuidado. |
| **RF05** | Registrar rotinas assistenciais do residente | CP2 | Documenta alimentação e higiene do residente, substituindo o formulário em papel. |
| **RF06** | Registrar administração de medicamentos | CP2 | Documenta a medicação efetivamente administrada ao residente no turno. |
| **RF07** | Registrar ocorrências clínicas do residente | CP2 | Registra eventos e intercorrências observados durante o cuidado a partir de lista padronizada. |
| **RF08** | Autenticar usuário no sistema | CP3 | Controla o acesso ao sistema por meio de credenciais individuais. |
| **RF09** | Encerrar sessão do usuário | CP3 | Garante a segurança do dispositivo compartilhado após o uso. |
| **RF10** | Cadastrar usuário | CP4 | Permite ao gestor incluir novos membros da equipe no sistema. |
| **RF11** | Atualizar dados cadastrais do usuário | CP4 | Mantém as informações da equipe atualizadas. |
| **RF12** | Redefinir senha de acesso do usuário | CP4 | Permite ao gestor restaurar o acesso de um usuário que esqueceu a senha. |
| **RF13** | Revogar acesso do usuário | CP4 | Bloqueia o acesso ao sistema em casos de desligamento da equipe. |
| **RF14** | Consultar histórico de registros do residente | CP5 | Permite à equipe visualizar a evolução clínica cronológica do residente. |
| **RF15** | Filtrar histórico por período | CP5 | Facilita a busca de registros em intervalos de tempo específicos. |
| **RF16** | Visualizar resumo assistencial do residente | CP5 | Exibe visão consolidada do estado atual e recente do residente para apoio à decisão. |

---

## 2. Regras de Negócio (RNs)

As regras de negócio definem restrições e comportamentos impostos pelo contexto operacional e legal da instituição, independentemente de ação direta do usuário.

| Código | Regra de Negócio | Fundamento |
| :--- | :--- | :--- |
| **RN-01** | Todo registro assistencial deve poder ser realizado independentemente da disponibilidade de conexão com o servidor, sendo sincronizado automaticamente quando a conexão for restabelecida. | Infraestrutura de rede instável da instituição |
| **RN-02** | Todo registro assistencial inserido em qualquer dispositivo da equipe deve ser consolidado em um único repositório de dados institucional, garantindo que a informação esteja disponível a todos os perfis autorizados e eliminando silos de informação. | Eliminação do retrabalho de dupla digitação |
| **RN-03** | O histórico assistencial de um residente inativado não pode ser excluído do sistema. Todos os registros de saúde devem ser preservados por no mínimo 20 anos após a data do último atendimento, em conformidade com a Resolução CFM nº 1.821/2007 e com os requisitos de retenção de dados sensíveis estabelecidos pela LGPD (Lei nº 13.709/2018, Art. 11 e 16). | Obrigação legal |
| **RN-04** | A ocorrência de queda com lesão ou tentativa de suicídio de um residente deve ser registrada no sistema com data, horário e responsável pelo lançamento, em conformidade com o item 6.2 da RDC ANVISA nº 283/2005, para subsidiar a notificação obrigatória à autoridade sanitária local. | RDC ANVISA 283/2005, Art. 6.2 |
| **RN-05** | Nenhum formulário de registro assistencial pode ser submetido com campos obrigatórios em branco. O sistema deve impedir o salvamento e indicar ao usuário quais campos precisam ser preenchidos. | Integridade dos dados e padronização dos registros |
| **RN-06** | Os valores inseridos nas aferições de sinais vitais devem ser validados contra intervalos clínicos de referência (ex.: PA sistólica entre 60–250 mmHg; temperatura entre 34–42°C; glicemia entre 20–600 mg/dL). Valores fora desses limites não podem ser salvos sem confirmação explícita do usuário. | Prevenção de erros de digitação clínica |
| **RN-07** | Quando os valores registrados de sinais vitais estiverem fora dos parâmetros clínicos normais, o sistema deve sinalizar o registro com alerta visual, indicando a necessidade de avaliação pela equipe responsável. | Segurança clínica e apoio à tomada de decisão |
| **RN-08** | Todo registro de administração de medicamento deve incluir o horário exato de administração e não pode ser salvo sem essa informação, garantindo o rastreamento preciso de dosagens e dos intervalos entre administrações. | Controle de dosagem e segurança farmacológica |
| **RN-09** | Após o salvamento de qualquer registro assistencial, o sistema deve exibir confirmação visual ao usuário informando que os dados foram persistidos com sucesso, garantindo ciência do cuidador antes de prosseguir para o próximo atendimento. | Confiabilidade operacional em ambiente de alta rotatividade |

---

## 3. Lista de Requisitos Não Funcionais (RNFs)

Os requisitos não funcionais definem as restrições, atributos de qualidade e premissas arquiteturais do sistema. Eles foram classificados com base nos atributos do modelo **URPS+** (Usability, Reliability, Performance, Supportability) e/ou **Sommerville**.

| Código | Nome do Requisito (RNF) | Descrição Técnica | Classificação (URPS+ / Sommerville) |
| :--- | :--- | :--- | :--- |
| **RNF01** | Suportabilidade em dispositivos móveis | O sistema deve operar de forma responsiva como PWA em navegadores de tablets e smartphones utilizados pela instituição. | Suportabilidade / Portabilidade |
| **RNF02** | Redução de digitação manual | A interface deve priorizar formulários *touch-based*, com botões largos e seletores visuais, minimizando o uso do teclado virtual. | Usabilidade / Usabilidade |
| **RNF03** | Linguagem compreensível | Os termos e alertas da interface devem refletir o vocabulário técnico e cotidiano utilizado pelos cuidadores do asilo. | Usabilidade / Usabilidade |
| **RNF04** | Aprendizado rápido | A navegação do sistema deve ser intuitiva, permitindo que um cuidador sem familiaridade tecnológica conclua um registro após breve treinamento. | Usabilidade / Usabilidade |
| **RNF05** | Preservação de registros offline | O sistema deve reter os dados assistenciais na memória do navegador (IndexedDB) de forma íntegra em caso de queda de rede local. | Confiabilidade / Confiabilidade |
| **RNF06** | Disponibilidade das funções essenciais | Os módulos de registro (sinais vitais, rotinas e higiene) devem estar integralmente disponíveis na ausência de conexão. | Confiabilidade / Disponibilidade |
| **RNF07** | Controle de acesso | O sistema deve segregar as visões e permissões do sistema entre perfis de Cuidador, Equipe Multidisciplinar e Gestor. | Segurança (+) / Segurança |
| **RNF08** | Rastreabilidade dos registros | Todos os registros críticos devem possuir *logs* inalteráveis de autoria e *timestamp* para auditoria técnica e resguardo legal. | Segurança (+) / Segurança |
| **RNF09** | Capacidade operacional | A base de dados local e o banco principal devem suportar o volume diário de lançamentos gerados pelos cuidadores ativos em um turno. | Desempenho / Eficiência |
| **RNF10** | Organização lógica do histórico | Os dados cronológicos de saúde devem ser dispostos de maneira padronizada, permitindo leitura rápida durante a passagem de plantão. | Usabilidade / Usabilidade |
| **RNF11** | Desempenho no registro assistencial | O tempo entre o clique de "Salvar" e a persistência local (IndexedDB) não deve ultrapassar 1 segundo. | Desempenho / Eficiência |
| **RNF12** | Desempenho no registro sem conexão | A operação da interface não deve apresentar travamentos na transição do estado *Online* para *Offline*. | Desempenho / Eficiência |
| **RNF13** | Desempenho na consulta ao histórico | A recuperação de dados no banco MySQL para listagem do histórico não deve ultrapassar 3 segundos em rede estável. | Desempenho / Eficiência |
| **RNF14** | Desempenho na filtragem do histórico | O tempo de aplicação de filtros de datas em registros já carregados deve ser instantâneo (*client-side*). | Desempenho / Eficiência |
| **RNF15** | Desempenho na sincronização | O envio de registros armazenados em lote (*Background Sync*) deve ocorrer de forma assíncrona, sem bloquear a interface de uso. | Desempenho / Eficiência |

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 03/04/2026 | 1.0 | Criação deste documento. | Gustavo Xavier |
| 17/05/2026 | 1.1 | Reestruturação completa: redução de 30 para 16 RFs, adição das RNs (RN-01 a RN-04). | Gustavo Xavier |
| 17/05/2026 | 1.2 | Adição de RN-05 a RN-09, convertidas de RFs antigos conforme feedback do professor. | Gustavo Xavier |