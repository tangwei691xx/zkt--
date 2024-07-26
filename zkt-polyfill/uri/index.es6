/** @format */

const uri = require('./uri.es6');
const riskControl = require('./riskControl.es6');
/**
 * @name uri
 * @memberof zkt
 * @see {@link zkt.module:uri}
 */
module.exports = {
  ...uri,
  ...riskControl,
};
