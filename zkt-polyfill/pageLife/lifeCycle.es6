/** @format */
const Cache = require('./cache.es6');
const constant = require('./constant.es6');
const Queue = require('../queue/index.es6');

const pageLifes = constant.PAGE_LIFECYCLES;

/**
 *
 */
module.exports = class PageLifeEvent {
  constructor() {
    this.listeners = new Cache();
    this.initEvents();
  }

  /**
   *
   */
  initEvents() {
    for (const key in pageLifes) {
      const lifeKey = pageLifes[key];
      const listeners = new Cache();
      this.listeners.add(lifeKey, listeners);
    }
  }

  getLifeListener (lifeName) {
    if (!lifeName) {
      throw Error('请输入生命周期节点名称');
    }
    if (!pageLifes[lifeName]) {
      throw Error(`${lifeName}不支持`);
    }
    let lifeListeners = this.listeners.get(lifeName);
    if (!lifeListeners) {
      lifeListeners = new Cache();
      this.listeners.add(lifeName, lifeListeners);
    }
    return lifeListeners;
  }

  removeLife (lifeName, namespace, eventType) {
    const lifeListeners = this.getLifeListener(lifeName);
    if (!namespace) {
      lifeListeners.clear();
    } else {
      const hasNamespaceListeners = lifeListeners.has(namespace);
      if (hasNamespaceListeners) {
        const namespaceListeners = lifeListeners.get(namespace);
        if (!eventType) {
          namespaceListeners.clear();
        } else {
          const hasEventTypeListeners = namespaceListeners.has(eventType);
          if (hasEventTypeListeners) {
            namespaceListeners.delete(eventType);
          }
        }
      }
    }
  }

  hasLifeListener (lifeName, namespace, eventType) {
    const lifeListeners = this.getLifeListener(lifeName);
    if (!namespace) {
      return lifeListeners.size() > 0;
    }
    const hasNamespaceListeners = lifeListeners.has(namespace);
    if (hasNamespaceListeners) {
      const namespaceListeners = lifeListeners.get(namespace);
      if (eventType) {
        const hasEventTypeListeners = namespaceListeners.has(eventType);
        if (hasEventTypeListeners) {
          const eventTypeListeners = namespaceListeners.get(eventType);
          return !eventTypeListeners.isEmpty();
        }
      } else {
        return namespaceListeners.size() > 0;
      }
    }
    return false;
  }

  clear() {
    this.listeners.clear();
  }

  addLifeListener (lifeName, namespace, eventType, fn) {
    if (typeof fn === 'function') {
      const lifeListeners = this.getLifeListener(lifeName);
      const hasNamespaceListener = lifeListeners.has(namespace);
      if (!hasNamespaceListener) {
        // namespace空间
        const namespaceListeners = new Cache();
        lifeListeners.add(namespace, namespaceListeners);
      }
      const namespaceListeners = lifeListeners.get(namespace);
      if (!namespaceListeners.has(eventType)) {
        // evnetType队列
        const queue = new Queue();
        queue.init();
        namespaceListeners.add(eventType, queue);
      }
      const eventTypeListeners = namespaceListeners.get(eventType);
      eventTypeListeners.enQueue(fn);
    }
  }

  triggerLife ({ lifeName, namespace }, ...args) {
    const lifeListeners = this.getLifeListener(lifeName);
    const taskQueue = [];
    if (!namespace) {
      lifeListeners.forEach((namespaceListeners) => {
        const lists = namespaceListeners.getAll();
        lists.forEach(function (eventTypeListeners) {
          const eventTypeLists = eventTypeListeners.getAll();
          eventTypeLists.forEach(function (queue) {
            taskQueue.push(queue);
          });
        });
      });
    } else {
      const hasNamespaceListener = lifeListeners.has(namespace);
      if (hasNamespaceListener) {
        const namespaceListeners = lifeListeners.get(namespace);
        const eventTypeLists = namespaceListeners.getAll();
        eventTypeLists.forEach(function (queue) {
          taskQueue.push(queue);
        });
      }
    }
    if (taskQueue.length) {
      this._triggerLifeListeners(taskQueue, ...args);
    } else if (typeof process !== 'undefined' && process.env) {
      if (process.env.NODE_ENV === 'development') {
        throw Error(`${lifeName}下${namespace}不存在事件`);
      }
    }
  }

  _triggerLifeListeners (listeners, ...args) {
    listeners.forEach(function (queue) {
      if (queue instanceof Queue) {
        const list = queue.getList();
        list.forEach(function eachFn(item) {
          if (typeof item === 'function') {
            item(...args);
          }
        });
      }
    });
  }
}
