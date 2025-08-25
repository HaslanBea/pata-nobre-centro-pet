# Notas e Descrição por Baixo dos Panos

---

## Primeiro passo [Front-End]  

Nesse projeto é fundamental a **facilidade** e o **visual** do site, para ficar atrativo e fácil do usuário usar.

Vamos criar o **`index.html`**, que é a *HomePage* — o primeiro contato do cliente com o nosso projeto.  

Nessa HomePage vamos passar as informações mais relevantes do petshop, respondendo de forma clara:

- O que oferecemos?
- Por que devo contratar?
- Como surgiu?
- Quais as vantagens?

Essas perguntas vêm naturalmente, e essa tela precisa respondê-las.

---

## Criando o `index.html`

Usando o atalho do **Emmet** (`!` + `Enter`), o arquivo já vem composto por:

- `<head>` (configurações básicas, título, meta tags)
- `<body>` (conteúdo principal do site)

Exemplo inicial:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pata Nobre – Centro Pet</title>
</head>
<body>
  
</body>
</html>
```
---

## Banco de Dados – Primeiros Passos

### Dependências
Instalamos os pacotes principais para trabalhar com banco de dados e servidor:

- **express** → servidor web
- **sqlite3** → banco de dados leve e prático para desenvolvimento
- **sequelize** → ORM para facilitar a manipulação de tabelas com JavaScript
- **nodemon** → utilitário de desenvolvimento para reiniciar o servidor automaticamente

Comando utilizado:

```bash
npm init -y
npm install express sqlite3 sequelize
npm install --save-dev nodemon
```
---

# Package.js 

#### Nesse arquivo Adicionamos o script para rodar o servidor em modo desenvolvimento:

```
"scripts": {
  "dev": "nodemon server.js"
}

```
---

# Sobre o Serve.js 

#### O coraçao do back-end, o serve.js esta em prontidao quando se trata de funcionalidade, o arquivo que vai conectar nosso banco de dados, iniciar nossa caixa de ferramentas o express, que vai permitir a criaçao de URLs que serao nossas rotas, fazer requisiçoes e respostas, middleware funçoes que permitem.

#### Para iniciar o express e sequilize faremos no inicio do arquivo duas const que vao receber ambas ferramentas e iniciar tambem a porta em qual vamos rodar nossa aplicaçao, desta forma:

```
const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const port = 3000;
```

### Vamos conexçao com banco de dados:

```
// Conectar no banco SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite"
});
```

#### **dialect** → é o tipo de banco de dados que o Sequelize vai usar.

#### **"sqlite"** significa que estamos usando SQLite.

#### Se fosse MySQL, seria "mysql", PostgreSQL "postgres", etc.

#### Basicamente: fala pro Sequelize como se comunicar com o banco.

#### **storage** → é o arquivo físico do banco de dados.

#### No SQLite, o banco é apenas um arquivo .sqlite.

#### "database.sqlite" significa que os dados vão ser salvos nesse arquivo.

---

# Testando a Conexçao

#### .authenticate() é um método do Sequelize que testa se a conexão com o banco de dados está funcionando.

#### **.then(...)** → executa se a conexão der certo.

##### **.catch(...)** → executa se der algum erro.

#### Ou seja, essas duas linhas servem para garantir que seu servidor consegue falar com o banco antes de seguir adiante.

```
sequelize.authenticate()
  .then(() => console.log("Conectado ao SQLite ✅"))
  .catch(err => console.error("Erro ao conectar ❌", err));
```
--- 
### Rota raiz do servidor

```
app.get("/", ...)
```

#### Sim, "/" é o caminho da URL.

#### Quando você acessa **http://localhost:3000/**, está pedindo a rota raiz ("/") do servidor.

#### **req** → dados que o cliente envia

#### **res** → resposta que o servidor envia

#### Dentro do bloco você decide o que será enviado ao usuário (HTML, texto, JSON, etc.)

#### **app.listen(port, ...)**

#### Esse comando faz o servidor “ouvir” a porta definida.

#### **port = 3000** significa que você acessará http://localhost:3000.

#### O callback é só para logar que o servidor está rodando.


```
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

```
---

# Banco de Dados 🎲

#### Aqui vamos criar o modelos, que seria os dados como nome, idade, cpf conato do cliente e dados dos pet's. 

#### E as demais tabelas como a de serviços, para esta criaçao e decidi usar os comandos no terminal com npx sequelize-cli, uma ferramenta poderosa e que facilita toda digitaçao.

#### Para iniciar no nosso projeto:

```
npm install --save-dev sequelize-cli
npx sequelize-cli init
```

#### sso vai criar a estrutura básica:

#### config/
#### models/
#### migrations/
#### seeders/


#### config/ → arquivo de configuração do banco (config.json)

#### models/ → modelos do Sequelize
#### migrations/ → arquivos que criam/alteram tabelas
#### seeders/ → para popular dados iniciais

## No config/config.json, coloque algo assim:

```
{
  "development": {
    "dialect": "sqlite",
    "storage": "./database.sqlite"
  },
  "test": {
    "dialect": "sqlite",
    "storage": ":memory:"
  },
  "production": {
    "dialect": "sqlite",
    "storage": "./database.sqlite"
  }
}

```

# Para a Criaçao das Tabelas

```
CLIENTE;
npx sequelize-cli model:generate --name Cliente --attributes nome:string,idade:integer,cpf:string,telefone:string,email:string,endereco:string

obs: foi criado o campo senha, para login do usuario no site.

PET'S;
npx sequelize-cli model:generate --name Pet --attributes nome:string,especie:string,raca:string,idade:integer,clienteId:integer

SERVIÇOS;
npx sequelize-cli model:generate --name Servico --attributes nome:string,descricao:string,preco:decimal

AGENDAMENTOS;
npx sequelize-cli model:generate --name Agendamento --attributes petId:integer,servicoId:integer,data:date,status:string

```


---
# Para as Rotas  

#### Vamos criar uma pasta chamada, "routes" que vai conter todos os arquivos das rotas dos modelos(Cliente, Pets, etc...), nisso cada arquivo vai ter o CRUD(Create, Edit, Delete, etc...).

## Clientes

#### Nome do arquivo "clientes.js", nele vamos criar os endpoits do CRUD iniciando pela criaçao de um novo usario.

#### Vamos importar o modelo e a ferramenta certa:

```
const express = require('express'); //Importa um frameowrk para a aplicaçao.
const router = express.Router(); //Cria um route que pode montar um conjuto de rotas e ajuda a modularizzar a aplicaçao.
const { Cliente } = require('../models') //Importa o modelo do cliente.
```
#### Para a criaçao da primeira rota:

```
// Criar Cliente
router.post('/', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```
#### Voce cria um objeto, chamado de **const cliente**, que recebe uma espera assíncrona, marcada pelo **await**, e esse **await** aguarda a conclusão de uma operação que usa o **ORM (Object-Relational Mapping)** do modelo do cliente, o **Cliente**. Em outras palavras, você está chamando o método **create** do modelo **Cliente** como **Cliente.create(...)**. O que entra como parâmetro nesse **create(...)** é o corpo da requisição **(req.body)**, ou seja, os dados enviados pelo cliente **(nome, email, telefone, etc.)**. Assim, quando a operação assíncrona completa, ela retorna o registro recém-criado, que é atribuído à constante **cliente**. Se der algum erro, o fluxo caí no bloco de erro do **try/catch**.

#### Cliente:
#### ✅ post - create
#### ✅ get - buscar
#### ✅ put - edit por id
#### ✅ delet - delete pir id 
#### ✅ get - buscar por id
---
---

Criar todas as rotas CRUD (Cliente, Pet, Serviço, Agendamento) → próximo passo;

ROTAS

Cliente:
✅ post - create
✅ get - buscar
✅ put - edit por id
✅ delet - delete pir id 
✅ get - buscar por id

Pet:
✅post - create 
✅get - buscar
✅put - editar por id 
✅get - buscar por id
✅delete - delete por id

serviços:
✅post - create 
✅get - buscar
✅put - editar por id 
✅get - buscar por id
✅delete - delete por id

agendamento:
✅post - create 
✅get - buscar
✅put - editar por id 
✅get - buscar por id
✅delete - delete por id 



Testar todas as rotas no Postman → garantir que tudo funciona

Conectar o front-end usando fetch → consumir essas rotas

Criar o front-end completo → HTML, CSS e JS, usando os dados das rotas

--- 
✅ Dicas para seguir o checklist

Crie cada arquivo de rotas separado (clientes.js, pets.js, etc.)

Implemente CRUD básico primeiro, sem autenticação

Teste cada rota no Postman antes de passar para a próxima

Depois adicione hash da senha e JWT nas rotas de Cliente

Só então parta para a conexão com o front-end