<template>
  <div class="explorer-tree">
    <el-tree
      :data="data"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :expand-on-click-node="false"
      :default-expanded-keys="defaultExpandedKeys"
      node-key="ossDisplayId"
      ref="tree"
      iconClass="glyphicon glyphicon-chevron-right"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>
          <i
            class="glyphicon"
            :class="{
              'glyphicon-folder-open': currentValue === data.ossDisplayId,
              'glyphicon-folder-close': !(currentValue === data.ossDisplayId),
              'is-active': currentValue === data.ossDisplayId
            }"
          ></i>{{ node.label }}
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import ElTree from "./Tree/tree";

export default {
  name: "ExplorerTree",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {},
    spaces: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    ElTree
  },
  data() {
    return {
      defaultProps: {
        children: "subNode",
        label: "displayName"
      },
      currentValue: null,
    };
  },
  watch: {
    value(value, oldValue){
      if(value !== oldValue){
        this.currentValue = value;
      }
    },
    currentValue(value) {
      this.$emit('input', value)
      this.$emit('paths', value != null ? this.getPaths(value) : null)
    },
  },
  computed: {
    defaultExpandedKeys(){
      return this.currentValue != null ? [this.currentValue] :  []
    }
  },
  created(){
    this.currentValue = this.value;
  },
  methods: {
    handleNodeClick(data) {
      this.currentValue = data.ossDisplayId
    },
    getPaths (value) {
      let current = this.$refs.tree.getNode(value);
      const paths = [];

      while(current.parent){
        paths.unshift(current.data);
        current = current.parent;
      }

      return paths;
    },
    appendNode(data, parentNode) {
      this.$refs.tree.append(data, parentNode)
    },
    removeNode(data) {
      this.$refs.tree.remove(data)
    },
    moveNode(data, parentNode) {
      const { data: newData } = this.$refs.tree.getNode(data)
      this.removeNode(data)
      this.appendNode(newData, parentNode)
    },
    setNode(data, key, value) {
      const node = this.$refs.tree.getNode(data)
      this.$set(node.data, key, value)
    }
  }
};
</script>

<style>
  .explorer-tree{

  }
  .explorer-tree .el-tree{
    display: inline-block;
    min-width: 100%;
  }
  .explorer-tree .glyphicon{
    top: 0;
  }
  .explorer-tree .custom-tree-node .glyphicon{
    margin-right: 5px;
    padding: 5px 0;
  }
  .explorer-tree .custom-tree-node .glyphicon.is-active{
    color:#b73636;
  }
</style>
