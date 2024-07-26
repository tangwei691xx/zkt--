/**
 *
 * @format
 */
/* eslint-disable camelcase */

const PLATFORM_MAPS = {
  wx: 'h5',
  wxa_home: '小程序',
  ali_home: '支付宝小程序',
  douyin: '抖音',
  douyin_home: '抖音小程序',
  browser: '短信',
};
const PLATFORM = 'h5';
const ZKT_PLATFORM = 'c';
// 神策标识
const DATA_SET_PRX = 'data-track-';
// 当前页面上游
const REFERER_PAGE = 'SENSOR_DATA_REFERER_PAGE';
// 当前页面（下个页面获取上游使用）
const REFERER_PAGE_STORE = 'SENSOR_DATA_REFERER_PAGE_STORE';
// 单页面临时store
const SINGLE_PAGE_TEMP_STORE = 'TEMP_STORE';
// 映射表
const MAPPING_TABLE = {
  brand_id: 'brand_id_bury',
  app_id: 'app_id_bury',
  // 时间
  time: 'time_bury',
  // 商户id
  hotel_id: 'hotel_id_bury',
  // 酒店员工id
  cid: 'user_id_bury',
  // 销货商
  hid: 'hid_bury',
  // 用户id
  member_id: 'member_id_bury',
  // 业务线
  category: 'category',
  // 产品id
  product_id: 'product_id_bury',
  // 订单id
  order_id: 'order_id_bury',
  // 平台订单id
  platform_order_id: 'platform_order_id_bury',
  // 网址
  url: 'url',
  // 一级页面名称
  first_page: 'first_page',
  // 二级页面名称
  second_page: 'second_page',
  // 三级页面名称
  third_page: 'third_page',
  // 上游页面网址
  referrer_url: 'referrer_url',
  // 上游一级页面名称
  referrer_first_page: 'referrer_first_page',
  // 上游二级页面名称
  referrer_second_page: 'referrer_second_page',
  // 上游三级页面名称
  referrer_third_page: 'referrer_third_page',
  // 系统端
  platform: 'zkt_platform',
  // C端渠道区分
  channel_platform: 'channel_platform',
  // tab页名称
  tab_name: 'tab_name',
  // 窗口名称
  window_name: 'window_name',
  // 组件弹窗
  frame_name: 'frame_name',
  // 系统端用户id
  zkt_platfrom_id: 'zkt_platfrom_id',
  // 经度
  lng: 'lng',
  // 纬度
  lat: 'lat',
  // 实际传播渠道
  actual_from_type: 'actual_from_type',
  // 实际传播人id
  actual_from_id: 'actual_from_id',
  // 微信来源
  from: 'from',
  // 来源渠道
  source: 'source',
  // 页面最初来源渠道
  source_first: 'source_first',
  // 订单召回消息的订单类型
  order_event: 'order_event',
  // 微信推送的消息id
  message_id: 'message_id',
  // 渠道id
  sys_make_qr_id: 'sys_make_qr_id',
  // 是否图片打开
  tj_bm_poster: 'poster',
  // BALA页面id
  tj_bm_customize_snapshot_id: 'customize_snapshot_id',
  // 作者
  tj_bm_writer: 'writer',
  // AB测试
  ab_test: 'ab_test',
  // 业务埋点id
  cf_id: 'cf_id',
  // 业务埋点名称  后续业务埋点都通过这个字段来承载，意味着业务名称不能重复
  cf_name: 'cf_name',
};

// 默认路由参数
const DEFAULT_PAGE = {
  first_page: '',
  second_page: '',
  third_page: '',
  page_id: '',
};

// 默认上游路由参数
const DEFAULT_REFERER_PAGE = {
  referrer_page_id: '',
  referrer_first_page: '',
  referrer_second_page: '',
  referrer_third_page: '',
};

const DEFAULT_KEYS = [...Object.keys(DEFAULT_PAGE), ...Object.keys(DEFAULT_REFERER_PAGE)];

module.exports = {
  PLATFORM,
  PLATFORM_MAPS,
  ZKT_PLATFORM,
  DATA_SET_PRX,
  REFERER_PAGE,
  REFERER_PAGE_STORE,
  SINGLE_PAGE_TEMP_STORE,
  MAPPING_TABLE,
  DEFAULT_PAGE,
  DEFAULT_REFERER_PAGE,
  DEFAULT_KEYS,
};
