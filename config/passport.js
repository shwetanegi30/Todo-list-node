const passportLocalMongoose = require("passport-local-mongoose")
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const port = process.env.PORT;
const findOrCreate = require("mongoose-findorcreate")


//Load user model
const User = require('../models/user.model').User
const userSchema = require('../models/user.model').userSchema

module.exports = function (passport) {

    if (!port) {
        var googleCallbackURL = "http://localhost:3001/auth/google/Todo-list";
    } else {
        var googleCallbackURL = "";
    }

    userSchema.plugin(passportLocalMongoose);

    passport.use(User.createStrategy());

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    passport.use(new GoogleStrategy({
        clientID: process.env.G_CLIENT_ID,
        clientSecret: process.env.G_CLIENT_SECRET,
        callbackURL: googleCallbackURL,
        userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
      },
      function (accessToken, refreshToken, profile, cb) {
        // console.log(profile);
        User.findOrCreate({providedId: profile.id}, {
          _id: new mongoose.Types.ObjectId(),
          name: profile.displayName,
          provider: profile.provider,
          email: profile.emails[0].value,
        //   imgSrc: profile.photos[0].value,
          username: profile.id,
          authLevel: "User"
        }, function (err, user) {
          return cb(err, user);
        });
      }
    ));

}








