module.exports = {
  getDeviceToken() {
    if (window.aliUmModule && window.aliUmModule.getToken) {
      return window.aliUmModule.getToken();
    }
    return null
  },
  riskInstance: null,
  riskCurMerchantConfig: null, // 当次商户风险配置
  riskPromiseQueue: {
    resolves: [],
    rejects: [],
  },
  riskCodeConfig: null, // 验证码弹窗类型配置-校验用户有风险时返回
  // 获取pageId
  getCurPageId() {
    return zkt.sensorTrack && zkt.sensorTrack.getPageId && zkt.sensorTrack.getPageId()
  },
  // 获取商户风险配置
  getRiskMerchantConfig() {
    if (!(window.GLOBAL_ENV && window.GLOBAL_ENV.ENABLE_RISK)) Promise.resolve(null)
    const cache = zkt.storage.getItem(`risk_config_${zkt._GET('appid')}`)
    if (cache) return Promise.resolve(cache)
    if (zkt.riskInstance) {
      return zkt.riskInstance;
    }
    zkt.riskInstance = zkt.commonApi('getRiskMerchantConfig', {appType: 'H5'}, { disableRisk: true }).then((res) => {
      const riskConfigData = res && res.data && res.data.risk_verify;
      zkt.storage.setItem(`risk_config_${zkt._GET('appid')}`, riskConfigData, 60 * 5)
      return riskConfigData
    }).finally(() => {
      zkt.riskInstance = null
    })
    return zkt.riskInstance
  },
  // 当前请求是否命中商户配置
  async checkIsInRiskConfig(method) {
    return new Promise((resolve) => {
      try{
        zkt.getRiskMerchantConfig().then((data) => {
          if (data && data.length) {
            const configItem = data.find((item) => {
              if (item.nodePath === method) {
                return true
              }
            })
            if (configItem) {
              resolve(configItem)
            } else {
              resolve(false)
            }
          } else {
            resolve(false)
          }
        }).catch((err) => {
          console.error(err)
              resolve(false)
            })
      } catch(err) {
        console.error(err)
        resolve(false)
      }
      
    })
  },
  // 检测当前用户请求是否有风险
  async verifyUserRisk(curConfig) {
    const needVerify = await z.commonApi('verifyUserRisk', {scene: curConfig.scene}, {disableRisk: true, device_token: 1}).then((res) => {
      if (res.needVerify) {
        if (!zkt.riskCodeConfig) zkt.riskCodeConfig = res;
        if (!zkt.riskCurMerchantConfig) zkt.riskCurMerchantConfig = curConfig
        return true
      }
      return false
    }).catch((err) => {
      console.warn('verifyUserRisk---err', err)
      return false
    })
    return needVerify;
  },
  // 风险识别处置
  async handleRisk(method, resolve, reject) {
    const curConfig = await zkt.checkIsInRiskConfig(method);
    if (!curConfig) {
      return resolve()
    } else { // 风险校验
      const needVerify = await zkt.verifyUserRisk(curConfig);
      if (needVerify) {
        zkt.riskPromiseQueue.resolves.push(resolve)
        zkt.riskPromiseQueue.rejects.push(reject)
        console.log('bus-----showRiskModal')
        zkt.eventBus.trigger('showRiskModal');
      } else {
        return resolve()
      }
    }
  },
}