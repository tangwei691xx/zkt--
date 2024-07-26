/** @format */

const LANGUAGE_BASE_KEY = 'language';
const LANGUAGE_DEFAULT = 'zh-CN';
const LANGUAGE_DOM_KEY = `zkt-language`;
const FORCE_LANGUAGE_KEY = 'force_language';
const LANGUAGE_REGEXP = /[^-]+/;
const SUPPORT_LANGUAGE = {
	zh: 'zh',
	en: 'en',
	defaultLanguage: 'zh',
};

const language = {
	LANGUAGE_BASE_KEY,
	LANGUAGE_DOM_KEY,
	keyByUrl: LANGUAGE_BASE_KEY,
	keyByStorage: '',
	currentLanguage: LANGUAGE_DEFAULT,
	originalLanguage: LANGUAGE_DEFAULT,
	/**
	 * 在storage中设置语言的key
	 */
	setKeyWithStorage() {
		const appid = zkt._GET('appid') || '';
    const customizeKey = zkt.languageSuffix ? `_${zkt.languageSuffix}` : '';
		const key = `${appid}_${LANGUAGE_BASE_KEY}${customizeKey}`;
		language.keyByStorage = key;
	},
	/**
	 * 通过cookie获取当前语言
	 *
	 * @returns {string} 语言
	 */
	getLanguageValueByCookie() {
		const key = language.keyByStorage;
		return zkt.cookie.get(key);
	},
	/**
	 * 通过cookie设置当前语言
	 *
	 * @param {string} value 语言
	 * @returns {string} 语言
	 */
	setLanguageValueWithCookie(value) {
		const key = language.keyByStorage;
		return zkt.cookie.set(key, value);
	},
	/**
	 * 通过url获取当前语言
	 *
	 * @returns {string} 语言
	 */
	getLanguageValueByUrl() {
		const key = language.keyByUrl;
		return zkt._GET(key) || '';
	},
	/**
	 * 获取是否强制语言，主要用于线下验证
	 * @returns boolean
	 */
	shouldForceLanguage() {
		return zkt._GET(FORCE_LANGUAGE_KEY) || '';
	},
	/**
	 * 通过url设置当前语言
	 *
	 * @param {string} value 语言
	 * @param {string} [url] 设置语言的url
	 * @returns {string} 语言
	 */
	setLanguageValueWithUrl(value, url) {
		if (value) {
			const _url = url || window.location.href;
			return zkt._addParam(_url, language.keyByUrl, value);
		}
		return url;
	},
	/**
	 * 通过localStorage获取当前语言
	 *
	 * @returns {string} 语言
	 */
	getLanguageValueByStorage() {
		const key = language.keyByStorage;
		return zkt.kv.get(key);
	},
	/**
	 * 通过localStorage获取当前语言
	 *
	 * @param {string} value 语言
	 * @returns {string} 语言
	 */
	setLanguageValueWithStorage(value) {
		const key = language.keyByStorage;
		return zkt.kv.set(key, value);
	},
	/**
	 * 通过navigator获取当前语言
	 *
	 * @returns {string} 语言
	 */
	getLanguageValueByEnv() {
		return navigator.language || navigator.userLanguage || '';
	},
	/**
	 * 获取当前语言
	 *
	 * @returns {string} 语言
	 */
	getOriginalLanguage() {
		try {
			const currentLanguage =
				language.getLanguageValueByUrl() ||
				language.getLanguageValueByCookie() ||
				language.getLanguageValueByStorage() ||
				language.getLanguageValueByEnv() ||
				LANGUAGE_DEFAULT;
			return currentLanguage;
		} catch (e) {
			console.error('getLanguage', e);
			return LANGUAGE_DEFAULT;
		}
	},
	/**
	 * 解析语言
	 *
	 * @param {string} value 需要解析的语言
	 * @example parseLanguage('zh-CN') => zh
	 * @returns {string} 语言
	 */
	parseLanguage(value) {
		try {
			const languageArr = value ? value.match(LANGUAGE_REGEXP) : null;
			const result = languageArr ? languageArr[0] : value;
			return result;
		} catch (e) {
			return value;
		}
	},
	/**
	 * 获取商户的多语言状态
	 * @returns boolean
	 */
	getMerchantSupportLanguageStatus() {
		let supportEn = false;
		try {
			supportEn = window.GLOBAL_ENV.ENABLE_EN;
		} catch (e) {
			console.log(e);
			supportEn = false;
		}
		return supportEn;
	},
	/**
	 * 获取当前语言
	 *
	 * @returns {string} 语言
	 */
	getLanguage() {
		const forceLanguage = language.shouldForceLanguage();
		const supportEn = forceLanguage || language.getMerchantSupportLanguageStatus();
		let supportLanguage = SUPPORT_LANGUAGE.defaultLanguage;
		if (supportEn) {
			const currentOriginalLanguage = language.getOriginalLanguage();
			language.originalLanguage = currentOriginalLanguage;
			const currentLanguage = language.parseLanguage(currentOriginalLanguage);
			supportLanguage = SUPPORT_LANGUAGE[currentLanguage] ? currentLanguage : SUPPORT_LANGUAGE.defaultLanguage;
		}
		return supportLanguage;
	},
	/**
	 * 设置语言到dom元素上，主要用来做css样式
	 *
	 * @param {string} value 语言
	 */
	setLanguageToDom(value) {
		try {
			document.documentElement.setAttribute(LANGUAGE_DOM_KEY, value);
			document.documentElement.setAttribute('lang', value);
		} catch (e) {
			console.error('setLanguageToDom', e);
		}
	},
	/**
	 * 设置当前语言
	 *
	 * @param {string} value 语言
	 * @param {string} [url] 设置语言的url
	 * @returns {string} 语言
	 */
	setLanguage(value, url) {
		try {
			if (value) {
				language.setLanguageValueWithCookie(value);
				language.setLanguageValueWithStorage(value);
				language.setLanguageToDom(value);
				language._setCurrentLanguage(value);
				const result = {
					status: 0,
					language: language.currentLanguage,
				};
				if (url) {
					result.url = language.setLanguageValueWithUrl(value, url);
				}
				return result;
			}
			return {
				status: -2,
				url,
			};
		} catch (e) {
			console.error('setLanguage', e);
			return {
				status: -1,
				url,
				language: language.currentLanguage,
			};
		}
	},
	/**
	 * 设置当前语言
	 *
	 * @inner
	 * @param {string} value  当前的语言
	 */
	_setCurrentLanguage(value) {
		language.currentLanguage = value;
	},
	/**
	 * 初始化方法，主要设置storage的key，然后获取语言，并进行缓存
	 */
	init() {
		language.setKeyWithStorage();
		const currentLanguage = language.getLanguage();
		language.setLanguage(currentLanguage);
	},
};

module.exports = language;
