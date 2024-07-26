<template>
  <div class="fidx">
    <div>{{ value[name] }}</div>
    <div v-if="showrp" class="tag-style">多RP</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      defatul () {
        return {}
      }
    },
    name: {
      type: String,
      defatul: ''
    }
  },
  computed: {
    showrp () {
      // 如果有rp就显示
      if (this.value.rpNames && this.value.rpNames.length > 1) {
        return true
      }
      return false
    }
  }
}
</script>

<style scoped>
.tag-style {
  color: #d84423;
  margin: 0px 6px;
}
.fidx {
  display: flex;
}
</style>