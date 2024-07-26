/**
 *  奖励相关
 * */
module.exports = {
	/**
   * 路由匹配初始化采集保护期推荐人信息
	 * @param url 路由值
	 * */
	initProtect (url, params) {
    const preview = window.zkt._GET('preview')
    const appid = window.zkt._GET('appid')
    const entwechat = window.zkt._GET('entwechat')
    // 预览 企业微信不采集 部分业务线页面没有appid
    if (!preview && !entwechat && appid) {
        try {
          const postApi = () => window.zkt.commonApi("saveScanCodeReferees", params);
          postApi()
        } catch (e) {
          console.error('saveScanCodeReferees Error: ',e)
        }
    }
  }
}

