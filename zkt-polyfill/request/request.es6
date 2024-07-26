/** @format */
const axios = require('axios');
const routeHelper = require('../route/helper.es6');
const adaptor = require('../adaptor.es6');
const errorInteraction = require('../error.es6');

const fetchCache = {};
/**
 * 基于axios封装的ajax接口底层请求
 *
 * @param {string} url 接口请求地址
 * @param {object} config 配置参数
 * @param {boolean} [config.cache] 是否缓存接口结果
 * @param {boolean} [config.json] 是否通过json方式请求
 * @param {string} [config.method] 接口请求方式
 * @param {object} [config.headers] 接口自定义请求头
 * @param {number} [config.timeout=600000] 接口超时时间，单位为秒，默认10分钟
 * @param {boolean} [config.withCredentials=false] 跨域是否自动携带cookie
 * @param {boolean} [config.silent] 是否不集中处理请求异常
 * @param {Function} [config.fetchErrorCallback] 请求错误异常处理，当silent为false生效
 * @returns {promise} promise.resolve 接口返回的data数据  promise.reject 如果silent为true,则直接将错误抛给使用方，如果silent为false，则集中调用fetchError方法将错误直接弹到页面中
 */
function fetch(url, config) {
  const options = config || {};
  const useCache = !!options.cache;
  const cacheKey = url + JSON.stringify(options);
  if (useCache && fetchCache[cacheKey]) {
    try {
      return Promise.resolve(JSON.parse(fetchCache[cacheKey]));
    } catch (e) {
      return Promise.resolve(fetchCache[cacheKey]);
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
  const platform = routeHelper.getSearchValue('platform');
  if (platform) {
    options.headers['zkt-platform'] = platform;
  }
  // 添加语言标示
  const language = zkt.language && zkt.language.currentLanguage ? zkt.language.currentLanguage : '';
  if (language) {
    options.headers[zkt.language.LANGUAGE_BASE_KEY] = language;
  }
  let newHeaders = {};
  for (const key in options.headers) {
    newHeaders[key.toLowerCase()] = options.headers[key];
  }

  options.headers = newHeaders;
  newHeaders = null;
  if (options.method === 'POST' && !options.headers['content-type']) {
    options.headers['content-type'] = zkt.defaultFetchPOSTContentType;
  }
  // 超时时间 单位秒，默认10分钟
  options.timeout = parseInt(options.timeout) > 0 ? parseInt(options.timeout) * 1000 : 60 * 1000 * 10;
  const fetchUrl = routeHelper.addParam(url);
  let requestId = options.headers.requestid;
  if (!requestId) {
    requestId = zkt.getRequestId();
  }
  options.headers.zkt_trace_id = requestId;
  if (zkt.sensorTrack && zkt.sensorTrack.getPageId) {
    options.headers['zkt-page-id'] = zkt.sensorTrack.getPageId();
  }
  if (zkt.cookie.get('zkt_session_id')) {
    options.headers.zkt_session_id = zkt.cookie.get('zkt_session_id');
  }
  if (zkt.cookie.get('zkt_device_id')) {
    options.headers.zkt_device_id = zkt.cookie.get('zkt_device_id');
  }

  try {
    const position = JSON.parse(sessionStorage.getItem('pvPosition'));
    if (position.lat && position.lng) {
      options.headers['zkt-lat'] = position.lat;
      options.headers['zkt-lng'] = position.lng;
    }
    // eslint-disable-next-line no-empty
  } catch (e) {}
  return axios({
    timeout: options.timeout || 5 * 1000 * 10,
    method: options.method || 'GET',
    url: fetchUrl,
    headers: options.headers || {},
    responseType: 'json',
    data: options.body,
    withCredentials: options.withCredentials || false,
  })
    .then(function (res) {
      if (options.originalReturn) {
        return Promise.resolve(res);
      }
      const { data } = res;
      if (data && !data.success && data.msg === 'login') {
        if (adaptor.isMini() || adaptor.isAliMini()) {
          adaptor.login();
        } else {
          window.location.reload();
        }
        return Promise.reject('login');
      }
      if (data && !data.success && data.msg !== 'login') {
        const msg = data.msg || data.message || JSON.stringify(data);
        const error = errorInteraction.parseErrorObj(msg, data);
        throw error;
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
        const re = err.response.data;
        if (re && re.message) {
          const error = errorInteraction.parseErrorObj(re.message, re)
          throw error;
        }
      }
      const newErr = errorInteraction.parseInteraction(err, {
        userHttpUrl: url,
        dataHttpHeaders: options.headers || {},
        dataHttpUrl: url,
      });
      throw newErr;
    })
    .catch((err) => {
      if (typeof err === 'object' && err.message.indexOf('创建订单错误命中平台黑白名单') !== -1) {
        err.message = '您已被限制购买';
      }
      if (!options.silent) {
        if (err.message === 'Network Error') {
          // 当页面在跳转时中断了ajax请求时，不弹出错误提示,
          // 比如使用 location.href或 location.reload等刷新时，有网络在请求过程中，默认会弹出错误提示
          // 指定zkt.isRedirect，则不提示错误提示
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
};