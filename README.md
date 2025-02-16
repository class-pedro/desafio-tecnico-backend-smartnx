# Desafio Backend - SNX

Este projeto utiliza Node.js, TypeScript, MySQL e Sequelize, e é dockerizado para facilitar a configuração e execução.

## Pré-requisitos

- Docker
- Docker Compose
- Node.js (caso queira rodar o projeto fora do Docker)

## Como rodar o projeto

#### 1. Clone o repositório:

    git clone https://github.com/class-pedro/desafio-tecnico-backend-smartnx
    cd <diretório do repositório>

#### 2. Instale as dependências:

    npm install

#### 3. Suba os containers:

    docker-compose up -d

#### 4. Rode as migrations:

    docker-compose exec commentsapi npx sequelize-cli db:migrate

#### 5. Rode a aplicação:

    docker-compose up -d
