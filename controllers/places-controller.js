const HttpError = require("../models/http-error");
const { v4: uuidV4 } = require("uuid");
const { validationResult } = require("express-validator");
const Place = require("../models/place");
const mongoose = require("mongoose");
const User = require("../models/user");

let DUMMY_DATA = [
  {
    id: "p1",
    title: "Place one",
    description: "lorem ipsume dummy data exposed",
    creator: "u1",
  },
];

const getByPlaceId = async (req, res, next) => {
  const placeId = req.params.placeId;
  // const place = DUMMY_DATA.find((p) => p.id === placeId);
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Could not able to fetch places", 500);
    return next(error);
  }
  if (!place) {
    return next(new HttpError("No place found", 404));
  }
  res.json({ place: place.toObject({ getters: true }) });
};

const getPlacesByUserId = async (req, res, next) => {
  const userId = req.params.uid;
  // const places = DUMMY_DATA.filter((p) => p.creator === userId);
  let userWithPlaces;
  try {
    userWithPlaces = await User.findById(userId).populate("places");
  } catch (err) {
    const error = new HttpError(
      "Could not able to find place by provided user id",
      500
    );
    return next(error);
  }
  if (!userWithPlaces || userWithPlaces.places.length === 0) {
    return next(new HttpError("No places found for this user id", 404));
  }
  res.json({
    places: userWithPlaces.places.map((p) => p.toObject({ getters: true })),
  });
};

const createPlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input data", 422));
  }
  const { title, description, creator } = req.body;
  const newPlace = new Place({
    title,
    description,
    creator,
  });

  let user;
  try {
    user = await User.findById(creator);
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching user",
      500
    );
    return next(error);
  }
  if (!user) {
    return next(
      new HttpError("Could not find the user. Please try again later", 404)
    );
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await newPlace.save({ session: sess });
    user.places.push(newPlace);
    await user.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Something went wrong, Please try again.", 500);
    return next(error);
  }
  // DUMMY_DATA.push(newPlace);
  res.status(201).json({ place: newPlace.toObject({ getters: true }) });
};

const updatePlace = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input data", 422));
  }
  const placeId = req.params.placeId;
  const { title, description } = req.body;
  // const updatedPlace = { ...DUMMY_DATA.find((p) => p.id === placeId) };
  // const placeIndex = DUMMY_DATA.findIndex((p) => p.id === placeId);
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError(
      "Could not able to find the place. Please try again",
      500
    );
    return next(error);
  }
  place.title = title;
  place.description = description;
  // DUMMY_DATA[placeIndex] = updatedPlace;
  try {
    await place.save();
  } catch (err) {
    const error = new HttpError("Something went wrong. Please try again", 500);
    return next(error);
  }
  res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
  const placeId = req.params.placeId;
  // DUMMY_DATA = DUMMY_DATA.filter((p) => p.id !== placeId);
  let place;
  try {
    place = await Place.findById(placeId).populate("creator");
  } catch (err) {
    const error = new HttpError(
      "Could not find the place. Please try again",
      500
    );
    return next(error);
  }

  try {
    const sess = await mongoose.startSession();
    sess.startTransaction();
    await place.deleteOne({ session: sess });
    place.creator.places.pull(place);
    await place.creator.save({ session: sess });
    await sess.commitTransaction();
  } catch (err) {
    const error = new HttpError("Something went wrong, Please try again", 500);
    return next(error);
  }

  res.status(200).json({ message: "Place deleted successfully" });
};

exports.getByPlaceId = getByPlaceId;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
