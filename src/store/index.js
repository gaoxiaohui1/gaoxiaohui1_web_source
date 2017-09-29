import Vue from 'vue'
import Vuex from 'vuex'
import cmsUser from './modules/cmsUser'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    cmsUser
  },
  getters
})

export default store
