require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutsRoutes = require("./backend/routes/workouts");
const userRoutes = require("./backend/routes/user");
const cors = require("cors");
const path = require("path");

const app = express();

const clientpath = path.join(__dirname, "./frontend/dist");
app.use("/", express.static(clientpath));

app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/v1/workouts", workoutsRoutes);
app.use("/api/v1/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("connected to db & running on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/dist/index.html"));
});
