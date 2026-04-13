# Sprint 0 - Reunião 3 (Alinhamento com Monitor)

## Ata de Reunião

* **Data:** 9 de abril de 2026
* **Contexto:** Alinhamento de Processos, Metodologias e Dúvidas Gerais da Disciplina
* **Participantes:** Equipe de Desenvolvimento (Gustavo, Enzo, Ana, Alberto, João Pedro) e Ian (Monitor da Disciplina)

### 1. Pauta Central Discutida
A reunião teve como principal objetivo conversar com o monitor Ian sobre o processo de desenvolvimento que a equipe deve adotar, melhores práticas para garantir uma boa avaliação na disciplina, e sanar dúvidas relacionadas às restrições do cliente e das entregas (como a Unidade 1, deploy da documentação, etc.).

### 2. Principais Tópicos e Decisões

* **Abordagem e Metodologia de Desenvolvimento:**
    * A equipe estava em dúvida entre ScrumXP e ScrumFDD.
    * O monitor recomendou fortemente um processo focado em **Scrum/XP (ou Scrumban)**, visto que o FDD puxa para uma complexidade documental que pode ser pesada e redundante para o projeto.
    * A organização através de Épicos, Temas e Histórias de Usuário (aplicando critérios INVEST) no próprio *GitHub Projects* foi citada como a melhor opção.
    * **Decisão:** Sprints preferencialmente de 2 semanas, com adaptação das *Dailys* de modo assíncrono ou reduzindo a frequência semanal, adaptando-se às limitações de horários da equipe. 

* **Rastreabilidade e Avaliação da Disciplina:**
    * Um dos focos primordiais para a nota será a **rastreabilidade**. A documentação de wireframes, gravações das reuniões e o histórico de commits/issues fechadas no GitHub (com datas preservadas) são as melhores evidências.
    * O professor é rigoroso quanto à proibição de links externos: tudo deve estar auto-contido no GitHub Pages do grupo. Se os vídeos das atas ultrapassarem o limite de tamanho do GitHub (50MB - 100MB), devem ser reduzidos de qualidade/compactados em vez de serem hospedados via YouTube ou links externos.

* **Dúvidas sobre Tecnologias e Deploy:**
    * **Banco de Dados:** PostgreSQL foi mencionado pelo monitor como favorável e gratuito, geralmente operado via ORMs. A escolha final depende da equipe.
    * **Integração com o Servidor Local do Cliente:** Ian alertou sobre os riscos e as complicações de fazer integração direta. Recomendou modelar o produto de forma independente no MVP (fazer o deploy em plataformas como Vercel, Fly.io, Heroku) e focar na funcionalidade. Depois, se sobrar espaço e tempo, pensa-se numa API robusta pra comunicação com o *backend* do cliente.
    * **Frontend/Visualização:** Uma "Web App" com alta responsividade para celular/tablet atende os requisitos do projeto perfeitamente (mais fácil e prático que fazer focado 100% nativo mobile se faltar tempo).

* **Alinhamento da Primeira Entrega (Unidade 1):**
    * Englobará as seções de: Visão do Produto, Cronograma e Estratégias de Engenharia de Software.
    * Apresentar o *GitHub Pages* finalizado ou slides com esse mesmo conteúdo já atende o requisito do professor para essa apresentação inicial.

### 3. Próximos Passos

| Tarefa | Responsável |
| :--- | :--- |
| Configurar Deploy Inicial do **MkDocs** no GitHub Pages | Gustavo |
| Elaborar o conteúdo do **Documento de Visão do Produto** | Equipe |
| Determinar a seção de **Cronograma** e **Estratégias de Eng. de Software** | Equipe |
| Validar e Revisar todas as escritas no repósitorio e realizar o último pente fino | Equipe |

## Gravação
<video width="100%" controls>
  <source src="../../../assets/videos/reuniao3.mp4" type="video/mp4">
  Seu navegador não suporta a visualização deste vídeo.
</video>


---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 03/04/2026 | 1.0 | Criação do documento (Seções 1 a 2.3) para submissão da proposta. | Alberto Côrtes, João Pedro Sampaio, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 10/04/2026 | 1.1 | Finalização e correção do documento para primeira entrega (Seções 1 a 6) para submissão. | Alberto Côrtes, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 12/04/2026 | 1.2 | Últimas alterações nas seções 4 a 6 e seção 10 para submissão | Alberto Côrtes, Ana Carolina, Enzo Menali e Gustavo Xavier |
