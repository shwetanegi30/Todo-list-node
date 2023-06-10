const mongoose = require('mongoose')

const listSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: mongoose.Schema.Types.String,
    isDeleted: mongoose.Schema.Types.Boolean,
    isCompleted: mongoose.Schema.Types.Boolean,
    createAtDate: mongoose.Schema.Types.Date,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
  })
  const List = new mongoose.model("List", listSchema);
  module.exports = List;
