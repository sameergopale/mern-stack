const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const placeRoutes = require("./routes/places-route");
const HttpError = require("./models/http-error");
const userRoutes = require("./routes/users-route");

app.use(bodyParser.json());

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

app.listen(5000);
