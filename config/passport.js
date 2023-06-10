const passportLocalMongoose = require("passport-local-mongoose")
const mongoose = require('mongoose')
const port = process.env.PORT;
const findOrCreate = require("mongoose-findorcreate")


//Load user model
const User = require('../models/user.model').User
const userSchema = require('../models/user.model').userSchema

module.exports = function(passport){

    if (!port) {
        var googleCallbackURL = "http://localhost:3001/auth/google/Todo-list";
      } else {
        var googleCallbackURL = "https://www.googleapis.com/oauth2/v3/userinfo";
      }
    
    userSchema.plugin(passportLocalMongoose);     

    passport.use(User.createStrategy());
    
    passport.serializeUser(function (user, done) {
        done(null, user);
      });
    
    passport.deserializeUser(function (user, done) {
        done(null, user);
      });
    

    }





  
  

