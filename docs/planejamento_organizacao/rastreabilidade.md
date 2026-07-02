# Rastreabilidade

Esta seção consolida a cadeia de rastreabilidade do VitalTech, conectando problema, objetivos, características de produto, requisitos, User Stories, critérios de aceitação e evidências. Os documentos de origem permanecem em [Cenário Atual](../visao/cenario_atual.md), [Solução Proposta](../visao/solucao_proposta.md), [Requisitos](../visao/requisitos.md), [User Stories](../visao/user_stories.md) e [Story Map](../visao/story_map.md).

## Mapa visual de rastreabilidade

<div class="figma-container">
  <iframe
    style="border: 1px solid rgba(0, 0, 0, 0.1);"
    width="100%"
    height="700"
    src="https://embed.figma.com/design/cYngHqkky6tNZR9Y6jNBro/Untitled?node-id=0-1&embed-host=share"
    allowfullscreen>
  </iframe>
</div>

## Cadeia de rastreabilidade

| Problema / necessidade | Objetivo | Característica de Produto | RF relacionado | User Stories | RN/RNF associados | Evidência / status |
| --- | --- | --- | --- | --- | --- | --- |
| Registros cadastrais e clínicos dos residentes precisam estar organizados e atualizados. | OE1 - Digitalizar e organizar registros assistenciais. | **CP1 - Gestão de Residentes** | [RF01](../visao/requisitos.md#rf01), [RF02](../visao/requisitos.md#rf02), [RF03](../visao/requisitos.md#rf03) | [US01](../visao/user_stories.md#us01), [US02](../visao/user_stories.md#us02), [US03](../visao/user_stories.md#us03) | [RNF01](../visao/requisitos.md#rnf01), [RNF02](../visao/requisitos.md#rnf02), [RNF12](../visao/requisitos.md#rnf12), [RNF14](../visao/requisitos.md#rnf14) | US01, US02 e US03 concluídas; US03 implementada no [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). |
| Registros assistenciais em papel dificultam consulta, continuidade do cuidado e padronização. | OE1 - Digitalizar e organizar registros assistenciais. | **CP2 - Registro Assistencial Digital** | [RF04](../visao/requisitos.md#rf04), [RF05](../visao/requisitos.md#rf05), [RF06](../visao/requisitos.md#rf06), [RF07](../visao/requisitos.md#rf07) | [US04](../visao/user_stories.md#us04), [US05](../visao/user_stories.md#us05), [US06](../visao/user_stories.md#us06), [US07](../visao/user_stories.md#us07) | [RN-01](../visao/requisitos.md#rn-01), [RN-04](../visao/requisitos.md#rn-04), [RN-05](../visao/requisitos.md#rn-05), [RN-06](../visao/requisitos.md#rn-06), [RN-07](../visao/requisitos.md#rn-07), [RN-08](../visao/requisitos.md#rn-08), [RN-09](../visao/requisitos.md#rn-09), [RNF03](../visao/requisitos.md#rnf03), [RNF04](../visao/requisitos.md#rnf04), [RNF05](../visao/requisitos.md#rnf05), [RNF06](../visao/requisitos.md#rnf06), [RNF07](../visao/requisitos.md#rnf07), [RNF08](../visao/requisitos.md#rnf08), [RNF09](../visao/requisitos.md#rnf09) | US04 e US05 parciais; US06 concluída; US07 entregue no fluxo principal pelo [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110), com débito técnico em sincronização offline/indicador visual. |
| Dispositivos compartilhados exigem acesso controlado e encerramento seguro de sessão. | OE2 - Garantir acesso seguro e controle de usuários. | **CP3 - Autenticação de Usuários** | [RF08](../visao/requisitos.md#rf08), [RF09](../visao/requisitos.md#rf09) | [US08](../visao/user_stories.md#us08), [US09](../visao/user_stories.md#us09) | [RNF10](../visao/requisitos.md#rnf10), [RNF11](../visao/requisitos.md#rnf11), [RNF12](../visao/requisitos.md#rnf12), [RNF14](../visao/requisitos.md#rnf14) | US08 e US09 concluídas na Sprint 2. |
| A instituição precisa administrar usuários e permissões de forma rastreável. | OE2 - Garantir acesso seguro e controle de usuários. | **CP4 - Gerenciamento de Usuários** | [RF10](../visao/requisitos.md#rf10), [RF11](../visao/requisitos.md#rf11), [RF12](../visao/requisitos.md#rf12), [RF13](../visao/requisitos.md#rf13) | [US10](../visao/user_stories.md#us10), [US11](../visao/user_stories.md#us11), [US12](../visao/user_stories.md#us12), [US13](../visao/user_stories.md#us13) | [RNF12](../visao/requisitos.md#rnf12), [RNF13](../visao/requisitos.md#rnf13), [RNF14](../visao/requisitos.md#rnf14) | US10, US11, US12 e US13 concluídas; US12 e US13 implementadas no [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). |
| A equipe precisa consultar o histórico assistencial para continuidade do cuidado e tomada de decisão. | OE3 - Apoiar a tomada de decisão clínica. | **CP5 - Consulta do Histórico Assistencial** | [RF14](../visao/requisitos.md#rf14), [RF15](../visao/requisitos.md#rf15), [RF16](../visao/requisitos.md#rf16) | [US14](../visao/user_stories.md#us14), [US15](../visao/user_stories.md#us15), [US16](../visao/user_stories.md#us16) | [RN-02](../visao/requisitos.md#rn-02), [RN-03](../visao/requisitos.md#rn-03), [RNF01](../visao/requisitos.md#rnf01), [RNF07](../visao/requisitos.md#rnf07), [RNF12](../visao/requisitos.md#rnf12), [RNF15](../visao/requisitos.md#rnf15), [RNF16](../visao/requisitos.md#rnf16) | US14, US15 e US16 concluídas; US16 implementada no [PR #110](https://github.com/mdsreq-fga-unb/REQ-2026.1-T01-VitalTech/pull/110). |

## Rastreabilidade por critérios de aceitação

A matriz operacional detalhada com links de **US > RF > RN > RNF > Critérios de Aceitação** está registrada em [Lista de Requisitos](../visao/requisitos.md#41-matriz-operacional-de-rastreabilidade).

| Artefato | Função na rastreabilidade |
| --- | --- |
| [Cenário Atual](../visao/cenario_atual.md) | Registra o problema, stakeholders e contexto operacional. |
| [Solução Proposta](../visao/solucao_proposta.md) | Define objetivo geral, objetivos específicos e características de produto. |
| [Requisitos](../visao/requisitos.md) | Registra RFs, RNs, RNFs e matriz operacional de rastreabilidade. |
| [User Stories](../visao/user_stories.md) | Define User Stories e critérios de aceitação oficiais. |
| [Story Map](../visao/story_map.md) | Organiza a jornada, sprints e status de execução. |
| [MVP e Status](mvp_e_status.md) | Consolida evidências de implementação, PRs, testes e validações. |
