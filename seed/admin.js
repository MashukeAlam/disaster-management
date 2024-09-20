require('dotenv').config();
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 
const {sequelize} = require('../config/database');

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

/*
  If you want some non admin users, run the following:
  curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=alex \
  --data password=123 \
  --data email=alex@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=blake \
  --data password=123 \
  --data email=blake@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=cameron \
  --data password=123 \
  --data email=cameron@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=david \
  --data password=123 \
  --data email=david@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=emily \
  --data password=123 \
  --data email=emily@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=frank \
  --data password=123 \
  --data email=frank@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=grace \
  --data password=123 \
  --data email=grace@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=harry \
  --data password=123 \
  --data email=harry@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=irene \
  --data password=123 \
  --data email=irene@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=james \
  --data password=123 \
  --data email=james@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=kate \
  --data password=123 \
  --data email=kate@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=lily \
  --data password=123 \
  --data email=lily@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=michael \
  --data password=123 \
  --data email=michael@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=nina \
  --data password=123 \
  --data email=nina@example.com

curl --request POST \
  --url 'http://localhost:3000/register/?=' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --header 'User-Agent: insomnia/8.6.0' \
  --cookie connect.sid=s%253A7RyWeR_RMv6QSlU3Jcsp4yCB60tR1TS8.0kKgol7C3rPeWqxFNlXMTRoaRoQyY0nTJBgbFmltnpk \
  --data username=olivia \
  --data password=123

*/

