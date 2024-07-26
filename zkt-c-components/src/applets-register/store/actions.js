import { types } from './static'
const apiUrl = {
  'getAppletStatus': 'wxa-admin/admin/applet_status/applet_base_status',
  'authorization': 'wxa-admin/admin/applet_status/authorization',
  'register': 'wxa-admin/admin/applet_status/register',
  'insert': 'wxa-admin/admin/base_config/insert',
  'updateRegister': 'wxa-admin/admin/base_config/update_register_status'
}
export const actions = {
  [types.UN_REGISTER_MODULE] ({ dispatch, commit }, args = {}) {
    commit(types.UN_REGISTER_MODULE, {})
  },
  [types.updateAppletStatus] ({ commit }, args = {}) {
    commit(types.getAppletStatus, args)
  },
  // 是否注册
  [types.register] ({ dispatch, commit, rootState }, args = {}) {
    let obj = Object.assign({
      brandId: rootState.allBrandRelation[0].brand_id,
      platformType: 0
    }, args)
    return dispatch('javaApi', {
      method: 'get',
      url: apiUrl.register,
      params: obj
    }, { root: true })
      .then((data) => {
        commit(types.register, data)
        return data
      })
  },
  // 已授权 调后台接口
  [types.insert] ({ dispatch, commit, rootState }, args = {}) {
    let obj = Object.assign({
      brandId: rootState.allBrandRelation[0].brand_id,
      hotelId: rootState.allBrandRelation[0].hotel_id,
      status: 1,
      platformType: 0,
      appId: rootState.allBrandRelation[0].app_id,
      appletAppId: rootState.allBrandRelationForApplets[0].app_id
    }, args)
    return dispatch('javaApi', {
      method: 'post',
      url: apiUrl.insert,
      body: obj
    }, { root: true })
      .then((data) => {
        return data
      })
  },
  // 已注册调后台接口
  [types.updateRegister] ({ dispatch, commit, rootState }, args = {}) {
    let obj = Object.assign({
      brandId: rootState.allBrandRelation[0].brand_id,
      hotelId: rootState.allBrandRelation[0].hotel_id,
      status: 3,
      platformType: 0 // 微信 0  抖音1
    }, args)
    return dispatch('javaApi', {
      method: 'post',
      url: apiUrl.updateRegister,
      body: obj
    }, { root: true })
      .then((data) => {
        return data
      })
  },
  [types.getAppletStatus] ({ dispatch, commit, rootState }, args = {}) {
    return dispatch('javaApi', {
      method: 'get',
      url: apiUrl.getAppletStatus + '?brandId=' + rootState.allBrandRelation[0].brand_id,
      params: {
        platformType: 0,
        ...args
      }
    }, { root: true })
      .then((data) => {
        commit(types.getAppletStatus, data)
        return data
      })
  },
  // 是否公众号授权
  [types.authorization] ({ dispatch, commit, rootState }, args = {}) {
    let obj = Object.assign({
      appId: rootState.allBrandRelation[0].app_id || '',
      platformType: 0
    }, args)
    return dispatch('javaApi', {
      method: 'get',
      url: apiUrl.authorization,
      params: obj
    }, { root: true })
      .then((data) => {
        commit(types.authorization, data)
        return data
      })
  }
}
