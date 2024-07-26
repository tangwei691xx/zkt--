import { types, getInitialState } from './static'
export const mutations = {
  [types.getData] (state, data) {
    state.data.data = data
  },
  UN_REGISTER_MODULE (state, data) {
    state = Object.assign(state, getInitialState())
  }
}
