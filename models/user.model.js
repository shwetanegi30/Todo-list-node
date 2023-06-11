const mongoose = require('mongoose')
const passportLocalMongoose = require("passport-local-mongoose")
const findOrCreate = require('mongoose-findorcreate')

const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: String,
    email: String,
    password: String,
    name: String,
    providedId: String,
    provider: String,
    // imgSrc: String,
    authLevel: String
  })
  
  userSchema.plugin(passportLocalMongoose);

  userSchema.plugin(findOrCreate);


  const User = new mongoose.model("User", userSchema)

  

  module.exports = {
    User: User , 
    userSchema:userSchema
  }
 