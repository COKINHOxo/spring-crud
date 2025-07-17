Spring CRUD 🛠️

Java
Spring Boot

Projeto simples em Java com Spring Boot para realizar operações CRUD (Create, Read, Update, Delete).
📑 Sumário

    Sobre o Projeto

    Tecnologias Utilizadas

    Como Executar 🚀

        Executar com H2 (local)

        Executar com PostgreSQL

    Endpoints Disponíveis

    Documentação Swagger

    O que Aprendi com este Projeto 📚

Sobre o Projeto

Este é meu primeiro projeto em Java, desenvolvido para a disciplina de Programação Orientada a Objetos (POO) na FATEC Mogi das Cruzes.

O projeto foi criado usando o Spring Initializr e implementa uma API REST simples para operações básicas de CRUD.

Agora, também suporta o banco de dados em memória H2, facilitando a execução local para testes e desenvolvimento sem configurar um banco externo.
Tecnologias Utilizadas

    Java 17

    Spring Boot

    Maven

    Spring Data JPA

    H2 Database (modo dev)

    PostgreSQL (modo padrão)

    Swagger (OpenAPI)

    Lombok

Como Executar 🚀
✅ Executar com H2 (local)

Mais rápido para rodar e testar:

./mvnw spring-boot:run "-Dspring-boot.run.profiles=dev"

Ou no Windows CMD:

mvnw spring-boot:run -Dspring-boot.run.profiles=dev

Acesse:

    API: http://localhost:8080

    Console H2: http://localhost:8080/h2-console

        JDBC URL: jdbc:h2:mem:cruddb

        Usuário: sa

        Senha: (em branco)

🐘 Executar com PostgreSQL

    Crie um arquivo .env ou configure variáveis de ambiente:

DB_URL=jdbc:postgresql://localhost:5432/seu_banco
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha

    Rode a aplicação:

./mvnw spring-boot:run

Endpoints Disponíveis
Método	Endpoint	Ação
GET	/api/items	Lista todos os itens
GET	/api/items/{id}	Busca um item por ID
POST	/api/items	Cria um novo item
PUT	/api/items/{id}	Atualiza um item
DELETE	/api/items/{id}	Deleta um item
📘 Documentação Swagger

A documentação da API está disponível com Swagger:

👉 http://localhost:8080/swagger-ui.html
O que Aprendi com este Projeto 📚

Este projeto foi uma excelente introdução prática ao desenvolvimento com Java e Spring Boot. Durante o desenvolvimento, aprendi a:

    Criar APIs REST para operações CRUD.

    Configurar e utilizar o Spring Boot.

    Usar Maven no gerenciamento do projeto.

    Organizar o backend com controllers, services e repositórios.

    Aplicar boas práticas de programação orientada a objetos.

    Utilizar banco de dados H2 para facilitar o desenvolvimento local.

    Documentar APIs usando Swagger.

Esse primeiro contato com o Spring é a base para projetos mais avançados que pretendo desenvolver.
