const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./config/auth');
const flash = require('connect-flash');
const cors = require('cors');
const {sequelize, initializeDatabase} = require('./config/database');

const { User, Donation, Crisis, Assignment, Location, Merchant, CrisisType, Inventory, Item, Total, Transaction } = require('./models');



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
    const assignmentRouter = require('./routes/assignment');
    const crisisRouter = require('./routes/crisis');
    const donationRouter = require('./routes/donation');
    const itemRouter = require('./routes/item');
    const reportRouter = require('./routes/report');
    
    app.use('/', registerRouter);
    app.use('/', authRouter);
    app.use('/', profileRouter);
    app.use('/', userRouter);
    app.use('/', locationRouter);
    app.use('/', assignmentRouter);
    app.use('/', crisisRouter);
    app.use('/', donationRouter);
    app.use('/', itemRouter);
    app.use('/', reportRouter);

    // fire server
    app.listen(3000, '0.0.0.0', () => {
      // sequelize.sync({alter: true, force: true});
      // sequelize.sync({alter: true, force: false});
      console.log(`Server running on http://localhost:${3000}`);
    });
  })
  .catch(err => {
    console.error('Failed to initialize database:', err);
  });