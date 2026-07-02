# Sprint 5 - Retrospectiva

## Ata de Reunião

| Campo | Registro |
| --- | --- |
| Data | 01/07/2026 |
| Participantes | Equipe VitalTech |
| Escopo analisado | US12, US13, US03, US07 e US16 |
| Evidência principal | [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110) |

## Pontos Positivos

- As funcionalidades de governança de acesso foram integradas em um único fluxo revisável, cobrindo redefinição de senha e revogação de acesso.
- A inativação de residente foi implementada preservando o histórico assistencial.
- O registro de ocorrências clínicas foi integrado ao histórico do residente.
- O resumo assistencial passou a consolidar os últimos registros por módulo.
- O PR da sprint registrou testes automatizados e build como evidências de validação.

## Pontos a Melhorar

- A sincronização automática de registros offline ainda precisa ser tratada de forma completa.
- O indicador visual de estado de sincronização precisa ficar mais explícito para o usuário.
- As evidências visuais da Sprint 5 devem ser complementadas com prints ou vídeo do fluxo funcionando na GitPage.

## Planos de Ação

| Item | Situação | Encaminhamento |
| --- | --- | --- |
| Débito técnico de sincronização | **Pendente** | Completar mecanismo de fila/reenvio automático de registros offline associado à [RN-01](../../visao/requisitos.md#rn-01). |
| Indicador visual de sincronização | **Pendente** | Evidenciar estados "pendente de sincronização" e "sincronizado" conforme [RNF09](../../visao/requisitos.md#rnf09). |
| Evidências visuais | **Pendente** | Adicionar prints ou vídeo curto dos fluxos da Sprint 5 ao repositório/GitPage e referenciar em [MVP e Status](../../planejamento_organizacao/mvp_e_status.md). |

## Gravação

<video width="100%" controls>
  <source src="../../../assets/videos/sprint5_retrospectiva.mp4" type="video/mp4">
  Seu navegador não suporta a visualização deste vídeo.
</video>

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 01/07/2026 | 1.0 | Registro da retrospectiva da Sprint 5 com pontos positivos, melhorias e débito técnico de sincronização. | Enzo Menali |
