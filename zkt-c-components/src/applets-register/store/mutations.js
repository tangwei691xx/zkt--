import { types, getInitialState } from './static'

export const mutations = {
  [types.UN_REGISTER_MODULE] (state) {
    state = Object.assign(state, getInitialState())
  },
  [types.register] (state, data) {
    state.data.registerStatus = data
  },
  [types.getAppletStatus] (state, data) {
    state.data.appletStatus = data + ''
  },
  [types.updateAuthStatus] (state) {
    state.data.appletRegister = true
    state.data.appletManager = true
    state.data.platformRegister = true
  },
  [types.authorization] (state, data) {
    if (data.appletRegister) {
      state.data.appletRegister = true
    }
    if (data.appletManager) {
      state.data.appletManager = true
    }
    if (data.platformRegister) {
      state.data.platformRegister = true
    }
  }
}
