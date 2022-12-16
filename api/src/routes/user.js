const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { hashPassword } = require("../utils/password");

//create user
router.post("/", async (req, res, next) => {
  const {
    firstName,
    lastName,
    username,
    password,
    email,
    profileImg,
    phone,
    service,
    posts,
  } = req.body;
  try {
    if (!firstName || !lastName || !username || !password || !email || !phone) {
      return res.send("No se recibieron todos los campos");
    }
    const userExist = await User.findOne({ email });
    if (userExist) return res.send("Usuario existente");
    else {
      const newUser = new User({
        firstName,
        lastName,
        username,
        email,
        profileImg,
        phone,
        service,
        posts,
        password: await hashPassword(password),
      });

      newUser.save().then((data) => res.json(data));
    }
  } catch (error) {
    next(error);
  }
});

//get all user
router.get("/", (req, res, next) => {
  User.find()
    .populate({ path: "service", model: "Service" })
    .populate({ path: "posts", model: "Post" })
    .then((data) => res.json(data))
    .catch((error) => next(error));
});

//get one user
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .populate({ path: "service", model: "Service" })
    .populate({ path: "posts", model: "Post" })
    .then((data) => res.json(data))
    .catch((error) => next(error));
});

//update user
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    username,
    password,
    email,
    profileImg,
    phone,
    service,
    posts,
  } = req.body;

  let newPassword;
  if (password) {
    newPassword = await hashPassword(password);
  }

  await User.updateOne(
    { _id: id },
    {
      $set: {
        firstName,
        lastName,
        username,
        password: newPassword,
        email,
        profileImg,
        phone,
        service,
        posts,
      },
    }
  ).catch((error) => next(error));

  User.findById(id)
    .populate({ path: "service", model: "Service" })
    .populate({ path: "posts", model: "Post" })
    .then((data) => res.json(data));
});

//delete user
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  User.remove({ _id: id })
    .then(() => res.send("Usuario Borrado"))
    .catch((error) => next(error));
});

module.exports = router;
