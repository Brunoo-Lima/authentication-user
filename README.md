# Identity Service

Sistema completo de identidade com backend em Node.js/Express e frontend em React. O projeto cobre cadastro, autenticação com JWT, verificação de e-mail, renovação de sessão com refresh token, recuperação de senha e gerenciamento do perfil autenticado.

## O que o projeto faz

O sistema permite:

- criar conta com nome, e-mail e senha;
- criptografar senha com `bcryptjs`;
- gerar `access token` e `refresh token` com `jsonwebtoken`;
- exigir verificação de e-mail antes do login;
- enviar e-mail de confirmação de conta;
- enviar e-mail de recuperação de senha;
- redefinir senha com token temporário;
- renovar automaticamente o `access token` no frontend quando ele expira;
- consultar, editar e excluir a conta autenticada;
- registrar sessões com `refresh token`, IP e `user-agent`.

## Estrutura

```
identity-service/
  api/   -> backend em Express + Prisma + PostgreSQL
  web/   -> frontend em React + Vite
```

## Tecnologias

### Backend

- Node.js
- Express
- TypeScript
- Prisma ORM
- Zod
- JWT
- Nodemailer

### Frontend

- React
- TypeScript
- Vite
- React Router
- React Hook Form
- Zod
- TanStack Query
- Axios

## Backend (`/api`)

### Principais funcionalidades

- cadastro de usuário com validação de e-mail duplicado;
- hash de senha antes de salvar no banco;
- criação de token de verificação de e-mail com expiração;
- envio de e-mail de confirmação após cadastro;
- login apenas para usuários com e-mail verificado;
- geração de `access token` e `refresh token`;
- persistência da sessão no banco;
- refresh de sessão validando token, sessão e expiração;
- recuperação de senha por token;
- atualização de nome, e-mail e senha do usuário autenticado;
- exclusão da conta autenticada.

### Rotas da API

Base das rotas: `/api`

#### Autenticação

- `POST /auth` -> login
- `POST /auth/refresh-token` -> gera novo `access token` e novo `refresh token`
- `POST /auth/forgot-password` -> envia e-mail de recuperação
- `POST /auth/reset-password` -> redefine a senha com token

#### Usuário

- `POST /users` -> cria usuário
- `GET /users/me` -> retorna dados do usuário autenticado
- `PATCH /users/me` -> atualiza nome, e-mail ou senha
- `DELETE /users/me` -> remove a conta autenticada

#### E-mail

- `GET /email/verify?token=...` -> confirma o e-mail do usuário

### Fluxo de autenticação

1. O usuário cria a conta em `POST /users`.
2. A senha é criptografada e o usuário é salvo no banco.
3. O backend cria um registro de verificação de e-mail e envia um link de confirmação.
4. O login em `POST /auth` só funciona se `email_verified` for `true`.
5. Quando o login é bem-sucedido, o sistema gera tokens JWT e registra a sessão na tabela `sessions`.
6. Quando o `access token` expira, o frontend usa o `refresh token` para pedir um novo token em `POST /auth/refresh-token`.

### Recuperação de senha

1. O usuário informa o e-mail em `POST /auth/forgot-password`.
2. O backend cria um token temporário e envia um link para o frontend.
3. O frontend abre `/reset-password?token=...`.
4. A nova senha é enviada para `POST /auth/reset-password`.

### Regras importantes do backend

- o login falha se o e-mail ainda nao foi verificado;
- o middleware de autenticação retorna `401` com `code: "TOKEN_EXPIRED"` quando o `access token` expirou;
- o token de verificação de e-mail expira em `24h`;
- o `refresh token` expira em `30 dias`;
- o token de redefinição de senha expira em `5 minutos`;
- sessões, tokens de redefinição e verificações de e-mail ficam persistidos no banco;
- as relações do banco usam `onDelete: Cascade`, então dados relacionados ao usuário são removidos junto com a conta.

### Banco de dados

O Prisma define as seguintes tabelas:

- `users`
- `sessions`
- `password_resets`
- `email_verifications`

Campos relevantes:

- `users.email_verified` controla se o usuário pode logar;
- `sessions.refresh_token` guarda o refresh token ativo da sessão;
- `password_resets.used_at` impede reutilização do token;
- `email_verifications.verified_at` marca quando o e-mail foi confirmado.

## Frontend (`/web`)

### Principais funcionalidades

- tela inicial com alternancia entre login, cadastro e esqueci minha senha;
- armazenamento de `access token` e `refresh token` no `localStorage`;
- contexto global de autenticação;
- rotas protegidas para usuários autenticados;
- refresh automático do token via interceptor do Axios;
- dashboard com saudação ao usuário autenticado;
- tela de perfil para editar nome, e-mail e senha;
- exclusão da conta com interface dedicada;
- tela pública de redefinição de senha por token;
- feedback visual com notificações usando `sonner`.

### Rotas do frontend

- `/` -> página pública com login, cadastro e recuperação de senha
- `/reset-password` -> redefinição de senha via token
- `/dash` -> dashboard autenticado
- `/me` -> perfil do usuário autenticado

### Como o frontend consome a API

- `VITE_API_URL` define a base da API;
- as chamadas usam rotas como `/auth`, `/users/me` e `/auth/reset-password`;
- o token JWT é enviado automaticamente no header `Authorization`;
- quando uma rota protegida responde `401`, o interceptor tenta renovar a sessão usando `/auth/refresh-token`;
- se o refresh falhar, o frontend limpa a sessão local e exige novo login.

### Validações de formulário

- cadastro: nome obrigatório, e-mail obrigatório, senha com no mínimo 6 caracteres;
- edição de perfil: nome obrigatório e e-mail obrigatório;
- redefinição de senha: senha e confirmação com no mínimo 6 caracteres.

### 1. Backend

```bash
cd api
npm install
```

Crie o arquivo `.env` com base em `.env.example`.

Depois execute as migrations:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

### 2. Frontend

```bash
cd web
npm install
```

Crie o arquivo `.env` com base em `.env.example`.

Inicie a aplicação:

```bash
npm run dev
```

## Scripts disponíveis

### API

- `npm run dev` -> sobe o backend em modo desenvolvimento com `tsx watch`
- `npm run eslint:check` -> valida os arquivos `.ts`

### Web

- `npm run dev` -> sobe o frontend com Vite
- `npm run build` -> gera build de produção
- `npm run lint` -> roda o ESLint
- `npm run preview` -> visualiza a build gerada

## Pontos importantes para manter no README

- o frontend espera que `VITE_API_URL` ja inclua o prefixo `/api`;
- o login depende de verificação de e-mail concluída;
- a recuperação de senha depende de SMTP configurado corretamente;
- o backend usa PostgreSQL e Prisma, então as migrations precisam ser aplicadas antes de rodar;
- as rotas `/dash` e `/me` sao privadas;
- o refresh de token depende de `refresh token` salvo localmente e da sessão persistida na tabela `sessions`.
