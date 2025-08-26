const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

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

// Rotas
app.use('/clientes', require('./routes/clientes'));
app.use('/pets', require('./routes/pets'));
app.use('/servicos', require('./routes/servicos'));
app.use('/agendamentos', require('./routes/agendamento'));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
