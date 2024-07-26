/** @format */

/**
 * route帮助函数
 * @exports zkt.route
 */
const helpers = {
  /**
   * 获取当前的页面的协议，注意，此处不适用支付
   *
   * @param {string} url 链接地址
   * @returns {string} 当前的协议
   */
  getProtocol(url) {
    const _url = url || window.location.href;
    const searchValues = helpers.getSearchValue(undefined, _url);
    if (searchValues.https * 1 === 1) {
      return 'https';
    }
    if (searchValues.platform && !searchValues.debug) {
      return 'https';
    }
    return window.location.protocol.replace(':', '') || 'http';
  },
  /**
   * 获取搜索值
   * @param need 需要获取的值
   * @returns {string|object}
   */
  getCurrentSearchValue (need) {
    let searchValues = {}
    if (zkt.zktRouteInfo) {
      searchValues = zkt.zktRouteInfo.query || {}
    } else {
      searchValues = zkt.uri.search() || {};
    }
    if (need) {
      return searchValues[need];
    }
    return searchValues;
  },
  addParam (url, param, value) {
    let v = value === undefined ? helpers.getSearchValue(param) : value;
    let newUrl = url;
    if (v === 'undefined') {
      console.warn('非法值，请确认');
      v = undefined;
    }
    if (v && url.indexOf(`?${param}=`) === -1 && url.indexOf(`&${param}=`) === -1 && !url.match(/^javascript\:/i)) {
      const seperator = url.indexOf('?') === -1 ? '?' : '&';
      // 当有锚点时处理锚点
      const anchorIndex = url.indexOf('#');
      let anchorStr = '';
      if (anchorIndex !== -1) {
        anchorStr = url.substring(anchorIndex);
        newUrl = url.substring(0, anchorIndex);
      }
      newUrl += `${seperator + param}=${v}${anchorStr}`;
    }
    return newUrl;
  },
};

module.exports = {
  ...helpers,
};
