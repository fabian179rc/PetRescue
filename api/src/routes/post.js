const express = require("express");
const router = express.Router();
const Album = require("../models/album");
const Post = require("../models/post");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//create post
router.post("/", async (req, res) => {
  const { albumName, status, picture, description, features, address } =
    req.body;

  try {
    let albumId;
    if (albumName) {
      const infoAlbum = await Album.find({
        name: albumName,
      });
      albumId = infoAlbum[0]._id;
    }

    const newPost = await Post.create({
      status,
      picture,
      description,
      features,
      address,
    });
    newPost.save();

    if (albumId) {
      Album.updateOne(
        { _id: albumId },
        { $set: { posts: toId(newPost) } }
      ).then((data) => res.json(data));
    }
  } catch (error) {
    res.status(400).send("No se pudo crear");
    console.error(error);
  }
});

module.exports = router;
