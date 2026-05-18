# Definition of Ready e Definition of Done — VitalTech

Este documento estabelece os critérios acordados pela equipe do projeto **VitalTech** para determinar quando uma User Story está **pronta para entrar em sprint** (Definition of Ready — DoR) e quando uma funcionalidade pode ser considerada **concluída** (Definition of Done — DoD).

A adoção desses critérios busca garantir alinhamento entre os integrantes da equipe, qualidade nas entregas, rastreabilidade das funcionalidades e previsibilidade no desenvolvimento do sistema.

---

## Definition of Ready (DoR)

Uma User Story só poderá ser incluída em uma sprint quando **todos** os critérios abaixo forem atendidos.

O objetivo do DoR é garantir que a equipe compreenda completamente a funcionalidade antes do início do desenvolvimento, reduzindo ambiguidades, retrabalho e riscos durante a sprint.

---

### 1. Formato e Escrita da User Story

#### Objetivo
Garantir que a User Story esteja descrita de forma padronizada, compreensível e orientada ao valor entregue ao usuário.

#### Critérios

- [ ] A User Story está escrita no formato:  
*"Como [persona], quero [ação], para que [benefício]"*

- [ ] A persona foi corretamente identificada:
  - Gestor;
  - Cuidador;
  - Membro da equipe multidisciplinar.

- [ ] O benefício descrito representa valor real para o fluxo assistencial, operacional ou administrativo da instituição.

- [ ] A descrição da User Story está clara, objetiva e sem ambiguidades.

---

### 2. Critérios de Aceitação

#### Objetivo
Garantir que a funcionalidade possa ser validada objetivamente após sua implementação.

#### Critérios

- [ ] Pelo menos um critério de aceitação foi definido utilizando o formato:  
*"Dado [contexto], quando [ação], então [resultado esperado]"*

- [ ] Os critérios de aceitação são objetivos, verificáveis e mensuráveis.

- [ ] Os critérios cobrem o comportamento esperado da funcionalidade principal.

- [ ] Cenários de erro, exceção ou comportamento inválido relevantes foram identificados e descritos.

- [ ] Os critérios de aceitação permitem validar completamente se a User Story foi concluída.

---

### 3. Critério INVEST

#### Objetivo
Garantir que a User Story possua características adequadas para desenvolvimento ágil.

#### Critérios

- [ ] **I — Independent:** a User Story pode ser desenvolvida sem depender diretamente da conclusão de outra US, ou suas dependências foram devidamente documentadas e resolvidas.

- [ ] **N — Negotiable:** o escopo ainda permite ajustes e refinamentos em conjunto com o cliente e a equipe.

- [ ] **V — Valuable:** a User Story entrega valor claro para pelo menos uma das personas do sistema.

- [ ] **E — Estimable:** a equipe consegue compreender suficientemente a funcionalidade para estimar seu esforço.

- [ ] **S — Small:** a User Story possui tamanho compatível com uma sprint e não necessita ser fragmentada.

- [ ] **T — Testable:** os critérios de aceitação permitem validar objetivamente a implementação da funcionalidade.

---

### 4. Estimativa

#### Objetivo
Garantir previsibilidade e equilíbrio da capacidade da sprint.

#### Critérios

- [ ] A User Story foi estimada pela equipe.

- [ ] A estimativa foi realizada considerando:
  - complexidade técnica;
  - impacto no produto;
  - dependências;
  - esforço de implementação.

- [ ] A estimativa está compatível com a capacidade planejada da sprint.

- [ ] A priorização da US está alinhada com a Matriz de Priorização do projeto.

---

### 5. Clareza, Escopo e Dependências

#### Objetivo
Garantir que a equipe compreenda completamente o escopo antes do desenvolvimento.

#### Critérios

- [ ] Não existem dúvidas abertas relevantes sobre a funcionalidade.

- [ ] O escopo da User Story foi compreendido por toda a equipe.

- [ ] Dependências técnicas ou funcionais foram identificadas e registradas.

- [ ] Não existem dependências bloqueantes sem definição ou resolução.

- [ ] Regras de negócio associadas à User Story foram identificadas.

---

### 6. Artefatos de Apoio

#### Objetivo
Garantir que os materiais necessários para implementação estejam disponíveis.

#### Critérios

- [ ] Protótipo, wireframe ou referência visual da funcionalidade está disponível (quando aplicável).

- [ ] Regras de negócio relacionadas à funcionalidade foram verificadas.

- [ ] Fluxos de navegação relevantes estão definidos.

- [ ] Campos obrigatórios, validações e mensagens esperadas foram identificados.

---

## Definition of Done (DoD)

Uma User Story será considerada concluída apenas quando **todos** os critérios abaixo forem atendidos.

O objetivo do DoD é garantir que as funcionalidades entregues possuam qualidade técnica, funcional e documental suficiente para utilização pela equipe assistencial do sistema VitalTech.

---

### 1. Implementação da Funcionalidade

#### Objetivo
Garantir que a funcionalidade planejada foi completamente implementada.

#### Critérios

- [ ] Todos os critérios de aceitação da User Story foram atendidos.

- [ ] A funcionalidade implementada corresponde ao escopo aprovado.

- [ ] O fluxo principal da funcionalidade opera corretamente.

- [ ] Cenários de exceção previstos foram tratados adequadamente.

- [ ] Não existem falhas críticas conhecidas relacionadas à funcionalidade.

---

### 2. Interface e Experiência do Usuário

#### Objetivo
Garantir consistência visual e usabilidade da aplicação.

#### Critérios

- [ ] A interface foi implementada conforme o protótipo definido.

- [ ] Componentes visuais apresentam comportamento consistente.

- [ ] Mensagens de erro, alerta e confirmação estão funcionando corretamente.

- [ ] Navegação entre telas funciona adequadamente.

- [ ] A funcionalidade é utilizável em dispositivos móveis.

---

### 3. Validação e Integridade dos Dados

#### Objetivo
Garantir confiabilidade dos registros assistenciais.

#### Critérios

- [ ] Campos obrigatórios possuem validação adequada.

- [ ] Valores inválidos são tratados corretamente pelo sistema.

- [ ] Dados persistidos mantêm integridade e consistência.

- [ ] Registros de data e horário estão corretos.

- [ ] Informações do usuário responsável pelo lançamento foram registradas corretamente.

---

### 4. Testes

#### Objetivo
Garantir estabilidade e funcionamento adequado da funcionalidade.

#### Critérios

- [ ] Testes manuais da funcionalidade foram realizados.

- [ ] Fluxos principais e alternativos foram validados.

- [ ] Não existem erros críticos durante execução.

- [ ] Integrações com backend e banco de dados foram verificadas.

- [ ] Correções identificadas durante os testes foram aplicadas.

---

### 5. Sincronização e Operação Offline

#### Objetivo
Garantir funcionamento adequado em cenários de conectividade limitada.

#### Critérios

- [ ] Funcionalidades offline foram testadas (quando aplicável).

- [ ] Registros locais são armazenados corretamente sem conexão.

- [ ] Sincronização automática funciona após reconexão.

- [ ] Status de sincronização é exibido corretamente ao usuário.

- [ ] Registros pendentes de sincronização são identificados adequadamente.

---

### 6. Segurança e Rastreabilidade

#### Objetivo
Garantir controle e rastreabilidade das operações do sistema.

#### Critérios

- [ ] A autenticação da funcionalidade foi validada.

- [ ] O controle de sessão funciona corretamente.

- [ ] Apenas usuários autorizados conseguem acessar a funcionalidade.

- [ ] As ações realizadas podem ser rastreadas pelo sistema.

- [ ] Logs ou registros necessários foram armazenados corretamente.

---

### 7. Revisão e Qualidade

#### Objetivo
Garantir conformidade técnica e alinhamento da entrega.

#### Critérios

- [ ] A funcionalidade foi revisada por pelo menos um integrante da equipe.

- [ ] O código está organizado e compreensível.

- [ ] Não existem conflitos conhecidos com outras funcionalidades.

- [ ] A implementação segue os padrões definidos pela equipe.

---

### 8. Documentação e Gerenciamento

#### Objetivo
Garantir atualização dos artefatos do projeto.

#### Critérios

- [ ] A User Story foi atualizada no backlog.

- [ ] Documentações relacionadas foram atualizadas, quando necessário.

- [ ] Alterações relevantes foram registradas no repositório.

- [ ] O status da User Story foi atualizado corretamente na ferramenta de gerenciamento.

- [ ] A funcionalidade foi validada e aceita pela equipe responsável.

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 17/05/2026 | 1.0 | Criação inicial do documento contendo a Definition of Ready (DoR) do projeto VitalTech. | Gustavo Xavier |
| 18/05/2026 | 2.0 | Expansão e refinamento da Definition of Ready (DoR) e criação da Definition of Done (DoD) do projeto VitalTech. | João Pedro S. Maciel |
