const moment = require("moment");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, data, location, cb) {
  await req.getConnection((err, conn) => {
    if (err) {
      cb("server-error");
    } else {
      conn.query(
        "SELECT * FROM users WHERE email = ?",
        data.email,
        (err, user) => {
          if (err) {
            cb(err);
          } else if (user.length > 0) {
            bcrypt.compare(data.password, user[0].password, (err, isMatch) => {
              if (err) {
                cb(err);
              } else if (isMatch) {
                conn.query(
                  "UPDATE users SET online = 1, last_login = ? WHERE id_user = ?",
                  [moment().format("YYYY-MM-DD HH:mm:ss"), user[0].id_user],
                  (err, online) => {
                    if (err) {
                      cb("server-error");
                    } else {
                      const token = jwt.sign(
                        {
                          id: user[0].id_user,
                          email: user[0].email
                        },
                        "HelloWorld",
                        {
                          expiresIn: "1h"
                        }
                      );
                      cb(null, token);
                    }
                  }
                );
              } else {
                cb("Password not same");
              }
            });
          } else {
            cb("Email not found");
          }
        }
      );
    }
  });
}

module.exports = login;
