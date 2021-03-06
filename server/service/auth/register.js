const moment = require("moment");
const bcryptjs = require("bcryptjs");

async function register(req, data, location, cb) {
  await req.getConnection((err, conn) => {
    if (err) {
      res.json({
        status: 500,
        data: null,
        msg: "Internal server error"
      });
    } else {
      conn.query(
        "SELECT email FROM users WHERE email = ?",
        data.email,
        (err, datas) => {
          if (err) {
            cb(err);
          } else if (datas.length > 0) {
            cb("Email telah digunakan");
          } else {
            const date = moment().format("YYYY-MM-DD HH:mm:ss");
            const city = location.city;
            bcryptjs.hash(data.password, 10, (err, hash) => {
              if (err) {
                cb("server-error");
              } else {
                conn.query(
                  "INSERT INTO users (email,password,online,level,last_login,last_location) VALUES (?,?,?,?,?,?)",
                  [data.email, hash, 0, 0, date, city],
                  (err, inserted) => {
                    if (err) {
                      cb("server-error");
                    } else if (inserted) {
                      conn.query(
                        "INSERT INTO profile (id_user, first_name, last_name, imgPath, nomer_hp, status) VALUES (?,?,?,'default.png','0','0')",
                        [inserted.insertId, data.first_name, data.last_name],
                        (err, insert) => {
                          if (err) {
                            cb("Server Error");
                          } else {
                            cb(null, insert);
                          }
                        }
                      );
                    } else {
                      cb("fail");
                    }
                  }
                );
              }
            });
          }
        }
      );
    }
  });
}

module.exports = register;
