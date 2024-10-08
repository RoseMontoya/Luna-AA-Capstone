'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Icon extends Model {

    static associate(models) {
      // define association here
      Icon.hasMany(models.Entry, {
        foreignKey: 'iconId',
        onUpdate: 'CASCADE',
      })

      Icon.hasMany(models.Activity, {
        foreignKey: 'iconId',
        onUpdate: 'CASCADE',
      })
    }
  }
  Icon.init({
    name: {
      type: DataTypes.STRING(),
      unique: true,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Icon',
  });
  return Icon;
};
