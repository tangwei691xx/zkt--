/**
 * 高精度的数学运算
 *
 * @format
 */

const zktMath = {
	isNumber(val) {
		return typeof val === 'number' && !Number.isNaN(val) && val !== Infinity && val !== -Infinity;
	},
	isPositiveInt(val) {
		return /^\d+$/.test(val);
	},
	isNotZeroNumber(val) {
		return zktMath.isNumber(val) && +val !== 0;
	},
	notEmpty(val) {
		return !zktMath.isVoid(val);
	},
	isFalsy(val) {
		return val === 0 ? false : !val;
	},
	isVoid(val) {
		return val === undefined || val === null || val === '';
	},
	/**
	 * 加法函数，用来得到精确的加法结果
	 * 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
	 * @param {string|number} arg1 参数一
	 * @param {string|number} arg2 参数二
	 * @example 调用：accAdd(arg1,arg2)
	 * @returns {number} 返回值：arg1加上arg2的精确结果
	 */
	add(arg1, arg2) {
		let r1, r2, m, c;
		try {
			r1 = arg1.toString().split('.')[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split('.')[1].length;
		} catch (e) {
			r2 = 0;
		}
		c = Math.abs(r1 - r2);
		m = Math.pow(10, Math.max(r1, r2));
		if (c > 0) {
			let cm = Math.pow(10, c);
			if (r1 > r2) {
				arg1 = Number(arg1.toString().replace('.', ''));
				arg2 = Number(arg2.toString().replace('.', '')) * cm;
			} else {
				arg1 = Number(arg1.toString().replace('.', '')) * cm;
				arg2 = Number(arg2.toString().replace('.', ''));
			}
		} else {
			arg1 = Number(arg1.toString().replace('.', ''));
			arg2 = Number(arg2.toString().replace('.', ''));
		}
		return (arg1 + arg2) / m;
	},
	/**
	 ** 减法函数，用来得到精确的减法结果
	 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
	 ** subtract(arg1, arg2)
	 ** 返回值：arg1加上arg2的精确结果 为字符串
	 **/
	subtract(arg1, arg2) {
		let r1, r2, m, n;
		try {
			r1 = arg1.toString().split('.')[1].length;
		} catch (e) {
			r1 = 0;
		}
		try {
			r2 = arg2.toString().split('.')[1].length;
		} catch (e) {
			r2 = 0;
		}
		m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
		n = r1 >= r2 ? r1 : r2;
		return ((arg1 * m - arg2 * m) / m).toFixed(n);
	},
	/**
	 ** 乘法函数，用来得到精确的乘法结果
	 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
	 ** 调用：multiply(arg1,arg2)
	 ** 返回值：arg1乘以 arg2的精确结果
	 **/
	multiply(arg1, arg2) {
		let m = 0,
			s1 = arg1.toString(),
			s2 = arg2.toString();
		try {
			m += s1.split('.')[1].length;
		} catch (e) {}
		try {
			m += s2.split('.')[1].length;
		} catch (e) {}
		return (Number(s1.replace('.', '')) * Number(s2.replace('.', ''))) / Math.pow(10, m);
	},
	/**
	 * 获取小数点位置
	 * @param number
	 * @returns {number}
	 */
	getDecimalPointPosition(number) {
		try {
			number = number.toString();
			return number.split('.')[1].length;
		} catch (e) {
			return 0;
		}
	},

	/**
	 *
	 * 截取 指定小数点位数的数据,不对数据进行任何转换
	 * 如：传入 12.126 digits为2时，返回12.12
	 * 传如 12.2 返回值 依然是12.2
	 * @param {number |string} number 数字
	 * @param {number} digits 保留小数点位数，如果小数点位置不大于要保留的位数则不作处理
	 * @param  {boolean} toFixed 为true 使用 toFixed 处理,否则只截取长度不作任何转换
	 * @param {boolean} ignoreDecimalsWithZero 忽略掉小数值为0的值如，最后值为123.000，此参数为true时，返回值为123
	 * @returns {string | number}
	 */
	getDecimalPointWithDigits(number, digits = 2, toFixed = false, ignoreDecimalsWithZero = false) {
		number = number.toString();
		let currentDigits = zktMath.getDecimalPointPosition(number);
		let exceedNum = currentDigits > digits;
		if (exceedNum > 0) {
			if (toFixed) {
				number = (number * 1).toFixed(digits);
			} else {
				number = number.substring(0, number.length - exceedNum);
			}
		}
		if (ignoreDecimalsWithZero) {
			// Number('123')     // 123
			// Number('12.3')    // 12.3
			// Number('12.00')   // 12
			// Number('123e-1')  // 12.3
			// Number('')        // 0
			// Number(null)      // 0
			// Number('0x11')    // 17
			// Number('0b11')    // 3
			// Number('0o11')    // 9
			// Number('foo')     // NaN
			// Number('100a')    // NaN
			// Number('-Infinity') //-Infinity
			number = Number(number);
		}
		return number;
	},

	// 除法函数，用来得到精确的除法结果
	// 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
	// 调用：divide(arg1,arg2)
	// 返回值：arg1除以arg2的精确结果
	// 不支持科学计数法, 形如: 2e10 ;

	divide(arg1, arg2) {
		// 两个数字  如果小数位数不够要补0
		let n1 = arg1.toString();
		let n2 = arg2.toString();
		let t1 = (n1.split('.')[1] || '').length;
		let t2 = (n2.split('.')[1] || '').length;
		// 1: 明确哪个数字需要补零,
		// 1.1:如果位数相同, 那就不需要补零 直接返回n1 n2
		if (t1 === t2) {
			return Number(n1.replace('.', '')) / Number(n2.replace('.', ''));
		}
		// 1.2: 如果位数不相同, 那就找到需要补零的那个数
		const isN1 = t2 > t1;
		// 2:明确补几个零
		const zeroNum = Math.abs(t1 - t2); //
		let n = 0;
		if (isN1) {
			while (zeroNum > n) {
				n1 += '0';
				n++;
			}
		} else {
			while (zeroNum > n) {
				n2 += '0';
				n++;
			}
		}
		return Number(n1.replace('.', '')) / Number(n2.replace('.', ''));
	},
	/**
	 * 将0.xxx 转换为百分比
	 * @param {float} num 浮点数
	 */
	translatePercentage(num) {
		return (num * 100).toFixed(2) + '%';
	},
	/**
	 *  四舍五入获取数据
	 *  num 要转换的数字
	 *  n 位数,默认为2
	 *  是否补0 默认为false
	 */
	 round(num, n = 2, needAddZero = false) {
		let f = Number(num);
		if (isNaN(f)) {
			// 如果传入的为非数字
			return NaN;
		}
		f = Math.round(num * Math.pow(10, n)) / Math.pow(10, n); // n次幂
		let s = f.toString();

		if (needAddZero) {
			let rs = s.indexOf('.');
			//判定如果是整数，增加小数点再补0
			if (rs < 0) {
				rs = s.length;
				s += '.';
			}
			while (s.length <= rs + n) {
				s += '0';
			}
		}
		return s;
	},
};

module.exports = zktMath;
