const express = require("express");
const router = express.Router();
const Shelter = require("../models/shelter");
const User = require("../models/user");
const Post = require("../models/post");
// const mongoose = require("mongoose");
// const toId = mongoose.Types.ObjectId;

//create post
router.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { status, picture, description, features, address, firstName } =
    req.body;

  try {
    if (!status || !picture || !description || !features || !address)
      return res.send("No se ingresaron todos los campos");

    const newPost = await Post.create({
      status,
      picture,
      description,
      address,
      features,
    });
    newPost.save();

    if (firstName) {
      //is user
      await User.updateOne(
        { _id: id },
        { $addToSet: { posts: { post: newPost } } }
      ).catch((error) => next(error));

      User.findById(id)
        .select("-password")
        .populate("networks")
        .populate("posts.post")
        .populate("services.service")
        .then((data) => res.json(data))
        .catch((error) => next(error));
    } else {
      //is shelter
      await Shelter.updateOne(
        { _id: id },
        { $addToSet: { posts: { post: newPost } } }
      ).catch((error) => next(error));

      Shelter.findById(id)
        .select("-password")
        .populate("networks")
        .populate("posts.post")
        .populate("services.service")
        .then((data) => res.json(data))
        .catch((error) => next(error));
    }

    // if (albumId) {
    //   Album.updateOne(
    //     { _id: albumId },
    //     { $set: { posts: toId(newPost) } }
    //   ).then((data) => res.json(data));
    // }
  } catch (error) {
    res.status(400).send("No se pudo crear");
    console.error(error);
  }
});

//Get All Posts
router.get("/", (req, res, next) => {
  try {
    Post.find()
      .then((data) => res.json(data))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
});

//Get All Posts User/Shelter (ID User or Shelter)
// router.get("/:id", (req, res, next) => {
//   const { id } = req.params;
//   const { firstName } = req.body;

//   try {
//     if (firstName) {
//       User.findById(id)
//         .populate("posts.post")
//         .then((data) => res.json(data.posts))
//         .catch((error) => next(error));
//     } else {
//       Shelter.findById(id)
//         .populate("posts.post")
//         .then((data) => res.json(data.posts))
//         .catch((error) => next(error));
//     }
//   } catch (error) {
//     next(error);
//   }
// });

//get Post(ID Post)
router.get("/:id", (req, res, next) => {
  const { id } = req.params;

  try {
    Post.findOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { status, picture, description, features, address } = req.body;
  let postClean = false;
  if (!status && !picture && !description && !features && !address) {
    postClean = true;
  }

  try {
    await Post.updateOne(
      { _id: id },
      {
        $set: {
          status: postClean ? "" : status,
          picture: postClean ? "" : picture,
          description: postClean ? "" : description,
          address: postClean ? "" : address,
          features: postClean ? [] : features,
        },
      }
    ).catch((error) => next(error));

    Post.findOne({ _id: id })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
