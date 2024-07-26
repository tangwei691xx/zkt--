module.exports = {
  /**
   * @todo 先从cookie中取，后期改成从session中获得
   * 获取当前人的会员ID
   */
  getCurrentMemberId () {
    const memberId = zkt.cookie.get('member_id');
    return memberId;
  },


  /**
   * 获取当前用户的UnionId，可能会存在空的情况
   */
  async getCurrentMemberUnionIdByOpenIdAppId() {
    const res = await z.request.fetchHome('getFansByOpenIdAppId', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return res && res.data && res.data.unionId || '';
  }
}