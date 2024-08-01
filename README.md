<p align="center">
  <img src="https://github.com/reisArthur2602/planner-frontend/blob/main/src/assets/banner%20-%20planner%202x.jpg?raw=true" alt="Logo" />
</p>

<h1 align="center"> Planner - Api</h1>

<p align="center">
  <b> Rastreador de Tarefas</b></br>
  <sub>Organizando sua rotina!<sub>
</p>

[![-----------------------------------------------------](https://raw.githubusercontent.com/andreasbm/readme/master/assets/lines/colored.png)](#table-of-contents)

## 🚀 Introdução

**_Bem-vindo ao Planner API! A API fornece funcionalidades como autenticação e gerenciamento total das tarefas ao usuário_**

## 🚀 Rotas

> Funcionalidades Principais

<br/>

## `🔓 Autenticação`

- **POST /user/register**: Criar uma conta
- **POST /user/session**: Logar uma conta
- **POST /user/me**: Buscar detalhes do usuário

<br/>

## `📋 Tarefas`

- **POST /task**: Criar uma tarefa
- **GET /task/all**: Listar todas as tarefas
- **GET /task/today**: Listar todas as tarefas para o dia atual
- **GET /task/week**: Listar todas as tarefas da semana
- **GET /task/month**: Listar todas as tarefas do mês
- **GET /task/year**: Listar todas as tarefas do ano
- **DELETE /task/:id**: Deletar uma tarefa
- **PUT /task/:id**: Atualizar uma tarefa
- **PATCH /task/:id/:done**: Concluir uma tarefa

<br/>

## 🚀 Requisitos de domínio

- **Somente usuários logados poderão utilizar as rotas de tarefas**
- **Não é permitido a criação/edição de tarefas para uma mesma data e hora**
- **Não é permitido a criação/edição de tarefas para uma data e hora no passado**

## 🚀 Dependências

> Requisitos para rodar o projeto...

## `📖 Instalação`

<br />

> Com o git instalado.

Clone o repositório `git clone https://github.com/reisArthur2602/planner-backend`

<br />

> Configure as variaveis de ambiente.

1. Crie um arquivo .env na raiz do projeto
2. Adicione as variáveis `PORT=3000` `DATABASE_URL=DATABASE_URL`

<br />

> Para rodar o projeto.

1. Para instalar as depêndencias do projeto `npm install`
2. Para rodar o iniciar o projeto `npm run dev`

<br />

## 🚀 Tecnologias

> Tecnologias utilizadas no projeto...

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-000?style=for-the-badge&logo=postgresql)
![Zod](https://img.shields.io/badge/zod-%233068b7.svg?style=for-the-badge&logo=zod&logoColor=white)
