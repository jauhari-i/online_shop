const controller = {};

const geoLocation = require("geoip-lite");
const publicIp = require("public-ip");

const getIp = require("../config/getIp");
const register = require("../service/auth/register");

controller.register = async (req, res) => {
  const ip = await publicIp.v4();
  const geo = geoLocation.lookup(ip);
  console.log(ip, geo);
};

module.exports = controller;
