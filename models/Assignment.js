const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database'); 
const User = require('./User');
const Location = require('./Location');

const Assignment = sequelize.define('Assignments', {
  task: {
    type: DataTypes.STRING,
    allowNull: false
  },
  locationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Locations', 
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users', 
      key: 'id'
    }
  }
});


module.exports = Assignment;
