/**
 *  ab测试方法
 * */
module.exports = {
	/**
	 * @param _default 不进行ab测试时期望返回的值
	 * @param scene ab测试的使用场景
	 * */
	async init(_default, scene) {
		let resKey = 0;
		let maxTest = 0;
		return await zkt.fetch('/Common/api?method=getHotelConfigByAppIdSrv', {
			json: {
				args: {
					appId: z._GET('appid'),
					key: 'ENABLE_AB_TEST_CONFIG_JSON'
				}
			}
		}).then((data) => {
			// {"unionId":{"open":1,"ab_list":[0,1,2],"hotel_id":["188160","189900","199143","194905","207487","214061",184569]}}
			// {"information": {"open": 1,"ab_list": [0, 1]}}
			if(!data.data) return _default;
			data = JSON.parse(data.data);
			let abData = {};
			if(scene === 'unionIdMerge'){
				abData = !!data.unionId ? data.unionId : '';
			}else {
				abData = !!data.information ? data.information : {"open":1,"ab_list":[0,1]};
			}
			//判断是否包含该场景AB测试或者是开关是否已经关闭
			if(!abData || abData.open * 1 !== 1) return _default;

			//是否包含该公众号的ab测试
			if(scene === 'unionIdMerge'){
				if(!abData.hotel_id.includes(z._GET('hotel_id') + '')) return _default;
			}

			console.log('满足ab测试条件，进行随机分配');
			maxTest = abData.ab_list.length;
			let maxNum = 10000;
			let keyList = [];
			let step = Math.ceil(maxNum/maxTest);
			let key = Math.round(Math.random()*maxNum);

			for (let i=0; i < maxTest; i++) {
				keyList[i] = step*(i+1);
			}
			for (let i = 0; i < keyList.length; i++) {
				if (key <= keyList[i]) {
					resKey = i;
					break;
				}
			}
			return resKey;
		});
	}
}

