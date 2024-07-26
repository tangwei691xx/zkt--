/** @format */
const Cache = require('./cache.es6');
const constant = require('./constant.es6');

/**
 * @TODO 需要支持eventType的事件
 */
class DelayResult {
  constructor() {
    this.lists = new Cache();
  }

  has(url, { lifeName, namespace }) {
    const hasLifeCahce = this._hasLifeCache(url, lifeName);
    if (hasLifeCahce) {
      const eventNameCache = this._getLifeCache(url, lifeName);
      return eventNameCache.has(namespace || constant.EVENT_NAMESPACE_DEFALUT);
    }
    return false;
  }

  add(url, { lifeName, namespace, value }) {
    const hasLifeCahce = this._hasLifeCache(url, lifeName);
    if (!hasLifeCahce) {
      this._addLifeCache(url, lifeName);
    }
    const lifeCache = this._getLifeCache(url, lifeName);
    const _namespace = namespace || constant.EVENT_NAMESPACE_DEFALUT;
    lifeCache.add(_namespace, value);
  }

  remove(url, { lifeName, namespace }) {
    const hasEventNameCache = this._hasLifeCache(url, lifeName);
    if (hasEventNameCache) {
      const lifeCache = this._getLifeCache(url, lifeName);
      if (!namespace) {
        lifeCache.clear();
      } else {
        lifeCache.delete(namespace);
      }
    }
  }

  get (url, { lifeName, namespace }) {
    const hasCache = this.has(url, { lifeName, namespace });
    if (hasCache) {
      const eventNameCache = this._getLifeCache(url, lifeName);
      return eventNameCache.get(namespace || constant.EVENT_NAMESPACE_DEFALUT);
    }
    return undefined;
  }

  clear () {
    this.lists.clear();
  }

  _hasLifeCache (url, lifeName) {
    const hasPageCache = this.lists.has(url);
    if (!hasPageCache) {
      this.lists.add(url, new Cache());
    }
    const pageCache = this.lists.get(url);
    return pageCache.has(lifeName);
  }

  _addLifeCache (url, eventName) {
    const pageCache = this.lists.get(url);
    pageCache.add(eventName, new Cache());
  }

  _getLifeCache (url, lifeName) {
    const pageCache = this.lists.get(url);
    return pageCache.get(lifeName);
  }
}

module.exports = new DelayResult();
