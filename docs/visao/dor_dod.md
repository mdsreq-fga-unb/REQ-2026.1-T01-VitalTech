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



Uma User Story será considerada **concluída** quando todos os critérios aplicáveis abaixo forem atendidos.



---



### 1. Atendimento da User Story



- [ ] A funcionalidade entregue corresponde ao objetivo descrito na User Story.

- [ ] A persona definida na User Story consegue realizar a ação proposta no ambiente de teste, validação ou homologação definido pela equipe.

- [ ] O benefício esperado da User Story foi contemplado na solução.

- [ ] O escopo entregue está de acordo com o que foi definido para a história, sem incluir funcionalidades não planejadas.



---



### 2. Critérios de Aceitação



- [ ] Todos os critérios de aceitação da User Story foram atendidos.

- [ ] Os cenários descritos no formato **Dado / Quando / Então** foram verificados.

- [ ] Cenários de erro, exceção ou validação de campos foram testados quando aplicáveis.

- [ ] Não há critérios de aceitação pendentes, ambíguos ou não verificados.



---



### 3. Regras de Negócio e Requisitos



- [ ] As Regras de Negócio relacionadas à User Story foram respeitadas.

- [ ] Os Requisitos Funcionais associados à User Story foram contemplados.

- [ ] Os Requisitos Não Funcionais aplicáveis foram considerados.

- [ ] Aspectos transversais do projeto, como segurança, rastreabilidade, usabilidade, integridade dos dados, operação offline, sincronização e desempenho, foram avaliados quando aplicáveis à User Story.



---



### 4. Qualidade da Solução



- [ ] A funcionalidade apresenta comportamento consistente com as demais partes do sistema.

- [ ] As mensagens exibidas ao usuário são claras e compatíveis com o vocabulário da instituição.

- [ ] A interface, quando aplicável, está adequada ao uso em tablets e dispositivos móveis.

- [ ] A funcionalidade não compromete dados já existentes nem interfere negativamente em histórias já entregues.

- [ ] Códigos temporários, comentários desnecessários e logs de depuração foram removidos quando aplicável.



---



### 5. Validação e Testes



- [ ] A User Story foi validada pela equipe com base nos critérios de aceitação.

- [ ] Foram realizados testes automatizados, testes manuais ou inspeções suficientes, conforme a natureza da User Story.

- [ ] Os principais fluxos da funcionalidade foram verificados.

- [ ] Cenários alternativos ou de erro foram verificados quando aplicáveis.

- [ ] Quando a User Story envolver registro em contexto de instabilidade de rede, a funcionalidade foi verificada considerando preservação local dos dados e posterior sincronização.

- [ ] Falhas ou inconsistências encontradas foram corrigidas ou registradas para tratamento posterior.



---



### 6. Rastreabilidade e Documentação



- [ ] A User Story permanece rastreável aos requisitos, critérios de aceitação e características de produto associadas.

- [ ] A documentação relacionada foi atualizada quando necessário.

- [ ] O Story Map, a Matriz de Priorização ou demais artefatos foram atualizados caso a entrega tenha alterado escopo, prioridade ou sprint.

- [ ] Evidências da validação foram registradas quando aplicável, como prints, anotações, links, comentários ou atas.



---



### 7. Revisão da Equipe



- [ ] A entrega foi revisada por pelo menos outro membro da equipe.

- [ ] Caso exista código implementado, a alteração passou por revisão via Pull Request antes de ser incorporada à branch definida pela equipe.

- [ ] Não existem conflitos pendentes na branch de desenvolvimento utilizada pela equipe.

- [ ] A equipe concorda que a User Story atende ao que foi definido.

- [ ] Caso existam melhorias futuras identificadas durante a revisão, elas foram registradas como novos itens ou ajustes posteriores.



---



## Resumo do DoD



Uma User Story será considerada **Done** quando atender aos critérios de aceitação, respeitar regras de negócio e requisitos associados, tiver sido validada pela equipe, não introduzir impactos negativos em funcionalidades já existentes, estiver documentada quando necessário e tiver sido revisada antes de ser considerada concluída.

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 17/05/2026 | 1.0 | Criação do documento com o DoR definido para o projeto VitalTech. | Gustavo Xavier |
| 18/05/2026 | 1.1 | Criação do documento com o DoR definido para o projeto VitalTech. | Enzo Menali |
