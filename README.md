# Spring CRUD 🛠️

![Java](https://img.shields.io/badge/Java-17-blue)  
![Spring Boot](https://img.shields.io/badge/Spring_Boot-2.7-green)

Projeto simples em Java com Spring Boot para realizar operações CRUD (Create, Read, Update, Delete).

---

## Sumário  
- [Sobre o Projeto](#sobre-o-projeto)  
- [Tecnologias Utilizadas](#tecnologias-utilizadas)  
- [Como Executar](#como-executar)  
  - [Executar com H2 (Local)](#executar-com-h2-local)  
  - [Executar com PostgreSQL](#executar-com-postgresql)  
- [Endpoints Disponíveis](#endpoints-disponíveis)  
- [Documentação Swagger](#documentação-swagger)  
- [O que Aprendi](#o-que-aprendi)

---

## Sobre o Projeto

Este é meu primeiro projeto em Java, desenvolvido para a disciplina de Programação Orientada a Objetos (POO) na FATEC Mogi das Cruzes.

O projeto foi criado usando o [Spring Initializr](https://start.spring.io/) e implementa uma API REST simples para operações básicas de CRUD.

Agora, também suporta o banco de dados em memória **H2**, facilitando a execução local para testes e desenvolvimento sem configurar um banco externo.

---

## Tecnologias Utilizadas

- Java 17  
- Spring Boot  
- Maven  
- Spring Data JPA  
- H2 Database (modo dev)  
- PostgreSQL (modo padrão)  
- Swagger (OpenAPI)  
- Lombok

---

## Como Executar

### Executar com H2 (Local)

Mais rápido para rodar e testar:

Executar com o perfil `dev`:
```
./mvnw spring-boot:run "-Dspring-boot.run.profiles=dev"
```

Ou no Windows:
```
mvnw spring-boot:run -Dspring-boot.run.profiles=dev
```
Acesse:

- **API**: [http://localhost:8080](http://localhost:8080)  
- **Console H2**: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)  
  - **JDBC URL**: `jdbc:h2:mem:cruddb`  
  - **Usuário**: `sa`  
  - **Senha**: *(em branco)*

---

### Executar com PostgreSQL

1. Crie um arquivo `.env` ou configure variáveis de ambiente:

- **DB_URL**: `jdbc:postgresql://localhost:5432/seu_banco`  
- **DB_USERNAME**: `seu_usuario`  
- **DB_PASSWORD**: `sua_senha`

2. Rode a aplicação:
```
./mvnw spring-boot:run
```
---

## Endpoints Disponíveis

| Método | Endpoint            | Ação                     |
|--------|---------------------|--------------------------|
| GET    | `/api/items`        | Lista todos os itens     |
| GET    | `/api/items/{id}`   | Busca um item por ID     |
| POST   | `/api/items`        | Cria um novo item        |
| PUT    | `/api/items/{id}`   | Atualiza um item         |
| DELETE | `/api/items/{id}`   | Deleta um item           |

---

## Documentação Swagger

A documentação da API está disponível com Swagger:

👉 [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)

---

## O que Aprendi

Este projeto foi uma excelente introdução prática ao desenvolvimento com Java e Spring Boot. Durante o desenvolvimento, aprendi a:

- Criar APIs REST para operações CRUD.  
- Configurar e utilizar o Spring Boot.  
- Usar Maven no gerenciamento do projeto.  
- Organizar o backend com controllers, services e repositórios.  
- Aplicar boas práticas de programação orientada a objetos.  
- Utilizar banco de dados H2 para facilitar o desenvolvimento local.  
- Documentar APIs usando Swagger.

Esse primeiro contato com o Spring é a base para projetos mais avançados que pretendo desenvolver.
