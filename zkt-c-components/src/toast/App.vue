<template>
  <div id="app">
      <button type="button" class="btn btn-default" @click="toast">click</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created () {
    this.toast()
  },
  methods: {
    toast () {
      this.$toast({
        callback () {
          console.log('结束了')
        },
        title: 'asdfadfa',
        message: '操作成功',
        type: 'warning',
        position: 'topRight',
        autoClose: false
      })
    }
  }
}
</script>
