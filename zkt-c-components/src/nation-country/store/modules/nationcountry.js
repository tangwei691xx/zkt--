function getInitialState () {
  return {
    data: {
    }
  }
}

const state = getInitialState()

const actions = {
  getNationCountryData ({dispatch, commit, state}, args = {}) {
    return dispatch('javaApi', {
      method: 'get',
      url: 'cms-api/dict/getDictByType',
      params: args
    })
    .then((data) => {
      return data
    })
  }
}

const mutations = {
  UN_REGISTER_MODULE (state) {
    state = Object.assign(state, getInitialState())
  },
  UPDATE (state, data) {
    state.data = data
  }
}

const getters = {
}

export default {
  state,
  actions,
  mutations,
  getters
}
