const { sequelize } = require('../config/database');
const Location = require('../models/Location');

async function seedLocations() {
  try {
    await sequelize.sync();

    const locations = [
      'Dhaka', 'Chattogram', 'Khulna', 'Rajshahi', 'Barishal', 'Sylhet', 'Rangpur', 'Mymensingh', 'Jashore', 'Comilla', 
      'Bogra', 'Jamalpur', 'Sunamganj', 'Kurigram', 'Lalmonirhat', 'Pabna', 'Noakhali', 'Sherpur', 'Narsingdi', 'Gazipur'
    ];

    for (const location of locations) {
      await Location.findOrCreate({
        where: { name: location }
      });
    }

    console.log('Locations seeded successfully');
  } catch (err) {
    console.error('Error seeding locations:', err);
  } finally {
    await sequelize.close();
  }
}

seedLocations();
