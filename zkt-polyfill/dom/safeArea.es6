/** @format */
/**
 * @author fsy0718
 * @file 刘海屏安全区域相关函数
 */
const utils = require('./util.es6');

const directionVariableEnum = {
  Top: '--sat',
  Bottom: '--sab',
  Left: '--sal',
  Right: '--sar',
};

const safeFunctions = {};

for (const i in directionVariableEnum) {
  /**
   * 返回指定方向上的安全距离
   * @returns {number} 安全值
   */
  safeFunctions[`get${i}SafeNumber`] = function () {
    return utils.getHTMLCssValueNumber(directionVariableEnum[i], 0);
  };
}

module.exports = safeFunctions;
