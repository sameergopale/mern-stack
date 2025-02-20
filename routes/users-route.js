const express = require("express");
const usersRoute = express.Router();
const usersController = require("../controllers/users-controller");
const { check } = require("express-validator");

usersRoute.get("/", usersController.getUsers);

usersRoute.post("/login", usersController.login);

usersRoute.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  usersController.signup
);

module.exports = usersRoute;
