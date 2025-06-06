# Spring CRUD 🛠️

![Java](https://img.shields.io/badge/Java-17-blue)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7-green)


Projeto simples em Java com Spring Boot para realizar operações CRUD (Create, Read, Update, Delete).

## Sumário
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Executar](#como-executar-🚀)
- [Endpoints Disponíveis](#endpoints-disponíveis)
- [O que Aprendi](#o-que-aprendi-com-este-projeto-📚)
- [Licença](#licença)

## Sobre o Projeto

Este é meu primeiro projeto em Java, desenvolvido para a disciplina de Análise e Desenvolvimento de Sistemas (ADS) na FATEC Mogi das Cruzes.

O projeto foi criado usando o [Spring Initializr](https://start.spring.io/) e implementa uma API REST simples para operações básicas de CRUD.

## Tecnologias Utilizadas

- Java 17
- Spring Boot
- Maven (gerenciador de dependências e build que acompanha o Spring Initializr)

## Como Executar 🚀

1. Clone este repositório:

```bash
git clone https://github.com/COKINHOxo/spring-crud.git
cd spring-crud
```

 Execute a aplicação com Maven:

    ./mvnw spring-boot:run
    
    No Windows, use:
    
    mvnw.cmd spring-boot:run

Acesse a aplicação no navegador em: http://localhost:8080

Endpoints Disponíveis

    GET /api/items — Lista todos os itens

    GET /api/items/{id} — Busca um item pelo ID

    POST /api/items — Cria um novo item

    PUT /api/items/{id} — Atualiza um item existente

    DELETE /api/items/{id} — Deleta um item

O que Aprendi com este Projeto 📚

Este projeto foi uma excelente introdução prática ao desenvolvimento com Java e Spring Boot. Durante o desenvolvimento, aprendi a:

    Criar APIs REST para operações CRUD.

    Configurar e utilizar o Spring Boot para agilizar o desenvolvimento.

    Compreender o papel do Maven no gerenciamento do projeto, mesmo usando-o de forma básica.

    Organizar um projeto backend com controllers, services e repositórios.

    Aplicar conceitos de programação orientada a objetos e boas práticas.

Esse primeiro contato com o Spring é a base para projetos mais avançados que pretendo desenvolver.
