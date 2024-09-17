require('dotenv').config();

const { Sequelize } = require('sequelize');

// sequelize config
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

// try connecting
sequelize.authenticate()
  .then(() => console.log('MySQL connected.'))
  .catch(err => console.log('Error: ' + err));

module.exports = sequelize;
