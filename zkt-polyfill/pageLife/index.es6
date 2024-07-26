/** @format */

const pagesLifeEvents = require('./events.es6');
const constant = require('./constant.es6');
const delayResult = require('./delayResult.es6');

const {
  PAGE_LIFECYCLES,
  EVENT_IDENTIFIER_ENUM,
  EVENT_NAMESPACE_SPLIT_SYMBOL,
  EVENT_TYPE_SPLIT_SYMBOL,
  EVENT_IDENTIFIER_SYMBOL,
  EVENT_NAMESPACE_DEFALUT,
  EVENT_TYPE_DEFAULT,
  EVENT_IDENTIFIER_DEFAULT,
  PAGE_SHOW_CACHE_NAMESPACE,
} = constant;
/**
 * @example
 * z.pageLife.init();
 * z.pageLife.addEventListener('')
 */

const eventESReg = new RegExp(
  `(.+)\\${EVENT_NAMESPACE_SPLIT_SYMBOL}(.+)\\${EVENT_TYPE_SPLIT_SYMBOL}(.+)\\${EVENT_IDENTIFIER_SYMBOL}(.+)`,
);
const pageLife = {
  delayMaps: delayResult,

  /**
   *
   */
  addEventListener(eventName, fn) {
    const { lifeName, eventType, namespace, eventSymbol } = pageLife.getESByEventName(eventName);
    if (lifeName) {
      const page = pageLife.getCurrentPage();
      const autoTriggerResult = pageLife.delayMaps.get(page, { lifeName, namespace });
      let shouldAutoTriggerEvent = true;
      const pageEvent = pagesLifeEvents.getPage(page);
      const hasEventNamespaceListeners = pageEvent.hasLifeListener(lifeName, namespace, eventType);
      if (eventSymbol === EVENT_IDENTIFIER_ENUM.once) {
        if (!hasEventNamespaceListeners) {
          pageEvent.addLifeListener(lifeName, namespace, eventType, fn);
        } else {
          shouldAutoTriggerEvent = false;
          console.info(`${eventType}中事件空间${namespace}已经有监听事件，无法重复添加`);
        }
      } else {
        if (eventSymbol === EVENT_IDENTIFIER_ENUM.replace) {
          if (hasEventNamespaceListeners) {
            console.info(`${eventType}中事件空间${namespace}已经存在监听事件，即将替换掉`);
            pageEvent.removeLife(lifeName, namespace, eventType);
          }
        }
        pageEvent.addLifeListener(lifeName, namespace, eventType, fn);
      }
      if (autoTriggerResult !== undefined && shouldAutoTriggerEvent) {
        if (typeof fn === 'function') {
          fn(...autoTriggerResult);
        }
      }
    }
  },

  removeEventListener (eventName) {
    const { lifeName, namespace, eventType } = pageLife.getESByEventName(eventName);
    if (lifeName) {
      const page = pageLife.getCurrentPage();
      const hasPageEvent = pagesLifeEvents.hasPage(page);
      if (hasPageEvent) {
        const pageEvent = pagesLifeEvents.getPage(page);
        pageEvent.removeLife(lifeName, namespace, eventType);
      }
    }
  },

  trigger({ lifeName, namespace = EVENT_NAMESPACE_DEFALUT }, ...args) {
    if (lifeName) {
      const page = pageLife.getCurrentPage();
      const hasPageEvent = pagesLifeEvents.hasPage(page);
      if (hasPageEvent) {
        const pageEvent = pagesLifeEvents.getPage(page);
        pageEvent.triggerLife({ lifeName, namespace }, ...args);
      }
    }
  },

  triggerDelay({ lifeName, namespace = EVENT_NAMESPACE_DEFALUT }, ...args) {
    if (lifeName) {
      const page = pageLife.getCurrentPage();
      pageLife.delayMaps.add(page, { lifeName, namespace });
      pageLife.trigger({ lifeName, namespace }, ...args);
    }
  },

  clear () {
    const page = pageLife.getCurrentPage();
    const hasPageEvent = pagesLifeEvents.hasPage(page);
    if (hasPageEvent) {
      pagesLifeEvents.removePage(page);
    }
  },

  EVENT_ENUM: PAGE_LIFECYCLES,
  PAGE_SHOW_CACHE_NAMESPACE,
  EVENT_NAMESPACE_DEFALUT,
  EVENT_IDENTIFIER_ENUM,
  // pageshow:namespace/type.id
  getEventName(
    lifeName,
    namespace = EVENT_NAMESPACE_DEFALUT,
    eventType = EVENT_TYPE_DEFAULT,
    eventSymbol = EVENT_IDENTIFIER_DEFAULT,
  ) {
    if (lifeName && PAGE_LIFECYCLES[lifeName]) {
      let str = `${lifeName}${EVENT_NAMESPACE_SPLIT_SYMBOL}${namespace}${EVENT_TYPE_SPLIT_SYMBOL}${eventType}`;
      if (eventSymbol && EVENT_IDENTIFIER_ENUM[eventSymbol]) {
        str = `${str}${EVENT_IDENTIFIER_SYMBOL}${eventSymbol}`;
      }
      return str;
    }
    return '';
  },

  getPageShowEventName (
    namespace = EVENT_NAMESPACE_DEFALUT,
    eventType = EVENT_TYPE_DEFAULT,
    eventSymbol = EVENT_IDENTIFIER_DEFAULT,
  ) {
    return pageLife.getEventName(PAGE_LIFECYCLES.pageShow, namespace, eventType, eventSymbol);
  },

  getCurrentPage () {
    return location.href;
  },

  // pageshow:namespace/type.id
  getESByEventName (eventName) {
    if (eventName) {
      const [_all, lifeName, namespace = '', eventType = '', eventSymbol = ''] = eventESReg.exec(eventName);
      return {
        lifeName,
        namespace,
        eventType,
        eventSymbol,
      };
    }
    return {
      lifeName: '',
      namespace: '',
      eventType: '',
      eventSymbol: '',
    };
  },

  listenWxaPageShowFromCache(fn, eventType, eventSymbol) {
    if (z.adaptor.isMini()) {
      this.listenPageShowFromCache(fn, eventType, eventSymbol);
    }
  },

  listenPageShowFromCache(fn, eventType, eventSymbol) {
    const eventName = pageLife.getPageShowEventName(PAGE_SHOW_CACHE_NAMESPACE, eventType, eventSymbol);
    pageLife.addEventListener(eventName, fn);
  },
  _pageLife: pagesLifeEvents,
};

module.exports = pageLife;
