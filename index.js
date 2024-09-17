const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {sequelize, initializeDatabase} = require('./config/database');


const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // This line is important for URL-encoded data

app.use(session({
  secret: 'secret$$$',
  resave: false,
  saveUninitialized: false
}));


initializeDatabase()
  .then(() => {
    // use routes
    const registerRouter = require('./routes/register');
    app.use('/', registerRouter);

    // fire server
    app.listen(3000, () => {
      console.log(`Server running on http://localhost:${3000}`);
      sequelize.sync();
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
  });