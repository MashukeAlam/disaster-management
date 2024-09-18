const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const User = require('./User');
const Crisis = require('./Crisis');
const Merchant = require('./Merchant'); 

const Donation = sequelize.define('Donation', {
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: User,
      key: 'id'
    }
  },
  crisisId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Crisis,
      key: 'id'
    }
  },
  merchantId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Merchant,
      key: 'id'
    }
  }
});

module.exports = Donation;
