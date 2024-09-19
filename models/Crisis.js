const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const Location = require('./Location');
const CrisisType = require('./CrisisType');

const Crisis = sequelize.define('Crisis', {
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Location,
      key: 'id'
    }
  },
  crisisTypeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CrisisType,
      key: 'id'
    }
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  severity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Crisis;
