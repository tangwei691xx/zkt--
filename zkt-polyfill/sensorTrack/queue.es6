function Queue() {}

// 初始化
Queue.prototype.init = function (callback) {
  this.QueueList = [];
};

// 销毁队列
Queue.prototype.destroy = function () {
  this.QueueList = null;
};
// 清空队列
Queue.prototype.clear = function () {
  if (!this.isEmpty()) this.QueueList = [];
};
// 队列是否为空
Queue.prototype.isEmpty = function () {
  return this.QueueList.length === 0;
};
// 获取头部指向
Queue.prototype.getHead = function () {
  return this.QueueList && this.QueueList.length ? this.QueueList[0] : null;
};
// 获取尾部指向
Queue.prototype.getLast = function () {
  return this.QueueList && this.QueueList.length ? this.QueueList[this.QueueList.length - 1] : null;
};
// 入队
Queue.prototype.enQueue = function (obj) {
  return this.QueueList.push(obj);
};
// 出队
Queue.prototype.deQueue = function () {
  return this.QueueList.shift();
};
// 当前队列长度
Queue.prototype.getLength = function () {
  return (this.QueueList && this.QueueList.length) || 0;
};

module.exports = Queue;
