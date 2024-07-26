import { types } from './static'

export const getters = {
  [types.getAppletStatus] (state) {
    return state.data.appletStatus
  },
  [types.appletRegister] (state) {
    return state.data.appletRegister
  },
  [types.appletManager] (state) {
    return state.data.appletManager
  },
  [types.platformRegister] (state) {
    return state.data.platformRegister
  }
}
