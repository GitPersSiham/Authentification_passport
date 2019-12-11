

const User = require('../../src/models/User');

const DashboardController = {
home:(request,response) =>{
    response.render('dashboard', {
        user: request.user
      })
  
}



}
module.exports = DashboardController;