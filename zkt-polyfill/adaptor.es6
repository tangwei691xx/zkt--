/**
 * 不同容器的处理的适配器，
 * 用于H5在不同环境下访问的逻辑判断及处理
 * 如在内嵌在微信小程序、抖音小程序中等
 *
 * @format
 * @type {{serialize(*): string, randomString: (function(*, *): string), getContainer(): *, isMini(): boolean, containerMenu: {wx: string, douyin: string, wxa_home: string, browser: string, douyin_home: string}, isWx(): boolean, login(): void}}
 */

const wxworkAdaptor = require('./adaptor/wxwork.es6');
const uri = require('./uri/uri.es6');
const { getValueByKeyInGlobal } = require('./utils/index.es6');
const containerVersionReg = /(\d+)_(\d+)_(\d+)/;
const adaptor = {
	config: {
		// 一对多路由映射关系区分参数key数组及拼接符约定"-"
		onePageMapMoreParamKeys: ['order_type'],
		onePageMapMoreCombineSign: '-',
		// 小程序通信hash指令集
		hashApis: ['subscribeMessage', 'mobile'],
		// 需要验签的hash指令集
		hashApisNeedSign: ['mobile'],
		signSpliter: '__',
	},
	callbackFunc: null,
	containerVersion: "",
	jumpMiniSceneEnum: {
		PAGE_AUTO_JUMP: 'page_auto_jump',
		USER_ACTION_JUMP: 'user_action_jump'
	},

	/**
	 * hash模式通信初始化监听
	 */
	init() {
		adaptor.initContainerVersion();
		if (adaptor.isMini() || adaptor.isAliMini()) {
			window.addEventListener('hashchange', () => {
				console.log('h5 hash change');
				const currentHashApi = location.hash.substring(1).split('=')[0];
				if (this.config.hashApis.includes(currentHashApi) && typeof this.callbackFunc === 'function') {
					let result = location.hash.split(`${currentHashApi}=`)[1].split('&')[0];
					let sign = '';
					let mobileSign = "";
					if (this.config.hashApisNeedSign.includes(currentHashApi)) {
						sign = result.split(this.config.signSpliter)[1];
						result = result.split(this.config.signSpliter)[0];
						if (currentHashApi === 'mobile') {
							// 判断是否有第四个参数(mobileSign-手机号加密串, 用于传给后端校验手机号)
							const params = location.hash.split(`${currentHashApi}=`)[1].split('&')[0]
							if (params.split(this.config.signSpliter).length >= 4) {
								mobileSign = params.split(this.config.signSpliter)[3];
							}
						}
						this.callbackFunc(result, sign, mobileSign);
					} else {
						this.callbackFunc(result);
					}
					this.callbackFunc = null;
					window.history.go(-1);
					if (currentHashApi === 'mobile') {
						z.cookie.set('adaptor_mobile', result, 1);
						sign && z.cookie.set('adaptor_mobile_sign', sign, 1);
						mobileSign && z.cookie.set('adaptor_verify_mobile_sign', mobileSign, 1);
					}
				}
			});
		}
	},

	/**
	 * 获取当前小程序容器的生命周期,默认为show 非微信小程序展示为空
	 * @returns show | launch | '
	 */
	getMiniLifeCycle() {
		if(!adaptor.isMini()) return '';
		return uri.search('zkt_mini_lifecycle') || 'show';
	},
	/**
	 * 是否为小程序的launch 的生命周期 非小程序返回false;
	 * @returns Boolean
	 */
	isMiniOnLaunch(){
		return adaptor.isMini() &&  uri.search('zkt_mini_lifecycle') === 'launch';
	},
	initContainerVersion() {
		let version = "2.0.10";
		try {
			let versionFromQuery = zkt.zktRouteInfo ? zkt.zktRouteInfo.query.zkt_mini_version : z.uri.search('zkt_mini_version')
			if (versionFromQuery) {
				const versionArr = versionFromQuery.match(containerVersionReg);
				if (versionArr) {
					versionFromQuery = versionArr[1] + '.' + versionArr[2] + '.' + versionArr[3];
				}
			}
			const versionFromSession = sessionStorage.getItem("zkt_mini_version");
			version = versionFromQuery || versionFromSession || version;
		} catch (e) {
			console.error(e);
		}
		sessionStorage.setItem("zkt_mini_version", version);
		adaptor.containerVersion = version;
	},
	getContainerVersion () {
		return adaptor.containerVersion || sessionStorage.getItem("zkt_mini_version");
	},
	/**
	 * 根据容器来判断是否屏蔽功能
	 * @param platform
	 * @returns {string|boolean}
	 */
	isDisableByPlatform(componentName, platform = ['h5']) {
		let env = window.GLOBAL_ENV || '';

		if (env.disableFeatureConfig === 'all') {
			return true;
		}
		let res = false;
		try {
			res = env.disableFeatureConfig && env.disableFeatureConfig.includes(componentName);
		} catch (e) {}
		return res;
	},
	// 小程序视频号
	isMiniVideo() {
		let container = uri.search('platform')
		return container === 'wxa_home' && zkt._GET('source') === 'wx_video';
	},
	// 小程序kol场景（腾讯云选）
	isMiniKol() {
		let container = uri.search('platform')
		return container === 'wxa_home' && !!zkt._GET('wxKolId');
	},
	/**
	 * 对象序列化
	 */
	serialize(data) {
		var s = '';
		for (var p in data) s += '&' + p + '=' + encodeURIComponent(data[p]);
		s = s.length > 0 ? s.substring(1) : s;
		return s;
	},

	/**
	 * 生成随机字符串
	 */
	randomString: (function () {
		var i = 0,
			tailLength = 2;
		var alphabet = '0123456789abcdefghijklmnopqrstuvwxyz';

		var getTail = function () {
			var s = (i++).toString(36);
			if (i > Math.pow(16, tailLength)) i = 0;

			return s.substring(s.length - tailLength);
		};

		return function (prefix, len) {
			if (arguments.length < 2) len = 10;
			if (arguments.length < 1) prefix = '';

			var minLen = tailLength + 1;
			if (len < minLen) throw new Error('Length should not be little than ' + minLen);
			len -= tailLength;

			var str = '';
			while (len-- > 0) {
				var index = Math.floor(Math.random() * alphabet.length);
				str += alphabet.charAt(index);
			}

			return prefix + str + getTail();
		};
	})(),

	/**
	 * 判断容器是否为微信公众号
	 * @param ctx
	 * @returns {boolean}
	 */
	isWx() {
		return adaptor.getContainer() === 'wx';
	},
	/**
	 * 通过参数判断容器是否为小程序容器  或者通过UA判断
	 * @param ctx
	 * @returns {boolean}
	 */
	isMini() {
		const ua =  navigator.userAgent;
		const container = uri.search('platform')
		return (container === 'wxa_home' && adaptor.containerMenu[container] === 'mini') || (ua.toLowerCase().indexOf('micromessenger') > -1 && ua.toLowerCase().indexOf('miniprogram') > -1);
	},
	isPureMini() {
		return adaptor.isMini() && getValueByKeyInGlobal('isPureNativeMini', '0') === '1'
	},
	isTaroMini() {
		return adaptor.isMini() && getValueByKeyInGlobal('isTaroNativeMini', '0') === '1'
	},
	/**
	 * 通过参数判断容器 或者 通过UA判断是否支付宝小程序
	 * @returns {boolean} 是否支付宝小程序
	 */
	isAliMini() {
		const ua =  navigator.userAgent;
		const container = uri.search('platform')
		return (container === 'ali_home' && adaptor.containerMenu[container] === 'mini') || ua.indexOf('AlipayClient') > -1;
	},
	getAliMiniStorage(key){
		return new Promise((resolve)=>{
			if(!adaptor.isAliMini() || !window.my){
				resolve('')
			}
			my.getStorage({
				key,
				success:(res)=>{
					resolve(res.data)
				},
				fail:(res)=>{
					resolve('')
				},
			});
		})

	},
	/**
	 * 通过 UA 判断容器是否为小程序容器
	 * @param ctx
	 * @returns {boolean}
	 */
	isMiniProgram() {
		return new Promise((resolve, reject) => {
			if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') === -1) {
				resolve(false);
			}
			if (window.wx && window.wx.miniProgram) {
				window.wx.miniProgram.getEnv((res) => {
					if (!res.miniprogram) {
						resolve(false);
					} else {
						resolve(true);
					}
				});
			} else {
				//没有集成jssdk就会走这里
				resolve(false);
			}
		});
	},
	/**
	 * 获取容器对应地址
	 * @param url
	 * @returns {string}
	 */
	getContainerLocation(url = location.href) {
		if (adaptor.isMini()) {
			if (url.includes('http://')) {
				url = url.replace('http://', 'https://');
			}
			return `/pages/webview/container/container?url=${encodeURIComponent(url)}`;
		}
		return url;
	},
	//容器类型
	containerMenu: {
		//微信小程序
		wxa_home: 'mini',
		// 支付宝小程序
		ali_home: 'mini',
		//抖音小程序
		douyin_home: 'mini',
		//微信公众号
		wx: 'wx',
		//抖音H5
		douyin: 'h5',
		//浏览器
		browser: 'h5',
	},
	/**
	 * 获取当前运行容器，如获取不到，则返回空字符串
	 * @param ctx
	 * @returns {any}
	 */
	getContainer() {
		let container = zkt._GET('platform') || '';
		z.bridge.isWx() && (container = 'wx');
		adaptor.isMini() && (container = 'wxa_home');
		adaptor.isAliMini() && (container = 'ali_home');
		return Object.keys(adaptor.containerMenu).includes(container) ? container : '';
	},
	// 是否是小程序环境，包含：微信小程序、支付宝小程序、抖音小程序
	isMiniContainer() {
		return adaptor.containerMenu[adaptor.getContainer()] === 'mini';
	},
	// login(options = false) {
	// 	let callbackUrl = zkt._GET('mini_callback_url');
	// 	let params = {
	// 		callbackUrl,
	// 	};
	// 	adaptor.callMini('login', params, options);
	// },
	login() {
		let callbackUrl = zkt._GET('mini_callback_url');
		let params = {
			callbackUrl,
		};
		adaptor.callMini('login', params, false);
	},
	/**
	 * 获取当前登录用户链接鉴权参数信息
	 * @param options	{ callbackUrl: string } 回调地址
	 * @returns 
	 */
	getLoginedUrlParams({ callbackUrl = '' }) {
		let params = {
			callbackUrl,
		};
		adaptor.callMini('getLoginedUrlParams', params, false);
	},
	/**
	 * 授权获取openId
	 * @param callbackUrl 回跳H5地址
	 */
	authorize(callbackUrl) {
		const params = {
			callbackUrl,
		};
		adaptor.callMini('authorize', params, false);
	},
	/**
	 * 支付
	 * @param {string} callbackUrl 支付成功后回跳的下单结果页地址
	 * @param platformOrderId 平台单号
	 * @param orderId 业务成单ID （如不传，后台需多反查一次）
	 * @param price 支付总金额（如不传，插件支付不展示支付金额）
	 * @param orderName 订单名称 （如不传，统一设置默认订单名称）
	 */
	pay({ callbackUrl, platformOrderId, paymentOrderId, orderId, price, orderName }) {
		// let callbackUrl = zkt._GET('mini_callback_url');
		let params = {
			callbackUrl, // 支付成功后回跳的下单结果页地址
			platformOrderId, // 平台单号
			paymentOrderId, // 支付单号
			orderId, // 业务成单ID （如不传，后台需多反查一次）
			price, // 支付总金额（如不传，插件支付不展示支付金额）
			orderName, // 订单名称 （如不传，统一设置默认订单名称）
		};
		adaptor.callMini('pay', params);
	},
	callMini(api, params, needBack = true) {
		let currentReq = adaptor.randomString('H5Req_');
		let { callbackUrl = '' } = params;
		let options = {
			url:
				'/pages/webview/bridge/bridge?' +
				adaptor.serialize({
					cmd: JSON.stringify({
						requestId: callbackUrl ? '' : currentReq,
						api: api,
						params,
					}),
				}),
		};
		// 是否需要返回
		let _needBack = needBack;
		// 发起的场景值
		let _scene = "";
		if (Object.prototype.toString.call(needBack) === '[object Object]') {
			_needBack = needBack.needBack;
			_scene = needBack.scene;
		}
		if (adaptor.isMini()) {
			_needBack && wx.miniProgram.navigateTo(options);
			!_needBack && wx.miniProgram.redirectTo(options);
			if (_scene === z.adaptor.jumpMiniSceneEnum.PAGE_AUTO_JUMP) {
				if (window.history.length > 1) {
					setTimeout(() => {
						history.go(-1);
					}, 2000)
				}
			}
		} else if (adaptor.isAliMini()) {
			_needBack && my.navigateTo(options);
			!_needBack && my.redirectTo(options);
		}
	},
	/**
	 * 分享给好友
	 * @param title 分享标题
	 * @param imageUrl 分享图片地址
	 * @param url 分享页面的路径和参数
	 */
	shareToFriend({ title, imageUrl, url }) {
		// 为统计数据准确性 在分享的时候 移除掉launchTime和webviewTime
		// 后面如果不需要可以删除
		// url = z.removeQuery('launchTime', url);
		// url = z.removeQuery('webviewTime', url);
		const path = `/pages/webview/container/container?url=${encodeURIComponent(url)}`;
		const shareOptions = {
			title,
			imageUrl,
			path,
		};
		console.log('分享好友发送给小程序消息----', shareOptions);
		adaptor.postMessageToMini(shareOptions);
	},
	/**
	 * @param type  string | array 业务线类型，预售：ticket，门票：pass | [小程序消息模板ID]
	 * @param callback 订阅消息后的回调,hash模式跳转有问题，暂不支持
	 */
	subscribeMessage(type, callback) {
		if (callback) this.callbackFunc = callback;
		this.callMini('subscribeMessage', { type, callbackUrl: location.href });
	},
	getMiniAppid(params) {
		adaptor.callMini('getMiniAppid', params);
	},

	getMiniInfo(params) {
		adaptor.callMini('getMiniInfo', params);
	},
	/**
	 * 授权获取手机号，hash模式通信
	 * @param callback
	 */
	mobile(callback, extraParam) {
		if (callback) this.callbackFunc = callback;
		const adaptor_mobile = z.cookie.get('adaptor_mobile');
		const isRegisterMember = extraParam && extraParam.type === 'register_member';// 一键授权注册直连的场景需要再次调用
		if (adaptor_mobile && this.callbackFunc && !isRegisterMember) {
			const adaptor_mobile_sign = z.cookie.get('adaptor_mobile_sign');
			const adaptor_verify_mobile_sign = z.cookie.get('adaptor_verify_mobile_sign');
			this.callbackFunc(adaptor_mobile, adaptor_mobile_sign, adaptor_verify_mobile_sign);
			this.callbackFunc = null;
		} else {
			this.callMini('mobile', { callbackUrl: location.href, ...extraParam });
		}
	},
	/**
	 * 一键绑定手机号，区别于mobile方法, 此方法是会触发会员手机号绑定，并跳转至指定回跳地址
	 * @param callbackUrl 回跳地址
	 */
	bindMobile(callbackUrl) {
		this.callMini('bindMobile', { callbackUrl: callbackUrl || location.href });
	},
	/**
	 * 发送给小程序消息方法
	 * @param params 消息体对象
	 */
	postMessageToMini(params) {
		if (adaptor.isMini()) {
			wx.miniProgram.postMessage({ data: params });
		} else if (adaptor.isAliMini()) {
			my.postMessage({ data: params });
		}
	},
	/**
	 * 非生产环境，点击debug提示，跳转小程序测试工具页面
	 */
	debug() {
		if (adaptor.isMini()) {
			wx.miniProgram.navigateTo({ url: '/pages/webview/test/test' });
		} else if (adaptor.isAliMini()) {
			my.navigateTo({ url: '/pages/webview/test/test' });
		}
	},
	checkIsValidRule (version1, version2) {
		const arr1 = version1.split('.')
		const arr2 = version2.split('.')
		const length1 = arr1.length
		const length2 = arr2.length
		const minlength = Math.min(length1, length2)
		let i = 0
		for (i ; i < minlength; i++) {
			let a = parseInt(arr1[i])
			let b = parseInt(arr2[i])
			if (a > b) {
				return 1
			} else if (a < b) {
				return -1
			}
		}
		if (length1 > length2) {
			for(let j = i; j < length1; j++) {
				if (parseInt(arr1[j]) != 0) {
					return 1
				}
			}
			return 0
		} else if (length1 < length2) {
			for(let j = i; j < length2; j++) {
				if (parseInt(arr2[j]) != 0) {
					return -1
				}
			}
			return 0
		}
		return 0
	},
	getUrlMiniRouterConfig (url, extras, removeQuery = []) {
		if (adaptor.isPureMini()) {
			let miniRouterConfig = window.GLOBAL_ENV && window.GLOBAL_ENV.miniRouterConfig;
			//没有获取到路由配置，则不跳转到小程序
			if (!miniRouterConfig) {
				return false;
			}
			//let result = miniRouterConfig;
			let newResult = {};
			const containerVersion = adaptor.getContainerVersion() || "2.0.10";
			for (let i in miniRouterConfig) {
				const configItem = miniRouterConfig[i];
				configItem.version = configItem["version"] || "2.0.10"
				if (adaptor.checkIsValidRule(containerVersion, configItem.version) >= 0) {
					newResult[i] = configItem;
				}
			}
			window.GLOBAL_ENV.miniRouterConfig = newResult;
			let currentUrlRouter = adaptor.getMiniRouterConfig(newResult, url);
			//如何没有匹配的小程序路由，表示不跳转到小程序
			if (!currentUrlRouter) {
				return false;
			}
			let miniPath = currentUrlRouter.targetUrl,
				params = currentUrlRouter.paramMapping;
			if (miniPath) {
				let miniParams = {};
				if (params) {
					params.forEach((item) => {
						let h5Key = item['keyParam'];
						if (h5Key && !removeQuery.includes(h5Key)) {
							let miniKey = item['targetKeyParam'];
							console.log(' uri.search(h5Key, url):', uri.search(h5Key, url));
							let vals = [extras[h5Key], uri.search(h5Key, url), uri.search(h5Key), item.defaultValue];
							let val = z.getIsNotEmptyData(vals);
							if (val !== undefined && val !== null) {
								miniParams[miniKey] = val;
							} else {
								console.error(`参数：${h5Key}，不存在值`);
							}
						}
					});
				}
				if (miniParams["extMemberId"] && !miniParams["extPost"]) {
					miniParams["extPost"] = 1;
					miniParams["is_origin"] = 2;
				}
				if (miniParams["pack"] * 1 > 0) {
					miniParams["pack"] = 1;
				}
				return `${miniPath}?` + adaptor.serialize(miniParams);
			}
			return false;
		}
		return false;
	},
	miniReplace (url, extras = {}) {
		const miniPath = adaptor.getUrlMiniRouterConfig(url, extras);
		if (miniPath) {
			wx.miniProgram.redirectTo({
				url: miniPath,
			});
			return true;
		}
		return false;
	},
	miniRedirect(url, extras = {}, removeQuery) {
		const miniPath = adaptor.getUrlMiniRouterConfig(url, extras, removeQuery);
		if (miniPath) {
			wx.miniProgram.navigateTo({
				url: miniPath,
			});
			return true;
		}
		return false;
	},
	/**
	 * 根据平台判断是否拦截跳转
	 * true 拦截;
	 * false 放行;
	 * @param url
	 * @returns Boolean
	 */
	_isMiniMidJumDisableByPlatform(){
		const supportPlatform = ['wxa_home', 'ali_home'];
		return !supportPlatform.includes(adaptor.getContainer());
	},
	/**
	 * 根据链接判断是否拦截跳转
	 * true 拦截;
	 * false 放行;
	 * @param url
	 * @returns Boolean
	 */
	_isMiniMidJumDisableByUrl(url){
		// 暂时不支持短链跳转  等支持了之后 可移除此判断
		if(url.indexOf('jdzd') > -1) {
			z.Toast('小程序暂不支持短链跳转');
			return true;
		}
		// 短信卖货的场景可能存在问题,暂时不处理该场景 , 即不替换url
		if(url.indexOf('redirectWeb') > -1) return true;
		// 暂时只处理 /MidJump/r 开头的链接
		if( url.indexOf('MidJump/r') < 0) return true;
		return false;
	},
	/**
	 * return true 拦截 dealMidJumpForMini 后面的逻辑
	 * return false 放行 继续 dealMidJumpForMini 后面的逻辑
	 */
	dealMidJumpForMini(url, extras = {}, removeQuery ={}) {
		// 根据平台判断是否拦截跳转
		if(adaptor._isMiniMidJumDisableByPlatform(url)) return false;
		// 根据链接判断是否拦截跳转
		if(adaptor._isMiniMidJumDisableByUrl(url)) return false;

		let tempUrl = decodeURIComponent(uri.search('url', url) || '');
		if( tempUrl ) {
			// tempUrl 不应该包含域名  要强制移除, 这样在小程序中就不会丢失登录态
			if(tempUrl.startsWith('http')){
				tempUrl = tempUrl.replace(/^http[s]?:\/\/[^/]+/, "");
			}
			let targetUrl = location.origin + tempUrl;
			// 增加平台参数 存在就会覆盖
			targetUrl = z.addQuery('platform', adaptor.getContainer(), targetUrl);
			// 删除 auth_type
			targetUrl = z.removeQuery('auth_type', targetUrl);

			// 替换appid
			targetUrl = z.addQuery('appid', uri.search('appid') , targetUrl);
			targetUrl = z._addParams(targetUrl, extras, removeQuery);


			// 如果当前是访客模式进入页面
			if (z._GET('silentAuth') === '1' && z.adaptor.isMini()) {
				targetUrl = z.removeQuery('silentAuth', targetUrl);
				z.adaptor.callMini('redirect', {
					path: `/pages/webview/container/container?url=${encodeURIComponent(targetUrl)}`,
					appId: '',
					currentIsSilentAuthPath: true,
				})

				return true;
			}


			location.href = targetUrl
			return true;
		}
		return false
	},

	/**
	 * 兼容一对多路由关系的临时方案，例如订单详情页存在h5地址对应多个小程序路由的情况，会先取原H5地址+拼接符+全局配置的类型参数key对应的路由映射配置，没有再取原H5地址对应的映射配置
	 * 示例：'/NewHome/Orders/detail?order_type=order' 会先取 '/NewHome/Orders/detail-order'对应的配置，没有再取'/NewHome/Orders/detail'对应的配置
	 * @param miniRouterConfig 全局路由映射关系配置
	 * @param url 当前要跳转的H5链接
	 */
	getMiniRouterConfig(miniRouterConfig, url) {
		if (!miniRouterConfig || !url) return false;
		const purePath = z.uri.path(url);
		const { onePageMapMoreCombineSign, onePageMapMoreParamKeys } = this.config;
		try {
			let res = false;
			onePageMapMoreParamKeys.some((typeKey) => {
				const typeKeyValue = url.split(`${typeKey}=`)[1] && url.split(`${typeKey}=`)[1].split('&')[0];
				if (typeKeyValue) {
					const combinePath = purePath + onePageMapMoreCombineSign + typeKeyValue;
					return miniRouterConfig[combinePath] && (res = miniRouterConfig[combinePath]);
				}
			});
			if (!res && miniRouterConfig[purePath]) res = miniRouterConfig[purePath];
			return res;
		} catch (e) {
			return miniRouterConfig[purePath] ? miniRouterConfig[purePath] : false;
		}
	},
	// 企业微信
	...wxworkAdaptor,
};

function miniRoute (url, extras = {}) {
	if (adaptor.isMini() || adaptor.isAliMini()) {
		let miniRouterConfig = window.GLOBAL_ENV && window.GLOBAL_ENV.miniRouterConfig;
		//没有获取到路由配置，则不跳转到小程序
		if (!miniRouterConfig) {
			return false;
		}
		let currentUrlRouter = adaptor.getMiniRouterConfig(miniRouterConfig, url);
		//如何没有匹配的小程序路由，表示不跳转到小程序
		if (!currentUrlRouter) {
			return false;
		}
		let miniPath = currentUrlRouter.targetUrl,
			params = currentUrlRouter.paramMapping;
		if (miniPath) {
			let miniParams = {};
			if (params) {
				params.forEach((item) => {
					let h5Key = item['keyParam'];
					if (h5Key) {
						let miniKey = item['targetKeyParam'];
						let urlParams = url.split('?').length > 1 ? url.split('?')[1] : '';
						console.log(' uri.search(h5Key, urlParams):', uri.search(h5Key, urlParams));
						let vals = [extras[h5Key], uri.search(h5Key, urlParams), uri.search(h5Key), item.defaultValue];
						let val = z.getIsNotEmptyData(vals);
						if (val !== undefined && val !== null) {
							miniParams[miniKey] = val;
						} else {
							console.error(`参数：${h5Key}，不存在值`);
						}
					}
				});
			}
			let miniUrl = `${miniPath}?` + adaptor.serialize(miniParams);
			wx.miniProgram.navigateTo({
				url: miniUrl,
			});
			return true;
		}
		return false;
	}
	return false;
}

module.exports = adaptor;
