<template lang="html">
  <div
    class="tooltip fade top in"
    :class="{'white-bg': background==='white'}"
    :style="{'width': tipWidthPx, 'margin-left': marginLeft}">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner" v-html="safeContent"></div>
  </div>
</template>

<script>
import Base from './Base.vue'
export default {
  name: "Top",
  extends: Base,
  computed: {
    marginLeft () {
      return (- this.tipWidth / 2) + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.tooltip.top {
  position: absolute;
  bottom: 100%;
  left: 50%;
  margin-bottom: 2px;
}
.tooltip.white-bg>.tooltip-arrow {
  border-top-color: #e5e9f2;
}
.tooltip.white-bg.top>.tooltip-arrow:after{
  bottom: 1px;
  left: -5px;
  border-bottom-width: 0;
  border-top-color: #fff;
}
</style>
