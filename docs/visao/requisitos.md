# REQUISITOS DE SOFTWARE

**VitalTech - Requisitos Funcionais e Não Funcionais**

Este documento consolida a uma pré-lista de requisitos do VitalTech. Os requisitos funcionais são apresentados apenas pelo nome, seguindo o formato **verbo no infinitivo + objeto**. Os requisitos não funcionais apresentam **nome, descrição e classificação por URPS+ e Sommerville**.

---

## 1. Lista de Requisitos Funcionais - RFs

Os requisitos funcionais descrevem as funcionalidades que o sistema deve disponibilizar para apoiar o acompanhamento assistencial dos idosos.

### Identificação e Acesso

| Código | Nome do requisito |
|---|---|
| RF01 | Autenticar funcionários |
| RF02 | Gerenciar perfis de acesso |
| RF03 | Identificar idosos |
| RF04 | Consultar dados do idoso |
| RF05 | Manter área de acompanhamento do idoso |

### Registros de Saúde

| Código | Nome do requisito |
|---|---|
| RF06 | Registrar pressão arterial |
| RF07 | Registrar frequência cardíaca |
| RF08 | Registrar glicemia |
| RF09 | Registrar temperatura |
| RF10 | Registrar data e horário da aferição |
| RF11 | Validar valores das aferições |
| RF12 | Emitir alerta de aferições fora dos parâmetros definidos |

### Rotinas Assistenciais

| Código | Nome do requisito |
|---|---|
| RF13 | Registrar alimentação do idoso |
| RF14 | Registrar hidratação do idoso |
| RF15 | Registrar banho do idoso |
| RF16 | Registrar necessidades básicas do idoso |
| RF17 | Registrar aspecto da urina |
| RF18 | Registrar aspecto das fezes |
| RF19 | Registrar observações assistenciais |

### Medicamentos

| Código | Nome do requisito |
|---|---|
| RF20 | Consultar medicamentos previstos |
| RF21 | Registrar tomada de medicamento |
| RF22 | Registrar ausência de tomada de medicamento |
| RF23 | Registrar horário do medicamento |
| RF24 | Registrar observações sobre medicamentos |

### Histórico e Consulta

| Código | Nome do requisito |
|---|---|
| RF25 | Consultar histórico de aferições |
| RF26 | Consultar histórico de rotinas assistenciais |
| RF27 | Consultar histórico de medicamentos |
| RF28 | Filtrar histórico por idoso |
| RF29 | Filtrar histórico por período |
| RF30 | Filtrar histórico por tipo de registro |
| RF31 | Visualizar resumo assistencial do idoso |

### Rastreabilidade e Validação

| Código | Nome do requisito |
|---|---|
| RF32 | Registrar autoria dos lançamentos |
| RF33 | Registrar data e horário dos lançamentos |
| RF34 | Validar preenchimento obrigatório |
| RF35 | Centralizar registros assistenciais |

### Operação Sem Conexão e Sincronização

| Código | Nome do requisito |
|---|---|
| RF36 | Registrar informações sem conexão |
| RF37 | Armazenar registros localmente |
| RF38 | Sincronizar registros assistenciais |
| RF39 | Exibir status de sincronização |
| RF40 | Preservar registros não sincronizados |

---

## 2. Lista de Requisitos Não Funcionais - RNFs

Os requisitos não funcionais descrevem características de qualidade, restrições e condições de operação do sistema.

| Código | Nome | Descrição | Classificação |
|---|---|---|---|
| RNF01 | Usabilidade em tablets | A interface deve ser adequada ao uso em tablets, considerando interação por toque, leitura em telas móveis e organização visual compatível com a rotina dos funcionários. | URPS+: Usabilidade<br>Sommerville: Produto |
| RNF02 | Redução de digitação manual | O sistema deve priorizar campos fechados, alternativas pré-definidas e perguntas de resposta rápida, como “sim” ou “não”, sempre que a informação registrada permitir esse formato. | URPS+: Usabilidade<br>Sommerville: Produto |
| RNF03 | Linguagem compreensível | O sistema deve utilizar linguagem clara, objetiva e adequada à rotina assistencial dos funcionários da instituição. | URPS+: Usabilidade<br>Sommerville: Produto |
| RNF04 | Aprendizado rápido | A interface deve favorecer o aprendizado rápido por novos funcionários, considerando a alta rotatividade da equipe. | URPS+: Usabilidade<br>Sommerville: Produto |
| RNF05 | Preservação de registros offline | O sistema deve preservar os registros realizados sem conexão até que sejam disponibilizados com sucesso no repositório central. | URPS+: Confiabilidade<br>Sommerville: Produto |
| RNF06 | Disponibilidade das funções essenciais | As funções essenciais de registro assistencial devem permanecer disponíveis durante períodos de indisponibilidade temporária da rede. | URPS+: Confiabilidade<br>Sommerville: Produto |
| RNF07 | Controle de acesso | O sistema deve restringir o acesso às informações dos idosos apenas a usuários autorizados, conforme seus perfis de acesso. | URPS+: Segurança (+)<br>Sommerville: Produto |
| RNF08 | Rastreabilidade dos registros | O sistema deve manter rastreabilidade das operações realizadas nos registros assistenciais, incluindo identificação do responsável, data e horário da operação. | URPS+: Auditabilidade (+)<br>Sommerville: Produto |
| RNF09 | Capacidade operacional | O sistema deve comportar a operação com até 74 idosos, 70 funcionários e 35 cuidadores cadastrados, conforme a realidade operacional da instituição. | URPS+: Desempenho<br>Sommerville: Produto |
| RNF10 | Organização do histórico | O histórico dos idosos deve ser apresentado de forma cronológica, organizada e compreensível para a equipe. | URPS+: Usabilidade<br>Sommerville: Produto |
| RNF11 | Suportabilidade em dispositivos móveis | O sistema deve funcionar corretamente nos tablets adotados pela instituição, sendo compatível com navegadores modernos e sistemas operacionais móveis compatíveis com a infraestrutura definida para o projeto. | URPS+: Suportabilidade<br>Sommerville: Produto |
| RNF12 | Desempenho no registro assistencial | O sistema deve carregar as telas principais de registro assistencial em até 2 segundos em pelo menos 95% das tentativas e salvar registros com conexão em até 2 segundos em pelo menos 95% das operações. | URPS+: Desempenho<br>Sommerville: Produto |
| RNF13 | Desempenho no registro sem conexão | O sistema deve salvar registros assistenciais localmente em até 1 segundo em pelo menos 95% das operações durante períodos de indisponibilidade de conexão. | URPS+: Desempenho / Confiabilidade<br>Sommerville: Produto |
| RNF14 | Desempenho na consulta ao histórico | O sistema deve exibir o histórico assistencial de um idoso em até 3 segundos em pelo menos 95% das consultas. | URPS+: Desempenho<br>Sommerville: Produto |
| RNF15 | Desempenho na filtragem do histórico | O sistema deve aplicar filtros ao histórico assistencial em até 3 segundos em pelo menos 95% das consultas. | URPS+: Desempenho<br>Sommerville: Produto |
| RNF16 | Desempenho na sincronização | O sistema deve disponibilizar no repositório central os registros feitos sem conexão em até 5 minutos após o restabelecimento da conexão, considerando um lote de até 100 registros pendentes. | URPS+: Desempenho / Confiabilidade<br>Sommerville: Produto |



---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 11/05/2026 | 1.0 | Criação do documento para a seção de requisitos funcionais e não funcionais. | Enzo Menali |
| 11/05/2026 | 1.1 | Inclusão do documento na seção Visão do Produto e Projeto do GitPages. | Enzo Menali |