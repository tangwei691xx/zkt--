/** @format */
const utils = require('../utils/index.es6');
const storage = require('../storage/index.es6');
const fetch = require('../request/fetch.es6');

/**
 * 商户相关
 * @memberof zkt
 * @exports zkt.merchant
 */
const merchant = {
  /**
   * 判断当前商户是否为小生活，依赖node层写入IS_WEEKEND全局变量
   *
   * @returns {boolean} 返回是否小生活
   */
  isWeekend() {
    return utils.getValueByKeyInGlobal('IS_WEEKEND', false);
  },

  /**
   * 判断当前商户是否首旅
   */
  isShouLv(appId = '') {
    return new Promise((resolve, reject) => {
      if (!appId) {
        appId = z._GET('appid') || '';
      }

      if (!appId) {
        return resolve(false);
      }

      const STORAGE_KEY = `MERCHANT_${appId}_IS_SHOU_LV`;
      const cacheData = storage.sessionStorage.get(STORAGE_KEY);
      
      if (cacheData === null || cacheData === undefined) {
        fetch.fetchHome('getIsShouLv', {}, { silent: true }).then(({ isShouLv }) => {
          storage.sessionStorage.set(STORAGE_KEY, isShouLv);
          resolve(isShouLv);
        }).catch(() => {
          resolve(false);
        })
      } else {
        resolve(cacheData);
      }
    });
  }

};
module.exports = merchant;
