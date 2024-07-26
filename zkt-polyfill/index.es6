/**
 * 全局变量和帮助函数
 *
 * @format
 */

window.Promise = require('promise-polyfill');
const URI = require('urijs');
const axios = require('axios');
const leftpad = require('left-pad');

const { userAgent } = window.navigator;
const eventBus = {
  onObj: {},
  oneObj: {},
  onObjResult: {},
  oneObjResult: {},
  on: function (eventKey, fn) {
    if (this.onObj[eventKey] === undefined) {
      this.onObj[eventKey] = [];
    }
    this.onObj[eventKey].push(fn);
    if (this.onObjResult[eventKey]) {
      this.trigger.apply(eventBus, this.onObjResult[eventKey]);
    }
  },
  one: function (eventKey, fn) {
    if (this.oneObj[eventKey] === undefined) {
      this.oneObj[eventKey] = [];
    }
    this.oneObj[eventKey].push(fn);
  },
  off: function (eventKey) {
    this.onObj[eventKey] = [];
    this.oneObj[eventKey] = [];
    delete this.onObjResult[eventKey];
  },
  trigger: function () {
    let eventKey, args;
    if (arguments.length == 0) {
      return false;
    }
    eventKey = arguments[0];
    args = [].concat(Array.prototype.slice.call(arguments, 1));
    if (this.onObj[eventKey] !== undefined && this.onObj[eventKey].length > 0) {
      for (let i in this.onObj[eventKey]) {
        this.onObj[eventKey][i].apply(null, args);
      }
    }
    if (this.oneObj[eventKey] !== undefined && this.oneObj[eventKey].length > 0) {
      for (let i in this.oneObj[eventKey]) {
        this.oneObj[eventKey][i].apply(null, args);
        this.oneObj[eventKey][i] = undefined;
      }
      this.oneObj[eventKey] = [];
    }
  },
  triggerDelay () {
    let eventKey, args;
    if (arguments.length == 0) {
      return false;
    }
    eventKey = arguments[0];
    args = [].concat(Array.prototype.slice.call(arguments, 1));
    if (!eventBus.onObjResult[eventKey]) {
      eventBus.onObjResult[eventKey] = [eventKey].concat(args);
    }
    eventBus.trigger.apply(eventBus, eventBus.onObjResult[eventKey]);
  },
};
const popUpManager = {
  initWeight (popUpQueue) {
    if (popUpQueue.coupon && popUpManager.popUpQueue.coupon && popUpManager.popUpQueue.coupon.show !== -1) {
      popUpQueue.coupon.show = popUpManager.popUpQueue.coupon.show;
    }
    popUpManager.popUpQueue = popUpQueue;
  },
  // 超时设置 弹层状态 如果=-1 设置为0
  timeoutResetPopUpStatus () {
    for (let key in popUpManager.popUpQueue) {
      let pop = popUpManager.popUpQueue[key];
      if (pop.show === -1) {
        console.warn(key + ':timeout---------');
        pop.show = 0;
      }
    }
  },
  // 弹层显示状态和权重，1为最大，show -1为未获取到，0为不显示，1为显示
  popUpQueue: {
    coupon: { weight: 1, show: -1 },
    BindPhone: { weight: 2, show: -1 },
  },
  checkCurrentPopUpCanShow (popUpName) {
    if (!popUpManager.popUpQueue[popUpName]) {
      console.error('初始化未配置：' + popUpName);
      return false;
    }
    if (this.popUpQueue[popUpName].show !== 1) {
      return false;
    }
    let res = Object.keys(popUpManager.popUpQueue || {}).some((item) => {
      console.log(popUpName, item);
      console.log(popUpManager.popUpQueue[popUpName].weight, popUpManager.popUpQueue[item].weight);
      let res =
        popUpManager.popUpQueue[item].show > 0 &&
        popUpName !== item &&
        popUpManager.popUpQueue[item].weight < popUpManager.popUpQueue[popUpName].weight;
      return res;
    });
    return !res;
  },
  initPopUpEventBus (popUpQueueConfig, callback, timeout = 20000) {
    popUpManager.initWeight(popUpQueueConfig);
    if (popUpManager.timeout) {
      clearTimeout(popUpManager.timeout);
    }
    if (z._GET('timeout')) {
      timeout = z._GET('timeout');
    }
    //设置时限限制，超过时间 设为0 不弹出
    popUpManager.timeout = setTimeout(() => {
      console.warn('popUpManager.timeoutResetPopUpStatus');
      popUpManager.timeoutResetPopUpStatus();
      callback(popUpManager.popUpQueue);
    }, timeout);
    eventBus.off('PopUpStatus');
    eventBus.on('PopUpStatus', (popUpQueue) => {
      clearTimeout(popUpManager.timeout);
      // if (popUpManager.checkCurrentPopUpCanShow()) {
      callback(popUpQueue);
      // }
    });
  },
  /**
   * description 遍历所有弹层  判断是否有弹层的 show 为-1的 情况下  权重是否高于当前弹层
   * @param popUpQueue
   */
  checkTriggerCallback (popUpQueue) {
    for (let key in popUpManager.popUpQueue) {
      let item = popUpManager.popUpQueue[key];
      if (item.weight < popUpQueue.weight && item.show === -1) {
        return false;
      }
    }
    return true;
  },

  sendPopUpStatus (popUpName, val, trigger = true) {
    console.log(popUpManager.popUpQueue);
    console.log('sendPopUpStatus:', popUpName, val);
    if (!popUpManager.popUpQueue[popUpName]) {
      console.error('初始化未配置：' + popUpName);
      return;
    }
    if (popUpManager.popUpQueue[popUpName].show !== val) {
      popUpManager.popUpQueue[popUpName].show = val;
      //如果val为显示，获取是否可以触发 callback
      if (val && popUpManager.checkTriggerCallback(popUpManager.popUpQueue[popUpName]) && trigger) {
        //触发PopUpStatus  进行回调
        eventBus.trigger('PopUpStatus', popUpManager.popUpQueue);
        return;
      }
      let checkNotComplete = Object.keys(popUpManager.popUpQueue).some((item) => {
        return popUpManager.popUpQueue[item].show === -1;
      });
      //验证完所有弹层的状态后发送消息
      if (!checkNotComplete && trigger) {
        eventBus.trigger('PopUpStatus', popUpManager.popUpQueue);
      }
    }
  },
};
const zktDebug = require('./debug.es6');
const TJ = require('./tongji.es6');
const zhilian = require('./zhilian.es6');
const trackMap = require('./trackMap.es6');
const coupons = require('./coupons.es6');
const zktMath = require('./math.es6');
const Currency = require('./currency.es6');
const adaptor = require('./adaptor.es6');
const sensorTrack = require('./sensorTrack/index.es6');
const reward = require('./reward.es6');
const track = require('./track.es6');
const regexps = require('./regexps.es6');
const validate = require('./validate.es6');
const _abTest = require('./abTest.es6');
const storage = require('./storage.es6');
const memberRegisterCheck = require('./hotelConfig.es6');
const userBehaviortracking = require('./userBehaviortracking.es6');
const parseDomainCommon = require('./parseDomian.es6');
const businessController = require('./businessController.es6');
const getHostSupportWeapp = require('./getHostSupportWeapp.es6');
const adaptorNavtiveApp = require('./adaptorNavtiveApp.es6');
const pubilcPathConfig = require('./pubilcPathConfig.es6');
const { bridge, zktNavigator } = require('zhida-bridge');
const language = require('./language.es6');
const utils = require('./utils/index.es6');
const errorInteraction = require('./error.es6');
const merchant = require('./merchant/index.es6');
const route = require('./route/index.es6');
const weekend = require('./weekend/index.es6');
const request = require('./request/index.es6');
const geoLocation = require('./location/index.es6');
const common = require('./common.es6');
const behaviors = require('./behaviors/index.es6');
const uri = require('./uri/index.es6');
const dom = require('./dom/index.es6');
const db = require('./db/index.es6');
const pageLife = require('./pageLife/index.es6');
const member = require('./member/index.es6');
const distribution = require('./distribution/index.es6');
const risk = require('./risk.es6');
const floatLayer = require('./floatLayer.es6');

window.onerror = function (msg, url, lineNo, columnNo, error) {
  if (zktDebug.isDebug()) {
    var string = msg.toLowerCase();
    var substring = 'script error';
    if (string.indexOf(substring) > -1) {
      alert('Script Error: See Browser Console for Detail');
    } else {
      error._stack = error && error.stack && typeof error.stack === 'string' ? error.stack.split('\n') : [];
      error._stack.shift();
      error._stack = error._stack.map((l) => l.trim());
      var message = [
        'Message: ' + msg,
        'URL: ' + url,
        'Line: ' + lineNo,
        'Column: ' + columnNo,
        'Error object: ' + JSON.stringify(error),
      ].join(' <br> ');
      let div = document.createElement('div');
      div.innerHTML = message;
      div.style = `position: fixed;
             left: 0;
             top: 0;
             right: 0;
             bottom: 0;
             padding:10px;
             z-index: 1000000000;
             background-color: rgba(255, 255, 255, 0.93);
             word-wrap: break-word;
             opacity: 1;`;
      document.body.appendChild(div);
      // alert(message);
    }
  }
  console.error(msg);
  setTimeout(() => {
    let s = msg.toString();
    if (s.match(/find\s+variable/i)) return;
  }, 10);
};
window.alert = function (name) {
  let iframe = document.createElement('IFRAME');
  iframe.style.display = 'none';
  iframe.setAttribute('src', 'data:text/plain,');
  document.documentElement.appendChild(iframe);
  iframe.contentWindow.alert(name);
  iframe.parentNode.removeChild(iframe);
};
// assign polyfill
Object.assign =
  Object.assign ||
  function (target) {
    for (let i = 1; i < arguments.length; i++) {
      let source = arguments[i];
      for (let key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

/**
 * @namespace
 */
const zkt = {
  /**
   * 配置zkt模块并返回
   * @param {object} config 需要混入zkt的对象
   * @mixes zktInnerProperty
   * @returns {namespace:zkt}
   */
  config (config) {
    /**
     * 支持以下注入：
     * history: react-router的历史提供者
     * wxShareEndpoint: 微信分享sign的url
     * apiEndoint: api请求的url
     */
    if (!config) config = {};

    try {
      window.GLOBAL_ENV = GLOBAL_ENV || '';
    } catch (e) {
      window.GLOBAL_ENV = '';
    }
    Object.assign(
      zkt,
      {
        disabledAutoInitModules: [],
      },
      config,
    );
    // change by fsy0718,重写企业微信的sdk版本
    if (zkt.isWeixinWork) {
      // 企业微信sdk只支持https://work.weixin.qq.com/api/doc/90000/90136/90514
      zkt.WX_SDK_VERSION = '1.2.0';
    } else {
      // 防止误修改其余环境改为false
      zkt.DISABLE_JUMP = false;
    }
    zkt.bridge = bridge;
    zkt.overWriteConsole();
    zkt.overwriteScrollTo();
    zkt.popUpManager = popUpManager;
    zkt.eventBus = eventBus;
    zkt.Debug = zktDebug;
    zkt.Debug.tools();
    zkt.zhilian = zhilian;
    if (zkt.disabledAutoInitModules.indexOf('zhilian') === -1) {
      zkt.zhilian.init();
    }

    zkt.trackMap = trackMap;
    zkt.trackMap.init();
    zkt._abTest = _abTest;
    //zkt.bm = bm;
    zkt.Math = zktMath;
    zkt.Currency = Currency;
    zkt.adaptor = adaptor;
    zkt.storage = storage;
    zkt.storage.init();
    zkt.memberRegisterCheck = memberRegisterCheck;
    zkt.navigator = zktNavigator;
    zkt.sensorTrack = sensorTrack;
    zkt.reward = reward;
    zkt.adaptor.init();
    zkt.track = track;
    zkt.weekend = weekend;
    zkt.errorInteraction = errorInteraction;
    zkt.parseDomainCommon = parseDomainCommon;
    zkt.adaptorNavtiveApp = adaptorNavtiveApp;
    zkt.language = language;
    zkt.db = db;
    db.init();
    zkt.language.init();
    zkt.common = common;
    if (zkt.TJ_config) {
      if (zkt.TJ_config.pvMap) {
        zkt.TJ_config.pvMap = zkt.reWritePathList();
      }
      // zkt.TJ.init(zkt.TJ_config);
      // if (zkt.TJ_config.initTrack) {
      //   zkt.track.init(zkt.TJ_config);
      // }
    }
    /**
     * 只在微信环境下初始化红包
     */
    if (zkt.isWeixin && !zkt.isWeixinWork) {
      /**
       * 初始化红包提示
       */
      zkt.couponsConfig = zkt.couponsConfig || zkt;
      coupons.config = { ...coupons.config, ...zkt.couponsConfig };
      zkt.coupons = coupons;
      zkt.coupons.init();
    }
    zkt.domContentLoaded(function () {
      zkt.fixBlurInputBug();
    });
    // document.addEventListener('DOMContentLoaded', function (event) {

    // });
    return zkt;
  },
  /**
   * 重写路由，添加隔离 appid_xxxxx
   * @param path
   * @param appid
   * @returns {string}
   */
  reWritePath (path, rewriteUrl = [], isGoto = false, appid, mountPath) {
    // 全站隔离灰名单酒店和业务线以及黑名单
    let { needCheckBlackPath = false, blackPathList = [] } = zkt.checkBlackPath(appid, mountPath);
    let inRewriteList = false;
    appid = appid || z._GET('appid');
    path = path === '/' ? path : path.lastIndexOf('/') === path.length - 1 ? path.substring(0, path.length - 1) : path;
    let rewriteStr = appid ? '/appid_' + appid : '';
    let rewritePath = '/:appid?';
    let shouldRewrite = false;
    if (isGoto) {
      if (path.indexOf(rewriteStr) !== -1) {
        return path;
      }
    } else if (path.indexOf(rewritePath) !== -1) {
      return path;
    }
    if (needCheckBlackPath) {
      if (!blackPathList.includes(path)) {
        shouldRewrite = true;
      }
    } else if (rewriteUrl === '*' || (rewriteUrl.length > 0 && rewriteUrl.includes(path))) {
      shouldRewrite = true;
    }
    if (shouldRewrite) {
      if (isGoto) {
        path += rewriteStr;
      } else {
        path += rewritePath;
      }
    }
    return path;
  },
  reWritePathList (pvMap, rewriteUrl, appid) {
    pvMap = pvMap || zkt.TJ_config.pvMap;
    rewriteUrl = rewriteUrl || zkt.TJ_config.rewriteUrlConfig;
    if (pvMap) {
      let resPvMap = {};
      Object.keys(pvMap).map((item, ids) => {
        resPvMap[zkt.reWritePath(item, rewriteUrl)] = Object.assign({
          __origin_path__: item,
        }, pvMap[item]);
      });
      if (!zkt.TJ_config.pvMapSort) {
        zkt.TJ_config.pvMapSort = zkt.sortPvMap(Object.keys(resPvMap));
      }
      return resPvMap;
    }
    return pvMap || {};
  },
  domContentLoaded (func) {
    if (typeof func !== 'function') {
      return;
    }
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', func)
    } else {
      func()
    }
  },
  //pvMap排序
  sortPvMap (arr) {
    let len = arr.length;
    let preIndex, current;
    for (let i = 1; i < len; i++) {
      preIndex = i - 1;
      current = arr[i];
      while (
        preIndex >= 0 &&
        current.replace('/:appid?', '').split('/').length > arr[preIndex].replace('/:appid?', '').split('/').length
      ) {
        arr[preIndex + 1] = arr[preIndex];
        preIndex--;
      }
      arr[preIndex + 1] = current;
    }
    return arr;
  },
  /**
   * 查询当前是否是灰度酒店、灰度业务线、并查询业务线的黑名单path
   * @returns {object}
   */
  checkBlackPath (appid, mountPath) {
    let defaultRes = {
      needCheckBlackPath: false,
      blackPathList: [],
    };
    try {
      let { pathIsoLationConfig = {} } = window.GLOBAL_ENV;
      mountPath = mountPath || window.GLOBAL_ENV.mountPath;
      appid = appid || zkt._GET('appid');
      if (pathIsoLationConfig) {
        let { hotelAppid = [], businessLine = [], blackBusinessLinePathList = {} } = pathIsoLationConfig;
        let thisBlackPathList = blackBusinessLinePathList[mountPath] ? blackBusinessLinePathList[mountPath] : [];
        if (!hotelAppid.length || hotelAppid.includes(appid)) {
          if (businessLine.includes(mountPath)) {
            return {
              blackPathList: thisBlackPathList,
              needCheckBlackPath: true,
            };
          }
        }
      }
    } catch (e) {
      return defaultRes;
    }
    return defaultRes;
  },
  /**
   * 检查当前容器微信版本是否低于 7.0.12；iOS 系统版本是否低于 10.3； Android 系统版本是否低于 5.0
   * @property {function}
   */
  getHostSupportWeapp,
  leftpad,
  TJ,
  validate,
  regexps,
  utils,
  merchant,
  route,
  request,
  geoLocation,
  behaviors,
  uri,
  dom,
  pageLife,
  member,
  distribution,
  floatLayer,
  /**
   * @property {object} businessController
   * @since 1.2.328
   * @alias module:zkt-polyfill/businessController
   */
  businessController,
  WX_SDK_VERSION: '1.0.0',
  // 禁止跳转，企业微信使用
  DISABLE_JUMP: false,
  /**
   * 兼容微信6.7.4及后版本在页面高度不超过一屏时输入聚焦然后失焦后,部分元素无法点击的BUG
   */
  fixBlurInputBug () {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    function resetBodyPadding () {
      document.querySelector('body').style.paddingBottom = zkt.fixBlurInputBugTempPadding;
    }

    //用于解决在弹出输入框后页面滚动位置错误问题
    function resetScroll () {
      try {
        document.body.scrollTop++;
        document.body.scrollTop--;
      } catch (e) { }
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      document.querySelector('body').addEventListener('click', (e) => {
        if (
          e.target &&
          e.target.nodeName.toUpperCase() == 'INPUT' &&
          ['radio', 'checkbox', 'reset', 'button', 'submit', 'image', 'hidden', 'range'].indexOf(e.target.type) === -1
        ) {
          e.target.removeEventListener('blur', resetScroll);
          e.target.addEventListener('blur', resetScroll);
          if (document.documentElement.scrollHeight <= window.innerHeight) {
            zkt.fixBlurInputBugTempPadding = document.querySelector('body').style.paddingBottom;
            document.querySelector('body').style.paddingBottom = '100vh';
            e.target.removeEventListener('blur', resetBodyPadding);
            e.target.addEventListener('blur', resetBodyPadding);
          }
        }
      });
    }
  },
  consoleCallback () {
    try {
      if (arguments.length > 1 && arguments[1].stack) {
        let error = arguments[1];
        error._stack = error && error.stack && typeof error.stack === 'string' ? error.stack.split('\n') : [];
        error._stack.shift();
        error._stack = error._stack.map((l) => l.trim());
        var message = ['Message: ' + arguments[1].message, 'Error object: ' + JSON.stringify(error)].join(' \r\n ');
        alert(message);
      } else {
        alert(JSON.stringify(arguments));
      }
    } catch (e) {
      alert(arguments);
    }
  },
  /**
   * 重写console
   */
  overWriteConsole () {
    if (zktDebug.isDebug() && zkt._GET('console')) {
      let originalConsole = Object.assign({}, console);
      Object.keys(console).forEach((item) => {
        console[item] = function () {
          zkt.consoleCallback(...arguments); // Send a mail with the error description
          originalConsole[item].apply(console, arguments);
        };
      });
    }
  },
  isObject (arg) {
    return typeof arg === 'object' && arg !== null;
  },
  /**
   * 判断是否为空，包括 undefined ,null ,''空字符串，NaN，空数组,空对象
   * @param  {Mixed} obj []
   * @return {Boolean}     []
   */
  isEmpty (obj) {
    if (obj === undefined || obj === null || obj === '') return true;
    if (typeof obj === 'number' && isNaN(obj)) return true;
    if (Array.isArray(obj) && obj.length === 0) {
      return true;
    }
    if (zkt.isObject(obj)) {
      for (const key in obj) {
        return false && key; // only for eslint
      }
      return true;
    }
    return false;
  },
  getIsNotEmptyData(array) {
    let res;
    if (Array.isArray(array)) {
      array.some((item) => {
        if (!z.isEmpty(item)) {
          res = item;
          return true;
        }
        return false;
      });
    }
    return res;
  },

  /**
   * 重写scrollTo, 流畅滚动
   */
  overwriteScrollTo () {
    const originalScrollTo = window && window.scrollTo;
    if (!originalScrollTo) return;
    window.scrollTo = function (x, y) {
      const isObj = typeof x === 'object';
      const config = {
        left: isObj ? x.left : x || 0,
        top: isObj ? x.top : y || 0,
        behavior: 'smooth',
      };
      try {
        originalScrollTo.call(this, isObj ? x : config);
      } catch (e) {
        let offsetY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        let offsetX = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        offsetY -= config.top;
        offsetX -= config.left;
        let id;
        const callBack = () => {
          if (Math.floor(Math.max(offsetY, offsetX)) > 0) {
            window.scrollBy(-offsetX * 0.2, -offsetY * 0.2);
            offsetY = offsetY * 0.8;
            offsetX = offsetX * 0.8;
            id = window.requestAnimationFrame(callBack);
          } else {
            window.cancelAnimationFrame(id);
          }
        };
        id = window.requestAnimationFrame(callBack);
      }
    };
  },
  //弹层队列，如果不为空，表示当前状态下，有弹层为展示状态
  popUpQueue: null,
  hasContainInApp: /zkt-ios/i.test(userAgent) || /zkt-android/i.test(userAgent),
  //android终端
  isAndroidFormApp: /zkt-android/i.test(userAgent),
  //ios终端
  isIOSFormApp: /zkt-ios/i.test(userAgent),
  //底部安全区域的iPhone机型
  isIPhoneX: /iphone/gi.test(window.navigator.userAgent) && window.screen.height >= 812,
  //判断是否支付宝小程序
  isAliMini: !!/AlipayClient/i.test(window.navigator.userAgent),
  //判断是否是微信浏览器
  isWeixin: !!/MicroMessenger/i.test(window.navigator.userAgent),
  //是否为企业微信
  isWeixinWork: /MicroMessenger/i.test(window.navigator.userAgent) && /wxwork/i.test(window.navigator.userAgent),
  title (title) {
    document.title = title;
    if (zkt.isWeixin) {
      let iframe = document.createElement('iframe');
      iframe.onload = () => {
        setTimeout(() => {
          document.body.removeChild(iframe);
        }, 0);
      };
      iframe.src = '/favicon.ico';
      document.body.appendChild(iframe);
    }
  },
  fetchCache: {},
  tap (callback, clickThrough) {
    if (!callback || typeof callback !== 'function') return {};
    //如果目标是disabled，则不触发tap事件
    let obj = {};
    obj.onClick = function (evt) {
      if (evt && evt.target && evt.target.disabled) return;
      if (!clickThrough) {
        evt.preventDefault();
        evt.stopPropagation();
      }
      console.log('tapped, evt type=', evt.type);
      callback(evt);
    };
    obj['data-clickable'] = '1';
    return obj;
  },
  get (obj, key) {
    return key.split('.').reduce(function (o, x) {
      return typeof o === 'undefined' || o === null ? o : o[x];
    }, obj);
  },
  price (cent) {
    cent *= 1;
    return (parseInt(cent, 10) / 100).toFixed(2);
  },
  query (d) {
    if (typeof d === 'string') return document.querySelector(d);
    return d;
  },
  addClass (dom, c) {
    dom = this.query(dom);
    //if (!dom) return;
    let names = dom.className || '';
    let arr = names.split(/\s+/);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === c) return true;
    }
    arr.push(c);
    dom.className = arr.join(' ');
  },
  removeClass (dom, c) {
    dom = this.query(dom);
    //if (!dom) return;
    let names = dom.className || '';
    let arr = names.split(/\s+/);
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === c) arr[i] = '';
    }
    dom.className = arr.join(' ');
  },
  history: null,
  setHistory (h) {
    zkt.history = h;
  },
  //使用react-router跳转
  /**
   * 使用react-router 跳转
   * @param url 路径
   * @param extras 添加在url中的参数
   * @param isReplace 是否使用 replace 模式 ，去除历史记录
   */
  goto (url, extras, isReplace) {
    if (zkt.DISABLE_JUMP) {
      return;
    }
    if (!url) {
      zkt.Toast('url参数不正确');
    }
    if (adaptor.miniRedirect(url, extras)) {
      return;
    }
    if (!zkt.history) {
      console.error('use zkt.goto please call zkt.setHistory() first!');
      zkt.jumpTo(url, extras);
      return;
    }
    //清空接口请求缓存
    if (zktDebug.isDebug()) {
      zkt.sendApiList = {};
    }
    // sessionStorage.setItem('zkt-referrer', location.href);
    let key = 'zkt_referrer';
    if (extras) {
      delete extras[key];
    }
    url = this._addParams(url, extras);
    url = zkt.addQuery('zkt_referrer', encodeURIComponent(zkt.removeQuery('zkt_referrer')), url);
    url = zkt.uri.addRiskControl(url, true);
    //url = zkt.addReWritePath(url, true);
    zkt.initWeChatComplete = false;
    zkt.initWeChatStart = false;

    if (isReplace) {
      location.replace(url);
    } else {
      zkt.history.push(url);
    }
  },

  addReWritePath (url, isGoto) {
    try {
      let uri = new URI(url);
      let appid = URI.parseQuery(uri.query()).appid;
      let result = URI.parse(url);
      let mountPath = uri.segment(0);
      let path = uri.pathname();
      let hostName = uri.hostname() || window.location.host;
      let { zktRiskControlBlackDomain = [], zktTopLevelDomain = [] } = window.GLOBAL_ENV;
      mountPath = mountPath || window.GLOBAL_ENV.mountPath;
      if (hostName && !zktRiskControlBlackDomain.includes(hostName)) {
        let isInTopLevelDomain = zktTopLevelDomain.some((item) => {
          return hostName.indexOf(item) !== -1;
        });
        if (isInTopLevelDomain) {
          if (appid && mountPath && path) {
            result.path = zkt.reWritePath(path, zkt.TJ_config.rewriteUrlConfig, isGoto, appid, mountPath);
            url = URI.build(result);
          }
        }
      }
    } catch (e) {
      console.log(e.toString());
    }
    return url;
  },
  // 删除参数,未匹配到则略过
  deleteUrlQuery (key) {
    let href = location.href
    const [head, tail = ''] = href.split('?')
    if (!tail) return
    let params = (tail) ? '?' + tail.split('&').filter((p) => !p.startsWith(key + '=')).join('&') : '?'
    window.history.replaceState({ zkt: 1 }, document.title, params)
  },
  // 添加参数,相同参数会被覆盖
  addUrlQuery (key, value) {
    let href = location.href
    const [head, tail = ''] = href.split('?')
    let separate = (href.indexOf('?') !== -1 && tail) ? '&' : '?'
    let params = tail ? '?' + tail.split('&').filter((p) => !p.startsWith(key + '=')).join('&') : '';
    if (tail.startsWith(key + '=')) { separate = '' }
    window.history.replaceState({ zkt: 2 }, document.title, `${params}${separate}${key}=${value}`)
  },
  //使用replace跳转，去掉返回
  replaceTo (url, extras) {
    zkt.goto(url, extras, true);
  },
  //硬跳转
  jumpTo (url, extras, removeQuery, withReferer = false, isReplace = false) {
    if (zkt.DISABLE_JUMP) {
      return;
    }
    if (!url) {
      zkt.Toast('url参数不正确');
    }
    // 小程序容器下不支持http协议
    if(adaptor.isMiniContainer()){
      url = url.replace(/^http:/, 'https:');
    }
    if (adaptor.miniRedirect(url, extras, removeQuery)) {
      return;
    }
    //  处理支小程序跳转链接带有 midJump 的情况  含支付宝小程序&微信小程序
    if (adaptor.dealMidJumpForMini(url, extras, removeQuery)) {
      return;
    }
    let key = 'zkt_referrer';
    if (extras) {
      delete extras[key];
    }
    url = userBehaviortracking.addTrackDataToUrl(url);
    // 链式调用，注意修改方式
    let jumpUrlURI = zkt.uri.uri(url);
    let currentURI = zkt.uri.uri();
    const jumpToUrlDomain = jumpUrlURI.domain();
    try {
      const { REDIRECT_DOMAIN_WHITELIST = [], HYBIRD_SHOULD_CHECK_APPID_BEFORE_JUMPTO = '0', SHANGHU_DOMAIN } = window.GLOBAL_ENV || {};
      if (adaptor.isMini() && HYBIRD_SHOULD_CHECK_APPID_BEFORE_JUMPTO === '1') {
        const currentHost = location.host;
        const targetHost = jumpUrlURI.host();
        const hostIsZdValid = function (str) {
          return !!(str.match(/\.qingshezhoumo\./) || str.match(/zd(\d?).zhiketong/))
        };
        const currentAndTargetInCDomain = function () {
          // 排除商户版跳H5的情况
          const hostIsShanghu = currentHost === SHANGHU_DOMAIN || (targetHost && targetHost === SHANGHU_DOMAIN);
          return !hostIsShanghu && hostIsZdValid(currentHost) && hostIsZdValid(targetHost);
        };
        const jumpDomainInWhiteList = jumpToUrlDomain && (REDIRECT_DOMAIN_WHITELIST || []).includes(jumpToUrlDomain) && currentAndTargetInCDomain() || false;/* 跳转url在白名单内 */;
        if (jumpDomainInWhiteList && currentHost !== targetHost ) {
          if (jumpDomainInWhiteList  && currentHost !== targetHost /* 跳转url与当前host不同 */) {
            // 替换域名
            jumpUrlURI.host(currentHost);
          }
        }
        const { appid: currentAppid, redirectWeb: currentRedirectWeb } = zkt.zktRouteInfo.query || {};
        const { appid: jumpToAppid, redirectWeb: jumpToRedirectWeb } = jumpUrlURI.search(true);
        // 跳转无域名，或者域名在白名单内且当前小程序非redirectWeb=1,即将跳转的url也没有redirectWeb=1,两个appid不一致时，替换跳转appid为当前页面的appid
        const shouldCheckAppid = (!jumpToUrlDomain || jumpDomainInWhiteList) && currentRedirectWeb === undefined && jumpToRedirectWeb === undefined && currentAppid && jumpToAppid && currentAppid !== jumpToAppid;
        if (shouldCheckAppid) {
          // 替换当前appid
          jumpUrlURI.removeSearch('appid').addSearch('appid', currentAppid);
        }
      }
      url = jumpUrlURI.toString();

    } catch (e) {
      console.error(e);
    }
    jumpUrlURI = null;
    currentURI = null;
    if (withReferer) {
      if (window.GLOBAL_ENV && window.GLOBAL_ENV.REDIRECT_DOMAIN_WHITELIST) {
        // 无域名或者为直客通域名
        if (!jumpToUrlDomain || window.GLOBAL_ENV.REDIRECT_DOMAIN_WHITELIST.includes(jumpToUrlDomain)) {
          url = zkt.addQuery('zkt_referrer', encodeURIComponent(zkt.removeQuery(key)), url);
        }
      } else {
        url = zkt.addQuery('zkt_referrer', encodeURIComponent(zkt.removeQuery(key)), url);
      }
    } else {
      url = zkt.removeQuery(key, url);
      if (removeQuery && Array.isArray(removeQuery)) {
        removeQuery.push(key);
      } else {
        removeQuery = [key];
      }
    }
    url = this._addParams(url, extras, removeQuery);
    url = zkt.uri.addRiskControl(url, true);
    //url = zkt.addReWritePath(url, true);

    try {
      if (zkt && zkt.beforeJumpTo && typeof zkt.beforeJumpTo === 'function') {
        zkt.beforeJumpTo();
      }
    } catch (e) {}

    // 小程序内 silentAuth存在表示是无授权进入的页面
    if (z._GET('silentAuth') === '1' && z.adaptor.isMini()) {

      if (!jumpToUrlDomain) {
        url = `${window.location.protocol}//${window.location.host}${url}`;
      }

      const jumpToUrlProtocol = zkt.uri.uri(url).protocol();

      if (!jumpToUrlProtocol) {
        url = `${window.location.protocol}${url}`;
      }

      url = z.removeQuery('silentAuth', url);

      // 如果链接上含有zkt_referrer
      let urlZktReferrer = z.uri.search('zkt_referrer', url);

      if (urlZktReferrer) {
        urlZktReferrer = z.removeQuery('silentAuth', urlZktReferrer);
        url = z.removeQuery('zkt_referrer', url);
      }

      const containerUrl = `${url}${urlZktReferrer ? `&zkt_referrer=${encodeURIComponent(urlZktReferrer)}` : '' }`;

      // 判断链接是否含有域名
      return z.adaptor.callMini('redirect', {
        path: `/pages/webview/container/container?url=${encodeURIComponent(containerUrl)}`,
        appId: '',
        currentIsSilentAuthPath: true,
      });
    }

    if (isReplace) {
      location.replace(url);
    } else {
      location.href = url;
    }
  },
  _addParams (url, extras, removeQuery) {
    //pid eid 小生活新销售关系消费者传播
    //pid 间接传播
    //eid 直接传播
    let params = [
      'appid',
      'cid',
      'mid',
      'source',
      'hotel_id',
      'brand_id',
      'from',
      'myid',
      'noqr',
      'debug',
      'sale_relation_id',
      'debugjs',
      'pid',
      'eid',
      'channel_id',
      'nobuy',
      'plan_id',
      'unit_id',
      'creative_id',
      'manual_tops',
      'if_show_bonus',
      'message_id',
      'is_origin',
      'ls',
      'fs',
      'upgrade_token',
      'hid',
      'coupon_id_type',
      'ishttps',
      'platform',
      'sign',
      'zkt_sign',
      's_id',
      'scene',
      'zkt_scene',
      'test',
      'zktToThird',
      'zkt_mini_type',
      'source_first',
      'zkt_mini_lifecycle',// 模拟的小程序生命周期，目前取值： launch | show
      'redirectWeb',
      'order_event',
      'cf_name',
      'cf_id',
      'wxKolId',
    ];
    //将埋点的扩展数据(广告数据字段和业务数据字段)，透传
    Object.keys(zkt._GET()).map((item) => {
      if (item.indexOf('tj_bm') === 0 || item.indexOf('tj_ab') === 0) {
        params.push(item);
      }
    });

    for (let i = 0; i < params.length; i++) {
      if (extras && extras[params[i]]) continue;
      url = this._addParam(url, params[i]);
    }
    if (extras) {
      for (let key in extras) {
        // console.log(key);
        if (extras[key]) url = this._addParam(url, key, extras[key]);
      }
    }
    //处理特殊逻辑，当跳转页面不为中转页时，url中有参数r_xxx，将r_替换为空
    if (!zkt.isToolsPath(url)) {
      let urlParams = zkt._GET('', url.split('?').length > 1 ? url.split('?')[1] : '');
      if (urlParams) {
        Object.keys(urlParams).map((item) => {
          if (item.indexOf('r_') === 0) {
            let key = item.replace(/^r_/, '');
            let val = urlParams[item];
            url = zkt.removeQuery(item, url);
            url = zkt.addQuery(key, val, url);
          }
        });
      }
    }

    if (removeQuery && Array.isArray(removeQuery)) {
      removeQuery.forEach((item) => {
        url = this.removeQuery(item, url);
      });
    }
    //处理特殊业务逻辑，活码页面跳转时，自动加上参数
    if (url.indexOf('/getCodeImg') !== -1) {
      url = this._addParam(url, 'codepage', 1);
    }

    //  处理支付宝小程序内的跳转时 自动加上平台信息
    if (adaptor.isAliMini()) {
      url.indexOf('platform') < 0 && (url = this._addParam(url, 'platform', 'ali_home'))
    }

    return url;
  },
  //判断是否为中转页路径
  isToolsPath (url) {
    let reg = /\/Tools|ShareTools|ToolsShare|ToolShare|ShareTool|MidJump|MidRedirect/;
    return reg.test(url);
  },
  _addParam (url, param, value) {
    let v = value === undefined ? zkt._GET(param) : value;
    //处理小程序生命周期参数
    if(param==='zkt_mini_lifecycle' &&  zkt._GET('zkt_mini_lifecycle') === 'launch' ){
      v='show';
    }
    if (v === 'undefined') {
      console.warn('非法值，请确认');
      v = undefined;
    }
    if (
      v &&
      url.indexOf('?' + param + '=') === -1 &&
      url.indexOf('&' + param + '=') === -1 &&
      !url.match(/^javascript\:/i)
    ) {
      let seperator = url.indexOf('?') === -1 ? '?' : '&';
      //当有锚点时处理锚点
      let anchorIndex = url.indexOf('#'),
        anchorStr = '';
      if (anchorIndex !== -1) {
        anchorStr = url.substring(anchorIndex);
        url = url.substring(0, anchorIndex);
      }
      url += seperator + param + '=' + v + anchorStr;
    }
    return url;
  },
  hide (test) {
    if (test) {
      return { style: { display: 'none' } };
    } else {
      return { style: {} };
    }
  },
  visible (test) {
    return this.hide(!test);
  },
  cdn (url) {
    if (!url) return '';
    if (url.match(/^https?\:/i)) return url;
    if (window['config'] && window.config['static_cdn'])
      return (window.config.static_cdn + url).replace(/\.cn\/\//, '.cn/');
    return url;
  },
  // todo: 检查无使用可删除
  resizeOld (url, w, h, q = 80, f = 'webp') {
    if (!url) return '';
    return url;
  },
  resize (url, w, h, q = 80, f = 'webp') {
    if (!url) return '';
    let checkUrl;
    checkUrl = /(pic|picssl)\.zhiketong\.(cn|com|net)/.test(url);
    // if (checkUrl && window.GLOBAL_ENV && window.GLOBAL_ENV.STATIC_DOMAIN) {
    // 	// let reg = new RegExp(window.GLOBAL_ENV.STATIC_DOMAIN);
    // 	if (checkUrl) {
    // 		url = url.replace(/(pic|picssl)\.zhiketong\.cn/, window.GLOBAL_ENV.STATIC_DOMAIN)
    // 	}
    // 	// checkUrl = reg.test(url);
    //
    // }
    if (checkUrl) {
      if (location.protocol.indexOf('https') === 0) {
        url = url.replace(/^http:/, 'https:');
      }
      if (url.match(/\.gif$/i)) return url;
      url = url.replace(/\?.*$/, '');
      if (w === 'auto') {
        url += `?x-oss-process=image/resize,h_${h}`;
      } else if (h === 'auto') {
        url += `?x-oss-process=image/resize,w_${w}`;
        // url += '@' + w + 'w';
      } else {
        url += `?x-oss-process=image/resize,m_fill,h_${h},w_${w}`;
      }
      url += `,limit_1,q_${q}`;
      if (zkt.checkWebp()) {
        url += `/format,${f}`;
      }
    }
    return url;
  },
  /**
   * 验证是否支持webp图片格式
   * @returns {*|boolean}
   */
  checkWebp () {
    if (zkt.webpSupport === undefined) {
      try {
        zkt.webpSupport =
          document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') == 0 || this.checkSupportWebp() || false;
      } catch (err) {
        zkt.webpSupport = false;
      }
    }
    return zkt.webpSupport;
  },

  /**
   * 通过图片加载判断是否支持webp图片
   * @returns
   */
  checkSupportWebp() {
    const webpImg = document.getElementById('zktSupportWebp');

    if (webpImg) {
      return webpImg.width === 1;
    } else {
      // 容错处理
      const image = new Image();
      image.src = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoBAAEAAwA0JaQAA3AA/vuUAAA=';
      image.onload = function() {
        zkt.webpSupport = true;
      };
      image.onerror = function() {
        zkt.webpSupport = false;
      };
      return false;
    }
  },

  responsiveImg(url, width, config = {
    quality: 100,
    format: 'webp',
    baseValue: 750,
    maxWidth: 900
  }) {
    const radio = window.devicePixelRatio || 2;
    const baseValue = config.baseValue || 750;
    const quality = config.quality || 100;
    const format = config.format || 'webp';
    const maxWidth = config.maxWidth || 900;
    const screenWidth = screen.width;

    // 宽度
    if (!width) {
      width = baseValue;
    }

    // 计算比例 screenWidth
    // const proportion = (screenWidth * radio) / baseValue;
    let proportion = width / baseValue;

    let widthWithProportion = screenWidth * proportion;

    if (widthWithProportion < width
      && widthWithProportion < screenWidth
    ) widthWithProportion = width;


    // const increaseSizeProportion = radio > 2 ? 0.68 : 0.68;
    // const increaseSizeProportion = 0.68;
    const increaseSizeProportion = radio > 2 ? 1.3 : 1;
    const increaseSize = parseInt(widthWithProportion * increaseSizeProportion) || 0;

    let finallyWidth = parseInt(widthWithProportion + increaseSize);

    if (finallyWidth > maxWidth) {
      finallyWidth = maxWidth; // 最大图片限制为宽度900
    }

    return this.cdn(this.resize(url, finallyWidth, 'auto', quality, format));
  },

  responsive_img (url, width, quality = 80, f = 'webp') {
    let ratio = window.devicePixelRatio || 1;
    if (!width) width = 320;
    let p = width / 320;
    let w = this.getImgWidth(p * screen.width * ratio);
    return this.cdn(this.resize(url, w, 'auto', quality, f));
  },
  getRequestId () {
    let requestIdPrefix = zkt.cookie.get('member_id') || 0;
    if (typeof zkt.getRequestIdPrefix === 'function') {
      requestIdPrefix = zkt.getRequestIdPrefix() || 0;
    }
    let requestId = 'H' + requestIdPrefix + '-' + (Math.ceil(Date.now() / 1000) + '' + Math.floor(1000 + Math.random() * 9000));
    return requestId;
  },
  //默认post请求的content-type
  defaultFetchPOSTContentType: 'application/json',
  /**
   * 基于axios封装的ajax接口底层请求
   * @param {string} url 接口请求地址
   * @param {object} options 配置参数
   * @param {boolean} [options.cache] 是否缓存接口结果
   * @param {boolean} [options.json] 是否通过json方式请求
   * @param {string} [options.method] 接口请求方式
   * @param {object} [options.headers] 接口自定义请求头
   * @param {number} [options.timeout=600000] 接口超时时间，单位为秒，默认10分钟
   * @param {boolean} [options.withCredentials=false] 跨域是否自动携带cookie
   * @param {boolean} [options.silent] 是否不集中处理请求异常
   * @param {function} [options.fetchErrorCallback] 请求错误异常处理，当silent为false生效
   * @returns {promise} promise.resolve 接口返回的data数据
   * @returns {promise} promise.reject 如果silent为true,则直接将错误抛给使用方，如果silent为false，则集中调用fetchError方法将错误直接弹到页面中
   */
  fetch (url, options) {
    if (!options) options = {};
    let useCache = !!options.cache;
    let cacheKey = url + JSON.stringify(options);
    if (useCache && zkt.fetchCache[cacheKey]) {
      try {
        return Promise.resolve(JSON.parse(zkt.fetchCache[cacheKey]));
      } catch (e) {
        return Promise.resolve(zkt.fetchCache[cacheKey]);
      }
    }
    if (options.json) {
      options.body = JSON.stringify(options.json);
      if (!options.headers) options.headers = {};
      if (!options.method) options.method = 'POST';
      options.headers['content-type'] = 'application/json';
    }
    if (options.method) options.method = options.method.toUpperCase();
    if (!options.headers) options.headers = {};
    let platform = zkt._GET('platform');
    if (platform) {
      options.headers['zkt-platform'] = platform;
    }
    if (zkt.sensorTrack && zkt.sensorTrack.getPageId) {
      options.headers['zkt-page-id'] = zkt.sensorTrack.getPageId();
    }
    // 添加语言标示
    let language = zkt.language && zkt.language.currentLanguage ? zkt.language.currentLanguage : '';
    if (language) {
      options.headers[zkt.language.LANGUAGE_BASE_KEY] = language;
    }
    let newHeaders = {
      X_REQUESTED_WITH: 'XMLHttpRequest',
    };
    for (let key in options.headers) {
      newHeaders[key.toLowerCase()] = options.headers[key];
    }

    options.headers = newHeaders;
    newHeaders = null;
    if (options.method === 'POST' && !options.headers['content-type']) {
      options.headers['content-type'] = zkt.defaultFetchPOSTContentType;
    }
    //超时时间 单位秒，默认10分钟
    options.timeout = parseInt(options.timeout) > 0 ? parseInt(options.timeout) * 1000 : 60 * 1000 * 10;

    // 新增无授权参数，只有在接口请求处理
    const urlHasSilentAuth = zkt._GET('silentAuth') === '1';
    const urlExpand = urlHasSilentAuth ? { silentAuth: '1' } : {};

    url = zkt._addParams(url, urlExpand);
    let requestId = options.headers.requestid;
    if (!requestId) {
      requestId = zkt.getRequestId()
    }
    options.headers['zkt_trace_id'] = requestId;
    if (zkt.cookie.get('zkt_session_id')) {
      options.headers['zkt_session_id'] = zkt.cookie.get('zkt_session_id');
    }
    if (zkt.cookie.get('zkt_device_id')) {
      options.headers['zkt_device_id'] = zkt.cookie.get('zkt_device_id');
    }
    if (adaptor.isMini() && adaptor.getContainerVersion()) {
      options.headers["zkt-container-ver"] = adaptor.getContainerVersion();
    }

    try {
      let position = JSON.parse(sessionStorage.getItem('pvPosition'));
      if (position.lat && position.lng) {
        options.headers['zkt-lat'] = position.lat;
        options.headers['zkt-lng'] = position.lng;
      }
    } catch (e) { }

    return new Promise((resolve, reject) => {
      if (!(window.GLOBAL_ENV && window.GLOBAL_ENV.ENABLE_RISK === '1') || options.disableRisk || options.method !== 'POST' && z._GET('silentAuth') === '1') { // 当前项目未开启风险识别 或 当前请求不需要风险识别，直接放行
        return resolve()
      } else {
        // 风险识别
        try{
          zkt.handleRisk(zkt._GET('method', url.split('?')[1]), resolve, reject)
        } catch(err) {
          console.error('handlerisk----', err)
          return resolve()
        }
      }
    }).then((res) => {
      if (!options.headers) options.headers = {}
      if (res && res.riskVerifySign) { // 说明通过风险识别
        options.headers.zkt_risk_sign = res.riskVerifySign
      }
      if (options && options.device_token) { // 设备指纹
        options.headers.device_token = zkt.getDeviceToken()
      }
      return axios({
        timeout: options.timeout || 5 * 1000 * 10,
        method: options.method || 'GET',
        url,
        headers: options.headers || {},
        responseType: 'json',
        data: options.body,
        withCredentials: options.withCredentials || false,
      })
        .then(function (res) {
          const { data } = res;
          if (data && data.code && data.code === 'ZERO_SERVE_TO_REDIRECT' && data.location) {
            if (data.replace) {
              window.location.replace(data.location);
            } else {
              window.location.href = data.location;
            }
          }
          if (options.originalReturn) {
            return Promise.resolve(res);
          }

          if (data && !data.success && data.msg === 'login') {
            if (adaptor.isMini() || adaptor.isAliMini()) {
              adaptor.login();
            } else {
              location.reload();
            }
            return Promise.reject('login');
          } else if (data && !data.success && data.msg !== 'login') {
            let msg = data.msg || data.message || JSON.stringify(data);
            let error = errorInteraction.parseErrorObj(msg, data);
            throw error;
          } else if (data && !data.success && data.code === 'needSubscribe') {
            return Promise.reject(data);
          } else {
            if (useCache) {
              try {
                zkt.fetchCache[cacheKey] = JSON.stringify(data);
              } catch (e) {
                zkt.fetchCache[cacheKey] = data;
              }
            }
            return Promise.resolve(data);
          }
        })
        .catch((err) => {
          // 处理5xx错误
          if (
            typeof err === 'object' &&
            err.response
            //&& Math.floor(err.response.status/100) === 5
          ) {
            let re = err.response.data;
            if (re && re.message) {
              let error = errorInteraction.parseErrorObj(re.message, re)
              throw error;
            }
          }
          if (
            typeof err === 'object' && err.message.indexOf('needSubscribe') !== -1
          ) {
            let parseMessageObj = {};
            try {
              parseMessageObj = JSON.parse(err.message);
            } catch (error) {
              console.log(error)
            }
            if (parseMessageObj.method && parseMessageObj.method === 'needSubscribe') {
              if (zkt && zkt.eventBus) {
                zkt.eventBus.trigger("needSubscribe");
              }
            }
            throw new Error("needSubscribe");
          }
          err = errorInteraction.parseInteraction(err, {
            userHttpUrl: url,
            dataHttpHeaders: options.headers || {},
            dataHttpUrl: url,
          })
          throw err;
        })
        .catch((err) => {
          if (typeof err === 'object' && err.message.indexOf('创建订单错误命中平台黑白名单') !== -1) {
            err.message = '您已被限制购买'
          }
          if (!options.silent) {
            if (err.message === 'Network Error') {
              //当页面在跳转时中断了ajax请求时，不弹出错误提示,
              // 比如使用 location.href或 location.reload等刷新时，有网络在请求过程中，默认会弹出错误提示
              //指定zkt.isRedirect，则不提示错误提示
              if (!zkt.isRedirect) {
                zkt.fetchError(
                  err,
                  '网络错误，请检查网络并刷新重试',
                  options.fetchErrorReloadText || zkt.fetchErrorReloadText || '网络错误，点击确认自动刷新！',
                  options,
                );
              }
            } else if (err.message.indexOf('timeout') !== -1) {
              zkt.fetchError(
                err,
                '请求超时，请检查网络并刷新重试',
                options.fetchErrorTimeoutAutoReloadText ||
                zkt.fetchErrorTimeoutAutoReloadText ||
                '请求超时，点击确认自动刷新！',
                options,
              );
            } else {
              zkt.fetchError(err, err.message || err, err.message || err, options);
            }
          }
          throw err;
        });
    })

  },
  /**
   * ajax 错误处理
   * @alias zkt.fetchError
   * @param err
   * @param msg
   * @param autoReloadMsg
   * @param options
   */
  fetchError (err, msg, autoReloadMsg, options) {
    let fetchErrorCallback = options.fetchErrorCallback || zkt.fetchErrorCallback;
    if (fetchErrorCallback) {
      fetchErrorCallback(err);
      return;
    }
    if (options.fetchErrorAutoReload || zkt.fetchErrorAutoReload) {
      zkt.Toast(autoReloadMsg);
      if (!zkt.fetchErrorIsReload) {
        zkt.fetchErrorIsReload = true;
        location.reload();
      }
    } else {
      try {
        if (err.message === 'Network Error') {
          return
        }
        errorInteraction.parseErrorUI(msg, err, options);
      } catch (e) {
        console.log(e);
      }

      //zkt.Toast(msg);
    }
  },
  /**
   * 将驼峰格式转换为分格格式
   * @param str
   * @param separator
   * @returns {string}
   */
  decamelize (str, separator) {
    separator = typeof separator === 'undefined' ? '_' : separator;
    return str
      .replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
      .replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2')
      .toLowerCase();
  },
  /**
   * 将字符串转换为驼峰格式
   * @param text
   * @returns {string | * | void}
   */
  camelize (text) {
    return text.replace(/^([A-Z])|[\s-_]+(\w)/g, function (match, p1, p2, offset) {
      if (p2) return p2.toUpperCase();
      return p1.toLowerCase();
    });
  },
  /**
   * 获取get参数
   * @deprecated 已经废弃
   */
  _GET (need, href) {
    href = href || location.search;
    let qs = href.replace(/^\?/, '');
    let arr = qs.split('&');
    let _get = {};
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i]) continue;
      let p = arr[i].split('=');
      if (p[0]) {
        _get[p[0]] = decodeURIComponent(p[1]);
      }
    }
    if (need) return _get[need];
    return _get;
  },
  kv: {
    set (k, v) {
      if (window['localStorage']) {
        localStorage[k] = v;
      }
    },
    get (k) {
      if (window['localStorage']) {
        return localStorage[k] || '';
      }
      return '';
    },
  },
  cookie: {
    set (name, value, days, path, domain, expires = '') {
      let dir = path || '/';
      if (!isNaN(expires) || days) {
        let date = new Date();
        date.setTime(expires || date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toGMTString();
      }
      let c = name + '=' + value + expires + '; path=' + dir;
      if (domain) {
        c += ';domain=' + domain;
      }
      document.cookie = c;
    },
    get (name) {
      let nameEQ = name + '=';
      let ca = document.cookie.split(';');
      for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
      }
      return null;
    },
    delete (name, domain) {
      this.set(name, '', -1, '', domain);
    },
  },
  loadWX (cb) {
    try {
      if (!window['wx']) {
        //避免多次调用 加载多次sdk
        if (!window.loadWXSDK) {
          window.loadWXSDK = true;
          let sc = document.createElement('script');
          sc.src = `https://res.wx.qq.com/open/js/jweixin-${zkt.WX_SDK_VERSION}.js`;
          sc.async = true;
          document.body.appendChild(sc);
        }
        let timeout = setTimeout(() => {
          try {
            zkt.Debug.log('loadWXTimeout3000', location.href);
          } catch (e) { }
        }, 3000);
        let timer = setInterval(() => {
          if (window['wx'] && typeof WeixinJSBridge == 'object' && typeof WeixinJSBridge.invoke == 'function') {
            try {
              clearTimeout(timeout);
              clearInterval(timer);
            } catch (e) { }
            cb(window['wx']);
          }
        }, 100);
        setTimeout(() => {
          try {
            clearInterval(timer);
          } catch (e) { }
        }, 20000);
      } else {
        cb(window['wx']);
      }
    } catch (e) {
      zkt.Debug.log('loadWXError:', JSON.stringify(e, Object.getOwnPropertyNames(e)));
    }
  },
  /**
   * 解析并获取url参数
   */
  /**
   * 解析微信分享js-sdk初始化调用的url及参数
   * @param params
   * @param wxShareEndpoint
   * @param initSource 初始化的位置，用于标识这次微信js sdk初始化调用的渠道或位置，比如 值为 tongji,表示是埋点初始化时调用
   * @returns {string}
   */
  getShareUrlParams (params, wxShareEndpoint, initSource) {
    let query = [];
    if (!params) params = {};
    params.url = params.url || location.href;
    for (let key in params) {
      query.push(key + '=' + encodeURIComponent(params[key]));
    }
    if (initSource) {
      query.push('sc=' + initSource);
    }
    query = query.join('&');
    let url = wxShareEndpoint || this.wxShareEndpoint || '/Common/initWechatShare';
    let sep = url.match(/\?/) ? '&' : '?';
    return url + sep + query;
  },
  /**
   * 获取当前用户cid 并处理跳转逻辑，
   * 在不跳转的情况下，返回微信js sdk签名，并设置全局变量，供其他方法使用
   * @param params
   * @param cb
   * @returns {Promise<void>}
   */
  async initShareRedirect (params, cb) {
    let url = zkt.getShareUrlParams(params, '', 'initShareRedirect');
    let data = await zkt.fetch(url, { silent: true });
    if (data && data.url && data.url !== location.href) {
      zkt.isRedirect = true;
      location.replace(data.url);
      return;
    } else {
      zkt.wxShareData = data;
      zkt.initShareStatus = true;
    }
    if (cb) {
      cb();
    }
  },
  wxConfigAddOpenTagList (configs) {
    if (parseFloat(zkt.WX_SDK_VERSION) >= 1.6) {
      configs.openTagList = ['wx-open-launch-weapp', 'wx-open-launch-app', 'wx-open-subscribe'];
    }
    return configs;
  },
  /**
   * 初始化微信SDK,主要用于使用浮窗时展示，第三方公众号logo
   * 不可与其初始化微信js-sdk同时使用。
   * @returns {Promise<void>}
   */
  async initWeChatFloatingWindow (url) {
    // let url = '/NewHome/api/getWetchSign';
    // if (GLOBAL_ENV && GLOBAL_ENV.mountPath) {
    // 	url = `/${GLOBAL_ENV.mountPath}/api/getWetchSign`
    // }
    if (window.GLOBAL_ENV && GLOBAL_ENV.platform === 'h5') {
      return;
    }
    let data = await z.api('getWetchSign', { url: url || location.href }, { silent: true, method: 'post' });
    if (data && data.signature) {
      zkt.loadWX(function (wx) {
        Object.keys(data).map((k) => {
          data[k.toLowerCase()] = data[k];
        });
        let configs = {
          debug: zkt.Debug.isDebug(),
          appId: data.appid,
          timestamp: data.timestamp * 1,
          nonceStr: data.noncestr,
          signature: data.signature,
          jsApiList: ['checkJsApi', 'getLocation'],
        };
        configs = zkt.wxConfigAddOpenTagList(configs);
        zkt.initWeChatStart = true;

        wx.config(configs);

        wx.error(function (res) {
          zkt.initWeChatComplete = false;

          if (zkt.Debug.isDebug()) {
            zkt.Toast('微信初始化失败:', res);
          }
        });
        // wx.ready(() => {
        // 	wx.showAllNonBaseMenuItem();
        // 	if (cb) {
        // 		cb(wx, data);
        // 	}
        // });
      });
    }
  },
  /**
   * 初始化微信jssdk,此初始化方法默认不会获取签名和不会处理添加 cid 跳转的逻辑
   * @param cb 初始成功后回调
   * @param apis 微信功能数组
   * @param initSignature 是否获取微信签名，默认false，依赖于其他接口返回数据或，为 true时会获取微信签名和处理cid跳转逻辑
   * @returns {Promise<void>}
   */
  async initWeChatNew (cb, apis, initSignature = false, wxShareEndpoint, params) {
    let data = zkt.wxShareData;
    if (window.GLOBAL_ENV && GLOBAL_ENV.platform === 'h5') {
      return;
    }
    if (!data || (initSignature && (wxShareEndpoint || this.wxShareEndpoint))) {
      let url = zkt.getShareUrlParams(params, wxShareEndpoint, 'initWeChatNew');
      data = await zkt.fetch(url, { silent: true });
      if (data && data.url && data.url !== location.href) {
        zkt.isRedirect = true;
        location.replace(data.url);
        return;
      }
      zkt.wxShareData = data;
    }
    zkt.loadWX(function (wx) {
      Object.keys(data).map((k) => {
        data[k.toLowerCase()] = data[k];
      });
      if (!apis) apis = [];
      apis = apis.concat([
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'openLocation',
        'getLocation',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'scanQRCode',
        'chooseImage',
        'uploadImage',
        'getLocalImgData',
        'downloadImage',
        'addCard',
        'updateTimelineShareData',
        'updateAppMessageShareData',
        'hideMenuItems',
        'checkJsApi',
      ]);

      let configs = {
        debug: zkt.Debug.isDebug(),
        appId: data.appid,
        timestamp: data.timestamp * 1,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: apis,
      };
      if (zkt.isWeixinWork) {
        // https://work.weixin.qq.com/api/doc/90000/90136/90514
        configs.beta = true;
      }
      configs = zkt.wxConfigAddOpenTagList(configs);
      zkt.initWeChatStart = true;
      wx.config(configs);
      wx.ready(() => {
        wx.showAllNonBaseMenuItem();
        zkt.initWeChatComplete = true;
        zkt.initWeChatStart = false;

        if (cb) {
          cb(wx, data);
        }
      });
      wx.error(function (res) {
        zkt.initWeChatStart = false;
        zkt.initWeChatComplete = false;
        if (zkt.Debug.isDebug()) {
          zkt.Toast('微信初始化失败:', res);
        }
      });
    });
  },
  /**
   * 初始化微信jssdk,此初始化方法默认不会获取签名和不会处理添加 cid 跳转的逻辑
   * @param cb 初始成功后回调
   * @param apis 微信功能数组
   * @param initSignature 是否获取微信签名，默认false，依赖于其他接口返回数据或，为 true时会获取微信签名和处理cid跳转逻辑
   * @returns {Promise<void>}
   */
  async __initWeChatNew (cb, apis, initSignature = false, wxShareEndpoint, params) {
    let data = zkt.wxShareData;
    if (window.GLOBAL_ENV && GLOBAL_ENV.platform === 'h5') {
      return;
    }

    if (!data) {
      let url = zkt.getShareUrlParams(params, wxShareEndpoint, '__initWeChatNew');
      try {
        data = await zkt.fetch(url, { silent: true });
      } catch (error) {
        if (cb) cb()
        return
      }
      //zkt.wxShareData = data;
    }
    zkt.loadWX(function (wx) {
      Object.keys(data).map((k) => {
        data[k.toLowerCase()] = data[k];
      });
      if (!apis) apis = [];
      apis = apis.concat([
        'onMenuShareTimeline',
        'onMenuShareAppMessage',
        'openLocation',
        'getLocation',
        'hideAllNonBaseMenuItem',
        'showAllNonBaseMenuItem',
        'scanQRCode',
        'chooseImage',
        'uploadImage',
        'getLocalImgData',
        'downloadImage',
        'addCard',
        'updateTimelineShareData',
        'updateAppMessageShareData',
        'hideMenuItems',
        'checkJsApi',
      ]);

      let configs = {
        debug: zkt.Debug.isDebug(),
        appId: data.appid,
        timestamp: data.timestamp * 1,
        nonceStr: data.noncestr,
        signature: data.signature,
        jsApiList: apis,
      };
      if (zkt.isWeixinWork) {
        // https://work.weixin.qq.com/api/doc/90000/90136/90514
        configs.beta = true;
      }
      configs = zkt.wxConfigAddOpenTagList(configs);
      zkt.initWeChatStart = true;
      wx.config(configs);
      wx.ready(() => {
        wx.showAllNonBaseMenuItem();
        zkt.initWeChatComplete = true;
        zkt.initWeChatStart = false;

        if (cb) {
          cb(wx, data);
        }
      });
      wx.error(function (res) {
        zkt.initWeChatStart = false;
        zkt.initWeChatComplete = false;
        if (zkt.Debug.isDebug()) {
          zkt.Toast('微信初始化失败:', res);
        }
      });
    });
  },
  /**
   * 初始化微信js sdk 并始终会获取签名，且会获取cid跳转逻辑
   * @param cb
   * @param params
   * @param apis
   */
  initWechat (cb, params, apis, errorCb) {
    if (window.GLOBAL_ENV && GLOBAL_ENV.platform === 'h5') {
      return;
    }
    if (zkt.isWeixinWork) {
      // 企微三方应用sdk与微信sdk初始化流程不同， 所以直接截断,去新流程
      // 注意：当前仅对企微雷达应用生效（appType=radar）
      // TODO: 后续企微sdk加载 应全部走 adaptor.initWechat 流程
      if (location.href.indexOf('appType=radar') > 0) {
        console.log('雷达授权流程');
        return adaptor.initWxworkAgent(apis, true)
      }
      console.log('企微其他授权流程 ↓');

    }
    let url = zkt.getShareUrlParams(params, '', 'initWechat');
    zkt
      .fetch(url, { silent: true })
      .then(function (data) {
        if (data && data.url && data.url !== location.href) {
          zkt.isRedirect = true;
          location.replace(data.url);
          return;
        }
        zkt.wxShareData = data;
        console.log('请求node端 ticket 后,返回值', data);
        //开发环境的特殊处理
        if (data && data.appid && location.host && location.host.toLowerCase() === (GLOBAL_ENV && GLOBAL_ENV.devHost)) {
          data.appid = 'wxcc878e3a91463bb5';
        }
        zkt.loadWX(function (wx) {
          Object.keys(data).map((k) => {
            data[k.toLowerCase()] = data[k];
          });
          if (!apis) apis = [];
          apis = apis.concat([
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'openLocation',
            'getLocation',
            'hideAllNonBaseMenuItem',
            'showAllNonBaseMenuItem',
            'scanQRCode',
            'chooseImage',
            'uploadImage',
            'getLocalImgData',
            'downloadImage',
            'checkJsApi',
            'updateTimelineShareData',
            'updateAppMessageShareData',
          ]);
          let configs = {
            debug: zkt.Debug.isDebug(),
            appId: data.appid,
            timestamp: data.timestamp * 1,
            nonceStr: data.noncestr,
            signature: data.signature,
            jsApiList: apis,
          };
          if (zkt.isWeixinWork) {
            // https://work.weixin.qq.com/api/doc/90000/90136/90514
            configs.beta = true;
          }
          configs = zkt.wxConfigAddOpenTagList(configs);
          zkt.initWeChatStart = true;
          console.log('sdk加载配置', configs);
          wx.config(configs);
          wx.ready(() => {
            wx.showAllNonBaseMenuItem();
            zkt.initWeChatComplete = true;
            zkt.initWeChatStart = false;
            console.log('sdk初始化成功', data);

            cb(wx, data);
          });
          wx.error(function (res) {
            zkt.initWeChatComplete = false;
            zkt.initWeChatStart = false;
            console.log('sdk初始化失败：', res);

            errorCb && errorCb(res);
            if (zkt.Debug.isDebug()) {
              zkt.Toast('微信初始化失败:', res);
            }
          });
        });
      })
      .catch((err) => {
        zkt.initWeChatComplete = false;
        zkt.initWeChatStart = false;
        console.log('initWechat报错：', err);

        errorCb && errorCb(err);
        if (!location.href.match(/zhiketong\.(cn|net|com)/i)) {
          alert('initWechat报错:' + url + ': ' + err.message);
        }
      });
  },
  Toast (message, time = 2, cb = null, style = '') {
    //时间秒
    if (typeof message !== 'string') return;
    if (message === 'needSubscribe') return;
    if (document.getElementById('zktToast')) return;
    if (typeof time === 'function') {
      cb = time;
      time = 2;
    }
    let Wrap = document.createElement('div');
    Wrap.id = 'zktToast';
    Wrap.style.cssText =
      ` position: fixed;top:0;left: 0;width: 100%;height: 100%;z-index: 10000004;color:#fff;` + style;
    let Pop = document.createElement('div');
    Pop.style.cssText =
      'line-height:1.6; background: rgba(0, 0, 0, .7);border-radius: 5px;width:50%;text-align: center;padding:1em;margin:40% auto;word-wrap: break-word;word-break: break-all;';
    let Message = document.createTextNode(message);
    Pop.appendChild(Message);
    Wrap.appendChild(Pop);
    document.body.appendChild(Wrap);
    setTimeout(() => {
      document.body.removeChild(Wrap);
      cb && cb();
    }, time * 1000);
  },
  projectPath: '/NewHome',
  /**
   *
   * @param msg
   * @param referer_url
   * @param time
   */
  reLogin (msg = '登录过期，将重新登录', referer_url = '1', time = 2) {
    let url = zkt.projectPath + '/reset?referer_url=' + referer_url;
    zkt.Toast(msg, time, () => {
      location.href = url;
    });
  },
  /**
   * 删除 url中参数
   * @param query_name
   * @returns {string}
   */
  removeQuery (query_name, href = location.href) {
    const [head, tail] = href.split('?');
    return (
      head +
      (tail
        ? '?' +
        tail
          .split('&')
          .filter((p) => !p.startsWith(query_name + '='))
          .join('&')
        : '')
    );
  },
  /**
   * 添加 url中参数,如存在则替换
   * @param key
   * @param value
   * @param href
   * @returns {string}
   */
  addQuery (key, value, href = location.href) {
    var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
    var separator = href.indexOf('?') !== -1 ? '&' : '?';
    if (href.match(re)) {
      return href.replace(re, '$1' + key + '=' + value + '$2');
    } else {
      return href + separator + key + '=' + value;
    }
  },
  /**
   * 批量 添加 url中参数,如存在则替换
   * @param {json} kvPairs json键值对
   * @param {string} href 要添加的链接，默认为当前地址
   * @returns {string} 返回添加后参数
   */
  addQueries (kvPairs, href = location.href) {
    let keys = Object.keys(kvPairs),
      result = href;
    keys.forEach((key) => {
      let value = kvPairs[key];
      result = z.addQuery(key, value, result);
    });
    return result;
  },
  /**
   * 初始化分享，并会获取cid，如果cid与url中不一致，则会跳转
   * @param title
   * @param description
   * @param image
   * @param params
   * @param initMini 是否初始化小程序
   */
  initShare (title, description, image, params, initMini) {
    if (image) {
      image = z.cdn(z.resize(image, 200, 200));
    }
    if (description) description = description.substr(0, 50);
    return new Promise(function (done) {
      z.initWechat(function (wx, data) {
        let link = z.removeQuery('app_auth', z.removeQuery('auth'));
        link = z.removeQuery('zktToThird', link);
        try {
          if (
            z.abTest &&
            z.abTest.version &&
            z.abTest.config &&
            z.abTest.config.isShareVersion * 1 === 1 &&
            z.abTest.config.updateTime
          ) {
            link = z.addQuery('ab_version', encodeURIComponent(z.abTest.version), link);
            link = z.addQuery('ab_version_time', z.abTest.config.updateTime, link);
            link = z.addQuery('ab_cache_time', z.abTest.config.duration || 24, link);
          }
        } catch (e) {
          console.error(e);
        }

        if (parseFloat(zkt.WX_SDK_VERSION) >= 1.6) {
          wx.updateAppMessageShareData({
            title, // 分享标题
            desc: description, // 分享描述
            link: link, // 分享链接
            imgUrl: image, // 分享图标
            success () {
              // 用户确认分享后执行的回调函数
              sensorTrack.reportShare('onMenuShareAppMessage')
            },
            cancel () {
              // 用户取消分享后执行的回调函数
            },
          });
          wx.updateTimelineShareData({
            title, // 分享标题
            desc: description, // 分享描述
            link: link, // 分享链接
            imgUrl: image, // 分享图标
            success () {
              // 用户确认分享后执行的回调函数
              sensorTrack.reportShare('onMenuShareTimeline')
            },
            cancel () {
              // 用户取消分享后执行的回调函数
            },
          });
        }else{
          wx.onMenuShareTimeline({
            title, // 分享标题
            link: link, // 分享链接
            imgUrl: image, // 分享图标
            success () {
              // 用户确认分享后执行的回调函数
              sensorTrack.reportShare('onMenuShareTimeline')
            },
            cancel () {
              // 用户取消分享后执行的回调函数
            },
          });
          wx.onMenuShareAppMessage({
            title, // 分享标题
            desc: description, // 分享描述
            link: link, // 分享链接
            imgUrl: image, // 分享图标
            success () {
              // 用户确认分享后执行的回调函数
              sensorTrack.reportShare('onMenuShareAppMessage')
            },
            cancel () {
              // 用户取消分享后执行的回调函数
            },
          });
        }
        if (adaptor.isMini()) {
          console.log('wechat mini share info:', { title: description, imageUrl: image, url: link });
          const fn = function () {
            adaptor.shareToFriend({ title: description, imageUrl: image, url: link });
          }
          z.pageLife.listenWxaPageShowFromCache(function () {
            fn();
          }, 'share', z.pageLife.EVENT_IDENTIFIER_ENUM.once)
        }

        done(data);
      }, params);
    });
  },

  /**
   * 新的初始化分享，默认不初始化签名，依赖initShareRedirect 方法初始化签名
   * 当initSignature 为true时，初始化签名
   * @param title
   * @param description
   * @param image
   * @param params
   * @param callback 回调
   * @param href 分享的链接地址
   * @param initSignature  强制重新初始化签名
   * @param api 初始化的api
   */
  initShareNew (title, description, image, params, callback, href = location.href, initSignature = false, api = []) {
    if (image) {
      let defaultImageWidth = 200; // 默认图片宽
      let defaultImageHeight = 200; // 默认图片高
      let defaultQuality = 80; // 默认图片质量

      if (adaptor.isMini()) {
        defaultImageWidth = 400
        defaultImageHeight = 400
      }

      image = z.cdn(
        z.resize(
          image,
          (params && params.imageWidth) || defaultImageWidth,
          (params && params.imageHeight) || defaultImageHeight,
          (params && params.imageQuality) || defaultQuality,
        )
      );

    }
    if (description) description = description.substr(0, 50);
    console.log('wechat share info:', { title, description, image, href });
    return new Promise(function (done) {

      if (z._GET('silentAuth') === '1') {
          if (adaptor.isMini()) {
            console.log('wechat mini share info:', { title: description, imageUrl: image, url: href });
            const fn = function () {
              adaptor.shareToFriend({ title: description, imageUrl: image, url: href });
            }
            fn();
            z.pageLife.listenWxaPageShowFromCache(function () {
              fn();
            }, 'share', z.pageLife.EVENT_IDENTIFIER_ENUM.once)
          }

          //初始化完执行传入的回调方法;
          if (params && params.initWxCallback) {
            params.initWxCallback(wx);
          }

      } else {
        z.initWeChatNew(
          function (wx, data) {
            let is_origin = z._GET('is_origin', href);
            href = z.removeQuery('app_auth', z.removeQuery('auth', href));
            href = z.removeQuery('zktToThird', href);
            if (is_origin) {
              href = z.addQuery('is_origin', 2, href);
            }
            try {
              if (
                z.abTest &&
                z.abTest.version &&
                z.abTest.config &&
                z.abTest.config.isShareVersion * 1 === 1 &&
                z.abTest.config.updateTime
              ) {
                href = z.addQuery('ab_version', encodeURIComponent(z.abTest.version), href);
                href = z.addQuery('ab_version_time', z.abTest.config.updateTime, href);
                href = z.addQuery('ab_cache_time', z.abTest.config.duration || 24, href);
              }
            } catch (e) {
              console.error(e && e.message);
            }

            //初始化完执行传入的回调方法;
            if (params && params.initWxCallback) {
              params.initWxCallback(wx);
            }

            // if (parseFloat(zkt.WX_SDK_VERSION) >= 1.6) {
            // 	wx.updateTimelineShareData({
            // 		title, // 分享标题
            // 		link: href, // 分享链接
            // 		imgUrl: image, // 分享图标
            // 		success() {
            // 		},
            // 		cancel() {
            // 			// 用户取消分享后执行的回调函数
            // 		}
            // 	});
            // 	wx.updateAppMessageShareData({
            // 		title, // 分享标题
            // 		desc: description, // 分享描述
            // 		link: href, // 分享链接
            // 		imgUrl: image, // 分享图标
            // 		success() {
            // 			//callback && callback();
            // 		},
            // 		cancel() {
            // 			// 用户取消分享后执行的回调函数
            // 		}
            // 	});
            // } else {
            wx.onMenuShareTimeline({
              title, // 分享标题
              link: href, // 分享链接
              imgUrl: image, // 分享图标
              success () {
                sensorTrack.reportShare('onMenuShareTimeline');
                callback && callback();
              },
              cancel () {
                // 用户取消分享后执行的回调函数
              },
            });
            wx.onMenuShareAppMessage({
              title, // 分享标题
              desc: description, // 分享描述
              link: href, // 分享链接
              imgUrl: image, // 分享图标
              success () {
                sensorTrack.reportShare('onMenuShareAppMessage');
                callback && callback();
              },
              cancel () {
                // 用户取消分享后执行的回调函数
              },
            });
          // }

            if (adaptor.isMini()) {
              console.log('wechat mini share info:', { title: description, imageUrl: image, url: href });
              const fn = function () {
                adaptor.shareToFriend({ title: description, imageUrl: image, url: href });
              }
              fn();
              z.pageLife.listenWxaPageShowFromCache(function () {
                fn();
              }, 'share', z.pageLife.EVENT_IDENTIFIER_ENUM.once)
            }
            done(data);
          },
          api,
          initSignature,
          '',
          params,
        );
      }
    });
  },
  showMap (hotel) {
    if (!hotel || !hotel.map_location) {
      alert('酒店没有设置地理位置.');
      return;
    }
    let arr = hotel.map_location.split(',');
    let lng = parseFloat(arr[0]);
    let lat = parseFloat(arr[1]);
    let level = parseInt(arr[2], 10);
    if (zkt.isWeixin) {
      zkt.loadWX(function (wx) {
        if (!wx) {
          alert('wechat sdk error!');
          return;
        }
        wx.openLocation({
          latitude: lat, // 纬度，浮点数，范围为90 ~ -90
          longitude: lng, // 经度，浮点数，范围为180 ~ -180。
          name: hotel.hotel_name, // 位置名
          address: hotel.address, // 地址详情说明
          scale: zkt._GET('wxloc') || 14, // Math.max(3, Math.min(28, Math.round(level * 1.5))), // 地图缩放级别,整形值,范围从1~28。默认为最大
          infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
        });
      });
    } else if (zkt.isAliMini) {
      // 支付宝小程序
      my.openLocation({
        latitude: lat, // 纬度，浮点数，范围为90 ~ -90
        longitude: lng, // 经度，浮点数，范围为180 ~ -180。
        name: hotel.hotel_name, // 位置名
        address: hotel.address, // 地址详情说明
        scale: zkt._GET('wxloc') || 14, // Math.max(3, Math.min(28, Math.round(level * 1.5))), // 地图缩放级别,整形值,范围从1~28。默认为最大
        infoUrl: '', // 在查看位置界面底部显示的超链接,可点击跳转
      });
    } else {
      alert('只支持微信');
    }
  },
  /**
   * 获取定位信息
   * @deprecated 此方法已经废弃，请使用z.geoLocation.getLocation，注意出入参变化
   * @param cb
   * @param showError
   * @param forceGet 是否每次强制获取，默认false时，如果用户拒绝，则30天内不会再请求定位
   */
  getLocation (cb, showError = 1, forceGet = false) {
    if (z._GET('appid') === 'wx8aa25883789c070e' || z._GET('disable_position')) {
      console.log('disable_position2');
      return;
    }
    let positionCookieName = zkt._GET('appid') + '_cancel_position',
      positionCookie = zkt.cookie.get(positionCookieName);
    if (zkt.isWeixin && (forceGet || positionCookie !== '1') && !z.gettingLocation) {
      z.gettingLocation = 1;
      zkt.initWechat((wx) => {
        wx.getLocation({
          type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success (res) {
            z.gettingLocation = 0;
            cb(res.latitude, res.longitude);
          },
          cancel: function (res) {
            z.gettingLocation = 0;
            zkt.cookie.set(positionCookieName, '1', 30);
            console.log('用户拒绝授权获取地理位置');
            //alert('用户拒绝授权获取地理位置');
          },
        });
      });
    } else if (!zkt.isWeixin && !z.gettingLocation) {
      z.gettingLocation = 1;
      zkt.getBrowserLocation((pos) => {
        z.gettingLocation = 0;
        if (typeof pos === 'string') {
          if (showError) {
            alert(pos);
          }
          return;
        }
        cb(pos.coords.latitude, pos.coords.longitude);
      });
    }
  },
  getBrowserLocation (cb) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(cb, function (error) {
        cb('GPS定位错误:' + error.code);
      });
    } else {
      cb('当前浏览器不支持GPS定位');
    }
  },
  get_facilities (hotel) {
    let arr = [];
    if (hotel['wifi'] == 1) arr.push({ icon: '4', desc: '无线WIFI' });
    if (hotel['internet_cable'] == 1) arr.push({ icon: '13', desc: '有线网络' });
    if (hotel['parking'] && hotel['parking'] == 0) arr.push({ icon: '5', desc: '免费停车' });
    if (hotel['parking'] && hotel['parking'] == 1) arr.push({ icon: '5', desc: '收费停车' });
    if (hotel['pickup'] && hotel['pickup'] != -1) arr.push({ icon: '6', desc: '接机/接站' });
    if (hotel['pool'] == 1) arr.push({ icon: '7', desc: '游泳池' });
    if (hotel['meeting_room'] == 1) arr.push({ icon: '11', desc: '会议室' });
    if (hotel['dining_hall'] == 1) arr.push({ icon: '3', desc: '餐厅' });
    if (hotel['gym'] == 1) arr.push({ icon: '8', desc: '健身房' });
    if (hotel['jima'] == 1) arr.push({ icon: '9', desc: '棋牌室' });
    if (hotel['ktv'] == 1) arr.push({ icon: '12', desc: '夜总会/KTV' });
    if (hotel['spa'] == 1) arr.push({ icon: '10', desc: '足浴/SPA' });
    return arr;
  },
  translateBreakfast (b, isJunTing) {
    if (b * 1 === 0) return '无早';
    if (b * 1 === 1) return isJunTing ? '本人入住享1份早餐' : '单早';
    if (b * 1 === 2) return isJunTing ? '本人入住享2份早餐' : '双早';
    if (b * 1 === 56) return '含早';
    return isJunTing ? `本人入住享${b}份早餐` : b + '早';
  },
  getImgWidth (w) {
    if (w < 40) return 40;
    if (w < 60) return 60;
    if (w < 100) return 100;
    if (w < 150) return 150;
    if (w < 200) return 200;
    if (w < 320) return 320;
    if (w < 480) return 480;
    if (w < 680) return 680;
    if (w < 800) return 800;
    return 900;
  },
  getThumbnail (src, dom) {
    if (!src) return 'javascript:;';
    if (!dom) dom = document.body;
    let w = dom.offsetWidth;
    let url = this.responsive_img(src, w);
    // console.log(src, dom, url);
    return url;
  },
  str2date (s) {
    if (!s) return new Date();
    if (typeof s === 'object') return s;
    if (typeof s === 'number') {
      let t = new Date();
      t.setTime(s);
      return t;
    }
    let ms = s.match(/^(\d{4})\-(\d{1,2})\-(\d{1,2})(\s+(\d{1,2})\:(\d{1,2})\:(\d{1,2}))?$/);
    if (!ms) return new Date();
    let t = new Date();
    t.setMonth(0);
    t.setDate(1);
    t.setFullYear(parseInt(ms[1], 10));
    t.setMonth(parseInt(ms[2], 10) - 1);
    t.setDate(parseInt(ms[3], 10));
    if (ms[5]) t.setHours(parseInt(ms[5], 10));
    if (ms[6]) t.setMinutes(parseInt(ms[6], 10));
    if (ms[7]) t.setSeconds(parseInt(ms[7], 10));
    return t;
  },
  date2str (d, link = '-') {
    return d.getFullYear() + `${link}` + this._toFixed(d.getMonth() + 1, 2) + `${link}` + this._toFixed(d.getDate(), 2);
  },
  time2str (d, link = '-') {
    return (
      this.date2str(d, link) +
      ' ' +
      this._toFixed(d.getHours(), 2) +
      ':' +
      this._toFixed(d.getMinutes(), 2) +
      ':' +
      this._toFixed(d.getSeconds(), 2)
    );
  },
  _toFixed (n, w) {
    return leftpad(n, w, '0');
  },
  compare_date (m1, m2) {
    m1 = this.date2str(this.str2date(m1)).replace(/\-/g, '');
    m2 = this.date2str(this.str2date(m2)).replace(/\-/g, '');
    console.log(m1, m2);
    let p = parseInt(m1) - parseInt(m2);
    if (p > 0) return 1;
    if (p === 0) return 0;
    return -1;
  },
  /**
   * 显示微信分享浮层
   */
  showWXShareOverlay () {
    let overlay = document.createElement('div');
    overlay.style =
      'position:fixed; left:0; right:0; top:0; bottom:0; background-color:rgba(0,0,0,0.6); z-index:100000;';
    overlay.id = 'wx-share-overlay';
    let overlayImg = document.createElement('img');
    overlayImg.style = 'width: 80%; position:absolute; right:0; top:0;';
    overlayImg.src = require('./wx-share-text.png');
    overlay.appendChild(overlayImg);
    document.body.appendChild(overlay);
    overlay.onclick = () => {
      this.hideWXShareOverlay();
    };
  },
  //关闭微信分享浮层
  hideWXShareOverlay () {
    let overlay = document.getElementById('wx-share-overlay');
    document.body.removeChild(overlay);
  },
  /**
   * 显示新的微信分享浮层
   */
  showNewWXShareOverlay () {
    let overlay = document.createElement('div');
    overlay.style =
      'position:fixed; left:0; right:0; top:0; bottom:0; background-color:rgba(0,0,0,0.6); z-index:100000;';
    overlay.id = 'wx-new-share-overlay';
    let overlayImg = document.createElement('img');
    overlayImg.style = 'width: 88%; position:absolute; right:1%; top:0;';
    overlayImg.src = require('./wx-share-text-new.png');
    overlay.appendChild(overlayImg);
    document.body.appendChild(overlay);
    overlay.onclick = () => {
      this.hideNewWXShareOverlay();
    };
  },
  //关闭新的微信分享浮层
  hideNewWXShareOverlay () {
    let overlay = document.getElementById('wx-new-share-overlay');
    document.body.removeChild(overlay);
  },
  // TODO 检查无使用后，可删除
  logpv (hotel_id, page, item_id, extras) { },
  /**
   * 关闭当前窗口
   */
  closeWindow () {
    try {
      window.close();
      if (window['WeixinJSBridge']) window.WeixinJSBridge.invoke('closeWindow', {}, () => { });
    } catch (e) { }
  },
  //计算晚数
  calc_nights (checkin, checkout) {
    let reg = /^(\d{4})\-(\d{1,2})\-(\d{1,2})(\s+(\d{1,2})\:(\d{1,2})\:(\d{1,2}))?$/;
    let rego = /^(\d{4})\/(\d{1,2})\/(\d{1,2})(\s+(\d{1,2})\:(\d{1,2})\:(\d{1,2}))?$/;
    let checkindate = new Date();
    if (checkin) {
      let checkinarr = checkin.match(reg);
      if (!checkinarr) {
        checkinarr = checkin.match(rego);
      }
      if (checkinarr) {
        checkindate = new Date(
          parseInt(checkinarr[1], 10),
          parseInt(checkinarr[2], 10) - 1,
          parseInt(checkinarr[3], 10),
        );
      }
    }
    let checkoutdate = new Date();
    if (checkout) {
      let checkoutarr = checkout.match(reg);
      if (!checkoutarr) {
        checkoutarr = checkout.match(rego);
      }
      if (checkoutarr) {
        checkoutdate = new Date(
          parseInt(checkoutarr[1], 10),
          parseInt(checkoutarr[2], 10) - 1,
          parseInt(checkoutarr[3], 10),
        );
      }
    }
    return Math.floor(Math.abs(checkoutdate.getTime() - checkindate.getTime()) / 1000 / 86400);
  },
  /**
   * 基于zkt.fetch封装的ajax接口请求
   * @param {string} method  需要请求的接口名称
   * @param  {object} [args={}] 请求需要携带的参数
   * @param {object} [options]  ajax配置参数
   * @param {boolean} [options.silent]  是否不需要处理异常信息
   * @param {boolean} [options.cache]  是否需要缓存接口返回结果
   * @param {number} [options.timeout]  接口响应超时时间
   * @param {boolean} [options.disableRisk]  当前请求是否无需风险识别
   * @param {boolean} [options.device_token]  当前请求是否需要header迭代设备指纹
   * @param {string} [apiEndpoint=zkt.apiEndoint] 接口请求路由
   * @returns {Promise<*>} 返回结果
   */
  api (method, args, options, apiEndpoint) {
    if (!options) options = {}
    apiEndpoint = apiEndpoint || this.apiEndpoint;
    if (!apiEndpoint) throw new Error('no zkt.apiEndpoint!');
    if (!args) args = {};
    let get = zkt._GET();
    let queryKeys = Object.keys(get);
    queryKeys.unshift('method');
    get.method = method;

    let queries = queryKeys
      .map(function (k) {
        //将url中参数值的特殊字符进行替换，否则可能出现在指定post请求，实际发送的是get请求的问题
        let replace_str = get[k]
          .replace('?', '？')
          .replace('!', '！')
          .replace('*', '')
          .replace('(', '（')
          .replace(')', '）');
        return k + '=' + encodeURIComponent(replace_str);
      })
      .join('&');
    let url = apiEndpoint + '?' + queries;
    //在debug时缓存请求的接口及数据
    if (zktDebug.isDebug()) {
      zkt.sendApiList = zkt.sendApiList || {};
      let apiData = {
        args: JSON.stringify({
          args,
        }),
      };
      zkt.sendApiList[url] = apiData;
    }
    return zkt.fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        args,
      }),
      silent: options && options.silent,
      cache: options && options.cache,
      timeout: options && options.timeout, //单位为秒
      device_token: options.device_token,
      disableRisk: options.disableRisk,
    })
      .then((data) => {
        //如果是调试模式时缓存接口
        if (zktDebug.isDebug()) {
          zkt.sendApiList[url].data = data;
        }
        return data;
      });
  },
  /**
   * 可在多业务线上调用的公共方法，一般指固定调用 zhida-common项目中 commonApis中的方法
   * @param {string} method 公共接口的名称
   * @param {boolean} [options.silent]  是否不需要处理异常信息
   * @param {boolean} [options.cache]  是否需要缓存接口返回结果
   * @param {number} [options.timeout]  接口响应超时时间
   * @returns {Promise<*>}
   */
  commonApi (method, args, options) {
    let apiEndpoint = this.commonApiEndpoint || '/Common/commonApisToC';
    return zkt.api(method, args, options, apiEndpoint);
  },
  /**
   * 用于内部，跨二级域名替换 不带http协议
   * 内部测试及预发 命名规则
   test[x]-*.zhiketong.net
   release-*.zhiketong.cn
   比如，从 test5-shanghu.zhiketong.net 跳转到 test5-zd.zhiketong.net，时需要将对应域名替换掉
   * @param prefix
   * @returns {string}
   */
  replaceDomain (prefix) {
    //release-mis.zhiketong.net
    let host = location.hostname.replace(/\w+\./i, `${prefix}.`);
    return host;
  },
  /**
   * 用于内部，跨二级域名替换 带http协议
   * 内部测试及预发 命名规则
   test[x]-*.zhiketong.net
   release-*.zhiketong.cn
   比如，从 test5-shanghu.zhiketong.net 跳转到 test5-zd.zhiketong.net，时需要将对应域名替换掉
   * @param prefix
   * @returns {string}
   */
  replaceDomainWithProtocol (prefix) {
    //release-mis.zhiketong.net
    let host = location.origin.replace(/\w+\./i, `${prefix}.`);
    return host;
  },
  /**
   * 获取二维码域名
   * @returns {*|string|string}
   */
  getQrDomain () {
    return (GLOBAL_ENV && GLOBAL_ENV.QR_DOMAIN) || z.replaceDomain('qr');
  },
  /**
   * 获取zhida-common服务的路径
   * @returns {string}
   */
  getCommonServicePath () {
    let domain = (window.GLOBAL_ENV && window.GLOBAL_ENV.zhidaDomain) || '';
    if (domain) {
      domain = '//' + domain;
    }
    return domain + '/Common';
  },
  /**
   * 获取C端是否显示图形验证码
   * @param prefix {string} 标识
   * @returns {boolean}
   */
  getCaptchaImgIsShow (prefix) {
    let memberId = z.cookie.get('member_id') || '';
    let name = prefix ? `${memberId}_${prefix}` : `${memberId}`;
    return z.cookie.get(`${name}_needCaptcha`);
    // return z.cookie.get(`${z.cookie.get('member_id') || ''}_needCaptcha`);
  },
  pubilcPathConfig: pubilcPathConfig,
  /**
  * 模拟页面跳转
  * @param options {}
  * @param title {string} 标题
  * @param href {string} 当前url
  * @param href {Function}  callback
  */
  showFullLayer (options = {}, title = '', href = location.href, cb) {
    let config = Object.assign({ t: Date.now() }, options)
    window.history.pushState(config, title, href)
    window.addEventListener('popstate', function () {
      setTimeout(function () {
        cb && cb()
      }, 100)
    })
  },
  ...risk,
};
module.exports = zkt;


