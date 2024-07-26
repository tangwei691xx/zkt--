/** @format */
const request = require('../request/index.es6');

const behavior = {
  async jumpToHome (args, options) {
    try {
      const homePageUrl = await request.getHomePageUrl(args, options);
      if (homePageUrl) {
        return zkt.jumpTo(homePageUrl);
      }
      throw Error('未获取到首页配置');
    } catch (e) {
      return Promise.reject(e);
    }
  },
};
module.exports = behavior;
