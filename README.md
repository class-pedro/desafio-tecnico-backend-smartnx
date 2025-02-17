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

#### 4. Gere um Build do projeto:

    npx tsc

#### 5. Entre no container da aplicação do backend:

    docker exec -it commentsapi sh

#### 6. Rode as migrations:

    npx sequelize db:migrate

#### 7. Rode a aplicação:

    docker-compose up -d
