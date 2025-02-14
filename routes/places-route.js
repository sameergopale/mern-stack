const express = require("express");

const placeRoutes = express.Router();

const placesController = require("../controllers/places-controller");

placeRoutes.get("/:placeId", placesController.getByPlaceId);

placeRoutes.get("/user/:uid", placesController.getPlacesByUserId);

placeRoutes.post("/", placesController.createPlace);

placeRoutes.patch("/:placeId", placesController.updatePlace);

placeRoutes.delete("/:placeId", placesController.deletePlace);

module.exports = placeRoutes;
