const express = require("express");
const app = express();

const checkToken = require("../config/checkToken");

const authController = require("../controller/authController");
const kategoriController = require("../controller/kategoriController");

app.get("/", checkToken, (req, res) => res.send("Hello World!"));

// auth api
app.post("/register", authController.register);
app.post("/login", authController.login);
app.get("/logout", checkToken, authController.logOut);

// kategori api
app.post("/kategori", checkToken, kategoriController.addKategori);

module.exports = app;
