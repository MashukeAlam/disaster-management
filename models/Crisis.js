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
  }
});

module.exports = Crisis;
