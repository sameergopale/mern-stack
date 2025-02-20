const HttpError = require("../models/http-error");
const { v4: uuidV4 } = require("uuid");
const { validationResult } = require("express-validator");

let DUMMY_DATA = [
  {
    id: "p1",
    title: "Place one",
    description: "lorem ipsume dummy data exposed",
    creator: "u1",
  },
];

const getByPlaceId = (req, res, next) => {
  const placeId = req.params.placeId;
  const place = DUMMY_DATA.find((p) => p.id === placeId);
  if (!place) {
    return next(new HttpError("No place found", 404));
  }
  res.json({ place });
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_DATA.filter((p) => p.creator === userId);
  if (!places || places.length === 0) {
    return next(new HttpError("No places found for this user id", 404));
  }
  res.json({ places });
};

const createPlace = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input data", 422));
  }
  const { title, description, creator } = req.body;
  const newPlace = {
    id: uuidV4(),
    title,
    description,
    creator,
  };
  DUMMY_DATA.push(newPlace);
  res.status(201).json({ place: newPlace });
};

const updatePlace = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input data", 422));
  }
  const placeId = req.params.placeId;
  const { title, description } = req.body;
  const updatedPlace = { ...DUMMY_DATA.find((p) => p.id === placeId) };
  const placeIndex = DUMMY_DATA.findIndex((p) => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;
  DUMMY_DATA[placeIndex] = updatedPlace;
  res.status(200).json({ message: "Place updated successfully" });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.placeId;
  DUMMY_DATA = DUMMY_DATA.filter((p) => p.id !== placeId);
  res.status(200).json({ message: "Place deleted successfully" });
};

exports.getByPlaceId = getByPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
