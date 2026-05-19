# Definition of Ready e Definition of Done — VitalTech

Este documento define os critérios acordados pela equipe para determinar quando uma User Story está **pronta para entrar em sprint** (DoR) e quando está **concluída** (DoD).

---

## Definition of Ready (DoR)

Uma User Story só pode ser incluída em uma sprint quando **todos** os critérios abaixo forem cumpridos:

### 1. Formato e Escrita
- [ ] A US está escrita no formato: *"Como [persona], quero [ação], para que [benefício]"*
- [ ] A persona está corretamente identificada (Gestor, Cuidador ou Membro da equipe multidisciplinar)

### 2. Critérios de Aceitação
- [ ] Pelo menos um critério de aceitação está definido no formato: *"Dado [contexto], quando [ação], então [resultado esperado]"*
- [ ] Os critérios de aceitação são objetivamente verificáveis (não subjetivos)
- [ ] Cenários de erro ou exceção relevantes foram mapeados nos critérios de aceitação

### 3. Critério INVEST
- [ ] **I — Independent:** a US pode ser desenvolvida sem bloquear ou ser bloqueada por outra (ou a dependência foi documentada e resolvida)
- [ ] **N — Negotiable:** o escopo da US ainda pode ser ajustado com o cliente se necessário
- [ ] **V — Valuable:** a US entrega valor claro e direto a uma das personas definidas
- [ ] **E — Estimable:** a equipe consegue estimar o esforço necessário para desenvolvê-la
- [ ] **S — Small:** a US cabe em uma sprint sem precisar ser dividida
- [ ] **T — Testable:** os critérios de aceitação permitem verificar objetivamente se a US foi entregue

### 4. Estimativa
- [ ] A US foi estimada pela equipe (via critérios da Matriz de Priorização)
- [ ] A estimativa é compatível com a capacidade da sprint

### 5. Clareza e Dependências
- [ ] A equipe não tem dúvidas abertas sobre o escopo da US
- [ ] Dependências com outras USs foram identificadas e registradas
- [ ] Não há dependências bloqueantes sem resolução

### 6. Artefatos de Apoio (quando aplicável)
- [ ] Protótipo ou wireframe da funcionalidade está disponível
- [ ] Regras de negócio relacionadas à US foram verificadas (RN-01 a RN-04)

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
