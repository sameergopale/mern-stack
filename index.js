const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

const placeRoutes = require("./routes/places-route");
const HttpError = require("./models/http-error");
const userRoutes = require("./routes/users-route");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
  next();
});

app.use("/api/places", placeRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  const error = new HttpError("This route not found", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An internal server error" });
});

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mspzh.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((error) => {
    console.log("Connection to the database failed");
  });
