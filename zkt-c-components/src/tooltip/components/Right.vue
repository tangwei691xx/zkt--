<template lang="html">
  <div
    ref="right"
    class="tooltip fade right in"
    :class="{'white-bg': background==='white'}"
    :style="{'width': tipWidthPx, 'margin-bottom':marginBottomPx}">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner" v-html="safeContent"></div>
  </div>
</template>

<script>
import Base from './Base.vue'
export default {
  name: "Right",
  extends: Base,
  data () {
    return {
      marginBottomPx: 0
    }
  },
  mounted() {
    this.updateMarginBottom()
  },
  updated() {
    this.updateMarginBottom()
  },
  methods: {
    updateMarginBottom () {
      this.marginBottomPx = (- this.$refs['right'].clientHeight / 2) + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.tooltip.right {
  position: absolute;
  bottom: 50%;
  left: 100%;
}
.tooltip.white-bg>.tooltip-arrow {
  border-right-color: #e5e9f2;
}
.tooltip.white-bg.right>.tooltip-arrow:after{
  left: 1px;
  top: -5px;
  border-left-width: 0;
  border-right-color: #fff;
}
</style>
