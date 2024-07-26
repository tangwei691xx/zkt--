import Vue from 'vue/dist/vue.esm.js'
import App from './App.vue'
import Demo from './Demo.vue'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import ZktForm from 'zkt-form'
import "bootstrap/dist/css/bootstrap.css"
window._ = require('lodash')

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.component('zkt-form', ZktForm)
Vue.config.productionTip = false

const routes = [
  {
    path: '/list',
    component: {
      template: '<div><h1>列表</h1><a href="#/add">创建</a><a href="#/edit/5">查看详情</a></div>'
    }
  },
  {
    path: '/add',
    component: Demo
  },
  {
    path: '/:mode/:pid',
    component: Demo
  }
]

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
