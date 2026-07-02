# 6. Matriz de Priorização

## Priorização de Requisitos e Escopo

Para apoiar a definição do escopo do Produto Mínimo Viável (MVP) do sistema VitalTech, a equipe utilizou uma abordagem mista, combinando análise quantitativa e qualitativa dos requisitos.

A matriz de priorização considera tanto **User Stories (USs)** quanto **Requisitos Não Funcionais (RNFs)**, pois ambos influenciam diretamente a entrega de valor do produto. As USs representam funcionalidades executadas pelo sistema, enquanto os RNFs representam atributos de qualidade, restrições técnicas e condições de operação, como segurança, desempenho, usabilidade, rastreabilidade e confiabilidade.

Embora USs e RNFs possuam naturezas diferentes, ambos foram avaliados a partir de dois eixos comuns: **Impacto** e **Esforço**. Dessa forma, foi possível posicioná-los em uma mesma matriz de priorização, mantendo a distinção entre os tipos de requisito.

---

## 1. Metodologia de Avaliação

A avaliação dos requisitos foi realizada utilizando uma escala de 1 a 5.

| Nota | Interpretação |
| :---: | :--- |
| 1 | Muito baixo |
| 2 | Baixo |
| 3 | Médio |
| 4 | Alto |
| 5 | Muito alto |

Para a classificação final dos valores médios, foi adotada a seguinte escala:

| Média | Classificação |
| :---: | :--- |
| 1,0 a 2,4 | Baixo |
| 2,5 a 3,4 | Médio |
| 3,5 a 5,0 | Alto |

Embora cada critério individual seja avaliado com nota inteira de 1 a 5, os valores finais de **Impacto** e **Esforço** podem apresentar casas decimais, pois são calculados pela média aritmética dos critérios avaliados.

---

## 2. Critérios para User Stories

Para as **User Stories (USs)**, o impacto foi calculado considerando os seguintes critérios:

| Critério | Sigla | Descrição |
| :--- | :---: | :--- |
| Valor operacional | VO | Quanto o requisito ajuda na rotina da instituição. |
| Frequência de uso | FU | Com que frequência a funcionalidade tende a ser usada. |
| Criticidade assistencial | CA | Quanto o requisito se relaciona com o cuidado ao residente. |
| Dependência funcional | DF | Quanto outros requisitos dependem dele. |
| Criticidade para o Fluxo Principal | CF | Quanto o requisito é indispensável para que o fluxo central do sistema funcione (login → cadastro → registro assistencial → consulta do histórico). |

A fórmula utilizada para o impacto das USs foi:

| Fórmula | Expressão |
| :--- | :--- |
| **Impacto US** | **(VO + FU + CA + DF + CF) / 5** |

Para o esforço das USs, foram considerados os seguintes critérios:

| Critério | Sigla | Descrição |
| :--- | :---: | :--- |
| Complexidade técnica | CT | Dificuldade de implementação da funcionalidade. |
| Quantidade de telas ou fluxos | QT | Número de interfaces ou fluxos afetados. |
| Regras de negócio | RN | Quantidade de validações e exceções envolvidas. |
| Dependência de módulos | DM | Relação com outras partes do sistema. |
| Necessidade de testes | NT | Quantidade de cenários necessários para validar a funcionalidade. |

A fórmula utilizada para o esforço das USs foi:

| Fórmula | Expressão |
| :--- | :--- |
| **Esforço US** | **(CT + QT + RN + DM + NT) / 5** |

---

## 3. Critérios para Requisitos Não Funcionais

Para os **Requisitos Não Funcionais (RNFs)**, o impacto foi calculado considerando os seguintes critérios:

| Critério | Sigla | Descrição |
| :--- | :---: | :--- |
| Risco operacional | RO | Risco gerado caso o requisito não seja atendido. |
| Impacto na segurança/confiabilidade | SC | Relação com proteção, integridade e continuidade do uso. |
| Impacto na usabilidade | US | Quanto o requisito afeta a facilidade de uso. |
| Criticidade para o MVP | CM | Quanto o requisito é necessário para validar o produto inicial. |
| Verificabilidade | VF | Facilidade de demonstrar, testar ou evidenciar o requisito. |

A fórmula utilizada para o impacto dos RNFs foi:

| Fórmula | Expressão |
| :--- | :--- |
| **Impacto RNF** | **(RO + SC + US + CM + VF) / 5** |

Para o esforço dos RNFs, foram considerados os seguintes critérios:

| Critério | Sigla | Descrição |
| :--- | :---: | :--- |
| Dificuldade técnica | DT | Dificuldade de implementar o requisito. |
| Impacto arquitetural | IA | Quanto o requisito afeta a estrutura do sistema. |
| Dependência de infraestrutura | INF | Necessidade de conexão, armazenamento local, autenticação ou sincronização. |
| Necessidade de medição/testes | NT | Necessidade de validar desempenho, segurança ou confiabilidade. |
| Abrangência no sistema | ABR | Quantas partes do sistema são afetadas pelo requisito. |

A fórmula utilizada para o esforço dos RNFs foi:

| Fórmula | Expressão |
| :--- | :--- |
| **Esforço RNF** | **(DT + IA + INF + NT + ABR) / 5** |

---

## 4. Cálculo do Índice de Prioridade

A equipe utilizou o **Índice de Prioridade (IP)** para apoiar a comparação entre os requisitos. O cálculo adotado foi:

| Fórmula | Expressão |
| :--- | :--- |
| **Índice de Prioridade (IP)** | **(2 × Impacto) - Esforço** |

Onde:

| Sigla | Significado |
| :---: | :--- |
| **IP** | Índice de Prioridade |
| **Impacto** | Valor médio calculado a partir dos critérios de impacto |
| **Esforço** | Valor médio calculado a partir dos critérios de esforço |

O impacto recebeu peso 2 porque, para a definição do MVP, o valor entregue ao cliente deve ter maior relevância do que o esforço técnico. O esforço, por sua vez, atua como fator de redução da prioridade, pois requisitos mais complexos exigem maior planejamento, validação e tempo de implementação.

Exemplo de cálculo para um requisito de **alto impacto e baixo esforço**:

| Etapa | Cálculo |
| :--- | :--- |
| Fórmula | **IP = (2 × Impacto) - Esforço** |
| Substituição | **IP = (2 × 5) - 2** |
| Resultado | **IP = 8** |

Nesse caso, o requisito possui alta prioridade, pois entrega muito valor e exige esforço relativamente baixo.

Exemplo de cálculo para um requisito de **alto impacto e alto esforço**:

| Etapa | Cálculo |
| :--- | :--- |
| Fórmula | **IP = (2 × Impacto) - Esforço** |
| Substituição | **IP = (2 × 5) - 5** |
| Resultado | **IP = 5** |

Nesse caso, o requisito continua sendo importante, mas exige maior planejamento por possuir alto esforço.

---

## 5. Classificação dos Requisitos

A classificação inicial dos requisitos foi realizada a partir da relação estrutural entre **Impacto** e **Esforço**.

| Impacto | Esforço | Classificação | Decisão |
| :---: | :---: | :--- | :--- |
| Alto | Baixo | Prioridade imediata | Entra no MVP |
| Alto | Médio | Prioridade planejada | Entra no MVP, com planejamento |
| Alto | Alto | Essencial complexa | Entra no MVP (Validado pelo Cliente) |
| Médio | Baixo | Incremento rápido | Fica após o MVP |
| Médio | Médio | Incremento planejado | Fica após o MVP |
| Médio/Baixo | Alto | Baixa prioridade | Fica fora do MVP inicial |

A matriz visual foi interpretada a partir da relação entre impacto e esforço/complexidade técnica. Assim, o **IP** foi utilizado como apoio quantitativo, enquanto a matriz permitiu visualizar a posição estratégica de cada requisito no escopo do produto antes e depois da homologação com o cliente.

---

## 6. Matriz de Valor x Complexidade Técnica

A matriz abaixo apresenta a distribuição visual das User Stories e Requisitos Não Funcionais do VitalTech, considerando o impacto de cada requisito para o produto e o esforço necessário para sua implementação.

<iframe style="border: 1px solid rgba(0, 0, 0, 0.1);" width="800" height="450" src="https://embed.figma.com/design/dAVcH0JF9Aud1RlG6vwfjh/Untitled?node-id=0-1&embed-host=share" allowfullscreen></iframe>

---

## 7. Cálculo das User Stories

> **Nota de Ajuste de Escopo:** Em conformidade com a validação posterior do cliente detalhada na Seção 10, todas as user stories com impacto classificado como **Alto** (valores de 3,5 a 5,0), pertencentes aos quadrantes superiores da matriz, foram confirmadas no MVP. A **US11** também foi incluída como exceção validada pelo cliente, apesar de possuir impacto médio.

| Código | User Story | Impacto | Esforço | Cálculo do IP | IP | Classificação | MVP |
| :--- | :--- | :---: | :---: | :--- | :---: | :--- | :---: |
| **US01** | Cadastrar dados do residente | 5,0 | 2,4 | (2 × 5,0) - 2,4 | **7,6** | Prioridade imediata | Sim |
| **US02** | Editar dados pessoais e clínicos do residente | 4,0 | 2,6 | (2 × 4,0) - 2,6 | **5,4** | Prioridade planejada | Sim |
| **US03** | Inativar o cadastro do residente | 3,0 | 1,8 | (2 × 3,0) - 1,8 | **4,2** | Incremento rápido | Não |
| **US04** | Registrar, editar e consultar sinais vitais do residente | 5,0 | 3,0 | (2 × 5,0) - 3,0 | **7,0** | Prioridade planejada | Sim |
| **US05** | Registrar, editar e consultar rotinas assistenciais do residente | 4,8 | 3,0 | (2 × 4,8) - 3,0 | **6,6** | Prioridade planejada | Sim |
| **US06** | Registrar, editar e consultar administração de medicamentos | 5,0 | 3,6 | (2 × 5,0) - 3,6 | **6,4** | Essencial complexa | **Sim** |
| **US07** | Registrar, editar e consultar ocorrências clínicas do residente | 4,7 | 3,0 | (2 × 4,7) - 3,0 | **6,4** | Prioridade planejada | Sim |
| **US08** | Autenticar usuário no sistema | 5,0 | 2,3 | (2 × 5,0) - 2,3 | **7,7** | Prioridade imediata | Sim |
| **US09** | Encerrar sessão do usuário | 3,8 | 1,5 | (2 × 3,8) - 1,5 | **6,1** | Prioridade imediata | Sim |
| **US10** | Cadastrar usuário | 4,2 | 2,8 | (2 × 4,2) - 2,8 | **5,6** | Prioridade planejada | Sim |
| **US11** | Atualizar dados cadastrais do usuário | 3,1 | 2,2 | (2 × 3,1) - 2,2 | **4,0** | Incremento rápido | **Sim** |
| **US12** | Redefinir senha de acesso do usuário | 3,7 | 2,5 | (2 × 3,7) - 2,5 | **4,9** | Prioridade planejada | **Sim** |
| **US13** | Revogar acesso do usuário | 4,3 | 2,3 | (2 × 4,3) - 2,3 | **6,3** | Prioridade imediata | Sim |
| **US14** | Consultar histórico de registros do residente | 5,0 | 3,4 | (2 × 5,0) - 3,4 | **6,6** | Prioridade planejada | Sim |
| **US15** | Filtrar histórico por período | 4,1 | 2,5 | (2 × 4,1) - 2,5 | **5,7** | Prioridade planejada | Sim |
| **US16** | Visualizar resumo assistencial do residente | 4,0 | 3,5 | (2 × 4,0) - 3,5 | **4,5** | Essencial complexa | **Sim** |

> **Nota:** As histórias US04, US05, US06 e US07 representam fluxos assistenciais completos. A priorização considera a história principal, enquanto os critérios de aceitação detalham os cenários de registro, edição e consulta.

---

## 8. Cálculo dos Requisitos Não Funcionais

> **Nota de Ajuste de Escopo:** Em total consistência com as diretrizes estratégicas estabelecidas na reunião de homologação, todos os requisitos não funcionais de impacto **Alto** foram integrados ao MVP para garantir as premissas de segurança, robustez local e resiliência offline demandadas pelo negócio.

| Código | Requisito Não Funcional | Impacto | Esforço | Cálculo do IP | IP | Classificação | MVP |
| :--- | :--- | :---: | :---: | :--- | :---: | :--- | :---: |
| **RNF01** | Integridade e preservação dos dados | 5,0 | 3,8 | (2 × 5,0) - 3,8 | **6,2** | Essencial complexa | Sim |
| **RNF02** | Clareza ocupacional nos formulários | 4,5 | 2,0 | (2 × 4,5) - 2,0 | **7,0** | Prioridade imediata | Sim |
| **RNF03** | Interface poupadora de cliques | 4,4 | 2,2 | (2 × 4,4) - 2,2 | **6,6** | Prioridade imediata | Sim |
| **RNF04** | Ergonomia de tela para tablets | 4,5 | 2,6 | (2 × 4,5) - 2,6 | **6,4** | Prioridade planejada | Sim |
| **RNF05** | Desempenho no registro local | 4,8 | 3,0 | (2 × 4,8) - 3,0 | **6,6** | Prioridade planejada | Sim |
| **RNF06** | Consistência estrutural do registro | 4,6 | 2,7 | (2 × 4,6) - 2,7 | **6,5** | Prioridade planejada | Sim |
| **RNF07** | Rastreabilidade dos registros assistenciais | 5,0 | 3,2 | (2 × 5,0) - 3,2 | **6,8** | Prioridade planejada | Sim |
| **RNF08** | Tolerância à queda de conexão | 5,0 | 4,4 | (2 × 5,0) - 4,4 | **5,6** | Essencial complexa | **Sim** |
| **RNF09** | Transparência da sincronização | 4,8 | 4,5 | (2 × 4,8) - 4,5 | **5,1** | Essencial complexa | **Sim** |
| **RNF10** | Segurança na autenticação | 5,0 | 2,8 | (2 × 5,0) - 2,8 | **7,2** | Prioridade planejada | Sim |
| **RNF11** | Segurança de sessão em dispositivo compartilhado | 4,2 | 2,0 | (2 × 4,2) - 2,0 | **6,4** | Prioridade imediata | Sim |
| **RNF12** | Controle de permissões por perfil | 5,0 | 3,2 | (2 × 5,0) - 3,2 | **6,8** | Prioridade planejada | Sim |
| **RNF13** | Rastreabilidade das ações administrativas | 4,0 | 3,0 | (2 × 4,0) - 3,0 | **5,0** | Prioridade planejada | Sim |
| **RNF14** | Confidencialidade dos dados de usuários e residentes | 5,0 | 4,0 | (2 × 5,0) - 4,0 | **6,0** | Essencial complexa | Sim |
| **RNF15** | Legibilidade do histórico assistencial | 4,6 | 2,6 | (2 × 4,6) - 2,6 | **6,6** | Prioridade planejada | Sim |
| **RNF16** | Desempenho na consulta e filtragem do histórico | 4,5 | 3,0 | (2 × 4,5) - 3,0 | **6,0** | Prioridade planejada | Sim |

---

## 9. Análise dos Resultados

A distribuição dos requisitos gerou três cenários estratégicos para o projeto:

*   **Prioridade Imediata (Alto Impacto / Menor Esforço):** Foco nas fundações de acesso, usabilidade direta e segurança básica na sessão (**US01**, **US08**, **US09**, **US13**, **RNF02**, **RNF03**, **RNF11**). São os itens de menor esforço técnico e entrega de valor imediata, alcançando os maiores Índices de Prioridade (IP).

*   **Essenciais Complexos (Alto Impacto / Alto Esforço):** Itens do quadrante superior direito que exigem engenharia robusta, como a gestão de medicamentos (**US06**), o resumo clínico (**US16**) e a infraestrutura offline/sincronização (**RNF01**, **RNF08**, **RNF09**, **RNF14**). Sua inclusão precoce mitiga riscos de retrabalho arquitetural estrutural.

*   **Postergados (Médio ou Baixo Impacto):** Funcionalidades de menor relevância para a validação inicial, como **US03 — Inativar cadastro**, permanecem fora do recorte do MVP. A **US11 — Atualizar dados cadastrais do usuário** constitui uma exceção, pois sua inclusão foi validada pelo cliente e planejada no Story Map para a Sprint 4.

---

## 10. Relação com o MVP

A matriz de priorização, elaborada inicialmente sob a perspectiva técnica da equipe, foi submetida à avaliação do cliente em reunião de alinhamento estratégico. Durante a sessão, o cliente validou oficialmente a inclusão integral de todos os requisitos localizados nos **quadrantes superior esquerdo e superior direito** da matriz como escopo definitivo do Produto Mínimo Viável (MVP) do VitalTech.

Essa validação confirma o direcionamento de priorizar os itens de **Alto Impacto** para a rotina da instituição, incluindo a US11 como exceção acordada com o cliente. Isso significa que o MVP não será composto apenas por vitórias rápidas (alto impacto e baixo/médio esforço), mas a equipe e o cliente assumirão em conjunto o desenvolvimento de itens essenciais complexos (alto impacto e alto esforço) que são indispensáveis para a segurança, operação offline, rastreabilidade e confiabilidade do sistema.

Desta forma, a jornada mínima de valor homologada para o MVP do VitalTech contempla:

1. Autenticar o usuário de forma segura e com controle estrito de sessão;
2. Cadastrar ou selecionar um residente, garantindo a integridade dos dados históricos;
3. Registrar informações assistenciais fundamentais (sinais vitais, rotinas diárias e administração de medicamentos);
4. Salvar os registros de forma instantânea localmente, carimbando automaticamente metadados inalteráveis de data, horário e autoria;
5. Consultar o histórico assistencial de forma limpa e cronológica para passagens de plantão;
6. Filtrar o histórico por período e visualizar o resumo assistencial do residente;
7. Manter a operação resiliente com tolerância à queda de conexão e sincronização inteligente em segundo plano.

Para responder objetivamente quais User Stories compõem o MVP, a tabela abaixo relaciona as histórias incluídas ao respectivo requisito não funcional (quando aplicável) e a classificação no MVP. O MVP considera as User Stories marcadas como **Sim** na matriz de priorização, pois elas validam o fluxo de valor principal do produto, desde o acesso seguro até o registro e a consulta assistencial.

| User Story | Funcionalidade no MVP | Sprint planejada |
| :---: | :--- | :---: |
| **US08** | Autenticar usuário no sistema | Sprint 2 |
| **US09** | Encerrar sessão do usuário | Sprint 2 |
| **US10** | Cadastrar usuário | Sprint 2 |
| **US01** | Cadastrar dados do residente | Sprint 2 |
| **US04** | Registrar, editar e consultar sinais vitais do residente | Sprint 3 |
| **US05** | Registrar, editar e consultar rotinas assistenciais do residente | Sprint 3 |
| **US14** | Consultar histórico de registros do residente | Sprint 3 |
| **US11** | Atualizar dados cadastrais do usuário | Sprint 4 |
| **US02** | Editar dados pessoais e clínicos do residente | Sprint 4 |
| **US06** | Registrar, editar e consultar administração de medicamentos | Sprint 4 |
| **US15** | Filtrar histórico por período | Sprint 4 |
| **US12** | Redefinir senha de acesso do usuário | Sprint 5 |
| **US13** | Revogar acesso do usuário | Sprint 5 |
| **US07** | Registrar, editar e consultar ocorrências clínicas do residente | Sprint 5 |
| **US16** | Visualizar resumo assistencial do residente | Sprint 5 |

### 10.1 MVP implementado e evidenciado por User Story

A tabela abaixo explicita o status de implementação do MVP por User Story, relacionando cada entrega com sprint, evidência disponível, PR, testes e validação. A leitura separa histórias concluídas, concluídas no recorte do MVP, pendentes e realocadas para evitar tratar como finalizado aquilo que ainda não possui evidência suficiente.

| User Story | Sprint planejada / execução | Status | Evidência visual ou processual | PR | Teste | Validação | Observações |
| --- | --- | :---: | --- | --- | --- | --- | --- |
| [**US08**](user_stories.md#us08) | Sprint 2 | **Concluída** | [Execução Sprint 2](../sprints/sprint2/execucao.md) e [Review Sprint 2](../sprints/sprint2/review.md). | [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | 21/21 testes passando após correções de integração. | Validada na Review da Sprint 2. | Autenticação, erro genérico, rota protegida e fallback local evidenciados. |
| [**US09**](user_stories.md#us09) | Sprint 2 | **Concluída** | [Execução Sprint 2](../sprints/sprint2/execucao.md) e [Review Sprint 2](../sprints/sprint2/review.md). | [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | Testes de logout e sessão registrados na suíte da Sprint 2. | Validada na Review da Sprint 2. | Logout limpa sessão e redireciona para login. |
| [**US10**](user_stories.md#us10) | Sprint 2 | **Concluída** | [Execução Sprint 2](../sprints/sprint2/execucao.md). | [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | 21/21 testes passando, incluindo login duplicado e usuário recém-cadastrado. | Validada pela equipe na execução e review. | Cadastro de usuário persistido no backend mock e IndexedDB. |
| [**US01**](user_stories.md#us01) | Sprint 2 | **Concluída** | [Execução Sprint 2](../sprints/sprint2/execucao.md). | [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | 21/21 testes passando, incluindo campos obrigatórios e CPF duplicado. | Validada pela equipe na execução e review. | Cadastro de residente, foto e idade calculada evidenciados. |
| [**US04**](user_stories.md#us04) | Sprint 3, realocada para Sprint 4 | **Concluída no recorte MVP** | [Review Sprint 3](../sprints/sprint3/review.md) registra débito técnico; [Planning Sprint 4](../sprints/sprint4/planning.md) registra replanejamento; [Review Sprint 4](../sprints/sprint4/review.md) registra fechamento. | [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). | 30 testes aprovados e build concluído. | Validação técnica por PR/testes e validação do produto na [Review Sprint 4](../sprints/sprint4/review.md). | O recorte final do MVP cobriu registro, persistência, validação e consulta via histórico; edição de registros assistenciais permanece como evolução posterior. |
| [**US05**](user_stories.md#us05) | Sprint 3, realocada para Sprint 4 | **Concluída no recorte MVP** | [Review Sprint 3](../sprints/sprint3/review.md) registra débito técnico; [Planning Sprint 4](../sprints/sprint4/planning.md) registra replanejamento; [Review Sprint 4](../sprints/sprint4/review.md) registra fechamento. | [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83), [PR #84](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/84) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). | PR #83 registra 30 testes; PR #84 possui roteiro de validação manual. | Validação técnica por PR/testes e validação do produto na [Review Sprint 4](../sprints/sprint4/review.md). | O recorte final do MVP cobriu registro, persistência, validação e consulta via histórico; edição de registros assistenciais permanece como evolução posterior. |
| [**US14**](user_stories.md#us14) | Sprint 3, realocada para Sprint 4 | **Concluída** | [Review Sprint 3](../sprints/sprint3/review.md), [Planning Sprint 4](../sprints/sprint4/planning.md), [Review Sprint 4](../sprints/sprint4/review.md) e componente `HistoricoAssistencial.vue`. | [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). | Testes do `assistenciaService` cobrem listagem do histórico por residente. | Validação técnica por PR/testes e validação do produto na [Review Sprint 4](../sprints/sprint4/review.md). | Ficou como débito técnico na Sprint 3; o PR dedicado à US14 (#82) foi fechado, e a entrega foi absorvida por PRs integrados da Sprint 4. |
| [**US11**](user_stories.md#us11) | Sprint 4 | **Concluída** | [Review Sprint 4](../sprints/sprint4/review.md) e PRs de Sprint 4 com checklist e validação. | [PR #90](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/90) e [PR #93](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/93). | PR #90 registra 35 testes aprovados e build concluído. | Validação técnica por PR/testes e validação do produto na [Review Sprint 4](../sprints/sprint4/review.md). | Atualização de usuário com validação, permissão e rastreabilidade. |
| [**US02**](user_stories.md#us02) | Sprint 4 | **Concluída** | [Review Sprint 4](../sprints/sprint4/review.md) e PRs de Sprint 4 com checklist e validação. | [PR #90](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/90) e [PR #93](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/93). | PR #90 registra 35 testes aprovados e build concluído. | Validação técnica por PR/testes e validação do produto na [Review Sprint 4](../sprints/sprint4/review.md). | Edição de residente preserva vínculos e valida CPF duplicado. |
| [**US06**](user_stories.md#us06) | Sprint 4 | **Concluída** | [Review Sprint 4](../sprints/sprint4/review.md) e PR de medicamentos com checklist de teste e validação local. | [PR #91](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/91). | PR #91 registra testes unitários, build e validação local. | Validação técnica por PR/testes e validação do produto na [Review Sprint 4](../sprints/sprint4/review.md). | Registro de administração e não administração de medicamentos integrado ao histórico. |
| [**US15**](user_stories.md#us15) | Sprint 4 | **Concluída** | [Review Sprint 4](../sprints/sprint4/review.md) e PR de Sprint 4 com descrição de testes e build. | [PR #92](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/92). | PR #92 registra 32 testes e build concluído. | Validação técnica por PR/testes e validação do produto na [Review Sprint 4](../sprints/sprint4/review.md). | Filtro por período considerado integrado pela equipe no fechamento da Sprint 4. |
| [**US12**](user_stories.md#us12) | Sprint 5 | **Concluída** | [Planning Sprint 5](../sprints/sprint5/planning.md) e [Review Sprint 5](../sprints/sprint5/review.md). | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | Teste automatizado em `services.test.js` na linha 1167. | Verificação técnica por PR/testes. | Redefinição de senha, invalidação da senha anterior e bloqueio por perfil. |
| [**US13**](user_stories.md#us13) | Sprint 5 | **Concluída** | [Planning Sprint 5](../sprints/sprint5/planning.md) e [Review Sprint 5](../sprints/sprint5/review.md). | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | Teste automatizado em `services.test.js` na linha 1198. | Verificação técnica por PR/testes. | Revogação de acesso preservando registros históricos e impedindo nova sessão. |
| [**US07**](user_stories.md#us07) | Sprint 5 | **Concluída** | [Planning Sprint 5](../sprints/sprint5/planning.md) e [Review Sprint 5](../sprints/sprint5/review.md). | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | Teste automatizado em `services.test.js` na linha 1265. | Verificação técnica por PR/testes. | Registro, consulta e edição de ocorrência clínica com rastreabilidade e sinalização de notificação. |
| [**US16**](user_stories.md#us16) | Sprint 5 | **Concluída** | [Planning Sprint 5](../sprints/sprint5/planning.md) e [Review Sprint 5](../sprints/sprint5/review.md). | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | Teste automatizado em `services.test.js` na linha 1355. | Verificação técnica por PR/testes. | Resumo assistencial com último registro por módulo e estados vazios explícitos. |

A User Story abaixo permanece fora do recorte formal do MVP por apresentar impacto médio na matriz de priorização, mas foi entregue como incremento adicional na Sprint 5:

| User Story | Funcionalidade | Sprint planejada | Justificativa |
| :---: | :--- | :---: | :--- |
| **US03** | Inativar cadastro do residente | Sprint 5 | Implementada no [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110), com teste automatizado em `services.test.js` na linha 1235; continua registrada fora do recorte formal do MVP, mas concluída como incremento adicional. |

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 18/05/2026 | 1.0 | Criação da matriz de priorização com critérios de impacto, esforço, cálculo do Índice de Prioridade e alocação visual dos RFs e RNFs. | Enzo Menali |
| 18/05/2026 | 1.1 | Ajuste nos status de MVP das tabelas (RFs e RNFs) e refinamento das seções de análise para refletir a aprovação integral dos quadrantes de Alto Impacto pelo cliente. | Enzo Menali |
| 05/06/2026 | 1.2 | Explicitação das User Stories que compõem o MVP e separação das histórias classificadas como pós-MVP. | Enzo Menali |
| 12/06/2026 | 1.3 | Alinhamento da relação do MVP com o Story Map: inclusão de RF11/US11 no MVP e restauração das sprints planejadas para todas as User Stories. | Enzo Menali |
| 14/06/2026 | 1.4 | Substituição do critério "Alinhamento ao MVP" por "Criticidade para o Fluxo Principal" (CF) na avaliação de impacto das User Stories, eliminando o raciocínio circular apontado na revisão do monitor. | Alberto Côrtes |
| 28/06/2026 | 1.5 | Inclusão da nota de leitura sobre histórias assistenciais compostas e critérios de aceitação por cenário. | Enzo Menali |
| 28/06/2026 | 1.6 | Realocação da US16 para a Sprint 5, mantendo alinhamento com Story Map e cronograma. | Enzo Menali |
| 28/06/2026 | 1.7 | Inclusão da matriz de MVP implementado e evidenciado por User Story, com status, evidências, PRs, testes e validações. | Enzo Menali |
| 01/07/2026 | 1.8 | Atualização das evidências e validações da Sprint 4 com referência à Review e ao formulário do cliente. | Enzo Menali |
| 02/07/2026 | 1.9 | Ajuste da matriz de MVP para declarar US04 e US05 como concluídas no recorte entregue, mantendo edição como evolução posterior. | Enzo Menali |
| 02/07/2026 | 2.0 | Atualização do status das User Stories da Sprint 5 com Review, PR #110 e testes automatizados. | Enzo Menali |
