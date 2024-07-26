/** @format */

const route = require('../route/index.es6');

/**
 * 不同微服务中请求的方法
 * @exports zkt.request
 */
const fetch = {
  /**
   * 获取Home的接口
   *
   * @param {string} method  method
   * @param {object} args args
   * @param {object} options options
   *
   * @returns promise
   */
  fetchHome(method, args, options) {
    const apiEndPoint = `${route.projectPath.home}/api`;
    return zkt.api(method, args, options, apiEndPoint);
  },
  /**
   * 获取shanghu的接口
   *
   * @param {string} method  method
   * @param {object} args args
   * @param {object} options options
   *
   * @returns promise
   */
  fetchShanghu(method, args, options) {
    const apiEndPoint = `${route.protocolHost.getShanghu()}${route.projectPath.shanghu}/api`;
    return zkt.api(method, args, options, apiEndPoint);
  },
  /**
   * 获取common的公共接口
   *
   * @param {string} method  method
   * @param {object} args args
   * @param {object} options options
   *
   * @returns promise
   */
  fetchCommon(method, args, options) {
    const apiEndPoint = `${route.projectPath.common}/commonApisToC`;
    return zkt.api(method, args, options, apiEndPoint);
  },
  /**
   * 获取customize的公共接口
   *
   * @param {string} method  method
   * @param {object} args args
   * @param {object} options options
   *
   * @returns promise
   */
  fetchCustomize(method, args, options) {
    const apiEndPoint = `${route.projectPath.customize}/api`;
    return zkt.api(method, args, options, apiEndPoint);
  },
  /**
   * 获取Room的接口
   *
   * @param {string} method  method
   * @param {object} args args
   * @param {object} options options
   *
   * @returns promise
   */
  fetchRoom(method, args, options) {
    const apiEndPoint = `${route.projectPath.room}/api`;
    return zkt.api(method, args, options, apiEndPoint);
  },
};

module.exports = fetch;
