/** @format */

const fetch = require('./fetch.es6');
const helpFunctions = require('./functions.es6');
/**
 * @memberof zkt
 * @see {@link zkt.module:request}
 */
const request = {
  ...fetch,
  ...helpFunctions,
};
module.exports = request;
