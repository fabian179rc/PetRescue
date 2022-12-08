const mongoose = require('mongoose');
const { Schema } = mongoose;

const shelterSchema = mongoose.Schema({
  organization_name: {
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
  picture: {
    type: String,
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
  address: {
    type: String,
    required: false,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
  },
  service: {
    type: Schema.Types.ObjectId,
    ref: 'Service',
  },
});

const model = mongoose.model("Shelter", shelterSchema);
module.exports = model;
