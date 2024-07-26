/** @format */
const fetch = require('./fetch.es6');
/**
 * request帮助方法
 * @exports zkt.request
 */
const helpFunctions = {
  /**
   * 获取商户首页
   * @param {object} args 请求参数
   * @param {number} [args.hotel_id] 酒店ID
   * @param {number} [args.brand_id] 集团ID
   * @param {boolean} [args.optionalOwnerHotel] 无酒店ID则回退到集团主店
   * @param {boolean} [args.backToActive] 是否返回活动页面，目前只在购物车、详情页会返回，但首旅无相关逻辑
   * @param {any} options 111
   * @returns {string}
   */
  async getHomePageUrl(args, options) {
    if (z.adaptor.isPureMini()) {
      return {
        result: '/Customizesnapshot/dynamicHomepage?id=1',
      };
    }
    const homePageData = await fetch.fetchCommon('getHomePageUrlV2', args, options);
    if (homePageData) {
      // 如果需要返回活动页，则需要判断是否为首旅
      if (args && args.backToActive) {
        console.log('首页需要返回活动页，进行特殊逻辑处理');
        const isShouLv = await fetch.fetchHome('getIsShouLv', {}, { silent: true });
        if (isShouLv && isShouLv.isShouLv) {
          console.log('首旅需要直接返回配置首页');
          return homePageData;
        }
        console.log('首页进行活动页特殊逻辑处理');
        let _url = homePageData.result;
        const { tj_bm_board_id, zkt_referrer } = zkt.zktRouteInfo.query || {};
        if ([28658, 102472, 102407].includes(tj_bm_board_id * 1)) {
          // 富力单独定制的首页跳转需求
          // 通过酒店旗舰商城分享出去的列表页、详情页（无论经过了多少人的分享），在单品详情页点击【首页】，返回酒店旗舰商城首页。
          // 需求地址：http://wiki.zhiketong.net/pages/viewpage.action?pageId=52364437
          // 负责产品：杨成
          _url = `/r_board?id=${tj_bm_board_id}`;
        } else {
          const referrer = zkt_referrer || document.referrer || '';
          const reg = /\/(r_board|Ticket\/Board|Customizesnapshot|Ticket\/DefaultIndex)/;
          // 判断一下来源
          if (reg.test(referrer)) {
            // 聚合海报，自定义页面，默认首页跳转到原来的位置;
            _url = referrer.replace(/\/Ticket\/Board\/.*\?/, '/r_board?');
          }
        }
        return {
          ...homePageData,
          result: _url,
        };
      }
    }
    return homePageData;
  },
  /**
   * 获取集团中央预订情况下 关注公众号是否展示
   * @returns {boolean} 展示结果
   */
  async getCentralQrcodeStatus() {
    let showQr = true;
    try {
      const data = await fetch.fetchCommon('centralCanPromotionWx', null, {
        silent: true,
      });
      if (data && data.success && data.wx !== undefined) {
        showQr = data.wx;
      }
    } catch (e) {
      console.error(e);
    }
    return showQr;
  },
};
module.exports = helpFunctions;
