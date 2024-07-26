import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueResource from 'vue-resource'
import ZKTModal from 'zkt-modal'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueResource)
Vue.http.options.root = '//ebgate.zhiketong.net'
Vue.http.options.crossOrigin = true
Vue.http.options.xhr = {withCredentials: true}
Vue.http.headers.common.Authorization = localStorage.token

Vue.use(ZKTModal)
Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    constant: {
      DOMAIN_WEB_API_GATEWAY: 'ebgate.zhiketong.net'
    },
    token: localStorage.token,
    coreHotelConfig: {
      ENABLE_UPLOAD_CHECK: '1'
    }
  },
  getters: {
    auth () {
      return JSON.parse(JSON.parse(atob(localStorage.token)).params)
    }
  }
})

new Vue({
  el: '#app',
  render: h => h(App),
  store
})

// import com from './components/index.vue'

// export default com

