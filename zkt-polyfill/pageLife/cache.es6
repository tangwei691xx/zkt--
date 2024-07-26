/** @format */

/**
 *
 */
module.exports = class Cache {
  constructor () {
    this.lists = new Map();
  }

  add (key, initValue = {}) {
    if (!key) {
      throw Error('请输入key');
    }
    this.lists.set(key, initValue);
  }

  remove (key) {
    if (!key) {
      throw Error('请输入key');
    }
    this.lists.delete(key);
  }

  clear () {
    this.lists.clear();
  }

  get (key) {
    return this.lists.get(key);
  }

  has (key) {
    return this.lists.has(key);
  }

  size () {
    return this.lists.size;
  }

  getAll() {
    return this.lists;
  }
}
