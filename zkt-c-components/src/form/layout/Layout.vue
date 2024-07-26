<template lang="html">
  <div class="form-layout">
    <div class="form-group clearfix"
      v-for="row in fields"
      v-if="!row.group"
      v-show="_visible(row)"
      @click="$emit('update:field', row)"
      :key="row.name"
      :ref="row.name"
      :class="[row.name==field.name&&'active', 'form-group-'+row.name, row.classSubTitle ? row.classSubTitle : '']"
    >
      <label class="control-label zkt-control-label"  :class="'col-sm-'+row.textindentColumn" v-if="row.textindentColumn">&nbsp;</label>
      <label  class="control-label zkt-control-label" :class="'col-sm-'+labelColumn" v-if="row.label">
        <span class="text-required" v-if="validation[row.name]">
          <span v-if="_showRequired(validation,row, value)">*</span>
        </span>
        {{row.label}}
        <i
          v-if="row.icon"
          :class="row.icon && row.icon.iconClass"
          :style="row.icon && row.icon.style"
          v-zkt-tooltip="{
            placement: row.icon && row.icon.direction,
            type: (row.icon && row.icon.type) || 'popover',
            content: (row.icon && row.icon.content) || ''
          }"
        ></i>
        <div v-if="row.secondLabel">{{row.secondLabel}}</div>
      </label>
      <div class="row zkt-control-row" :class="row.label&&'col-sm-'+(12-labelColumn-(Number(row.textindentColumn) ? row.textindentColumn : 0))">
          <slot :name="row.name"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import typeOf from '../utils/typeOf'
export default {
  name: 'Layout',
  inheritAttrs: false,
  inject: ['current'],
  props: {
    fields: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: Object,
      default () {
        return {}
      }
    },
    field: {
      type: Object,
      default () {
        return {}
      }
    },
    validation: {
      type: Object,
      default () {
        return {}
      }
    },
    textindentColumn: {
      type: Number,
      default: 0
    },
    labelColumn: {
      type: Number,
      default: 2
    }
  },
  methods: {
    getGroup (name) {
      return this.$refs[name] && this.$refs[name][0]
    },
    _visible (field) {
      if (typeOf(field.visible) === 'function') {
        return field.visible(this.value, field)
      }
      if (!field.dependOnName) return true
      return this.value[field.dependOnName]===field.dependOnValue
    },
    _showRequired (validation, row, value) {
      var requiredIf = validation[row.name].requiredIf
      if (validation[row.name].required) return true
      if (typeOf(requiredIf) == 'function') {
        return requiredIf(value)
      }
      if (typeOf(requiredIf) == 'string') {
        return !!value[requiredIf]
      }
      return false
    }
  }
}
</script>

<style>
.text-required {
  color: red;
}
.zkt-control-label {
  color: #777;
  font-weight: normal;
}
.zkt-control-row {
  color: #333;
}
</style>
