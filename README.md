# Multi data-source API Scaffold

This project it's an backbone for API development using multi database source. It was built in NodeJS 12.8, and it comes with Hapi.js, jwt authentication, base unit test, pm2 monitoring, and the all infra-structure already dockerized for development enviroment tests.

## Pre-requirements

> - **Docker** version 19.03 or above
> - **Docker-machine** version 0.16.0, or above
> - **Docker-compose** version 1.26.0, or above
> - **Node** version 12.8, or above - [Node Donwload](https://nodejs.org/pt-br/download/)
> - **NPM** version 6.14.4, or above- [Npm Donwload](https://www.npmjs.com/package/download)

## Installing

> Clone this project in you machine using the command below:
> ```
> 	git clone https://github.com/andersonRocha091/multidatasource-api-scaffold.git
> ```
> Go to the project folder at your terminal:
> ```
> 	cd multidatasource-api-scaffold
> ```
> Create a .env file with the following params for setting your environment:
> ```
> MONGO_HOST=<mongo host>
> MONGO_PORT=<mongo port>
> MONGO_INITDB_DATABASE=<mongo>
> MONGO_INITDB_ROOT_USERNAME=<rootunsername>
> MONGO_INITDB_ROOT_PASSWORD=<rootpassword>
> DATABASE_USER=<user>
> DATABASE_PASSWORD=<password>
> DATABASE_NAME=<databasename>
> ```
> Inside the aplication folder src/config, change the params in .env.dev, and .env.prod :
> ```
> JWT_KEY=<YOUR_JWT_HASH_KEY>
> PORT=<DESIRED_PORT>
> SALT_PWD=<DESIRED_SALT>
> MONGODB_URL=mongodb://<user>:<password>@<mongo host>:<mongo port>/<databasename>
> POSTGRES_URL=postgres://<user>:<password>@<host | localhost(dev)>/<database> 
>
> ```

## Execução

Esse é talvez o tópico mais importante, faça com atenção.

Através das informações especificadas nele, outras pessoas poderam visualizar e testar o funcionamento da sua aplicação.

> Exemplo: 
>
> Após ter configurado o projeto e ter aguardado a instalação das dependencias de desenvolvimento, execute o comando:
> ```
> 	yarn start
> ```
> A aplicação estará disponível para visualização em seu navegador, caso isso não aconteça automaticamente abre o navegador no seguinte endereço: _localhost:3000_

## Funcionalidades

Imagine aqui que outra pessoa configurou e executou o seu projeto, apresente então as principais funcionalidade que seu projeto tem e onde encontrar, dessa forma ela vai conseguir testar e usar tudo o que foi desenvolvido.

Você ao fazer isso evita que o usuário da aplicação, por não ter conhecimento, pule ou não veja o que seu projeto é capaz de fazer.

> Exemplo: 
>
> Este projeto visa a funcionalidade de ser: 
> - Template de README.md em PORTUGUÊS - PTBR;
> - Artigo explicando e exemplificando tópicos de documentação;


## Testes

Sua aplicação contempla testes? Se sim, explique como executar os testes automatizados para este sistema; você também pode anexar aqui as capturas de telas (prints) dos testes que você fez ou de um determinado comportamento da aplicação.

Tipos de testes: 
- Unitários
- Performance
- Segurança
- Regressão

Dentre outros...
> Exemplo de comando para execução de testes em uma aplicação:
> ```
> 	yarn test
> ```

## Links

Mesmo que as informações possam estar sendo apresentadas no seu código, pode ocorrer de algumas pessoas não terem total entendimento sobre o que foi proposto ou determinados termos técnicos, você pode incluir um resumo dos links mais úteis para leitura dessas termos, por exemplo.

> Exemplo: 
> - [Guia de Markdown](https://docs.pipz.com/central-de-ajuda/learning-center/guia-basico-de-markdown#open)
> - [Como formatar o Readme?](https://medium.com/@raullesteves/github-como-fazer-um-readme-md-bonit%C3%A3o-c85c8f154f8#:~:text=md%20%C3%A9%20um%20arquivo%20markdown,tags%20tamb%C3%A9m%20funcionam%2C%20veremos%20adiante.&text=Basta%20copiar%20o%20que%20o,e%20colar%20no%20README.md.)


## Contribuições

Seu projeto pode receber contribuições da comunidade? Se sim, utilize esse tópico;
aqui você coloca as informações resumidas de como a pessoa poderá o ajudar com o projeto.

> Exemplo:
> - Para contribuir com esse projeto, fork este projeto, faça as modificações que tens desejo e crie um pull request; veja as instruções detalhadas no arquivo _CONTRIBUTING.md_.

## Autores

Informe o nome das pessoas envolvidas no desenvolvimento do projeto e se quiser atribua as respectivas redes sociais para contato da comunidade;

> Exemplo (Deste projeto):
> - **Lucas Anderson Lima** - Idealizador e Escritor da Documentação - [Github](https://github.com/LuAnderson) | [Site](http://lucasanderson.com.br/)


## Licença 

Existem vários tipos de licença open souce, para saber qual condiz mais com o seu projeto e até mesmo entender mais detalhadamente, recomendo verificar os tipos no seguinte site: [Escolha uma Licença](http://escolhaumalicenca.com.br/).

> Exemplo: 
> 
> MIT License (MIT)

## Agradecimentos 

Aqui, sinta-se a vontade a agradecer quem você desejar, tenha sido uma pessoa que a incentivou no projeto, inspirador, colaborador, amigos, etc.  

> Exemplo: 
> 
> Comunidade Front <3

---
Autor ❤ [Lucas Anderson Lima](http://lucasanderson.com.br/)
