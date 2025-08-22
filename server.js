const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const port = 3000;

// Conectar no banco SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite"
});

// Testar conexão
sequelize.authenticate()
  .then(() => console.log("Conectado ao SQLite ✅"))
  .catch(err => console.error("Erro ao conectar ❌", err));

app.get("/", (req, res) => {
  res.send("API do PetShop está rodando 🐾");
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
