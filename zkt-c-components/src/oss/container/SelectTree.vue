<template>
  <div class="explorer-select-tree">
    <message ref="message" />
    <Tree v-if="data" :data="data" v-model="currentValue" @paths="handlePaths" />
  </div>
</template>

<script>
import Tree from './Tree.vue'
import Modal from './Modal.vue'
import Message from './Message.vue'
export default {
  props: {
    client: {
      type: Object,
      default: null
    },
    value: {
      type: Number,
    },
    private: {
      type: Boolean,
      default: false
    },
  },
  components: {
    Modal,
    Tree,
    Message
  },
  data(){
    return {
      currentValue: this.value,
      data: null
    }
  },
  watch: {
    value(value, oldValue){
      if(value !== oldValue){
        this.currentValue = value;
      }
    },
    currentValue(value){
      this.$emit('input', value)
    },
  },
  mounted(){
    this.getTree();
  },
  methods: {
    getTree() {
      const res = Promise.all([this.client.tree(true), this.client.tree()]).then((data) => {

        const newData = [];
        const [privateData, publicData] = data || [];
        const { ossDisplayId: publicOssDisplayId } = publicData || {}
        const { ossDisplayId } = privateData || {}

        if(privateData != null){
          newData.push(privateData)
        }
        if(publicOssDisplayId != null){
          newData.push(publicData)
        }

        this.data = newData;
        this.currentValue = (this.private && ossDisplayId != null) ? ossDisplayId : publicOssDisplayId || null;
      }).catch(err => this.showMessage(err.message));
      this.showMessage(res)
      return res;
    },
    handlePaths (paths) {
      this.$emit('paths', paths)
    },
    showMessage (message) {
      this.$refs.message.open(message)
    },
  }
}
</script>

<style>
  .explorer-select-tree{
    position: relative;
    max-height: 500px;
    min-height: 300px;
    overflow: auto;
  }
</style>
