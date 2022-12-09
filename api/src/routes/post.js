const express = require("express");
const router = express.Router();
const Album = require("../models/album");
const Post = require("../models/post");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//create post
router.post("/", async (req, res) => {
  const infoAlbum = await Album.find({
    name: req.body.albumName,
  });
  let albumId = infoAlbum[0]._id;

  try {
    const newPost = await Post.create(req.body);
    newPost.save();

    Album.updateOne({ _id: albumId }, { $set: { posts: toId(newPost) } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (err) {
    res.status(400).send("No se pudo crear");
    console.error(err);
  }
});

module.exports = router;
