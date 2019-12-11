module.exports = {
    ensureAuthenticated: function(request, response, next) {
      if (request.isAuthenticated()) {
        return next();
      }
      request.flash('error_msg', 'Veuillez vous connecter pour voir cette ressource');
      response.redirect('/users/login');
    },
    forwardAuthenticated: function(request, response, next) {
      if (!request.isAuthenticated()) {
        return next();
      }
      response.redirect('/dashboard');      
    }
  };
  