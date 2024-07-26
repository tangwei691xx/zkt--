const member = require('../member/index.es6');
const help = {
  getDistributionIdByOrders (orders, params) {
    const distributionIds = help.getDistributionIds(params);
    let result = {}
    orders.some(function (key) {
      if (distributionIds[key]) {
        result[key] = distributionIds[key];
        return true;
      }
      return false;
    })
    if (result.memberId) {
      result = {
        mid: result.memberId
      }
    }
    return result;
  },
  getCurrentMemberIdFromClient () {
    return member.getCurrentMemberId()
  },
  getSuppliersId () {
    const { cid, mid } = zkt.route.getCurrentSearchValue();
    return {
      cid,
      mid
    }
  },
  getDistributionIds (params) {
    return {
      ...help.getSuppliersId(),
      memberId: help.getCurrentMemberIdFromClient(),
      ...(params || {})
    }
  },
}

module.exports = help;
