const express = require('express')
const passport = require("passport")
const passportLocalMongoose = require("passport-local-mongoose")
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user.model')
const port = process.env.PORT
const mongoose = require('mongoose')
const findorcreate = require('mongoose-findorcreate')

passport.use(User.createStrategy());


passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

if (!port) {
    var googleCallbackURL = "http://localhost:3001/auth/google/Todo-list";
  } else {
    var googleCallbackURL = "https://www.googleapis.com/oauth2/v3/userinfo";
  }
  
  passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3001/auth/google/Todo-list",
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

//   passport.use(new GoogleStrategy({
//     clientID: process.env.CLIENT_ID,
//     clientSecret: process.env.CLIENT_SECRET,
//     callbackURL: "http://localhost:3001/auth/google/Todo-list",
//     userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
//   },
//   function (accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({
//       providedId: profile.id
//     }, {
//       _id: new mongoose.Types.ObjectId(),
//       name: profile.displayName,
//       provider: profile.provider,
//       email: profile.emails[0].value,
//       username: profile.id,
//       authLevel: "User"
//     }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));

