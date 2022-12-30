const express = require("express");
const router = express.Router();
const { hashPassword, comparePassword } = require("../utils/password");
const Shelter = require("../models/shelter");
const Network = require("../models/network");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//create shelter
router.post("/", async (req, res, next) => {
  const {
    organizationName,
    username,
    password,
    email,
    profileImg,
    address,
    phone,
    networks,
  } = req.body;
  try {
    if (
      !organizationName ||
      !username ||
      !password ||
      !email ||
      !address ||
      !phone
    ) {
      return res.send("No se recibieron todos los campos");
    }
    const ShelterExist = await Shelter.findOne({ email });
    if (ShelterExist) return res.send("Organizacion existente");
    else {
      const newShelter = new Shelter({
        organizationName,
        username,
        email,
        profileImg,
        address,
        phone,
        password: await hashPassword(password),
      });

      const newNetwork = await new Network({
        instagram: networks ? networks.instagram : "",
        facebook: networks ? networks.facebook : "",
        webPage: networks ? networks.webPage : "",
      });

      await newNetwork.save();
      await newShelter.save();
      await Shelter.updateOne(
        { email: email },
        { $set: { networks: toId(newNetwork) } }
      );

      await Shelter.findOne({ email: email })
        .select("-password")
        .populate("networks")
        .then((data) => res.json(data))
        .catch((error) => next(error));
    }
  } catch (error) {
    next(error);
  }
});

//get all shelters
router.get("/", (req, res, next) => {
  try {
    Shelter.find()
      .select("-password")
      .populate("networks")
      .populate("posts.post")
      .populate("services.service")
      .then((data) => res.json(data))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
});

//get one shelter
router.get("/:id", (req, res, next) => {
  const { id } = req.params;
  Shelter.findById(id)
    .select("-password")
    .populate("networks")
    .populate("posts.post")
    .populate("services.service")
    .then((data) => res.json(data))
    .catch((error) => next(error));
});

//update shelter
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    organizationName,
    username,
    oldEmail,
    email,
    profileImg,
    address,
    phone,
    password,
    oldPassword,
  } = req.body;

  const shelterInfo = await Shelter.findById(id);
  if (!shelterInfo) return res.send("Id incorrecto");

  let newPassword, newEmail;

  if (oldPassword) {
    const resultPasswordMatch = await comparePassword(
      oldPassword,
      shelterInfo.password
    );

    if (!resultPasswordMatch)
      return res.send("Error, Las contraseñas no coinciden");
    newPassword = await hashPassword(password);
  }

  if (oldEmail) {
    if (oldEmail !== shelterInfo.email)
      return res.send("El email ingresado es incorrecto");
    newEmail = email;
  }

  await Shelter.updateOne(
    { _id: id },
    {
      $set: {
        organizationName,
        username,
        profileImg,
        address,
        phone,
        email: newEmail,
        password: newPassword,
      },
    }
  ).catch((error) => next(error));

  Shelter.findById(id)
    .populate("networks")
    .select("-password")
    .populate("posts.post")
    .populate("services.service")
    .then((data) => res.json(data))
    .catch((error) => next(error));
});

//delete shelter
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Shelter.deleteOne({ _id: id })
    .then(() => res.send("Organizacion Borrada"))
    .catch((error) => next(error));
});

module.exports = router;
