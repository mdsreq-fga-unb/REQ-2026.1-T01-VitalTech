# Sprint 4 - Review

## Ata de Reunião

- **Data:** 28/06/2026
- **Participantes:** Equipe VitalTech, Product Owner e cliente por meio de formulário de validação.
- **Formato:** Consolidação assíncrona das entregas, revisão técnica por Pull Requests e validação do produto via formulário.

---

## Entregas Apresentadas

A Sprint 4 teve dois objetivos: recuperar o débito técnico da Sprint 3 e executar o escopo originalmente planejado para a Sprint 4. As histórias US04, US05 e US14 foram realocadas da Sprint 3 para esta sprint, enquanto US11, US02, US06 e US15 permaneceram como escopo próprio da Sprint 4.

| User Story | Entrega apresentada | Status na Review | Evidências |
| --- | --- | :---: | --- |
| **US04 - Registrar, editar e consultar sinais vitais do residente** | Registro, persistência e consulta via histórico de sinais vitais com vínculo ao residente, responsável, data e horário. | **Concluída no recorte MVP** | [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). |
| **US05 - Registrar, editar e consultar rotinas assistenciais do residente** | Registro, persistência e consulta via histórico de rotinas assistenciais com vínculo ao residente, responsável, data e horário. | **Concluída no recorte MVP** | [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83), [PR #84](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/84) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). |
| **US14 - Consultar histórico de registros do residente** | Histórico assistencial por residente, com ordenação cronológica e estado vazio. | **Concluída** | [PR #83](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/83) e [PR #85](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/85). |
| **US11 - Atualizar dados cadastrais do usuário** | Edição de usuário, validação de campos e controle de permissão por perfil. | **Concluída** | [PR #90](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/90) e [PR #93](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/93). |
| **US02 - Editar dados pessoais e clínicos do residente** | Edição de residente com validação de campos e preservação dos vínculos existentes. | **Concluída** | [PR #90](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/90) e [PR #93](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/93). |
| **US06 - Registrar, editar e consultar administração de medicamentos** | Registro de administração e não administração de medicamentos, com responsável e horário automático. | **Concluída** | [PR #91](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/91). |
| **US15 - Filtrar histórico por período** | Filtro do histórico assistencial por intervalo de datas. | **Concluída** | [PR #92](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/92). |

---

## Verificação Técnica

A verificação técnica da Sprint 4 foi realizada por meio de revisão dos Pull Requests, execução dos testes registrados nas descrições dos PRs e validação local dos fluxos integrados.

| Escopo verificado | Evidência | Resultado |
| --- | --- | --- |
| Persistência e histórico assistencial | PR #83 e PR #85 | Testes e build registrados nos PRs; histórico vinculado ao residente e sem mistura de registros. |
| Registro de rotinas e sinais vitais | PR #83, PR #84 e PR #85 | Registros assistenciais persistidos e disponíveis para consulta posterior. |
| Edição de usuário e residente | PR #90 e PR #93 | Validações, permissões e preservação de dados revisadas por PR. |
| Administração de medicamentos | PR #91 | Registro de administração/não administração integrado ao fluxo assistencial. |
| Filtro do histórico por período | PR #92 | Consulta por intervalo validada tecnicamente. |

---

## Validação do Cliente

O cliente validou o produto por meio de formulário externo, utilizado como evidência formal de feedback da Sprint 4:

- [Formulário de validação do cliente](https://docs.google.com/forms/d/1jZYJ1vcGutQ4t1C4xJf9qxUmTCGUxZ5RH_nczJL-CFs/edit?ts=6a301b5f#responses)

Essa validação foi considerada como feedback de produto para o incremento demonstrável da Sprint 4. O formulário complementa a verificação técnica dos PRs, mas não substitui o controle de status por User Story: US04, US05, US14, US11, US02, US06 e US15 foram consideradas concluídas dentro do recorte entregue. Para US04 e US05, o MVP cobriu registro e consulta via histórico, deixando a edição de registros assistenciais como evolução posterior.

> O link do formulário deve permanecer acessível à banca e à monitoria pelas permissões do Google Forms. Caso o acesso externo esteja restrito, a equipe deve manter print ou exportação das respostas como evidência adicional no repositório.

---

## Decisões e Impactos

| Decisão | Impacto na documentação |
| --- | --- |
| Declarar US04 e US05 como **concluídas no recorte MVP**. | Atualização do [DoR/DoD](../../visao/dor_dod.md), [Story Map](../../visao/story_map.md), [Cronograma](../../visao/cronograma.md) e [Matriz de Priorização](../../visao/priorizacao.md), registrando que o MVP cobriu registro e consulta, enquanto edição permanece como evolução posterior. |
| Registrar US14 como concluída na Sprint 4, mesmo com o PR específico #82 fechado. | A entrega foi absorvida pelos PRs integrados da Sprint 4, preservando a rastreabilidade da US14. |
| Usar o formulário como evidência de validação do cliente. | Consolidação do feedback na seção de [Interação entre Equipe e Cliente](../../visao/interacao.md). |
| Manter Sprint 5 com histórias pendentes/planejadas. | As histórias futuras permanecem sem status de conclusão até haver PR, teste e validação registrados. |

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 01/07/2026 | 1.0 | Registro da Review da Sprint 4, com entregas por User Story, verificação técnica e validação do cliente por formulário. | Enzo Menali |
| 02/07/2026 | 1.1 | Ajuste do status de US04 e US05 para concluídas no recorte do MVP, mantendo edição de registros assistenciais como evolução posterior. | Enzo Menali |
