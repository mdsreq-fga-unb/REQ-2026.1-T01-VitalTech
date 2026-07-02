# Sprint 5 - Retrospectiva

## Ata de Reunião

| Campo | Registro |
| --- | --- |
| Data | 01/07/2026 |
| Período da sprint | 28/06/2026 a 01/07/2026 |
| Participantes | Equipe VitalTech |
| Contexto | Fechamento técnico da Sprint 5 e consolidação das últimas entregas do MVP. |

## Visão Geral

A Sprint 5 concentrou o fechamento técnico do MVP, com foco em governança de acesso, preservação de histórico, ocorrências clínicas e resumo assistencial. A equipe executou as histórias **US12**, **US13**, **US03**, **US07** e **US16**, consolidando a entrega no [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110).

A retrospectiva registra os aprendizados do ciclo, as pendências técnicas explícitas e as ações necessárias para manter a documentação alinhada ao estado real do produto.

## Pontos Positivos

- A Sprint 5 concluiu tecnicamente as histórias planejadas para o fechamento do MVP.
- A suíte de serviços passou com **51 testes aprovados**, cobrindo os principais critérios de aceitação das histórias entregues.
- A implementação preservou a rastreabilidade entre User Stories, requisitos, regras de negócio, RNFs, critérios de aceitação e PR.
- A equipe manteve o foco na preservação de dados históricos, especialmente em revogação de acesso e inativação de residente.
- O resumo assistencial consolidou informações de diferentes módulos, reforçando a utilidade do histórico assistencial para tomada de decisão.
- A documentação passou a explicitar melhor o status real das entregas, reduzindo ambiguidade entre planejamento, execução e MVP implementado.

## Pontos a Melhorar

- A Sprint 5 concentrou várias histórias em um único PR, o que aumenta o esforço de revisão e exige documentação mais detalhada para manter rastreabilidade.
- Parte da documentação de status foi atualizada depois da implementação, gerando risco temporário de divergência entre Planning, Review, Cronograma, Story Map e Matriz de Priorização.
- Nem todos os ritos tiveram gravação formal anexada; quando não houver gravação, a ausência precisa ser declarada explicitamente para não parecer evidência faltante.
- A sincronização oportunista com a API foi implementada no recorte do MVP, mas a fila completa de reenvio após reconexão e o indicador visual claro do estado de sincronização ainda precisam evoluir.
- A validação final do cliente precisa permanecer separada da validação técnica por PR/testes, para não declarar como validado pelo cliente algo que foi apenas verificado pela equipe.

## Lições Aprendidas

- Histórias com impacto em segurança, permissões e preservação de histórico precisam de testes automatizados ligados diretamente aos critérios de aceite.
- Ao alterar o status de uma User Story, a equipe precisa atualizar simultaneamente Cronograma, Story Map, Matriz de Priorização, DoR/DoD e página de Planejamento e Organização.
- PRs muito abrangentes podem ser aceitáveis em fechamento de MVP, mas exigem descrição forte, checklist completo e referência explícita aos testes.
- Evidências visuais, links de aplicação, PRs e testes precisam aparecer juntos para facilitar a avaliação externa.
- Débitos técnicos devem ser nomeados diretamente, sem tentar escondê-los como entrega concluída.

## Planos de Ação

| Ação | Responsável | Encaminhamento |
| --- | --- | --- |
| Atualizar artefatos de status da Sprint 5 após o preenchimento da Review e da Retrospectiva. | Equipe | Alinhar Cronograma, Story Map, Matriz de Priorização, DoR/DoD e Planejamento e Organização. |
| Registrar o recorte técnico de RN-01 e RNF09. | Equipe | Evidenciar que a sincronização oportunista foi implementada quando a API está disponível, mantendo fila de reenvio após reconexão e indicador visual como evolução posterior. |
| Validar links finais da GitPage. | Equipe | Conferir links para PR #110, testes, prints por User Story, aplicação publicada e documentos de rastreabilidade. |
| Separar validação técnica e validação do cliente. | Equipe | Usar testes/PRs para verificação técnica e formulário/reunião do cliente apenas quando houver evidência externa. |
| Reforçar a documentação de deploy e disponibilidade do software. | Equipe | Relacionar aplicação publicada, API, Swagger e banco de dados quando esses ambientes estiverem confirmados. |

## Observações Técnicas 

| Item | Situação |
| --- | --- |
| **RN-01 - Operação offline e sincronização posterior** | O sistema preserva registros localmente e tenta sincronizar com o backend quando a API está disponível no momento da operação. A fila completa de reenvio após reconexão e resolução de pendências ainda precisa ser evoluída. |
| **RNF09 - Transparência da sincronização** | O vínculo remoto é registrado quando a sincronização oportunista ocorre, mas o indicador visual de estado ainda precisa ser aprimorado para comunicar claramente registros pendentes, sincronizados ou com falha. |

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 02/07/2026 | 1.0 | Registro da Retrospectiva da Sprint 5 com pontos positivos, pontos de melhoria, lições aprendidas e plano de ação. | Enzo Menali |
