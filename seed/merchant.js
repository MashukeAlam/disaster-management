const {sequelize} = require('../config/database');
const { User, Donation, Crisis, Assignment, Location, Merchant, CrisisType, Inventory, Item } = require('../models');

async function seedMerchants() {
  const merchants = ['Ckash', 'Socket', 'Lexus'];
  await sequelize.sync(); 

  for (let name of merchants) {
    await Merchant.create({ name });
  }

  console.log('Merchants Seeded');
  await sequelize.close();

}

seedMerchants();
