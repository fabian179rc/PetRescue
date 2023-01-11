const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 9000;
const MONGODB_URI = process.env.MONGODB_URI;
const mongoose = require("mongoose");
const routes = require("./routes");

app.listen(port, () => console.log("server listening on port", port));

//mongoose connection
mongoose.set("strictQuery", false);

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
app.use((err, _req, res, _next) => {
  const status = err.status !== undefined ? err.status : 500;
  const message = err.message !== undefined ? err.message : err;
  console.error(err);
  res.status(status).json({ message });
});
app.use("/", routes);
