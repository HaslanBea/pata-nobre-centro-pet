'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {

    static associate(models) {
      Cliente.hasMany(models.Pet, { foreignKey: "clienteId" });
    }

    // 👉 Método usado no login para comparar senha digitada com senha hash
    validarSenha(senhaDigitada) {
      return bcrypt.compareSync(senhaDigitada, this.senha);
    }
  }

  Cliente.init(
    {
      nome: DataTypes.STRING,
      idade: DataTypes.INTEGER,
      cpf: DataTypes.STRING,
      telefone: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true }
      },
      endereco: DataTypes.STRING,
      senha: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [6, 100] }
      }
    },
    {
      sequelize,
      modelName: 'Cliente',

      // 🔐 Aplica hash antes de criar/atualizar
      hooks: {
        beforeCreate: async (cliente) => {
          if (cliente.senha) {
            const salt = bcrypt.genSaltSync(10);
            cliente.senha = bcrypt.hashSync(cliente.senha, salt);
          }
        },
        beforeUpdate: async (cliente) => {
          if (cliente.changed('senha')) {
            const salt = bcrypt.genSaltSync(10);
            cliente.senha = bcrypt.hashSync(cliente.senha, salt);
          }
        }
      }
    }
  );

  return Cliente;
};
8