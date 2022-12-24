const mongoose = require("mongoose");

const networksSchema = mongoose.Schema({
  instagram: {
    type: String,
  },
  facebook: {
    type: String,
  },
  webPage: {
    type: String,
  },
});

const model = mongoose.model("Networks", networksSchema);
module.exports = model;
