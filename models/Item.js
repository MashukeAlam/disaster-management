const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const Item = sequelize.define('Item', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  stock: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  }
});

module.exports = Item;
