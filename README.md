# VitalTech

## Sobre o Projeto
O **VitalTech** é uma aplicação tecnológica focada no registro primário estruturado dos sinais vitais e nas rotinas diárias de atendimento à saúde de idosos. Desenvolvido para o **Lar dos Velhinhos Bezerra de Menezes**, o sistema visa substituir as pranchetas e prontuários preenchidos em papel, trazendo mais rastreabilidade, mitigando erros operacionais e oferecendo maior agilidade para aos cuidadores "na beira do leito".

Para adaptar-se à infraestrutura restrita do asilo, a solução opera como um **Progressive Web App (PWA) Offline-First**, garantindo a sincronização assíncrona do registro através de uma API em Backend **FastAPI/Python** e um banco de dados **MySQL** hospedados localmente.

---

## A Disciplina
Este repositório consolida todo o trabalho, a evolução e as entregas da disciplina de **Requisitos de Software (REQ)** — Turma 01, semestre **2026.1**. O propósito do projeto é aplicar os conceitos de Engenharia de Software focados em entender e modelar as necessidades de um problema de mercado real. 
Durante a sua execução, a equipe explora técnicas de Elicitação, Descobrimento, Análise, Declaração, Representação e Validação de Requisitos.

---

## A Equipe

<div align="center">

| <img src="https://github.com/oalbertocavalcante.png" width="130px;" alt=""/> | <img src="https://github.com/iicaroll.png" width="130px;" alt=""/> | <img src="https://github.com/menali17.png" width="130px;" alt=""/> | <img src="https://github.com/guxvr.png" width="130px;" alt=""/> | <img src="https://github.com/jopesmp.png" width="130px;" alt=""/> |
| :---: | :---: | :---: | :---: | :---: |
| **Alberto Côrtes** <br>*232014610* | **Ana Caroline** <br>*241025908* | **Enzo** <br>*241011054* | **Gustavo** <br>*241025247* | **João Pedro** <br>*211039528* |

</div>

---

##  Repositório e Documentação
A cobertura completa das Sprints, reuniões, elicitação, User Stories e a detalhada do Produto/Projeto está publicada utilizando o [MkDocs Material](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-VitalTech/).

---

## Backend Mock (json-server)
Durante o desenvolvimento, usamos um backend mock para não bloquear o frontend enquanto a API FastAPI nao esta pronta.

### Subir o mock
1. Acesse a pasta: `app/backend`
2. Instale as dependencias: `npm install`
3. Suba o servidor mock: `npm run mock`

O mock roda por padrao em `http://localhost:3001`.

### Credenciais de teste
- Gestor: login `gestor`, senha `123456`
- Cuidador: login `cuidador`, senha `123456`

---

## Padrao de Commits
Usamos Conventional Commits (formato curto e direto):

- `feat: ...` nova funcionalidade
- `fix: ...` correcao de bug
- `docs: ...` documentacao
- `style: ...` ajustes visuais/formatacao (sem mudar logica)
- `refactor: ...` refatoracao sem alterar comportamento
- `test: ...` testes
- `chore: ...` tarefas de manutencao

Exemplo: `feat: adicionar validacao de login`

---

## Convencao de Branches
Padrao sugerido: `<tipo>/<id>-<descricao-curta>`

- `feature/us08-login`
- `feature/us10-usuarios`
- `fix/bug-token-expirado`
- `docs/atualizar-readme`
- `chore/ajustar-lint`

---

## Checklist de Permissao por Perfil
Baseado nas user stories:

- US08 (login): ambos os perfis conseguem autenticar com credenciais validas.
- US09 (logout): ambos os perfis encerram sessao e voltam para a tela de login.
- US10 (cadastro de usuarios): apenas Gestor pode acessar e cadastrar; Cuidador nao enxerga menu e nao acessa via URL direta.
- US01 (cadastro de residentes): Gestor e Cuidador podem cadastrar e listar residentes.

Checklist por perfil:

Gestor
- Consegue fazer login (credenciais validas).
- Entra na lista de usuarios e ve botao de cadastro.
- Cadastra usuario novo com sucesso.
- Acessa lista e formulario de residentes.
- Encerra sessao e perde acesso as rotas protegidas.

Cuidador
- Consegue fazer login (credenciais validas).
- Nao ve menu de usuarios.
- Nao acessa lista/formulario de usuarios nem por URL direta.
- Acessa lista e formulario de residentes.
- Encerra sessao e perde acesso as rotas protegidas.
