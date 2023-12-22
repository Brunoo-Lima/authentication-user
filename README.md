# Criação e Autenticação de usuários

O projeto tem as funcionalidades de criptografia de senhas e jwtwebtoken, que é para gerar um token sempre que o usuário logar.

## Funcionamento

Ao criar o usuário, os dados irão para o banco de dados e ao tentar fazer o login, é feita uma requisição ao banco de dados e verificação
se o usuário existe e se as informações coincidem, ao fazer isso, o usuário é logado, e assim gerando um token sempre que ele loga.

## Tecnologias utilizadas

#### Backend

- Node
- Express
- TypeScript
- Prisma
- PostgreSQL
- JWT

#### Frontend

- React
- TypeScript
- CSS Modules
- Toastify
