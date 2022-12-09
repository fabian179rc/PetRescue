const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profileImg: {
    type: String,
  },
  phone: {
    type: Number,
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: "Service",
  },
  posts: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
});

const model = mongoose.model("User", userSchema);
module.exports = model;
