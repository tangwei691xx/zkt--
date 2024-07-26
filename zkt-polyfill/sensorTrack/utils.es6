const URI = require('urijs');
const Storage = require('./storage.es6')
const {MAPPING_TABLE, REFERER_PAGE, REFERER_PAGE_STORE, DEFAULT_PAGE, SINGLE_PAGE_TEMP_STORE, DEFAULT_KEYS} = require('./constants.es6');
const getPageViewerUid = require('../utils/getPageViewerUid.es6');
// 控制台LOG格式
function Log (...msg) {
  const _store = Storage.getInstence()
  _store.getItem('debug') && console.info('%csensorTrack: ', 'color: #007acc;', ...msg);
}

// 映射对应字段方法(自定义属性， 单属性， 多属性)
function keyMapsKey(name) {
  // 如果有值 就不进行遍历
  if (MAPPING_TABLE[name]) return MAPPING_TABLE[name];
  // 遍历多重含义
  for (let key in MAPPING_TABLE) {
    if (MAPPING_TABLE.hasOwnProperty(key)) {
      const keys = key.split('|');
      for (let i = 0; i < keys.length; i++) {
        if (name === keys[i]) return MAPPING_TABLE[key];
      }
    }
  }
  return name
}

function globalThis () {
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  return {};
}

function globalZkt () {
  const self = globalThis();
  if (typeof self.zkt !== 'undefined') return self.zkt
  if (typeof self.z !== 'undefined') return self.z;
  return {};
}

/**
 * 获取路由地址
 * eg： /NewHome/Orders
 * @param url
 * @returns {string}
 */
 function getUrlRouterList(url) {
  if (!url) {
    const self = globalThis()
    url = self.location.href
  };
  let uri = new URI(url);
  // 实际业务中可能有 /NewHome/appid_wxcc878e3a91463bb5?appid=wxcc878e3a91463bb5  或者 /NewHome/appid:wxcc878e3a91463bb5?appid=wxcc878e3a91463bb5 的情况
  let pathRouter =
    uri
      .href()
      .substr(uri.origin().length)
      .split('?')[0]
      .split('/appid_')[0]
      .split('/:appid')[0] || '';
  return pathRouter;
}

// 处理上游来源
function updateReferrerSource(obj) {
  const current = obj && obj.current
  const referer = obj && obj.referer
  const _store = Storage.getInstence()
  const currentPage =  current || getTrackInstance()
  const refererPage = referer || JSON.parse(sessionStorage.getItem(REFERER_PAGE_STORE) || Object.assign({}, DEFAULT_PAGE))
  // 如果非首次 更新store
  if (!_store.getItem('initRefererRouter')) {
    _store.setItem('initRefererRouter', undefined)
    // 更新缓存
    sessionStorage.setItem(REFERER_PAGE, JSON.stringify(refererPage));
    sessionStorage.setItem(REFERER_PAGE_STORE, JSON.stringify(currentPage))
    Log('上游路由： ' + JSON.stringify(refererPage));
  }
  Log('当前路由： ' + JSON.stringify(currentPage));
}

// 过滤风控
function parseUrl(href) {
  let url = new URI(href);
  const pathNameArr = url.pathname().split('/');
  if (pathNameArr[pathNameArr.length - 1].indexOf('appid_') > -1) {
    pathNameArr.pop();
    url.pathname(pathNameArr.join('/'));
  }
  return encodeURI(url.href());
}

// 获取 上游路由信息
function getReferrerSource (type = '') {
  const referer = sessionStorage.getItem(REFERER_PAGE)
  let result = {}
  if (referer) result = JSON.parse(referer)
  return {
    referrer_page_id: result.page_id || '',
    referrer_first_page: result.first_page || '',
    referrer_second_page: result.second_page || '',
    referrer_third_page: result.third_page || '',
  }[type];
}

// 获取 track中的路由信息
function getTrackInstance(type = '') {
  const _store = Storage.getInstence();
  const self = globalThis()
  const {href} = self.location;
  const router = getUrlRouterList(href);
  const pvRouters = _store.getItem('pvRouters') || {};
  const tempStore = getTempStore()
  const track = pvRouters[router] && pvRouters[router].track;
  let extra = {};
  if (track) {
    if (typeof track === 'function') extra = {...track()};
    else {
      extra = {...track};
    }
  }
  let obj = {...DEFAULT_PAGE, ...extra}
  // 临时变量
  if (tempStore && tempStore[router]) {
    for (let key in obj) {
      const _t = tempStore[router][key]
      if (_t) {
        obj[key] = (typeof _t === 'function') ? _t() : _t
      }
    }
  }
  return type ? (obj[type] ? obj[type] : '') : obj;
}

// 设置临时变量针对单页面
function setTempStore (type, track) {
  const _store = Storage.getInstence()
  switch (type) {
    case 'init':
      _store.setItem(SINGLE_PAGE_TEMP_STORE, { ...track })
      break;
    case 'destory':
      _store.setItem(SINGLE_PAGE_TEMP_STORE, undefined)
      break;
  }
}

// 获取临时变量
function getTempStore () {
  const _store = Storage.getInstence()
  if (_store.getItem(SINGLE_PAGE_TEMP_STORE)) return _store.getItem(SINGLE_PAGE_TEMP_STORE)
  return false
}

// 是否为神策埋点路由
function isExistRouter (url) {
  if (!url) {
    const self = globalThis();
    url = self.location.href;
  }
  const _router = getUrlRouterList(url);
  const _store = Storage.getInstence();
  const pvRouters = _store.getItem('pvRouters');
  return (pvRouters[_router] && pvRouters[_router].hasOwnProperty('track')) || false;
}

// 是否为自定义配置
function isCustomConfig() {
  const configNoGetPv = getTrackInstance('noAutoGetPv');
  return typeof configNoGetPv === 'object' && configNoGetPv.dependence && configNoGetPv.dependence.length;
}
// 获取依赖状态
function getDependenceStatus (config = {}) {
  // 是否配置了强依赖
  let size = 0;
  let status = true;
  if (isCustomConfig()) {
    const configNoGetPv = getTrackInstance('noAutoGetPv');
    const dependence = configNoGetPv.dependence || [];
    size = dependence.length;
    // 校验依赖是否都有值
    status = dependence.every((key) => {
      const _key = keyMapsKey(key);
      if (typeof config[_key] === 'function') {
        return config[_key]();
      }
      return config[_key];
    });
  }
  return {
    size,
    status,
  };
}

// 是否不采集pv
function isNotGetPv(config = {}) {
  const _store = Storage.getInstence();
  const limit = _store.getItem('notGetPvRouters');
  const shouldTrack = isExistRouter();
  let limitFlag = false;
  if (limit.length) {
    const router = getUrlRouterList();
    limitFlag = limit.indexOf(router) > -1;
  }
  const configNoGetPv = getTrackInstance('noAutoGetPv');
  let flag = false;
  if (typeof configNoGetPv === 'boolean') {
    flag = configNoGetPv;
  } else if (isCustomConfig()) {
    const { status } = getDependenceStatus(config);
    flag = !status;
  }
  return limitFlag || (shouldTrack && flag);
}

function getDependenceOptions (config = {}) {
  const configNoGetPv = getTrackInstance('noAutoGetPv');
  const obj = {};
  // 是否配置了强依赖
  if (isCustomConfig()) {
    // 校验依赖
    (configNoGetPv.dependence || []).forEach((key) => {
      const _key = keyMapsKey(key);
      if (typeof config[_key] === 'function') {
        obj[_key] = config[_key]();
      } else {
        obj[_key] = config[_key];
      }
    });
  }
  return obj;
}

function getOptionsSnapshot (options = {}) {
  const obj = {}
  Object.keys(options).forEach((key) => {
    const _key = keyMapsKey(key)
    if (typeof config[_key] === 'function') obj[_key] = options[_key]()
    else obj[_key] = options[_key]
  })
  return obj
}

function getDefaultOptionsSnapshot (config = {}) {
  const obj = {}
  ;(DEFAULT_KEYS).forEach((key) => {
    const _key = keyMapsKey(key)
    if (typeof config[_key] === 'function') obj[_key] = config[_key]()
    else obj[_key] = config[_key]
  })
  return obj
}

function formatDate(d) {
  function pad(n) {
    return n < 10 ? '0' + n : n;
  }

  return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + ':' + pad(d.getSeconds()) + '.' + pad(d.getMilliseconds());
}

function createSessionId () {
  const zkt = globalZkt()
  // eg: H188343313-16384577487480
  return (zkt.cookie && zkt.cookie.get('zkt_session_id')) || (zkt.getRequestId && zkt.getRequestId()) ||  `H${getPageViewerUid()}-${Math.ceil(Date.now() / 1000)}${Math.floor(1000 + Math.random() * 9000)}`
}

function getSessionIdKey () {
  const zkt = globalZkt();
  // eg: wxcc878e3a91463bb5session_id188343313
  return `${zkt._GET('appid')}session_id${getPageViewerUid()}`
}

module.exports = {
  Log,
  keyMapsKey,
  getUrlRouterList,
  updateReferrerSource,
  parseUrl,
  getReferrerSource,
  getTempStore,
  setTempStore,
  getTrackInstance,
  isExistRouter,
  isNotGetPv,
  formatDate,
  getSessionIdKey,
  createSessionId,
  globalZkt,
  globalThis,
  getDependenceStatus,
  getDependenceOptions,
  getOptionsSnapshot,
  isCustomConfig,
  getDefaultOptionsSnapshot
}