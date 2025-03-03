const express = require("express");
const { check } = require("express-validator");

const placeRoutes = express.Router();

const placesController = require("../controllers/places-controller");

placeRoutes.get("/:placeId", placesController.getByPlaceId);

placeRoutes.get("/user/:uid", placesController.getPlacesByUserId);

placeRoutes.post(
  "/",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.createPlace
);

placeRoutes.patch(
  "/:placeId",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  placesController.updatePlace
);

placeRoutes.delete("/:placeId", placesController.deletePlace);

module.exports = placeRoutes;
