# Sprint 5 - Review

## Ata de Reunião

| Campo | Registro |
| --- | --- |
| Data | 01/07/2026 |
| Participantes | Equipe VitalTech |
| Escopo avaliado | US12, US13, US03, US07 e US16 |
| Evidência principal | [PR #110 - Sprint 5: Governança de Acesso](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) |

## Entregas Validadas

| User Story | Status na review | Evidência | Critérios verificados |
| --- | :---: | --- | --- |
| [US12 - Redefinir senha de acesso](../../visao/user_stories.md#us12) | **Concluída** | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) | CA12.1, CA12.2 e CA12.3 |
| [US13 - Revogar acesso de usuário](../../visao/user_stories.md#us13) | **Concluída** | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) | CA13.1, CA13.2 e CA13.3 |
| [US03 - Inativar cadastro do residente](../../visao/user_stories.md#us03) | **Concluída** | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) | CA03.1 e CA03.2 |
| [US07 - Registrar, editar e consultar ocorrências clínicas](../../visao/user_stories.md#us07) | **Parcial com débito técnico** | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) e [Retrospectiva Sprint 5](retrospectiva.md) | CA07.1, CA07.2, CA07.3, CA07.5 e CA07.6 verificados; CA07.4 permanece relacionado ao débito de sincronização offline/indicador visual. |
| [US16 - Visualizar resumo assistencial](../../visao/user_stories.md#us16) | **Concluída** | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) | CA16.1, CA16.2 e CA16.3 |

## Validações Técnicas

| Validação | Evidência |
| --- | --- |
| Testes automatizados | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110), com registro de `npm.cmd test` e 47 testes aprovados. |
| Build local | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110), com registro de `npm.cmd run build` concluído. |
| Critérios de aceite da Sprint 5 | [services.test.js](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/blob/developer/app/frontend/src/services/__tests__/services.test.js) e [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). |
| Rastreabilidade | [MVP e Status](../../planejamento_organizacao/mvp_e_status.md), [DoR/DoD](../../visao/dor_dod.md) e [Story Map](../../visao/story_map.md#status-de-execução-das-user-stories). |

## Decisão da Review

A Sprint 5 foi considerada encerrada com incremento funcional integrado no [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). As histórias US12, US13, US03 e US16 foram registradas como concluídas. A US07 foi registrada como parcial com débito técnico explícito em sincronização offline e indicador visual de pendência, conforme a [Retrospectiva Sprint 5](retrospectiva.md).

## Gravação

<video width="100%" controls>
  <source src="../../../assets/videos/sprint5_review.mp4" type="video/mp4">
  Seu navegador não suporta a visualização deste vídeo.
</video>

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 01/07/2026 | 1.0 | Registro da review da Sprint 5 com status por User Story, PR, testes e decisão de fechamento. | Enzo Menali |
