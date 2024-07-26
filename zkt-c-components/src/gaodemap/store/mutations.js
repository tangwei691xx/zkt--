import { types, getInitialState } from './static'
export const mutations = {
  UN_REGISTER_MODULE (state, data) {
    state = Object.assign(state, getInitialState())
  }
}
