const mongoose = require("mongoose");
const { Schema } = mongoose;

const shelterSchema = mongoose.Schema({
  organizationName: {
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
  profileImg: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  networks: {
    type: Schema.Types.ObjectId,
    ref: "Networks",
  },
  posts: {
    type: [
      {
        post: {
          type: Schema.Types.ObjectId,
          ref: "Posts",
        },
      },
    ],
    default: [],
  },
  services: {
    type: [
      {
        service: {
          type: Schema.Types.ObjectId,
          ref: "Services",
        },
      },
    ],
    default: [],
  },
});

const model = mongoose.model("Shelter", shelterSchema);
module.exports = model;
