const controller = {};

const getLocation = require("../config/getLocation");
const register = require("../service/auth/register");

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
  if (validation.length > 0) {
    res.json(validation);
  } else {
    register(req, data, location, (err, result) => {
      if (err) {
        if (err) {
          res.json({
            status: 500,
            error: err
          });
        }
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

module.exports = controller;
