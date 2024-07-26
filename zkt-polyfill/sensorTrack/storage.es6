function deepClone(obj) {
  // 判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
  const objClone = Array.isArray(obj) ? [] : {};
  // 进行深拷贝的不能为空，并且是对象或者是
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
				if (obj[key] && typeof obj[key] === 'object') {
          objClone[key] = deepClone(obj[key]);
        } else {
          objClone[key] = obj[key];
        }
      }
    }
  }
  return objClone;
}

function Storage() {}
Storage.getInstence = (function () {
  var _instence = null;
  return function () {
    if (!_instence) {
      _instence = new Storage();
    }
    return _instence;
  };
})();

// deep ： 开启深拷贝
Storage.prototype.setItem = function (key, value, deep) {
  if (deep) this[key] = deepClone(value);
  else this[key] = value;
};
Storage.prototype.getItem = function (key) {
  return this[key];
};
Storage.prototype.delItem = function (key) {
  return delete this[key];
};
Storage.prototype.clear = function () {
  (Object.keys(this) || []).map((key) => {
    delete this[key];
  });
};

module.exports = Storage;
