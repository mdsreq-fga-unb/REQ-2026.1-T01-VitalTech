# Sprint 5 - Review

## Ata de Reunião

| Campo | Registro |
| --- | --- |
| Data | 01/07/2026 |
| Período da sprint | 28/06/2026 a 01/07/2026 |
| Participantes | Equipe VitalTech |
| Estratégia de desenvolvimento | ScrumXP |
| Base de validação | [Planning Sprint 5](planning.md), [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110), testes automatizados de serviços e inspeção dos fluxos no aplicativo. |

## Objetivo da Review

A Sprint 5 teve como objetivo finalizar a governança de acesso, a inativação operacional de residentes, o registro de ocorrências clínicas e a visualização do resumo assistencial do residente.

O incremento revisado consolida as histórias **US12**, **US13**, **US03**, **US07** e **US16**, mantendo a rastreabilidade com os requisitos funcionais, regras de negócio, RNFs, critérios de aceitação, planejamento da sprint e evidências de teste.

## Entregas Validadas

| User Story | Entrega apresentada | Status na Review | Evidências |
| --- | --- | :---: | --- |
| **US12 - Redefinir senha de acesso do usuário** | Redefinição de senha por Gestor, invalidação da senha anterior e bloqueio para perfil sem permissão. | **Concluída** | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) e teste em `services.test.js` na linha 1167. |
| **US13 - Revogar acesso do usuário** | Revogação de acesso, bloqueio de nova autenticação para usuário inativo e preservação dos registros históricos associados ao usuário. | **Concluída** | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) e teste em `services.test.js` na linha 1198. |
| **US03 - Inativar o cadastro do residente** | Inativação lógica do residente, remoção da lista operacional e preservação do histórico assistencial para consulta autorizada. | **Concluída** | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) e teste em `services.test.js` na linha 1235. |
| **US07 - Registrar, editar e consultar ocorrências clínicas do residente** | Registro, consulta e edição de ocorrência clínica, com rastreabilidade, validação de campos e sinalização de evento que exige atenção para notificação. | **Concluída** | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) e teste em `services.test.js` na linha 1265. |
| **US16 - Visualizar resumo assistencial do residente** | Consolidação do último registro por módulo assistencial e exibição de estados vazios quando não há dados em algum módulo. | **Concluída** | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) e teste em `services.test.js` na linha 1355. |

## Verificação Técnica

A verificação técnica da Sprint 5 foi realizada com base no PR de integração, nos critérios de aceitação das User Stories e na suíte automatizada de serviços.

Resultado executado localmente em 02/07/2026:

```text
npm.cmd test
tests 51
suites 12
pass 51
fail 0
duration_ms 1032.8951
```

As mensagens de servidor offline exibidas durante a execução fazem parte dos cenários mockados da suíte, usados para verificar fallback local, preservação de dados e comportamento em indisponibilidade da API.

## Critérios de Aceitação Verificados

| User Story | Critérios verificados | Resultado |
| --- | --- | --- |
| **US12** | CA12.1, CA12.2 e CA12.3 | Senha anterior invalidada, nova credencial aceita e redefinição bloqueada para perfil sem permissão. |
| **US13** | CA13.1, CA13.2 e CA13.3 | Usuário revogado fica inativo, não gera nova sessão e seus registros históricos permanecem associados à identificação original. |
| **US03** | CA03.1 e CA03.2 | Residente inativo sai da lista operacional e mantém histórico consultável por usuário autorizado. |
| **US07** | CA07.1, CA07.2, CA07.3, CA07.4, CA07.5 e CA07.6 | Ocorrência é registrada, consultada, editada e sinalizada quando exige atenção para notificação; campos obrigatórios, rastreabilidade, preservação local e sincronização oportunista quando a API está disponível foram verificados. A fila completa de reenvio após reconexão e o indicador visual de sincronização permanecem como evolução técnica em RN-01/RNF09. |
| **US16** | CA16.1, CA16.2 e CA16.3 | Resumo assistencial consolida os últimos registros por módulo, explicita ausência de dados por módulo e utiliza controle de permissão por perfil no serviço de consulta. |

## Decisões da Review

| Decisão | Impacto |
| --- | --- |
| Registrar US12, US13, US03, US07 e US16 como concluídas tecnicamente na Sprint 5. | Atualizar artefatos de status do MVP, Story Map, Cronograma, DoR/DoD e página de Planejamento e Organização. |
| Registrar RN-01 e RNF09 com recorte técnico explícito. | O projeto preserva dados localmente e sincroniza de forma oportunista quando a API está disponível; a fila completa de reenvio após reconexão e o indicador visual de sincronização permanecem como evolução posterior. |
| Registrar ausência de gravação formal da Review. | Evita apresentar evidência inexistente; a validação da sprint fica sustentada por PR, testes e documentação. |
| Usar o PR #110 como evidência integrada da Sprint 5. | As entregas foram consolidadas em um PR único, com testes automatizados associados aos critérios de aceitação. |

## Resultado da Sprint

A Sprint 5 foi considerada **concluída tecnicamente**. As User Stories planejadas foram implementadas, testadas e rastreadas ao PR #110. O incremento final reforça o fechamento do MVP ao cobrir governança de acesso, preservação de histórico, ocorrências clínicas e resumo assistencial.

As pendências remanescentes não impedem a demonstração do MVP, mas devem permanecer documentadas como evolução técnica do produto, principalmente a fila completa de reenvio após reconexão e a transparência visual do estado de sincronização.

## Gravação

Não há gravação formal anexada a este artefato. A evidência da Review da Sprint 5 está registrada por meio do [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110), dos testes automatizados e dos links de rastreabilidade presentes neste documento.

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 02/07/2026 | 1.0 | Registro da Review da Sprint 5 com entregas por User Story, critérios de aceitação, testes e pendências técnicas. | Enzo Menali |
