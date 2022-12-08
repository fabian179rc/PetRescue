const mongoose = require("mongoose");
const { Schema } = mongoose;

const albumSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  posts: {
    type: Schema.Types.ObjectId,
    ref: 'Post',
  },
});

const model = mongoose.model("Album", albumSchema);
module.exports = model;
