const {sequelize} = require('../config/database');
const { User, Donation, Crisis, Assignment, Location, Merchant, CrisisType, Inventory, Item } = require('../models');


async function seedCrisisTypes() {
  const crisisTypes = ['Earthquake', 'Tsunami', 'Flood', 'Hurricane', 'Volcano', 'Wildfire', 'Drought'];
  await sequelize.sync(); 

  for (let name of crisisTypes) {
    await CrisisType.create({ name });
  }

  console.log('Crisis Types Seeded');
}

seedCrisisTypes();
