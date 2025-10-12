const express = require("express");
const { Sequelize } = require("sequelize");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static('public'));

const cors = require('cors');
app.use(cors());


// Conectar no banco SQLite
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite"
});

// Testar conexão
sequelize.authenticate()
  .then(() => console.log("Conectado ao SQLite ✅"))
  .catch(err => console.error("Erro ao conectar ❌", err));

// Testar conexão e sincronizar modelos
sequelize.authenticate()
  .then(() => console.log("Conectado ao SQLite ✅"))
  .catch(err => console.error("Erro ao conectar ❌", err));

// Sincronizar modelos com o banco
sequelize.sync({ force: false }) // force: false para não recriar tabelas
  .then(() => console.log("Modelos sincronizados com o banco ✅"))
  .catch(err => console.error("Erro ao sincronizar modelos ❌", err));

// Adicione isso antes das rotas
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

app.get("/", (req, res) => {
  res.send("API do PetShop está rodando 🐾");
});

app.use(express.json()); // para parsing de application/json
app.use(express.urlencoded({ extended: true })); // para parsing de application/x-www-form-urlencoded

// Rotas
app.use('/clientes', require('./routes/clientes'));
app.use('/pets', require('./routes/pets'));
app.use('/servicos', require('./routes/servicos'));
app.use('/agendamentos', require('./routes/agendamento'));

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
