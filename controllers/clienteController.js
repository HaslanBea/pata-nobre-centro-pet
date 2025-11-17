const { Cliente } = require('../models');
const validarCPF = require('../utils/validarCPF');

module.exports = {

  // CADASTRAR CLIENTE
  async cadastrar(req, res) {
    try {

      // PEGAR CPF DO BODY
      const { cpf } = req.body;

      // VALIDAR CPF ANTES DE CADASTRAR
      if (!validarCPF(cpf)) {
        return res.status(400).json({ error: "CPF inválido." });
      }

      // Criar cliente normalmente
      const cliente = await Cliente.create(req.body);
      return res.status(201).json(cliente);

    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },

  // LOGIN DO CLIENTE
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      // Verificar se o cliente existe
      const cliente = await Cliente.findOne({ where: { email } });
      if (!cliente) {
        return res.status(400).json({ error: "Email não encontrado." });
      }

      // Validar senha usando o método do model
      const senhaCorreta = cliente.validarSenha(senha);
      if (!senhaCorreta) {
        return res.status(401).json({ error: "Senha incorreta." });
      }

      // Se tudo certo:
      return res.json({
        message: "Login realizado com sucesso!",
        cliente
      });

    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

};
