const express = require("express");
const app = express();

const checkToken = require("../config/checkToken");
const authController = require("../controller/authController");

app.get("/", (req, res) => res.send("Hello World!"));

app.get("/register", authController.register);

module.exports = app;
