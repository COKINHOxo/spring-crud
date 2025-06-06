
Spring CRUD

Este é meu primeiro projeto em Java, desenvolvido com o framework Spring Boot. O projeto foi criado usando o Spring Initializr e serve como avaliação para a disciplina de Análise e Desenvolvimento de Sistemas (ADS) na FATEC Mogi das Cruzes.
Sobre o Projeto

É uma aplicação simples que implementa as operações básicas de CRUD (Create, Read, Update, Delete), permitindo a manipulação de dados através de uma API REST.
Tecnologias Utilizadas

    Java 21

    Spring Boot

    Maven — gerenciador de dependências e build que vem junto com o Spring Initializr, facilita a execução e organização do projeto.

Como Executar

    Clone este repositório:

git clone https://github.com/COKINHOxo/spring-crud.git
cd spring-crud

    Execute o projeto utilizando Maven:

./mvnw spring-boot:run

No Windows, use:

mvnw.cmd spring-boot:run

    A aplicação estará rodando em http://localhost:8080

Endpoints Disponíveis

    GET /api/items — listar todos os itens

    GET /api/items/{id} — buscar um item pelo ID

    POST /api/items — criar um novo item

    PUT /api/items/{id} — atualizar um item existente

    DELETE /api/items/{id} — deletar um item

O que aprendi com este projeto

Este projeto foi uma ótima oportunidade para dar os primeiros passos no desenvolvimento com Java e Spring Boot. Durante o desenvolvimento, pude aprender e praticar conceitos importantes como:

    Criação de APIs REST para realizar operações básicas de CRUD (Create, Read, Update, Delete).

    Configuração e uso do Spring Boot, que facilita a construção de aplicações Java robustas e rápidas.

    Gerenciamento de dependências e build com Maven, mesmo que de forma inicial e automática, compreendendo sua importância no desenvolvimento Java.

    Estruturação de um projeto backend, entendendo como organizar pacotes, controllers, services e repositórios.

    Processo de desenvolvimento ágil e iterativo, já que o projeto foi criado para ser simples, mas com possibilidade de expansão futura.

Além disso, o projeto me ajudou a consolidar conhecimentos de programação orientada a objetos e boas práticas no desenvolvimento de software.

Este foi meu primeiro contato prático com uma aplicação Spring, e acredito que essa base será fundamental para projetos mais complexos que pretendo desenvolver.

Considerações Finais

Este projeto foi desenvolvido como aprendizado prático do ecossistema Spring e para fins acadêmicos. Futuramente pretendo evoluir e aprimorar suas funcionalidades.
