
const prefix = 'zkt'
const fetch = require('./request/fetch.es6');
module.exports = {
  // 支持存内存里的数据
  memoryStore:{

  },
  storeKey:null,
  init(){
  },
	// redis存储用户数据
	async setRedisData(key ,data, dataType = 'session'){
		if(typeof data !== 'string') throw new Error('value must be string');
		if(typeof key !== 'string') throw new Error('key must be string');
    if(!key) throw new Error('key is required');
    return fetch.fetchCommon('setStorageByServer', {key, data, dataType});
	},
  // 取数据 key为空时取所有数据
	async getRedisData(key, dataType = 'session'){
    return fetch.fetchCommon('getStorageByServer', {key, dataType});
	},
  // 清空当前用户的redis数据
	async clearRedisData(dataType = 'session'){
    return fetch.fetchCommon('setStorageByServer', {
      clearAll: true,
      dataType,
		});
	},


  // 存储
  setItem(key, data, expires = null) {
    if(!key){
      throw Error('no key')
    }
    if(!data){
      localStorage.removeItem(`${prefix}_${key}`);
      return true;
    }
    let initObj = {
        key,  // 存储的key
        value: data,  // 存储的值
        expires,  // 过期时间 单位：秒
        start: new Date().getTime() // 记录什么时候存储的
    }
    // console.log('设置数据',initObj);
    // 合并、并处理参数
    localStorage.setItem(`${prefix}_${key}`, JSON.stringify(initObj));
    return true;
  },
  // 取值
  getItem(key) {
      let data = localStorage.getItem(`${prefix}_${key}`);
      // console.log('读取数据',data);
      let options = {};
      if(data){
        try { options =  JSON.parse(data); } catch (error) {
          console.warn('local data is illegal');
          options = {}
        }
      }
      // 设置了过期时间
      if ( options.expires && options.expires > 0 ) {
          const date = new Date().getTime();
          // 判断是否超时
          if ( date - options.start > options.expires * 1000 ) {
             //  缓存过期，清除缓存，返回null
              localStorage.removeItem(`${prefix}_${key}`);
              return null;
          } else {
            // 存储还没到时间
              return options.value;
          }
      } else {
        // 如果没有设置失效时间，直接返回值
          return options.value || '';
      }
  },
  // 对外暴露移出缓存方法
  removeItem(key){
      localStorage.removeItem(`${prefix}_${key}`);
  }
}