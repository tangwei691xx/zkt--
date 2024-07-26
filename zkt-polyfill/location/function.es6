/** @format */
/* eslint-disable func-names */

const wxLocation = require('./wx.es6');
const browserLocation = require('./browser.es6');
const cache = require('./cache.es6');
const Queue = require('../queue/index.es6');
const locationStatus = require('./status.es6');
const error = require('./error.es6');
const request = require('../request/index.es6');
const { GET_CITY_TYPE_ENUM } = require('./constant.es6');
const { GET_CITY_LEVEL_ENUM } = require('./constant.es6');

const locationQueue = new Queue();
locationQueue.init();

/**
 * 经纬度响应数据
 * @typedef { object } locationData
 * @property { string } lat 纬度
 * @property { string } lng 经度
 */

/**
 * 定位回调函数
 * @callback locationCallback
 * @param {Error | null} error 定位获取失败原因
 * @param { locationData | undefined } data 定位成功获取的经纬度，当error为空时存在
 */

/**
 * 异步获取定位
 * @param {locationCallback} cb 回调函数
 * @param {{forceGet: boolean, initiative: boolean}} [options={forceGet:false, initiative: false}] 配置参数
 * @param {boolean} options.forceGet 是否强制获取定位
 * @param {boolean} options.initiative 是否主动调用
 * @returns {undefined} 不返回值
 */
function getLocation(cb, options) {
  const params = options || { forceGet: false, initiative: false };
  console.log('geoLocation:start Location');
  if (z._GET('appid') === 'wx8aa25883789c070e' || z._GET('disable_position')) {
    console.log('disable_position2');
    cb(null);
    return undefined;
  }
  const positionCookieName = `${zkt._GET('appid')}_cancel_position`;
  const positionCookie = zkt.cookie.get(positionCookieName);
  console.log(JSON.stringify(params));
  // 不强制获取，或者用户取消授权过，先取缓存
  if (!params.forceGet) {
    const location = cache.getLocationFromStorage();
    if (location) {
      cb(null, location);
      return undefined;
    }
    // 如果是用户取消授权过，就不强制授权
    if (positionCookie && !params.initiative) {
      cb(error.getCancelError('用户取消过定位,30天不进行定位'));
      return undefined;
    }
  }
  locationQueue.enQueue(cb);
  if (!locationStatus.isLoading()) {
    // eslint-disable-next-line jsdoc/require-jsdoc
    const callback = function (err, res) {
      let queues = locationQueue.getList();
      queues = [...queues];
      locationQueue.clear();
      queues.forEach(function (cbItem, index) {
        if (!index) {
          if (!err) {
            // 写入缓存
            cache.setLocationToStorage(res);
          } else if (error.errorIsCancel(err)) {
            // 用户主动取消，需要记录时间
            zkt.cookie.set(positionCookieName, '1', 30);
          }
        }
        cbItem(err, res);
      });
    };
    if (zkt.isWeixin) {
      wxLocation.getLocation(callback, options);
    } else if (!zkt.isWeixin) {
      browserLocation.getLocation(callback, options);
    }
  }
  return undefined;
}
/**
 * 同步获取定位
 * @param {{forceGet: boolean, initiative: boolean}} [options={forceGet:false, initiative: false}] 配置参数
 * @param {boolean} options.forceGet 是否强制获取定位
 * @param {boolean} options.initiative 是否主动调用
 * @returns {Promise} 返回promise {@link locationData}
 */
function getLocationSync(options) {
  return new Promise(function (resolve, reject) {
    getLocation(function (err, res) {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    }, options);
  });
}

/**
 * 城市响应数据
 * @typedef { object } cityData
 * @property { string } type  获取城市的方式
 * @property { object } data 接口返回数据，显示java接口返回的areaInfoList,并依据传入的level进行过滤，两者数据结构一致，详细见对应文档 IP返回数据见{@link https://test5-bg-api-gateway.zhiketong.net/wechat-api/swagger-ui.html#/default/地图相关接口/getAreaByIpUsingGET IP}，经纬度返回数据见{@link https://test5-bg-api-gateway.zhiketong.net/wechat-api/swagger-ui.html#/default/地图相关接口/getAreaByLocationUsingGET Location}
 */

/**
 * 城市回调函数
 * @callback userCityCallback
 * @param {Error | null} error 城市获取失败原因
 * @param {cityData | undefined } data 获取城市
 */

/**
 * 异步获取当前用户的城市
 *
 *@todo 后期需要做成任务队列的方式
 * @param {userCityCallback} cb 回调函数
 * @param {{forceGet: boolean, initiative: boolean, type: string, level: string}} [options={forceGet:false, initiative: false, type: GET_CITY_TYPE_ENUM.LOCATION, level: GET_CITY_LEVEL_ENUM.CITY}]
 * @param {boolean} options.forceGet 是否强制获取定位
 * @param {boolean} options.initiative 是否主动调用
 * @param {string} options.type 获取城市的方式，使用GET_CITY_TYPE_ENUM枚举值
 * @param {string} options.level 获取城市行政级别
 * @returns {undefined} 不返回值
 */
function getUserCity(cb, options) {
  const params = {
    forceGet: false,
    initiative: false,
    type: GET_CITY_TYPE_ENUM.LOCATION,
    level: GET_CITY_LEVEL_ENUM.CITY,
    ...(options || {}),
  };
  if (cb) {
    // eslint-disable-next-line jsdoc/require-jsdoc
    const fetchUserCity = function (cityParams) {
      request
        .fetchCustomize('getUserCity', cityParams)
        .then(function (data) {
          if (cb) {
            cb(null, {
              type: cityParams.type,
              data: data.data,
            });
          }
        })
        .catch(function (err) {
          cb(err);
        });
    };
    // 只通过IP获取
    if (params.type === GET_CITY_TYPE_ENUM.IP) {
      fetchUserCity({
        type: params.type,
        level: params.level,
      });
    } else {
      getLocation(
        function (locationError, locationData) {
          let cityParams = null;
          if (locationError) {
            if (params.type === GET_CITY_TYPE_ENUM.LOCATION_DOWNGRADE) {
              cityParams = {
                type: GET_CITY_TYPE_ENUM.IP,
              };
            } else {
              cb(locationError, null);
            }
          } else {
            cityParams = {
              type: GET_CITY_TYPE_ENUM.LOCATION,
              level: params.level,
              location: locationData,
            };
          }
          if (cityParams) {
            fetchUserCity(cityParams);
          }
        },
        {
          forceGet: params.forceGet,
          initiative: params.initiative,
        },
      );
    }
  } else {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.NODE_ENV === 'development') {
        throw Error('未传入回调函数，故不会进行相关操作');
      }
    }
    console.error('未传入回调函数，故不会进行相关操作');
  }
  return undefined;
}

/**
 * 同步获取当前用户的城市
 *
 *@todo 后期需要做成任务队列的方式
 * @param {{forceGet: boolean, initiative: boolean, type: string, level: string}} [options={forceGet:false, initiative: false, type: GET_CITY_TYPE_ENUM.LOCATION, level: GET_CITY_LEVEL_ENUM.CITY}]
 * @param {boolean} options.forceGet 是否强制获取定位
 * @param {boolean} options.initiative 是否主动调用
 * @param {string} options.type 获取城市的方式，使用GET_CITY_TYPE_ENUM枚举值
 * @param {string} options.level 获取城市行政级别
 * @returns {Promise} 返回promise {@link cityData}
 */
function getUserCitySync(options) {
  return new Promise(function (resolve, reject) {
    getUserCity(function (err, res) {
      if (err) {
        return reject(err);
      }
      return resolve(res);
    }, options);
  });
}

/**
 * 经纬度定位
 * @exports zkt.geoLocation
 * @borrows getLocation as getLocation
 * @borrows getLocationSync as getLocationSync
 * @borrows getUserCity as getUserCity
 * @borrows getUserCitySync as getUserCitySync
 */
const geoLocation = {
  getLocation,
  getLocationSync,
  getUserCity,
  getUserCitySync,
  getLocationInWx: wxLocation.getLocation,
  getLocationInBrowser: browserLocation.getLocation,
};

module.exports = geoLocation;
