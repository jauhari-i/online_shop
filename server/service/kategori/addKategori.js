function addKategori(conn, data, cb) {
  conn.query(
    "SELECT * FROM kategori WHERE nama_kategori = ?",
    data.nama_kategori,
    (err, kat) => {
      if (err) {
        cb(err);
      } else if (kat.length > 0) {
        cb("Category name is used");
      } else {
        conn.query(
          "INSERT INTO kategori (nama_kategori,icon) VALUES (?,?)",
          [data.nama_kategori, data.icon],
          (err, insert) => {
            if (err) {
              cb(err);
            } else if (insert) {
              cb(null, insert);
            } else {
              cb("Failed");
            }
          }
        );
      }
    }
  );
}

module.exports = addKategori;
