const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  phone: {
    type: Number,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  web_page: {
    type: String,
    required: false,
  },
});

const model = mongoose.model("Contact", contactSchema);
module.exports = model;
