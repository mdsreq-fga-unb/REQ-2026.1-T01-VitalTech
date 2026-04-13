# Sprint 0 - Reunião 1 (Elicitação)

## Ata de Reunião

* **Data:** 4 de abril de 2026
* **Contexto:** Alinhamento de Requisitos – Lar dos Velhinhos Bezerra de Menezes
* **Analista Responsável:** Analista de Requisitos Sênior

### 1. Pauta Central Discutida
A substituição do registro manual (papel/planilhas) por um sistema digital de monitoramento em tempo real para o cuidado de 74 idosos. O objetivo é permitir que a gestão e a equipe técnica (médicos, fisioterapeutas, nutricionistas) antecipem problemas de saúde através de dados coletados via tablets pelos cuidadores.

### 2. Principais Decisões Tomadas
* **Plataforma de Coleta:** O sistema será focado em dispositivos móveis (tablets) para uso em campo pelos cuidadores.
* **Experiência do Usuário (UX):** A interface deve ser extremamente simplificada, priorizando botões de seleção e marcação (checklists), reduzindo ao máximo a necessidade de digitação.
* **Funcionalidades de Monitoramento:**
    * **Sinais Vitais:** Registro de pressão arterial, temperatura, frequência cardíaca e glicemia.
    * **Cuidados Diários:** Controle de hidratação (5x ao dia), aceitação alimentar, higiene oral e verificação de pele.
    * **Eliminações:** Registro de evacuação (tipo/aspecto) e urina durante a troca de fraldas.
* **Infraestrutura:** O servidor será local, utilizando a rede Wi-Fi da instituição. Serão utilizados bancos de dados relacionais (SQL) para armazenamento.
* **Visualização:** O sistema deve permitir que os dados alimentem um Dashboard em monitores/TVs em pontos estratégicos da instituição.
* **Público-Alvo:** O foco do app são os cuidadores de idosos (que possuem perfil de técnicos de enfermagem, mas atuam como cuidadores).

### 3. Incertezas ou Bloqueios
* **Integração de Dados:** Resta definir como o novo sistema irá se comunicar com o banco de dados atual (MS Access/SQL) para reaproveitar o cadastro existente de idosos e funcionários.
* **Sincronização Offline:** Necessidade de validar se o app precisa funcionar offline caso haja pontos cegos no Wi-Fi da instituição.
* **Níveis de Acesso:** Não foi detalhada a matriz de permissões (quem pode apenas visualizar vs. quem pode editar dados sensíveis).
* **Escopo de Hardware:** O cliente ainda irá definir a quantidade exata de tablets que serão distribuídos.

### 4. Próximos Passos (Tarefas Atribuídas)

| Tarefa | Responsável |
| :--- | :--- |
| Enviar documento com lista completa de campos e protótipo inicial de telas | Marcelo (Cliente) |
| Elaborar Documento de Visão do Produto (Sessões 1 a 3) | Equipe de Desenvolvimento |
| Definir Stack Tecnológica (Frontend/Backend/API) | Equipe de Desenvolvimento |
| Definir Abordagem de Processo (Dirigido por Plano, Ágil ou Híbrido) | Equipe de Desenvolvimento |

## Gravação
<video width="100%" controls>
  <source src="../../../assets/videos/reuniao1.mp4" type="video/mp4">
  Seu navegador não suporta a visualização deste vídeo.
</video>
