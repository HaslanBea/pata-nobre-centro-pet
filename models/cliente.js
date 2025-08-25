'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cliente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models/Cliente.js
      Cliente.hasMany(models.Pet);

    }
  }
  Cliente.init({
    nome: DataTypes.STRING,
    idade: DataTypes.INTEGER,
    cpf: DataTypes.STRING,
    telefone: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    endereco: DataTypes.STRING,
    senha: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 100] // mínimo 6 caracteres
      }
    }
  }, {
    sequelize,
    modelName: 'Cliente',
  });
  return Cliente;
};
