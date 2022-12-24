const express = require("express");
const router = express.Router();
const Shelter = require("../models/shelter");
const Network = require("../models/network");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//create Network
router.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { instagram, facebook, webPage } = req.body;

  if (!instagram && !facebook && !webPage)
    return res.send("No se ingreso ningun campo");

  try {
    const newNetwork = await new Network({ instagram, facebook, webPage });
    newNetwork.save();

    await Shelter.updateOne(
      { _id: id },
      { $set: { networks: toId(newNetwork) } }
    ).catch((error) => next(error));

    Shelter.findById(id)
      .populate({ path: "networks", model: "Networks" })
      .populate({ path: "album", model: "Album" })
      .populate({ path: "service", model: "Service" })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { instagram, facebook, webPage } = req.body;

  if (!instagram && !facebook && !webPage)
    return res.send("No se ingreso ningun campo");

  try {
    const newNetwork = await new Network({ instagram, facebook, webPage });
    newNetwork.save();

    await Shelter.updateOne(
      { _id: id },
      { $set: { networks: toId(newNetwork) } }
    ).catch((error) => next(error));

    Shelter.findById(id)
      .populate({ path: "networks", model: "Networks" })
      .populate({ path: "album", model: "Album" })
      .populate({ path: "service", model: "Service" })
      .then((data) => res.json(data))
      .catch((error) => next(error));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
