/** @format */

/**
 * 获取城市的方式
 * @readonly
 * @enum {string}
 */
const GET_CITY_TYPE_ENUM = {
  /**
   * 通过解析IP获取，内网无法解析
   */
  IP: 'ip',
  /**
   * 通过解析经纬度获取
   */
  LOCATION: 'location',
  /**
   * 如果经纬度获取失败，则取IP
   */
  LOCATION_DOWNGRADE: 'location_downgrade',
};

/**
 * 获取城市的行政层级
 * @readonly
 * @enum {string}
 */
const GET_CITY_LEVEL_ENUM = {
  PROVICE: 'provice',
  CITY: 'city',
  AREA: 'area',
  ALL: 'all',
};

/**
 * @exports zkt.geoLocation
 * @borrows GET_CITY_TYPE_ENUM as GET_CITY_TYPE_ENUM
 * @borrows GET_CITY_LEVEL_ENUM as GET_CITY_LEVEL_ENUM
 */
module.exports = {
  GET_CITY_TYPE_ENUM,
  GET_CITY_LEVEL_ENUM,
};
