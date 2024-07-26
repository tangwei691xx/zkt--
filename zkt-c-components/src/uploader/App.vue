<template>
  <div id="app">
    <Com 
    :multiple="true"
    :preview="true"
    :allows="allows"
    :maxSize="500"
    :limit="20"
    :legacy="false"
    :maxKeys="1000"
    :originName="true"
    v-model="data"
    @input="uploadCallBack"></Com>
  </div>
</template>

<script>
import Com from './components/index.vue'
export default {
  name: 'app',
  components: {
    Com
  },
  data () {
    return {
      allows: 'png,jpeg,jpg',
      multiple: true,
      data: []
    }
  },
  methods: {
    // 上传回调
    uploadCallBack (url) {
       console.log(url)
      let _this = this
      if (url) {
        console.log(url)
      }
    }
  }
}
</script>

<style lang="less">
</style>
