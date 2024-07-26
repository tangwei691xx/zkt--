function getInitialState () {
  return {
    demo: {}
  }
}

const state = getInitialState()

const actions = {
  /**
   * 获取中信退款二维码
   */
  getZhongxinQr ({dispatch, commit}, params) {
    return dispatch('javaApi', {
      method: 'post',
      url: 'payment-api/qr/param/query/url',
      params
    }, {root: true})
  }
}

const mutations = {
  UN_REGISTER_MODULE (state) {
    state = Object.assign(state, getInitialState())
  },
  UPDATE (state, data) {
    state.demo = data
  }
}

const getters = {
}

export default {
  namespaced: true, // 建议使用
  state,
  actions,
  mutations,
  getters
}
