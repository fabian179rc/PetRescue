const express = require("express");
const router = express.Router();
const shelterSchema = require("../models/shelter");

//create shelter
router.post("/", (req, res) => {
  const shelter = shelterSchema(req.body);
  try {
    shelter.save().then((data) => res.json(data));
  } catch (error) {
    res.json({ message: error });
  }
});

//get all shelters
router.get("/", (req, res) => {
  shelterSchema
    .find()
    .populate({ path: "contact", model: "Contact" })
    // .populate({ path: "album", model: "Album" })
    .populate({ path: "service", model: "Service" })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get one shelter
router.get("/:id", (req, res) => {
  const { id } = req.params;
  shelterSchema
    .findById(id)
    .populate(
      { path: "contact", model: "Contact" },
      { path: "album", model: "Album" },
      { path: "service", model: "Service" }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//update shelter
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const {
    organization_name,
    username,
    password,
    picture,
    email,
    contact,
    address,
    album,
    service,
  } = req.body;
  shelterSchema
    .updateOne(
      { _id: id },
      {
        $set: {
          organization_name,
          username,
          password,
          picture,
          email,
          contact,
          address,
          album,
          service,
        },
      }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//delete shelter
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  shelterSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;
