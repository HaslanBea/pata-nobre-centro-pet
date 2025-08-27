# 🐾 Projeto Petshop – Documentação Técnica

---

## 🎨 Front-End  

O **visual** e a **facilidade de uso** do site são fundamentais para atrair e reter usuários.  
Nosso ponto de partida é o arquivo `index.html` (Home Page), que deve responder claramente às perguntas:  

- O que oferecemos?  
- Por que contratar nossos serviços?  
- Como surgiu o petshop?  
- Quais são as vantagens para o cliente?  

### Estrutura inicial (`index.html`)

Com o atalho **Emmet** (`! + Enter`), já temos a base:

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Pata Nobre – Centro Pet</title>
</head>
<body>
  <!-- Conteúdo da Home -->
</body>
</html>
```


# 🗄️ Back-End

### Dependências principais

Rodar no terminal:

```
npm init -y
npm install express sqlite3 sequelize
npm install --save-dev nodemon
```

express → servidor web

sqlite3 → banco de dados leve e prático

sequelize → ORM para manipular tabelas em JavaScript

nodemon → reinicia o servidor automaticamente em desenvolvimento

# ⚙️ package.json

Adicionar script para rodar em modo desenvolvimento:

```
"scripts": {
  "dev": "nodemon server.js"
}
```

# 🚀 server.js

Arquivo principal do back-end: conecta o banco, inicializa o Express e define rotas.

```
const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const port = 3000;

// Conexão com SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite"
});

// Testar conexão
sequelize.authenticate()
  .then(() => console.log("Conectado ao SQLite ✅"))
  .catch(err => console.error("Erro ao conectar ❌", err));

// Rota raiz
app.get("/", (req, res) => {
  res.send("Servidor funcionando!");
});

// Start
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
```

# 🎲 Banco de Dados
Estrutura inicial com Sequelize CLI

```
npm install --save-dev sequelize-cli
npx sequelize-cli init
```

### Isso gera as pastas:

config/ → configuração do banco

models/ → modelos do Sequelize

migrations/ → arquivos que criam/alteram tabelas

seeders/ → dados iniciais para popular

Arquivo config/config.json exemplo:

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

# Criação das tabelas

Cliente

```
npx sequelize-cli model:generate --name Cliente --attributes nome:string,idade:integer,cpf:string,telefone:string,email:string,endereco:string,senha:string
```

Pet

```
npx sequelize-cli model:generate --name Pet --attributes nome:string,especie:string,raca:string,idade:integer,clienteId:integer
```

Serviço

```
npx sequelize-cli model:generate --name Servico --attributes nome:string,descricao:string,preco:decimal
```

Agendamento

```
npx sequelize-cli model:generate --name Agendamento --attributes petId:integer,servicoId:integer,data:date,status:string
```

🌐 Rotas

Criar pasta routes/ para os arquivos de cada modelo (Cliente, Pet, etc.), cada um com seu CRUD.

Exemplo: clientes.js

```
const express = require('express');
const router = express.Router();
const { Cliente } = require('../models');

// Criar Cliente
router.post('/', async (req, res) => {
  try {
    const cliente = await Cliente.create(req.body);
    res.status(201).json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Buscar Cliente por ID
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    res.json(cliente);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Atualizar Cliente
router.put('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });

    await cliente.update(req.body);
    res.json(cliente);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Deletar Cliente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByPk(req.params.id);
    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });

    await cliente.destroy();
    res.json({ message: "Cliente deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
```

# 🎨 Front-End

Para a interface, utilizaremos HTML, CSS e Bootstrap, garantindo agilidade no desenvolvimento e responsividade nativa.


---

Quer que eu já salve esse `.md` em um **arquivo pronto pra download** (ex: `README.md`) ou você prefere copiar e colar no seu projeto direto?


---
#
#


Conectar o front-end usando fetch → consumir essas rotas

Criar o front-end completo → HTML, CSS e JS, usando os dados das rotas


/meu-projeto
│── index.html
│── /componentes
│    └── services.js   (fetch CRUD de serviços)
│    └── pets.js       (fetch CRUD de pets)
│    └── clientes.js   (fetch CRUD de clientes)
│    └── agendamentos.js (fetch CRUD de agendamentos)
│── /public
│    └── /styles
│         └── style.css
│── /img 
     └── logo.png
     └── header.jpg