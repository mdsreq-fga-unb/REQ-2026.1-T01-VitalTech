# Sprint 2 - Planning

## Registro do Planejamento

Não há ata formal registrada para esta reunião de planejamento da Sprint 2. Este documento consolida o planejamento da Sprint 2 a partir do HTML atualizado de planejamento da sprint, do Story Map, das User Stories, do DoR/DoD oficial e das regras de negócio documentadas no repositório.

Também não há gravação registrada para esta reunião de planejamento.

## Objetivo da Sprint

Entregar a fundação inicial do sistema VitalTech, contemplando autenticação, encerramento de sessão, cadastro de usuários e cadastro de residentes.

Ao final da sprint, o sistema deve permitir o fluxo demonstrável:

```text
login -> cadastro de usuário -> cadastro de residente -> logout
```

Esse fluxo cria a base necessária para que a Sprint 3 inicie o ciclo assistencial, com registro de sinais vitais, rotinas assistenciais e consulta ao histórico.

## Escopo Selecionado

| User Story | Funcionalidade | Persona | Objetivo na Sprint 2 |
| --- | --- | --- | --- |
| US08 | Autenticar usuário no sistema | Usuário autorizado | Permitir acesso seguro ao sistema por credenciais individuais. |
| US09 | Encerrar sessão do usuário | Usuário autorizado | Evitar uso indevido em dispositivos compartilhados. |
| US10 | Cadastrar usuário | Gestor | Permitir que o gestor crie acessos individuais para a equipe. |
| US01 | Cadastrar dados do residente | Gestor | Criar a base de residentes para uso nos registros assistenciais das próximas sprints. |

## Critérios de Aceitação da Sprint

### US08 - Autenticar usuário no sistema

- CA08.1: Dado que o usuário está na tela de login, quando informar login e senha corretos e confirmar, então o sistema libera o acesso e direciona para a tela inicial.
- CA08.2: Dado que o usuário informa credenciais incorretas, quando tenta confirmar, então o sistema exibe mensagem de erro genérica sem revelar qual campo está incorreto, e o acesso é negado.

### US09 - Encerrar sessão do usuário

- CA09.1: Dado que o usuário está autenticado, quando clicar em "Encerrar sessão", então a sessão é encerrada e o usuário é redirecionado para a tela de login.
- CA09.2: Dado que a sessão foi encerrada, quando outro usuário acessar o dispositivo, então os dados da sessão anterior não estão mais visíveis nem acessíveis.

### US10 - Cadastrar usuário

- CA10.1: Dado que o Gestor está autenticado, quando preencher os campos obrigatórios (nome completo, login, perfil e senha provisória) e confirmar, então o novo usuário é criado e pode se autenticar com as credenciais definidas.
- CA10.2: Dado que o Gestor tenta cadastrar um login já existente no sistema, quando confirmar, então o sistema exibe mensagem de erro indicando que o login já está em uso e não realiza o cadastro.

### US01 - Cadastrar dados do residente

- CA01.1: Dado que o Gestor está autenticado, quando preencher os campos obrigatórios (nome completo, data de nascimento, CPF, grau de dependência e responsável legal) e confirmar, então o perfil digital do residente é criado e fica disponível para toda a equipe.
- CA01.2: Dado que o Gestor tenta cadastrar sem preencher campos obrigatórios, quando confirmar, então o sistema indica os campos em falta e não realiza o cadastro.

## Definition of Ready Aplicada

As histórias da Sprint 2 foram verificadas e validadas pela equipe como prontas para desenvolvimento porque atendem aos critérios principais do DoR oficial do projeto:

- estão descritas como User Stories com persona, ação e benefício;
- possuem critérios de aceitação em formato Dado / Quando / Então;
- possuem valor claro para o fluxo administrativo e operacional da instituição;
- foram relacionadas ao Story Map e ao cronograma da Sprint 2;
- possuem dependências técnicas identificadas;
- possuem regras de negócio e RNFs associados quando aplicável;
- possuem tarefas técnicas planejadas para frontend, services, persistência, testes e evidências;
- foram avaliadas pelo critério INVEST;
- tiveram clareza, consistência, critérios de aceitação e dependências verificados;
- tiveram sua prontidão para desenvolvimento validada pela equipe.

## Análise INVEST por Funcionalidade

### US08 - Autenticar usuário no sistema

| Critério | Avaliação |
| --- | --- |
| Independent | Parcialmente independente. Pode ser implementada como tela e service de login, mas serve de base para as demais telas autenticadas. A dependência foi identificada e planejada. |
| Negotiable | O escopo permite ajustes em mensagens, fluxo visual e comportamento de erro sem alterar o objetivo da história. |
| Valuable | Entrega valor claro ao impedir acesso não autorizado ao sistema. |
| Estimable | A equipe consegue estimar a funcionalidade a partir dos campos login/senha, mock de usuários, authService e critérios de aceite. |
| Small | Possui tamanho compatível com a sprint, pois cobre login e feedback de erro genérico. |
| Testable | É testável por login válido, login inválido e verificação de redirecionamento/negação de acesso. |

### US09 - Encerrar sessão do usuário

| Critério | Avaliação |
| --- | --- |
| Independent | Parcialmente independente. Depende de existir sessão autenticada, mas seu comportamento é isolado e verificável. |
| Negotiable | Permite ajustes no posicionamento do botão, texto exibido e detalhes de timeout. |
| Valuable | Entrega valor de segurança em dispositivos compartilhados. |
| Estimable | A equipe consegue estimar a partir de logout, limpeza de sessão, router guard e timeout de inatividade. |
| Small | É pequena e compatível com a sprint, pois envolve encerrar sessão e limpar dados locais. |
| Testable | É testável por logout manual, tentativa de retorno a telas internas e verificação de dados da sessão. |

### US10 - Cadastrar usuário

| Critério | Avaliação |
| --- | --- |
| Independent | Parcialmente independente. Depende de autenticação do Gestor, mas a criação/listagem de usuários e um módulo claro. |
| Negotiable | Campos, mensagens e regras de exibição podem ser refinados com a equipe e cliente. |
| Valuable | Entrega valor ao permitir acesso individual para membros da equipe. |
| Estimable | A equipe consegue estimar a partir do formulário, usuarioService, validação de duplicidade e controle por perfil. |
| Small | Tem escopo adequado para a sprint: cadastrar, listar e bloquear login duplicado. |
| Testable | É testável por cadastro válido, campos obrigatórios, login duplicado e restrição por perfil. |

### US01 - Cadastrar dados do residente

| Critério | Avaliação |
| --- | --- |
| Independent | Parcialmente independente. Depende de usuário autenticado, mas o cadastro de residente e funcionalidade própria e prioritária. |
| Negotiable | Campos complementares e organização visual podem ser ajustados conforme feedback. |
| Valuable | Entrega valor central ao criar o perfil digital do residente, base para registros assistenciais futuros. |
| Estimable | A equipe consegue estimar a partir dos campos obrigatórios, residenteService, persistência local e regras de validação. |
| Small | O escopo foi limitado ao cadastro inicial e listagem, deixando edição/inativação para sprints futuras. |
| Testable | É testável por cadastro válido, campos obrigatórios vazios, CPF duplicado, persistência e listagem de residentes ativos. |

## Regras de Negócio Consideradas

| Regra | Aplicação na Sprint 2 |
| --- | --- |
| RN-02 | Preparar schema local em IndexedDB para usuários e residentes, mantendo compatibilidade com consolidação futura no backend institucional. |
| RN-03 | Preparar o campo `isAtivo` no schema de residente, viabilizando soft delete futuro sem excluir histórico. |
| RN-05 | Bloquear submissão de formulários com campos obrigatórios vazios em cadastro de usuário e cadastro de residente. |
| RN-09 | Exibir confirmação visual após salvar usuário ou residente. |

Observação: RN-01 entra com maior força na Sprint 3, com registros assistenciais offline. RN-04, RN-06, RN-07 e RN-08 são regras relacionadas a funcionalidades previstas para sprints futuras.

## Planejamento Técnico por Membro

### Membro 1 - Dupla A

Responsável por frontend lead, componentes Vue e telas de autenticação/sessão.

- Setup Vite, Vue 3, vue-router e estrutura inicial de pastas.
- Implementar LoginView com campos login/senha, validação reativa e mensagem de erro genérica.
- Implementar encerramento de sessão e router guard.
- Apoiar telas de usuário e residente.
- Implementar toast/snackbar reutilizável para confirmação de salvamento.
- Testar services de autenticação e persistência da Dupla B.
- Apoiar ensaio da demo e coleta de evidências.

### Membro 2 - Dupla A

Responsável por formulários, gestão de usuários e cadastro de residentes.

- Criar wireframes das telas de cadastro de usuário e residente.
- Definir modelo visual de Usuário e Residente.
- Implementar formulário e listagem de usuários.
- Implementar formulário e listagem de residentes.
- Integrar telas com usuarioService e residenteService da Dupla B.
- Validar campos obrigatórios, feedback de erro e usabilidade touch.
- Testar persistência, metadados e controle de acesso com a Dupla B.

### Membro 3 - Dupla B

Responsável por lógica de negócio, persistência local, IndexedDB e autenticação.

- Projetar schema IndexedDB com object stores para `usuarios` e `residentes`.
- Documentar contrato de API mock para `/auth/login`, `/usuarios` e `/residentes`.
- Implementar `authService.js` com login, sessão, perfil/permissões e logout.
- Implementar `usuarioService.js` com salvar, listar, buscar por login e validar duplicidade.
- Implementar `residenteService.js` com salvar, listar, buscar por ID, metadados e `isAtivo`.
- Preparar metadados de rastreabilidade, como `createdAt` e `createdBy`.
- Apoiar testes da Dupla A e ensaio da demonstração.

### Membro 4 - Dupla B

Responsável por integração, testes funcionais, qualidade e evidências.

- Configurar backend mock/json-server com dados de autenticação, usuários e residentes.
- Escrever checklist de testes de permissão por perfil.
- Testar cenários de erro do authService: credenciais inválidas, usuário inexistente e sessão expirada.
- Testar US10, incluindo cadastro de usuário, login duplicado e controle de perfil.
- Testar US01, incluindo campos obrigatórios, persistência e metadados.
- Consolidar evidências para DoD, como prints, status por critério de aceite e demonstração do fluxo.

## Artefatos Planejados

| Artefato | Objetivo | Responsável principal |
| --- | --- | --- |
| DoR verificado e validado para US08, US09, US10 e US01 | Verificar a qualidade dos requisitos e validar que as histórias estão prontas para desenvolvimento. | Equipe |
| Setup Vue/Vite | Disponibilizar base do frontend para implementação das telas. | Membro 1 |
| Wireframes de usuário e residente | Apoiar implementação dos formulários. | Membro 2 |
| Contrato de API mock | Alinhar frontend, services e backend mock. | Membro 3 |
| Schema IndexedDB | Preparar persistência local para usuários e residentes. | Membro 3 |
| Checklist de testes por perfil | Apoiar validação cruzada da sprint. | Membro 4 |
| Evidências de validação | Registrar atendimento aos critérios de aceite e DoD. | Membro 4 e equipe |

## Definition of Done Aplicada

A Sprint 2 segue o DoD oficial documentado em `docs/visao/dor_dod.md`. Para cada User Story, a entrega deve ser considerada concluída quando:

- a funcionalidade corresponder ao objetivo da User Story;
- todos os critérios de aceitação aplicáveis forem verificados;
- cenários principais e cenários de erro forem testados;
- regras de negócio e requisitos associados forem considerados;
- mensagens ao usuário forem claras e adequadas ao contexto da instituição;
- a interface for adequada ao uso em dispositivos móveis/tablets, quando aplicável;
- a funcionalidade não comprometer dados existentes nem interferir negativamente em histórias já entregues;
- testes manuais, automatizados ou inspeções suficientes forem realizados;
- evidências de validação forem registradas;
- documentação e artefatos forem atualizados quando necessário;
- a entrega passar por revisão de outro membro via Pull Request.

## Roteiro de Demo

1. Acessar a aplicação e exibir a tela de login.
2. Tentar autenticar com credenciais inválidas e demonstrar erro genérico.
3. Autenticar com usuário Gestor.
4. Cadastrar um novo usuário com nome, login, perfil e senha provisória.
5. Demonstrar bloqueio de login duplicado.
6. Cadastrar um residente com campos obrigatórios.
7. Demonstrar bloqueio de campos obrigatórios vazios no cadastro de residente.
8. Exibir confirmação visual de salvamento.
9. Encerrar sessão.
10. Fazer login com outro perfil e demonstrar restrições de acesso quando aplicável.
11. Exibir listagem de residentes como base para a Sprint 3.

## Riscos e Mitigações

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| Backend definitivo não estar disponível | Pode bloquear integração real. | Usar contrato mock e json-server/IndexedDB enquanto backend FastAPI não estiver pronto. |
| Schema IndexedDB ficar desalinhado do backend futuro | Pode gerar retrabalho na sincronização. | Documentar contrato e manter campos compatíveis com estrutura futura. |
| Falta de validação de campos obrigatórios | Pode comprometer RN-05 e qualidade dos dados. | Aplicar validação nos services e nos formulários. |
| Falta de evidências para DoD | Pode dificultar revisão da sprint. | Registrar prints, resultado de testes e status por critério de aceite. |
| Escopo visual crescer demais | Pode desviar do objetivo da fundação da Sprint 2. | Manter foco em login, usuários, residentes e logout. |


---

## Histórico de Revisão

| Data | Versão | Descrição | Autor |
| :---: | :---: | --- | --- |
| 31/05/2026 | 1.0 | Preenchimento do planning da Sprint 2 com base no HTML atualizado, DoR, DoD e análise INVEST das funcionalidades. | Enzo Menali |
| 12/06/2026 | 1.1 | Revisão ortográfica geral e explicitação das atividades de verificação e validação realizadas por meio do DoR. | Enzo Menali |
