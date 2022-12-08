const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 9000;
const MONGODB_URI = process.env.MONGODB_URI;
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const shelterRoutes = require("./routes/shelter");
const contactsRoutes = require("./routes/contact");
const serviceRoutes = require("./routes/service");
const postRoutes = require("./routes/post");

app.listen(port, () => console.log("server listening on port", port));

//mongoose connection
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("connected to MongoDB Atlas"))
  .catch((error) => console.error(error));

//routes
app.get("/", (req, res) => {
  res.send("welcome API");
});

//middleware
app.use(express.json());
app.use("/", userRoutes);
app.use("/", shelterRoutes);
app.use("/", contactsRoutes);
app.use("/", serviceRoutes);
app.use("/", postRoutes);
