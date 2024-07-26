import { types } from './static'

export const getters = {
  [types.getData] (state) {
    return state.data.data
  }
}
