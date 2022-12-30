const express = require("express");
const router = express.Router();
const Shelter = require("../models/shelter");
const Network = require("../models/network");
// const mongoose = require("mongoose");
// const toId = mongoose.Types.ObjectId;

//create Network
// router.post("/:id", async (req, res, next) => {
//   const { id } = req.params;
//   const { instagram, facebook, webPage } = req.body;

//   if (!instagram && !facebook && !webPage)
//     return res.send("No se ingreso ningun campo");

//   try {
//     const newNetwork = await new Network({ instagram, facebook, webPage });
//     await newNetwork.save();

//     await Shelter.updateOne(
//       { _id: id },
//       { $set: { networks: toId(newNetwork) } }
//     ).catch((error) => next(error));

//     Shelter.findById(id)
//       .select("-password")
//       .populate("networks")
//       .populate("posts.post")
//       .populate("services.service")
//       .then((data) => res.json(data))
//       .catch((error) => next(error));
//   } catch (error) {
//     next(error);
//   }
// });

// router.get("/", (req, res, next) => {
//   Network.find()
//     .then((data) => res.json(data))
//     .catch((error) => next(error));
// });

// router.get("/:id", (req, res, next) => {
//   const { id } = req.params;
//   Network.findById(id)
//     .then((data) => res.json(data))
//     .catch((error) => next(error));
// });

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;

  const { instagram, facebook, webPage } = req.body;

  try {
    const shelterInfo = await Shelter.findById(id);
    await Network.updateOne(
      { _id: shelterInfo.networks._id },
      {
        $set: {
          instagram,
          facebook,
          webPage,
        },
      }
    );

    Shelter.findById(id)
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

module.exports = router;
