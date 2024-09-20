const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const Total = sequelize.define('Total', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
});

module.exports = Total;
