const express = require('express')
const passport = require('passport')
const Router = express.Router()
const User = require("../models/user.model").User
const session = require("express-session")
const mongoose = require("mongoose")

Router.get("/", function (req,res) {
  const  statusFlag = req.query.status
    res.render("login", {statusFlag:statusFlag})
})

Router.post("/login", function(req,res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    if (req.session.return){
        var returnTo = req.session.returnTo
    }

    req.login(user, function(err){
        if(err){
            console.log(err)
        } else{
            passport.authenticate("local")(req, res, function() {
                req.session.admin = {
                    email:req.session.passport.user.email,
                    title:req.session.passport.user.authLevel
                }
                if (returnTo) {
                    delete req.session.returnTo;
                    res.redirect(returnTo)
                  } else {
                    res.redirect("/list")
                  }          
            })
        }
    })
})

Router.get('/register', function(req, res) {
  res.render('register');
});

// Router.get("/register", function (req, res) {
//   res.sendfile(__dirname + "/register.html");
// });


Router.post("/register", function (req, res) {
  User.register(
    {
      _id: new mongoose.Types.ObjectId(),
      name: req.body.username,
      username: req.body.username,
      email: req.body.emailAddress,
      // imgSrc: "/images/articles/person.jpg",
      // authLevel: "User",
    },
    req.body.password,
    function (err, user) {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, function () {
          res.redirect("/list");
        });
      }
    }
  );
});

Router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile','email']
}))

Router.get('/auth/google/Todo-list', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

// Router.get('/google/user',
//     passport.authenticate('google', {failureRedirect: '/auth?statusFlag=4'}),
//     function (req, res) {
//       req.session.user = req.user 
//       var returnTo = req.session.returnTo;
//       if (returnTo) {
//         delete req.session.returnTo;
//         res.redirect(returnTo)
//       } else {
//         res.redirect("/user")
//       }
//     });



    Router.get('/logout', function(req, res, next) {
      req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });

    Router.get('/submit', function(req, res, next) {
      req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    });

    // Router.get("/submit", function(req, res){
    //   if (req.isAuthenticated()){
    //     res.render("submit");
    //   } else {
    //     res.redirect("/");
    //   }
    // });
    
    // Router.post("/submit", function(req, res){
    //   const submittedList = req.body.secret;
    
    //   User.updateOne(req.user.id, function(err, foundUser){
    //     if (err) {
    //       res.send(err);
    //     } else {
    //       if (foundUser) {
    //         foundUser.secret = submittedList;
    //         foundUser.save(function(){
    //           res.redirect("/");
    //         });
    //       }
    //     }
    //   });
    // });
    
    module.exports = Router