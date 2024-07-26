/**
 * 企业微信jssdk接口列表
 * rule中包含前置必填规则,运用es6自动赋值检查是否为传
 * agentConfig 表示必须先调用agentConfig才可以调用此接口
 * 适用于企业内部开发，第三方应用需要关注是否需要调用agentConfig
 */

const checkValueIsNotEmpty = function (value) {
  if (value === undefined) {
    return false;
  } else if (typeof value === "string") {
    return value !== ""
  } else if (Array.isArray(value)) {
    return value.length > 0;
  } else if (typeof value === "object") {
    return Object.keys(value).length > 0;
  }
  return true;
};

const checkValuesIsNotEmpty = function (props, values) {
  return props.every(function (prop) {
    return checkValueIsNotEmpty(values[prop], values);
  });
}

const ARG_SHOULD_FUNCTION = "ARG_SHOULD_FUNCTION"

const checkFuncListArgs = function (args, props = []) {
  if (!args || typeof args !== "object") {
    return false;
  }
  if (props === ARG_SHOULD_FUNCTION) {
    return !args || typeof args === "function"
  } else if (Array.isArray(props)) {
    return checkValuesIsNotEmpty(props, args)
  } else if (typeof props === "function") {
    return props(args)
  } else if (typeof props === "object") {
    let result = true;
    for (let i in props) {
      let prop = props[i];
      if (Array.isArray(prop)) {
        if (!checkFuncListArgs(args, prop)) {
          result = false;
          break;
        }
      } else if (typeof prop === "function") {
        if (!prop(args[props], args)) {
          result = false;
          break;
        }
      }
    }
    return result;
  }
  return true;
};

const funcList = {
  selectEnterpriseContact: {
    rule: ["fromDepartmentId", "mode", "type"],
    callMode: "invoke"
  },
  openUserProfile: {
    rule: ["userid", "type"],
    callMode: "invoke"
  },
  selectExternalContact: {
    callMode: "invoke",
    rule: {
      //https://work.weixin.qq.com/api/doc/90000/90136/91797
      filterType (value) {
        return value === 0 || value === 1;
      }
    }
  },
  getCurExternalContact: {
    agentConfig: true,
    callMode: "invoke",
    value: "userId"
  },
  getCurExternalChat: {
    agentConfig: true,
    callMode: "invoke",
    value: "chatId"
  },
  sendChatMessage: {
    agentConfig: true,
    rule: {
      NO_EMPTY: ["msgtype"],
      // https://work.weixin.qq.com/api/doc/90000/90136/91789
      msgtypeValue (val, args) {
        let msgtypeValue = args.msgtype;
        if (msgtypeValue) {
          let msgContent = args[msgtypeValue];
          if (msgContent) {
            if (msgtypeValue === "news") {
              return msgContent.link;
            }
            return true;
          }
        }
        return false
      }
    },
    callMode: "invoke"
  },
  getContext: {
    agentConfig: true,
    callMode: "invoke",
    value: "entry"
  },
  openEnterpriseChat: {
    rules (args) {
        return args["userIds"] || args["externalUserIds"]
    },
    callMode: "callByWX"
  },
  updateEnterpriseChat: {
    rules: ["chatId", "userIdsToAdd"],
    agentConfig: true,
    callMode: "invoke"
  },
  navigateToAddCustomer: {
    agentConfig: true,
    callMode: "invoke"
  },
  onMenuShareAppMessage: {
    callMode: "callByWX"
  },
  onMenuShareWechat: {
    callMode: "callByWX"
  },
  onMenuShareTimeline: {
    callMode: "callByWX"
  },
  shareAppMessage: {
    callMode: "invoke"
  },
  shareWechatMessage: {
    callMode: "invoke"
  },
  shareToExternalContact: {
    callMode: "invoke",
    agentConfig: true
  },
  shareToExternalChat: {
    agentConfig: true,
    callMode: "invoke"
  },
  onHistoryBack: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION
  },
  hideOptionMenu: {
    callMode: "action",
  },
  showOptionMenu: {
    callMode: "action",
  },
  hideMenuItems: {
    callMode: "action",
  },
  showMenuItems: {
    callMode: "action",
  },
  hideAllNonBaseMenuItem: {
    callMode: "action",
  },
  showAllNonBaseMenuItem: {
    callMode: "action",
  },
  closeWindow: {
    callMode: "action",
  },
  openDefaultBrowser: {
    callMode: "invoke",
    rule: ["url"]
  },
  onUserCaptureScreen: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION
  },
  scanQRCode: {
    rule: ["needResult", "scanType"],
    callMode: "callByWx"
  },
  chooseInvoice: {
    callMode: "invoke",

  },
  enterpriseVerify: {
    callMode: "invoke",
  },
  launchMiniprogram: {
    callMode: "invoke",
    rule: ["appid"],
    agentConfig: true
  },
  chooseImage: {
    callMode: "callByWx"
  },
  previewImage: {
    callMode: "action",
  },
  uploadImage: {
    callMode: "callByWx"
  },
  downloadImage: {
    callMode: "callByWx"
  },
  getLocalImgData: {
    callMode: "callByWx"
  },
  startRecord: {
    callMode: "action"
  },
  stopRecord: {
    callMode: "callByWx"
  },
  onVoiceRecordEnd: {
    callMode: "callByWx",
    successName: "complete"
  },
  playVoice: {
    callMode: "action",
  },
  pauseVoice: {
    callMode: "action",
  },
  stopVoice: {
    callMode: "action",
  },
  onVoicePlayEnd: {
    callMode: "callByWx"
  },
  uploadVoice: {
    callMode: "callByWx"
  },
  downloadVoice: {
    callMode: "callByWx"
  },
  translateVoice: {
    callMode: "callByWx"
  },
  previewFile: {
    callMode: "action",
  },
  startWifi: {
    callMode: "callByWx"
  },
  stopWifi: {
    callMode: "callByWx",
    complete: true
  },
  connectWifi: {
    callMode: "callByWx",
    complete: true
  },
  getWifiList: {
    callMode: "callByWx",
    complete: true
  },
  onGetWifiList: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION,
    checkSuccessFn (value) {
      return value.wifiList.length > 0
    },
    value: "wifiList"
  },
  onWifiConnected: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION
  },
  getConnectedWifi: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION
  },
  openBluetoothAdapter: {
    callMode: "callByWx",
    complete: true
  },
  closeBluetoothAdapter: {
    callMode: "callByWx",
    complete: true
  },
  getBluetoothAdapterState: {
    callMode: "callByWx",
    complete: true
  },
  onBluetoothAdapterStateChange: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION
  },
  startBluetoothDevicesDiscovery: {
    callMode: "callByWx",
  },
  stopBluetoothDevicesDiscovery: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION
  },
  getBluetoothDevices: {
    callMode: "callByWx",
    complete: true
  },
  onBluetoothDeviceFound: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION
  },
  getConnectedBluetoothDevices: {
    callMode: "callByWx",
    complete: true
  },
  createBLEConnection: {
    callMode: "callByWx",
    complete: true
  },
  closeBLEConnection: {
    callMode: "callByWx",
    complete: true
  },
  onBLEConnectionStateChange: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION,
    //value: ["deviceId", "connected"]
  },
  getBLEDeviceServices: {
    callMode: "callByWx",
    complete: true
  },
  getBLEDeviceCharacteristics: {
    callMode: "callByWx",
    complete: true
  },
  readBLECharacteristicValue: {
    callMode: "callByWx",
    complete: true
  },
  writeBLECharacteristicValue: {
    callMode: "callByWx",
    complete: true
  },
  notifyBLECharacteristicValueChange: {
    callMode: "callByWx",
    complete: true
  },
  onBLECharacteristicValueChange: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION,
  },
  startBeaconDiscovery: {
    callMode: "callByWx",
    complete: true
  },
  stopBeaconDiscovery: {
    callMode: "callByWx",
    complete: true
  },
  getBeacons: {
    callMode: "callByWx",
    complete: true
  },
  onBeaconUpdate: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION,
  },
  onBeaconServiceChange: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION,
  },
  setClipboardData: {
    callMode: "callByWx",
    complete: true,
    rule: ["data"]
  },
  getNetworkType: {
    callMode: "callByWx",
    value: "networkType"
  },
  onNetworkStatusChange: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION,
  },
  openLocation: {
    callMode: "callByWx",
    rule: ["latitude", "longitude"]
  },
  getLocation: {
    callMode: "callByWx"
  },
  startAutoLBS: {
    callMode: "invoke"
  },
  stopAutoLBS: {
    callMode: "invoke"
  },
  onLocationChange: {
    callMode: "action",
    rule: ARG_SHOULD_FUNCTION,
    checkSuccessFn: "auto:location:report:ok"
  },
}

exports.wxworkFuncList = funcList;
exports.checkFuncListArgs = checkFuncListArgs;
exports.ARG_SHOULD_FUNCTION = ARG_SHOULD_FUNCTION;
