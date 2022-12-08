const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Contact = require("../models/contact");
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;

//create contact
router.post("/contact", async (req, res) => {
  const infoUser = await User.find({ email: req.body.userEmail });
  let userId = infoUser[0]._id;

  try {
    const newContac = await Contact.create(req.body);
    newContac.save();

    User.updateOne({ _id: userId }, { $set: { contact: toId(newContac) } })
      .then((data) => res.json(data))
      .catch((error) => res.json({ message: error }));
  } catch (err) {
    res.status(400).send("No se pudo crear");
    console.error(err);
  }
});

module.exports = router;
