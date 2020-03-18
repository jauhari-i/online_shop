const controller = {};

const getLocation = require("../config/getLocation");

const register = require("../service/auth/register");
const login = require("../service/auth/login");
const logout = require("../service/auth/logout");

controller.register = async (req, res) => {
  const location = await getLocation();
  const data = req.body;
  let validation = [];
  if (!data.email) {
    validation.push({
      error: "Email is required"
    });
  }
  if (!data.password) {
    validation.push({
      error: "Password is required"
    });
  }
  if (!data.password2) {
    validation.push({
      error: "Password confirmation is required"
    });
  }
  if (data.password !== data.password2) {
    validation.push({
      error: "Password is not same"
    });
  }
  if (!data.first_name) {
    validation.push({
      error: "First name is required"
    });
  }
  if (!data.last_name) {
    validation.push({
      error: "Last name is required"
    });
  }
  if (validation.length > 0) {
    res.json(validation);
  } else {
    register(req, data, location, (err, result) => {
      if (err) {
        res.json({
          status: 500,
          error: err
        });
      } else if (result) {
        res.json({
          status: 200,
          data: {
            registered: true
          },
          error: null,
          msg: "Registered successfully"
        });
      }
    });
  }
};

controller.login = async (req, res) => {
  const location = await getLocation();
  const data = req.body;
  let validation = [];
  if (!data.email) {
    validation.push({
      error: "Email is required"
    });
  }
  if (!data.password) {
    validation.push({
      error: "Password is required"
    });
  }
  if (validation.length > 0) {
    res.json(validation);
  } else {
    login(req, data, location, (err, result) => {
      if (err) {
        res.json({
          status: 500,
          error: err
        });
      } else {
        res.json({
          status: 200,
          error: null,
          data: {
            token: result
          },
          msg: "Login successfully"
        });
      }
    });
  }
};

controller.logOut = async (req, res) => {
  const location = await getLocation();
  const id = req.decoded.id;
  logout(req, id, location, (err, out) => {
    if (err) {
      res.json({
        status: 500,
        error: err,
        data: {
          logout: false
        },
        msg: "Failed to logout"
      });
    } else {
      res.json({
        status: 200,
        error: null,
        data: {
          logout: true
        },
        msg: "Logout successfully"
      });
    }
  });
};

module.exports = controller;
