const express = require("express");
const router = express.Router();
const Shelter = require("../models/shelter");
const Service = require("../models/service");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//create service
router.post("/service", async (req, res) => {
  const infoShelter = await Shelter.find({
    username: req.body.shelterUsername,
  });
  let shelterId = infoShelter[0]._id;

  try {
    const newService = await Service.create(req.body);
    newService.save();

    Shelter.updateOne(
      { _id: shelterId },
      { $set: { service: toId(newService) } }
    )
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (err) {
    res.status(400).send("No se pudo crear");
    console.error(err);
  }
});

module.exports = router;
