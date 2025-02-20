const HttpError = require("../models/http-error");
const { v4: uuidV4 } = require("uuid");

const { validationResult } = require("express-validator");

const DUMMY_DATA = [
  {
    id: "u1",
    name: "user one",
    email: "userone@test.com",
    password: "user@123",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_DATA });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_DATA.find((u) => u.email === email);

  if (!identifiedUser || identifiedUser.password !== password) {
    return next(new HttpError("Invalid User", 422));
  }

  res.status(200).json({ message: "login successfull" });
};

const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError("Invalid input data", 422));
  }
  const { name, email, password } = req.body;

  const isEmail = DUMMY_DATA.find((u) => u.email === email);

  if (isEmail) {
    return next(new HttpError("Email is already exist", 404));
  }

  const newUser = {
    id: uuidV4(),
    name,
    email,
    password,
  };

  DUMMY_DATA.push(newUser);

  res.status(201).json({ message: "Signup successfull" });
};

exports.getUsers = getUsers;
exports.login = login;
exports.signup = signup;
