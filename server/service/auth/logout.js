const moment = require("moment");

async function logout(req, id, location, cb) {
  await req.getConnection((err, conn) => {
    if (err) {
      cb("Internal server error");
    } else {
      conn.query(
        "UPDATE users SET online=0 last_login=? last_location=?    WHERE id_user = ?",
        [moment().format("YYYY-MM-DD HH:mm:ss"), location, id],
        (err, logouts) => {
          if (err) {
            cb("Internal server error");
          } else {
            cb(null, "Logout successfully");
          }
        }
      );
    }
  });
}

module.exports = logout;
