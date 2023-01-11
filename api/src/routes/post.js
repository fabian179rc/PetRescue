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

    let model = firstName ? User : Shelter;

    await model
      .updateOne({ _id: id }, { $addToSet: { posts: { post: newPost } } })
      .catch((error) => next(error));

    model
      .findById(id)
      .select("-password")
      .populate("networks") //ver con user
      .populate("posts.post")
      .populate("services.service")
      .then((data) => res.json(data))
      .catch((error) => next(error));
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
  const { id } = req.params;
  const { firstName } = req.body;
  let model = firstName ? User : Shelter;

  await model
    .updateOne({ "posts.post": id }, { $pull: { posts: { post: id } } })
    .then(() => res.send("Post eliminado"))
    .catch((error) => next(error));
});

module.exports = router;
