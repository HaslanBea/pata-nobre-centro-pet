'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models/Pet.js
      Pet.belongsTo(models.Cliente);

    }
  }
  Pet.init({
    nome: DataTypes.STRING,
    especie: DataTypes.STRING,
    raca: DataTypes.STRING,
    idade: DataTypes.INTEGER,
    clienteId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pet',
  });
  return Pet;
};