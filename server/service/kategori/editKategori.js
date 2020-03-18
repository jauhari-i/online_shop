const getKategori = require("./getKategori");
function editKat(conn, id, data, cb) {
  getKategori.getById(conn, id, (err, kat) => {
    if (err) {
      cb(err);
    } else if (kat) {
      conn.query(
        "UPDATE kategori SET nama_kategori = ?, icon = ? WHERE id_kategori = ?",
        [data.nama_kategori, data.icon, id],
        (err, edited) => {
          if (err) {
            cb(err);
          } else if (edited) {
            cb(null, edited);
          }
        }
      );
    } else {
      cb("No Data Found");
    }
  });
}

module.exports = editKat;
