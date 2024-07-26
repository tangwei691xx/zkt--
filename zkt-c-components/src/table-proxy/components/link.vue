<template>
  <div class="row" style="margin:0">
    {{value}}自定义组件
  </div>
</template>
<script>
export default {
  name: 'Tmodal',
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  }
}
</script>
<style scoped>
</style>
