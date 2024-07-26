const zktDebug = {
	tools() {
		if (zktDebug.isDebug()) {
			let appid = zkt._GET('appid');
			if (!appid) return;

			let member_id = zkt.cookie.get('member_id');

			let btnWrap = document.createElement('div');
			let url = '/'+(GLOBAL_ENV && GLOBAL_ENV.mountPath || 'NewHome') + '/reset?referer_url=' + encodeURIComponent(location.href);

			btnWrap.innerHTML = `
						<button class="test_red_envelope"  onclick="location.href='${url}'">清除所有cookie,<br>member_id:<br>${member_id}</button>
					`;
			document.body.appendChild(btnWrap)
		}
		if(window.GLOBAL_ENV && window.GLOBAL_ENV.ENV !== 'pro' && !zktDebug.isTest()){
			let warningDom = document.createElement('div');
			warningDom.innerHTML = `<span class="test_red_warning">⚠️警告,非正式环境，仅供测试</span>`;
			warningDom.onclick = function(){
				if (zkt.adaptor && zkt.adaptor.isMini()) {
					zkt.adaptor.debug()
				}
				const r = confirm("切换主题点确定，仅关闭警告条点取消");
				if (r) {
					// 更改主题：会增加链接参数并跳转
					zktDebug.changeThemeAndJump();
				} else {
					document.body.removeChild(warningDom)
				}
			}
			document.body.appendChild(warningDom)
		}
	},
	// 更改主题：会增加链接参数并跳转,仅能切换到深浅主题
	changeThemeAndJump() {
		let isNotPro = window.GLOBAL_ENV && window.GLOBAL_ENV.ENV !== 'pro' && !zktDebug.isTest();
		let isPro = !isNotPro;
		if(isPro) {
			return;
		}

		let templateCode = z._GET('templateCode') || window.GLOBAL_ENV.themeData.templateCode;''
		let newTemplateCode = '浅色版';

		if(templateCode == '浅色版') {
			newTemplateCode = '深色版'
		} else {
			newTemplateCode = '浅色版';
		}

		let url = z.addQuery('templateCode', newTemplateCode, location.href);
		return zkt.jumpTo(url);
	},
	//跳转到清除cookie地址，然后再跳回原地址
	clearCookies() {
		let url = (GLOBAL_ENV && GLOBAL_ENV.mountPath || '/NewHome') + '/reset?referer_url=' + encodeURIComponent(location.href);
		zkt.jumpTo(url);
	},
	//清除node端缓存，并再跳转原地址
	clearNodeCache(){

	},
	log(error = '', logOptions, headers) {
		try {
			let ajaxList = Object.assign({}, z.sendApiList);
			let projectPathPrefix = location.pathname.split('/')[1];
			// if (location.host.indexOf('zd.') !== 0) {
			// 	return;
			//
			// }
			z.fetch(`/${projectPathPrefix}/setLog`, {
				json: {
					args: {
						cookies: '',
						url: location.href,
						ajaxList,
						error,
						options: logOptions,
					}
				},
        silent: true,
        headers,
			});
		} catch (e) {

		}

	},
	errorToJson(errObj) {
		return JSON.stringify(errObj, Object.getOwnPropertyNames(errObj));
	},
	isDebug(query='debug') {
		let member_id = zkt.cookie.get('member_id')
		if (zkt._GET(query) || zkt.cookie.get(member_id + query)) {

			return true;
		}
		return false;
	},
	isTest(query='test') {
		if (zkt._GET(query)) {
			return true;
		}
		return false;
	},

}
module.exports = zktDebug
