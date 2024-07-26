/**
 * 统计模块
 */

// 驼峰转下划线
const toLine = (s) => {
	return s.replace(/([A-Z])/g, "_$1").toLowerCase();
};

/**
 * 驼峰转下滑下划线
 * @param {Object} o 对象
 * @return {Object} n 返回一个新对象
 */
const keyHumpToLine = (o) => {
	let n = {};
	for (const k in o) {
		if (o.hasOwnProperty(k)) {
			n[toLine(k)] = o[k];
		}
	}
	return n;
};
module.exports = {
	init(options) {
		
		this.pvMap = options.pvMap;
		let opts = Object.assign({}, options || {});
		delete opts.pvMap;
		//是否需要登录，部分接口无需登录即可访问，此时可能无法统计到auth相关信息,即需要对此参数设置为false，即可不通过登录验证
		//此处为全局设置，也可在接口调用时单独设置
		opts.need_login = opts.need_login || true;
		this.initOpts = this.getLogData(opts);
		this.initOpts.fetchUrl = GLOBAL_ENV.LOG_HOST || '';
		let appid = zkt._GET('appid'), session_id_key = appid + 'session_id' + z.cookie.get('member_id');
		let session_id = sessionStorage.getItem(session_id_key);
		if (!session_id) {
			session_id = 'H' + z.cookie.get('member_id') + '-' + (Math.ceil(Date.now() / 1000) + '' + Math.floor(1000 + Math.random() * 9000))
			sessionStorage.setItem(session_id_key, session_id);
		}
		this.initOpts.session_id = session_id;
	},
	async getWxShareData() {
		if (zkt.wxShareData) {
			this.getLocationPosition((lat, lng) => {
				this.position = {
					lat,
					lng,
					time: Date.now()
				}
				try {
					sessionStorage.setItem('pvPosition', JSON.stringify(this.position))
				} catch (e) {
				}
				// zkt.wxShareData = null;
			}, false, zkt.wxShareData);
		} else {
			try {
				let url = zkt.getShareUrlParams('', '', 'tongji');
				let data = await zkt.fetch(url, {silent: true});
				if (data) {
					zkt.wxShareData = data;
					this.getWxShareData();
				}
			} catch (e) {
			}

		}
	},
	getLogData(opts) {
		let appid = zkt._GET('appid'), preview = zkt._GET('preview');
		// if (!appid) {
		// 	return;
		// }
		if (!this.position) {
			try {
				this.position = JSON.parse(sessionStorage.getItem('pvPosition')) || {}
			} catch (e) {
				this.position = {};
			}
		}
		if (!preview) {
			//5分钟内不必重新更新位置
			if (!this.position.time || (this.position.time && (this.position.time + 1000 * 60 * 5) < Date.now())) {
				clearTimeout(zkt.positionTimeout);
				zkt.positionTimeout = setTimeout(async () => {
					this.getWxShareData();
				}, 3000)
			}

		}


		let message_id = zkt._GET('message_id');
		if (!message_id && zkt._GET('source') === 'order_message') {
			let cookie_meesage_product_id = z.cookie.get(appid + '_message_product_id');
			let cookie_meesage_product_type = z.cookie.get(appid + '_message_product_type');
			let p_type = opts.bm_lab && opts.bm_lab.product_type || 'normal';
			if (opts.product_id && cookie_meesage_product_id === opts.product_id && opts.bm_lab && p_type === cookie_meesage_product_type) {
				message_id = z.cookie.get(appid + '_message_id');
			}
		}
		let currentOpts = {
			category: "",//业务线,公共为common
			category_desc: "",//业务线中文描述
			bt: "pageview",//行为类型:访问页面 pageview,点击事件 click,下单事件 order
			pid: "",//H5页面、小程序页面对应的标识
			bid: "",//行为标识，非必填 用户在H5页面、小程序页面中用户行为的标识（点击、下单）
			uid: z.cookie.get('member_id') || '',//用户的memberid
			open_id: z.cookie.get(appid + '_open_id') || '',//微信Openid
			hotel_id: z._GET('hotel_id') || '',//酒店id
			brand_id: z.cookie.get(appid + '_brand_id') || '',//集团id
			appid: appid,//
			cid: zkt._GET('cid') || '',//员工代理传播id（员工id）,非必填
			mid: zkt._GET('mid') || '',//消费者传播id,非必填
			bm_lab: {
				message_id: message_id || '',//微信消息推送ID
				is_origin: z._GET('is_origin'),//判断是否为消费者传播原始链接，值为1或2，1为原始，2为分享后的
				from_wx_msg: z._GET('from_wx_msg') || ''//判断访问来源是从微信消息
			},//业务数据,非必填,JSON格式
			product_id: "",//产品id,非必填
			ct: "web",//客户端类型,网页 web 小程序 wxa
			wxa_version: "",//酒店小程序版本,小程序必填
			os: this.getMobileOperatingSystem(),//操作系统 android、ios
			ch: z._GET('source') || '',//打开的渠道，非必填 区分打开H5及小程序的渠道，例如商户版:share、用户分享、EB、公众号菜单等
			sc: z._GET('from') || '',//打开的场景，非必填 区分页面打开方式是通过  微信不同的分享方式打开
			// ci: 10010,//数据组根据上报的ip进行映射
			// ip: "192.168.1.1",//服务端将客户端ip
			ua: navigator && navigator.userAgent || '',//浏览器 user-agent
			tm: Date.now(),//时间戳
			ab_lab: {},//广告数据
			lat: this.position.lat || '',//经度set
			lng: this.position.lng || '',//纬度
			referer: document.referrer || z._GET('zkt_referrer') || sessionStorage.getItem('zkt-referrer'),//记录用户上一页访问的地址,用户记录用户访问流程
			sdk_ver: "2.0.0",//sdk版本
			desc: '',//埋点中文描述
			newlog: 1,//新版本上报
			// test_ver: z.abTest && z.abTest.version || '',//当前ab测试版本，默认为空
			//当前皮肤版本
			test_ver: window.GLOBAL_ENV && window.GLOBAL_ENV.themeData && window.GLOBAL_ENV.themeData.templateCode || '',
			session_id: this.initOpts && this.initOpts.session_id || '',//用户会话ID,用户每次打开浏览器生成一个ID，用于记录一个整个会话流程的访问过程,取用户端的 sessionStore
			ls: opts.ls || z._GET('ls') || '',//  站内跳转的来源场景参数
			fs: opts.fs || z._GET('fs') || z._GET('tj_bm_sys_make_qr_id') || '',//  进入网站的来源场景参数,tj_bm_sys_make_qr_id为二维码扫码参数，在取不到其他字段时，以此字段为准
		};
		let res = Object.assign({}, currentOpts, opts || {});
		res.message_id = message_id;//缓存备用,在上报时删除
		res.product_type = opts.bm_lab && opts.bm_lab.product_type || "normal";//缓存备用,在上报时删除
		if (z.Debug.isDebug()) {
			console.log('-----------------:', opts)
		}
		res.bm_lab = this.translateJsonString('bm_lab', currentOpts, opts, 'bm');
		res.ab_lab = this.translateJsonString('ab_lab', currentOpts, opts, 'ab');
		return res;
	},
	translateJsonString(key, currentOpts, opts, type = 'bm') {
		let tempLab = currentOpts[key];
		tempLab = Object.assign({}, tempLab, opts && opts[key] || {});
		let querys = z._GET();
		Object.keys(querys).map((item) => {
			let preFix = 'tj_' + type + '_';
			if (item.indexOf(preFix) === 0) {
				tempLab[item.replace(preFix, '')] = querys[item];
			}
		});
		return Object.keys(tempLab).length > 0 ? JSON.stringify(tempLab) : '';
	},
	getLocationPosition(cb, showError, data) {
		if (z._GET('appid') === 'wx8aa25883789c070e' || z._GET('disable_position')) {
			console.log('disable_position-tongji');
			return;
		}
		let positionCookieName = zkt._GET('appid') + '_cancel_position', positionCookie = zkt.cookie.get(positionCookieName);
		if (z.isWeixin && positionCookie !== '1' && !z.gettingLocation) {
			z.loadWX(function(wx) {
				if (data && !zkt.initWeChatStart) {
					Object.keys(data).map(k => {
						data[k.toLowerCase()] = data[k];
					});
					let configs = {
						debug: zkt.Debug.isDebug(),
						appId: data.appid,
						timestamp: data.timestamp * 1,
						nonceStr: data.noncestr,
						signature: data.signature,
						jsApiList: ["checkJsApi", "getLocation"]
					};
					configs = zkt.wxConfigAddOpenTagList(configs)
					wx.config(configs);
				}

				wx.ready(() => {
					z.gettingLocation = 1;
					wx.getLocation({
						type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						success(res) {
							z.gettingLocation = 0;
							if (z.Debug.isDebug()) {
								console.log('获取位置成功:' + res)
							}
							cb(res.latitude, res.longitude);
						},
						cancel: function(res) {
							z.gettingLocation = 0;
							console.log('用户拒绝授权获取地理位置');
							zkt.cookie.set(positionCookieName, '1', 30)
							//alert('用户拒绝授权获取地理位置');
						},
						fail: function(res) {
							console.log('获取位置失败:' + JSON.stringify(res));
						}
					});
				});

			});
		} else if (!z.isWeixin && !z.gettingLocation) {
			z.gettingLocation = 1;
			z.getBrowserLocation(pos => {
				z.gettingLocation = 0;
				if (typeof pos === 'string') {
					if (showError) {
						alert(pos);
					}
					return;
				}
				cb(pos.coords.latitude, pos.coords.longitude);
			});
		}
	},
	getMobileOperatingSystem() {
		var userAgent = navigator.userAgent || navigator.vendor || window.opera;
		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			return "Windows";
		}
		if (/android/i.test(userAgent)) {
			return "android";
		}
		// iOS detection from: http://stackoverflow.com/a/9039885/177710
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return "ios";
		}
		return "unknown";
	},
	/**
	 *
	 * @param category 业务线
	 * @param pid  H5页面、小程序页面对应的标识
	 * @param product_id 产品ID
	 * @param bm_lab 业务数据
	 * @param bid 行为标识
	 * @param ab_lab 广告数据
	 * @param bt 行为，默认pageview，点击为click
	 * @param cid 员工代理传播id
	 * @param mid 消息者传播 mid
	 * @param hotel_id 酒店id
	 * @param ch 打开的渠道，非必填 区分打开H5及小程序的渠道，例如商户版:share、用户分享、EB、公众号菜单等
	 * @param sc 打开的场景，非必填 区分页面打开方式是通过  微信不同的分享方式打开
	 * @param need_login 是否需要登录
	 * @param save_message_id
	 * @param force_overwrite 是否强制覆盖，默认情况false，如果传的参数为空字付，undefined,null等返回false判断的值时，如果url中有对应参数，则读取url中参数，如果为true时，则强制使用传入的参数
	 * @param ls  last source  最后一次请求来源
	 * @param fs first source  首次请求来源
	 * @param uid first source  uid或 member_id
	 * @param desc   埋点中文描述
	 * @param desc 业务线 埋点中文描述
	 */

	newlogpv({category, pid, product_id, bm_lab, bid, ab_lab, bt, cid, mid, hotel_id, ch, sc, need_login, save_message_id, force_overwrite, ls, fs, uid, desc, category_desc}) {
		// 删除代码，下线老行为埋点
		console.warn("newlogpv：行为埋点已经下线，请删除相关代码");
	},
	getVal(key, urlKey, force_overwrite) {
		let val = force_overwrite && key !== undefined ? key : key || zkt._GET(urlKey) || '';
		console.log('tj_getVal:', urlKey, val);
		return val
	},
	/**
	 * 全局pv统计
	 * @param currentPath
	 */
	addLogPv(currentPath) {
		// 删除代码，下线老行为埋点
		console.warn("addLogPv：行为埋点已经下线，请删除相关代码");
	},
	tingyunAddAutoEvent(currentPath, params = {autoEnd: true, endDelay: 500}) {
		// 删除代码，下线老行为埋点
		console.warn("tingyunAddAutoEvent：行为埋点已经下线，请删除相关代码");
	},
	/**
	 * 添加logpv 到 localStore
	 * @param params
	 */
	addToLocal(params) {
		let zktLogPv = sessionStorage.getItem('zktLogPv') || '{}';
		try {
			zktLogPv = JSON.parse(zktLogPv);
		} catch (e) {
			zktLogPv = {};
		}
		let keys = Object.keys(zktLogPv);
		try {
			zktLogPv[params.log_id] = params;
			sessionStorage.setItem('zktLogPv', JSON.stringify(zktLogPv));
		} catch (e) {
			keys.some((item, ids) => {
				delete zktLogPv[item];
				return ids > 20;
			});
			zktLogPv[params.log_id] = params;
			sessionStorage.setItem('zktLogPv', JSON.stringify(zktLogPv));
		}
		return sessionStorage.getItem('zktLogPv');
	},
	/**
	 * 更新日志到 localStore
	 * @param key
	 */
	updateLocal(key) {
		let zktLogPv = sessionStorage.getItem('zktLogPv') || '{}';
		try {
			zktLogPv = JSON.parse(zktLogPv);
			console.log('updateLocal:', zktLogPv)
			key.map((item) => delete zktLogPv[item]);
			console.log('updateLocal:', zktLogPv)
		} catch (e) {
			zktLogPv = {};
		}
		sessionStorage.setItem('zktLogPv', JSON.stringify(zktLogPv));
	}
}

