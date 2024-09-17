const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('./config/auth');
const flash = require('connect-flash');

const {sequelize, initializeDatabase} = require('./config/database');


const app = express();

// middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // This line is important for URL-encoded data


// Flash messages
app.use(flash());
app.use(session({
  secret: 'secret$$$',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

initializeDatabase()
  .then(() => {
    // use routes
    const registerRouter = require('./routes/register');
    const authRouter = require('./routes/auth');

    app.use('/', registerRouter);
    app.use('/', authRouter);

    // fire server
    app.listen(3000, () => {
      console.log(`Server running on http://localhost:${3000}`);
      sequelize.sync();
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
  });