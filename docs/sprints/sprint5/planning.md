# Sprint 5 - Planning

## Registro do Planejamento

Este documento consolida o planejamento da Sprint 5 a partir do cronograma atualizado, do Story Map, das User Stories, dos requisitos, das regras de negócio, dos RNFs e das evidências registradas nas sprints anteriores.

| Campo | Definição |
| --- | --- |
| Data do planejamento | 28/06/2026 |
| Período da Sprint | 28/06/2026 a 01/07/2026 |
| Participantes | Equipe VitalTech |
| Estratégia de desenvolvimento | ScrumXP |
| Organização da equipe | Duas duplas de desenvolvimento, com divisão por membros e rastreabilidade por issue |
| Base de planejamento | Sprint 5 prevista no Story Map, na Matriz de Priorização e no Cronograma |

---

## Objetivo da Sprint

Ampliar a governança de acesso, completar controles operacionais sobre usuários e residentes e expandir o ciclo assistencial com ocorrências clínicas e resumo consolidado do residente.

O fluxo demonstrável planejado para a Sprint 5 é:

```text
gestor redefine senha/revoga acesso -> gestor inativa residente -> cuidador registra ocorrência clínica -> equipe consulta resumo assistencial
```

Esse fluxo complementa as entregas das sprints anteriores, mantendo a preservação do histórico, o controle de permissões por perfil e a rastreabilidade das ações executadas no sistema.

---

## Verificação e Validação (V/V) - Planning

Durante o planejamento, a equipe verificou a consistência do escopo da Sprint 5 com os artefatos oficiais do projeto.

**Verificação realizada:**

- As User Stories selecionadas foram comparadas com o Story Map e o cronograma atualizado.
- Os critérios de aceitação foram conferidos no documento de User Stories.
- As dependências entre gestão de usuários, gestão de residentes, registros assistenciais e histórico foram identificadas.
- As regras de negócio e RNFs aplicáveis foram associados ao escopo da sprint.
- O DoR foi aplicado para confirmar que as histórias possuem persona, ação, benefício, critérios de aceitação e requisitos relacionados.
- Os critérios INVEST foram avaliados para cada User Story planejada.

**Validação planejada:**

- As entregas da sprint serão validadas por revisão via Pull Request.
- Os fluxos principais serão demonstrados localmente com backend mock e persistência local quando aplicável.
- Evidências de validação deverão incluir prints, resultados de testes, descrição dos cenários verificados e comentários de revisão.
- A conclusão da sprint será avaliada pelo atendimento dos critérios de aceite e do DoD oficial do projeto.

---

## Estratégia de Priorização da Sprint

| Prioridade | User Stories | Justificativa |
| --- | --- | --- |
| **P0 - Governança de acesso** | US12, US13 | Redefinição de senha e revogação de acesso reduzem risco de uso indevido e reforçam o controle por perfil. |
| **P1 - Integridade operacional de residentes** | US03 | A inativação remove residentes do fluxo ativo sem apagar histórico, atendendo à preservação de dados. |
| **P2 - Expansão assistencial e consulta consolidada** | US07, US16 | Ocorrências clínicas ampliam os registros assistenciais; o resumo depende dos registros existentes para consolidar a visão do residente. |

---

## Escopo Selecionado

| User Story | Funcionalidade | Persona | Prioridade na Sprint 5 | Objetivo na Sprint |
| --- | --- | --- | :---: | --- |
| **US12** | Redefinir senha de acesso do usuário | Gestor | P0 | Permitir que o Gestor restaure o acesso de usuários autorizados sem expor credenciais anteriores. |
| **US13** | Revogar acesso do usuário | Gestor | P0 | Impedir que usuários desligados ou não autorizados continuem acessando o sistema. |
| **US03** | Inativar cadastro do residente | Gestor | P1 | Remover residentes do fluxo operacional ativo sem excluir nem quebrar o histórico assistencial. |
| **US07** | Registrar, editar e consultar ocorrências clínicas do residente | Cuidador | P2 | Registrar eventos clínicos relevantes com rastreabilidade, campos obrigatórios e sinalização quando aplicável. |
| **US16** | Visualizar resumo assistencial do residente | Membro da equipe multidisciplinar | P2 | Exibir uma visão consolidada dos registros recentes para apoiar decisões de cuidado. |

---

## Critérios de Aceitação da Sprint

### US12 - Redefinir senha de acesso do usuário

- **CA12.1:** Dado que o Gestor selecionou um usuário ativo e definiu uma nova senha provisória, quando confirmar a redefinição, então a credencial anterior é invalidada e a nova credencial passa a ser registrada como válida.
- **CA12.2:** Dado que a senha foi redefinida, quando houver validação das credenciais desse usuário, então a senha antiga é rejeitada e apenas a senha provisória atual é aceita.
- **CA12.3:** Dado que um usuário sem perfil de Gestor tenta redefinir senha de outro usuário, quando solicitar a funcionalidade, então o sistema bloqueia a ação por falta de permissão.

### US13 - Revogar acesso do usuário

- **CA13.1:** Dado que o Gestor confirmou a revogação de acesso de um usuário, quando a alteração for salva, então o usuário passa ao estado "Inativo" e o sistema impede a geração de nova sessão para esse usuário.
- **CA13.2:** Dado que o acesso de um usuário foi revogado, quando a equipe consultar registros assistenciais realizados anteriormente por ele, então esses registros serão mantidos no histórico associados à sua identificação.
- **CA13.3:** Dado que um usuário sem perfil de Gestor tenta revogar acesso de outro usuário, quando solicitar a funcionalidade, então o sistema bloqueia a ação por falta de permissão.

### US03 - Inativar o cadastro do residente

- **CA03.1:** Dado que o Gestor confirmou a inativação de um residente, quando os cuidadores acessarem a lista operacional de residentes, então esse residente não será mais exibido como ativo.
- **CA03.2:** Dado que o residente foi inativado, quando um usuário autorizado consultar seu histórico assistencial, então todo o histórico permanecerá acessível no sistema, em conformidade com a Regra de Negócio RN-03.

### US07 - Registrar, editar e consultar ocorrências clínicas do residente

- **CA07.1:** Dado que o Cuidador está autenticado e selecionou um residente ativo, quando registrar tipo da ocorrência, gravidade, data e horário do evento, descrição e condutas adotadas, então a ocorrência clínica é salva com residente associado e identificação do cuidador responsável pelo lançamento.
- **CA07.2:** Dado que a ocorrência registrada é queda com lesão ou tentativa de suicídio, quando o registro for salvo, então o sistema sinaliza que o evento requer atenção para notificação à autoridade sanitária, conforme a RN-04.
- **CA07.3:** Dado que o Cuidador tenta salvar uma ocorrência sem tipo, gravidade, data/hora do evento ou descrição, quando confirmar o registro, então o sistema indica os campos pendentes e não salva o registro incompleto.
- **CA07.4:** Dado que o dispositivo está sem conexão ou a API está indisponível, quando o Cuidador confirmar uma ocorrência clínica válida, então os dados são preservados localmente com residente, data, horário e responsável, sem exigir que o preenchimento seja reiniciado. Quando a API está disponível no momento da operação, o sistema tenta sincronizar o registro com o backend.
- **CA07.5:** Dado que existe uma ocorrência clínica associada ao residente, quando um usuário autorizado corrigir dados editáveis e confirmar, então a alteração é salva mantendo rastreabilidade do registro original e da edição realizada.
- **CA07.6:** Dado que existem ocorrências clínicas para o residente selecionado, quando o usuário autorizado consultar essa informação, então o sistema exibe apenas as ocorrências do residente selecionado, com data/hora do evento, tipo, gravidade e responsável pelo lançamento.

### US16 - Visualizar resumo assistencial do residente

- **CA16.1:** Dado que o usuário está autenticado e selecionou um residente, quando acessar a seção de resumo assistencial, então o sistema exibe o último registro de cada módulo (sinais vitais, rotinas, medicamentos e ocorrências), com data, horário e nome do responsável pelo registro.
- **CA16.2:** Dado que o residente selecionado ainda não possui registros em algum módulo assistencial, quando o usuário acessar o resumo, então o sistema exibe a ausência de informação naquele módulo sem impedir a visualização dos demais dados disponíveis.
- **CA16.3:** Dado que um usuário sem permissão para consulta tenta visualizar o resumo assistencial, quando solicitar a funcionalidade, então o sistema bloqueia o acesso por falta de permissão.

---

## Definition of Ready Aplicada

As histórias selecionadas para a Sprint 5 foram consideradas aptas para planejamento porque atendem aos critérios principais do DoR oficial do projeto:

- estão descritas como User Stories com persona, ação e benefício;
- possuem critérios de aceitação em formato Dado / Quando / Então;
- possuem relação com requisitos funcionais, regras de negócio e RNFs aplicáveis;
- possuem dependências conhecidas e registradas;
- possuem comportamento verificável por teste, inspeção ou demonstração funcional;
- possuem escopo compatível com desenvolvimento incremental;
- serão avaliadas pelo DoD antes de serem consideradas concluídas.

### Dependências Identificadas

| Dependência | Impacto | Tratamento planejado |
| --- | --- | --- |
| US12 e US13 dependem do fluxo de autenticação e gestão de usuários | Alterações incorretas podem permitir acesso indevido ou quebrar login existente. | Validar permissões, sessão ativa, login com credencial antiga e login com credencial nova. |
| US03 depende do cadastro de residentes e do histórico assistencial | A inativação não pode apagar registros nem remover o residente de consultas autorizadas. | Aplicar soft delete e testar lista operacional separada de histórico preservado. |
| US07 depende da seleção de residente e do padrão de registros assistenciais | Ocorrências precisam manter estrutura, autoria, data, horário e vínculo com residente. | Reaproveitar a estrutura de persistência assistencial usada nos registros anteriores. |
| US16 depende de registros gerados por sinais vitais, rotinas, medicamentos e ocorrências | Sem registros, o resumo deve exibir ausência de informação sem falhar. | Implementar estados vazios por módulo e consolidar apenas dados disponíveis. |

---

## Análise INVEST

| User Story | Independent | Negotiable | Valuable | Estimable | Small | Testable |
| --- | --- | --- | --- | --- | --- | --- |
| **US12** | Parcialmente; depende de usuários cadastrados e autenticação. | Sim; regras de senha provisória podem ser refinadas. | Alta; reduz bloqueios de acesso e apoia governança. | Sim; escopo restrito a redefinição por Gestor. | Sim. | Sim, pelos critérios CA12.1 a CA12.3. |
| **US13** | Parcialmente; depende de usuários cadastrados e controle de sessão. | Sim; mensagens e fluxo de confirmação podem ser refinados. | Alta; impede acesso indevido após desligamento. | Sim; escopo restrito a revogação e bloqueio de nova sessão. | Sim. | Sim, pelos critérios CA13.1 a CA13.3. |
| **US03** | Parcialmente; depende de residentes cadastrados e histórico existente. | Sim; a forma de exibição de inativos pode ser refinada. | Média/alta; preserva histórico e organiza o fluxo operacional. | Sim; escopo restrito a inativação sem exclusão. | Sim. | Sim, pelos critérios CA03.1 e CA03.2. |
| **US07** | Parcialmente; depende da estrutura de registros assistenciais. | Sim; campos e severidade podem ser refinados com a equipe. | Alta; registra eventos clínicos relevantes. | Sim; critérios e regras de negócio estão definidos. | Parcialmente; pode ser fatiada em registro mínimo e consulta/edição. | Sim, pelos critérios CA07.1 a CA07.6. |
| **US16** | Parcialmente; depende de registros assistenciais existentes. | Sim; composição visual do resumo pode ser refinada. | Alta; apoia tomada de decisão rápida pela equipe. | Sim; módulos de origem já estão definidos. | Parcialmente; consolida múltiplos módulos assistenciais. | Sim, pelos critérios CA16.1 a CA16.3. |

---

## Regras de Negócio e RNFs Considerados

| Item | Aplicação na Sprint 5 |
| --- | --- |
| **RN-01** | Ocorrências clínicas devem preservar operação local e sincronização posterior quando aplicável. |
| **RN-03** | Histórico de residente inativado não pode ser excluído do sistema. |
| **RN-04** | Ocorrências de queda com lesão ou tentativa de suicídio devem ser sinalizadas para apoiar notificação sanitária. |
| **RN-05** | Formulários de ocorrências clínicas não podem ser salvos com campos obrigatórios vazios. |
| **RN-09** | Registros assistenciais devem exibir confirmação visual após salvamento. |
| **RNF01** | Registros e histórico devem manter vínculo correto com o residente. |
| **RNF03** | Fluxos assistenciais devem priorizar interface objetiva e poupadora de cliques. |
| **RNF04** | Interfaces da sprint devem considerar uso em tablets e dispositivos móveis. |
| **RNF05** | Salvamento local de registro assistencial deve manter desempenho aceitável. |
| **RNF06** | Registros assistenciais devem seguir estrutura padronizada. |
| **RNF07** | Autoria, data e horário devem ser registrados automaticamente. |
| **RNF08** | Registros assistenciais devem tolerar instabilidade de conexão. |
| **RNF09** | Estados de sincronização devem ser compreensíveis para o usuário. |
| **RNF12** | Funcionalidades restritas devem respeitar permissões por perfil. |
| **RNF13** | Ações administrativas devem registrar responsável, data, horário e tipo de ação. |
| **RNF14** | Dados pessoais, clínicos e administrativos sensíveis devem ser acessíveis apenas a usuários autorizados. |
| **RNF15** | Histórico e resumo assistencial devem ser legíveis e permitir identificação rápida de tipo, data, horário e responsável. |
| **RNF16** | Consulta ao resumo e aos registros deve manter tempo de resposta aceitável. |

---

## Planejamento Técnico por Membro

### Dupla A - Governança de Acesso

#### Membro 1 - Redefinição de senha de acesso

- Implementar ou ajustar fluxo de seleção de usuário ativo.
- Implementar redefinição de senha provisória por Gestor.
- Invalidar credencial anterior após redefinição.
- Validar bloqueio para usuários sem permissão de Gestor.
- Registrar evidências dos critérios CA12.1, CA12.2 e CA12.3.

#### Membro 2 - Revogação de acesso de usuário

- Implementar ou ajustar fluxo de revogação de acesso.
- Impedir autenticação de usuário inativo.
- Preservar autoria de registros históricos feitos por usuário revogado.
- Validar bloqueio para usuários sem permissão de Gestor.
- Registrar evidências dos critérios CA13.1, CA13.2 e CA13.3.

### Dupla B - Residente, Ocorrências e Resumo Assistencial

#### Membro 3 - Inativação de residente

- Implementar ou ajustar inativação lógica de residente.
- Remover residente inativo da listagem operacional de cuidadores.
- Preservar histórico assistencial do residente inativado.
- Validar permissões para inativação e consulta posterior.
- Registrar evidências dos critérios CA03.1 e CA03.2.

#### Membro 4 - Ocorrências clínicas e resumo assistencial

- Implementar ou ajustar registro de ocorrências clínicas.
- Validar campos obrigatórios, gravidade, data/hora do evento e condutas adotadas.
- Sinalizar ocorrências que exigem atenção para notificação sanitária conforme RN-04.
- Integrar ocorrências ao histórico assistencial.
- Implementar ou apoiar o resumo assistencial com últimos registros por módulo.
- Registrar evidências dos critérios CA07.1 a CA07.6 e CA16.1 a CA16.3.

---

## Artefatos Planejados

| Artefato | Objetivo | Responsável principal |
| --- | --- | --- |
| Issues da Sprint 5 | Dividir o escopo por membro e manter rastreabilidade da execução. | Equipe |
| Pull Requests por entrega | Revisar alterações antes da integração. | Responsável de cada issue |
| Testes e validações locais | Verificar critérios de aceitação, regressão e permissões. | Equipe |
| Evidências visuais | Registrar prints ou vídeos dos fluxos implementados. | Equipe |
| Review da Sprint 5 | Consolidar entregas, pendências e evidências da sprint. | Equipe |
| Retrospectiva da Sprint 5 | Registrar aprendizados e ações de melhoria. | Equipe |

---

## Definition of Done Aplicada

Uma User Story da Sprint 5 será considerada concluída quando:

- a funcionalidade corresponder ao objetivo da User Story;
- todos os critérios de aceitação aplicáveis forem verificados;
- cenários principais, estados vazios, campos obrigatórios e erros relevantes forem testados;
- regras de negócio e RNFs associados forem considerados;
- permissões por perfil forem respeitadas quando aplicável;
- dados históricos forem preservados quando a história envolver inativação ou revogação;
- registros assistenciais preservarem residente, tipo, data, horário e responsável quando aplicável;
- a interface estiver adequada ao uso em tablets e dispositivos móveis, quando aplicável;
- a funcionalidade não comprometer dados existentes de usuários, residentes, sessão ou registros assistenciais;
- evidências de validação forem registradas;
- a documentação relacionada for atualizada quando necessário;
- a entrega passar por revisão de outro membro via Pull Request.

---

## Roteiro de Demo Planejado

1. Gestor acessa a área de usuários.
2. Gestor redefine a senha de um usuário ativo.
3. Sistema rejeita a senha antiga e aceita a nova credencial.
4. Gestor revoga o acesso de um usuário.
5. Sistema impede nova autenticação do usuário revogado e preserva registros anteriores.
6. Gestor inativa um residente.
7. Residente inativo deixa de aparecer na lista operacional, mas seu histórico permanece acessível para perfis autorizados.
8. Cuidador registra uma ocorrência clínica para um residente ativo.
9. Sistema valida campos obrigatórios e sinaliza ocorrência crítica quando aplicável.
10. Usuário autorizado consulta o resumo assistencial consolidado do residente.

---

## Riscos e Mitigações

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Alterações em usuários quebrarem autenticação existente | Usuários válidos podem ficar impedidos de acessar o sistema. | Testar login antes e depois de redefinição/revogação. |
| Revogação de acesso apagar ou ocultar autoria histórica | Perda de rastreabilidade dos registros assistenciais. | Preservar identificação do usuário nos registros já existentes. |
| Inativação de residente excluir histórico por engano | Quebra da RN-03 e perda de dados sensíveis. | Usar inativação lógica e validar histórico antes/depois. |
| Ocorrências clínicas ficarem desconectadas do histórico | Resumo e consulta ficam incompletos. | Reaproveitar estrutura padronizada de registros assistenciais. |
| Resumo assistencial tentar exibir módulos sem dados | Tela pode falhar ou induzir interpretação incorreta. | Implementar estado vazio por módulo. |

---

## Gravação

Não há gravação formal anexada a este artefato até o momento. Caso a equipe registre a reunião de planejamento, o vídeo deve ser incluído em `docs/assets/videos/sprint5_planning.mp4` e referenciado nesta seção.

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 28/06/2026 | 1.0 | Criação do planning da Sprint 5 com escopo, critérios de aceitação, DoR, análise INVEST, divisão por membros, DoD, roteiro de demo e riscos. | Enzo Menali |
