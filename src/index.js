
const dotenv =require('dotenv')
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const router  = require ('./router')
const app = express();

dotenv.config();
// Passport Config
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.use(express.static('public'));
// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
// Connect flash
app.use(flash());

app.use (router);

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes

app.use('/users', require('./router.js'));

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URI ,
  { useNewUrlParser: true },
  (err) => {
    if (err) {
      console.log(err);
   
      return;
    }
    console.log('Mongoose connected');

    app.listen(PORT,
      () => {
        console.log(`App running on port ${PORT}`);

      });

  });