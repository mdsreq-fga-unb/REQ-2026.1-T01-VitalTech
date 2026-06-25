---
name: vitaltech_feature_implementation
description: Implementação de features no projeto VitalTech com rastreabilidade aos Requisitos Funcionais, RNs e Critérios de Aceite (DoD).
---

# Diretrizes para Implementação de Features no VitalTech

Esta skill define o processo padrão que agentes devem seguir ao implementar interfaces e lógicas no projeto VitalTech. Toda nova funcionalidade deve estar firmemente ancorada na engenharia de requisitos previamente definida nas pastas `docs/visao/`.

## 1. Regras de Negócio (RNs) Clínicas e de UI
- **RN-05 (Campos Obrigatórios):** O frontend deve obrigatoriamente fazer validação no HTML (`required`) e mostrar feedback visual claro de que o campo não pode ficar vazio.
- **RN-06 (Validação e Confirmação de Intervalos Clínicos):** Antes de invocar o método de persistência na API ou no banco local, verifique se a funcionalidade exige "Confirmação Explícita" de valores anormais. Se o payload contiver valores fora dos padrões (ex: Pressão `200/120`), a interface não pode travar, mas DEVE pedir uma confirmação explícita do usuário.
- **RN-07 (Alerta Visual):** Se um usuário digitar um valor de parâmetro que saia da normalidade médica (ex: Glicemia > 600 ou Sistólica > 250), adicione lógicas reativas no Vue para exibir alertas na tela (ex: texto vermelho sob o input) *antes mesmo* do envio do formulário.

## 2. Requisitos Não Funcionais (RNFs) a serem garantidos
- **RNF03 (Poupadora de Cliques / Consistência):** O menu lateral (sidebar principal do app) NUNCA deve sumir da tela em fluxos principais. Ele permite navegação constante. Use grids visuais fáceis de tocar.
- **RNF04 (Ergonomia para Tablets):** O projeto alvo é focado nos cuidadores de asilo utilizando tablets.
  - Não crie inputs ou botões pequenos (ex: utilize botões gordinhos de `+` e `-` para inputs numéricos).
  - Distribua a tela em "Cards" grandes para leitura facilitada, evitando o formato padrão de formulários verticais infinitos.
- **RNF06 e RNF07 (Rastreabilidade e Consistência Estrutural):** Toda comunicação com `assistenciaService.js` deve passar e persistir dados do responsável `responsavelId` e registrar data/hora precisas (`registradoEm`).

## 3. Workflow de Desenvolvimento Vue.js no Projeto
- O projeto usa `Vue 3` com `<script setup>` (Composition API). Use `ref` e `reactive`.
- Separe componentes inteligentemente.
- Ao atualizar bibliotecas, cuidado com artefatos grandes indesejados (`package-lock.json` incorreto).

## 4. Definition of Done (DoD)
- Todas as histórias de usuário (US) possuem Critérios de Aceite (CA). Ex: CA04.1, CA04.2.
- O Agente DEVE ler a US fornecida e garantir visualmente e logicamente que os CAs estão implementados.
- Testes unitários (em `services.test.js`) devem ser mantidos corretos.
