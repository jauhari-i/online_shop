const express = require("express");
const log = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const port = 5500;

const db = require("./db/db");

if (db) {
  app.use(db);
  console.log("Database Connected");
} else {
  console.log("Database Disconnected");
}

app.use(log("common"));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", require("./routes/routes"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
