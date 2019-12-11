const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../../src/models/User');

const RegistrationController = {
getRegister:(request,response) =>{
    response.render('register')
  
},
postRegister:(request,response) =>{
    const { name, email, password, password2 } = request.body;
    let errors = [];
  
    if (!name || !email || !password || !password2) {
      errors.push({ msg: 'Veuillez saisir tous les champs' });
    }
  
    if (password != password2) {
      errors.push({ msg: 'Les mots de passe ne correspondent pas' });
    }
  
    if (password.length < 6) {
      errors.push({ msg: 'Le mot de passe doit être au moins de 6 caractères' });
    }
  
    if (errors.length > 0) {
      response.render('register', {
        errors,
        name,
        email,
        password,
        password2
      });
    } else {
      User.findOne({ email: email }).then(user => {
        if (user) {
          errors.push({ msg: 'Cet email existe déja' });
          response.render('register', {
            errors,
            name,
            email,
            password,
            password2
          });
        } else {
          const newUser = new User({
            name,
            email,
            password
          });
        
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  request.flash(
                    'success_msg',
                    'Vous êtes maintenant inscrit et pouvez vous connecter'
                  );
                  console.log(newUser)
                  response.redirect('/users/login');
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
    }
  
}

}
module.exports = RegistrationController;