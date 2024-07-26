<template>
  <div id="app">
    <div class="search-input">
      自定义筛选
      <input type="text" v-model="filterText" @input="textChange">
      <div class="btn btn-success" @click="toggleOpen">toggle</div>
      <div class="btn btn-success" @click="toggleLink">切换父子关联</div>
      <div class="btn btn-success" @click="setCheck">设置选中</div>
      <div class="btn btn-success" @click="clearCheck">清空</div>
      <div class="btn btn-success" @click="setNodeCheckById">设置指定id节点选中状态</div>
    </div>
    <div class="content-left">
      <div class="tree-title">扁平数据：</div>
      <zkt-tree
        ref="tree1"
        show-checkbox
        default-expand-all
        :is-linked="isLinked"
        :data="listData"
        :options="options"
        :default-expanded-keys="[1, 3]"
        :default-checked-keys="[5]"
        :filter-node-method="filterNode"
        @node-click="handleNodeClick"
        @check-change="handleCheckChange"/>
      <div style="margin-top:10px;">
        <div class="tree-title">树形数据：</div>
        <zkt-tree
          ref="tree2"
          show-checkbox
          default-expand-all
          :is-linked="isLinked"
          :data="treeData"
          :options="options2"
          :default-expanded-keys="[1, 3]"
          :default-checked-keys="[4, 5]"
          :filter-node-method="filterNode"
          @node-click="handleNodeClick"
          @check-change="handleCheckChange2"/>
      </div>
    </div>
    <div class="content-right">
      <div>选中的元素id：{{checkIds}}</div>
      <div>完全选中的元素id：{{compleatCheckIds}}</div>
      <div>完全选中的元素id (Tree)：{{compleatCheckIdsTree}}</div>
    </div>
  </div>
</template>

<script>
import ZktTree from './components/TreeContainer.vue'

export default {
  name: 'app',
  components: {
    ZktTree
  },
  data () {
    return {
      defaultExpandAll: true,
      listData: [
        {
          id2: 1,
          name: 'haha',
          parentId2: 0,
          disabled: 'disabled'
        },
        {
          id2: 2,
          name: '22',
          parentId2: 1,
          disabled: 'disabled'
        },
        {
          id2: 3,
          name: '33',
          parentId2: 1,
        },
        {
          id2: 4,
          name: '44',
          parentId2: 2,
        },
        {
          id2: 5,
          name: '55',
          parentId2: 4,
          disabled: 'disabled'
        },
        {
          id2: 6,
          name: '66',
          parentId2: 4,
        },
        {
          id2: 7,
          name: '77',
          parentId2: 4,
        }
      ],
      treeData: [
        {
          name: '1',
          children: [
            {
              name: '1-1',
              disabled: 'disabled'
            },
            {
              name: '1-2',
              children: [
                {
                  name: '1-2-1',
                  disabled: 'disabled'
                },
                {
                  name: '1-2-2'
                }
              ]
            }
          ]
        },
        {
          name: '2'
        }
      ],
      options: {
        idKey: 'id2',
        parentIdKey: 'parentId2'
      },
      options2: {
        dataType: 'tree'
      },
      filterText: '',
      checkIds: [],
      checkNodes: [],
      checkNodes2: [],
      isLinked: true
    }
  },
  computed: {
    compleatCheckIds () {
      return this.checkNodes.filter(node => node._isAllChecked).map(node => node.id2)
    },
    compleatCheckIdsTree () {
      return this.checkNodes2.filter(node => node._isAllChecked).map(node => node.id)
    }
  },
  methods: {
    textChange () {
      this.$refs.tree1.filter(this.filterText);
      this.$refs.tree2.filter(this.filterText);
    },
    handleNodeClick (node) {
      console.log('node-click:', node)
    },
    handleCheckChange (checkIds, checkNodes) {
      this.checkIds = checkIds
      this.checkNodes = checkNodes
      console.log('node-check:', checkIds, checkNodes)
    },
    handleCheckChange2 (checkIds, checkNodes) {
      this.checkIds = checkIds
      this.checkNodes2 = checkNodes
      console.log('node-check:', checkIds, checkNodes)
    },
    filterNode (text, node) {
      if (!text) return true;
      return node.name.indexOf(text) !== -1;
    },
    toggleOpen () {
      this.defaultExpandAll = !this.defaultExpandAll
      this.$refs.tree1.toggleOpen(this.defaultExpandAll)
      console.log(this.$refs.tree1.listTree.getListByParentId(3))
      console.log(this.$refs.tree1.listTree.getIdsByLevel(2))
      console.log(this.$refs.tree1.listTree.getParentIdsArr(4))
    },
    toggleLink () {
      this.isLinked = !this.isLinked
      this.$nextTick(() => {
        this.$refs['tree1'].init()
      })
    },
    setCheck () {
      this.$refs.tree1.setCheck([2])
    },
    clearCheck () {
      this.$refs.tree1.clearCheck()
    },
    setNodeCheckById () {
      this.$refs.tree1.setNodeCheckById(6, false)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  padding: 20px;
}
.search-input {
  margin: 10px;
}
.content-left {
  float: left;
  padding: 10px;
  width: 400px;
  height: 500px;
  border: 1px solid #eee;
}
.content-right {
  float: left;
  padding: 10px;
  width: 400px;
  height: 500px;
}
.tree-title {
  color: green;
  border-bottom: 1px solid green;
}
</style>
