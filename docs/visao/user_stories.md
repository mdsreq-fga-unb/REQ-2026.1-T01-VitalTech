# User Stories e Critérios de Aceitação — VitalTech

As user stories abaixo foram derivadas dos Requisitos Funcionais (RF01–RF16), organizadas na ordem cronológica do Story Map (CP3 → CP4 → CP1 → CP2 → CP5). Cada história inclui critérios de aceitação no formato **Dado / Quando / Então**.

As User Stories do MVP foram avaliadas conforme a abordagem ScrumXP adotada pelo projeto, considerando clareza de persona, ação e benefício, verificabilidade dos critérios de aceitação, possibilidade de validação em sprint e rastreabilidade com RFs, Regras de Negócio e RNFs.

Nas histórias assistenciais que envolvem mais de uma ação do fluxo de cuidado, os critérios de aceitação foram detalhados por cenários de registro, edição e consulta, mantendo os identificadores das User Stories já rastreados nos demais artefatos do projeto.

**Decisão sobre histórias assistenciais compostas:** a equipe avaliou a decomposição de US04, US05, US06 e US07 em histórias independentes de registro, edição e consulta. Para esta unidade, optou por manter os identificadores principais, pois eles já estavam ligados aos RFs, Story Map, matriz de priorização, cronograma, issues e PRs. 

**Personas:**
- **Gestor** — administração da instituição, gestão de usuários e cadastros base.
- **Cuidador** — prestação de cuidado direto aos residentes durante o turno.
- **Membro da equipe multidisciplinar** — enfermeiro, médico, nutricionista ou fisioterapeuta que consulta dados para tomada de decisão clínica.

---

## CP3 — Autenticação de Usuários

<a id="us08"></a>

### US08 — Autenticar usuário no sistema
> Como **usuário autorizado**, quero autenticar meu acesso ao sistema com minhas credenciais individuais, para que apenas membros autorizados possam acessar funcionalidades de registro, consulta e administração conforme seu perfil.

**Critérios de Aceitação:**
- **CA08.1** — Dado que o usuário está na tela de login, quando informar login e senha corretos e confirmar, então o sistema libera o acesso e direciona para a tela inicial.
- **CA08.2** — Dado que o usuário informa credenciais incorretas, quando tenta confirmar, então o sistema exibe mensagem de erro genérica sem revelar qual campo está incorreto, e o acesso é negado.
- **CA08.3** — Dado que um usuário sem sessão ativa tenta acessar uma rota protegida, quando o sistema verificar a autenticação, então o acesso é bloqueado e o usuário é direcionado para a tela de login.

---

<a id="us09"></a>

### US09 — Encerrar sessão do usuário
> Como **Usuário Autorizado**, quero encerrar minha sessão no sistema ao final do turno, para garantir que nenhum outro usuário acesse o sistema em meu nome no dispositivo compartilhado.

**Critérios de Aceitação:**
- **CA09.1** — Dado que o usuário está autenticado, quando clicar em "Encerrar sessão", então a sessão é encerrada e o usuário é redirecionado para a tela de login.
- **CA09.2** — Dado que a sessão foi encerrada, quando outro usuário acessar o dispositivo, então os dados da sessão anterior não estão mais visíveis nem acessíveis.
- **CA09.3** — Dado que o usuário permanece inativo por 15 minutos em dispositivo compartilhado, quando o tempo limite de sessão for atingido, então o sistema encerra a sessão automaticamente e exige nova autenticação.

---

## CP4 — Gerenciamento de Usuários

<a id="us10"></a>

### US10 — Cadastrar usuário
> Como **Gestor**, quero cadastrar novos usuários na plataforma, para que cada membro da equipe tenha acesso individual ao sistema com suas credenciais próprias.

**Critérios de Aceitação:**
- **CA10.1** — Dado que o Gestor está autenticado, quando preencher os campos obrigatórios (nome completo, login, perfil e senha provisória) e confirmar, então o novo usuário é criado e pode se autenticar com as credenciais definidas.
- **CA10.2** — Dado que o Gestor tenta cadastrar um login já existente no sistema, quando confirmar, então o sistema exibe mensagem de erro indicando que o login já está em uso e não realiza o cadastro.
- **CA10.3** — Dado que um usuário sem perfil de Gestor tenta acessar o cadastro de usuários, quando solicitar a funcionalidade, então o sistema bloqueia o acesso por falta de permissão.
- **CA10.4** — Dado que o Gestor tenta cadastrar um usuário sem preencher campos obrigatórios, quando confirmar o cadastro, então o sistema indica os campos pendentes e não cria o usuário.

---

<a id="us11"></a>

### US11 — Atualizar dados cadastrais do usuário
> Como **Gestor**, quero atualizar os dados cadastrais de um usuário, para manter as informações da equipe corretas no sistema.

**Critérios de Aceitação:**
- **CA11.1** — Dado que o Gestor está visualizando o perfil de um usuário ativo, quando alterar um ou mais campos e confirmar, então as informações são atualizadas imediatamente no sistema.
- **CA11.2** — Dado que o Gestor altera campos obrigatórios para valores inválidos ou vazios, quando confirmar a atualização, então o sistema informa os campos com problema e não salva as alterações.
- **CA11.3** — Dado que o Gestor tenta alterar o login de um usuário para um login já existente, quando confirmar a atualização, então o sistema informa a duplicidade e mantém os dados anteriores.
- **CA11.4** — Dado que a alteração muda permissões do próprio usuário autenticado, quando a atualização for salva, então o sistema exige nova autenticação para renovar a sessão e evitar permissões antigas.

---

<a id="us12"></a>

### US12 — Redefinir senha de acesso do usuário
> Como **Gestor**, quero redefinir a senha de acesso de um membro da equipe, para restaurar o acesso de alguém que esqueceu suas credenciais.

**Critérios de Aceitação:**
- **CA12.1** — Dado que o Gestor selecionou um usuário ativo e definiu uma nova senha provisória, quando confirmar a redefinição, então a credencial anterior é invalidada e a nova credencial passa a ser registrada como válida.
- **CA12.2** — Dado que a senha foi redefinida, quando houver validação das credenciais desse usuário, então a senha antiga é rejeitada e apenas a senha provisória atual é aceita.
- **CA12.3** — Dado que um usuário sem perfil de Gestor tenta redefinir senha de outro usuário, quando solicitar a funcionalidade, então o sistema bloqueia a ação por falta de permissão.

---

<a id="us13"></a>

### US13 — Revogar acesso do usuário
> Como **Gestor**, quero revogar o acesso de um usuário ao sistema, para garantir que ex-funcionários não possam mais acessar dados dos residentes após o desligamento.

**Critérios de Aceitação:**
- **CA13.1** — Dado que o Gestor confirmou a revogação de acesso de um usuário, quando a alteração for salva, então o usuário passa ao estado "Inativo" e o sistema impede a geração de nova sessão para esse usuário.
- **CA13.2** — Dado que o acesso de um usuário foi revogado, quando a equipe consultar registros assistenciais realizados anteriormente por ele, então esses registros serão mantidos no histórico associados à sua identificação.
- **CA13.3** — Dado que um usuário sem perfil de Gestor tenta revogar acesso de outro usuário, quando solicitar a funcionalidade, então o sistema bloqueia a ação por falta de permissão.

---

## CP1 — Gestão de Residentes

<a id="us01"></a>

### US01 — Cadastrar dados do residente
> Como **Gestor**, quero cadastrar os dados pessoais e clínicos de um novo residente, para que a equipe assistencial tenha acesso ao seu perfil digital a partir da admissão.

**Critérios de Aceitação:**
- **CA01.1** — Dado que o Gestor está autenticado, quando preencher os campos obrigatórios (nome completo, data de nascimento, CPF, grau de dependência e responsável legal) e confirmar, então o perfil digital do residente é criado e fica disponível para toda a equipe.
- **CA01.2** — Dado que o Gestor tenta cadastrar sem preencher campos obrigatórios, quando confirmar, então o sistema indica os campos em falta e não realiza o cadastro.
- **CA01.3** — Dado que o Gestor tenta cadastrar um residente com CPF já existente, quando confirmar o cadastro, então o sistema informa a duplicidade e não cria um novo perfil para o mesmo residente.

---

<a id="us02"></a>

### US02 — Editar dados pessoais e clínicos do residente
> Como **Gestor**, quero editar os dados pessoais e clínicos de um residente já cadastrado, para manter o perfil digital atualizado conforme mudanças em seu estado de saúde ou situação pessoal.

**Critérios de Aceitação:**
- **CA02.1** — Dado que o Gestor está visualizando o perfil de um residente ativo, quando alterar um ou mais campos e confirmar, então as alterações são salvas e o perfil atualizado fica visível para toda a equipe.
- **CA02.2** — Dado que o Gestor altera campos obrigatórios para valores inválidos ou vazios, quando confirmar a edição, então o sistema informa os campos com problema e não salva as alterações.
- **CA02.3** — Dado que um usuário sem permissão administrativa tenta editar dados de um residente, quando solicitar a funcionalidade, então o sistema bloqueia a ação por falta de permissão.
- **CA02.4** — Dado que existem registros assistenciais vinculados ao residente, quando seus dados cadastrais forem editados, então o histórico assistencial permanece preservado e associado ao mesmo residente.

---

<a id="us03"></a>

### US03 — Inativar o cadastro do residente
> Como **Gestor**, quero inativar o cadastro de um residente que saiu da instituição, para removê-lo do fluxo operacional ativo sem perder seu histórico assistencial.

**Critérios de Aceitação:**
- **CA03.1** — Dado que o Gestor confirmou a inativação de um residente, quando os cuidadores acessarem a lista operacional de residentes, então esse residente não será mais exibido como ativo.
- **CA03.2** — Dado que o residente foi inativado, quando um usuário autorizado consultar seu histórico assistencial, então todo o histórico permanecerá acessível no sistema, em conformidade com a Regra de Negócio RN-03.

---

## CP2 — Registro Assistencial Digital

<a id="us04"></a>

### US04 — Registrar, editar e consultar sinais vitais do residente
> Como **Cuidador**, quero registrar, editar e consultar os sinais vitais de um residente durante o meu turno, para que a equipe de saúde tenha um histórico contínuo e atualizado do seu estado clínico.

**Critérios de Aceitação:**
- **CA04.1** — Dado que o Cuidador está autenticado e selecionou um residente ativo, quando preencher pressão arterial, frequência cardíaca, temperatura e glicemia e confirmar, então o registro de sinais vitais é salvo com residente associado, data, horário automático e identificação do cuidador.
- **CA04.2** — Dado que algum campo obrigatório de sinais vitais está vazio ou em formato inválido, quando o Cuidador tentar confirmar o registro, então o sistema indica o campo pendente ou inválido e não salva o registro incompleto.
- **CA04.3** — Dado que o Cuidador informa valores fora dos intervalos clínicos de referência definidos na RN-06, quando tentar salvar o registro, então o sistema solicita confirmação explícita antes de persistir os dados.
- **CA04.4** — Dado que o dispositivo está sem conexão, quando o Cuidador confirmar um registro válido de sinais vitais, então os dados são salvos localmente, marcados como pendentes de sincronização e sincronizados quando a conexão for restabelecida.
- **CA04.5** — Dado que existe um registro de sinais vitais associado ao residente, quando um usuário autorizado corrigir dados editáveis e confirmar, então a alteração é salva mantendo rastreabilidade do registro original e da edição realizada.
- **CA04.6** — Dado que existem registros de sinais vitais para o residente selecionado, quando o usuário autorizado consultar essa informação, então o sistema exibe apenas os registros do residente selecionado, com data, horário, tipo de registro e responsável.

---

<a id="us05"></a>

### US05 — Registrar, editar e consultar rotinas assistenciais do residente
> Como **Cuidador**, quero registrar, editar e consultar as rotinas assistenciais (alimentação e higiene) realizadas em um residente, para documentar digitalmente e permitir revisão do cuidado prestado em substituição ao formulário em papel.

**Critérios de Aceitação:**
- **CA05.1** — Dado que o Cuidador está autenticado e selecionou um residente ativo, quando registrar alimentação, hidratação, higiene ou eliminações do turno e confirmar, então a rotina assistencial é salva com residente associado, data, horário automático e identificação do cuidador.
- **CA05.2** — Dado que o Cuidador tenta salvar uma rotina assistencial sem preencher os campos obrigatórios aplicáveis ao tipo de rotina, quando confirmar o registro, então o sistema indica os campos pendentes e não salva o registro incompleto.
- **CA05.3** — Dado que o dispositivo está sem conexão, quando o Cuidador confirmar uma rotina assistencial válida, então os dados são salvos localmente, marcados como pendentes de sincronização e sincronizados quando a conexão for restabelecida.
- **CA05.4** — Dado que existe um registro de rotina assistencial associado ao residente, quando um usuário autorizado corrigir dados editáveis e confirmar, então a alteração é salva mantendo rastreabilidade do registro original e da edição realizada.
- **CA05.5** — Dado que existem rotinas assistenciais registradas para o residente selecionado, quando o usuário autorizado consultar essa informação, então o sistema exibe apenas os registros do residente selecionado, com data, horário, tipo de rotina e responsável.

---

<a id="us06"></a>

### US06 — Registrar, editar e consultar administração de medicamentos
> Como **Cuidador**, quero registrar, editar e consultar a administração de medicamentos a um residente, para garantir o rastreamento correto da medicação efetivamente administrada em cada turno.

**Critérios de Aceitação:**
- **CA06.1** — Dado que o Cuidador está autenticado e selecionou um residente ativo, quando confirmar a administração de um medicamento previsto, então o registro é salvo com nome do medicamento, dose, via, horário exato de administração, residente associado e identificação do cuidador.
- **CA06.2** — Dado que o medicamento não foi administrado, quando o Cuidador informar o status de não administração e registrar o motivo, então o sistema salva a não administração no histórico do residente com data, horário e responsável.
- **CA06.3** — Dado que o Cuidador tenta salvar um registro de medicamento sem medicamento ou status de administração, quando confirmar o registro, então o sistema indica o campo pendente e não salva o registro incompleto.
- **CA06.4** — Dado que o dispositivo está sem conexão, quando o Cuidador confirmar um registro válido de administração ou não administração de medicamento, então os dados são salvos localmente, marcados como pendentes de sincronização e sincronizados quando a conexão for restabelecida.
- **CA06.5** — Dado que existe um registro de medicamento associado ao residente, quando um usuário autorizado corrigir dados editáveis e confirmar, então a alteração é salva mantendo rastreabilidade do registro original e da edição realizada.
- **CA06.6** — Dado que existem registros de medicamentos para o residente selecionado, quando o usuário autorizado consultar essa informação, então o sistema exibe apenas os registros do residente selecionado, distinguindo medicamentos administrados e não administrados.

---

<a id="us07"></a>

### US07 — Registrar, editar e consultar ocorrências clínicas do residente
> Como **Cuidador**, quero registrar, editar e consultar ocorrências clínicas observadas em um residente durante o turno, para documentar e revisar eventos relevantes que precisam de atenção ou notificação à equipe.

**Critérios de Aceitação:**
- **CA07.1** — Dado que o Cuidador está autenticado e selecionou um residente ativo, quando registrar tipo da ocorrência, gravidade, data e horário do evento, descrição e condutas adotadas, então a ocorrência clínica é salva com residente associado e identificação do cuidador responsável pelo lançamento.
- **CA07.2** — Dado que a ocorrência registrada é queda com lesão ou tentativa de suicídio, quando o registro for salvo, então o sistema sinaliza que o evento requer atenção para notificação à autoridade sanitária, conforme a RN-04.
- **CA07.3** — Dado que o Cuidador tenta salvar uma ocorrência sem tipo, gravidade, data/hora do evento ou descrição, quando confirmar o registro, então o sistema indica os campos pendentes e não salva o registro incompleto.
- **CA07.4** — Dado que o dispositivo está sem conexão, quando o Cuidador confirmar uma ocorrência clínica válida, então os dados são salvos localmente, marcados como pendentes de sincronização e sincronizados quando a conexão for restabelecida.
- **CA07.5** — Dado que existe uma ocorrência clínica associada ao residente, quando um usuário autorizado corrigir dados editáveis e confirmar, então a alteração é salva mantendo rastreabilidade do registro original e da edição realizada.
- **CA07.6** — Dado que existem ocorrências clínicas para o residente selecionado, quando o usuário autorizado consultar essa informação, então o sistema exibe apenas as ocorrências do residente selecionado, com data/hora do evento, tipo, gravidade e responsável pelo lançamento.

---

## CP5 — Consulta do Histórico Assistencial

<a id="us14"></a>

### US14 — Consultar histórico de registros do residente
> Como **Membro da equipe multidisciplinar**, quero consultar o histórico cronológico de registros de um residente, para acompanhar a evolução clínica e embasar decisões de intervenção.

**Critérios de Aceitação:**
- **CA14.1** — Dado que o usuário está autenticado e selecionou um residente, quando acessar o histórico assistencial, então o sistema exibe a lista de todos os registros em ordem cronológica decrescente (mais recente primeiro), com data, horário, tipo de registro e nome do cuidador responsável.
- **CA14.2** — Dado que o residente selecionado ainda não possui registros assistenciais, quando o usuário acessar o histórico, então o sistema exibe uma mensagem informando que não há registros disponíveis.
- **CA14.3** — Dado que existem registros de diferentes residentes, quando o usuário consultar o histórico de um residente específico, então o sistema exibe apenas os registros associados ao residente selecionado.
- **CA14.4** — Dado que um usuário sem permissão para consulta tenta acessar o histórico assistencial, quando solicitar a funcionalidade, então o sistema bloqueia o acesso por falta de permissão.
---

<a id="us15"></a>

### US15 — Filtrar histórico por período
> Como **Membro da equipe multidisciplinar**, quero filtrar o histórico assistencial de um residente por período, para localizar registros específicos e analisar a evolução em um intervalo de tempo determinado.

**Critérios de Aceitação:**
- **CA15.1** — Dado que existem registros assistenciais com datas diferentes para um residente, quando o usuário definir uma data de início e uma data de fim e aplicar o filtro, então o sistema retorna apenas os registros dentro do intervalo informado, mantendo a ordenação cronológica.
- **CA15.2** — Dado que o período filtrado não retorna nenhum registro, quando o filtro for aplicado, então o sistema exibe uma mensagem informando que não há registros no período selecionado.
- **CA15.3** — Dado que o usuário informa data inicial posterior à data final, quando aplicar o filtro, então o sistema informa a inconsistência do período e não executa a consulta.

---

<a id="us16"></a>

### US16 — Visualizar resumo assistencial do residente
> Como **Membro da equipe multidisciplinar**, quero visualizar um resumo assistencial consolidado de um residente, para obter rapidamente uma visão geral do seu estado atual antes de uma intervenção ou reunião clínica.

**Critérios de Aceitação:**
- **CA16.1** — Dado que o usuário está autenticado e selecionou um residente, quando acessar a seção de resumo assistencial, então o sistema exibe o último registro de cada módulo (sinais vitais, rotinas, medicamentos e ocorrências), com data, horário e nome do responsável pelo registro.
- **CA16.2** — Dado que o residente selecionado ainda não possui registros em algum módulo assistencial, quando o usuário acessar o resumo, então o sistema exibe a ausência de informação naquele módulo sem impedir a visualização dos demais dados disponíveis.
- **CA16.3** — Dado que um usuário sem permissão para consulta tenta visualizar o resumo assistencial, quando solicitar a funcionalidade, então o sistema bloqueia o acesso por falta de permissão.

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 17/05/2026 | 1.0 | Criação do documento com US01–US16 derivadas dos RFs revisados (RF01–RF16). | Gustavo Xavier |
| 17/05/2026 | 1.1 | Adição dos critérios de aceitação (CA) para todas as user stories. Reorganização na ordem cronológica do Story Map (CP3 → CP4 → CP1 → CP2 → CP5). | Gustavo Xavier |
| 18/05/2026 | 1.2 | Ajustes nas personas das histórias de autenticação e sessão, padronização dos critérios de aceitação no formato Dado/Quando/Então, inclusão de cenários negativos e melhoria das referências às regras de negócio. | Enzo Menali|
| 16/06/2026 | 1.3 | Ajuste de critérios de aceitação para melhorar independência, verificabilidade e aderência ao INVEST, preservando IDs e rastreabilidade. | Enzo Menali |
| 28/06/2026 | 1.4 | Revisão ScrumXP das User Stories do MVP, decomposição lógica das histórias compostas e ampliação dos critérios de aceitação positivos, negativos, offline e de rastreabilidade. | Enzo Menali |
