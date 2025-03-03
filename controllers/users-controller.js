const HttpError = require("../models/http-error");
const { v4: uuidV4 } = require("uuid");
const User = require("../models/user");
const { validationResult } = require("express-validator");

const DUMMY_DATA = [
  {
    id: "u1",
    name: "user one",
    email: "userone@test.com",
    password: "user@123",
  },
];

const getUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (err) {
    const error = new HttpError("Could not able to find users", 500);
  }
  res.json({
    users: users.map((u) => u.toObject({ getters: true })),
  });
  // res.json({ users: DUMMY_DATA });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  // const identifiedUser = DUMMY_DATA.find((u) => u.email === email);
  let existingEmail;

  try {
    existingEmail = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Could not able to fetch User. Please try again",
      500
    );
    return next(error);
  }

  if (!existingEmail || existingEmail.password !== password) {
    return next(new HttpError("Invalid User", 422));
  }

  res
    .status(200)
    .json({
      message: "login successfull",
      user: existingEmail.toObject({ getters: true }),
    });
};

const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input data", 422));
  }
  const { name, email, password } = req.body;

  // const isEmail = DUMMY_DATA.find((u) => u.email === email);
  let isEmail;

  try {
    isEmail = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError(
      "Something went wrong while fetching user",
      500
    );
    return next(error);
  }

  if (isEmail) {
    return next(
      new HttpError("Email is already exist. Please login instead.", 422)
    );
  }

  const createdUser = new User({
    name,
    email,
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signup failed. Please try again later", 500);
    return next(error);
  }

  // DUMMY_DATA.push(newUser);

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
