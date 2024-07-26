<template>
  <modal :title="`请输入${isFolder ? '文件夹' : '文件'}名称`" @close="$emit('close')">
    <div class="form-group" :class="{'has-error': isError}">
      <input type="text" class="form-control" :maxlength="maxlength" v-model.trim="currentValue" />
      <span v-if="isError" class="help-block">最多{{maxlength}}个字符, {{isFolder ? '文件夹' : '文件'}}{{regexpText}}</span>
    </div>
    <div class="text-center" slot="footer">
      <button type="button" @click="handleClick" :disabled="loading || !currentValue || isError" class="btn btn-primary">保存</button>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal.vue'
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    maxlength: {
      type: Number,
      default: 20
    },
    isFolder: {
      type: Boolean,
      default: false
    },
    regexp: {
      type: RegExp,
    },
    regexpText: {
      type: String
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  components: {
    Modal
  },
  data() {
    return {
      currentValue: this.value,
    }
  },
  computed: {
    isError(){
      return this.currentValue && (this.currentValue.length > this.maxlength || !this.regexp.test(this.currentValue))
    }
  },
  watch: {
    value(value, oldValue) {
      if(value !== oldValue){
        this.currentValue = value;
      }
    },
  },
  methods: {
    handleClick(){
      this.$emit('submit', this.currentValue)
    }
  }
}
</script>

<style>
</style>
