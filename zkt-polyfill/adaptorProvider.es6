const adaptor = {
	PLATFORM_WX: "wx",
	PLATFORM_WXA: "wxa",
	PLATFORM_H5: "h5",
	PLATFORM_APP: "app",
	/**
	 * @example dispatchZktFunction('FuncName', params?, options?, callback)
	 * @example dipatchZktFunction('FuncName', {test: 1}, {platform: 'wx'}, callback) 只在微信环境下调用
	 */
	registerAdaptorConfig() {},
	/**
	 * 返回当前容器环境
	 *
	 * @returns {object} {platform: string, sdkVersion: string}
	 */
	getAdaptorEnvironment() {
		return {
			platform: "xxxx",
			sdkVersion: "",
		};
	},
	/**
	 * @param name
	 * @param params
	 * @param options
	 * @param callback
	 */
	dispatchZktFunction(name, params, options, callback) {
		const env = adaptor.getAdaptorEnvironment();
	},
};

module.exports = adaptor;
