# Sprint 4 - Planning

## Registro do Planejamento

Este documento consolida o planejamento da Sprint 4 a partir do cronograma atualizado, do Story Map, das User Stories, dos requisitos, das regras de negócio e do débito técnico registrado no encerramento da Sprint 3.

Não há gravação formal anexada a este artefato até o momento. Por isso, o registro abaixo explicita o escopo, as prioridades, os critérios de aceitação e a divisão técnica planejada para orientar a execução da sprint e preservar a rastreabilidade.

**Período da Sprint:** 14/06/2026 a 27/06/2026  
**Estratégia de desenvolvimento:** ScrumXP  
**Organização da equipe:** duas duplas de desenvolvimento, com divisão entre interface/frontend e serviços/persistência/integração  
**Base de planejamento:** Sprint 3 encerrada com débito técnico e Sprint 4 prevista no cronograma

---

## Objetivo da Sprint

Consolidar o ciclo assistencial básico do VitalTech, recuperando o débito técnico da Sprint 3 e mantendo o escopo originalmente planejado para a Sprint 4 conforme a capacidade da equipe.

O objetivo mínimo da sprint é entregar o fluxo demonstrável:

```text
selecionar residente -> registrar sinais vitais/rotina assistencial -> consultar histórico
```

Após esse fluxo estar implementado, integrado e validado, a equipe deve avançar nas funcionalidades originalmente previstas para a Sprint 4:

```text
editar usuário/residente -> registrar medicação -> filtrar histórico por período
```

---

## Contexto e Justificativa do Replanejamento

A Sprint 3 foi encerrada com débito técnico, pois as histórias **US04**, **US05** e **US14** não tiveram incremento funcional concluído dentro do período planejado. Essas histórias foram realocadas operacionalmente para a Sprint 4 por formarem a base do ciclo assistencial do produto.

A Sprint 4 mantém as histórias originalmente previstas no cronograma (**US11**, **US02**, **US06** e **US15**), mas a ordem de execução foi ajustada para reduzir risco:

1. Primeiro, recuperar o ciclo assistencial básico pendente da Sprint 3.
2. Depois, avançar nas histórias originalmente previstas para a Sprint 4.
3. Registrar qualquer pendência remanescente como débito técnico ou item replanejado.

Esse ajuste preserva a rastreabilidade, pois o Story Map e a Matriz de Priorização continuam indicando o planejamento original das histórias, enquanto o cronograma registra a realocação operacional do débito da Sprint 3 para a Sprint 4.

---

## Verificação e Validação (V/V) - Planning

Durante o planejamento, a equipe verificou a consistência do escopo da Sprint 4 com os artefatos oficiais do projeto.

**Verificação realizada:**

- As User Stories selecionadas foram comparadas com o Story Map e o cronograma atualizado.
- Os critérios de aceitação foram conferidos no documento de User Stories.
- As dependências entre US04, US05, US14, US06 e US15 foram identificadas.
- As regras de negócio e RNFs aplicáveis foram associados ao escopo da sprint.
- O DoR foi aplicado para confirmar que as histórias possuem persona, ação, benefício, critérios de aceitação e requisitos relacionados.

**Validação realizada:**

- O escopo foi validado internamente pela equipe como uma recuperação necessária do débito técnico da Sprint 3.
- A priorização da sprint foi ajustada para garantir que o fluxo assistencial básico seja entregue antes de ampliar o produto com medicação e filtros.
- A equipe definiu que a conclusão da Sprint 4 deve ser avaliada pelo atendimento dos critérios de aceite e pelas evidências registradas nas PRs, testes e artefatos de review.

---

## Estratégia de Priorização da Sprint

| Prioridade | User Stories | Justificativa |
| --- | --- | --- |
| **P0 - Débito técnico da Sprint 3** | US04, US05, US14 | São necessárias para entregar o primeiro ciclo assistencial completo e desbloquear consulta de registros. |
| **P1 - Escopo original da Sprint 4** | US11, US02, US06, US15 | Mantêm o planejamento original de consolidação operacional, mas dependem da capacidade restante após recuperação do débito técnico. |
| **P2 - Ajustes de qualidade e evidências** | Correções de integração, testes, revisão e evidências | Garantem que as entregas atendam ao DoD e possam ser demonstradas com segurança. |

---

## Escopo Selecionado

| User Story | Funcionalidade | Persona | Prioridade na Sprint 4 | Objetivo na Sprint |
| --- | --- | --- | :---: | --- |
| **US04** | Registrar, editar e consultar sinais vitais do residente | Cuidador | P0 | Permitir registro de pressão arterial, frequência cardíaca, temperatura e glicemia com validações clínicas. |
| **US05** | Registrar, editar e consultar rotinas assistenciais do residente | Cuidador | P0 | Permitir registro de alimentação e higiene realizadas no turno. |
| **US14** | Consultar histórico de registros do residente | Membro da equipe multidisciplinar | P0 | Exibir os registros assistenciais do residente em ordem cronológica decrescente. |
| **US11** | Atualizar dados cadastrais do usuário | Gestor | P1 | Permitir correção e atualização dos dados dos membros da equipe. |
| **US02** | Editar dados pessoais e clínicos do residente | Gestor | P1 | Manter o cadastro do residente atualizado após o cadastro inicial. |
| **US06** | Registrar, editar e consultar administração de medicamentos | Cuidador | P1 | Registrar administração ou não administração de medicamentos no turno. |
| **US15** | Filtrar histórico por período | Membro da equipe multidisciplinar | P1 | Permitir localizar registros assistenciais em intervalo de datas definido. |

---

## Critérios de Aceitação da Sprint

### US04 - Registrar, editar e consultar sinais vitais do residente

- **CA04.1:** Dado que o Cuidador está autenticado e selecionou um residente, quando preencher os campos de sinais vitais (pressão arterial, frequência cardíaca, temperatura e glicemia) e confirmar, então o registro é salvo com data, horário automático e identificação do cuidador.
- **CA04.2:** Dado que o Cuidador informa valores fora dos intervalos clínicos de referência, quando tentar salvar o registro, então o sistema solicita confirmação explícita antes de persistir os dados e sinaliza o registro para avaliação da equipe responsável.

### US05 - Registrar, editar e consultar rotinas assistenciais do residente

- **CA05.1:** Dado que o Cuidador está autenticado e selecionou um residente, quando registrar as rotinas do turno (alimentação: tipo de refeição e percentual de aceitação; higiene: banho, troca, cuidados bucais) e confirmar, então o registro é salvo com data, horário automático e identificação do cuidador.
- **CA05.2:** Dado que o Cuidador tenta salvar uma rotina assistencial sem preencher campos obrigatórios do turno, quando confirmar o registro, então o sistema indica os campos pendentes e não salva o registro incompleto.

### US14 - Consultar histórico de registros do residente

- **CA14.1:** Dado que o usuário está autenticado e selecionou um residente, quando acessar o histórico assistencial, então o sistema exibe a lista de todos os registros em ordem cronológica decrescente, com data, horário, tipo de registro e nome do cuidador responsável.
- **CA14.2:** Dado que o residente selecionado ainda não possui registros assistenciais, quando o usuário acessar o histórico, então o sistema exibe uma mensagem informando que não há registros disponíveis.

### US11 - Atualizar dados cadastrais do usuário

- **CA11.1:** Dado que o Gestor está visualizando o perfil de um usuário ativo, quando alterar um ou mais campos e confirmar, então as informações são atualizadas imediatamente no sistema.
- **CA11.2:** Dado que o Gestor altera campos obrigatórios para valores inválidos ou vazios, quando confirmar a atualização, então o sistema informa os campos com problema e não salva as alterações.

### US02 - Editar dados pessoais e clínicos do residente

- **CA02.1:** Dado que o Gestor está visualizando o perfil de um residente ativo, quando alterar um ou mais campos e confirmar, então as alterações são salvas e o perfil atualizado fica visível para toda a equipe.
- **CA02.2:** Dado que o Gestor altera campos obrigatórios para valores inválidos ou vazios, quando confirmar a edição, então o sistema informa os campos com problema e não salva as alterações.

### US06 - Registrar, editar e consultar administração de medicamentos

- **CA06.1:** Dado que o Cuidador está autenticado e selecionou um residente, quando confirmar a administração de um medicamento, então o registro é salvo com nome do medicamento, horário de administração e identificação do cuidador.
- **CA06.2:** Dado que o residente recusou ou não pôde receber o medicamento, quando o Cuidador registrar a não administração com o motivo, então a ocorrência é salva e associada ao histórico do turno.

### US15 - Filtrar histórico por período

- **CA15.1:** Dado que existem registros assistenciais com datas diferentes para um residente, quando o usuário definir uma data de início e uma data de fim e aplicar o filtro, então o sistema retorna apenas os registros dentro do intervalo informado, mantendo a ordenação cronológica.
- **CA15.2:** Dado que o período filtrado não retorna nenhum registro, quando o filtro for aplicado, então o sistema exibe uma mensagem informando que não há registros no período selecionado.

---

## Definition of Ready Aplicada

As histórias selecionadas para a Sprint 4 foram consideradas prontas para desenvolvimento porque atendem aos critérios principais do DoR oficial do projeto:

- estão descritas como User Stories com persona, ação e benefício;
- possuem critérios de aceitação em formato Dado / Quando / Então;
- possuem relação com requisitos funcionais, regras de negócio e RNFs aplicáveis;
- possuem valor claro para o fluxo assistencial, administrativo ou de consulta;
- possuem dependências conhecidas e registradas;
- possuem comportamento verificável por testes, inspeção ou demonstração funcional;
- possuem escopo compatível com desenvolvimento incremental, desde que a equipe respeite a prioridade P0 antes de ampliar para P1;
- serão validadas pelo DoD antes de serem consideradas concluídas.

### Dependências Identificadas

| Dependência | Impacto | Tratamento planejado |
| --- | --- | --- |
| US14 depende de registros gerados por US04 e US05 | Sem registros assistenciais, o histórico só pode demonstrar estado vazio. | Implementar persistência e registro assistencial antes da consulta completa. |
| US15 depende do histórico da US14 | O filtro só é útil se houver lista de registros consolidada. | Implementar US15 após a consulta básica do histórico estar funcional. |
| US06 depende da estrutura de registros assistenciais | O registro de medicamentos deve seguir o mesmo padrão de data, horário, responsável e residente. | Reaproveitar a estrutura de persistência assistencial definida para US04 e US05. |
| US02 e US11 dependem de cadastros da Sprint 2 | A edição precisa preservar dados já cadastrados e não quebrar login/residentes. | Testar regressão dos fluxos de cadastro e autenticação. |

---

## Análise INVEST

| User Story | Independent | Negotiable | Valuable | Estimable | Small | Testable |
| --- | --- | --- | --- | --- | --- | --- |
| **US04** | Parcialmente; depende de residente cadastrado. | Sim; campos e mensagens podem ser refinados. | Alta; registra dados clínicos recorrentes. | Sim. | Sim, se limitada a sinais vitais básicos. | Sim, pelos critérios CA04.1 e CA04.2. |
| **US05** | Parcialmente; depende de residente cadastrado. | Sim; campos de rotina podem ser refinados. | Alta; substitui parte do registro em papel. | Sim. | Sim, se limitada a alimentação e higiene. | Sim, pelos critérios CA05.1 e CA05.2. |
| **US14** | Parcialmente; depende de registros existentes para histórico completo. | Sim; apresentação visual pode ser ajustada. | Alta; apoia continuidade do cuidado. | Sim. | Sim, se limitada à consulta cronológica. | Sim, pelos critérios CA14.1 e CA14.2. |
| **US11** | Parcialmente; depende de usuários cadastrados. | Sim. | Média/alta; mantém equipe atualizada. | Sim. | Sim. | Sim, pelos critérios CA11.1 e CA11.2. |
| **US02** | Parcialmente; depende de residente cadastrado. | Sim. | Alta; mantém dados clínicos atualizados. | Sim. | Sim, se limitada à edição dos campos existentes. | Sim, pelos critérios CA02.1 e CA02.2. |
| **US06** | Parcialmente; depende do padrão de registro assistencial. | Sim. | Alta; registra medicação administrada ou recusada. | Sim. | Parcialmente; pode ser fatiada se necessário. | Sim, pelos critérios CA06.1 e CA06.2. |
| **US15** | Parcialmente; depende da US14. | Sim. | Alta; melhora busca no histórico. | Sim. | Sim. | Sim, pelos critérios CA15.1 e CA15.2. |

---

## Regras de Negócio e RNFs Considerados

| Item | Aplicação na Sprint 4 |
| --- | --- |
| **RN-01** | Registros assistenciais devem preservar operação local e sincronização posterior quando aplicável. |
| **RN-05** | Formulários de registros assistenciais não podem ser salvos com campos obrigatórios vazios. |
| **RN-06** | Sinais vitais devem ser validados contra intervalos clínicos de referência. |
| **RN-07** | Valores fora dos parâmetros clínicos devem ser sinalizados para avaliação. |
| **RN-08** | Administração de medicamentos deve registrar horário exato de administração ou motivo de não administração. |
| **RN-09** | Registros assistenciais devem exibir confirmação visual após salvamento. |
| **RNF01** | Registros devem manter vínculo correto com o residente. |
| **RNF05** | Salvamento local de registro assistencial deve ser confirmado em até 1 segundo. |
| **RNF06** | Registros assistenciais devem conter residente, tipo, data, horário e responsável. |
| **RNF07** | Autoria, data e horário devem ser registrados automaticamente. |
| **RNF15** | Histórico deve permitir identificar tipo, data, horário e responsável com clareza. |
| **RNF16** | Consulta e filtragem do histórico devem manter desempenho aceitável. |

---

## Planejamento Técnico por Membro

### Dupla A - Frontend e Interface

#### Membro 1 - Frontend Lead

- Organizar navegação entre listagem de residentes, seleção de residente, registro assistencial e histórico.
- Implementar ou ajustar telas de sinais vitais e rotinas assistenciais.
- Integrar formulários com os services de persistência.
- Garantir feedback visual de sucesso, erro e valores fora dos parâmetros.
- Validar responsividade em tablet e dispositivos móveis.

#### Membro 2 - Formulários e Fluxos Operacionais

- Implementar ou ajustar edição de usuário e edição de residente.
- Implementar interface de registro de administração de medicamentos, se houver capacidade após P0.
- Implementar filtro de histórico por período, se a US14 estiver funcional.
- Revisar mensagens de validação e estados vazios.
- Apoiar a coleta de evidências visuais da sprint.

### Dupla B - Serviços, Persistência e Integração

#### Membro 3 - Services e Persistência

- Implementar persistência dos registros de sinais vitais e rotinas assistenciais.
- Garantir vínculo entre registro, residente, data, horário e responsável.
- Validar campos obrigatórios e intervalos clínicos.
- Preparar a estrutura dos registros para consulta futura no histórico.
- Apoiar a integração com IndexedDB e backend mock.

#### Membro 4 - Histórico, Integração e Qualidade

- Consolidar sinais vitais e rotinas assistenciais no histórico do residente.
- Garantir ordenação cronológica decrescente.
- Validar isolamento dos registros por residente.
- Implementar ou apoiar testes de regressão, build e evidências.
- Verificar controle de acesso por perfil e compatibilidade com registros persistidos.

---

## Artefatos Planejados

| Artefato | Objetivo | Responsável principal |
| --- | --- | --- |
| Issues da Sprint 4 | Dividir o escopo entre as duplas e manter rastreabilidade da execução. | Equipe |
| Services de registros assistenciais | Persistir sinais vitais, rotinas e metadados de rastreabilidade. | Dupla B |
| Telas de registro assistencial | Permitir lançamento dos registros pelo cuidador. | Dupla A |
| Histórico assistencial | Permitir consulta dos registros consolidados por residente. | Dupla A e Dupla B |
| Testes e build | Verificar regressão e comportamento esperado das histórias. | Equipe |
| Evidências de validação | Registrar prints, resultados de testes, comentários de PR e demonstração dos fluxos. | Equipe |

---

## Definition of Done Aplicada

Uma User Story da Sprint 4 será considerada concluída quando:

- a funcionalidade corresponder ao objetivo da User Story;
- todos os critérios de aceitação aplicáveis forem verificados;
- cenários principais, estados vazios, campos obrigatórios e erros relevantes forem testados;
- regras de negócio e RNFs associados forem considerados;
- registros assistenciais preservarem residente, tipo, data, horário e responsável;
- a interface estiver adequada ao uso em tablets e dispositivos móveis, quando aplicável;
- a funcionalidade não comprometer dados existentes de usuários, residentes, sessão ou registros assistenciais;
- testes automatizados, testes manuais ou inspeções suficientes forem realizados;
- evidências de validação forem registradas;
- a documentação relacionada for atualizada quando necessário;
- a entrega passar por revisão de outro membro via Pull Request.

---

## Roteiro de Demo Planejado

1. Acessar a aplicação com usuário autenticado.
2. Selecionar um residente cadastrado.
3. Registrar sinais vitais válidos.
4. Tentar registrar sinais vitais fora dos parâmetros e demonstrar solicitação de confirmação.
5. Registrar rotina assistencial do turno.
6. Consultar o histórico assistencial do residente.
7. Demonstrar histórico vazio em residente sem registros.
8. Demonstrar que registros de um residente não aparecem no histórico de outro.
9. Se concluído, editar dados de usuário e residente.
10. Se concluído, registrar administração ou não administração de medicamento.
11. Se concluído, filtrar histórico por período.

---

## Riscos e Mitigações

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Acúmulo de débito técnico da Sprint 3 com escopo original da Sprint 4 | Sobrecarga e risco de entregas parciais. | Priorizar P0 antes de iniciar P1 e registrar pendências explicitamente. |
| US14 e US15 dependerem de registros consistentes | Histórico ou filtro podem ficar incompletos. | Consolidar modelo de persistência antes da interface de consulta. |
| Valores clínicos fora dos parâmetros serem salvos sem controle | Risco de erro operacional e quebra da RN-06/RN-07. | Exigir confirmação explícita e sinalização do registro. |
| Registro assistencial ficar sem rastreabilidade | Perda de autoria e dificuldade de auditoria. | Registrar automaticamente residente, data, horário e responsável. |
| Integração entre frontend, IndexedDB e backend mock falhar | Dados podem não aparecer na consulta ou na demo. | Validar fluxo integrado e manter testes de regressão. |
| Escopo de medicação crescer além da sprint | Atraso nas histórias P0. | Limitar US06 ao registro mínimo previsto nos critérios de aceite. |

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 21/06/2026 | 1.0 | Preenchimento do Planning da Sprint 4 com escopo, critérios de aceite, priorização, DoR, DoD, divisão técnica e riscos. | Equipe VitalTech |
