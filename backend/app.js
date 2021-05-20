require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

mongoose
  .connect("mongodb+srv://team:chat2021@cluster0.2mhfj.mongodb.net/final", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((x) => console.log(`Connected to ${x.connections[0].name}`))
  .catch(() => console.error("Error connecting to Mongo"));

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000", "https://nebulus-astrology.netlify.com"], //Swap this with the client url
  })
);

app.use(express.json());

app.use("/api", require("./routes/routes.js"));

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend/public/index.html"));
});

module.exports = app;
