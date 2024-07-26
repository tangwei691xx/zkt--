/** @format */
/**
 * @author fsy0718
 * @file dom相关帮助函数
 */
const utils = {
  /**
   * 获取HTML上的指定属性的值
   * @param {string} key  属性名称
   * @param  {string} [defaultValue] 默认值
   * @returns {string} 返回值
   */
  getHTMLCssValue(key, defaultValue) {
    return utils.getDomCssValue(document.documentElement, key, defaultValue);
  },
  /**
   * 获取HTML上的指定属性的值,并转换成数值类型
   * @param {string} key  属性名称
   * @param  {number} [defaultValue] 默认值
   * @returns {number} 返回值
   */
  getHTMLCssValueNumber(key, defaultValue) {
    const result = utils.getHTMLCssValue(key, defaultValue);
    try {
      return parseFloat(result);
    } catch (e) {
      return defaultValue;
    }
  },
  /**
   * 获取dom的css样式值
   * @param {dom} dom dom元素
   * @param {string} key 属性值
   * @param {string} defaultValue 默认值
   * @returns 返回值
   */
  getDomCssValue(dom, key, defaultValue) {
    if (!dom) {
      return defaultValue;
    }
    try {
      const styles = window.getComputedStyle(dom);
      if (key) {
        return styles.getPropertyValue(key) || defaultValue;
      }
      return styles || defaultValue;
    } catch (e) {
      return defaultValue;
    }
  },
};

module.exports = utils;
