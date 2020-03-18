const service = {};

service.getAll = (conn, cb) => {
  conn.query("SELECT * FROM kategori", (err, data) => {
    if (err) {
      cb(err);
    } else if (data.length > 0) {
      cb(null, data);
    } else {
      cb(null, "No Category Data");
    }
  });
};

service.getById = (conn, id, cb) => {
  conn.query("SELECT * FROM kategori WHERE id_kategori = ?", id, (err, kat) => {
    if (err) {
      cb(err);
    } else if (kat.length > 0) {
      cb(null, kat[0]);
    } else {
      cb(null, "No data found");
    }
  });
};

module.exports = service;
