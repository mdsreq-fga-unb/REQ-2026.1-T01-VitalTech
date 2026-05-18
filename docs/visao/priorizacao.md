# 6. Matriz de Priorização

## Priorização de Requisitos e Escopo

Para garantir a entrega contínua de valor e o alinhamento com os princípios ágeis de desenvolvimento, a equipe utilizou uma abordagem mista (quantitativa e qualitativa) para priorizar o escopo do Produto Mínimo Viável (MVP) do sistema VitalTech.

## 1. Metodologia de Pontuação Técnica

Antes da alocação visual, os requisitos foram avaliados com base em três variáveis fundamentais, utilizando uma escala de Likert de 1 a 5:

* **VB (Valor de Negócio):** O impacto direto na rotina da instituição.
* **CX (Complexidade Técnica):** O nível de desafio arquitetural e lógico.
* **ES (Esforço de Implementação):** O tempo e carga de trabalho necessários.

Para representar o custo técnico real de cada item de backlog, calculamos a Pontuação Técnica (PT) através da média aritmética entre complexidade e esforço:

$$PT = \frac{CX + ES}{2}$$

Em seguida, para comparar o valor entregue versus o custo técnico, aplicamos o Índice de Prioridade (IP):

$$IP = \frac{VB}{PT}$$

**Critérios de Decisão adotados para alocação nas Sprints:**

* **IP ≥ 1,50 (Alta prioridade):** Muito valor de negócio para baixo/médio custo técnico.
* **IP entre 1,00 e 1,49 (Média prioridade):** Equilíbrio razoável entre valor e esforço.
* **IP < 1,00 (Baixa prioridade):** Pouco valor de negócio para alto custo técnico.

## 2. Matriz de Valor x Esforço

Com base nos Índices de Prioridade (IP) calculados, as funcionalidades foram distribuídas na Matriz de Priorização qualitativa. A estrutura avalia o impacto na rotina assistencial da instituição versus a complexidade técnica para a arquitetura de Prioridade sem Conexão (*Offline-First*).

![Matriz de Priorização - Valor x Impacto](../assets/pictures/matriz-priorizacao.png)

### Quadrante 1: Ganhos Rápidos (Impacto Crítico + Baixa Complexidade)

*Itens com IP ≥ 1,50. Compõem a espinha dorsal estrutural do sistema com entregas rápidas.*

* **RF01, RF01.1, RF01.2:** Autenticação, redefinição de senha e encerramento de sessão.
* **RF02.1, RF02.2, RF02.3:** Gestão de usuários do sistema.
* **RF03.1, RF03.2, RF03.3:** Gestão de residentes.
* **RF20:** Consultar medicamentos previstos.
* **RF25:** Consultar histórico assistencial do idoso (Listagem simples).
* **RF26:** Visualizar resumo assistencial do idoso.

### Quadrante 2: Entregas Essenciais (Impacto Crítico + Alta Complexidade)

*Itens com IP entre 1,00 e 1,49 com alto Valor de Negócio (VB = 4 ou 5). Reside aqui a essência do negócio e os maiores desafios de engenharia.*

* **RF04, RF06, RF07:** Formulários complexos de Sinais Vitais, Alimentação/Hidratação e Higiene/Eliminações.
* **RF08, RF09:** Motor de validação clínica e emissão de alertas.
* **RF21, RF22:** Registro de administração ou recusa de medicamentos.
* **RF30, RF31, RF32:** Módulo de Operação Sem Conexão (Motor de sincronização e interface de fila de envio).

### Quadrante 3: Tarefas Secundárias (Impacto Baixo + Baixa Complexidade)

*Itens com IP entre 1,00 e 1,49 com baixo Valor de Negócio (VB = 1 ou 2). Alocadas para o final da fila de prioridades.*

* **RF24:** Registrar observações em texto livre sobre medicamentos.
* **RF25.1:** Filtrar histórico por período de datas estendido.

### Quadrante 4: Desperdício de Tempo e Esforço (Impacto Baixo + Alta Complexidade)

*Itens com IP < 1,00.*

* **Status:** Vazio.
* **Justificativa:** Durante o refinamento ágil, o escopo foi rigorosamente analisado. Nenhuma funcionalidade de alto custo técnico e baixo valor agregado sobreviveu aos filtros do Índice de Prioridade (IP), garantindo total eficiência no uso das horas de desenvolvimento.

---

## Restrições e Elementos Encapsulados (Fora da Matriz)

Para manter a integridade do cálculo de Índice de Prioridade (IP), elementos que não constituem entregas de valor independentes foram omitidos da matriz gráfica:

1. **Requisitos Não Funcionais (RNFs):** Mapeados como Restrições Arquiteturais Globais. Não competem por prioridade, pois são premissas obrigatórias (ex: operação offline, LGPD, interface touch).
2. **Critérios de Aceitação e Sub-tarefas:** Regras de negócio (ex: "Registrar data e hora automaticamente", "Validar campos obrigatórios") foram encapsuladas dentro da Pontuação Técnica (PT) de seus Épicos correspondentes.
