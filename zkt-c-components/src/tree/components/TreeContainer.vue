<template>
  <div class="tree-container">
    <tree-node
      :data="formatData"
      :list-tree="listTree"
      :show-checkbox="showCheckbox"
      :is-linked="isLinked"
      @check-change="onCheckChange"
      @node-click="onNodeClick"></tree-node>
  </div>
</template>

<script>
import TreeNode from './TreeNode.vue'
import ListTree from '../utils/ListTree.js'

export default {
  name: 'TreeContainer',
  components: {
    TreeNode
  },
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    defaultExpandedKeys: {
      type: Array,
      default () {
        return []
      }
    },
    showCheckbox: {
      type: Boolean,
      default: false
    },
    defaultCheckedKeys: {
      type: Array,
      default () {
        return []
      }
    },
    defaultExpandAll : {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    filterNodeMethod: {
      type: Function,
      default () {
        return function () {
          return true
        }
      }
    },
    // 父子节点是否关联
    isLinked: {
      type: Boolean,
      default: true
    },
   /**
     * 需要特殊处理的逻辑
     */
    systemCode: {
      type: String,
      default: "",
    },
  },
  data () {
    return {
      listTree: {},
      formatData: []
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.formatData = this.getFormData()
    },
    toggleOpen (isOpen) {
      this.listTree._list.map(node => node._open = isOpen)
    },
    filter (text) {
      const setShow = (node) => {
        let show = false
        if (!node[this.listTree._childrenKey] || (node[this.listTree._childrenKey] && !node[this.listTree._childrenKey].length)) {
          show = this.filterNodeMethod(text, node)
        } else {
          node[this.listTree._childrenKey].map(nodeInner => {
            nodeInner._show = setShow(nodeInner)
          })
          show = this.filterNodeMethod(text, node) || node[this.listTree._childrenKey].some(nodeInner => {
            return setShow(nodeInner)
          })
        }
        return show
      }

      this.formatData.map(node => {
        node._show = setShow(node)
        return node
      })
    },
    getFormData () {
      this.setPrivateKey()
      this.listTree = new ListTree(this.data, this.options)
      // 设置默认值
      this.listTree._list.map(item => {
        let idKey = this.options.idKey || 'id'
        item._open = this.defaultExpandAll || this.defaultExpandedKeys.includes(item[idKey])
        item._checked = this.defaultCheckedKeys.includes(item[idKey])
        return item
      })
      let formatData = this.listTree._tree
      // 设置默认值
      if (this.isLinked) {
        this.defaultCheckedKeys.map(id => {
          let node = this.listTree._listMap[id]
          node && this.setChildCheck(node)
        })
        this.defaultCheckedKeys.map(id => {
          let node = this.listTree._listMap[id]
          node && this.setParentCheck(node)
        })
      }
      return formatData
    },
    setPrivateKey () {
      if (this.options.dataType === 'tree') {
        const setPrivateKey = (node) => {
          node._open = false
          node._checked = node._checked || false
          node._show = true
          node._isAllChecked = false
          let childrenKey = this.options.childrenKey || 'children'
          if (node[childrenKey] && node[childrenKey].length) {
            node[childrenKey].map(nodeInner => {
              setPrivateKey(nodeInner)
            })
          }
        }
        this.data.map(node => {
          setPrivateKey(node)
        })
      } else {
        this.data.map(item => {
          item._open = false
          item._checked = item._checked || false
          item._show = true
          item._isAllChecked = false
          return item
        })
      }
    },
    onNodeClick (node) {
      this.$emit('node-click', node)
    },
    /**
     * 设置所有子的状态和父相同
     */
    setChildCheck (node) {
      if (!node.disabled || (node.disabled && node._checked)) {
        node._isAllChecked = node._checked
      } 
      let children = node[this.listTree._childrenKey]
      if (children && children.length) {
        children.map(child => {
          if (!child.disabled || (node._checked && node.disabled)) {
            child._isAllChecked = node._checked
          }
          child._checked = node._checked
          child && this.setChildCheck(child)
        })
      }
    },
    /**
     * 设置父是否选中
     */
    setParentCheck (node) {
      if (node[this.listTree._parentIdKey]) {
        let parent = this.listTree._listMap[node[this.listTree._parentIdKey]]
        parent._checked = parent[this.listTree._childrenKey].some(child => {
          if (child.disabled) {
            return child._checked && child.disabled ? true : false
          } else {
            return child._checked
          }
        })
        parent._isAllChecked = this.getAllCheck(parent)
        if (parent[this.listTree._parentIdKey]) {
          parent && this.setParentCheck(parent)
        }
      }
    },
    getAllCheck (node) {
      let allChecked = false
      if (node[this.listTree._childrenKey]) {
        allChecked = node[this.listTree._childrenKey].every(child => {
          if (child.disabled) {
            return child._checked && child.disabled ? child._checked && this.getAllCheck(child) : false
          } else {
            return child._checked && this.getAllCheck(child)
          }
        })
      } else {
        if (node.disabled) {
          allChecked = node._checked && node.disabled ? true : false
        } else {
          allChecked = node._checked
        }
      }
      return allChecked
    },
    onCheckChange (node) {
      if (this.isLinked) {
        node && this.setChildCheck(node)
        node && this.setParentCheck(node)
      }
      /**
       * permission 权限设置
       * 回显时父子不关联 通过isLinked处理
       * 子级取消时父级不影响
       */
      if (this.systemCode === "zktPermission") {
        if (node._checked) {
          node && this.setChildCheck(node);
          node && this.setParentCheck(node);
        } else {
          node && this.setChildCheck(node);
        }
      }
      let checkIds = this.listTree._list
        .filter(node => { return node._checked })
        .map(node => { return node[this.listTree._idKey] })

      let checkNodes =JSON.parse(JSON.stringify(this.listTree._list))
        .filter(node => { return node._checked })
        .map(node => {
          delete node[this.listTree._childrenKey]
          return node
        })
      this.$emit('check-change', checkIds, checkNodes)
    },
    setCheck (ids) {
      this.listTree._list.map(item => {
        item._checked = ids.includes(item[this.listTree._idKey])
        item._isAllChecked = item._checked
      })
      // 设置选中值
      if (this.isLinked) {
        ids.map(id => {
          let node = this.listTree._listMap[id]
          node && this.setChildCheck(node)
        })
        ids.map(id => {
          let node = this.listTree._listMap[id]
          node && this.setParentCheck(node)
        })
      }
      let listTemp= JSON.parse(JSON.stringify(this.listTree._list))
      let idChecked = []
      let checkNodes = listTemp.filter(node => {
        delete node[this.listTree._childrenKey]
        if (node._checked) {
          idChecked.push(node[this.listTree._idKey])
        }
        return node._checked
      })
      this.$emit('check-change', idChecked, checkNodes)
    },
    clearCheck () {
      this.listTree._list.map(item => {
        item._checked = false
        item._isAllChecked = false
      })
      this.$emit('check-change', [], [])
    },
    setNodeCheckById (id, checked = false) {
      let node = this.listTree._listMap[id]
      node._checked = checked
      this.onCheckChange(node)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
