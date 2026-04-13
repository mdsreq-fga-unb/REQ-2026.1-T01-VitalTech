# Sprint 0 - Reunião 2 (Alinhamento)

## Ata de Reunião

* **Data:** 12 de abril de 2026 (referente ao dia anterior)
* **Contexto:** Alinhamento de Expectativas e Requisitos com o Cliente – Lar dos Velhinhos Bezerra de Menezes
* **Participantes:** Equipe de Desenvolvimento (Gustavo, Enzo, Ana, Alberto) e Marcelo (Cliente / Diretor Voluntário)

### 1. Pauta Central Discutida
A reunião teve como foco esclarecer detalhes técnicos de integração de dados, validar propostas de simplificação de telas, definir como as "ocorrências" serão tratadas no sistema e compreender as restrições e o contexto do ambiente (recursos humanos, infraestrutura e perfil das atividades da instituição).

### 2. Principais Tópicos e Decisões
* **Integração de Base de Dados:**
    * O controle atual do cliente roda em um banco de dados Microsoft Access (dados separados do aplicativo).
    * Ficou acordado que tentar integrar diretamente o aplicativo mobile ao Access seria muito trabalhoso e fora do foco do MVP.
    * **Decisão:** O cliente providenciará um servidor isolado MySQL/SQL, para o qual exportará os dados de cadastro necessários. O sistema a ser construído se comunicará via API ou conexão direta apenas com esse novo servidor.
* **Simplificação das Telas (UX):**
    * O cliente unificou alguns registros para facilitar o preenchimento: *Alimentação* foi agrupada com *Hidratação* e *Higiene*, também combinada com avaliação de *Eliminações*, pois ocorrem muitas vezes em momentos simultâneos.
    * A interface tem que exigir a menor digitação possível, consistindo principalmente de botões e *checklists*, com exceção de aferição de sinais vitais (pressão arterial, etc.) que requerem dados numéricos.
* **Registro de Ocorrências:**
    * Os cuidadores realizarão o registro de eventos anormais no sistema via *tablet*, de forma simplificada e rápida (apenas apontando qual o problema: ex. recusa de medicamento, queixas de dores contínuas ou agressividade - com a inclusão de um campo "Outros").
    * Não haverá campo para "descrição detalhada" no momento da inserção pelo cuidador para não perder tempo.
    * O detalhamento das ocorrências será feito posteriormente em um sistema paralelo ou livro administrativo por profissionais equivalentes como assistentes sociais ou administrativios.
    * O aplicativo poderá alertar a chefia de situações contínuas e recorrentes através do *Dashboard*.
* **Contexto Operacional e Recursos Humanos:**
    * Os idosos da instituição, em sua maioria, têm graus de demência comportamental ("demência 100%"), o que inviabiliza instalar tablets fixos por quarto para não sofrerem depredação/interferência. Serão distribuídos cerca de 4 ou 5 tablets ao todo na mão dos cuidadores.
    * Haverá um máximo estimado de 3 usuários usando o sistema em concorrência na primeira fase.
    * A instituição abriga cerca de 74 idosos e possui mais de 70 funcionários.
    * Apesar de possuírem conhecimento técnico formados como técnicos de enfermagem, o cargo de "tocar o dia a dia" é exclusivamente de cuidadores, por diretrizes legais do conselho e governo. O novo software vai agilizar os processos deste time.

### 3. Aspectos do Projeto e Propriedade Intelectual
* O código fonte e a documentação serão inteiramente cedidos e adaptados ao Lar dos Velhinhos Bezerra de Menezes, tornando-se uma ferramenta que eles próprios (ou outros voluntários) poderão dar manutenção futuramente.
* Como o sistema deverá permanecer como um ativo de longo prazo, a equipe buscará tecnologias e padrões intuitivos para manutenções futuras.

### 4. Próximos Passos
| Tarefa | Responsável |
| :--- | :--- |
| Criar e configurar *GitHub Pages* (e documentação MkDocs) | Alberto |
| Produção desta Ata e inclusão na documentação | Gustavo / Equipe |
| Finalizar o Documento de Visão do Produto, Viabilidade Técnica e Cronograma | Equipe |
| Preparar questões sobre a integração e *stack* com base na base SQL / Backend | Equipe |
| Agendar a próxima visita física à instituição | Equipe / Marcelo |

## Gravação
<video width="100%" controls>
  <source src="../../../assets/videos/reuniao2.mp4" type="video/mp4">
  Seu navegador não suporta a visualização deste vídeo.
</video>


---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 03/04/2026 | 1.0 | Criação do documento (Seções 1 a 2.3) para submissão da proposta. | Alberto Côrtes, João Pedro Sampaio, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 10/04/2026 | 1.1 | Finalização e correção do documento para primeira entrega (Seções 1 a 6) para submissão. | Alberto Côrtes, Ana Carolina, Enzo Menali e Gustavo Xavier |
| 12/04/2026 | 1.2 | Últimas alterações nas seções 4 a 6 e seção 10 para submissão | Alberto Côrtes, Ana Carolina, Enzo Menali e Gustavo Xavier |
