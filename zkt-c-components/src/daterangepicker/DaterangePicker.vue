<template lang="html">
  <div class="date-range-picker-warp" v-if="optionsChange">
    <input
      v-bind="$attrs"
      ref="zkt-range-input"
      :class="inputClass"
      type="text"
      v-model="value">
    <i :class="clearIcon" v-if="clearIcon&&value" @click.stop="clearData"></i>
  </div>
</template>

<script>
import $ from 'jquery'
import './assets/jquery.daterangepicker.min'

export default {
  name: 'DaterangePicker',
  inheritAttrs: false,
  props: {
    clearIcon: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      defalut: ''
    },
    inputClass: {
      type: String,
      default: 'form-control readonly-free'
    },
    options: {
      type: Object,
      default () {
        return {
          showShortcuts: true,
          separator:' 至 ',
          endDate: new Date(),
          stickyMonths: true,
          format: 'YYYY-MM-DD HH:mm:00',
          format2: 'YYYY-MM-DD HH:mm:59',
          autoClose: false,
          language:'cn',
          time: {
              enabled: true
          }
        }
      }
    }
  },
  data () {
    return {
      optionsChange: true
    }
  },
  watch: {
    options: {
      deep: true,
      handler(newConfig) {
        this.resetDaterangePicker()
      }
    }
  },
  methods: {
    /**
     * 日期改变事件
     */
    onChange(evt, obj) {
      this.$emit('input', obj.value);
      this.$emit('change', obj.value);
    },
    /**
     * 清除日期
     */
    clearData () {
      this.$emit('input', '');
      this.$emit('change', '');
    },
    /**
     * options变化 重置
     */
    resetDaterangePicker () {
      $(this.$refs['zkt-range-input']).data('dateRangePicker').destroy()
      this.bindDaterangePicker()

    },
    /**
     * 绑定事件
     */
    bindDaterangePicker () {
      var el = $(this.$refs['zkt-range-input']).dateRangePicker(this.options)
      el.bind('datepicker-change', this.onChange)
    }
  },
  /**
   * 页面加载完成 进行绑定
   */
  mounted() {
    this.bindDaterangePicker()
    this.$nextTick()
    .then(() => {
      this.$emit('input', this.value);
    })
  }
}
</script>

<style lang="css" scoped>
@import './assets/daterangepicker.min.css';
.date-range-picker-warp {
  position: relative;
}
.date-range-picker-warp i {
  position: absolute;
  top: 10px;
  left: 100%;
  margin-left: -24px;
}
.readonly-free {
  background: #fff !important;
}
</style>
<style>
.date-picker-wrapper .month-wrapper table .day.real-today{
  background-color: #fff !important;
  color: #333 !important;
  position: relative;
}
.date-picker-wrapper .month-wrapper table .day.real-today::before{
  content: '';
  border-width: 3px;
  position: absolute;
  height: 5px;
  width: 5px;
  border-color: #4c68ef #4c68ef transparent transparent;
  border-width: 3px;
  border-style: solid;
  right: 0;
  top: 0;
}
.date-picker-wrapper{
  background: #fff !important;
}
.date-picker-wrapper a{
  color: #4c68ef !important;
  text-decoration: none !important;
}
.date-picker-wrapper .next-days {
  color: #bfbfbf !important;
}
.date-picker-wrapper .drp_top-bar .apply-btn{
  background-color: #4c68ef !important;
  border-color: #4c68ef !important;
  right: 10px
}
.date-picker-wrapper .first-date-selected{
  border-radius: 50% 0 0 50%;
}
.date-picker-wrapper  .month-wrapper{
  border: none;
}
.date-picker-wrapper .last-date-selected{
   border-radius: 0px 50% 50% 0px;
}
.date-picker-wrapper .first-date-selected.last-date-selected{
  border-radius: 50%;
}
.date-picker-wrapper .month-wrapper{
  padding: 5px 12px !important;
}
.date-picker-wrapper .month-wrapper table .day{
  padding: 7px 0;
}
.date-picker-wrapper .drp_top-bar.normal .normal-top .selection-top,
.date-picker-wrapper .month-wrapper table .week-name,
.date-picker-wrapper table .caption .next,
.date-picker-wrapper table .caption .prev,
.date-picker-wrapper .month-wrapper table .day.toMonth,
.date-picker-wrapper b{
  color: #808080 !important;
}
.date-picker-wrapper .month-wrapper table td,
.date-picker-wrapper .month-wrapper table th,
.date-picker-wrapper b{
  font-weight: 3500;
}
.date-picker-wrapper .drp_top-bar.normal .normal-top .start-day,
.date-picker-wrapper .drp_top-bar.normal .normal-top .separator-day,
.date-picker-wrapper .drp_top-bar.normal .normal-top .end-day,
.date-picker-wrapper .month-element{
color: #333333 !important;
}
.date-picker-wrapper .drp_top-bar.normal .normal-top .selected-days{
color: #bfbfbf !important;
font-style:normal;
}
.date-picker-wrapper .month-wrapper table .day.checked,.date-picker-wrapper .month-wrapper table .day.toMonth.hovering{
  color: #fff !important;
  background-color: #4c68ef !important;
}
.date-picker-wrapper .selection-top{
  margin-right:10px;
}
.date-picker-wrapper input.form-control:focus{
  box-shadow: none !important;
}
.date-picker-wrapper .drp_top-bar.normal .normal-top .end-day {
  margin-right: 5px
}
.date-picker-wrapper{
  padding: 0px 0px !important;
  margin-top: 10px;
  box-shadow: none;
  border-radius: 5px;
}
.date-picker-wrapper .drp_top-bar{
  display: flex;
  padding: 14px 60px 14px 20px;
  border-radius: 5px 5px 0 0;
  background: #f8f9fb !important;
}
.date-picker-wrapper .footer .shortcuts{
  border-top: 1px solid #e0e0e0;
  text-indent: 10px;
  padding: 10px 10px
}
.date-picker-wrapper .hour label,
.date-picker-wrapper .minute label{
  color: #808080 !important;
  font-weight: 300;
}
.date-picker-wrapper input[type="range"] {
  /*-webkit-box-shadow: 0 1px 0 0px #424242, 0 1px 0 #060607 inset, 0px 2px 10px 0px black inset, 1px 0px 2px rgba(0, 0, 0, 0.4) inset, 0 0px 1px rgba(0, 0, 0, 0.6) inset;*/
  -webkit-appearance: none; /*去除默认样式*/
  margin-top: 42px;
  background-color: #4c68ef;
  border-radius: 15px;
  width: 80% !important;
  -webkit-appearance: none;
  height:4px!important;
  padding: 0;
  border: none;
  outline: none;
  /*input的长度为80%，margin-left的长度为10%*/
}
.date-picker-wrapper input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;/*去除默认样式*/
  cursor: default;
  top: 0;
  height: 15px;
  width: 15px;
  transform: translateY(0px);
  /*background: none repeat scroll 0 0 #5891f5;*/
  background: #fff;
  border-radius: 50%;
  border: 4px solid #4c68ef;
  /*-webkit-box-shadow: 0 -1px 1px #fc7701 inset;*/
}
.date-picker-wrapper .month-wrapper table .day.toMonth.invalid{
  color: #afafaf !important;
}
</style>
