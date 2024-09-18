const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const Merchant = sequelize.define('Merchant', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Merchant;
