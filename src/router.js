const dotenv =require('dotenv')
const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../src/middlewares/auth');
const DashboardController = require('./controllers/dashboardController');
const WelcomePagecontroller = require('./controllers/welcomepageController');
const AuthController = require('./controllers/authController');
const RegistrationController = require('./controllers/registrationController')

const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../src/models/User');

// Welcome Page

router.get('/', forwardAuthenticated,WelcomePagecontroller.welcome)

// Dashboard
router.get('/dashboard', ensureAuthenticated,DashboardController.home)

//login

router.get('/login',forwardAuthenticated, AuthController.getLogin )
      .post('/login',AuthController.postLogin)
      .get('/logout',AuthController.getLogout)

// Register Page
router.get('/register', forwardAuthenticated,RegistrationController.getRegister )
      .post('/register',RegistrationController.postRegister)


module.exports = router;

