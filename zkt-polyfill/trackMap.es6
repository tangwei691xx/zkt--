module.exports = {

	init() {
		if (GLOBAL_ENV && GLOBAL_ENV.trackMap) {
			this.trackMap = GLOBAL_ENV.trackMap;
		}
	},
	/**
	 * 获取埋点配置
	 * @param key
	 * @param subKey
	 * @param type
	 * @returns {GLOBAL_ENV.trackMap|*|number}
	 */
	get(key, subKey='qrId', type = 'ls') {
		console.log('-----11', this.trackMap[type])
		let data = 0;
		if (this.trackMap && this.trackMap[type]) {
			if (key) {
				data = this.trackMap[type][key] || 0;
				if (data && subKey) {
					return data[subKey]
				}
			} else {
				return this.trackMap[type]
			}
		}
		// let data = this.trackMap && this.trackMap[type] && this.trackMap[type][key] || 0;
		// if (data && subKey) {

		// 	return data[subKey]
		// }
		return data;
	},
	/**
	 * 更新埋点配置
	 * @param data 
	 */
	update (data = {}, type='ls') {
		if (!this.trackMap) {
			this.trackMap = {[type]: data};
		} else {
			this.trackMap[type] = Object.assign(this.trackMap[type], data)
		}
	}
}

