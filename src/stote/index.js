import Vue from 'vue'
import Vuex from 'vuex'
import LandingPage from './modules/LandingPage'
import Monitoring from './modules/Monitoring'
import moveEnd from './moveEnd/essemtial'
import createLogger from 'vuex/dist/logger'
Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  // 我
  // strict: false,
  modules: {
    LandingPage, Monitoring,moveEnd,
  },
  headerData:[],
  // strict: debug, 
  plugins: debug ? [createLogger()] : []
})
