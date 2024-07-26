/** @format */
/**
 * @module zkt.route
 */
/**
 * 项目挂载路径
 *
 * @alias zkt.module:route.projectPath
 * @readonly
 * @property {string} shanghu 商户版路径
 * @property {string} home 会员中心
 * @property {string} ticket 预售券
 * @property {string} customize 自定义页面
 * @property {string} common 公共
 * @property {string} room 日历房
 */
const projectPath = {
  shanghu: '/v2',
  home: '/NewHome',
  ticket: '/Ticket',
  customize: '/Customizesnapshot',
  common: '/Common',
  room: '/Room',
};

module.exports = {
  projectPath,
};
