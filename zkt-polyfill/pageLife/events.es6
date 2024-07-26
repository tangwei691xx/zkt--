/** @format */
const Cache = require('./cache.es6');
const PageLifeEvent = require('./lifeCycle.es6');

class PagesLifeEvents {
  constructor () {
    this.listeners = new Cache();
  }

  addPage (page) {
    if (!page) {
      throw Error('请输入页面路径');
    }
    const pageLifeEvent = new PageLifeEvent(page);
    this.listeners.add(page, pageLifeEvent);
  }

  removePage (page) {
    if (!page) {
      throw Error('请输入页面路径');
    }
    const pageLifeEvent = this.listeners.get('page');
    if (pageLifeEvent) {
      pageLifeEvent.clear();
      this.listeners.remove(page);
    }
  }

  getPage(page) {
    if (!page) {
      throw Error('请输入页面路径');
    }
    if (!this.hasPage(page)) {
      this.addPage(page);
    }
    return this.listeners.get(page);
  }

  hasPage (page) {
    if (!page) {
      throw Error('请输入页面路径');
    }
    return this.listeners.has(page);
  }

  clear () {
    this.listeners.clear();
  }
}

module.exports = new PagesLifeEvents();
