const express = require("express");
const app = express();

const port = 5500;

const db = require("./db/db");

if (db) {
  app.use(db);
  console.log("Database Connected");
} else {
  console.log("Database Disconnected");
}

app.use("/", require("./routes/routes"));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
