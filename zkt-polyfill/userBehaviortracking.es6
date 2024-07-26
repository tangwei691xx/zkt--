const parseDomainCommon = require('./parseDomian.es6')
const userBehaviorTracking = {

	addTrackDataToUrl(url) {
		let zkt_session_id = z.cookie.get('zkt_session_id') || z._GET('zkt_ssid'), zkt_device_id = z.cookie.get('zkt_device_id') || z._GET('zkt_did');
		if (zkt_session_id && zkt_device_id && !userBehaviorTracking.checkCurrentDomainIsSameRedirectDomain(url)) {
			url = zkt.addQueries({
				'zkt_ssid': zkt_session_id,
				'zkt_did': zkt_device_id
			},url);
		}
		return url;
	},

	checkCurrentDomainIsSameRedirectDomain(url) {
		if (!window.GLOBAL_ENV || !window.GLOBAL_ENV.REDIRECT_DOMAIN_WHITELIST) {
			return true;
		}
		let REDIRECT_DOMAIN_WHITELIST = window.GLOBAL_ENV.REDIRECT_DOMAIN_WHITELIST;

		let primaryDomain = parseDomainCommon.getPrimaryDomainFromUrlStr(url);

		//如果获取不到域名，说明是当前域名内跳转,域名相同
		if (!primaryDomain) {
			return true
		}
		//不在域名白名单中时，表示跳转的是外部域名，当作域名相同处理
		if (!REDIRECT_DOMAIN_WHITELIST.includes(primaryDomain)) {
			return true;
		}
		let currentDomain = parseDomainCommon.getPrimaryDomain();
		return currentDomain === primaryDomain;
	},


}
module.exports = userBehaviorTracking