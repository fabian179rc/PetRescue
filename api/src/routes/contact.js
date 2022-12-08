const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Shelter = require("../models/shelter");
const Contact = require("../models/contact");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//create contact
router.post("/contact", async (req, res) => {
  const infoShelter = await Shelter.find({
    username: req.body.shelterUsername,
  });
  let shelterId = infoShelter[0]._id;

  try {
    const newContac = await Contact.create(req.body);
    newContac.save();

    Shelter.updateOne({ _id: shelterId }, { $set: { contact: toId(newContac) } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (err) {
    res.status(400).send("No se pudo crear");
    console.error(err);
  }
});

module.exports = router;
