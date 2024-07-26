const adaptor = require('../adaptor.es6');
const storage = require('../storage.es6');
const uri = require('../uri/uri.es6');

const redisDB = {
    init(){
        // 如果是小程序的launch生命周期，需要清空当前用户小程序存储的数据
		const needCleanData = (adaptor.isMini() && uri.search('zkt_mini_lifecycle') === 'launch');
		if(needCleanData){
			storage.clearRedisData('session')
		}
    },
	async setLocalStorageData(key, data) {
		return storage.setRedisData(key, data, 'local') 
	},
	async getLocalStorageData(key) {
		return storage.getRedisData(key, 'local') 
	},
	async deleteLocalStorageData(key) {
		return storage.setRedisData(key, '', 'local') 
	},

	async setAppSessionData(key, data) {
		return storage.setRedisData(key, data, 'session') 
	},
	async getAppSessionData(key) {
		return storage.getRedisData(key, 'session') 
	},
	async deleteAppSessionData(key) {
		return storage.setRedisData(key, '', 'session') 
	},
};
module.exports = redisDB;