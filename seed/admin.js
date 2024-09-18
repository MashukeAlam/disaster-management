require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 

async function seedAdmin() {
  try {
    const adminData = {
      username: 'admin',
      email: 'admin@admin.com',
      password: 'admin123', 
      isAdmin: true
    };

    const existingAdmin = await User.findOne({ where: { email: adminData.email } });
    if (existingAdmin) {
      console.log('Admin user already exists. No changes made.');
      return;
    }

    const hashedPassword = await bcrypt.hash(adminData.password, 10);

    await User.create({
      username: adminData.username,
      email: adminData.email,
      password: hashedPassword,
      isAdmin: adminData.isAdmin
    });

    console.log('Admin user created successfully.');
    return;
  } catch (err) {
    console.error('Error seeding admin user:', err);
    return;
  }
}

seedAdmin();
