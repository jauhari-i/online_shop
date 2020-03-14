const geoLocation = require("geoip-lite");
const publicIp = require("public-ip");

async function getLocation() {
  const ip = await publicIp.v4();
  const location = geoLocation.lookup(ip);
  return location;
}

module.exports = getLocation;
