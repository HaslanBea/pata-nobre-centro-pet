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

# Aqui 

---

cria a conexçao sequelize centralizada 
Criar os modelos Cliente.js, Pet.js, Servico.js
Define colunas, tipos, restrições e relacionamentos.
Definir relacionamentos entre modelos.
precisa do gitingnore para a pasta node_modules



