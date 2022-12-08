const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'Contact',
  },
});

const model = mongoose.model("User", userSchema);
module.exports = model;
