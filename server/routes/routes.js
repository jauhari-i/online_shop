const express = require("express");
const app = express();

const checkToken = require("../config/checkToken");
const authController = require("../controller/authController");

app.get("/", checkToken, (req, res) => res.send("Hello World!"));

app.post("/register", authController.register);
app.post("/login", authController.login);
app.get("/logout", checkToken, authController.logOut);

module.exports = app;
