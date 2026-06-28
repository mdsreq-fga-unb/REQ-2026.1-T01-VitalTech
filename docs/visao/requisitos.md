# REQUISITOS DE SOFTWARE

## VitalTech — Requisitos Funcionais e Não Funcionais

Este documento consolida a lista de requisitos funcionais e não funcionais do VitalTech, além de sua matriz de rastreabilidade com as Características do Produto (CP). Os requisitos funcionais são apresentados no formato verbo no infinitivo + objeto. Os requisitos não funcionais incluem nome, descrição técnica e classificação segundo os modelos URPS+ e/ou Sommerville.

---

## 1. Relação de Requisitos Funcionais (RFs) com as Características do Produto (CP)

A tabela abaixo apresenta os requisitos funcionais do VitalTech. Cada RF deriva de exatamente uma Característica do Produto (CP) e representa uma ação realizada pelo usuário.

| Código | Requisito | CP | Justificativa |
| :--- | :--- | :--- | :--- |
| <a id="rf01"></a>**RF01** | Cadastrar dados do residente | CP1 | Cria o perfil digital do residente, substituindo a ficha em papel. |
| <a id="rf02"></a>**RF02** | Editar dados pessoais e clínicos do residente | CP1 | Atualiza informações do residente conforme necessidade clínica ou administrativa. |
| <a id="rf03"></a>**RF03** | Inativar o cadastro do residente | CP1 | Remove o residente do fluxo operacional ativo sem excluir o histórico (soft delete). |
| <a id="rf04"></a>**RF04** | Registrar, editar e consultar sinais vitais do residente | CP2 | Digitaliza a aferição periódica e a consulta clínica no ponto de cuidado, considerando validação de intervalos clínicos e alerta para valores fora dos parâmetros definidos. |
| <a id="rf05"></a>**RF05** | Registrar, editar e consultar rotinas assistenciais do residente | CP2 | Documenta e permite revisão da alimentação e higiene do residente. |
| <a id="rf06"></a>**RF06** | Registrar, editar e consultar administração de medicamentos | CP2 | Documenta e permite conferir a medicação efetivamente administrada no turno, incluindo medicamento, dose, via, horário e registro de não administração quando houver recusa ou impedimento. |
| <a id="rf07"></a>**RF07** | Registrar, editar e consultar ocorrências clínicas do residente | CP2 | Registra e permite consulta de eventos e intercorrências observados durante o cuidado. |
| <a id="rf08"></a>**RF08** | Autenticar usuário no sistema | CP3 | Controla o acesso ao sistema por meio de credenciais individuais. |
| <a id="rf09"></a>**RF09** | Encerrar sessão do usuário | CP3 | Garante a segurança do dispositivo compartilhado após o uso. |
| <a id="rf10"></a>**RF10** | Cadastrar usuário | CP4 | Permite ao gestor incluir novos membros da equipe no sistema. |
| <a id="rf11"></a>**RF11** | Atualizar dados cadastrais do usuário | CP4 | Mantém as informações da equipe atualizadas. |
| <a id="rf12"></a>**RF12** | Redefinir senha de acesso do usuário | CP4 | Permite ao gestor restaurar o acesso de um usuário que esqueceu a senha. |
| <a id="rf13"></a>**RF13** | Revogar acesso do usuário | CP4 | Bloqueia o acesso ao sistema em casos de desligamento da equipe. |
| <a id="rf14"></a>**RF14** | Consultar histórico de registros do residente | CP5 | Permite à equipe visualizar a evolução clínica cronológica do residente. |
| <a id="rf15"></a>**RF15** | Filtrar histórico por período | CP5 | Facilita a busca de registros por períodos definidos, como turno, últimas 24 horas ou intervalo personalizado de datas. |
| <a id="rf16"></a>**RF16** | Visualizar resumo assistencial do residente | CP5 | Exibe visão consolidada do estado atual e recente do residente para apoio à decisão. |

---

## 2. Regras de Negócio (RNs)

As regras de negócio definem restrições e comportamentos impostos pelo contexto operacional e legal da instituição, independentemente de ação direta do usuário.

| Código | Regra de Negócio | Fundamento |
| :--- | :--- | :--- |
| <a id="rn-01"></a>**RN-01** | Todo registro assistencial deve poder ser realizado independentemente da disponibilidade de conexão com o servidor, sendo sincronizado automaticamente quando a conexão for restabelecida. | Infraestrutura de rede instável da instituição |
| <a id="rn-02"></a>**RN-02** | Todo registro assistencial inserido em qualquer dispositivo da equipe deve ser consolidado em um único repositório de dados institucional, garantindo que a informação esteja disponível a todos os perfis autorizados e eliminando silos de informação. | Eliminação do retrabalho de dupla digitação |
| <a id="rn-03"></a>**RN-03** | O histórico assistencial de um residente inativado não pode ser excluído do sistema. Todos os registros de saúde devem ser preservados por no mínimo 20 anos após a data do último atendimento, em conformidade com a Resolução CFM nº 1.821/2007 e com os requisitos de retenção de dados sensíveis estabelecidos pela LGPD (Lei nº 13.709/2018, Art. 11 e 16). | Obrigação legal |
| <a id="rn-04"></a>**RN-04** | A ocorrência de queda com lesão ou tentativa de suicídio de um residente deve ser registrada no sistema com data, horário e responsável pelo lançamento, em conformidade com o item 6.2 da RDC ANVISA nº 283/2005, para subsidiar a notificação obrigatória à autoridade sanitária local. | RDC ANVISA 283/2005, Art. 6.2 |
| <a id="rn-05"></a>**RN-05** | Nenhum formulário de registro assistencial pode ser submetido com campos obrigatórios em branco. O sistema deve impedir o salvamento e indicar ao usuário quais campos precisam ser preenchidos. | Integridade dos dados e padronização dos registros |
| <a id="rn-06"></a>**RN-06** | Os valores inseridos nas aferições de sinais vitais devem ser validados contra intervalos clínicos de referência (ex.: PA sistólica entre 60–250 mmHg; temperatura entre 34–42°C; glicemia entre 20–600 mg/dL). Valores fora desses limites não podem ser salvos sem confirmação explícita do usuário. | Prevenção de erros de digitação clínica |
| <a id="rn-07"></a>**RN-07** | Quando os valores registrados de sinais vitais estiverem fora dos parâmetros clínicos normais, o sistema deve sinalizar o registro com alerta visual, indicando a necessidade de avaliação pela equipe responsável. | Segurança clínica e apoio à tomada de decisão |
| <a id="rn-08"></a>**RN-08** | Todo registro de administração de medicamento deve incluir o horário exato de administração e não pode ser salvo sem essa informação, garantindo o rastreamento preciso de dosagens e dos intervalos entre administrações. | Controle de dosagem e segurança farmacológica |
| <a id="rn-09"></a>**RN-09** | Após o salvamento de qualquer registro assistencial, o sistema deve exibir confirmação visual ao usuário informando que os dados foram persistidos com sucesso, garantindo ciência do cuidador antes de prosseguir para o próximo atendimento. | Confiabilidade operacional em ambiente de alta rotatividade |

---
## 3. Lista de Requisitos Não Funcionais (RNFs) com as Características de Produto(CP)

Os requisitos não funcionais definem restrições, atributos de qualidade e critérios mensuráveis que orientam o comportamento do sistema VitalTech. Cada RNF está associado a exatamente uma Característica de Produto (CP), conforme a matriz de rastreabilidade do projeto, e foi classificado com base nos modelos URPS+ e/ou Sommerville.

| Código | Nome do Requisito (RNF) | Descrição Mensurável | Característica de Produto Associada | Classificação (URPS+ / Sommerville) |
| :--- | :--- | :--- | :--- | :--- |
| <a id="rnf01"></a>**RNF01** | Integridade e preservação dos dados | Os registros assistenciais devem manter vínculo com o residente correto, sem perda, duplicidade ou quebra de referência entre cadastro e histórico. | **CP1** | Confiabilidade / Produto |
| <a id="rnf02"></a>**RNF02** | Clareza ocupacional nos formulários | Os formulários de cadastro e atualização de residentes devem utilizar rótulos, campos e mensagens compreendidos por representantes da equipe da instituição em inspeção de usabilidade, com no mínimo 80% dos itens avaliados como claros. | **CP1** | Usabilidade / Produto|
| <a id="rnf03"></a>**RNF03** | Interface poupadora de cliques | Os fluxos principais de registro assistencial devem priorizar botões, seletores e campos pré-definidos, limitando o uso de campos de texto livre a situações em que não houver opção padronizada aplicável. | **CP2** | Usabilidade / Usabilidade |
| <a id="rnf04"></a>**RNF04** | Ergonomia de tela para tablets | A interface dos registros assistenciais deve ser adequada ao uso em tablets, com componentes interativos de tamanho mínimo de 44x44 px e espaçamento suficiente para reduzir acionamentos incorretos por toque. | **CP2** | Usabilidade / Usabilidade |
| <a id="rnf05"></a>**RNF05** | Desempenho no registro local | O sistema deve confirmar o salvamento local de um registro assistencial em até 1 segundo após o usuário acionar a opção de salvar. | **CP2** | Desempenho / Eficiência |
| <a id="rnf06"></a>**RNF06** | Consistência estrutural do registro | Todos os registros assistenciais do produto devem seguir estrutura padronizada, contendo obrigatoriamente residente associado, tipo de registro, data, horário e responsável pelo lançamento. | **CP2** | Confiabilidade / Organização |
| <a id="rnf07"></a>**RNF07** | Rastreabilidade dos registros assistenciais | Todo registro assistencial deve armazenar automaticamente autoria, data e horário de criação, sem permitir alteração desses metadados pela interface do usuário. | **CP2** | Segurança (+) / Segurança |
| <a id="rnf08"></a>**RNF08** | Tolerância à queda de conexão | Em caso de perda de conexão durante o uso, o sistema deve preservar os dados já preenchidos e permitir a continuidade do registro assistencial em modo local, sem exigir reinício do preenchimento. | **CP2** | Confiabilidade / Disponibilidade |
| <a id="rnf09"></a>**RNF09** | Transparência da sincronização | Os registros locais devem apresentar um dos estados: salvo localmente, pendente de sincronização ou sincronizado; a atualização visual do estado deve ocorrer em até 3 segundos após mudança de conectividade. | **CP2** | Confiabilidade / Confiabilidade |
| <a id="rnf10"></a>**RNF10** | Segurança na autenticação | As tentativas de acesso com credenciais inválidas ou sessão ausente devem ser rejeitadas; mensagens de erro não devem revelar se o login, senha ou perfil foi o campo inválido. | **CP3** | Segurança (+) / Segurança |
| <a id="rnf11"></a>**RNF11** | Segurança de sessão em dispositivo compartilhado | O usuário deve ser desconectado após no máximo 15 minutos de inatividade; após encerramento manual ou automático, dados de sessão não devem permanecer acessíveis ao próximo usuário do dispositivo. | **CP3** | Segurança (+) / Segurança |
| <a id="rnf12"></a>**RNF12** | Controle de permissões por perfil | As funcionalidades e dados restritos do sistema devem ficar indisponíveis para perfis não autorizados e disponíveis apenas para perfis com permissão correspondente. | **CP4** | Segurança (+) / Segurança |
| <a id="rnf13"></a>**RNF13** | Rastreabilidade das ações administrativas | Ações administrativas relacionadas a usuários, permissões e acessos devem registrar automaticamente responsável, data, horário e tipo de ação realizada. | **CP4** | Segurança (+) / Segurança |
| <a id="rnf14"></a>**RNF14** | Confidencialidade dos dados de usuários e residentes | Campos pessoais, clínicos e administrativos do sistema classificados como sensíveis devem ser exibidos somente a usuários autorizados. | **CP4** | Segurança (+) / Segurança |
| <a id="rnf15"></a>**RNF15** | Legibilidade do histórico assistencial | Cada item do histórico assistencial deve apresentar tipo de registro, data, horário e responsável em formato que permita identificar essas quatro informações em até 5 segundos por registro. | **CP5** | Usabilidade / Usabilidade |
| <a id="rnf16"></a>**RNF16** | Desempenho na consulta e filtragem do histórico | A consulta ao histórico assistencial deve retornar os registros em até 3 segundos em rede estável, considerando uma base operacional de até 74 residentes ativos. A aplicação de filtros sobre registros já carregados deve ocorrer em até 1 segundo. | **CP5** | Desempenho / Eficiência |
---

## 4. Matriz de Rastreabilidade Simples

![Matriz de Rastreabilidade Simples](../assets/pictures/rastreabilidade_requisitos.jpg)

### 4.1 Matriz Operacional de Rastreabilidade

A matriz abaixo explicita a rastreabilidade entre User Stories, Requisitos Funcionais, Regras de Negócio, Requisitos Não Funcionais e Critérios de Aceitação. Ela complementa a matriz visual anterior e permite verificar objetivamente quais regras e atributos de qualidade sustentam cada história.

| User Story | RF relacionado | RN relacionada | RNF relacionado | Critérios de Aceitação |
| :---: | :---: | :--- | :--- | :--- |
| [**US01**](user_stories.md#us01) | [RF01](#rf01) | — | [RNF01](#rnf01), [RNF02](#rnf02), [RNF14](#rnf14) | [CA01.1](user_stories.md#us01), [CA01.2](user_stories.md#us01), [CA01.3](user_stories.md#us01) |
| [**US02**](user_stories.md#us02) | [RF02](#rf02) | — | [RNF01](#rnf01), [RNF02](#rnf02), [RNF12](#rnf12), [RNF14](#rnf14) | [CA02.1](user_stories.md#us02), [CA02.2](user_stories.md#us02), [CA02.3](user_stories.md#us02), [CA02.4](user_stories.md#us02) |
| [**US03**](user_stories.md#us03) | [RF03](#rf03) | [RN-03](#rn-03) | [RNF01](#rnf01), [RNF12](#rnf12), [RNF14](#rnf14) | [CA03.1](user_stories.md#us03), [CA03.2](user_stories.md#us03) |
| [**US04**](user_stories.md#us04) | [RF04](#rf04) | [RN-01](#rn-01), [RN-05](#rn-05), [RN-06](#rn-06), [RN-07](#rn-07), [RN-09](#rn-09) | [RNF03](#rnf03), [RNF04](#rnf04), [RNF05](#rnf05), [RNF06](#rnf06), [RNF07](#rnf07), [RNF08](#rnf08), [RNF09](#rnf09) | [CA04.1](user_stories.md#us04), [CA04.2](user_stories.md#us04), [CA04.3](user_stories.md#us04), [CA04.4](user_stories.md#us04), [CA04.5](user_stories.md#us04), [CA04.6](user_stories.md#us04) |
| [**US05**](user_stories.md#us05) | [RF05](#rf05) | [RN-01](#rn-01), [RN-05](#rn-05), [RN-09](#rn-09) | [RNF03](#rnf03), [RNF04](#rnf04), [RNF05](#rnf05), [RNF06](#rnf06), [RNF07](#rnf07), [RNF08](#rnf08), [RNF09](#rnf09) | [CA05.1](user_stories.md#us05), [CA05.2](user_stories.md#us05), [CA05.3](user_stories.md#us05), [CA05.4](user_stories.md#us05), [CA05.5](user_stories.md#us05) |
| [**US06**](user_stories.md#us06) | [RF06](#rf06) | [RN-01](#rn-01), [RN-05](#rn-05), [RN-08](#rn-08), [RN-09](#rn-09) | [RNF03](#rnf03), [RNF04](#rnf04), [RNF05](#rnf05), [RNF06](#rnf06), [RNF07](#rnf07), [RNF08](#rnf08), [RNF09](#rnf09) | [CA06.1](user_stories.md#us06), [CA06.2](user_stories.md#us06), [CA06.3](user_stories.md#us06), [CA06.4](user_stories.md#us06), [CA06.5](user_stories.md#us06), [CA06.6](user_stories.md#us06) |
| [**US07**](user_stories.md#us07) | [RF07](#rf07) | [RN-01](#rn-01), [RN-04](#rn-04), [RN-05](#rn-05), [RN-09](#rn-09) | [RNF03](#rnf03), [RNF04](#rnf04), [RNF05](#rnf05), [RNF06](#rnf06), [RNF07](#rnf07), [RNF08](#rnf08), [RNF09](#rnf09) | [CA07.1](user_stories.md#us07), [CA07.2](user_stories.md#us07), [CA07.3](user_stories.md#us07), [CA07.4](user_stories.md#us07), [CA07.5](user_stories.md#us07), [CA07.6](user_stories.md#us07) |
| [**US08**](user_stories.md#us08) | [RF08](#rf08) | — | [RNF10](#rnf10), [RNF12](#rnf12), [RNF14](#rnf14) | [CA08.1](user_stories.md#us08), [CA08.2](user_stories.md#us08), [CA08.3](user_stories.md#us08) |
| [**US09**](user_stories.md#us09) | [RF09](#rf09) | — | [RNF11](#rnf11) | [CA09.1](user_stories.md#us09), [CA09.2](user_stories.md#us09), [CA09.3](user_stories.md#us09) |
| [**US10**](user_stories.md#us10) | [RF10](#rf10) | — | [RNF12](#rnf12), [RNF13](#rnf13), [RNF14](#rnf14) | [CA10.1](user_stories.md#us10), [CA10.2](user_stories.md#us10), [CA10.3](user_stories.md#us10), [CA10.4](user_stories.md#us10) |
| [**US11**](user_stories.md#us11) | [RF11](#rf11) | — | [RNF12](#rnf12), [RNF13](#rnf13), [RNF14](#rnf14) | [CA11.1](user_stories.md#us11), [CA11.2](user_stories.md#us11), [CA11.3](user_stories.md#us11), [CA11.4](user_stories.md#us11) |
| [**US12**](user_stories.md#us12) | [RF12](#rf12) | — | [RNF12](#rnf12), [RNF13](#rnf13), [RNF14](#rnf14) | [CA12.1](user_stories.md#us12), [CA12.2](user_stories.md#us12), [CA12.3](user_stories.md#us12) |
| [**US13**](user_stories.md#us13) | [RF13](#rf13) | — | [RNF12](#rnf12), [RNF13](#rnf13), [RNF14](#rnf14) | [CA13.1](user_stories.md#us13), [CA13.2](user_stories.md#us13), [CA13.3](user_stories.md#us13) |
| [**US14**](user_stories.md#us14) | [RF14](#rf14) | [RN-02](#rn-02), [RN-03](#rn-03) | [RNF01](#rnf01), [RNF07](#rnf07), [RNF12](#rnf12), [RNF15](#rnf15), [RNF16](#rnf16) | [CA14.1](user_stories.md#us14), [CA14.2](user_stories.md#us14), [CA14.3](user_stories.md#us14), [CA14.4](user_stories.md#us14) |
| [**US15**](user_stories.md#us15) | [RF15](#rf15) | — | [RNF12](#rnf12), [RNF15](#rnf15), [RNF16](#rnf16) | [CA15.1](user_stories.md#us15), [CA15.2](user_stories.md#us15), [CA15.3](user_stories.md#us15) |
| [**US16**](user_stories.md#us16) | [RF16](#rf16) | — | [RNF12](#rnf12), [RNF15](#rnf15), [RNF16](#rnf16) | [CA16.1](user_stories.md#us16), [CA16.2](user_stories.md#us16), [CA16.3](user_stories.md#us16) |

### 4.2 Observações de Rastreabilidade

- **RN-05** foi associada às histórias de registro assistencial que possuem campos obrigatórios de cuidado direto: US04, US05, US06 e US07.
- **RN-06** e **RN-07** foram associadas à US04 por tratarem especificamente de validação e alerta de sinais vitais.
- **RN-08** foi associada à US06 por tratar do horário exato na administração de medicamentos.
- **RN-04** foi associada à US07 por tratar de ocorrências clínicas que podem exigir notificação sanitária.
- **RN-01**, **RNF08** e **RNF09** foram associados às histórias com operação offline em registros assistenciais: US04, US05, US06 e US07.
- Os RNFs de segurança e controle de acesso (**RNF10**, **RNF11**, **RNF12**, **RNF13** e **RNF14**) foram ligados às histórias de autenticação, sessão e administração de usuários, especialmente US08 a US13.

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 03/04/2026 | 1.0 | Criação deste documento. | Gustavo Xavier |
| 17/05/2026 | 1.1 | Reestruturação completa: redução de 30 para 16 RFs, adição das RNs (RN-01 a RN-04). | Gustavo Xavier |
| 17/05/2026 | 1.2 | Adição de RN-05 a RN-09, convertidas de RFs antigos conforme feedback do professor. | Gustavo Xavier |
| 18/05/2026 | 1.3 | Adição de RNFS | Enzo Menali |
| 04/06/2026 | 1.4 | Ajuste nos RNFs apontados em feedback para reforçar atributos de qualidade mensuráveis e evitar escrita como regras de negócio. | Enzo Menali |
| 16/06/2026 | 1.5 | Ajuste de justificativas dos RFs e descrições mensuráveis dos RNFs para melhorar verificabilidade sem alterar IDs ou rastreabilidade. | Enzo Menali |
| 28/06/2026 | 1.6 | Inclusão da matriz operacional US-RF-RN-RNF-CA e explicitação das relações entre regras de negócio, RNFs e critérios de aceitação. | Enzo Menali |
