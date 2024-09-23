const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const Transaction = sequelize.define('Transaction', {
    type: {
      type: DataTypes.ENUM('purchase', 'spend'),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    }
  });

module.exports = Transaction;