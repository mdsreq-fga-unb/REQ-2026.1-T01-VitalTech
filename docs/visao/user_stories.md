# User Stories e Critérios de Aceitação — VitalTech

As user stories abaixo foram derivadas dos Requisitos Funcionais (RF01–RF16), organizadas na ordem cronológica do Story Map (CP3 → CP4 → CP1 → CP2 → CP5). Cada história inclui critérios de aceitação no formato **Dado / Quando / Então**.

**Personas:**
- **Gestor** — administração da instituição, gestão de usuários e cadastros base.
- **Cuidador** — prestação de cuidado direto aos residentes durante o turno.
- **Membro da equipe multidisciplinar** — enfermeiro, médico, nutricionista ou fisioterapeuta que consulta dados para tomada de decisão clínica.

---

## CP3 — Autenticação de Usuários

### US08 — Autenticar usuário no sistema
> Como **usuário autorizado**, quero autenticar meu acesso ao sistema com minhas credenciais individuais, para que apenas membros autorizados possam acessar funcionalidades de registro, consulta e administração conforme seu perfil.

**Critérios de Aceitação:**
- **CA08.1** — Dado que o usuário está na tela de login, quando informar login e senha corretos e confirmar, então o sistema libera o acesso e direciona para a tela inicial.
- **CA08.2** — Dado que o usuário informa credenciais incorretas, quando tenta confirmar, então o sistema exibe mensagem de erro genérica sem revelar qual campo está incorreto, e o acesso é negado.

---

### US09 — Encerrar sessão do usuário
> Como **Usuário Autorizado**, quero encerrar minha sessão no sistema ao final do turno, para garantir que nenhum outro usuário acesse o sistema em meu nome no dispositivo compartilhado.

**Critérios de Aceitação:**
- **CA09.1** — Dado que o usuário está autenticado, quando clicar em "Encerrar sessão", então a sessão é encerrada e o usuário é redirecionado para a tela de login.
- **CA09.2** — Dado que a sessão foi encerrada, quando outro usuário acessar o dispositivo, então os dados da sessão anterior não estão mais visíveis nem acessíveis.

---

## CP4 — Gerenciamento de Usuários

### US10 — Cadastrar usuário
> Como **Gestor**, quero cadastrar novos usuários na plataforma, para que cada membro da equipe tenha acesso individual ao sistema com suas credenciais próprias.

**Critérios de Aceitação:**
- **CA10.1** — Dado que o Gestor está autenticado, quando preencher os campos obrigatórios (nome completo, login, perfil e senha provisória) e confirmar, então o novo usuário é criado e pode se autenticar com as credenciais definidas.
- **CA10.2** — Dado que o Gestor tenta cadastrar um login já existente no sistema, quando confirmar, então o sistema exibe mensagem de erro indicando que o login já está em uso e não realiza o cadastro.

---

### US11 — Atualizar dados cadastrais do usuário
> Como **Gestor**, quero atualizar os dados cadastrais de um usuário, para manter as informações da equipe corretas no sistema.

**Critérios de Aceitação:**
- **CA11.1** — Dado que o Gestor está visualizando o perfil de um usuário ativo, quando alterar um ou mais campos e confirmar, então as informações são atualizadas imediatamente no sistema.
- **CA11.2** — Dado que o Gestor altera campos obrigatórios para valores inválidos ou vazios, quando confirmar a atualização, então o sistema informa os campos com problema e não salva as alterações.

---

### US12 — Redefinir senha de acesso do usuário
> Como **Gestor**, quero redefinir a senha de acesso de um membro da equipe, para restaurar o acesso de alguém que esqueceu suas credenciais.

**Critérios de Aceitação:**
- **CA12.1** — Dado que o Gestor selecionou um usuário e definiu uma nova senha provisória, quando confirmar a redefinição, então o usuário consegue autenticar-se com a nova senha.
- **CA12.2** — Dado que a senha foi redefinida, quando o usuário tenta autenticar com a senha antiga, então o acesso é negado.

---

### US13 — Revogar acesso do usuário
> Como **Gestor**, quero revogar o acesso de um usuário ao sistema, para garantir que ex-funcionários não possam mais acessar dados dos residentes após o desligamento.

**Critérios de Aceitação:**
- **CA13.1** — Dado que o Gestor confirmou a revogação de acesso de um usuário, quando esse usuário tentar autenticar-se no sistema, então o acesso será negado.
- **CA13.2** — Dado que o acesso de um usuário foi revogado, quando a equipe consultar registros assistenciais realizados anteriormente por ele, então esses registros serão mantidos no histórico associados à sua identificação.

---

## CP1 — Gestão de Residentes

### US01 — Cadastrar dados do residente
> Como **Gestor**, quero cadastrar os dados pessoais e clínicos de um novo residente, para que a equipe assistencial tenha acesso ao seu perfil digital a partir da admissão.

**Critérios de Aceitação:**
- **CA01.1** — Dado que o Gestor está autenticado, quando preencher os campos obrigatórios (nome completo, data de nascimento, CPF, grau de dependência e responsável legal) e confirmar, então o perfil digital do residente é criado e fica disponível para toda a equipe.
- **CA01.2** — Dado que o Gestor tenta cadastrar sem preencher campos obrigatórios, quando confirmar, então o sistema indica os campos em falta e não realiza o cadastro.

---

### US02 — Editar dados pessoais e clínicos do residente
> Como **Gestor**, quero editar os dados pessoais e clínicos de um residente já cadastrado, para manter o perfil digital atualizado conforme mudanças em seu estado de saúde ou situação pessoal.

**Critérios de Aceitação:**
- **CA02.1** — Dado que o Gestor está visualizando o perfil de um residente ativo, quando alterar um ou mais campos e confirmar, então as alterações são salvas e o perfil atualizado fica visível para toda a equipe.
- **CA02.2** — Dado que o Gestor altera campos obrigatórios para valores inválidos ou vazios, quando confirmar a edição, então o sistema informa os campos com problema e não salva as alterações.

---

### US03 — Inativar o cadastro do residente
> Como **Gestor**, quero inativar o cadastro de um residente que saiu da instituição, para removê-lo do fluxo operacional ativo sem perder seu histórico assistencial.

**Critérios de Aceitação:**
- **CA03.1** — Dado que o Gestor confirmou a inativação de um residente, quando os cuidadores acessarem a lista operacional de residentes, então esse residente não será mais exibido como ativo.
- **CA03.2** — Dado que o residente foi inativado, então todo o seu histórico assistencial permanece acessível no sistema para consulta pela equipe multidisciplinar, em conformidade com a RN-03.

---

## CP2 — Registro Assistencial Digital

### US04 — Registrar sinais vitais do residente
> Como **Cuidador**, quero registrar os sinais vitais de um residente durante o meu turno, para que a equipe de saúde tenha um histórico contínuo e atualizado do seu estado clínico.

**Critérios de Aceitação:**
- **CA04.1** — Dado que o Cuidador está autenticado e selecionou um residente, quando preencher os campos de sinais vitais (pressão arterial, frequência cardíaca, temperatura e glicemia) e confirmar, então o registro é salvo com data, horário automático e identificação do cuidador.
- **CA04.2** — Dado que o dispositivo está sem conexão com a rede, quando o Cuidador realiza e confirma o registro, então os dados são salvos localmente e sincronizados automaticamente quando a conexão for restabelecida (conforme RN-01).

---

### US05 — Registrar rotinas assistenciais do residente
> Como **Cuidador**, quero registrar as rotinas assistenciais (alimentação e higiene) realizadas em um residente, para documentar digitalmente o cuidado prestado em substituição ao formulário em papel.

**Critérios de Aceitação:**
- **CA05.1** — Dado que o Cuidador está autenticado e selecionou um residente, quando registrar as rotinas do turno (alimentação: tipo de refeição e percentual de aceitação; higiene: banho, troca, cuidados bucais) e confirmar, então o registro é salvo com data, horário automático e identificação do cuidador.
- **CA05.2** — Dado que o dispositivo está sem conexão, quando o registro for salvo, então os dados são retidos localmente e sincronizados ao restabelecer a rede (conforme RN-01).

---

### US06 — Registrar administração de medicamentos
> Como **Cuidador**, quero registrar a administração de medicamentos a um residente, para garantir o rastreamento correto da medicação efetivamente administrada em cada turno.

**Critérios de Aceitação:**
- **CA06.1** — Dado que o Cuidador está autenticado e selecionou um residente, quando confirmar a administração de um medicamento, então o registro é salvo com nome do medicamento, horário de administração e identificação do cuidador.
- **CA06.2** — Dado que o residente recusou ou não pôde receber o medicamento, quando o Cuidador registrar a não administração com o motivo, então a ocorrência é salva e associada ao histórico do turno.

---

### US07 — Registrar ocorrências clínicas do residente
> Como **Cuidador**, quero registrar ocorrências clínicas observadas em um residente durante o turno, para documentar eventos relevantes que precisam de atenção ou notificação à equipe.

**Critérios de Aceitação:**
- **CA07.1** — Dado que o Cuidador está autenticado e selecionou um residente, quando selecionar uma ou mais ocorrências da lista padronizada e/ou preencher o campo "Outros (especificar)" e confirmar, então o registro é salvo com data, horário e identificação do cuidador.
- **CA07.2** — Dado que a ocorrência registrada é "Queda" ou "Tentativa de suicídio", quando o registro for salvo, então o sistema sinaliza que o evento é um caso sentinela e requer notificação à autoridade sanitária, conforme a RN-04.

---

## CP5 — Consulta do Histórico Assistencial

### US14 — Consultar histórico de registros do residente
> Como **Membro da equipe multidisciplinar**, quero consultar o histórico cronológico de registros de um residente, para acompanhar a evolução clínica e embasar decisões de intervenção.

**Critérios de Aceitação:**
- **CA14.1** — Dado que o usuário está autenticado e selecionou um residente, quando acessar o histórico assistencial, então o sistema exibe a lista de todos os registros em ordem cronológica decrescente (mais recente primeiro), com data, horário, tipo de registro e nome do cuidador responsável.
- **CA14.2** — Dado que o residente selecionado ainda não possui registros assistenciais, quando o usuário acessar o histórico, então o sistema exibe uma mensagem informando que não há registros disponíveis.
---

### US15 — Filtrar histórico por período
> Como **Membro da equipe multidisciplinar**, quero filtrar o histórico assistencial de um residente por período, para localizar registros específicos e analisar a evolução em um intervalo de tempo determinado.

**Critérios de Aceitação:**
- **CA15.1** — Dado que o usuário está visualizando o histórico de um residente, quando definir uma data de início e uma data de fim e aplicar o filtro, então o sistema exibe apenas os registros dentro do intervalo selecionado, mantendo a ordenação cronológica.
- **CA15.2** — Dado que o período filtrado não retorna nenhum registro, quando o filtro for aplicado, então o sistema exibe uma mensagem informando que não há registros no período selecionado.

---

### US16 — Visualizar resumo assistencial do residente
> Como **Membro da equipe multidisciplinar**, quero visualizar um resumo assistencial consolidado de um residente, para obter rapidamente uma visão geral do seu estado atual antes de uma intervenção ou reunião clínica.

**Critérios de Aceitação:**
- **CA16.1** — Dado que o usuário está autenticado e selecionou um residente, quando acessar a seção de resumo assistencial, então o sistema exibe o último registro de cada módulo (sinais vitais, rotinas, medicamentos e ocorrências), com data, horário e nome do responsável pelo registro.
- **CA16.2** — Dado que o residente selecionado ainda não possui registros em algum módulo assistencial, quando o usuário acessar o resumo, então o sistema exibe a ausência de informação naquele módulo sem impedir a visualização dos demais dados disponíveis.

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 17/05/2026 | 1.0 | Criação do documento com US01–US16 derivadas dos RFs revisados (RF01–RF16). | Gustavo Xavier |
| 17/05/2026 | 1.1 | Adição dos critérios de aceitação (CA) para todas as user stories. Reorganização na ordem cronológica do Story Map (CP3 → CP4 → CP1 → CP2 → CP5). | Gustavo Xavier |
| 18/05/2026 | 1.2 | Ajustes nas personas das histórias de autenticação e sessão, padronização dos critérios de aceitação no formato Dado/Quando/Então, inclusão de cenários negativos e melhoria das referências às regras de negócio. | Enzo Menali|
