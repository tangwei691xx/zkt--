<script>
import xssCustom from '../utils/xssCustom'
export default {
  name: "Base",
  props: {
    content: {
      type: String,
      default: ''
    },
    tipWidth: {
      type: String,
      default: '150'
    },
    background: {
      type: String,
      default: 'black'
    }
  },
  computed: {
    tipWidthPx () {
      if (this.tipWidth === 'auto') {
        return 'auto'
      }
      return this.tipWidth + 'px'
    },
    safeContent () {
        return xssCustom.process(this.content)
    }
  }
}
</script>
<style lang="css">
.tooltip-inner {
  max-width: none;
  padding: 15px 18px;
  font-size:14px;
  box-sizing: content-box;
}
.tooltip>.tooltip-arrow:after {
  content: " ";
  border-width: 5px;
  position: absolute;
  display: block;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.tooltip.white-bg>.tooltip-inner {
  border: 1px solid #e5e9f2;
  color: #333;
  background-color: #fff;
  box-shadow: 0 5px 15px #ededed;
}
</style>