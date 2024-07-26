/** @format */

const error = require('./error.es6');
const locationStatus = require('./status.es6');

function getLocation(cb) {
  locationStatus.loading();
  try {
    z.__initWeChatNew((wx) => {
      if (wx) {
        console.log('geoLocation:start wx Location');
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success(res) {
            locationStatus.success();
            console.log('geoLocation:wx Location success');
            cb(null, {
              lat: res.latitude,
              lng: res.longitude,
            });
          },
          cancel(res) {
            console.log('geoLocation:wx Location cancel');
            locationStatus.error();
            cb(error.getCancelError(res.errMsg));
          },
          fail(res) {
            console.log('geoLocation:wx Location fail');
            locationStatus.error();
            cb(error.getErrorWithCode(res, 'fail'));
          },
          error(res) {
            console.log('geoLocation:wx Location error');
            locationStatus.error();
            cb(error.getErrorWithCode(res, 'error'));
          },
        });
      } else {
        locationStatus.error();
        cb('geoLocation:wx Location fail');
      }
    });
  } catch (e) {
    console.log('geoLocation:wx Location catch error');
    locationStatus.error();
    cb(error.getErrorWithCode(e, 'codeError'));
  }
}

module.exports = {
  getLocation,
};
