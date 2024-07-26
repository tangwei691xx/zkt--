/** @format */
/* eslint-disable func-names */

const functions = require('./function.es6');
const constant = require('./constant.es6');

/**
 * @name geoLocation
 * @memberof zkt
 * @see {@link zkt.module:geoLocation}
 */
module.exports = {
  ...functions,
  GET_CITY_TYPE_ENUM: constant.GET_CITY_TYPE_ENUM,
  GET_CITY_LEVEL_ENUM: constant.GET_CITY_LEVEL_ENUM,
};
