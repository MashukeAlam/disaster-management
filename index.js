const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const passport = require('./config/auth');
const flash = require('connect-flash');
const cors = require('cors');


const {sequelize, initializeDatabase} = require('./config/database');


const app = express();

app.use(cors({
  origin: 'http://localhost:4200', 
  credentials: true
}));


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
    const profileRouter = require('./routes/profile');
    const userRouter = require('./routes/user');
    const locationRouter = require('./routes/location');
    
    app.use('/', registerRouter);
    app.use('/', authRouter);
    app.use('/', profileRouter);
    app.use('/', userRouter);
    app.use('/', locationRouter);

    // fire server
    app.listen(3000, () => {
      console.log(`Server running on http://localhost:${3000}`);
      sequelize.sync({alter: true});
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
  });