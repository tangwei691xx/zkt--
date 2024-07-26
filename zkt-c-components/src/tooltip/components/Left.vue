<template lang="html">
  <div
    ref="left"
    class="tooltip fade left in"
    :class="{'white-bg': background==='white'}"
    :style="{'width':tipWidthPx,'margin-bottom':marginBottomPx}">
    <div class="tooltip-arrow"></div>
    <div class="tooltip-inner" v-html="safeContent"></div>
  </div>
</template>

<script>
import Base from './Base.vue'
export default {
  name: "Top",
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
      this.marginBottomPx = (- this.$refs['left'].clientHeight / 2) + 'px'
    }
  }
}
</script>

<style lang="less" scoped>
.tooltip.left {
  position: absolute;
  bottom: 50%;
  right: 100%;
  margin-right: 3px;
}
.tooltip.white-bg>.tooltip-arrow {
  border-left-color: #e5e9f2;
}
.tooltip.white-bg.left>.tooltip-arrow:after{
  right: 1px;
  top: -5px;
  border-right-width: 0;
  border-left-color: #fff;
}
</style>
