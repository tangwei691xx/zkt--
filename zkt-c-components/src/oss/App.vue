<template>
  <div id="app">
    <explorer
     v-if="client"
     v-model="objects"
     :multiple="true"
     :path="path"
     :limit="5"
     :client="client"
     :maxSize="52428800"
     @select="onSelect">
   </explorer>
   <select-tree :client="client"></select-tree>
  </div>
</template>

<script>
import Explorer from './container/Explorer.vue'
import SelectTree from './container/SelectTree.vue'
import OSS from './services/regulate'

export default {
  name: 'app',
  components: {
    Explorer,
    SelectTree,
  },
  data () {
    let host = location.host.indexOf('localhost') > -1 ? 'zhiketong.net' : location.host.replace('ebooking','ebgate')
    return {
      clientConfig: null,
      token: localStorage.token,
      path: '',
      baseURL: `http://ebgate.${host}.net/api/oss-api/eb/oss/`,
      objects: [],
      meta: {},
      client: null
    }
  },
  methods: {
    onSelect (object) {
      // console.log('onSelect', object)
    }
  },
  created () {
    var str = window.atob(localStorage.token)
    var params = JSON.parse(str).params
    params = JSON.parse(params)
    this.path = `h${params.hotel_id}/`
    this.meta.uid = params.user_id
    this.meta.hid = params.hotel_id

    this.client = new OSS({
      baseURL: 'http://ebgate.zhiketong.net/api/oss-api/eb/oss/',
      params: {
        hotelId: 5,
        brandId: 5
      }
    })
  }
}
</script>

<style>
</style>
