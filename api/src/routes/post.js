const express = require("express");
const router = express.Router();
const Shelter = require("../models/shelter");
const User = require("../models/user");
const Post = require("../models/post");

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
        { $addToSet: { postId: newPost } }
      ).catch((error) => next(error));

      User.findById(id)
        .select("-password")
        .populate("networks")
        // .populate("posts")
        // .populate("services.service")
        .then((data) => res.json(data))
        .catch((error) => next(error));
    } else {
      //is shelter
      await Shelter.updateOne(
        { _id: id },
        { $addToSet: { postId: newPost } }
      ).catch((error) => next(error));

      // Shelter.findById(id)
      //   .select("-password")
      //   .populate("networks")
      //   .populate("postId")
      //   .populate("services.service")
      //   .then((data) => res.json(data))
      //   .catch((error) => next(error));
    }
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

//update post
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
          status,
          picture,
          description,
          address,
          features,
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

//delete post
router.delete("/:id", async (req, res, next) => {
  //queda en null
  const { id } = req.params;
  // const { idPost } = req.body;
  await Post.remove({ _id: id })
    .then(() => res.send("Post Borrado"))
    .catch((error) => next(error));
});
module.exports = router;
