const mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  address: {
    type: String,
    required: false,
  },
  cost: {
    type: Number,
    required: false,
  },
});

const model = mongoose.model("Services", serviceSchema);
module.exports = model;
