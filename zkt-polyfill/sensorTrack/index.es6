/** @format */
/* eslint-disable camelcase */
/* eslint-disable jsdoc/require-jsdoc */

// 神策监听接入
// const {
// 	init,
// 	login,
// 	setGlobalProperties,
// 	getPresetProperties,
// 	setAnonymousID,
// 	getAnonymousID,
// 	sensors,
// 	track,
// 	TrackEvents,
// 	autoTrackSinglePage,
// } = require('@zkt/tracker');

const tracker = require('@zkt/tracker');
const { PLATFORM_MAPS, PLATFORM, ZKT_PLATFORM, DATA_SET_PRX, REFERER_PAGE_STORE } = require('./constants.es6');
const {
  Log,
  keyMapsKey,
  getUrlRouterList,
  updateReferrerSource,
  parseUrl,
  getTrackInstance,
  setTempStore,
  getTempStore,
  getReferrerSource,
  isExistRouter,
  isNotGetPv,
  formatDate,
  createSessionId,
  getSessionIdKey,
  globalZkt,
  globalThis,
  getDependenceStatus,
  isCustomConfig,
  getDefaultOptionsSnapshot,
  getDependenceOptions,
} = require('./utils.es6');
const Queue = require('./queue.es6');
const Storage = require('./storage.es6');
const geoLocation = require('../location/index.es6');
const getValueByKeyInGlobal = require('../utils/getValueByKeyInGlobal.es6');

/**
 * 神策埋点
 *
 * 初始化 -> 注册全局属性 -> dom埋点 + 手动触发埋点事件
 * 1. 初始化
 * initSensor({
 *  project: 'xxx',
 *  category: 'xxx',
 *  pvRouters: pvMap.routers
 * })
 *
 * 2. 注册全局属性
 *  或 setGlobalProperties({ order_id: 'xxx', member_id: 'xxx' })
 *
 * 3.手动埋点
 * onClick
 * <div {…sensorDomTrack({ name: ‘aaa’, label: ‘bbb’}, this.onClickFunction)}></div>
 * z.tap
 * <div {…sensorDomTrack({ name: ‘aaa’, label: ‘bbb’}, z.tap(this.onClickFunction))}>使用tap</div>
 * 无传值
 * <div {...sensorDomTrack(this.onClickFunction)}>
 * 如同
 * <div data-trace-name=“aaa” data-trace-label=“bbb” data-trace-click=“true” onClick={this.onClickFunction}></div>
 *
 * 4. 手动触发埋点事件
 * const {sensorTrack, TrackEvents}  = z.sensorTrack
 * sensorTrack(TrackEvents.TabSwitch, { tab_name: 'xxx' })
 * sensorTrack(TrackEvents.TabSwitch, { tab_name: 'xxx' }, () => {window.location.href = 'xxx'})
 * sensorTrack(TrackEvents.TabSwitch, { tab_name: 'xxx' }, () => {window.location.href = 'xxx'}, el)
 */
const Sensor = {
  // 初始化配置
  initSensor(options, config = {}) {
    const self = globalThis();
    const { GLOBAL_ENV } = self;
    const LOG_HOST = GLOBAL_ENV && GLOBAL_ENV.LOG_HOST;
    const SENSOR_URL = GLOBAL_ENV && GLOBAL_ENV.SENSOR_URL;
    const _store = Storage.getInstence();
    const SensorQueue = new Queue();
    const zkt = globalZkt();
    const opt = {
      serverUrl: SENSOR_URL,
      debug: zkt._GET('debug') === '1', // url里面加了debug=1才会打印日志
      // 平台配置 👇
      platform: Sensor.getPlatform(),
      spa: false, // 自动根据url切换进行 pv采集
      clickMap: true, // 自动点击埋点 （自动采集点击事件与页面停留事件）
      scrollNoticeMap: true, // 自动视区埋点
      disableVtrack: true, // 是否关掉拉取可视化全埋点数据
      cross_subdomain: true, // 设置主域名相同的用户会认为是同一个用户
      isAutoTrack: true,
      ...options,
    };
    // 初始化定位
    Sensor.getLocation();
    // 队列
    _store.setItem('queue', SensorQueue);
    // 初始化队列
    SensorQueue.init();
    _store.setItem('debug', opt.debug);
    // 初始化业务线配置的config
    _store.setItem('config', config || {}, true);
    // 开关 默认开启
    _store.setItem('power', true);
    _store.setItem('isAutoTrack', opt.isAutoTrack);
    _store.setItem('pvRouters', opt.pvRouters || {}, true);
    _store.setItem('notGetPvRouters', opt.notGetPvRouters || [], true);
    _store.setItem('singlePageProperties', {});
    _store.setItem('customProperties', {});
    // 控制采集信息
    _store.setItem('control', opt.control || {}, true);
    _store.setItem('project', opt.project || '');
    _store.setItem('category', opt.category || '');
    Log('zkt全部配置: ', { ...opt, serverUrl: LOG_HOST });
    tracker.init({ ...opt, serverUrl: LOG_HOST });
    _store.setItem('init', true);
    // 初始化sessionid
    Sensor.initSessionId();
    // 初始化上报参数
    Sensor._initPageOptions();
    // 关联用户id
    Sensor.setSensorUserId(opt.params || {});
    // 初始化采集当前pv
    Sensor.initRouterPvTrack();
    // 如果自动埋点则开启
    if (opt.isAutoTrack) {
      // 监听自定义全局事件
      Sensor.initCustomWatch();
      // 监听自定义采集pv事件
      Sensor.initRouterWatch();
      // 监听页面停留
      Sensor.initPageLeaveWatch();
    }
  },
  getLocation() {
    let disabledTJGeoLocation = zkt.zktRouteInfo && zkt.zktRouteInfo.meta && zkt.zktRouteInfo.meta.disableTJlocation;
    if (!disabledTJGeoLocation) {
      try {
        const hotelConfigs = JSON.parse(getValueByKeyInGlobal('hotelConfigs', '{}'));
        disabledTJGeoLocation = hotelConfigs
          ? hotelConfigs.BEHAVIORAL_DATA_STATISTICS_PROHIBIT_GEOLOCATION === '1'
          : false;
      } catch (e) {
        console.log(e);
      }
    }
    if (!disabledTJGeoLocation) {
      geoLocation.getLocation(function (err, res) {
        if (!err && res) {
          Sensor.geoPostion = {
            lat: res.lat,
            lng: res.lng,
            time: Date.now(),
          };
        }
      });
    }
  },

  // 监听全局input事件
  initCustomWatch() {
    const self = globalThis();
    function _handleInput(e) {
      const NODE_NAME = ['SELECT'];
      const dataset = (e && e.target && e.target.dataset) || {};
      if (dataset.trackDisable !== 'true') {
        if (NODE_NAME.indexOf(e.target.nodeName) > -1) {
          const selectedOptions = e.target.selectedOptions && e.target.selectedOptions[0];
          const selectValue =
            (selectedOptions && selectedOptions && selectedOptions.dataset && selectedOptions.dataset.trackValue) || '';
          Sensor.sensorTrack(
            Sensor.TrackEvents.SelectChange,
            {
              value: selectValue || e.target.value || '',
              name: dataset.trackName || '',
            },
            e.target,
          );
        }
      }
    }

    function _handleBlur(e) {
      const dataset = (e && e.target && e.target.dataset) || {};
      const NODE_NAME = ['INPUT', 'TEXTAREA'];
      if (dataset.trackDisable !== 'true') {
        if (NODE_NAME.indexOf(e.target.nodeName) > -1) {
          Sensor.sensorTrack(
            Sensor.TrackEvents.InputComplete,
            {
              name: dataset.trackName || '',
              value: dataset.trackValue || e.target.value || '',
            },
            e.target,
          );
        }
      }
    }
    self.addEventListener('input', (e) => _handleInput(e));
    // TODO: InputComplele 临时处理， 后期需要统一收口
    self.addEventListener('blur', (e) => _handleBlur(e), true);
  },
  // 获取标识
  getPlatform() {
    const zkt = globalZkt();
    const container = zkt._GET('platform') || 'wx';
    return Object.keys(PLATFORM_MAPS).includes(container) ? PLATFORM_MAPS[container] : PLATFORM;
  },
  // 可选属性
  _getOptionalAttributes(eventType) {
    const _store = Storage.getInstence();
    const control = _store.getItem('control');
    // 获取默认事件上报参数
    const options = Sensor.getDefaultProperty(eventType);
    // 业务线配置额外自定义参数对应指定事件
    if (typeof control !== 'undefined') {
      Object.keys(control).forEach((properties) => {
        // 是否在当前事件采集
        let status = !control[properties].events;
        // 是否在当前路由采集
        let routersStatus = !control[properties].routes;

        if (!status) status = (control[properties].events || []).some((_eventType) => _eventType === eventType);

        if (!routersStatus) {
          const _router = getUrlRouterList();
          routersStatus = (control[properties].routes || []).some((routerPath) => routerPath === _router);
        }

        // 都符合条件进行参数采集
        if (status && routersStatus) {
          if (typeof control[properties] && control[properties].handle !== 'undefined')
            options[properties] = control[properties].handle;
        }
      });
    }

    return options;
  },
  // 设置默认
  getDefaultProperty(eventType) {
    const maps = {
      [Sensor.TrackEvents.PageView]: {
        // 元素id
        element_id() {
          return getTrackInstance('element_id');
        },
      },
    };
    if (maps[eventType]) return maps[eventType];
    return {};
  },
  // 设置C端匿名用户id 命名id 未完成 添加手机号
  setSensorUserId(params) {
    const zkt = globalZkt();
    const _store = Storage.getInstence();
    const hotel_id = params && params.hotel_id;
    const user_id = params && params.user_id;
    const _platform = params && params.platform;
    const hotelId = hotel_id || zkt._GET('hotel_id') || zkt._GET('hotelId') || zkt._GET('hid') || '';
    const platform = _platform || ZKT_PLATFORM;
    const memberId = user_id || zkt.cookie.get('member_id') || zkt._GET('cid') || '';
    _store.setItem('login', !!(hotelId && memberId));
    tracker.setAnonymousID(`${platform}-${memberId}-${hotelId}`);
  },
  // 神策用户登录
  sensorLogin(id) {
    tracker.login(id);
  },
  // 初始化采集当前pv
  initRouterPvTrack() {
    Log('初始化采集当前pv');
    const config = Sensor._getGlobalConfig();
    // 初始化采集pv
    if (!Sensor.AuxiliaryFunction.isNotGetPv(config)) return Sensor.sensorRouterPvTrack();
    return Sensor._delayEvent();
  },
  // 初始化路由监听
  initRouterWatch() {
    Log('初始化路由监听');
    z.history.listen(() => {
      const _store = Storage.getInstence();
      const config = Sensor._getGlobalConfig();
      // 重新关联userid
      if (!_store.getItem('login') && typeof _store.getItem('login') !== 'undefined') {
        Log('重新关联用户标识');
        Sensor.setSensorUserId();
      }
      const _routers = _store.getItem('pvRouters');
      const _router = getUrlRouterList();
      // 开启自动路由访问初始化全局上传参数
      if (
        _routers &&
        _router &&
        _routers[_router] &&
        Object.prototype.hasOwnProperty.call(_routers[_router], 'autoInitGetGlobalParams') &&
        _routers[_router].autoInitGetGlobalParams
      ) {
        // 开启状态
        Sensor._resetInitPageOptions();
      } else if (getTempStore()) {
        // 清空临时数据
        setTempStore('destory');
        Sensor._resetInitPageOptions();
        // eslint-disable-next-line valid-typeof
      } else if (typeof _store.getItem('singlePageProperties') !== '{}') {
        // 单页面数据
        Sensor._resetInitPageOptions();
        _store.setItem('singlePageProperties', {});
      }
      // 重置自定义字段
      _store.setItem('customProperties', {});
      // 重置采集pv状态
      Sensor._resetInitRouterPvStatus();
      // 重置当前页面事件队列
      Sensor.resetInitRouterEventQueue();
      // 是否配置不自动采集
      if (!Sensor.AuxiliaryFunction.isNotGetPv(config)) Sensor.sensorRouterPvTrack();
      return Sensor._delayEvent();
    });
  },
  _delayEvent() {
    const _store = Storage.getInstence();
    const config = Sensor._getGlobalConfig();
    // 自定义配置 延迟进行pv采集 等待 消费动作
    if (isCustomConfig()) {
      const pageConfig = _store.getItem('singlePageProperties');
      const { status } = getDependenceStatus({ ...config, ...pageConfig });
      if (!status) {
        const options = Sensor._getGlobalConfig();
        const sensorQueue = _store.getItem('queue');
        // 入队
        sensorQueue.enQueue({
          type: Sensor.TrackEvents.PageView,
          options,
        });
      }
    }
  },
  // 单页面采集属性配置
  setPageProperties(options = {}) {
    const _store = Storage.getInstence();
    const _options = Sensor._handleKeyValue(options);
    _store.setItem('singlePageProperties', _options);
    Sensor._setSensorTrackerProperties(_options);
  },
  // 设置自定义属性
  setCustomProperties(options = {}){
    const _store = Storage.getInstence();
    const _options = Sensor._handleKeyValue(options);
    _store.setItem('customProperties', _options);
    Sensor._setSensorTrackerProperties(_options);
  },
  getPageId () {
    try {
      return Sensor._getRouterDefaultConfig().page_id() || ''
    } catch (e) {
      console.error(e);
      return '';
    }
  },
  // 监听页面跳转， 关闭停留事件
  initPageLeaveWatch() {
    Log('初始化路由停留');
    Log('上次停留时长', localStorage.getItem('pageLeave'));
    // 当前访问时间
    let date = Date.now();
    // let flag = false;
    const self = globalThis();
    const refreshTime = () => {
      date = Date.now();
    };
    const pageLeave = (reason) => {
      Log('路由停留进行事件上报');
      localStorage.setItem('pageLeave', reason || '未知原因');
      // 最大阅读高度
      const trackOpt = {
        dwell_time: Date.now() - date,
      };
      if (self.maxreadheight !== undefined) {
        trackOpt.page_view_height = self.maxreadheight;
      }
      if (self.bala_type !== undefined) {
        trackOpt.bala_type = self.bala_type;
      }
      localStorage.setItem('pageLeave', JSON.stringify(trackOpt));
      // 进行事件上报
      Sensor.sensorTrack(Sensor.TrackEvents.PageLeave, trackOpt);
      refreshTime();
    };
    // 非关闭
    z.history.block(pageLeave);
    // 关闭
    if (self.navigator) {
      const u = navigator.userAgent;
      const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      if (isAndroid) {
        if (self.addEventListener) {
          document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
              pageLeave('android visibilitychange');
            }
          });
        } else {
          self.onbeforeunload = pageLeave;
        }
      } else if (self.addEventListener) {
        self.addEventListener(
          'pagehide',
          () => {
            pageLeave('android pagehide');
          },
          false,
        );
      }
    }
    // const unloadEvent = ['onunload', 'onpagehide', 'onbeforeunload'];
    // 关闭
    // unloadEvent.forEach((leaveType) => {
    //   if (leaveType in self && !flag) {
    //     flag = true;
    //     self[leaveType] = pageLeave;
    //   }
    // });
  },
  // 上报分享事件
  reportShare(type) {
    const maps = {
      onMenuShareAppMessage: 'share_friend',
      onMenuShareTimeline: 'share_friend_circle',
    };
    Sensor.sensorTrack(Sensor.TrackEvents.Share, {
      share_type: maps[type],
    });
  },
  // 初始化全局配置
  _initPageOptions() {
    const _store = Storage.getInstence();
    const storeRefererPage = sessionStorage.getItem(REFERER_PAGE_STORE);
    if (!storeRefererPage) {
      // 设置标识
      _store.setItem('initRefererRouter', true);
      sessionStorage.setItem(REFERER_PAGE_STORE, JSON.stringify(getTrackInstance()));
      Log(`初始化上游${JSON.stringify(getTrackInstance())}`);
    }

    const options = Sensor._getRouterDefaultConfig();
    const _initOptions = { ...options };
    if (!_store.getItem('initOptions')) {
      _store.setItem('initOptions', _initOptions, true);
    }
    Sensor._setSensorTrackerProperties(_initOptions);
  },
  // 初始化sessionid
  initSessionId() {
    const sessionIdKey = getSessionIdKey();
    const session_id = sessionStorage.getItem(sessionIdKey);
    // 不存在进行重新初始化
    if (!session_id) {
      const newSessionId = createSessionId();
      sessionStorage.setItem(sessionIdKey, newSessionId);
    }
  },
  // 重置当前路由初始化状态
  _resetInitPageOptions() {
    const _store = Storage.getInstence();
    const initOptions = _store.getItem('initOptions');
    Sensor._setSensorTrackerProperties(initOptions);
  },
  // 充值pv采集字段
  _resetInitRouterPvStatus() {
    const _store = Storage.getInstence();
    _store.setItem('currentReportPagePv', false);
  },
  // 设置全局属性
  _setSensorTrackerProperties(options = {}) {
    const config = Sensor._getGlobalConfig(options);
    // 遍历options
    tracker.setGlobalProperties(config);
  },
  // 业务线自定义全局属性
  _getCustomGlobalConfig() {
    const _store = Storage.getInstence();
    const config = _store.getItem('config');
    return Sensor._handleKeyValue(config);
  },
  // 获取全局上报属性配置
  _getGlobalConfig(options = {}) {
    const zkt = globalZkt();
    // 业务线自定义
    const customConfig = Sensor._getCustomGlobalConfig();
    // 公用拓展属性
    const customOptions = {
      // 404流程标识
      page_not_find() {
        return sessionStorage.getItem('page_not_find') || '';
      },
    };
    const config = {
      session_id() {
        const sessionIdKey = getSessionIdKey();
        return sessionStorage.getItem(sessionIdKey) || '';
      },
      env() {
        const self = globalThis();
        return (self.GLOBAL_ENV && self.GLOBAL_ENV.ENV) || '';
      },
      project() {
        const _store = Storage.getInstence();
        return _store.getItem('project') || '';
      },
      app_id_bury() {
        return zkt._GET('appid') || ''; // appid
      },
      time_bury() {
        const d = new Date();
        return `${formatDate(d)}`; // 当前时间
      },
      hotel_id_bury() {
        return zkt._GET('hotel_id') || zkt._GET('hotelId') || ''; // 供货商
      },
      hid_bury() {
        return zkt._GET('hid') || ''; // 卖货商
      },
      brand_id_bury() {
        return zkt._GET('brand_id') || ''; // 卖货商
      },
      user_id_bury() {
        return zkt._GET('cid') || ''; // 酒店员工id
      },
      member_id_bury() {
        const memberId = zkt.cookie.get('member_id') || '';
        return memberId; // 用户id
      },
      product_id_bury() {
        return zkt._GET('product_id') || ''; // 产品id
      },
      order_id_bury() {
        return zkt._GET('order_id') || ''; // 订单id
      },
      platform_order_id_bury() {
        return zkt._GET('platform_order_id') || zkt._GET('platformOrderId') || ''; // 平台订单id
      },
      // 只上传非风控链接
      url() {
        const self = globalThis();
        const { href } = self.location;
        return parseUrl(href);
      },
      // 当前路由规则
      url_path() {
        return getUrlRouterList() || '';
      },
      // 上游路由规则
      referrer_path() {
        const referrerUrl = zkt._GET('zkt_referrer') || document.referrer || '';
        return (referrerUrl && getUrlRouterList(referrerUrl)) || '';
      },
      // 只上传非风控链接
      referrer_url() {
        const referrerUrl = zkt._GET('zkt_referrer') || document.referrer || '';
        return parseUrl(referrerUrl);
      },
      // 区分app， 小程序， 微信H5， 浏览器,
      channel_platform() {
        return (zkt && zkt.adaptor && zkt.adaptor.getContainer && zkt.adaptor.getContainer()) || '';
      },
      zkt_platform: ZKT_PLATFORM,
      zkt_platfrom_id() {
        const memberId = zkt.cookie.get('member_id') || zkt._GET('cid') || '';
        return memberId; // 用户id
      },
      lng() {
        return (Sensor.geoPostion && Sensor.geoPostion.lng) || '';
      },
      lat() {
        return (Sensor.geoPostion && Sensor.geoPostion.lat) || '';
      },
      actual_from_id() {
        const cid = zkt._GET('cid');
        const mid = zkt._GET('mid');
        return cid || mid || '';
      },
      actual_from_type() {
        const cid = zkt._GET('cid');
        const mid = zkt._GET('mid');
        return (cid && '员工') || (mid && '消费者') || '';
      },
      from() {
        return zkt._GET('from') || '';
      },
      source() {
        return zkt._GET('source') || '';
      },
      source_first() {
        return zkt._GET('source_first') || '';
      },
      order_event() {
        return zkt._GET('order_event') || '';
      },
      cf_id() {
        return zkt._GET('cf_id') || '';
      },
      cf_name() {
        return zkt._GET('cf_name') || '';
      },
      message_id() {
        return zkt._GET('message_id') || '';
      },
      fs() {
        return zkt._GET('fs') || '';
      },
      ls() {
        return zkt._GET('ls') || '';
      },
      sys_make_qr_id() {
        return zkt._GET('sys_make_qr_id') || '';
      },
      poster() {
        return zkt._GET('tj_bm_poster') || '';
      },
      writer() {
        return zkt._GET('tj_bm_writer') || '';
      },
      customize_snapshot_id() {
        return zkt._GET('tj_bm_customize_snapshot_id') || '';
      },
      tab_name() {
        return getTrackInstance('tab_name') || '';
      },
      title() {
        return getTrackInstance('title') || document.title || '';
      },
      ...customOptions,
      ...customConfig,
      ...options,
    };
    return config;
  },
  // 路由默认属性配置
  _getRouterDefaultConfig() {
    const _store = Storage.getInstence();
    return {
      // 页面id
      page_id() {
        return getTrackInstance('page_id');
      },
      // 业务线内自定义区分
      business_category() {
        return getTrackInstance('businessCategory');
      },
      category() {
        return getTrackInstance('category') || _store.getItem('category') || '';
      },
      first_page() {
        return getTrackInstance('first_page');
      },
      second_page() {
        return getTrackInstance('second_page');
      },
      third_page() {
        return getTrackInstance('third_page');
      },
      referrer_page_id() {
        return getTrackInstance('referrer_page_id');
      },
      referrer_first_page() {
        return getReferrerSource('referrer_first_page');
      },
      referrer_second_page() {
        return getReferrerSource('referrer_second_page');
      },
      referrer_third_page() {
        return getReferrerSource('referrer_third_page');
      },
    };
  },
  // 路由扩展属性
  _getRouterExtraConfig() {
    const defaultConfigKeys = [
      'page_id',
      'businessCategory',
      'category',
      'first_page',
      'second_page',
      'third_page',
      'referrer_page_id',
    ];
    const routerInfos = getTrackInstance();
    const options = {};
    for (const i in routerInfos) {
      if (defaultConfigKeys.indexOf(i) === -1) {
        options[i] = routerInfos[i];
      }
    }
    return options;
  },
  // 设置全局事件自定义属性
  setSensorTrackerProperties(options = {}, config = {}) {
    // 设置上报内容（影响 当前路由上报信息与上游信息）
    if (typeof config.report === 'undefined') {
      // eslint-disable-next-line no-param-reassign
      config.report = true;
    }
    if (config.report) {
      const router = getUrlRouterList();
      setTempStore('init', {
        [router]: options,
      });
    }
    const _options = Sensor._handleKeyValue(options);
    Sensor._setSensorTrackerProperties(_options);
  },
  // 处理遍历
  _handleKeyValue(opt) {
    const _opt = {};
    // 遍历参数
    Object.keys(opt || {}).forEach((key) => {
      _opt[keyMapsKey(key)] = opt[key];
    });
    return _opt;
  },
  // 获取当前配置的自定义属性
  getSensorTrackerProperties(...args) {
    tracker.getPresetProperties(...args);
  },
  // 获取当前登录的命名id
  getSensorUserId(...args) {
    tracker.getAnonymousID(...args);
  },
  autoTrackSinglePage(params) {
    tracker.autoTrackSinglePage(params);
  },
  track(...args) {
    tracker.track(...args);
  },
  // 神策方法
  sensorTrack(type, options, el) {
    if (!(Object.values(Sensor.TrackEvents) || []).includes(type))
      console.error('sensorTrack: The type is not TrackEvents properties');
    const _store = Storage.getInstence();
    // 需要判断是否经过初始化 与当前开关
    if (!_store.getItem('power') && !_store.getItem('init')) return;
    // 额外自动参数
    const routerConfig = Sensor._getRouterDefaultConfig();
    const routerExtConfig = Sensor._getRouterExtraConfig();
    const pageConfig = _store.getItem('singlePageProperties');
    const config = Sensor._getGlobalConfig();
    const _options = Sensor._getOptionalAttributes(type);
    const newOptions = Sensor._handleKeyValue(options);
    const concatOptions = { ...pageConfig, ..._options, ...routerExtConfig, ...newOptions };
    const { status } = getDependenceStatus({ ...config, ...routerConfig, ...pageConfig });
    // 入队
    if (!status) {
      const sensorQueue = _store.getItem('queue');
      sensorQueue.enQueue({
        type,
        options: concatOptions,
        el,
      });
      return;
    }
    tracker.track(type, concatOptions, el);
  },
  // dom元素 添加埋点参数方法
  sensorDomTrack(datasetObj, callback) {
    let _datasetObj = {};
    let _callback = () => {};
    if (typeof datasetObj === 'function' && !callback) {
      _callback = datasetObj;
    } else {
      _datasetObj = datasetObj;
      _callback = callback;
    }
    let obj = { [`${DATA_SET_PRX}click`]: true };
    for (const key in _datasetObj) {
      if (Object.prototype.hasOwnProperty.call(datasetObj, key)) {
        const _key = keyMapsKey(key);
        obj[DATA_SET_PRX + _key] = _datasetObj[key];
      }
    }
    if (typeof _callback === 'function') {
      obj.onClick = function clickHandler(evt) {
        if (evt && evt.target && evt.target.disabled) return;
        Log('tapped, evt type=', evt.type);
        _callback(evt);
      };
    } else if (typeof _callback === 'object') {
      obj = { ...obj, ..._callback };
    }
    return obj;
  },
  // 除了点击事件的其他处理
  sensorParamsTrack(datasetObj = {}) {
    const obj = {};
    for (const key in datasetObj) {
      if (Object.prototype.hasOwnProperty.call(datasetObj, key)) {
        const _key = keyMapsKey(key);
        obj[DATA_SET_PRX + _key] = datasetObj[key];
      }
    }
    return obj;
  },
  sensorDisabled(status = true) {
    let _res = {};
    if (status) _res = { [`${DATA_SET_PRX}disable`]: true };
    return _res;
  },
  // 单页面只能调用一次 并且如果当前队列存在pv事件，会做为触发条件进行触发
  sensorRouterPvTrackOnce(options = {}) {
    const _store = Storage.getInstence();
    const config = Sensor._getGlobalConfig();
    const routerConfig = Sensor._getRouterDefaultConfig();
    const pageConfig = _store.getItem('singlePageProperties');
    const customConfig = _store.getItem('customProperties');
    // 第一次使用
    if (!_store.getItem('currentReportPagePv')) {
      const _config = { ...config, ...routerConfig, ...pageConfig };
      // 存在自定义配置
      if (isCustomConfig(_config)) {
        Log('页面依赖参数是否验证通过', getDependenceStatus(_config));
        const { status } = getDependenceStatus(_config);
        // 依赖未进行初始化
        if (!status) return;
        const sensorQueue = _store.getItem('queue');
        const isHasQueueEvent = sensorQueue.getLength();
        // 存在未消费的队列
        if (isHasQueueEvent) {
          // 出队
          while (!sensorQueue.isEmpty()) {
            const eventObj = sensorQueue.deQueue();
            // 替换原本的错误值
            const _options = getDependenceOptions(_config);
            // 默认值替换
            const defaultOptions = getDefaultOptionsSnapshot(_config);

            if (Sensor.TrackEvents.PageView === eventObj.type) {
              Sensor.sensorRouterPvTrack({ ...eventObj.options, ...defaultOptions, ..._options, ...customConfig });
            } else {
              Sensor.sensorTrack(eventObj.type, {
                ...eventObj.options,
                ...defaultOptions,
                ..._options,
              });
            }
          }
          return;
        }
      }
      Sensor.sensorRouterPvTrack(options);
    }
  },
  // 重置队列
  resetInitRouterEventQueue() {
    const _store = Storage.getInstence();
    if (_store.getItem('queue')) {
      const sensorQueue = _store.getItem('queue');
      // 初始化
      sensorQueue.init();
    }
  },
  // 手动采集
  sensorRouterPvTrack(options = {}) {
    const _store = Storage.getInstence();
    // 需要判断是否经过初始化 与当前开关
    if (!_store.getItem('power') && !_store.getItem('init')) return;
    // 额外自动参数
    const _options = Sensor._getOptionalAttributes(Sensor.TrackEvents.PageView);
    const routerExtConfig = Sensor._getRouterExtraConfig();
    // 配置快照
    const optionsSnapshot = {
      ..._options,
      ...routerExtConfig,
      ...options,
    };
    // 更新上游信息
    updateReferrerSource();

    // 当前页面已上报pv标识
    _store.setItem('currentReportPagePv', true);
    // 采集pv
    tracker.autoTrackSinglePage(optionsSnapshot);
  },
  // 获取内部store
  getStoreValue(key = '') {
    const _store = Storage.getInstence();
    if (key) return _store.getItem('key');
    return { ..._store };
  },
  // 辅助函数
  AuxiliaryFunction: {
    getUrlRouterList,
    getTrackInstance,
    isExistRouter,
    isNotGetPv,
    updateReferrerSource,
  },
  // 神策暴露出来的主对象，类似window,用于执行神策自带方法
  sensorClient: tracker.sensors,
  // 预设事件属性类型（只读）
  TrackEvents: {
    ...tracker.TrackEvents,
    // 自定义事件
    CustomEvent: 'custom_event',
    // 分享
    Share: 'Share',
    // 页面停留
    PageLeave: 'DwellTime',
    // 长按
    LongPress: 'LongPress',
    FloatShow: 'FloatShow',
  },
};

module.exports = Sensor;
