const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const routes = require("./routes/TodoRoutes");

const cors = require("cors");

const app = express();
const PORT = process.env.PORT;
const DB = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use("/api", routes);

mongoose
  .connect(DB)
  .then(() => {
    console.log("connected to database");
  })
  .catch((error) => {
    console.log("connection failed to database! because " + error);
  });

app.use("/api", routes);

app.listen(PORT, (error) => {
  console.log("okey " + PORT);
  console.log(error ? error : "no error");
});
