<template>
  <div class="checkbox-wrapper">
    <label v-if="checkAll" class="checkbox">
      <a @click="selectAll">全选</a>/<a @click="deSelectAll">反选</a>
    </label>
    <label
      class="checkbox-inline zkt-checkbox-inline"
      :class="{'checkbox-disabled': (disabled || option.disabled), 'is-checked': (val instanceof Array && val.includes(option[optionValueName]) || val === trueValue), 'is-disabled': (val instanceof Array && val.includes(option['disabled']) || disabled)}"
      v-for="option in options"
      :key="option.value"
    >
      <input
        type="checkbox"
        v-model="val"
        v-on="listeners"
        :value="option[optionValueName]"
        :name="name"
        :true-value="trueValue"
        :false-value="falseValue"
        :disabled="disabled || option.disabled">
      <span>{{option[optionKeyName]}} </span>
      <i
        v-if="option.icon"
        :class="option.icon.className"
        :frame_name="option.icon.frame_name || ''"
        v-zkt-tooltip="{
          type: option.icon.type || 'popover',
          placement: option.icon.direction,
          content: option.icon.html
        }"
      ></i>
    </label>
  </div>
</template>
<script>
  import Base from './Base.vue'
  export default {
    name: 'Checkbox',
    extends: Base,
    props: {
      name: {
        type: String,
        default: ''
      },
      options: {
        type: Array
      },
      value: {},
      trueValue: {
        default: true
      },
      falseValue: {
        default: false
      },
      disabled: {
        default: false
      },
      checkAll: {
        default: false
      }
    },
    methods: {
      selectAll () {
        this.val = this.options.map((option) => {
          return option[this.optionValueName]
        })
        this.$emit('change',this.val)
      },
      deSelectAll () {
        let set = new Set(this.val)
        this.val = this.options
        .map((option) => {
          return option[this.optionValueName]
        })
        .filter((option) => {
          return !set.has(option)
        })
        this.$emit('change',this.val)
      }
    }
  }
</script>

<style>
  .checkbox-wrapper {
    width: 100%;
  }
  .checkbox-inline {
    margin-right: 20px;
  }
  .checkbox-disabled{
    color:#aaa;
  }
  i{
    color:#bfbfbf;
    font-size: 12px;
    font-weight: normal;
  }
</style>
