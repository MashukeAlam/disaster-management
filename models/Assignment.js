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

Assignment.belongsTo(User, { foreignKey: 'userId' });
Assignment.belongsTo(Location, { foreignKey: 'locationId' });
User.hasMany(Assignment, { foreignKey: 'userId' });
Location.hasMany(Assignment, { foreignKey: 'locationId' });

module.exports = Assignment;
