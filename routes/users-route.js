const express = require("express");
const usersRoute = express.Router();
const usersController = require("../controllers/users-controller");

usersRoute.get("/", usersController.getUsers);

usersRoute.get("/login", usersController.login);

usersRoute.post("/signup", usersController.signup);

module.exports = usersRoute;
