require('dotenv').config();
const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

async function initializeDatabase() {
  try {
    
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    // Create the database if it doesn't exist
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database "${process.env.DB_NAME}" created or already exists.`);

    await connection.end();

    // sequelize initialize
    const sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
      }
    );

    // try connect
    await sequelize.authenticate();
    console.log('MySQL connected and database ready...');
    
    return sequelize;
  } catch (err) {
    console.error('Error while creating or connecting to the database:', err);
  }
};

module.exports = initializeDatabase;

