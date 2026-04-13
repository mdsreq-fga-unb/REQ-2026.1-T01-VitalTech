# 7. Lições Aprendidas

Nesta seção, serão registradas as lições aprendidas durante as retrospectivas de cada unidade (ou Sprint). O objetivo é evidenciar as ações de melhoria tomadas e documentar as dificuldades encontradas ao longo do projeto.

---

## 7.1 Unidade 1

Durante a execução da Fase de Planejamento (Sprint 0) e o início das atividades de concepção do sistema VitalTech, a equipe realizou reuniões estratégicas com o cliente (Diretor Marcelo Souza) para o profundo entendimento do problema. Abaixo, registramos as principais dificuldades enfrentadas, as soluções aplicadas e as lições que guiarão o processo de desenvolvimento e colaboração nas próximas etapas.

### Dificuldades e Superação

* **Gestão de Escopo e Rastreabilidade:** Inicialmente, o projeto propunha uma otimização genérica de "processos operacionais da instituição", tornando o escopo excessivamente amplo e com alto risco de inviabilidade. Ao utilizarmos o Diagrama de Ishikawa, identificamos a causa raiz e reduzimos o escopo para focar exclusivamente na eliminação do papel na beira do leito.
* **Adaptação Tecnológica e Arquitetural:** A equipe assumiu precocemente o uso de React Native para dispositivos móveis. Após análise das restrições de infraestrutura do Lar (servidor local e necessidade de baixa manutenção), migramos para uma arquitetura PWA com backend em Python (FastAPI) e banco MySQL, eliminando a dependência de ambientes de compilação pesados.
* **Elicitação com Cliente Real:** Conciliar a coleta de requisitos técnicos com a agenda limitada de um diretor voluntário foi um desafio. Adotamos a gravação de chamadas (Google Meet) para extração de requisitos offline e o WhatsApp para validações rápidas e assíncronas, com foco em uma interface click-based adequada à rotina exaustiva dos cuidadores.
* **Gestão de Tempo e Dinâmica da Equipe:** Identificamos gargalos técnicos e falta de engajamento inicial que ameaçaram o cronograma. A equipe implementou status reports diários via WhatsApp e redistribuiu papéis conforme a afinidade técnica de cada membro.

### Ações de Melhoria

* **Rigor no Escopo:** Aplicar o Diagrama de Ishikawa desde o início para garantir que qualquer nova funcionalidade proposta seja rastreada até uma dor real do cliente, evitando o crescimento não controlado do escopo.
* **Validação Tecnológica Prévia:** Antes de assumir uma stack, analisar as restrições operacionais do cliente (infraestrutura, manutenção, perfil de usuários) para garantir que a solução seja sustentável no longo prazo.
* **Protocolo de Elicitação Assíncrona:** Manter a gravação de reuniões e a validação por protótipos de baixa fidelidade como práticas padrão, reduzindo o retrabalho por mal-entendidos com o cliente.
* **Transparência e Redistribuição de Papéis:** Mapear as habilidades de cada membro no início de cada Sprint e manter a comunicação transparente sobre impedimentos para proteger a saúde da equipe e a qualidade das entregas.

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 03/04/2026 | 1.0 | Criação do documento (Seções 1 a 2.3) para submissão da proposta. | Alberto Côrtes, João Pedro Sampaio, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 10/04/2026 | 1.1 | Finalização e correção do documento para primeira entrega (Seções 1 a 6) para submissão. | Alberto Côrtes, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 12/04/2026 | 1.2 | Últimas alterações nas seções 4 a 6 e seção 10 para submissão | Alberto Côrtes, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 13/04/2026 | 1.3 | Lançamento dessa seção no GitPages | Gustavo Xavier |
