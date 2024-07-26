<template>
  <modal
    title="删除"
    @close="handleClose"
  >
    <div class="text-center">
      <h4 v-if="force">是否一并删除文件夹中的所有内容？</h4>
      <h4 v-else>确定删除所选{{isMulti ? '文件/文件夹' : (isFolder ? '文件夹' : '文件')}}？</h4>
    </div>
    <div class="text-center" slot="footer">
      <button type="button" class="btn btn-default" @click="handleClose">取消</button>
      <button type="button" class="btn btn-primary" :disabled="loading || disabled" @click="handleClick(force)">
        {{force ? '仍要删除' : '确定'}}
        <count-down v-if="disabled" :time="1 * 1000" @end="handleEnd">
          <template slot-scope="props">({{ props.seconds }}s)</template>
        </count-down>
      </button>
    </div>
  </modal>
</template>

<script>
import Modal from './Modal.vue'
import CountDown from './CountDown'
export default {
  props: {
    isMulti: {
      type: Boolean,
      default: false
    },
    isFolder: {
      type: Boolean,
      default: false
    },
    force: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  components: {
    Modal,
    CountDown
  },
  data(){
    return {
      disabled: false,
      times: 0,
    }
  },
  watch: {
    force: {
      handler(value){
        if(value){
          this.disabled = true;
        }
      },
      immediate: true
    },
  },
  methods: {
    handleClose(){
      this.$emit('close');
    },
    handleClick(force){
      this.$emit('submit', force);
    },
    handleEnd () {
      this.disabled = false;
    }
  }
}
</script>

<style>
</style>
