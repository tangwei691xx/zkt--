/** @format */
/**
 * 从全局变量中获取值
 * @exports zkt.utils
 *
 * @param {string} key  key
 * @param {any} defaultValue  defaultValue
 * @returns any
 */
function getValueByKeyInGlobal(key, defaultValue) {
  try {
    const globalValue = window.GLOBAL_ENV;
    if (!globalValue) {
      throw Error('当前项目不支持从全局中获取值，请联系项目owner');
    }
    if (key) {
      const value = globalValue[key];
      if (value === undefined) {
        throw Error(`${key}未被注入当前项目中，请联系项目owner`);
      }
      return value;
    }
    return globalValue;
  } catch (e) {
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.NODE_ENV === 'development') {
        throw e;
      }
    }
    return defaultValue;
  }
}

module.exports = getValueByKeyInGlobal;
