const {sequelize} = require('../config/database'); // adjust the path
const Item = require('../models/Item');
const Inventory = require('../models/Inventory');

async function seedReliefSupplies() {
  try {
    const reliefItems = [
      { name: 'Puffed Rice' },
      { name: 'Biscuits' },
      { name: 'Saline' },
      { name: 'Band-Aids' },
      { name: 'Paracetamol' },
      { name: 'Flattened Rice' },
      { name: 'Sugar' },
      { name: 'Mineral Water' },
      { name: 'Antiseptics' },
      { name: 'Flashlights' }
    ];

    for (const itemData of reliefItems) {
      const item = await Item.create(itemData);
      await Inventory.create({ quantity: Math.floor(Math.random() * 100), ItemId: item.id });
    }

    console.log('Relief supplies have been seeded successfully.');
  } catch (err) {
    console.error('Error seeding relief supplies:', err);
  } finally {
    await sequelize.close();
  }
}

seedReliefSupplies();
