import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
  },
  getters: {

  },
  mutations: {
    login(state, user) {
      state.user = user
    },
    exit(state) {
      state.user = {}
    },
    collect(state, id) {
      state.user.collect.push(id)
    },
    defCollect(state, index) {
      state.user.collect.splice(index, 1)
    }
  },
  actions: {
  },
  modules: {
  }
})
