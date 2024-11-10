<h1 align="center" style="font-weight: bold;">Planner 📃</h1>

<p align="center">
 <a href="#tech">Tecnologias</a> • 
 <a href="#started">Primeiros passos</a> • 
  <a href="#user-routes">User Endpoints</a> 
  <a href="#task-routes">Task Endpoints</a> 
</p>

<p align="center">
    <b>Desenvolvimento de uma api de gestão de atividades</b>
</p>

<h2 id="technologies">💻 Tecnologias</h2>

- Node.js
- Express
- TypeScript
- Prisma ORM
- PostgreSQL

<h2 id="started">🚀 Primeiros Passos</h2>

<h3>Pré Requisitos</h3>

- [Node.js](https://nodejs.org/pt)
- [Git](https://git-scm.com/)

<h3>Clone o Projeto</h3>

```bash
git clone https://github.com/reisArthur2602/planner-backend
```

<h3>Configure as váriaveis .env </h2>

Use o`.env.example` como referência para criar seu arquivo de configuração `.env` com suas credenciais

```yaml
PORT=
DATABASE_URL= postgresql://janedoe:mypassword@localhost:5432/mydb?schema=public
```

<h3>Para iniciar o projeto</h3>

```bash
cd nome-do-projeto
npm install
npx prisma migrate dev
npm run dev
```

<h2 id="user-routes">📍 User Endpoints</h2>

| Rotas                          | Descrição                                                                    |
| ------------------------------ | ---------------------------------------------------------------------------- |
| <kbd>POST /user/register</kbd> | Cadastrar usuário [Detalhes da requisição](#post-register-user-detail)       |
| <kbd>POST /user/session</kbd>  | Logar usuário [Detalhes da requisição](#post-session-user-detail)            |
| <kbd>GET /user/me</kbd>        | Buscar detalhes do usuário logado [Detalhes da requisição](#get-user-detail) |

<h3 id="post-register-user-detail">POST /user/register</h3>

**REQUEST**

```json
{
  "email": "arthur@guest.com"
}
```

**RESPONSE**

```json
{
  "id": "9a8ef705-a8d9-44cb-abf4-54ad450c1242",
  "email": "arthur@guest.com"
}
```

<h3 id="post-session-user-detail">POST /user/session</h3>

**REQUEST**

```json
{
  "email": "arthur@guest.com"
}
```

**RESPONSE**

```json
{
  "id": "9a8ef705-a8d9-44cb-abf4-54ad450c1242",
  "email": "arthur@guest.com"
}
```

<h3 id="get-user-detail">GET /user/me</h3>

**RESPONSE**

```json
{
  "id": "9a8ef705-a8d9-44cb-abf4-54ad450c1242",
  "email": "arthur@guest.com"
}
```

<h2 id="task-routes">📍 Task Endpoints</h2>

| Rotas                            | Descrição                                                                                                  |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| <kbd>POST /task</kbd>            | Cadastrar uma tarefa [Detalhes da requisição](#post-task-detail)                                           |
| <kbd>DELETE /task/:id</kbd>      | Deletar uma tarefa [Detalhes da requisição](#delete-task-detail)                                           |
| <kbd>PUT /task/:id</kbd>         | Editar uma tarefa [Detalhes da requisição](#put-task-detail)                                               |
| <kbd>PATCH /task/:id/:done</kbd> | Finalizar uma tarefa [Detalhes da requisição](#patch-finish-detail)                                        |
| <kbd>GET /task/:id</kbd>         | Buscar uma tarefa [Detalhes da requisição](#get-task-detail)                                               |
| <kbd>GET /task/all</kbd>         | Buscar todas as tarefas de um usuário [Detalhes da requisição](#get-all-tasks-detail)                      |
| <kbd>GET /task/today</kbd>       | Buscar todas as tarefas de um usuário para a data atual [Detalhes da requisição](#get-today-tasks-detail)  |
| <kbd>GET /task/week</kbd>        | Buscar todas as tarefas de um usuário para a semana atual [Detalhes da requisição](#get-week-tasks-detail) |
| <kbd>GET /task/month</kbd>       | Buscar todas as tarefas de um usuário para o mês atual [Detalhes da requisição](#get-month-tasks-detail)   |
| <kbd>GET /task/year</kbd>        | Buscar todas as tarefas de um usuário para o ano atual [Detalhes da requisição](#get-year-tasks-detail)    |
| <kbd>GET /task/late</kbd>        | Buscar todas as tarefas atrasadas de um usuário [Detalhes da requisição](#get-late-tasks-detail)           |

<h3 id="post-task-detail">POST /task</h3>

**REQUEST**

```json
{
  "title": "Tarefa 1",
  "description": "Tarefa 1",
  "type": "study",
  "when": "2024-11-10T18:37:00.000Z"
}
```

<h3 id="delete-task-detail">DELETE /task/:id</h3>

**REQUEST**

```json
{
  "id": "82a99b2c-53f2-41af-87ee-b7d24742a9a9"
}
```

<h3 id="patch-finish-detail">PATCH /task/:id/:done</h3>

**REQUEST**

```json
{
  "id": "82a99b2c-53f2-41af-87ee-b7d24742a9a9",
  "done": true
}
```

<h3 id="get-task-detail">GET /task/:id</h3>

**REQUEST**

```json
{
  "id": "82a99b2c-53f2-41af-87ee-b7d24742a9a9"
}
```

**RESPONSE**

```json
{
  "id": "82a99b2c-53f2-41af-87ee-b7d24742a9a9",
  "description": "Tarefa 1",
  "title": "Tarefa 1",
  "type": "study",
  "done": "false",
  "when": "2024-11-10T18:37:00.000Z",
  "user_id": "151613fd-7039-4e3a-b5af-9b0c137791b4"
}
```

<h3 id="get-all-tasks-detail">GET /task/all</h3>

**RESPONSE**

```json
[
  {
    "id": "82a99b2c-53f2-41af-87ee-b7d24742a9a9",
    "description": "Tarefa 1",
    "title": "Tarefa 1",
    "type": "study",
    "done": "false",
    "when": "2024-11-10T18:37:00.000Z",
    "user_id": "151613fd-7039-4e3a-b5af-9b0c137791b4"
  }
]
```

<h3 id="get-today-tasks-detail">GET /task/today</h3>

**RESPONSE**

```json
[
  {
    "id": "82a99b2c-53f2-41af-87ee-b7d24742a9a9",
    "description": "Tarefa 1",
    "title": "Tarefa 1",
    "type": "study",
    "done": "false",
    "when": "2024-11-10T18:37:00.000Z",
    "user_id": "151613fd-7039-4e3a-b5af-9b0c137791b4"
  }
]
```

<h3 id="get-week-tasks-detail">GET /task/week</h3>

**RESPONSE**

```json
[
  {
    "id": "82a99b2c-53f2-41af-87ee-b7d24742a9a9",
    "description": "Tarefa 1",
    "title": "Tarefa 1",
    "type": "study",
    "done": "false",
    "when": "2024-11-10T18:37:00.000Z",
    "user_id": "151613fd-7039-4e3a-b5af-9b0c137791b4"
  }
]
```

<h3 id="get-month-tasks-detail">GET /task/month</h3>

**RESPONSE**

```json
[
  {
    "id": "82a99b2c-53f2-41af-87ee-b7d24742a9a9",
    "description": "Tarefa 1",
    "title": "Tarefa 1",
    "type": "study",
    "done": "false",
    "when": "2024-11-10T18:37:00.000Z",
    "user_id": "151613fd-7039-4e3a-b5af-9b0c137791b4"
  }
]
```

<h3 id="get-year-tasks-detail">GET /task/year</h3>

**RESPONSE**

```json
[
  {
    "id": "82a99b2c-53f2-41af-87ee-b7d24742a9a9",
    "description": "Tarefa 1",
    "title": "Tarefa 1",
    "type": "study",
    "done": "false",
    "when": "2024-11-10T18:37:00.000Z",
    "user_id": "151613fd-7039-4e3a-b5af-9b0c137791b4"
  }
]
```

<h3 id="get-late-tasks-detail">GET /task/late</h3>

**RESPONSE**

```json
[
  {
    "id": "82a99b2c-53f2-41af-87ee-b7d24742a9a9",
    "description": "Tarefa 1",
    "title": "Tarefa 1",
    "type": "study",
    "done": "false",
    "when": "2024-11-10T18:37:00.000Z",
    "user_id": "151613fd-7039-4e3a-b5af-9b0c137791b4"
  }
]
```
