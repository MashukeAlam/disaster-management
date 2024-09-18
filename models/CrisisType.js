const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');

const CrisisType = sequelize.define('CrisisType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CrisisType;
