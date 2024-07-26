/**
 * 企业微信容器适配器
 * @author fanshaoyong
 */
const {wxworkFuncList, checkFuncListArgs, ARG_SHOULD_FUNCTION} = require('./function_list.es6')
let GTR = 1; //大于
let LSS = -1; //小于
let EQU = 0; //等于
function compare (n1, n2) {
	if (typeof n1 !== "number") {
		n1 = 0;
	}
	if (typeof n2 !== "number") {
		n2 = 0;
	}
	if (n1 > n2) {
		return GTR;
	} else if (n1 < n2) {
		return LSS;
	} else {
		return EQU;
	}
}
function versionCompare (v1, v2) {
	let v1arr = String(v1).split(".").map(function (a) {
		return parseInt(a);
	});
	let v2arr = String(v2).split(".").map(function (a) {
		return parseInt(a);
	});
	let arrLen = Math.max(v1arr.length, v2arr.length);
	let result;

	//排除错误调用
	if (v1 == undefined || v2 == undefined) {
		throw new Error();
	}

	//检查空字符串，任何非空字符串都大于空字符串
	if (v1.length == 0 && v2.length == 0) {
		return EQU >= EQU;
	} else if (v1.length == 0) {
		return LSS >= EQU;
	} else if (v2.length == 0) {
		return GTR >= EQU;
	}

	//循环比较版本号
	for (let i = 0; i < arrLen; i++) {
		result = compare(v1arr[i], v2arr[i]);
		if (result == EQU) {
			continue;
		} else {
			break;
		}
	}
	return result >= EQU;
}
const MININUM_VERSION_NOT_LOAD_WXSDK = '3.0.24';
const noop = function () {}
const adaptor = {
  // 企业微信版本
  WXWORK_WEBVIEW_VERSION: (window.navigator.userAgent.match(/wxwork\/([\d|\.]+)\s/) || ['','0'])[1],
  // 判断agentConfig是否需要依赖wx.work
  agentConfigShouldLoadWXSDK () {
    if (z._agentConfigShouldLoadWXSDK !== undefined) {
      return z._agentConfigShouldLoadWXSDK
    }
    let version = adaptor.WXWORK_WEBVIEW_VERSION;
    return z._agentConfigShouldLoadWXSDK = versionCompare(MININUM_VERSION_NOT_LOAD_WXSDK, version)
  },
  /**
   * 
   * @param apis 
   * @param initSignature 
   * @param wxworkAgentEndpoint 
   * @return {Promise} {wx}
   */
  async initWxwork (apis, initSignature, wxworkAgentEndpoint) {
    console.log('initWxwork',apis, initSignature, wxworkAgentEndpoint)
    if (adaptor.agentConfigShouldLoadWXSDK()) {
      // 暂时不做低版本兼容直接提示
      return Promise.reject(Error('请升级企业微信版本至最新版'))
      //await adaptor.initWechatAsync();
    }
    return adaptor.initWxworkAgent(apis, initSignature, wxworkAgentEndpoint)
  },

  _initWechat (cb, apis, initSignature, params) {
    z.initWeChatNew(function (wx, data) {
      if (cb) {
        cb(wx, data)
      } else {
        return Promise.resolve({
          wx,
          data
        })
      }  
    }, apis, initSignature, z.wxworkShareEndpoint || (z.getCommonServicePath() + '/initWxworkWechatShare'), params)
  },
  initWechat (cb, apis, initSignature, params) {
    return adaptor._initWechat(cb, apis, initSignature, params)
  },
  async initWxworkAgentWithoutSignature (apis, wxworkAgentEndpoint) {
    return adaptor.initWxworkAgent(apis, false, wxworkAgentEndpoint)
  },

  throwAdaptorEnvError () {
    if (adaptor.WXWORK_WEBVIEW_VERSION === '0') {
      throw Error('请在企业微信环境中调用')
    }
  },

  async initWxworkAgent (apis, initSignature = true, wxworkAgentEndpoint) {
    wxworkAgentEndpoint = wxworkAgentEndpoint || z.wxworkAgentEndpoint
    if (!wxworkAgentEndpoint) {
      wxworkAgentEndpoint = z.getCommonServicePath() + '/wxworkAgentEndpoint'; 
    }
    let data = z.wxworkAgentData || {};
    adaptor.throwAdaptorEnvError()

    if (initSignature && wxworkAgentEndpoint && !z.isFetchingWxworkAgentData) {
      let shouldAddToWxworkAgentEndPoint = {}
      let params = z._GET();
      // let wxworkCookie = z.cookie.get('wxwork_bind_suite')
      // if(wxworkCookie){
      //   try {
      //     let { corpId, appType} =  JSON.parse(decodeURIComponent(wxworkCookie))
      //     shouldAddToWxworkAgentEndPoint.corpId = corpId
      //     shouldAddToWxworkAgentEndPoint.appType = appType
      //     console.log('存在 wxworkCookie',corpId, appType);
      //   }catch (e) {
      //     console.log('读取wxworkCookie失败：',e);
      //   }
      // }
      if (params.hotel_id) {
        shouldAddToWxworkAgentEndPoint['hotel_id'] = params.hotel_id;
      }
      if (params.corpId || params.corp_id) {
        shouldAddToWxworkAgentEndPoint['corpId'] = params.corp_id || params.corpId;
      }
      let url = z.getShareUrlParams(shouldAddToWxworkAgentEndPoint, wxworkAgentEndpoint, 'wxwork');
      console.log('wxsdk 授权URL',url)
      
      z.isFetchingWxworkAgentData = true
      try {
        data = await z.fetch(url, {silent: true});
        z.isFetchingWxworkAgentData = false
      } catch (e) {
        z.isFetchingWxworkAgentData = false
        throw e;
      }
      z.wxworkAgentData = data;
    }
    return new Promise(function (resolve, reject) {
      let fn = function () {
        adaptor.loadWxwork(function (wx) {
          Object.keys(data).map(k => {
            data[k.toLowerCase()] = data[k];
          });
          if (!apis) apis = [];
          apis = apis.concat(["openUserProfile", "selectExternalContact", "getContext", "getCurExternalChat", "getCurExternalContact", "sendChatMessage", "updateEnterpriseChat", "navigateToAddCustomer", "shareAppMessage", "shareWechatMessage", "shareToExternalContact", "shareToExternalChat", "launchMiniprogram", "chooseInvoice", "enterpriseVerify", "scanQRCode"]);
          let configs = {
            debug: zkt.Debug.isDebug(),
            corpid: data.corpid,
            agentid: data.agentid,
            timestamp: data.timestamp,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: apis,
            success: function (res) {
              z.loadWxworkAgentSuccess = true
              resolve({
                data: res,
                wxworkAgentData: data,
                wx
              })
              console.log('企微初始化jssdk成功',res,data);
            },
            fail: function (res) {
              if(res.errMsg.indexOf('function not exist') > -1){
                reject({
                  code: -1,
                  message: '版本过低请升级'
                })
              }
              console.log('企微初始化jssdk失败',res,data);
              reject(res)
            }
          }
          if (configs.corpid) {
            console.log('wxwork agentConfig ->',configs)
            wx.agentConfig(configs);
          }
        })
      }
      // window版本企业微信初次打开后，后续刷新无自动加载weixinsdk
      if (!window.wx) {
        z.loadWX(fn)
      } else {
        fn()
      }
    })
  },
  loadWxwork (cb) {
    try {
      if (!window.wx || window.wx.agentConfig === undefined) { // jwxwork脚本加载会在全局增加WWOpenData对象
        if (!window.loadWxworkSDK) {
          window.loadWxworkSDK = true;
					let sc = document.createElement('script');
					sc.src = `https://open.work.weixin.qq.com/wwopen/js/jwxwork-1.0.0.js`;
					sc.async = true;
					document.body.appendChild(sc);
        }
				let timeout = setTimeout(() => {
					try {
						zkt.Debug.log('loadWxworkTimeout3000', location.href);
					} catch (e) {
					}
				}, 3000);
				let timer = setInterval(() => {
					if (window['wx'] && typeof window.wx.agentConfig === 'function') {
						try {
							clearTimeout(timeout);
							clearInterval(timer);
						} catch (e) {
						}
						cb(window['wx']);
					}
				}, 100);
				setTimeout(() => {
					try {
						clearInterval(timer);
					} catch (e) {
					}
				}, 20000);
      } else {
        cb(window['wx'])
      }
    } catch (e) {
      zkt.Debug.log('loadWXWorkError:', JSON.stringify(e, Object.getOwnPropertyNames(e)))
    }
  },
  /**
   * 同步调用企业微信jssdk方法
   * @param name jssdk中方法
   * @param args jssdk对应的方法
   * @param options {Object} options.originalValue 返回原始值，不做处理
   * @returns {Promise}
   * @example dispatchWxworkFunctionAsync('getContext')
   * @example dispatchWxworkFunctionAsync('onGetWifiList').then(wifiList)
   */
  async dispatchWxworkFunctionAsync (name, args, options) {
    return adaptor._DISPATCH_WXWORK_FUNCTION_INNER_(name, args, options)
  },
  dispatchWxworkFunction (name, args, options, callback) {
    callback = callback || noop
    return adaptor._DISPATCH_WXWORK_FUNCTION_INNER_(name, args, options, callback)
  },
  async _DISPATCH_WXWORK_FUNCTION_INNER_ (name, args, options={}, callback) {
    adaptor.throwAdaptorEnvError()
    if (!wxworkFuncList[name]) {
      let msg = {
        message: 'the function not be support in weixin jssdk',
        code: -1
      }
      if (callback) {
        return callback(msg);
      }
      return Promise.reject(msg);
    }
    let wxFuncConfig = wxworkFuncList[name];
    console.log('企微 polyfill 调用',wxFuncConfig,z.loadWxworkAgentSuccess)
    const {agentConfig, rule, callMode, value, successName = 'success', complete, checkSuccessFn} = wxFuncConfig;
    let checkArgsIsValid = true;
    if (rule) {
      checkArgsIsValid = checkFuncListArgs(args, rule)
    }
    if (!checkArgsIsValid) {
      let msg = {
        message: 'check whether the method ' + name + ' parameter is legal',
        code: -1
      }
      if (callback) {
        return callback(msg);
      }
      return Promise.reject(msg);
    }
    let wx = window.wx;
    if (agentConfig) {
      if (!z.loadWxworkAgentSuccess) {
        try {
          let initWxwork = await adaptor.initWxwork([], !z.wxworkAgentData);
          wx = initWxwork.wx
        } catch (e) {
          if (callback) {
            return callback(e.message);
          }
          return Promise.reject(e.message);
        }

      }
    }
    let returnValue = {
      value,
      ...options
    }
    const func = function (resolve, reject, callback) {
      args = args || {}
      let func1 = function (res) {
        let result = res;
        let { originalValue, value } = returnValue;
        if (!originalValue) {
          if (value) {
            if (typeof value === 'string') {
              result = res[value]
            } else if (Array.isArray(value)) {
              result = value.map = function (val) {
                return res[val]
              }
            }
          }
        }
        if (callback) {
          return callback(result)
        }
        return resolve(result)
      }
      let func2 = function (res) {
        if (callback) {
          return callback(res)
        }
        return reject(res)
      }
      if (callMode === 'invoke') {
        wx[callMode](name, args, function (res) {
          console.log('wxwork function success', res)
          if (res.err_msg === name + ':ok') {
            return func1(res);
          }
          return func2(res);
        })
      } else if (callMode === 'callByWx'){
        let params = {
          ...args,
          [successName] (res) {
            return func1(res);
          },
          fail (res) {
            return func2(res)
          }
        }
        if (complete) {
          params.complete = function (res) {
            if (callback) {
              return callback(res)
            } else if (Promise.finally) {
              return Promise.finally(res)
            }
          }
        }
        wx[name](params)
      } else if (callMode === 'action'){
        if (args) {
          return wx[name](args)
        }
        // 未传回调函数且不要求originalValue
        if (!originalValue && rule === ARG_SHOULD_FUNCTION) {
          let args = function (res) {
            if (typeof checkSuccessFn === 'string') {
              if (res.errMsg === checkSuccessFn) {
                return func1(res)
              }
              return func2(res)
            } else if (typeof checkSuccessFn === 'function') {
              if (checkSuccessFn(res)) {
                return func1(res)
              }
              return func2(res)
            }
            return func1(res)
          }
          return wx[name](args)
        }
        wx[name](args)
      } else {
        // 暂无其他调用方式
      }
    }
    if (callback) {
      return func(null, null, callback)
    }
    return new Promise(function (resolve, reject) {
      return func(resolve, reject);
    })
  },
  clearWxworkAgentSignature () {
    z.isFetchingWxworkAgentData = false;
    z.wxworkAgentData = null;
    z.loadWxworkAgentSuccess = false;
  },
  getWxworkAgentData () {
    return z.wxworkAgentData || null;
  }
}

module.exports = adaptor;