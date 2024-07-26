const navtiveApp = {
  androidFn (param = {}, callBack) {
    if (window.onWebViewJavascriptBridgeReady) window.onWebViewJavascriptBridgeReady(window.__bridge = WebViewJavascriptBridge)
    window.WebViewJavascriptBridge.callHandler('fromEbmHandler', param, callBack)
  },
  iosFn (param = {}) {
    window.webkit && window.webkit.messageHandlers.JSANDIOSINTERACTION.postMessage(param)
  },
  setAppArgs (actionType) {
    const opts = {}
    if (z.isAndroidFormApp) {
      opts.method = actionType
    }
    if (z.isIOSFormApp) {
      const iosMap = {
        initIOSCallBack: 1001, // ios端初始回调
        logout: 1002, // 重新登录或token失效
        share: 1003, // 分享
        webUrl: 1004, // 二级页面跳转
        toggleHotel: 1005, // 切换酒店
        toBackPage: 1006, // 处理中间空白页返回
        copyContent: 1007, // 拷贝内容
        needRefresh: 1008, // 需要刷新页面
        scan: 1009, // 扫一扫
        finish: 1010, // 关掉二级页面
        withdraw: 1011, // 员工提现
        ocr: 1012 // 图文识别卡
      }
      opts.state = iosMap[actionType]
    }
    return opts
  },
  onNavtiveApp (type, param = {}, callBack) {
    if (!z.hasContainInApp) return z.Toast('不是在app容器')
    let args = {
      ...this.setAppArgs(type),
      params: param
    }
    if (z.isAndroidFormApp) {
      this.androidFn(args, callBack)
    }
    if (z.isIOSFormApp) {
      args.params.callBack = null
      if (callBack !== null && typeof callBack === "function") {
        let callback_name = 'C' + Math.random().toString(36).substr(2)
        window[callback_name] = function (obj) {
          callBack(obj)
          delete window[callback_name]
        }
        args.params.callBack = callback_name
      }
      this.iosFn(args)
    }
  }
}

module.exports = navtiveApp
