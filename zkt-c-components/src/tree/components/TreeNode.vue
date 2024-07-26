<template>
  <div class="tree-container">
    <div
      class="tree-node"
      :class="{'menu_tree_node': node[cKey] && node[cKey].length }"
      v-for="node in data"
      v-show="node._show"
      :key="node.id">
      <div class="tree-content" :class="{'menu_tree_node': node[cKey] && node[cKey].length }" @click.stop="node._open=!node._open;onClick(node)">
        <i
          v-visiable="node[cKey] && node[cKey].length"
          :class="{'glyphicon glyphicon-triangle-bottom': node._open, 'glyphicon glyphicon-triangle-right': !node._open}"
        >
        </i>
        <label
          v-if="showCheckbox"
          class="checkbox-input"
          :class="getCheckClass(node)"
          @click.stop
          >
          <input
            type="checkbox"
            v-model="node._checked"
            :disabled="node.disabled"
            @change="checkChange(node)"
            @click.stop>
        </label>
        <span @click.stop.prevent="checkLabel(node)" :style="(node[cKey] && !node[cKey].length) || !node[cKey] ? 'flex:1;' : ''">{{node[labelKey]}}</span>
      </div>
      <div class="tree-children" v-if="node[cKey] && node[cKey].length">
        <tree-node
          :data="node[cKey]"
          :list-tree="listTree"
          :show-checkbox="showCheckbox"
          :is-linked="isLinked"
          v-show="node._open"
          @node-click="onClick"
          @check-change="checkChange">
        </tree-node>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeNode',
  directives: {
    visiable: {
      bind (el, binding) {
        el.style.visibility = binding.value ? 'visiable' : 'hidden'
      }
    }
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    listTree: {
      type: Object,
      default () {
        return {}
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    isLinked: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    cKey () {
      return this.listTree._childrenKey
    },
    idKey () {
      return this.listTree._idKey
    },
    labelKey () {
      return this.listTree._labelKey
    }
  },
  methods: {
    onClick (node) {
      this.$emit('node-click', node)
    },
    checkChange (node) {
      this.$emit('check-change', node)
    },
    checkLabel (node) {
      if (node.disabled) {
        return false
      }
      node._checked = !node._checked
      this.checkChange(node)
      this.getCheckClass(node)
    },
    getCheckClass (node) {
      let halfCheck = this.isLinked && !node._isAllChecked && node._checked && !node.disabled
      let checked = this.isLinked && node._isAllChecked || !this.isLinked && node._checked
      if (node.disabled && checked) {
        return {'half-check':halfCheck, 'checked':checked, 'disabledChecked': node.disabled}
      } else if (node.disabled && !checked) {
        return {'half-check':halfCheck, 'checked':checked, 'disabled': node.disabled}
      } else {
        return {'half-check':halfCheck, 'checked':checked}
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tree-content {
  cursor: pointer;
  user-select: none;
  display: flex
}
.tree-content:hover {
  background: #eee;
}
.tree-children {
  padding-left: 10px;
}
.tree-content i {
  color: #999;
  font-size: 12px;
}
.checkbox-input {
  display: flex;
  margin: 0;
  position: relative;
  top: 3px;
  display:inline-block;
  width: 14px;
  height: 14px;
  border: 1px solid #dcdfe6;
  background: #fff;
}
.checkbox-input.checked {
  background-color: #409eff;
  border-color: #409eff;
}
.checkbox-input.checked::before{
    content: "";
    border: 1px solid #fff;
    border-left: 0;
    border-top: 0;
    height: 7px;
    left: 4px;
    position: absolute;
    top: 1.5px;
    transform: rotate(45deg);
    width: 3px;
    transform-origin: center;
}
.checkbox-input.half-check {
  background-color: #409eff;
  border-color: #409eff;
}
.checkbox-input.half-check::before{
    content: "";
    position: absolute;
    display: block;
    background-color: #fff;
    height: 2px;
    transform: scale(.5);
    left: 0;
    right: 0;
    top: 5px;
}
.checkbox-input input {
  visibility: hidden;
}
.half-check {
  background: #ddd;
}
.disabled{
  background: #dcdfe6 !important;
  border-color: #dcdfe6 !important;
}
.disabledChecked{
  background-color: #dcdfe6 !important;
  border-color: #dcdfe6 !important;
}
</style>
