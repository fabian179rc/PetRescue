const express = require("express");
const router = express.Router();
const shelterSchema = require("../models/shelter");

//create shelter
router.post("/shelter", (req, res) => {
  const shelter = shelterSchema(req.body);
  try {
    shelter.save().then((data) => res.json(data));
  } catch (error) {
    res.json({ message: error });
  }
});

//get all shelters
router.get("/shelter", (req, res) => {
  shelterSchema
    .find()
    .populate(
      { path: "contact", model: "Contact" },
      { path: "album", model: "Album" },
      { path: "service", model: "Service" }
    )
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

//get one shelter
router.get("/shelter/:id", (req, res) => {
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
router.put("/shelter/:id", (req, res) => {
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
router.delete("/shelter/:id", (req, res) => {
  const { id } = req.params;
  shelterSchema
    .remove({ _id: id })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
});

module.exports = router;