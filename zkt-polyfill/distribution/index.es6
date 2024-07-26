const help = require('./help.es6');
const rules = require('./rule.es6');
/**
 * @name distribution
 * @memberof zkt
 */
const distribution = {
  ...help,
  rules,
}

for (let i in rules) {
  distribution[i] = function (params = {}) {
    return help.getDistributionIdByOrders(rules[i], params);
  }
}

module.exports = distribution;
