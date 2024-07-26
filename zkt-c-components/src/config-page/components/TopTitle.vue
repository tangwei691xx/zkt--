<template lang="html">
    <div>
      <div class="clearfix title-container" :class="{borderBottom: titleInfo.borderBottom}">
        <span class="title_ pull-left">
          {{titleInfo.title}}
          <em class="title_tip" v-if="titleInfo.titleTip" v-html="titleInfo.titleTip"></em>
        </span>
  
        <div class="pull-right clearfix">
          <span class="text-right pull-left">{{titleInfo.rightText}}</span>
          <div class="pull-left">
            <slot name="btnLeft"></slot>
          </div>
          <div v-if="timeInfo.type" :class="['pull-'+(timeInfo.position || 'left')]" style="position:relative">
              <zkt-datetimepicker
              v-if="timeInfo.type=='time'"
              v-model="timeInfo.value"
              :disabled="timeInfo.disabled || false"
              :options="timeInfoOption"
              :style="timeInfoStyle"
              inputClass="form-control readonly-free"
              @input="onTimeChange"
              placeholder="请选择日期"/>
              <zkt-daterangepicker
              v-if="timeInfo.type=='range'"
              v-model="timeInfo.value"
              readonly='readonly'
              :disabled="timeInfo.disabled"
              :options="rangeInfoOption"
              :style="rangeInfoStyle"
              inputClass="form-control readonly-free"
              clear-icon="glyphicon glyphicon-remove"
              @change="onRangepicker"
              placeholder="请选择开始日期和结束日期"/>
          </div>
          <zkt-button-group class="btn-group-default pull-left" :buttons="buttonInfo" v-on="$listeners" />
          <div class="pull-right">
            <slot name="btnRight"></slot>
          </div>
        </div>
  
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'TopTitle',
    inheritAttrs: false,
    computed: {
      timeInfoStyle () {
        let defaultStyle = {
              width : '200px',
              // margin: '0 20px'
            }
        if(this.timeInfo.position === 'right'){
          defaultStyle['margin-left'] = '20px'
        }
        if(this.timeInfo.position === 'left'){
          defaultStyle['margin-right'] = '20px'
        }
        return Object.assign(defaultStyle,this.timeInfo.style)
      },
      rangeInfoStyle () {
        let defaultStyle = {
              width : '350px',
              // margin: '0 20px'
            }
        if(this.timeInfo.position === 'right'){
          defaultStyle['margin-left'] = '20px'
        }
        if(this.timeInfo.position === 'left'){
          defaultStyle['margin-right'] = '20px'
        }
        return Object.assign(defaultStyle,this.timeInfo.style)
      },
      rangeInfoOption () {
        let defaultOption =  {
              separator: ' 至 ',
              format: 'YYYY-MM-DD HH:mm:ss',
              language: 'cn',
              autoClose: true,
              time: {
                enabled: true
              }
        }
        return Object.assign(defaultOption,this.timeInfo.options)
      },
      timeInfoOption () {
        let defaultOption =  {
            format: 'YYYY-MM-DD HH:mm:ss',
            useCurrent: true,
            keepOpen: true
        }
        return Object.assign(defaultOption,this.timeInfo.options)
      }
    },
    props: {
      // 标题
      titleInfo: {
        type: Object,
        default () {
          return {}
        }
      },
      buttonInfo: {
        type: [Array, Object],
        default () {
          return {}
        }
      },
      timeInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    data () {
      return {
        text: ''
      }
    },
    methods: {
      onInput (val) {
        this.$emit('btn-event', val)
      },
      onRangepicker (date) {
        this.$emit('rangepicker', date)
      },
      onTimeChange (date) {
        this.$emit('timepicker', date)
      }
    }
  }
  </script>
    <style lang="less" scoped>
      @red: #FF0000;
      @color: #2679b5;
      .title_ {
        color: @color;
        font-size:24px;
      }
      .title-container {
        font-weight: normal;
        padding:15px 0 15px;
      }
      .title_tip {
        font-size: 14px;
        font-style: normal;
        color: #333333;
      }
      .borderBottom {
        border-bottom: 1px solid #eee;
      }
      .text-right {
        line-height: 34px;
      }
    </style>
  