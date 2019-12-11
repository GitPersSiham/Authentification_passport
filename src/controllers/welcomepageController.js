const express = require('express');



const WelcomePagecontroller = {
welcome:(request,response) =>{

    response.render('welcome');
}


}
module.exports = WelcomePagecontroller;