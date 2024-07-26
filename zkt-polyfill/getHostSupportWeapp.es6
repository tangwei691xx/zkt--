/**
 * @format
 */
function detector() {
	let NA_VERSION = '-1';
	let win = window;
	// var external = win.external
	let na1 = win.navigator;
	let userAgent = na1.userAgent || '';
	let appVersion = na1.appVersion || '';
	let vendor = na1.vendor || '';
	let re_blackberry_10 = /\bbb10\b.+?\bversion\/([\d.]+)/;
	let re_blackberry_6_7 = /\bblackberry\b.+\bversion\/([\d.]+)/;
	let re_blackberry_4_5 = /\bblackberry\d+\/([\d.]+)/;

	function toString(object) {
		return Object.prototype.toString.call(object);
	}

	function isObject(object) {
		return toString(object) === '[object Object]';
	}

	function isFunction(object) {
		return toString(object) === '[object Function]';
	}

	function each(object, factory) {
		for (let i = 0, l = object.length; i < l; i++) {
			if (factory.call(object, object[i], i) === false) {
				break;
			}
		}
	}

	// 硬件设备信息识别表达式。
	// 使用数组可以按优先级排序。
	let DEVICES = [
		['nokia', function(ua) {
			// 不能将两个表达式合并，因为可能出现 "nokia; nokia 960"
			// 这种情况下会优先识别出 nokia/-1
			if (ua.indexOf('nokia ') !== -1) {
				return /\bnokia ([0-9]+)?/;
			} else {
				return /\bnokia([a-z0-9]+)?/;
			}
		}],
		// 三星有 Android 和 WP 设备。
		['samsung', function(ua) {
			if (ua.indexOf('samsung') !== -1) {
				return /\bsamsung(?:[ \-](?:sgh|gt|sm))?-([a-z0-9]+)/;
			} else {
				return /\b(?:sgh|sch|gt|sm)-([a-z0-9]+)/;
			}
		}],
		['wp', function(ua) {
			return ua.indexOf('windows phone ') !== -1 ||
				ua.indexOf('xblwp') !== -1 ||
				ua.indexOf('zunewp') !== -1 ||
				ua.indexOf('windows ce') !== -1;
		}],
		['pc', 'windows'],
		['ipad', 'ipad'],
		// ipod 规则应置于 iphone 之前。
		['ipod', 'ipod'],
		['iphone', /\biphone\b|\biph(\d)/],
		['mac', 'macintosh'],
		// 小米
		['mi', /\bmi[ \-]?([a-z0-9 ]+(?= build|\)))/],
		// 红米
		['hongmi', /\bhm[ \-]?([a-z0-9]+)/],
		['aliyun', /\baliyunos\b(?:[\-](\d+))?/],
		['meizu', function(ua) {
			return ua.indexOf('meizu') >= 0
				? /\bmeizu[\/ ]([a-z0-9]+)\b/
				: /\bm([0-9cx]{1,4})\b/;
		}],
		['nexus', /\bnexus ([0-9s.]+)/],
		['huawei', function(ua) {
			let re_mediapad = /\bmediapad (.+?)(?= build\/huaweimediapad\b)/;
			if (ua.indexOf('huawei-huawei') !== -1) {
				return /\bhuawei\-huawei\-([a-z0-9\-]+)/;
			} else if (re_mediapad.test(ua)) {
				return re_mediapad;
			} else {
				return /\bhuawei[ _\-]?([a-z0-9]+)/;
			}
		}],
		['lenovo', function(ua) {
			if (ua.indexOf('lenovo-lenovo') !== -1) {
				return /\blenovo\-lenovo[ \-]([a-z0-9]+)/;
			} else {
				return /\blenovo[ \-]?([a-z0-9]+)/;
			}
		}],
		// 中兴
		['zte', function(ua) {
			if (/\bzte\-[tu]/.test(ua)) {
				return /\bzte-[tu][ _\-]?([a-su-z0-9\+]+)/;
			} else {
				return /\bzte[ _\-]?([a-su-z0-9\+]+)/;
			}
		}],
		// 步步高
		['vivo', /\bvivo(?: ([a-z0-9]+))?/],
		['htc', function(ua) {
			if (/\bhtc[a-z0-9 _\-]+(?= build\b)/.test(ua)) {
				return /\bhtc[ _\-]?([a-z0-9 ]+(?= build))/;
			} else {
				return /\bhtc[ _\-]?([a-z0-9 ]+)/;
			}
		}],
		['oppo', /\boppo[_]([a-z0-9]+)/],
		['konka', /\bkonka[_\-]([a-z0-9]+)/],
		['sonyericsson', /\bmt([a-z0-9]+)/],
		['coolpad', /\bcoolpad[_ ]?([a-z0-9]+)/],
		['lg', /\blg[\-]([a-z0-9]+)/],
		['android', /\bandroid\b|\badr\b/],
		['blackberry', function(ua) {
			if (ua.indexOf('blackberry') >= 0) {
				return /\bblackberry\s?(\d+)/;
			}
			return 'bb10';
		}]
	];

	// 操作系统信息识别表达式
	let OS = [
		['wp', function(ua) {
			if (ua.indexOf('windows phone ') !== -1) {
				return /\bwindows phone (?:os )?([0-9.]+)/;
			} else if (ua.indexOf('xblwp') !== -1) {
				return /\bxblwp([0-9.]+)/;
			} else if (ua.indexOf('zunewp') !== -1) {
				return /\bzunewp([0-9.]+)/;
			}
			return 'windows phone';
		}],
		['windows', /\bwindows nt ([0-9.]+)/],
		['macosx', /\bmac os x ([0-9._]+)/],
		['iOS', function(ua) {
			if (/\bcpu(?: iphone)? os /.test(ua)) {
				return /\bcpu(?: iphone)? os ([0-9._]+)/;
			} else if (ua.indexOf('iph os ') !== -1) {
				return /\biph os ([0-9_]+)/;
			} else {
				return /\bios\b/;
			}
		}],
		['yunos', /\baliyunos ([0-9.]+)/],
		['Android', function(ua) {
			if (ua.indexOf('android') >= 0) {
				return /\bandroid[ \/-]?([0-9.x]+)?/;
			} else if (ua.indexOf('adr') >= 0) {
				if (ua.indexOf('mqqbrowser') >= 0) {
					return /\badr[ ]\(linux; u; ([0-9.]+)?/;
				} else {
					return /\badr(?:[ ]([0-9.]+))?/;
				}
			}
			return 'android';
			// return /\b(?:android|\badr)(?:[\/\- ](?:\(linux; u; )?)?([0-9.x]+)?/;
		}],
		['chromeos', /\bcros i686 ([0-9.]+)/],
		['linux', 'linux'],
		['windowsce', /\bwindows ce(?: ([0-9.]+))?/],
		['symbian', /\bsymbian(?:os)?\/([0-9.]+)/],
		['blackberry', function(ua) {
			let m = ua.match(re_blackberry_10) ||
				ua.match(re_blackberry_6_7) ||
				ua.match(re_blackberry_4_5);
			return m ? {version: m[1]} : 'blackberry';
		}]
	];

	let BROWSER = [
		['micromessenger', /\bmicromessenger\/([\d.]+)/],
		['qq', /\bm?qqbrowser\/([0-9.]+)/],
		['chrome', / (?:chrome|crios|crmo)\/([0-9.]+)/],
		// Android 默认浏览器。该规则需要在 safari 之前。
		['android', function(ua) {
			if (ua.indexOf('android') === -1) {
				return;
			}
			return /\bversion\/([0-9.]+(?: beta)?)/;
		}],
		['safari', /\bversion\/([0-9.]+(?: beta)?)(?: mobile(?:\/[a-z0-9]+)?)? safari\//],
		// 如果不能被识别为 Safari，则猜测是 WebView。
		['webview', /\bcpu(?: iphone)? os (?:[0-9._]+).+\bapplewebkit\b/],
		['firefox', /\bfirefox\/([0-9.ab]+)/],
		['nokia', /\bnokiabrowser\/([0-9.]+)/]
	];

	// UserAgent Detector.
	// @param {String} ua, userAgent.
	// @param {Object} expression
	// @return {Object}
	//    返回 null 表示当前表达式未匹配成功。
	function detect(name, expression, ua) {
		// eslint-disable-next-line no-useless-call
		let expr = isFunction(expression) ? expression.call(null, ua) : expression;
		if (!expr) {
			return null;
		}
		let info = {
			name,
			version: NA_VERSION,
			codename: ''
		};
		let t = toString(expr);
		if (expr === true) {
			return info;
		} else if (t === '[object String]') {
			if (ua.indexOf(expr) !== -1) {
				return info;
			}
		} else if (isObject(expr)) { // Object
			if (expr.hasOwnProperty('version')) {
				info.version = expr.version;
			}
			return info;
		} else if (expr.exec) { // RegExp
			let m = expr.exec(ua);
			if (m) {
				if (m.length >= 2 && m[1]) {
					info.version = m[1].replace(/_/g, '.');
				} else {
					info.version = NA_VERSION;
				}
				return info;
			}
		}
	}

	let na = {name: 'na', version: NA_VERSION};
	// 初始化识别。
	function init(ua, patterns, factory, detector) {
		let detected = na;
		each(patterns, function(pattern) {
			let d = detect(pattern[0], pattern[1], ua);
			if (d) {
				detected = d;
				return false;
			}
		});
		factory.call(detector, detected.name, detected.version);
	}

	// 解析 UserAgent 字符串
	// @param {String} ua, userAgent string.
	// @return {Object}
	let parse = function(ua) {
		ua = (ua || '').toLowerCase();
		let d = {};

		init(ua, DEVICES, function(name, version) {
			let v = parseFloat(version);
			d.device = {
				name,
				version: v,
				fullVersion: version
			};
			d.device[name] = v;
		}, d);

		init(ua, OS, function(name, version) {
			let v = parseFloat(version);
			d.os = {
				name,
				version: v,
				fullVersion: version
			};
			d.os[name] = v;
		}, d);
		init(ua, BROWSER, function(name, version) {
			let mode = version;
			let v = parseFloat(version) || '-1';
			d.browser = {
				name,
				version: v,
				fullVersion: version,
				mode: parseFloat(mode),
				fullMode: mode
			};
			d.browser[name] = v;
		}, d);
		return d;
	};
	return parse(userAgent + ' ' + appVersion + ' ' + vendor);
}
function versionCompare(version = '', compare = '') {
	if (typeof version === 'string') {
		version = version.split('.');
	}
	if (typeof compare === 'string') {
		compare = compare.split('.');
	}
	let result = true;
	let i = 0;
	let len = compare.length;
	while (i < len) {
		let compareVersion = +compare[i] | 0;
		let version1 = +version[i] || 0;
		if (version1 > compareVersion) {
			return true
		}
		if (version1 < compareVersion) {
			return false;
		}
		i++;
	}
	return result;
}
/**
 * @typedef {object} supportWeappResult
 * @property {boolean} support 是否支持
 * @property {boolean} browser 浏览器版本支持情况
 * @property {boolean} os 系统版本支持情况
 * @property {boolean} weixin 当前是否是微信容器
 * @property {string} tip 兼容的提示方案，如果兼容则为空，主要用来提示用户用
 */
/**
 * 微信开放标签支持版本：微信版本不低于于 7.0.12；iOS 系统版本不低于 10.3； Android 系统版本不低于 5.0
 * @summary 获取容器对于开放标签的支持情况
 * @alias module:zkt-polyfill/getHostSupportWeapp
 * @returns {supportWeappResult} 返回支持结果
 */
function getHostSupportWeapp() {
	let result = false;
	let browser1 = false;
	let os1 = false;
	let weixin = zkt.isWeixin;
	let tip = '';
	const browserSupportWeapp = '7.0.12';
	const androidMinOsVersion = '5';
	const iosMinOsVersion = '10.3';
	if (weixin) {
		const {os, browser} = detector();
		let micromessengerSupportWeapp = versionCompare(browser.fullVersion, browserSupportWeapp);
		if (micromessengerSupportWeapp) {
			let osSupportWeapp = false;
			if (os.name === 'iOS') {
				osSupportWeapp = versionCompare(os.fullVersion, iosMinOsVersion);
				tip = 'iOS 系统版本低于 10.3';
			} else if (os.name === 'Android') {
				osSupportWeapp = versionCompare(os.fullVersion, androidMinOsVersion);
				tip = 'Android 系统版本低于 5.0';
			}
			result = micromessengerSupportWeapp && osSupportWeapp;
			browser1 = micromessengerSupportWeapp;
			os1 = osSupportWeapp;
		} else {
			tip = '微信版本低于 7.0.12';
		}

	}
	return {
		support: result,
		browser: browser1,
		os: os1,
		weixin,
		tip: result ? '' : tip
	};
}

module.exports = getHostSupportWeapp