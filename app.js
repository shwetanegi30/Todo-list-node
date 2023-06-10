require("dotenv").config(); 
const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require('express-session');  
const cookieParser = require('cookie-parser')
const passport = require("passport");
// const MongoStore = require('connect-mongo')(session);
const ConnectMongo = require('connect-mongo');
       
// const passportLocalMongoose = require("passport-local-mongoose");    
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const findOrCreate = require('mongoose-findorcreate');



const date = require("./utils/date")

const authRouter = require('./routes/auth.route')

const app = express();

const items = ["Buy Food", "Cook Food"];
const workItem = []

app.use(express.static("public"));

app.set("view engine", "ejs");

//------trust first proxy
app.set('trust proxy', 1) 

//-----increase the limit
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

//-----declare Public folder to access resources
app.use(express.static(path.join(__dirname, "./public")))

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


    
  
mongoose.connect("mongodb://localhost:27017/todoList", { useNewUrlParser: true });

// const connection = mongoose.connection;

// mongoose.set('useCreateIndex', true)



app.get("/", function (req, res) {
  res.render("home");
});

app.get("/list", function (req, res) {
  let day = date.getDate();

  res.render("list", { listTitle: day, newListItem: items });
});


app.post("/list", function (req, res) {
  let item = req.body.newItem;

//   if(req.body.list === "work"){
//     workItem.push(item)
//     res.redirect("/work")
//  } else{
//  items.push(item)
//  res.redirect("/list")
//  }

  if (err) {
    console.log(err);
  } else {
    items.push(item);
    res.redirect("/list");
  }
});


// app.get("/work", function(req,res){
//   res.render("list", {listTitle:"Work List", newListItem: workItem})
// })

// app.post("/work", function(req,res){
//   let item = req.body.newItem
//   workItem.push(item)
//   res.redirect("/work")
// })

//-----set up cookie middleware
app.use(cookieParser())

app.use(session({
  cookieName: 'session',
  secret: "Eto ni moi belocipiyat",
  // store: new MongoStore({mongooseConnection:connection,ttl:7*24*60*60}),
  duration: 7*24*60*60,
  secure:true,
  activeDuration: 5 * 60 * 1000,
  resave: false,
  saveUninitialized: false
}));

require('./config/passport')(passport)
   
app.use(passport.initialize());
app.use(passport.session());


//------set up isAuthenticated middleware
app.use(function(req,res,next){
  res.locals.isAuthenticated = req.isAuthenticated()
  next()
})


app.use('/auth', authRouter)


app.listen(3001 , function () {
  console.log("Server started on port 3001");
})



















// const userSchema = new mongoose.Schema({
//   email: String,
//   password: String,
//   googleId: String,
// });
    
// userSchema.plugin(passportLocalMongoose);  
// userSchema.plugin(findOrCreate);

//  const User = new mongoose.model("User", userSchema);


// passport.use(User.createStrategy());

// passport.serializeUser(function(user, done) {
//   done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.findById(id, function(err, user) {
//     done(err, user);
//   });
// });

// passport.use(new GoogleStrategy({
//   clientID: process.env.CLIENT_ID,
//   clientSecret: process.env.CLIENT_SECRET,
//   callbackURL: "http://localhost:3001/auth/google/user",
//   userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo"
// },
// function(accessToken, refreshToken, profile, cb) {
//   User.findOrCreate({ googleId: profile.id }, function (err, user) {
//     return cb(err, user);
//   });
// }
// ));

// app.get("/login", function (req, res) {
//   res.render("login");
// });

// app.post("/login", function (req, res) {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//   });

//   req.login(user, function (err) {
//     if (err) {
//       console.log(err);
//     } else {
//       passport.authenticate("local")(req, res, function () {
//         res.redirect("/list");
//       });
//     }
//   });
// });

// app.get("/list", function(req, res){
//     if (req.isAuthenticated()){
//       res.render("list")
//     } else {
//       res.redirect("/list")
//     }
//   });














