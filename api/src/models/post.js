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
  },
  features: {
    type: [String],
  },
  address: {
    type: String,
  },
});

const model = mongoose.model("Posts", postSchema);
module.exports = model;
