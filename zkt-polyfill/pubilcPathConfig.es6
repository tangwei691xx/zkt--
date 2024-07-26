/** @format */

module.exports = () => {
	return (
		(window.GLOBAL_ENV.CDN_DOMAIN ? '//' : '') +
		window.GLOBAL_ENV.CDN_DOMAIN +
		(window.GLOBAL_ENV.CDN_DOMAIN.indexOf('picssl.zhiketong.com') > -1
			? `/zhida/static/${window.GLOBAL_ENV.mountPath}/`
			: window.GLOBAL_ENV.CDN_PATH || `/${window.GLOBAL_ENV.mountPath}/static/`)
	);
};
