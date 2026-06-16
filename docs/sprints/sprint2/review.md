# Sprint 2 - Review

## Ata de Reunião

- **Data:** 01/06/2026 (Segunda-feira)
- **Participantes:** Alberto Côrtes, Ana Caroline Dantas, Enzo Menali (Product Owner), Gustavo Xavier, João Pedro Sampaio
- **Formato:** Reunião remota via Teams

---

## Entregas Apresentadas

### US08 e US09 — Autenticação e Encerramento de Sessão

Alberto apresentou o fluxo completo de autenticação. A tela de login foi demonstrada com três cenários: login com credenciais válidas de gestor, login com credenciais inválidas e acesso direto a uma rota protegida sem estar autenticado. Em todos os casos o comportamento estava conforme o critério de aceite documentado. O logout foi demonstrado limpando a sessão e redirecionando para a tela de login.

### US01 e US10 — Cadastro de Residente e de Usuário

Ana Caroline apresentou o formulário de cadastro com as duas abas (Novo Residente e Novo Usuário). O fluxo de preenchimento, validação de campos obrigatórios e confirmação após o envio foram demonstrados. O PO validou que o formulário cobria os dados mínimos necessários para o funcionamento da ILPI.

### Backend Mock

O PO apresentou o servidor json-server configurado com os endpoints de autenticação (`/auth/login` e `/auth/logout`) e as coleções de dados (`/usuarios` e `/residentes`). Demonstrou o funcionamento da autenticação online e confirmou que os dados de cadastro chegavam ao servidor quando ele estava rodando.

### Proteção de rotas e permissões por perfil

Foi demonstrado que usuários com perfil Cuidador não conseguem acessar o menu de Gestão de Usuários, e que usuários não autenticados são redirecionados para o login ao tentar acessar qualquer rota interna.

---

## Verificação e Validação (V/V) — Review

Esta seção registra as atividades de verificação e validação conduzidas durante a Review da Sprint 2.

### Verificação — Checklist de critérios de aceite

O grupo percorreu item a item os critérios de aceite definidos no planejamento. O resultado foi o seguinte:

| Critério de aceite | Resultado |
|--------------------|-----------|
| Projeto Vue.js/PWA configurado para a Sprint 2 | Verificado |
| Rotas principais estruturadas | Verificado |
| Tela de login implementada | Verificado |
| Login válido redireciona para área interna | Verificado |
| Login inválido exibe mensagem de erro genérica | Verificado |
| Usuário não autenticado não acessa rotas protegidas | Verificado |
| Perfil e permissões disponíveis nas telas internas | Verificado |
| Logout encerra sessão e redireciona para login | Verificado |
| Dados da sessão anterior não permanecem após logout | Verificado |
| Timeout de sessão de 15 minutos implementado | Verificado |
| Fluxo integrado ao authService da Dupla B | Verificado |

Todos os critérios foram verificados durante a demonstração ao vivo.

### Validação — Feedback do Product Owner

Enzo Menali, atuando como PO, validou as entregas com base no valor percebido para o usuário final (gestor e cuidador da ILPI):

- O fluxo de login foi considerado adequado para o perfil dos usuários da instituição, que não são especialistas em tecnologia.
- O formulário de cadastro de residente foi aprovado com uma observação: seria interessante, em sprints futuras, adicionar um campo de observações clínicas iniciais.
- A restrição de acesso por perfil foi considerada essencial e foi validada como funcionando corretamente.

### Verificação — Testes de serviços

A suíte de testes unitários foi executada ao vivo durante a review e apresentou 6/6 testes passando, cobrindo autenticação, criação de usuários e residentes, rejeição de campos inválidos e logout. Essa atividade constitui uma verificação técnica da implementação — os desenvolvedores confirmam que o código funciona conforme especificado — e não uma validação, que é realizada pelo cliente ou PO com base no valor percebido (registrada na seção anterior). Os resultados foram registrados no PR #43.

---

## Verificação Técnica Posterior à Review

O resultado de 6/6 testes acima representa o estado demonstrado durante a reunião de Review. Após o merge do PR #43, revisões técnicas posteriores ampliaram a suíte e corrigiram problemas de integração não identificados na demonstração original.

Na branch `fix/integracao-sprint2`, foram verificados:

- cadastro e autenticação de um usuário com perfil Equipe;
- preservação do ID local durante a reconciliação com o backend;
- importação de usuários e residentes remotos para o IndexedDB;
- rejeição de login e CPF duplicados no backend;
- build de produção do frontend.

Ao final dessa verificação, a suíte apresentou **21/21 testes passando**.

---

## Itens que ficam para a próxima sprint

- Componente de toast/snackbar reutilizável extraído do NovoCadastro
- Ajuste de touch targets de 44px para tablets (RNF04)
- Sincronização offline completa com resolução de conflitos

---

## Evidência da Reunião

Não há gravação da Review da Sprint 2 versionada no repositório. A evidência disponível é a ata textual registrada nesta página.

---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
|------|--------|-----------|-------|
| 14/06/2026 | 1.0 | Registro da ata de Review da Sprint 2 com atividades de V/V | Alberto Côrtes |
| 14/06/2026 | 1.1 | Correção da classificação dos testes unitários de Validação para Verificação, conforme feedback do monitor. | Alberto Côrtes |
| 15/06/2026 | 1.2 | Correção do dia da reunião, registro da verificação técnica posterior e remoção de referência a gravação inexistente. | Enzo Menali |
