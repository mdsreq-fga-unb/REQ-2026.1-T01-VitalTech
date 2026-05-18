# Requisitos (RF/RNF) e Story Mapping — VitalTech

Este documento deriva requisitos a partir de:
- **Solução proposta reformulada**: `temp_solucao_proposta.md` (CP1–CP6 + OE1–OE5)
- **Ata/notes do cliente**: `Instituto Lar dos Velhinhos - Sobradinho.md`

## Premissas e escopo
- Produto: **PWA offline-first** para tablets/smartphones, voltado ao **registro assistencial** e consulta de histórico.
- Contexto: **74 residentes**, ~**35 cuidadores**, **rede instável**, **servidor local** e legado em **Microsoft Access**.
- Perfis (mínimo): **Cuidador/Equipe** (registro e consulta) e **Administrador/Diretoria** (gestão de acesso e cadastros base).

---

## Personas → Objetivos → Objetivos (macro) → Requisitos

Este encadeamento é o que você pode usar no board: **objetivos (da persona)** derivam em **objetivos (macro)** e cada objetivo (macro) referencia os **RFs** (e os **RNFs** que impactam a qualidade).

### Persona 1 — Cuidador(a) (usuário primário)

**Objetivo P1.O1 — Registrar atendimento com rapidez e baixa chance de erro**
- **Objetivos (macro)**: Acessar e identificar; Selecionar residente; Registrar rotina assistencial
- **Requisitos (RF)**: RF-01, RF-02, RF-03, RF-05, RF-06, RF-07, RF-08, RF-09, RF-10, RF-11, RF-12, RF-13
- **Requisitos (RNF)**: RNF-01, RNF-07, RNF-04

**Objetivo P1.O2 — Continuar trabalhando sem internet e sem retrabalho**
- **Objetivos (macro)**: Operar offline e sincronizar
- **Requisitos (RF)**: RF-16, RF-17, RF-18
- **Requisitos (RNF)**: RNF-02, RNF-03

**Objetivo P1.O3 — Consultar histórico para orientar o cuidado no plantão**
- **Objetivos (macro)**: Selecionar residente; Consultar histórico
- **Requisitos (RF)**: RF-05, RF-06, RF-07, RF-14, RF-15
- **Requisitos (RNF)**: RNF-04, RNF-05

**Objetivo P1.O4 (opcional/pós-MVP) — Registrar administração de medicamentos**
- **Objetivos (macro)**: Registrar rotina assistencial (medicação)
- **Requisitos (RF)**: RF-22
- **Requisitos (RNF)**: RNF-01, RNF-07

### Persona 2 — Equipe multidisciplinar (consulta e tomada de decisão)

**Objetivo P2.O1 — Acessar rapidamente o histórico do residente para tomada de decisão**
- **Objetivos (macro)**: Acessar e identificar; Selecionar residente; Consultar histórico
- **Requisitos (RF)**: RF-01, RF-02, RF-05, RF-06, RF-07, RF-14, RF-15
- **Requisitos (RNF)**: RNF-04, RNF-05

**Objetivo P2.O2 — Confiar na rastreabilidade dos registros (autoria e tempo)**
- **Objetivos (macro)**: Consultar histórico
- **Requisitos (RF)**: RF-03, RF-15
- **Requisitos (RNF)**: RNF-10, RNF-06

### Persona 3 — Diretoria/Admin (governança e conformidade)

**Objetivo P3.O1 — Garantir controle de acesso e responsabilidade por ações**
- **Objetivos (macro)**: Acessar e identificar
- **Requisitos (RF)**: RF-01, RF-02, RF-03, RF-04
- **Requisitos (RNF)**: RNF-05, RNF-10

**Objetivo P3.O2 — Centralizar dados para eliminar dupla digitação e permitir histórico único**
- **Objetivos (macro)**: Operar offline e sincronizar
- **Requisitos (RF)**: RF-17, RF-19, RF-20, RF-21
- **Requisitos (RNF)**: RNF-02, RNF-03, RNF-07, RNF-09

**Objetivo P3.O3 — Atender exigências de privacidade e auditoria (LGPD)**
- **Objetivos (macro)**: Acessar e identificar; Operar offline e sincronizar; Consultar histórico
- **Requisitos (RF)**: RF-03, RF-04, RF-19, RF-21
- **Requisitos (RNF)**: RNF-06, RNF-05, RNF-10

---

## Requisitos Funcionais (RF)

Lista de RFs no padrão solicitado: **verbo no infinitivo + objeto** (somente o nome do requisito).

| ID | Requisito Funcional |
| --- | --- |
| **RF-01** | Autenticar usuário |
| **RF-02** | Encerrar sessão |
| **RF-03** | Registrar autoria do registro |
| **RF-04** | Gerenciar perfis de acesso |
| **RF-05** | Listar residentes |
| **RF-06** | Buscar residente |
| **RF-07** | Selecionar residente |
| **RF-08** | Identificar residente por ID |
| **RF-09** | Registrar sinais vitais |
| **RF-10** | Registrar alimentação e hidratação |
| **RF-11** | Registrar higiene e necessidades básicas |
| **RF-12** | Registrar aspecto de urina e fezes |
| **RF-13** | Preencher formulário por seleção rápida |
| **RF-14** | Consultar histórico do residente |
| **RF-15** | Visualizar detalhes do registro |
| **RF-16** | Registrar dados offline |
| **RF-17** | Sincronizar registros automaticamente |
| **RF-18** | Indicar status de sincronização |
| **RF-19** | Receber registros via API |
| **RF-20** | Armazenar registros em repositório central |
| **RF-21** | Validar registros no servidor |
| **RF-22** | Registrar administração de medicação |

---

## Requisitos Não Funcionais (RNF)

Lista de RNFs no padrão solicitado: **nome + descrição + classificação** (URPS+ e Sommerville).

| ID | Nome | Descrição do requisito | Classificação (URPS+) | Classificação (Sommerville) |
| --- | --- | --- | --- | --- |
| **RNF-01** | Garantir interface click-based | A interface deve ser predominantemente baseada em seleção (sim/não, listas e botões grandes), minimizando digitação e reduzindo tempo de treinamento para novos cuidadores. | **U** (Usability) | **Produto** |
| **RNF-02** | Garantir operação offline | O sistema deve permitir o registro assistencial durante indisponibilidade de rede (sem internet) durante o turno, sem impedir o fluxo de trabalho. | **R** (Reliability) | **Produto** |
| **RNF-03** | Garantir persistência local durável | Registros feitos offline devem permanecer armazenados localmente mesmo em caso de fechamento do app, queda de energia ou reinício do dispositivo, até sincronização bem-sucedida. | **R** (Reliability) | **Produto** |
| **RNF-04** | Garantir desempenho de navegação | A listagem e busca de residentes deve manter resposta fluida no tablet considerando o universo de ~74 residentes. | **P** (Performance) | **Produto** |
| **RNF-05** | Garantir autenticação e autorização | O acesso ao sistema e aos endpoints da API deve exigir autenticação; ações sensíveis devem respeitar permissões por perfil (ex.: gestão de acesso restrita). | **+ Segurança** | **Produto** |
| **RNF-06** | Garantir conformidade com LGPD | O sistema deve restringir acesso a dados sensíveis, registrar auditoria de acesso/alteração e reduzir exposição de dados em telas e logs, visando aderência à LGPD. | **+ Segurança/Legal** | **Externo** |
| **RNF-07** | Garantir integridade dos registros | O sistema deve aplicar validações de campos obrigatórios, formatos/unidades e consistência mínima para reduzir registros inválidos e aumentar confiabilidade da informação. | **R** (Reliability) | **Produto** |
| **RNF-08** | Garantir compatibilidade PWA | O frontend deve operar como PWA em navegadores modernos de tablets/smartphones, com interface responsiva e capacidade de operação offline-first. | **+ Compatibilidade** | **Produto** |
| **RNF-09** | Garantir manutenibilidade | A solução deve priorizar simplicidade de código e arquitetura, facilitando manutenção futura (ex.: organização clara, baixa complexidade e documentação mínima). | **S** (Supportability) | **Produto** |
| **RNF-10** | Garantir auditabilidade | Cada registro assistencial deve permitir rastreabilidade de autoria e timestamp (quem fez o quê e quando) para auditorias internas. | **+ Segurança/Compliance** | **Produto** |

---

## Story Map (texto curto para colar no FigJam)

Abaixo está uma proposta de “stickies” em três níveis típicos de story mapping:
- **Objetivos (macro)**
- **Atividades (tarefas)**
- **User stories (itens implementáveis)**

> Dica: no FigJam, use os títulos como stickies; mantenha o ID (RF/RNF) no início para rastrear.

### Objetivo A — Acessar e identificar
**Atividades**
- Login
- Logout
- Troca de usuário/turno

**User stories**
- **RF-01** Como cuidador, quero fazer login, para que meus registros fiquem identificados.
- **RF-02** Como cuidador, quero sair da minha conta, para evitar uso indevido no próximo turno.
- **RF-03** Como diretoria, quero saber quem registrou cada dado, para garantir rastreabilidade.

**Qualidade (RNF)**
- **RNF-05** Autenticação obrigatória para acessar dados.
- **RNF-10** Trilha de auditoria por registro.

### Objetivo B — Selecionar residente
**Atividades**
- Ver lista por setor/quarto
- Buscar por nome
- Abrir prontuário do residente

**User stories**
- **RF-05** Como cuidador, quero ver a lista de residentes por setor/quarto, para achar rápido quem vou atender.
- **RF-06** Como cuidador, quero buscar residente pelo nome, para não perder tempo no plantão.
- **RF-07** Como cuidador, quero selecionar um residente e abrir seu prontuário, para registrar o atendimento.
- **RF-08** Como cuidador, quero ver um ID do residente, para evitar confusão entre nomes parecidos.

**Qualidade (RNF)**
- **RNF-04** Busca fluida para 74 residentes.

### Objetivo C — Registrar rotina assistencial
**Atividades**
- Registrar sinais vitais
- Registrar alimentação/hidratação
- Registrar higiene/necessidades
- Registrar urina/fezes

**User stories**
- **RF-09** Como cuidador, quero registrar PA/FC/glicemia/temperatura, para documentar o estado do residente.
- **RF-10** Como cuidador, quero registrar alimentação/hidratação, para acompanhar necessidades básicas.
- **RF-11** Como cuidador, quero registrar banho/higiene e necessidades, para manter histórico assistencial.
- **RF-12** Como cuidador, quero registrar aspecto de urina/fezes por opções, para padronizar o registro.
- **RF-13** Como cuidador, quero preencher por seleção rápida (botões e sim/não), para registrar rápido sem digitar.

**Qualidade (RNF)**
- **RNF-01** Interface click-based e treinamento rápido.
- **RNF-07** Campos obrigatórios e formatos consistentes.

### Objetivo D — Consultar histórico
**Atividades**
- Ver histórico cronológico
- Abrir detalhe do registro

**User stories**
- **RF-14** Como equipe multidisciplinar, quero ver o histórico do residente, para tomar decisão com base no último atendimento.
- **RF-15** Como equipe, quero abrir um registro do histórico, para ver valores e autoria.

### Objetivo E — Operar offline e sincronizar
**Atividades**
- Registrar offline
- Sincronizar quando voltar rede
- Ver estado da sincronização

**User stories**
- **RF-16** Como cuidador, quero registrar dados sem internet, para não parar o atendimento.
- **RF-17** Como cuidador, quero que os dados sincronizem automaticamente, para não ter retrabalho.
- **RF-18** Como cuidador, quero ver se algo ficou pendente/erro, para garantir que nada foi perdido.
- **RF-19** Como sistema, quero enviar registros para uma API autenticada, para centralizar as informações.
- **RF-20** Como diretoria, quero dados centralizados, para reduzir dupla digitação e permitir histórico único.
- **RF-21** Como sistema, quero validar registros no servidor, para evitar dados inválidos.

**Qualidade (RNF)**
- **RNF-02** Operação offline durante turno.
- **RNF-03** Persistência local durável.

### Objetivo F (opcional / pós-MVP) — Medicação
**Atividades**
- Registrar horários
- Marcar tomou/não tomou

**User stories**
- **RF-22** Como cuidador, quero registrar se o residente tomou o medicamento no horário, para reduzir falhas no cuidado.

---

## Corte sugerido por release (se o template tiver fatias MVP)
- **MVP**: RF-01, RF-03, RF-05–07, RF-09–11, RF-13–14, RF-16–17, RF-19–20
- **Release 2**: RF-08, RF-12, RF-15, RF-18, RF-21
- **Release 3 (opcional)**: RF-22 (medicação)
