const red_envelope_btn = require('./red_envelope.png');
require('./red_envelope.css');
const zktDebug = require('./debug.es6')
const parseDomainCommon = require('./parseDomian.es6');
const zktCurrency = require('./currency.es6');
const dayjs = require('dayjs');

const coupons = {

	config: {	//是否初始化红包
		initRedEnvelope: false,
		//不显示红包页面地址，但根据参数可以
		notShowCoupons: [{
			//用户中心红包列表页不显示弹层红包
			path: '^/NewHome/Coupons',
			//并且删除cookie，其他页面之后也不显示弹层红包
			deleteCookie: true,
			//为true时，领取红包但不在页面上展示红包弹层，为false时，即不领取红包也不显示红包弹层
			getCoupon: true
		}]
	},

	init() {
		/**
		 * 初始化红包提示 在预览模式下不初始化红包
		 */
		if (this.config.initRedEnvelope && !z._GET('preview') && !z._GET('silentAuth') && zkt.isWeixin) {
			this.getCouponData = true;

			zkt.domContentLoaded(function () {
				coupons.getCoupons();
			})
			// document.addEventListener("DOMContentLoaded", function(event) {
				
			// });
		}
	},
	/**
	 * 获取自动续红包
	 */
	getCoupons(url = '/NewHome/api?method=receiveAutoCoupons') {
		//某些页面不显示红包
		this.notShowCouponsFun();
		if (!this.getCouponData) {
			return;
		}
		let {
			is_new_coupon,
			coupon_batch,
			coupon_cache
		} = coupons.getCouponsCookie();
		if (is_new_coupon) {
			coupons.showRedEnvelopeBtn();
		} else {
			if (zkt.cookie.get('member_id') && (!coupon_cache || zktDebug.isDebug())) {
				zkt.fetch(url, {
					json: {
						args: {
							coupon_batch
						}
					}
				}).then((data) => {
					coupons.setCouponsCacheCookie();
					if (data && data.success) {
						coupons.showRedEnvelopeBtn();
					}
				});
			} else {
				//在不需要获取红包数据时，依然根据现有缓存的cookie去判断是否显示红包，
				// 如果没有相应缓存cookie，会更新弹层管理器数据
				coupons.showRedEnvelopeBtn();
			}

		}

	},
	/**
	 * 获取红包相应cookie
	 * @returns {{coupon_activity_ids: *, new_coupon_style: *, is_new_coupon: *, coupon_batch: *}}
	 */
	getCouponsCookie() {
		let appid = zkt._GET('appid');
		if (!appid) return {};

		let cookie_name = appid + '_coupon_activity_ids';
		let coupon_activity_ids = zkt.cookie.get(cookie_name);
		let cookie_style_name = appid + '_new_coupon_style';
		let new_coupon_style = zkt.cookie.get(cookie_style_name);
		let cookie_is_new_coupon_name = appid + '_is_new_coupon';
		//是否为新人红包
		let is_new_coupon = zkt.cookie.get(cookie_is_new_coupon_name);
		let cookie_coupon_batch_name = appid + '_coupon_batch';
		//红包的批次号,用于状态当前是哪批次发送的红包
		let coupon_batch = zkt.cookie.get(cookie_coupon_batch_name);

		let cookie_coupon_cache_name = zkt.cookie.get('member_id') + '_coupon_cache';
		//自动续红包缓存时间，在缓存过期前，不发送自动续红包请求
		let coupon_cache = zkt.cookie.get(cookie_coupon_cache_name);
		return {
			cookie_name,
			cookie_style_name,
			cookie_is_new_coupon_name,
			cookie_coupon_batch_name,
			coupon_activity_ids,
			new_coupon_style,
			is_new_coupon,
			coupon_batch,
			coupon_cache
		}
	},
	/**
	 * 设置自动续红包缓存时间，在缓存过期前，不发送自动续红包请求
	 * 默认缓存5分钟
	 */
	setCouponsCacheCookie(time = 5) {
		if (zktDebug.isDebug()) {
			return;

		}
		let cookie_coupon_cache_name = zkt.cookie.get('member_id') + '_coupon_cache';
		zkt.cookie.set(cookie_coupon_cache_name, 1, time / (24 * 60))
	},
	notShowCouponsFun() {
		//某些页面不显示红包
		this.config.notShowCoupons.some((item) => {
			if (new RegExp(item.path).test(location.href.replace(location.origin, ''))) {
				this.notShow = true;
				this.deleteCookie = item.deleteCookie;
				this.getCouponData = item.getCoupon;
				return true;
			}
		});
	},
	/**
	 * 显示红包提示小浮层
	 * @param url 接口url
	 * @param auto 是否自动获取红包
	 * @returns {boolean}
	 */
	showRedEnvelopeBtn() {
		let appid = zkt._GET('appid');
		if (!appid) return;

		let {
			cookie_name,
			cookie_style_name,
			cookie_is_new_coupon_name,
			cookie_coupon_batch_name,
			coupon_activity_ids,
			new_coupon_style,
			is_new_coupon,
			coupon_batch
		} = coupons.getCouponsCookie();


		if (zktDebug.isDebug() && zkt._GET('couponid')) {
			coupons.showRedEnvelopeDialog(zkt._GET('couponid'), coupon_batch, is_new_coupon);
			return;

		}
		if (!coupon_activity_ids || this.notShow) {
			zkt.popUpManager.sendPopUpStatus('coupon', 0);
			if (this.deleteCookie) {
				coupons.deleteRedEnvelopeCookie(cookie_name, cookie_style_name, cookie_is_new_coupon_name, cookie_coupon_batch_name);
			}
			return;

		}

		if (new_coupon_style === '1') {
			coupons.showRedEnvelopeDialog(coupon_activity_ids, coupon_batch, is_new_coupon);

		} else {
			let btnWrap = document.createElement('div');
			btnWrap.className = 'redEnvelopeBtn';
			btnWrap.innerHTML = `
						<img class="red_envelope" src="${red_envelope_btn}" 
						onclick="zkt.coupons.showRedEnvelopeDialog('${coupon_activity_ids}','${coupon_batch}','${is_new_coupon}')">
					`;
			document.body.appendChild(btnWrap);
			zkt.popUpManager.sendPopUpStatus('coupon', 0);

		}
		this.deleteRedEnvelopeCookie(cookie_name, cookie_style_name, cookie_is_new_coupon_name, cookie_coupon_batch_name);

	},
	deleteRedEnvelopeCookie(cookie_name, cookie_style_name, cookie_is_new_coupon_name, cookie_coupon_batch_name) {
		if (zktDebug.isDebug()) {
			return false;
		}
		let d = '.' + location.hostname;
		//删除 debug cookie
		zkt.cookie.delete(cookie_name);
		zkt.cookie.delete(cookie_style_name);
		zkt.cookie.delete(cookie_is_new_coupon_name);
		zkt.cookie.delete(cookie_coupon_batch_name);
		//删除 node端生成 cookie

		zkt.cookie.delete(cookie_name, d);
		zkt.cookie.delete(cookie_style_name, d);
		zkt.cookie.delete(cookie_is_new_coupon_name, d);
		zkt.cookie.delete(cookie_coupon_batch_name, d);

		let domain = '.' + parseDomainCommon.getPrimaryDomain();

		zkt.cookie.delete(cookie_name, domain);
		zkt.cookie.delete(cookie_style_name, domain);
		zkt.cookie.delete(cookie_is_new_coupon_name, domain);
		zkt.cookie.delete(cookie_coupon_batch_name, domain);


	},
	showRedEnvelopeDialog(coupon_activity_ids = 362, coupon_batch, is_new_coupon, url = '/NewHome/api?method=getCouponListInfo') {
		if (!coupon_activity_ids) {
			console.error('coupon_activity_ids is empty');
			zkt.popUpManager.sendPopUpStatus('coupon', 0);
			return;
		}

		if (zkt.popUpManager.checkCurrentPopUpCanShow('coupon')) {
			if (zktDebug.isDebug()) {
				alert('弹层队列中有值，故不能重复弹层:' + JSON.stringify(zkt.popUpManager.popUpQueue))
			}
			zkt.popUpManager.sendPopUpStatus('coupon', 0);
			return false;

		}
		zkt.fetch(url, {
			json: {
				args: {
					coupon_activity_ids,
					batchNumber: coupon_batch
				}
			}
		}).then((data) => {
			let redEnvelopeBtn = document.querySelector('.redEnvelopeBtn');
			if (redEnvelopeBtn) {
				document.body.removeChild(redEnvelopeBtn);
			}
			if (data.success && data.result.length > 0) {
				let red_envelope_dialog_mask = document.createElement('div');
				red_envelope_dialog_mask.className = 'red_envelope_dialog_mask';
				let red_envelope_dialog_wrap = document.createElement('div');
				red_envelope_dialog_wrap.className = 'red_envelope_dialog_wrap';

				
				let list = data.result;

				let {min_pay_txt, couponAmount, couponDiscount, expireTime} = list[0] || {};
				if(zktCurrency.getTicketIsNotCny()) {
					min_pay_txt = min_pay_txt.replace(/￥/g, '').replace(/(\d+(\.\d+)?)元可用/, `${zktCurrency.getPrimitive("ticket")}$1可用`);
				}
				let red_envelope_amount = '';
				let amountLength = 0;
				if(couponDiscount) {
					red_envelope_amount = couponDiscount + '<span class="discount">折</span>';
					amountLength = `${couponDiscount}`.length
				} else {
					amountLength = `${couponAmount}`.length
					if(zktCurrency.getTicketIsCny()) {
						red_envelope_amount = '<span class="amount">￥</span>' + couponAmount
					} else {
						red_envelope_amount = '<span class="amount">' + zktCurrency.getPrimitive("ticket") + '</span>' + couponAmount
					}
				}
				let list_str = `
					<div class="red_envelope_amount ${amountLength >= 3 ? 'min-font' : ''}"><div class="red_envelope_amount-item">${red_envelope_amount}</div></div>
					<div class="red_envelope_item_limit">${min_pay_txt}</div>
					<div class="red_envelope_item_expire">有效期至${dayjs(expireTime).format('YYYY.MM.DD')}</div>
				`;


				let red_envelope_dialog = `
			<div class="red_envelope_dialog">
				${list_str}
				<div class="red_envelope_title">恭喜获得${list.length}张券</div>
				<div class="red_envelope_desc">
					请关注酒店官微，到个人中心查看
				</div>
				<svg class="red_envelope_close" t="1693382063094" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="13046" width="200" height="200"><path d="M92.8 931.2c-19.2-19.2-19.2-48 0-67.2l768-768c19.2-19.2 48-19.2 67.2 0 19.2 19.2 19.2 48 0 67.2l-768 768c-16 19.2-48 19.2-67.2 0z m838.4 0c-19.2 19.2-48 19.2-67.2 0L92.8 160c-19.2-19.2-19.2-48 0-67.2 19.2-19.2 48-19.2 67.2 0l768 768c22.4 19.2 22.4 51.2 3.2 70.4z" p-id="13047"></path></svg>
			</div>
		`;

				function closeEnvelopeDialog() {
					document.body.removeChild(red_envelope_dialog_mask);
					document.body.removeChild(red_envelope_dialog_wrap);
					zkt.popUpManager.sendPopUpStatus('coupon', 0, false);


				}

				red_envelope_dialog_wrap.innerHTML = red_envelope_dialog;
				document.body.appendChild(red_envelope_dialog_mask);
				document.body.appendChild(red_envelope_dialog_wrap);
				red_envelope_dialog_mask.addEventListener('click', () => closeEnvelopeDialog());
				document.querySelector('.red_envelope_close').addEventListener('click', () => closeEnvelopeDialog());
				zkt.popUpManager.sendPopUpStatus('coupon', 1);

			} else {
				zkt.popUpManager.sendPopUpStatus('coupon', 0);

			}
		});
	}

}

module.exports = coupons

