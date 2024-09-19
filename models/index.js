// Import all the models
const Assignment = require('./Assignment');
const Crisis = require('./Crisis');
const CrisisType = require('./CrisisType');
const Donation = require('./Donation');
const Inventory = require('./Inventory');
const Item = require('./Item');
const Location = require('./Location');
const Merchant = require('./Merchant');
const User = require('./User');

Item.hasOne(Inventory, { onDelete: 'CASCADE' });
Inventory.belongsTo(Item);
Assignment.belongsTo(User, { foreignKey: 'userId' });
Assignment.belongsTo(Location, { foreignKey: 'locationId' });
User.hasOne(Assignment, { foreignKey: 'userId' });
Location.hasMany(Assignment, { foreignKey: 'locationId' });
Donation.hasOne(User, { foreignKey: 'userId' });
Donation.hasOne(Crisis, { foreignKey: 'crisisId' });
Donation.hasOne(Merchant); 
Crisis.belongsTo(Location, { foreignKey: 'locationId', as: 'location' });
Crisis.belongsTo(CrisisType,{ foreignKey: 'crisisTypeId', as: 'crisisType' });



// Export all the models
module.exports = {
  Assignment,
  Crisis,
  CrisisType,
  Donation,
  Inventory,
  Item,
  Location,
  Merchant,
  User,
};
