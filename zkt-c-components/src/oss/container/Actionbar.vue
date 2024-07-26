<template lang="html">
  <div
    class="btn-toolbar explorer-actionbar clearfix"
    role="actionbar"
  >
    <template v-if="currentValue">
      <div class="btn-group btn-group-xs">
        <div class="checkbox">
          <label>
            <input type="checkbox" :checked="checkAll" @change="handleChange">全选 已选中 {{quantity}} 个文件/文件夹
          </label>
        </div>
      </div>
      <div class="btn-group btn-group-xs">
        <button @click="handleMoveClick" class="btn btn-default">
          <i class="glyphicon glyphicon-move"></i> 移动到
        </button>
        <button @click="handleRemoveClick" class="btn btn-default">
          <i class="glyphicon glyphicon-trash"></i> 删除
        </button>
      </div>
    </template>
    <div class="btn-group btn-group-xs">
      <button @click="handleClick" class="btn btn-default">
        {{currentValue ? '取消' : '编辑'}}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Actionbar',
  props: {
    quantity: {
      type: Number,
      default: 0
    },
    value: {
      type: Boolean,
      default: false
    },
    checkAll: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return {
      currentValue: this.value,
    }
  },
  watch: {
    value(value, oldValue){
      if(value !== oldValue){
        this.currentValue = value;
      }
    },
    currentValue(value) {
      this.$emit('input', value)
    },
  },
  methods: {
    handleClick () {
      this.currentValue = !this.currentValue;
    },
    handleMoveClick () {
      this.$emit('move')
    },
    handleRemoveClick () {
      this.$emit('remove')
    },
    handleChange(ev){
      const value = ev.target.checked
      this.$emit('checkAll', value)
    }

  }
}
</script>

<style lang="css">
  .explorer-actionbar{
    padding: 8px 15px;
  }
  .explorer-actionbar .checkbox{
    margin: 0;
  }
  .explorer-actionbar .checkbox label{
    margin: 2px 0 0;
    font-size: 12px;
    vertical-align: top;
  }

  .explorer-actionbar .checkbox input[type="checkbox"]{
    margin-top: 1px;
    vertical-align: top;
  }
</style>
