/** @format */

const error = require('./error.es6');
const locationStatus = require('./status.es6');

function getLocation(cb) {
  locationStatus.loading();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (res) {
        if (typeof res === 'string') {
          return cb(error.getErrorWithCode(res));
        }
        cb({
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        });
      },
      function (err) {
        cb(error.getErrorWithCode(err.message, err.code));
      },
    );
  } else {
    cb(error.getErrorWithCode('当前浏览器不支持GPS定位', 'no-support'));
  }
}

module.exports = {
  getLocation,
};
