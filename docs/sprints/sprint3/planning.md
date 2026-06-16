# Ata de Reunião — Sprint Planning e Retrospectiva (Sprint 3)

<iframe width="560" height="315" src="https://www.youtube.com/embed/Y1KBBWZ0xmQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

**Data:** 02 de junho de 2026  
**Duração:** 43m 47s  
**Participantes:** Alberto Côrtes, Matheus Eiki, Enzo Menali (PO), Ana Caroline, João Pedro  

## 1. Retrospectiva e Entregas da Sprint 2
- **Ana Caroline:** Relatou a finalização do protótipo de alta fidelidade e a implementação inicial das telas de cadastro de usuário e residente.
- **João Pedro:** Concluiu a modelagem do banco de dados com base nos relacionamentos das entidades.
- **Alberto Côrtes:** Realizou a integração entre frontend e backend (tela de login e painel de residentes).
- **Matheus Eiki:** Executou testes nos formulários de login e credenciais inválidas. Relatou dificuldades pontuais na criação de testes automatizados para a expiração de tokens.
  - *Ação Tomada:* As validações iniciais serão manuais guiadas pelo *DoD*, anexando prints nos PRs. Ele foi oficialmente alocado na equipe de backend.
  - *Conclusão da Sprint:* A equipe finalizou todas as histórias da Sprint 2 e iniciou a Sprint 3 **sem débitos técnicos acumulados**.

## 2. Feedback do Professor e Plano de Ação
A equipe analisou **11 issues abertas pelo professor** no repositório. Ficou acordado que os primeiros dias da Sprint 3 serão dedicados exclusivamente à correção dessas issues e do GitPages (MkDocs).

### 2.1. Verificação e Validação (V/V) do Planejamento
*(Esta seção atende aos critérios de avaliação da disciplina)*
- **Validação:** O escopo do planejamento da Sprint 3 foi validado pelo Product Owner (Enzo Menali) junto com a equipe e com o cliente, garantindo que a capacidade produtiva condiz com as tarefas (corrigir issues e desenvolver novas US).
- **Verificação:** A verificação do planejamento foi feita confirmando que todas as tarefas possuem *Definition of Ready (DoR)* claros, rastreabilidade adequada e que todos os membros compreendem os critérios de aceitação antes da execução.

## 3. Resumo do Planejamento da Sprint 3
**Período:** 02/06 – 15/06/2026 (10 dias úteis)  
**Equipe:** 5 membros (2 Frontend + 3 Backend)  
**Metodologia:** Scrum + XP (*Pair Programming / Code Review*)  

**Objetivo da Sprint:** Corrigir todas as *issues* de qualidade apontadas pelo professor e cumprir com o cronograma planejado para a Sprint 3 (desenvolvimento do núcleo assistencial básico: registro e consulta de saúde).

### 3.1. Histórias de Usuário Planejadas (Backlog da Sprint)
- **US04 - Registrar sinais vitais do residente:** Registro offline-first com sincronização automática.
- **US05 - Registrar rotinas assistenciais do residente:** Registro de alimentação e higiene.
- **US14 - Consultar histórico de registros do residente:** Exibição cronológica decrescente dos registros.

### 3.2. Status de Execução (O que realmente aconteceu)
Devido ao alto esforço e tempo necessários para corrigir perfeitamente as 11 *issues* do professor (reestruturando RNFs, Matriz, Cronograma e V/V), **a equipe não conseguiu cumprir o desenvolvimento do escopo de código planejado (US04, US05 e US14)** dentro do tempo hábil. 
- *Ação:* A equipe oficializa a **entrada em débito técnico**, transferindo a US04, US05 e US14 integralmente para o planejamento da Sprint 4.

## 4. Verificação e Validação (V/V) da Execução e Entrega
Apesar dos atrasos técnicos no código, a equipe realizou uma validação formal da arquitetura de telas, prototipagem e soluções desenhadas com o cliente por meio de um formulário estruturado.

**Resultados da Validação com o Cliente:**
- **Divisão de Permissões e Perfis:** *Sim* (atende adequadamente à hierarquia).
- **Regras de Segurança:** *Sim* (adequadas e viáveis para o dia a dia).
- **Registro dos Residentes:** *Não* sente falta de informações iniciais essenciais.
- **Funcionamento Sem Internet:** Avaliado como *"Excelente solução"*.
- **Alinhamento com as Expectativas (1 a 5):** Nota **5.00** (100% de satisfação).
- **Comentários Finais do Cliente:** *"Parabéns a todos. Ficou muito bom."*

---
### Anexo: Validação do Formulário com o Cliente
*(Abaixo encontra-se a gravação de tela validando as respostas do cliente)*

<iframe width="560" height="315" src="https://www.youtube.com/embed/UtI32xofJBk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
