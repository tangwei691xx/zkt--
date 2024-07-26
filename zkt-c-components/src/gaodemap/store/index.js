import { getInitialState } from './static'
import { actions } from './actions'
import { mutations } from './mutations'
import { getters } from './getters'
const state = getInitialState()

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
