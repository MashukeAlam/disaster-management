const { DataTypes } = require('sequelize');
const {sequelize} = require('../config/database');
const Item = require('./Item'); 

const Inventory = sequelize.define('Inventory', {
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

// Association (1 Item has 1 Inventory)
Item.hasOne(Inventory, { onDelete: 'CASCADE' });
Inventory.belongsTo(Item);

module.exports = Inventory;
