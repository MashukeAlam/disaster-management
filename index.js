const express = require('express');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const initializeDatabase = require('./config/database');


const app = express();

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'secret$$$',
  resave: false,
  saveUninitialized: false
}));


initializeDatabase()
  .then(sequelize => {
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database synchronized.');
    // fire server
    app.listen(3000, async () => {
      console.log('Server started on http://localhost:3000');
    });
  })
  .catch(err => {
    console.error('Error during database initialization:', err);
  });
