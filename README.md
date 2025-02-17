# Desafio Backend - SNX

Este projeto utiliza Node.js, TypeScript, MySQL e Sequelize, e é dockerizado para facilitar a configuração e execução.

## Pré-requisitos

- Docker
- Docker Compose
- Node.js (caso queira rodar o projeto fora do Docker)

## Como rodar o projeto

#### 1. Clone o repositório:

    git clone https://github.com/class-pedro/desafio-tecnico-backend-smartnx

#### 2. Instale as dependências:

    - Abra o projeto em seu editor de código

#### 3. Instale as dependências:

    npm install

#### 4. Suba os containers:

    docker-compose up -d

#### 5. Gere um Build do projeto:

    npx tsc

#### 6. Entre no container da aplicação do backend:

    docker exec -it commentsapi sh

#### 7. Rode as migrations:

    npx sequelize db:migrate

#### 8. Saia do terminal do container:

    exit
