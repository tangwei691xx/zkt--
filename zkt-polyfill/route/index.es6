/** @format */
const business = require('./business.es6');
const domain = require('./domain.es6');
const helper = require('./helper.es6');

/**
 * @name route
 * @memberof zkt
 * @see {@link zkt.module:route}
 */
module.exports = {
  ...business,
  ...domain,
  ...helper,
};
