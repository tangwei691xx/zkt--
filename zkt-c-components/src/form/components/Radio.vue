<template>
  <span class="radio-wrapper" v-on="listeners" v-if="options.length">
    <label class="radio-inline zkt-radio-inline"
      :class="{'radio-disabled': (disabled || option.disabled), 'is-checked': val === option[optionValueName], 'is-disabled': (disabled || option.disabled)}"
      v-for="option in options"
      :key="option.value"
    >
        <input
          type="radio"
          v-model="val"
          :value="option[optionValueName]"
          :name="name"
          :disabled="disabled || option.disabled">
        <span>{{option[optionKeyName]}}</span>
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
  </span>
</template>
<script>
  import Base from './Base.vue'
  export default {
    name: 'Radio',
    extends: Base,
    props: {
      name: {
        type: String,
        default: ''
      },
      options: {
        type: Array,
        default: () => []
      },
      disabled: {
        default: false
      }
    }
  }
</script>

<style>
.radio-inline {
  margin-right: 20px;
}
.radio-disabled{
  color:#aaa;
}
i{
  color:#bfbfbf;
  font-size: 12px;
  font-weight: normal;
}
</style>

