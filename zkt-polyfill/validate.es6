const regexps = require("./regexps.es6");
/**
 * description 验证集合
 */
module.exports = {
	/**
	 * 姓名验证
	 *
	 * @param name 姓名字符串
	 * @param throwError
	 */
	validateName(name, throwError = false) {
		let legal = true;
		if (
			!name ||
			!regexps.buyMemberName.test(name) ||
			name.length > 60 ||
			!name.trim()
		) {
			legal = false;
		}
		if (throwError && !legal) {
			z.Toast("请正确输入姓名信息");
		}
		return legal;
	},
};
