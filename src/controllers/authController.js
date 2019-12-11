
const passport = require('passport');


const AuthController = {
getLogin:(request,response) =>{
    response.render('login')
  
},
postLogin:(request,response,next) =>{
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
      })(request, response, next);
},
getLogout:(request,response) =>{
    request.logout();
    request.flash('success_msg', 'Vous êtes déconnecté');
    response.redirect('/users/login');
}

}
module.exports = AuthController;