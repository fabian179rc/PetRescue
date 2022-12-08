const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  status: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  features: {
    type: [String],
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
});

const model = mongoose.model("Post", postSchema);
module.exports = model;
