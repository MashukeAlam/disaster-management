const {sequelize} = require('../config/database');
const { CrisisType} = require('../models');


async function seedCrisisTypes() {
  const crisisTypes = ['Earthquake', 'Tsunami', 'Flood', 'Hurricane', 'Volcano', 'Wildfire', 'Drought'];

  for (let name of crisisTypes) {
    await CrisisType.create({ name });
  }

  console.log('Crisis Types Seeded');
}

seedCrisisTypes();
