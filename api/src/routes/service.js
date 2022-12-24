const express = require("express");
const router = express.Router();
const Shelter = require("../models/shelter");
const Service = require("../models/service");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//create service
router.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, description, address, cost } = req.body;

  try {
    const infoShelter = await Shelter.findById(id).catch((error) =>
      next(error)
    );

    if (!infoShelter) return res.send("Refugio no encontrado");

    if (!name || !description || !address || !cost)
      return res.send("No se ingresaron todos los campos");
    const newService = await new Service({
      name,
      description,
      address,
      cost,
    });
    newService.save().catch((error) => next(error));
    await Shelter.updateOne(
      { _id: id },
      { $addToSet: { services: { service: newService } } }
    ).catch((error) => next(error));
    Shelter.findById(id)
      .populate({ path: "networks", model: "Networks" })
      .populate({ path: "album", model: "Album" })
      .populate("services.service")
      .then((data) => res.json(data))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
