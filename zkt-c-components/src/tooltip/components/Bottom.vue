<template lang="html">
  <div
    class="tooltip fade bottom in"
    :class="{'white-bg': background==='white'}"
    :style="{'width': tipWidthPx, 'margin-left': marginLeftPx}">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner" v-html="safeContent"></div>
  </div>
</template>

<script>
import Base from './Base.vue'
export default {
  name: "Bottom",
  extends: Base,
  computed: {
    marginLeftPx () {
      return (- this.tipWidth / 2) + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.tooltip.bottom {
  position: absolute;
  top: 100%;
  left: 50%;
  margin-top: 2px;
}
.tooltip.white-bg>.tooltip-arrow {
  border-bottom-color: #e5e9f2;
}
.tooltip.white-bg.bottom>.tooltip-arrow:after{
  top: 1px;
  left: -5px;
  border-top-width: 0;
  border-bottom-color: #fff;
}
</style>
