const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://team:chat2021@cluster0.2mhfj.mongodb.net/final",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((x) => console.log(`Connected to ${x.connections[0].name}`))
  .catch(() => console.error("Error connecting to Mongo"));

app.use(express.json());

app.use(cors({
  credentials: true,
  origin: ["http://localhost:3000", process.env.CLIENT_URL] //Swap this with the client url 
}));

app.use("/api", require("./routes/routes.js"));

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res, next) => {
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"));
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS");
  next();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening to port ${PORT}`));