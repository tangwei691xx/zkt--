import { types } from './static'
export const actions = {
  [types.getData] ({ dispatch, commit }, args = {}) {
    return dispatch('javaApi', {
      method: "get",
      url: "/wxa-admin/thirdparty/app/get_by_code",
      params: args
    }, { root: true })
      .then((data) => {
        return data
      })
  }
}
