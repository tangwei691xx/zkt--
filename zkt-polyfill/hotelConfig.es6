/**
 * 此文件用于业务线执行
 * */ 

module.exports = {
  initHotelRegisterConfig(){
    let key = `${window.zkt._GET('appid')}_hotel_member_config`;
    if(!window.zkt._GET('appid')){ return; }
    window.zkt.commonApi('getHotelMemberConfig', { memberConfigType: 'BUSINESSLINE_REGISTER' }).then((data)=>{
      window.zkt.storage && zkt.storage.setItem(key, JSON.stringify(data), 120); // 120s过期
    })
  },
  // 初始化获取货币汇率
  initHotelCurrencyConfig(){

  }

}