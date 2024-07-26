module.exports = function getPageViewerUid() {
  let uid = '';
  try {
    if (window.USER_INFO) {
      uid = window.USER_INFO.user_id;
    } else if (zkt && zkt.cookie) {
      uid = zkt.cookie.get('member_id');
    }
  } catch (e) {
    console.error('获取用户页面标识出错');
  }
  return uid || (Math.random() * 10000 + Date.now());
}