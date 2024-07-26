<template>
  <div class="root">
    <div :id="value.id" :style="value.style"></div>
  </div>
</template>
<script>
import * as echarts from 'echarts'
import 'echarts/map/js/china.js'
export default {
  name: 'echart-area',
  props: {
    value: {
      type: Object,
      default: {
        id: '',
        option: {},
        style: ''
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    setEcart () {
      this.$nextTick(() => {
        var dom = document.getElementById(this.value.id)
        if (dom) {
          var myChart = echarts.init(dom)
          if (this.value.option && typeof this.value.option === 'object') {
            myChart.resize()
            myChart.clear()
            myChart.setOption(this.value.option, true)
          }
        }
      })
    }
  },
  mounted () {
    this.setEcart()
  },
  watch: {
    value: {
      handler: function () {
        this.setEcart()
      },
      deep: true,
      immediate: true
    }
  }
}
</script>
<style scoped>
.root {
  float: left;
  width: 100%;
}
</style>
