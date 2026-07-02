# VitalTech

## Sobre o Projeto
O **VitalTech** é uma aplicação tecnológica focada no registro primário estruturado dos sinais vitais e nas rotinas diárias de atendimento à saúde de idosos. Desenvolvido para o **Lar dos Velhinhos Bezerra de Menezes**, o sistema visa substituir as pranchetas e prontuários preenchidos em papel, trazendo mais rastreabilidade, mitigando erros operacionais e oferecendo maior agilidade para os cuidadores "na beira do leito".

Para adaptar-se à infraestrutura restrita da instituição, a solução foi estruturada como um **Progressive Web App (PWA)** com suporte à persistência local no navegador. Na entrega acadêmica, o sistema conta com frontend publicado na **Vercel**, API de homologação em **FastAPI/Python** no **Fly.io**, banco **MySQL** no **Railway** e backend mock local para desenvolvimento e testes. Para adoção institucional, a arquitetura permanece compatível com implantação local/on-premise, reduzindo dependência de serviços externos e preservando dados sensíveis na infraestrutura da organização.

---

## Arquitetura e Ambientes

| Camada | Tecnologia / ambiente | Finalidade |
| --- | --- | --- |
| Frontend | Vue 3, Vite e PWA; deploy na [Vercel](https://frontend-albertos-projects-28fa367e.vercel.app/login?redirect=/residentes) | Interface web responsiva para cuidadores e gestores em computadores, tablets e celulares. |
| Persistência local | IndexedDB com Dexie | Preservação local dos dados operacionais no navegador e apoio ao uso em cenários de instabilidade de conexão. |
| Backend de desenvolvimento | json-server em `app/backend` | Backend mock utilizado para execução local, integração entre telas e testes durante o desenvolvimento. |
| API de homologação | FastAPI/Python no [Fly.io](https://vitaltech-api-vitaltech.fly.dev) | API publicada para demonstração, validação acadêmica e integração com o frontend implantado. |
| Documentação da API | Swagger em [/docs](https://vitaltech-api-vitaltech.fly.dev/docs) | Consulta dos endpoints disponíveis e apoio à validação técnica. |
| Banco de homologação | MySQL no Railway | Persistência remota utilizada pela API de homologação. |
| Produção institucional prevista | Implantação local/on-premise | Alternativa prevista para uso real pela instituição, com maior controle sobre infraestrutura e dados. |

---

## A Disciplina
Este repositório consolida todo o trabalho, a evolução e as entregas da disciplina de **Requisitos de Software (REQ)** — Turma 01, semestre **2026.1**. O propósito do projeto é aplicar os conceitos de Engenharia de Software focados em entender e modelar as necessidades de um problema de mercado real. 
Durante a sua execução, a equipe explora técnicas de Elicitação, Descobrimento, Análise, Declaração, Representação e Validação de Requisitos.

---

## A Equipe

<div align="center">

| <img src="https://github.com/oalbertocavalcante.png" width="130px;" alt=""/> | <img src="https://github.com/iicaroll.png" width="130px;" alt=""/> | <img src="https://github.com/menali17.png" width="130px;" alt=""/> | <img src="https://github.com/guxvr.png" width="130px;" alt=""/> | <img src="https://github.com/jopesmp.png" width="130px;" alt=""/> | <img src="https://github.com/Mateiki.png" width="130px;" alt=""/> |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **Alberto Côrtes** <br>*232014610* | **Ana Caroline** <br>*241025908* | **Enzo** <br>*241011054* | **Gustavo** <br>*241025247* | **João Pedro** <br>*211039528* | [**Mateus Eiki**](https://github.com/Mateiki) <br>*241025327* |

</div>

---

##  Repositório e Documentação
A cobertura completa das Sprints, reuniões, elicitação, User Stories e a detalhada do Produto/Projeto está publicada utilizando o [MkDocs Material](https://mdsreq-fga-unb.github.io/REQ-2026.1-T01-VitalTech/).

