import { types } from './static'
import getDataAjax from '../settlement-api/supplier/account/trans/detail/ajax'
export const actions = {
  [types.getData] ({ dispatch, commit }, args = {}) {
    // commit(types.getData, [{ a: 1, store: { link: 'http://www.baidu.com' } }])
    // return [{ a: 1, store: { link: 'http://www.baidu.com' } }]

    return dispatch('javaApi', {
      method: getDataAjax.method,
      url: getDataAjax.url,
      params: args
    }, { root: true })
      .then((data) => {
        commit(types.getData, data)
        return data
      })
  }
}
