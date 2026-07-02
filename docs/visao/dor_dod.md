# Definition of Ready e Definition of Done — VitalTech

Este documento estabelece os critérios acordados pela equipe do projeto **VitalTech** para determinar quando uma User Story está **pronta para entrar em sprint** (Definition of Ready — DoR) e quando uma funcionalidade pode ser considerada **concluída** (Definition of Done — DoD).

A adoção desses critérios busca garantir alinhamento entre os integrantes da equipe, qualidade nas entregas, rastreabilidade das funcionalidades e previsibilidade no desenvolvimento do sistema.

---

## Definition of Ready (DoR)

Uma User Story poderá ser incluída em uma sprint quando os critérios obrigatórios e os critérios aplicáveis ao seu contexto forem atendidos.

O objetivo do DoR é garantir que a equipe compreenda completamente a funcionalidade antes do início do desenvolvimento, reduzindo ambiguidades, retrabalho e riscos durante a sprint.

---

### 1. Formato e Escrita da User Story

#### Objetivo
Garantir que a User Story esteja descrita de forma padronizada, compreensível e orientada ao valor entregue ao usuário.

#### Critérios

- [ ] A User Story está escrita no formato:  
*"Como [persona], quero [ação], para que [benefício]"*

- [ ] A persona foi corretamente identificada:
  - Gestor;
  - Cuidador;
  - Membro da equipe multidisciplinar.

- [ ] O benefício descrito representa valor real para o fluxo assistencial, operacional ou administrativo da instituição.

- [ ] A descrição da User Story está clara, objetiva e sem ambiguidades.

---

### 2. Critérios de Aceitação

#### Objetivo
Garantir que a funcionalidade possa ser validada objetivamente após sua implementação.

#### Critérios

- [ ] Pelo menos um critério de aceitação foi definido utilizando o formato:  
*"Dado [contexto], quando [ação], então [resultado esperado]"*

- [ ] Os critérios de aceitação são objetivos, verificáveis e mensuráveis.

- [ ] Os critérios cobrem o comportamento esperado da funcionalidade principal.

- [ ] Cenários de erro, exceção ou comportamento inválido relevantes foram identificados e descritos.

- [ ] Os critérios de aceitação permitem validar completamente se a User Story foi concluída.

---

### 3. Critério INVEST

#### Objetivo
Garantir que a User Story possua características adequadas para desenvolvimento ágil.

#### Critérios

- [ ] **I — Independent:** a User Story pode ser desenvolvida sem depender diretamente da conclusão de outra US, ou suas dependências foram devidamente documentadas e resolvidas.

- [ ] **N — Negotiable:** o escopo ainda permite ajustes e refinamentos em conjunto com o cliente e a equipe.

- [ ] **V — Valuable:** a User Story entrega valor claro para pelo menos uma das personas do sistema.

- [ ] **E — Estimable:** a equipe consegue compreender suficientemente a funcionalidade para estimar seu esforço.

- [ ] **S — Small:** a User Story possui tamanho compatível com uma sprint e não necessita ser fragmentada.

- [ ] **T — Testable:** os critérios de aceitação permitem validar objetivamente a implementação da funcionalidade.

---

### 4. Estimativa

#### Objetivo
Garantir previsibilidade e equilíbrio da capacidade da sprint.

#### Critérios

- [ ] A User Story foi estimada pela equipe.

- [ ] A estimativa foi realizada considerando:
  - complexidade técnica;
  - impacto no produto;
  - dependências;
  - esforço de implementação.

- [ ] A estimativa está compatível com a capacidade planejada da sprint.

- [ ] A priorização da US está alinhada com a Matriz de Priorização do projeto.

---

### 5. Clareza, Escopo e Dependências

#### Objetivo
Garantir que a equipe compreenda completamente o escopo antes do desenvolvimento.

#### Critérios

- [ ] Não existem comentários, dúvidas ou pendências abertas na issue ou card da User Story sem resposta da equipe.

- [ ] O escopo da User Story foi compreendido por toda a equipe.

- [ ] Dependências técnicas ou funcionais foram identificadas e registradas.

- [ ] Não existem dependências bloqueantes sem definição ou resolução.

- [ ] Regras de negócio associadas à User Story foram identificadas.

---

### 6. Artefatos de Apoio

#### Objetivo
Garantir que os materiais necessários para implementação estejam disponíveis.

#### Critérios

- [ ] Protótipo, wireframe ou referência visual da funcionalidade está disponível (quando aplicável).

- [ ] Regras de negócio relacionadas à funcionalidade foram verificadas.

- [ ] Fluxos de navegação relevantes estão definidos.

- [ ] Campos obrigatórios, validações e mensagens esperadas foram identificados.

---

## Definition of Done (DoD)



Uma User Story será considerada **concluída** quando todos os critérios aplicáveis abaixo forem atendidos.



---



### 1. Atendimento da User Story



- [ ] A funcionalidade entregue corresponde ao objetivo descrito na User Story.

- [ ] A persona definida na User Story consegue realizar a ação proposta no ambiente de teste, validação ou homologação definido pela equipe.

- [ ] O benefício esperado da User Story foi contemplado na solução.

- [ ] O escopo entregue está de acordo com o que foi definido para a história, sem incluir funcionalidades não planejadas.



---



### 2. Critérios de Aceitação



- [ ] Todos os critérios de aceitação da User Story foram atendidos.

- [ ] Os cenários descritos no formato **Dado / Quando / Então** foram verificados.

- [ ] Cenários de erro, exceção ou validação de campos foram testados quando aplicáveis.

- [ ] Não há critérios de aceitação pendentes, ambíguos ou não verificados.



---



### 3. Regras de Negócio e Requisitos



- [ ] As Regras de Negócio relacionadas à User Story foram respeitadas.

- [ ] Os Requisitos Funcionais associados à User Story foram contemplados.

- [ ] Os Requisitos Não Funcionais aplicáveis foram considerados.

- [ ] Aspectos transversais do projeto, como segurança, rastreabilidade, usabilidade, integridade dos dados, operação offline, sincronização e desempenho, foram avaliados quando aplicáveis à User Story.



---



### 4. Qualidade da Solução



- [ ] A funcionalidade apresenta comportamento consistente com as demais partes do sistema.

- [ ] As mensagens exibidas ao usuário são claras e compatíveis com o vocabulário da instituição.

- [ ] A interface, quando aplicável, está adequada ao uso em tablets e dispositivos móveis.

- [ ] A funcionalidade não compromete dados já existentes nem interfere negativamente em histórias já entregues.

- [ ] Código morto comentado, logs de depuração como `console.log`/`print` e trechos temporários foram removidos quando aplicável.



---



### 5. Validação e Testes



- [ ] A User Story foi validada pela equipe com base nos critérios de aceitação.

- [ ] As evidências de validação cobrem 100% dos critérios de aceitação da User Story, incluindo fluxo principal e cenários de erro ou exceção aplicáveis.

- [ ] Os principais fluxos da funcionalidade foram verificados.

- [ ] Cenários alternativos ou de erro foram verificados quando aplicáveis.

- [ ] Quando a User Story envolver registro em contexto de instabilidade de rede, a funcionalidade foi verificada considerando preservação local dos dados e posterior sincronização.

- [ ] Falhas ou inconsistências encontradas foram corrigidas ou registradas para tratamento posterior.



---



### 6. Rastreabilidade e Documentação



- [ ] A User Story permanece rastreável aos requisitos, critérios de aceitação e características de produto associadas.

- [ ] A documentação relacionada foi atualizada quando necessário.

- [ ] O Story Map, a Matriz de Priorização ou demais artefatos foram atualizados caso a entrega tenha alterado escopo, prioridade ou sprint.

- [ ] Evidências da validação foram registradas quando aplicável, como prints, anotações, links, comentários ou atas.



---



### 7. Revisão da Equipe



- [ ] A entrega foi revisada por pelo menos outro membro da equipe.

- [ ] Caso exista código implementado, a alteração passou por revisão via Pull Request antes de ser incorporada à branch definida pela equipe.

- [ ] Não existem conflitos pendentes na branch de desenvolvimento utilizada pela equipe.

- [ ] A equipe concorda que a User Story atende ao que foi definido.

- [ ] Caso existam melhorias futuras identificadas durante a revisão, elas foram registradas como novos itens ou ajustes posteriores.



---



## Resumo do DoD



Uma User Story será considerada **Done** quando atender aos critérios de aceitação, respeitar regras de negócio e requisitos associados, tiver sido validada pela equipe, não introduzir impactos negativos em funcionalidades já existentes, estiver documentada quando necessário e tiver sido revisada antes de ser considerada concluída.

---

## Aplicação do DoR por User Story

A tabela abaixo registra a aplicação do **Definition of Ready** nas User Stories planejadas para as sprints documentadas. O objetivo é deixar explícito quais histórias estavam prontas para desenvolvimento, quais entraram com dependências conhecidas e quais não devem ser consideradas prontas sem novo planejamento.

Legenda: **Atendido** indica que o item estava suficientemente definido para a sprint; **Parcial** indica que havia dependência, risco ou limitação documentada; **Pendente** indica que a história ainda precisa de planejamento específico antes de entrar em desenvolvimento.

A coluna de estimativa considera a avaliação de esforço registrada na [matriz de priorização](priorizacao.md#7-calculo-das-user-stories) e a análise INVEST registrada nas plannings das sprints correspondentes.

| Sprint | User Story | Planejamento relacionado | Formato da US | Critérios de aceite | INVEST e estimativa registrada | Dependências | Regras, RNFs, artefatos e fluxos | Status do DoR | Justificativa |
| --- | --- | --- | :---: | :---: | :---: | :---: | :---: | :---: | --- |
| Sprint 2 | **US08** | [Planning Sprint 2](../sprints/sprint2/planning.md) | Atendido | Atendido | Atendido | Atendido | Atendido | **Atendido** | História de autenticação possuía persona, objetivo, critérios verificáveis, tela planejada e validação prevista em review. |
| Sprint 2 | **US09** | [Planning Sprint 2](../sprints/sprint2/planning.md) | Atendido | Atendido | Atendido | Atendido | Atendido | **Atendido** | Encerramento de sessão estava ligado ao fluxo de autenticação, com comportamento verificável por teste manual e automatizado. |
| Sprint 2 | **US10** | [Planning Sprint 2](../sprints/sprint2/planning.md) | Atendido | Atendido | Atendido | Atendido | Atendido | **Atendido** | Cadastro de usuário possuía fluxo, campos, permissões e dependência clara com autenticação e perfis. |
| Sprint 2 | **US01** | [Planning Sprint 2](../sprints/sprint2/planning.md) | Atendido | Atendido | Atendido | Atendido | Atendido | **Atendido** | Cadastro de residente foi apoiado por análise dos formulários físicos da ILPI e campos mínimos definidos. |
| Sprint 3 | **US04** | [Planning Sprint 3](../sprints/sprint3/planning.md) | Atendido | Parcial | Parcial | Parcial | Parcial | **Parcial** | A história foi planejada, mas a capacidade real da sprint e as evidências de execução não foram suficientes; foi realocada como débito técnico. |
| Sprint 3 | **US05** | [Planning Sprint 3](../sprints/sprint3/planning.md) | Atendido | Parcial | Parcial | Parcial | Parcial | **Parcial** | A história possuía objetivo claro, mas não havia detalhamento suficiente de execução e validação para considerá-la pronta sem risco. |
| Sprint 3 | **US14** | [Planning Sprint 3](../sprints/sprint3/planning.md) | Atendido | Parcial | Parcial | Parcial | Parcial | **Parcial** | A consulta dependia dos registros de US04 e US05; como essas histórias não foram concluídas, a US14 foi realocada. |
| Sprint 4 | **US04** | [Planning Sprint 4](../sprints/sprint4/planning.md) | Atendido | Atendido | Atendido | Parcial | Atendido | **Atendido com dependência registrada** | Replanejada como P0, com dependência de residente cadastrado e integração com persistência assistencial. |
| Sprint 4 | **US05** | [Planning Sprint 4](../sprints/sprint4/planning.md) | Atendido | Atendido | Atendido | Parcial | Atendido | **Atendido com dependência registrada** | Replanejada como P0, com campos obrigatórios, rotina do turno e persistência vinculada ao residente. |
| Sprint 4 | **US14** | [Planning Sprint 4](../sprints/sprint4/planning.md) | Atendido | Atendido | Atendido | Parcial | Atendido | **Atendido com dependência registrada** | Dependia da existência de registros de sinais vitais e rotinas; a dependência foi registrada e tratada no planejamento. |
| Sprint 4 | **US11** | [Planning Sprint 4](../sprints/sprint4/planning.md) | Atendido | Atendido | Atendido | Atendido | Atendido | **Atendido** | Edição de usuário possuía fluxo, validações, permissões e rastreabilidade administrativa definidas. |
| Sprint 4 | **US02** | [Planning Sprint 4](../sprints/sprint4/planning.md) | Atendido | Atendido | Atendido | Atendido | Atendido | **Atendido** | Edição de residente possuía dependência controlada com cadastro prévio e preservação dos registros já vinculados. |
| Sprint 4 | **US06** | [Planning Sprint 4](../sprints/sprint4/planning.md) | Atendido | Atendido | Parcial | Parcial | Atendido | **Atendido com dependência registrada** | Administração de medicamentos dependia do padrão de registro assistencial; a dependência foi explicitada no planejamento. |
| Sprint 4 | **US15** | [Planning Sprint 4](../sprints/sprint4/planning.md) | Atendido | Atendido | Atendido | Parcial | Atendido | **Atendido com dependência registrada** | O filtro depende da US14 e de registros consistentes no histórico; a dependência foi registrada antes da execução. |
| Sprint 5 | **US12** | [Planning Sprint 5](../sprints/sprint5/planning.md) | Atendido | Atendido | Atendido | Atendido | Atendido | **Atendido** | História planejada com persona, critérios CA12.1 a CA12.3, dependência com autenticação e validação por PR. |
| Sprint 5 | **US13** | [Planning Sprint 5](../sprints/sprint5/planning.md) | Atendido | Atendido | Atendido | Atendido | Atendido | **Atendido** | História planejada com critérios CA13.1 a CA13.3, dependência com controle de sessão e preservação de histórico. |
| Sprint 5 | **US03** | [Planning Sprint 5](../sprints/sprint5/planning.md) | Atendido | Atendido | Atendido | Atendido | Atendido | **Atendido** | História planejada com escopo restrito a inativação lógica, preservação de histórico e controle de permissão. |
| Sprint 5 | **US07** | [Planning Sprint 5](../sprints/sprint5/planning.md) | Atendido | Atendido | Parcial | Parcial | Atendido | **Atendido com ressalva técnica** | História planejada com registro, edição e consulta de ocorrências; dependência de sincronização offline/indicador de status foi reconhecida como risco técnico. |
| Sprint 5 | **US16** | [Planning Sprint 5](../sprints/sprint5/planning.md) | Atendido | Atendido | Atendido | Parcial | Atendido | **Atendido com dependência registrada** | História dependia dos registros assistenciais existentes e foi planejada com estados vazios por módulo. |

Para as histórias **US04**, **US05** e **US14**, as linhas da Sprint 3 registram o estado histórico no momento em que a sprint foi encerrada com débito técnico. As linhas da Sprint 4 registram o replanejamento antes da nova execução: critérios de aceite revisados, dependências explícitas e vínculo com regras de negócio, RNFs, Story Map e Cronograma. Essa separação preserva a rastreabilidade sem renumerar histórias já usadas em issues, PRs e artefatos de priorização.

---

## Aplicação do DoD por User Story

A tabela abaixo registra o status de conclusão das histórias já entregues, parcialmente entregues ou realocadas. Histórias futuras não são marcadas como **Done** sem evidência de implementação, revisão e validação.

| User Story | Status do DoD | Critérios verificados | Evidências registradas | PR | Testes e validação | Registro |
| --- | :---: | --- | --- | --- | --- | --- |
| **US08** | **Done** | Login válido, login inválido, rota protegida e fallback local. | [Execução Sprint 2](../sprints/sprint2/execucao.md) e [Review Sprint 2](../sprints/sprint2/review.md). | [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43)  | 21/21 testes passando após correções de integração. | Entrega concluída e revisada tecnicamente. |
| **US09** | **Done** | Logout, limpeza de sessão e redirecionamento para login. | [Execução Sprint 2](../sprints/sprint2/execucao.md) e [Review Sprint 2](../sprints/sprint2/review.md). | [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | Testes automatizados de sessão/logout e verificação manual. | Entrega concluída dentro do fluxo base. |
| **US10** | **Done** | Cadastro de usuário, validação de duplicidade e autenticação do novo usuário. | [Execução Sprint 2](../sprints/sprint2/execucao.md). | [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | 21/21 testes passando, incluindo login duplicado e autenticação de usuário recém-cadastrado. | Entrega concluída após correções de integração. |
| **US01** | **Done** | Cadastro de residente, campos obrigatórios, foto, idade e CPF duplicado. | [Execução Sprint 2](../sprints/sprint2/execucao.md). | [PR #43](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/43). | 21/21 testes passando, incluindo residente com campos obrigatórios e CPF duplicado. | Entrega concluída após correções de integração. |
| **US04** | **Parcial** | Registro e persistência de sinais vitais, validação de campos e valores fora dos parâmetros. | [Planning Sprint 4](../sprints/sprint4/planning.md), [Review Sprint 4](../sprints/sprint4/review.md) e PRs de Sprint 4. | [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). | PR #83 registra 30 testes aprovados e build concluído. | Registro foi implementado; edição/consulta completa da US original deve permanecer rastreada conforme critérios específicos. |
| **US05** | **Parcial** | Registro de rotinas, campos obrigatórios, persistência e confirmação visual. | [Planning Sprint 4](../sprints/sprint4/planning.md) e [Review Sprint 4](../sprints/sprint4/review.md). | [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83), [PR #84](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/84) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). | PR #83 registra 30 testes aprovados; PR #84 contém roteiro de validação manual. | Registro foi implementado; edição/consulta completa da US original deve permanecer rastreada conforme critérios específicos. |
| **US14** | **Done** | Listagem de histórico por residente, ordenação cronológica e estado vazio. | [Review Sprint 4](../sprints/sprint4/review.md), código integrado em `HistoricoAssistencial.vue` e testes de `assistenciaService`. | [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). | Testes do service cobrem listagem do histórico por residente sem misturar registros. | O PR dedicado à US14 (#82) foi fechado, e a entrega foi absorvida por PRs integrados da Sprint 4. |
| **US11** | **Done** | Atualização de usuário, validação de campos, login duplicado e permissão por perfil. | PRs de Sprint 4. | [PR #90](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/90) e [PR #93](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/93). | PR #90 registra 35 testes aprovados e build concluído. | Entrega concluída e revisada. |
| **US02** | **Done** | Edição de residente, validação de campos, CPF duplicado e preservação de vínculos. | PRs de Sprint 4. | [PR #90](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/90) e [PR #93](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/93). | PR #90 registra 35 testes aprovados e build concluído. | Entrega concluída e revisada. |
| **US06** | **Done** | Registro de medicação administrada/não administrada, motivo e horário automático. | PR de Sprint 4. | [PR #91](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/91). | PR #91 registra testes unitários, build e validação local. | Entrega concluída no recorte implementado. |
| **US15** | **Done** | Filtro por período, período vazio e intervalo inválido. | PR de Sprint 4 com testes e build registrados. | [PR #92](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/92). | PR #92 registra 32 testes e build concluído. | Filtro por período considerado integrado pela equipe no fechamento da Sprint 4. |
| **US12** | **Done** | Redefinição de senha, invalidação da senha anterior e bloqueio para usuário sem permissão. | [Review Sprint 5](../sprints/sprint5/review.md) e PR de Sprint 5. | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | PR #110 registra `npm.cmd test` com 47 testes aprovados e `npm.cmd run build` concluído. | Entrega concluída e revisada. |
| **US13** | **Done** | Revogação de acesso, bloqueio de nova sessão e preservação dos registros históricos. | [Review Sprint 5](../sprints/sprint5/review.md) e PR de Sprint 5. | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | PR #110 registra testes de revogação, permissão e preservação de autoria. | Entrega concluída e revisada. |
| **US03** | **Done** | Inativação de residente, remoção da lista operacional e preservação do histórico assistencial. | [Review Sprint 5](../sprints/sprint5/review.md) e PR de Sprint 5. | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | PR #110 registra testes de inativação, permissão e consulta de histórico. | Entrega concluída e revisada. |
| **US07** | **Parcial com débito técnico** | Registro, edição, consulta, campos obrigatórios, rastreabilidade e sinalização de ocorrência crítica. | [Review Sprint 5](../sprints/sprint5/review.md), [Retrospectiva Sprint 5](../sprints/sprint5/retrospectiva.md) e PR de Sprint 5. | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | PR #110 registra testes de ocorrência clínica; a retrospectiva registra débito técnico em sincronização offline/indicador RN-01/RNF09. | Fluxo principal concluído; CA07.4 permanece vinculado ao débito técnico de sincronização. |
| **US16** | **Done** | Resumo assistencial por módulo, último registro disponível, estados vazios e controle de permissão. | [Review Sprint 5](../sprints/sprint5/review.md) e PR de Sprint 5. | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). | PR #110 registra testes do resumo assistencial e estados vazios. | Entrega concluída e revisada. |

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 17/05/2026 | 1.0 | Criação do documento com o DoR definido para o projeto VitalTech. | Gustavo Xavier |
| 18/05/2026 | 1.1 | Criação do documento com o DoR definido para o projeto VitalTech. | Enzo Menali |
| 16/06/2026 | 1.2 | Ajuste dos critérios de DoR e DoD para torná-los mais objetivos, verificáveis e alinhados ao feedback recebido. | Enzo Menali |
| 28/06/2026 | 1.3 | Registro da aplicação do DoR e DoD por User Story planejada, entregue, parcial ou pendente. | Enzo Menali |
| 28/06/2026 | 1.4 | Ajuste da aplicação de DoR/DoD para refletir a realocação da US16 para a Sprint 5 e a conclusão de US14 e US15 na Sprint 4. | Enzo Menali |
| 01/07/2026 | 1.5 | Reforço da leitura de DoR/DoD para histórias em débito técnico realocadas da Sprint 3 para a Sprint 4. | Enzo Menali |
| 01/07/2026 | 1.6 | Atualização da aplicação de DoR/DoD da Sprint 5 com evidências do PR #110 e registro de débito técnico da US07. | Enzo Menali |
