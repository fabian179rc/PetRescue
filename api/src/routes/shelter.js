const express = require("express");
const router = express.Router();
const { hashPassword } = require("../utils/password");
const Shelter = require("../models/shelter");

//create shelter
router.post("/", async (req, res, next) => {
  const {
    organization_name,
    username,
    password,
    email,
    profileImg,
    address,
    phone,
    networks,
    album,
    service,
  } = req.body;
  try {
    if (
      !organization_name ||
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
        organization_name,
        username,
        email,
        profileImg,
        address,
        phone,
        networks,
        album,
        service,
        password: await hashPassword(password),
      });

      newShelter //al tirar un error mata al back pero crea igual(user igual?)
        .save()
        .then((data) => res.json(data))
        // .populate({ path: "service", model: "Service" })
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
      .populate({ path: "networks", model: "Networks" })
      .populate({ path: "album", model: "Album" })
      .populate({ path: "service", model: "Service" })
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
    .populate({ path: "networks", model: "Networks" })
    .populate({ path: "album", model: "Album" })
    .populate({ path: "service", model: "Service" })
    .then((data) => res.json(data))
    .catch((error) => next(error));
});

//update shelter
router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const {
    organization_name,
    username,
    email,
    profileImg,
    address,
    phone,
    networks,
    album,
    service,
    password,
  } = req.body;

  let newPassword;
  if (password) {
    newPassword = await hashPassword(password);
  }

  await Shelter.updateOne(
    { _id: id },
    {
      $set: {
        organization_name,
        username,
        email,
        profileImg,
        address,
        phone,
        networks,
        album,
        service,
        password: newPassword,
      },
    }
  ).catch((error) => next(error));

  Shelter.findById(id)
    .populate({ path: "networks", model: "Networks" })
    .populate({ path: "album", model: "Album" })
    .populate({ path: "service", model: "Service" })
    .then((data) => res.json(data))
    .catch((error) => next(error));
});

//delete shelter
router.delete("/:id", (req, res, next) => {
  const { id } = req.params;
  Shelter.remove({ _id: id })
    .then(() => res.send("Organizacion Borrada"))
    .catch((error) => next(error));
});

module.exports = router;
