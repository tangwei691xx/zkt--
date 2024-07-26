
const weekend = {
  /**
   * 获取携带小生活标识的消费者链接
   *
   * @returns {string} url
   */
   async getWeekendJumpUrl({ hotelId, productId, productType, origin = location.origin }) {
    const res = await z.request.fetchHome('getAppIdByHotelId', { hotelId });
    
    const { appId } = res || {};
    if (appId) {
      let url = this.getTicketProductUrl({ appid: appId, productId, productType });
      if (url) {
        url = origin + url + `&source=weekend&source_first=weekend`;
        return this.consumerLink(origin, appId, url)
      }
    }
    return false;
  },
  // 生成消费者链接
  consumerLink(origin = location.origin, appid, url) {
		return origin + `/${appid}/ShareTool/mid?appid=${appid}&url=${encodeURIComponent(url)}`
	},
  // 获取预售券path
  getTicketProductUrl({appid, productId, productType}) {
    let url = `/r_ticket_poster/appid_${appid}?id=${productId}&appid=${appid}`;
    
    if (productType === 'ticketPackage') {
        url = `/r_ticket_package/appid_${appid}?id=${productId}&appid=${appid}`;
    } else if (productType === 'bundledActivity') {
        // 捆绑售卖活动地址
        url = `/Ticket/Bundle/appid_${appid}?bundle_id=${productId}&appid=${appid}`;
    } else if (productType === 'orderSetMeal') {
        url = `/Ticket/TicketPoster/appid_${appid}?id=${productId}&appid=${appid}`;
    } else if (productType === 'freeGroup') {
        url = `/Ticket/Bundle/appid_${appid}?free_group_id=${productId}`
    } else if (productType === 'blindBox') {
        url = `/Ticket/TicketPoster/appid_${appid}?id=${productId}&appid=${appid}`;
    }
    return url;
  },
};
module.exports = weekend;
