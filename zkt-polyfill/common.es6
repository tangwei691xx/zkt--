module.exports = {
  // 下单页充值引导是否需要实名认证
  async isNeedUserInfo(options) {
    let params = {};
    if (zkt.isObject(options) && options.cardHotelId) {
      params.cardHotelId = options.cardHotelId;
    }
    const { member, PREPAYCARD_PAYOUT_BUY_NEED_ID_CARD, ENABLE_PREPAY_CARD_CERTIFICATION_MODE, ENABLE_PREPAY_CARD_SUPPORT_BIRTHDAY } = await z.request.fetchCommon(
			'CommonUserInfo',
			params,
		);
    const {idcard, member_name, mobile, birthday, hkAndMcPassNum, passport, mtpNo} = member;
    // 是否需要完善会员生日
    const isNeedBirth = ENABLE_PREPAY_CARD_SUPPORT_BIRTHDAY*1 && !birthday;
    // 实名认证模式
    const authMode = ENABLE_PREPAY_CARD_CERTIFICATION_MODE*1;
    if(!member_name || !mobile || isNeedBirth || (!idcard && !hkAndMcPassNum && !passport && !mtpNo)){
      // 开启了需要身份证开关
      if(PREPAYCARD_PAYOUT_BUY_NEED_ID_CARD*1){
        if(authMode===0){
          // 实名认证模式是身份证
          if(member_name && mobile && (idcard || hkAndMcPassNum || passport || mtpNo) && !isNeedBirth) {
            return false;
          }
          return true;
        }else{
          // 实名认证模式是人像，不需填写身份证号
          if(member_name && mobile && !isNeedBirth) {
            return false;
          }
          return true;
        }
      }else{
        if(!member_name || !mobile || isNeedBirth) return true;
      }
    }
    return false;
  }
}