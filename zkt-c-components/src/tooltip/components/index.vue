<template lang="html">
  <div
    class="component-zkt-tooltip"
    @mouseover="mouseOver($event)"
    @mouseleave="mouseLeave($event)">
      <component
        :is="placement"
        v-bind="$attrs"
        v-if="showTip||always"
      ></component>
      <div v-on="$listeners">
        <slot></slot>
      </div>
  </div>
</template>

<script>
import Top from './Top.vue'
import Right from './Right.vue'
import Left from './Left.vue'
import Bottom from './Bottom.vue'
export default {
  name: "zkt-tooltip",
  props: {
    placement: {
      type: String,
      default: 'top'
    },
    always: {
      type: Boolean,
      default: false
    },
    hideAfter: {
      type: Number,
      default: 300
    }
  },
  components: {
    top: Top,
    right: Right,
    left: Left,
    bottom: Bottom
  },
  data () {
    return {
      showTip: false,
      showTimeout: false,
      event: {}
    }
  },
  methods: {
    mouseOver () {
      this.showTip = true
      this.showTimeout = true
    },
    mouseLeave () {
      this.showTimeout = false
      setTimeout(() => {
        this.showTip = this.showTimeout
      }, this.hideAfter)
    }
  }
}
</script>

<style lang="less">
.component-zkt-tooltip {
  position: relative;
  display: inline-block;
}
</style>
