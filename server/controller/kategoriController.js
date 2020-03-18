const controller = {};

const addKategori = require("../service/kategori/addKategori");

controller.addKategori = (req, res) => {
  const validation = [];
  let data = req.body;
  if (!data.nama_kategori) {
    validation.push({
      error: "Category name is required"
    });
  }
  if (!data.icon) {
    validation.push({
      error: "Icon is required"
    });
  }
  if (validation.length > 0) {
    res.json({
      status: 200,
      error: validation,
      data: null,
      msg: "Request error"
    });
  } else {
    req.getConnection((err, conn) => {
      addKategori(conn, data, (err, result) => {
        if (err) {
          res.json({
            status: 500,
            error: err,
            data: null,
            msg: err
          });
        } else if (result) {
          res.json({
            status: 200,
            error: null,
            data: result,
            msg: "Category added"
          });
        }
      });
    });
  }
};

module.exports = controller;
