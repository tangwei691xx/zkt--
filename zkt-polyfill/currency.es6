/** @format */

const zktMath = require('./math.es6');
const storage = require('./storage.es6');
const CBO = require('zkt-fe-cbo');
const DefaultCurrencyConfig = {
	isCny: true,
	rate: 1,
	primitiveCurrency: "CNY",
	primitiveCurrencyName: "人民币",
	primitiveCurrencySymbol: "¥",
	targetCurrency: "CNY",
	targetCurrencyName: "人民币",
	targetCurrencySymbol: "¥"
}
const currency = {
	/**
	 * 初始化业务线的货币配置
	 */
	init(BUSINESSLINE) {
		return new Promise((resolve)=>{
			const key = `${z._GET('appid')}_${BUSINESSLINE}_hotel_currency_config`;
		z.commonApi('getHotelCurrencyConfig', {
			businessType: CBO.BUSINESS_LINE[BUSINESSLINE],
		}).then(({data}) => {
			let storeInfo = {
				isCny: data.primitiveCurrency === 'CNY',
				rate: data.exchangeRate * 1, // 汇率
				primitiveCurrency: data.primitiveCurrency, // "MOP"
				primitiveCurrencyName: data.primitiveCurrencyName, // "澳门币"
				primitiveCurrencySymbol: data.primitiveCurrencySymbol, // "MOP$"
				targetCurrency: data.targetCurrency, // "CNY"
				targetCurrencyName: data.targetCurrencyName, // "人民币"
				targetCurrencySymbol: data.targetCurrencySymbol, // "¥"
			}
			storage.setItem(key, JSON.stringify(storeInfo));
			resolve(storeInfo)
		}).catch(() => {
			storage.setItem(key, JSON.stringify(DefaultCurrencyConfig));
			resolve(DefaultCurrencyConfig)
		});
		})
		
	},
	// 获取全局的配置  找不到该业务线则返回默认
	getGlobalCurrencyConfig(BUSINESSLINE){
		let { CurrencyConfig } = GLOBAL_ENV;
		try {
			if(CurrencyConfig && CurrencyConfig.length){
				const config =  CurrencyConfig.filter(el=>el.businessType===BUSINESSLINE.toLowerCase())[0] || CurrencyConfig.filter(el=>el.businessType==='default')[0]
				return config
			}else{
				return {
					businessType: "default", currencyType: "CNY"
				}
			}
		} catch (error) {
			return {
				businessType: "default", currencyType: "CNY"
			}
		}
	
	},
	/**
	 *
	 * @param BUSINESSLINE 业务线  小写
	 * @returns boolean
	 */
	getStoreData(BUSINESSLINE) {
		const key = `${z._GET('appid')}_${BUSINESSLINE}_hotel_currency_config`;
		try {
			return JSON.parse(storage.getItem(key))
		} catch (error) {
			return DefaultCurrencyConfig
		}
	},
	/** 获取数据相关 开始 */
	// 获取指定key的值
	getStoreDataByKey(key, BUSINESSLINE) {
		let data = this.getStoreData(BUSINESSLINE);
		return data && data[key] || "";
	},
	// 汇率
	getRate(BUSINESSLINE) {
		return this.getStoreDataByKey("rate", BUSINESSLINE);
	},
	// "MOP" 外币符号
	getPrimitive(BUSINESSLINE) {
		return this.getStoreDataByKey("primitiveCurrency", BUSINESSLINE);
	},
	// "澳门币" 外币名称
	getPrimitiveName(BUSINESSLINE) {
		return this.getStoreDataByKey("primitiveCurrencyName", BUSINESSLINE);
	},
	// "MOP$"
	getPrimitiveSymbol(BUSINESSLINE) {
		return this.getStoreDataByKey("primitiveCurrencySymbol", BUSINESSLINE);
	},
	// "CNY" 当前币种
	getTarget(BUSINESSLINE) {
		return this.getStoreDataByKey("targetCurrency", BUSINESSLINE);
	},
	// "人民币" 当前币种名称
	getTargetName(BUSINESSLINE) {
		return this.getStoreDataByKey("targetCurrencyName", BUSINESSLINE);
	},
	// "¥" 当前币种符号
	getTargetSymbol(BUSINESSLINE) {
		return this.getStoreDataByKey("targetCurrencySymbol", BUSINESSLINE);
	},
	/** 获取数据相关 结束 */

	isCny(BUSINESSLINE) {
		if (!BUSINESSLINE) {
			z.Toast('请传入业务线', 5);
			return true;
		}
		let Cny = true
		try {
			const { isCny } = this.getStoreData(BUSINESSLINE)
			Cny = isCny
		} catch (error) {
			console.error('isCny',error);
		}
		return !!Cny
	},
	/**
	 *
	 * @param BUSINESSLINE 业务线
	 * @param priceNum 后端返回货币价格数
	 */
	getCnyPrice(BUSINESSLINE, priceNum) {
		if (!BUSINESSLINE) {
			z.Toast('传入正确业务线', 5);
			return priceNum;
		}
		let { rate = 1 } = this.getStoreData(BUSINESSLINE)
		if (rate) {
			return zktMath.round(zktMath.multiply(priceNum, rate))
		}
	},
	// 获取区间
	getCnyPriceFormatInterval(BUSINESSLINE, splitStr, intervalPriceStr) {
		let intervalPriceArr = intervalPriceStr.split(splitStr);
		if(intervalPriceArr.length !==2){
			return  {
				beforeText: intervalPriceStr,
				afterText: "",
			}
		}
		let { primitiveCurrency, isCny, targetCurrencySymbol } = this.getStoreData(BUSINESSLINE);
		if (isCny) {
			return {
				beforeText: intervalPriceStr,
				afterText: "",
			}
		}
		let beforeText = `${intervalPriceStr}`;
		let afterText = `${targetCurrencySymbol}${this.getTicketCnyPrice(intervalPriceArr[0])}~${this.getTicketCnyPrice(intervalPriceArr[1])}`;
		return {
			symbol: primitiveCurrency,
			beforeText,
			afterText,
		}
	},
	/** 预售券业务线方法 开始 */
	// 获取预售券人民币
	getTicketCnyPrice(price) {
		return this.getCnyPrice("ticket", price)
	},
	// 预售券是人民币
	getTicketIsCny() {
		return this.isCny("ticket")
	},
	// 预售券不是人民币
	getTicketIsNotCny() {
		return !this.isCny("ticket")
	},
	getTicketCnyPriceFormatInterval(intervalPriceStr) {
		return this.getCnyPriceFormatInterval("ticket", "~", intervalPriceStr);
	}
	/** 预售券业务线方法 结束 */
};

module.exports = currency;
