# REQUISITOS DE SOFTWARE

## VitalTech — Requisitos Funcionais e Não Funcionais

Este documento consolida a lista de requisitos funcionais e não funcionais do VitalTech, além de sua matriz de rastreabilidade com as Características do Produto (CP). Os requisitos funcionais são apresentados no formato verbo no infinitivo + objeto. Os requisitos não funcionais incluem nome, descrição técnica e classificação segundo os modelos URPS+ e/ou Sommerville.

---

## 1. Relação de Requisitos Funcionais (RFs) com as Características do Produto (CP)

A tabela abaixo apresenta os requisitos funcionais sequenciados de forma modular, mapeando qual Característica do Produto (CP) ele atende e a justificativa de negócio para sua implementação.

| Código | Requisito | Características do Produto (CP) | Justificativa |
| :--- | :--- | :--- | :--- |
| **RF01** | Autenticar usuário | CP1 | Implementa autenticação e controle de acesso inicial ao sistema. |
| **RF02** | Redefinir senha de acesso | CP1 | Garante gerenciamento seguro e autônomo de credenciais. |
| **RF03** | Encerrar sessão do usuário | CP1 | Mantém a segurança do dispositivo em uso compartilhado. |
| **RF04** | Cadastrar novo usuário | CP1 | Permite o gerenciamento de permissões da equipe (cuidadores/gestores). |
| **RF05** | Editar dados cadastrais de usuário | CP1 | Mantém a base de dados de funcionários atualizada. |
| **RF06** | Revogar o acesso de um usuário | CP1 | Controla a segurança em casos de desligamento de funcionários. |
| **RF07** | Cadastrar informações do idoso | CP2, CP6 | Cria o registro centralizado e perfil do residente assistido. |
| **RF08** | Editar o cadastro do idoso | CP2, CP6 | Atualiza informações clínicas ou dados pessoais do residente. |
| **RF09** | Inativar o cadastro do idoso | CP2, CP6 | Mantém a consistência da base de dados ativa sem exclusão física (Soft Delete). |
| **RF10** | Registrar sinais vitais | CP3, CP6 | Digitaliza a rotina de saúde beira-leito de forma estruturada. |
| **RF11** | Registrar alimentação do idoso | CP3 | Mantém controle nutricional diário do residente. |
| **RF12** | Registrar aceitação da alimentação | CP3 | Complementa os registros alimentares avaliando o apetite. |
| **RF13** | Registrar rotinas de higiene | CP3 | Registra os cuidados diários básicos de enfermagem. |
| **RF14** | Validar valores das aferições | CP6 | Garante a integridade dos dados e previne erros de digitação clínica. |
| **RF15** | Emitir alerta de aferições fora dos parâmetros | CP3, CP4 | Auxilia a rápida tomada de decisão da equipe de enfermagem. |
| **RF16** | Consultar medicamentos previstos | CP4 | Permite visualização clínica do que deve ser administrado no turno. |
| **RF17** | Registrar administração do medicamento | CP3, CP6 | Documenta a medicação efetivamente ingerida pelo residente. |
| **RF18** | Registrar recusa/ausência de medicamento | CP3, CP6 | Mantém o histórico completo e justifica falhas na rotina. |
| **RF19** | Registrar horário exato da administração | CP1, CP3, CP6 | Garante precisão temporal para controle de dosagens. |
| **RF20** | Registrar observações sobre medicamentos | CP3, CP4 | Campo livre que complementa o histórico com intercorrências. |
| **RF21** | Consultar histórico assistencial do idoso | CP4 | Permite visualizar a evolução dos registros clínicos anteriores. |
| **RF22** | Filtrar histórico assistencial por datas | CP4 | Facilita buscas avançadas e análise de períodos específicos. |
| **RF23** | Visualizar resumo assistencial do idoso | CP4, CP2 | Fornece uma visão consolidada (dashboard) do perfil do residente. |
| **RF24** | Registrar responsável pelo lançamento | CP1, CP6 | Associa o cuidador logado à ação, garantindo auditoria e autoria. |
| **RF25** | Registrar data e horário sistêmico do lançamento | CP1, CP3, CP6 | Mantém o controle temporal imutável, reforçando a rastreabilidade. |
| **RF26** | Validar campos de dados obrigatórios | CP6 | Padroniza os registros e impede formulários incompletos. |
| **RF27** | Exibir mensagem de feedback ao salvar | CP6 | Melhora a usabilidade confirmando visualmente as operações. |
| **RF28** | Sincronizar registros assistenciais locais | CP5, CP6 | O motor offline que permite o envio seguro dos dados em lote para o banco central. |
| **RF29** | Exibir status geral de sincronização | CP5 | Indica visualmente se o sistema está operando online ou offline. |
| **RF30** | Exibir registros pendentes de envio | CP5 | Garante transparência ao usuário sobre dados retidos localmente. |

---

## 2. Lista de Requisitos Não Funcionais (RNFs)

Os requisitos não funcionais definem as restrições, atributos de qualidade e premissas arquiteturais do sistema. Eles foram classificados com base nos atributos do modelo **URPS+** (Usability, Reliability, Performance, Supportability) e/ou **Sommerville**.

| Código | Nome do Requisito (RNF) | Descrição Técnica | Classificação (URPS+ / Sommerville) |
| :--- | :--- | :--- | :--- |
| **RNF01** | Suportabilidade em dispositivos móveis | O sistema deve operar de forma responsiva como PWA em navegadores de tablets e smartphones utilizados pela instituição. | Suportabilidade / Portabilidade |
| **RNF02** | Redução de digitação manual | A interface deve priorizar formulários *touch-based*, com botões largos e seletores visuais, minimizando o uso do teclado virtual. | Usabilidade / Usabilidade |
| **RNF03** | Linguagem compreensível | Os termos e alertas da interface devem refletir o vocabulário técnico e cotidiano utilizado pelos cuidadores do asilo. | Usabilidade / Usabilidade |
| **RNF04** | Aprendizado rápido | A navegação do sistema deve ser intuitiva, permitindo que um cuidador sem familiaridade tecnológica conclua um registro após breve treinamento. | Usabilidade / Usabilidade |
| **RNF05** | Preservação de registros offline | O sistema deve reter os dados assistenciais na memória do navegador (IndexedDB) de forma íntegra em caso de queda de rede local. | Confiabilidade / Confiabilidade |
| **RNF06** | Disponibilidade das funções essenciais | Os módulos de registro (sinais vitais, rotinas e higiene) devem estar integralmente disponíveis na ausência de conexão. | Confiabilidade / Disponibilidade |
| **RNF07** | Controle de acesso | O sistema deve segregar as visões e permissões do sistema entre perfis de Cuidador, Equipe Multidisciplinar e Gestor. | Segurança (+) / Segurança |
| **RNF08** | Rastreabilidade dos registros | Todos os registros críticos devem possuir *logs* inalteráveis de autoria e *timestamp* para auditoria técnica e resguardo legal. | Segurança (+) / Segurança |
| **RNF09** | Capacidade operacional | A base de dados local e o banco principal devem suportar o volume diário de lançamentos gerados pelos cuidadores ativos em um turno. | Desempenho / Eficiência |
| **RNF10** | Organização lógica do histórico | Os dados cronológicos de saúde devem ser dispostos de maneira padronizada, permitindo leitura rápida durante a passagem de plantão. | Usabilidade / Usabilidade |
| **RNF11** | Desempenho no registro assistencial | O tempo entre o clique de "Salvar" e a persistência local (IndexedDB) não deve ultrapassar 1 segundo. | Desempenho / Eficiência |
| **RNF12** | Desempenho no registro sem conexão | A operação da interface não deve apresentar travamentos na transição do estado *Online* para *Offline*. | Desempenho / Eficiência |
| **RNF13** | Desempenho na consulta ao histórico | A recuperação de dados no banco MySQL para listagem do histórico não deve ultrapassar 3 segundos em rede estável. | Desempenho / Eficiência |
| **RNF14** | Desempenho na filtragem do histórico | O tempo de aplicação de filtros de datas em registros já carregados deve ser instantâneo (*client-side*). | Desempenho / Eficiência |
| **RNF15** | Desempenho na sincronização | O envio de registros armazenados em lote (*Background Sync*) deve ocorrer de forma assíncrona, sem bloquear a interface de uso. | Desempenho / Eficiência |
