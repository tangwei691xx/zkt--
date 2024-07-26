<template>
  <modal
    title="移动到"
    @close="handleClose"
  >
    <div>
      <Tree v-if="data" :data="data" v-model="currentValue" />
    </div>
    <div class="text-center" slot="footer">
      <button type="button" class="btn btn-default" @click="handleClose">取消</button>
      <button type="button" class="btn btn-primary" :disabled="loading" @click="handleClick">确定</button>
    </div>
  </modal>
</template>

<script>
import Tree from './Tree.vue'
import Modal from './Modal.vue'
export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: Number,
    },
    loading: {
      type: Boolean,
      default: false
    },
  },
  components: {
    Modal,
    Tree
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
    }
  },
  methods: {
    handleClose(){
      this.$emit('close');
    },
    handleClick(){
      this.$emit('submit', this.currentValue);
    }
  }
}
</script>

<style>
</style>
