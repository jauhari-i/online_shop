const controller = {};

const addKategori = require("../service/kategori/addKategori");
const getKategori = require("../service/kategori/getKategori");
const editKategori = require("../service/kategori/editKategori");

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

controller.getAllKategori = (req, res) => {
  req.getConnection((err, conn) => {
    if (err) {
      res.json({
        status: 500,
        error: err,
        data: null,
        msg: err
      });
    } else {
      getKategori.getAll(conn, (err, result) => {
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
            msg: "Category data fetched"
          });
        }
      });
    }
  });
};

controller.getIdKategori = (req, res) => {
  let id = req.params.id;
  req.getConnection((err, conn) => {
    if (err) {
      res.json({
        status: 500,
        error: err,
        data: null,
        msg: err
      });
    } else {
      getKategori.getById(conn, id, (err, result) => {
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
            msg: "Category data fetched"
          });
        }
      });
    }
  });
};

controller.editKategori = (req, res) => {
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
      if (err) {
        res.json({
          status: 500,
          error: err,
          data: null,
          msg: "Database connection fail"
        });
      } else {
        editKategori(conn, req.params.id, data, (err, result) => {
          if (err) {
            res.json({
              status: 500,
              error: err,
              data: null,
              msg: err
            });
          } else {
            res.json({
              status: 200,
              error: null,
              data: result,
              msg: "Category modified"
            });
          }
        });
      }
    });
  }
};

module.exports = controller;
