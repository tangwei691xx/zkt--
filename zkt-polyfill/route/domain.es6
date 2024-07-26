/** @format */
/**
 * @module zkt.route
 */
const routeHelper = require('./helper.es6');
const utils = require('../utils/index.es6');

/**
 * 获取业务的hostname
 * @alias zkt.module:route.hostname
 */
const hostname = {
  /**
   * 返回商户版的hostname
   *
   * @returns {string}
   */
  getShanghu() {
    return utils.getValueByKeyInGlobal('SHANGHU_DOMAIN', '');
  },
  /**
   * 返回二维码的hostname
   *
   * @returns {string}
   */
  getQr() {
    return utils.getValueByKeyInGlobal('QR_DOMAIN', '');
  },
  /**
   * 返回支付的hostname
   *
   * @returns {string}
   */
  getPay() {
    return utils.getValueByKeyInGlobal('PAY_DOMAIN', '');
  },
  /**
   * 返回zd的hostname
   *
   * @returns {string}
   */
  getZd() {
    return utils.getValueByKeyInGlobal('zhidaDomain', '');
  },
};

/**
 * 获取协议及host
 * @alias zkt.module:route.protocolHost
 * @property {function} getShanghu 商户版
 */
const protocolHost = {
  /**
   * 获取商户版协议及域名
   *
   * @returns {string}
   */
  getShanghu() {
    return `${routeHelper.getProtocol()}://${hostname.getShanghu()}`;
  },
  /**
   * 获取二维码协议及域名
   *
   * @returns {string}
   */
  getQr() {
    return `${routeHelper.getProtocol()}://${hostname.getQr()}`;
  },
  /**
   * 获取zd协议及域名
   *
   * @returns {string}
   */
  getZd() {
    return `${routeHelper.getProtocol()}://${hostname.getZd()}`;
  },
};

module.exports = {
  hostname,
  protocolHost,
};
