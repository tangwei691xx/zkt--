<template>
  <table class="table zkt-table">
    <thead class="zkt-table-head">
      <slot name="thead"></slot>
      <tr v-if="beforeColumns">
        <Th
          v-for="(column, index) in beforeColumns"
          v-if="column.header"
          v-bind="header(column)"
          :key="index"
          />
      </tr>
      <tr>
        <th v-if="selectable" width="30">
          <input
          type="checkbox"
          v-model="selectedAll"
          ref="selectAll"
          :disabled="disabled"
          @change="selectAll">
        </th>
        <Th
          v-for="(column, index) in columns"
          v-if="column.name&&column.header"
          v-on="$listeners"
          v-bind="header(column)"
          :key="index"
          :searchQuery="searchParams[column.name]"
          :sortQuery="sortParams[column.name]"
          @search="onSearch"
          @sort="onSort"
          />
      </tr>
    </thead>
    <tbody>
      <slot name="tbody"></slot>
      <tr
        v-for="(row,dataIndex) in data"
        :key="dataIndex"
        :ref="'row'+dataIndex">
        <td v-if="selectable">
          <input type="checkbox" v-model="selectedItems" :value="row" @change="changeSelect" :disabled="row.disabledSelect">
        </td>
        <td
          v-for="(column,index) in columns"
          v-if="column.name"
          v-show="!column.merge"
          :ref="column.merge&&('__group__'+row[column.name])"
          :key="index">
          <component
            v-bind="column"
            v-on="$listeners"
            :is="column.component||component"
            :value="row"
            :dataIndex="dataIndex"
            :ref="'cell'+column.name"
           />
        </td>
      </tr>
    </tbody>
    <tfoot>
      <slot name="tfoot"></slot>
      <tr v-if="!data||!data.length">
        <td class="text-center bg-warning"
        :colspan="this.selectable?columns.length+1:columns.length">
        {{this.loading?'加载中...': '暂无数据'}}
      </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
  import Th from './Th.vue'
  import Buttons from './Buttons.vue'
  import Cell from './Cell.vue'
  import _ from 'lodash'
  export default {
    name: 'Table',
    components: {
      Th,
      Cell,
      Buttons
    },
    props: {
      data: {
        type: Array,
        default () {
          return []
        }
      },
      columns: {
        type: Array,
        default () {
          return []
        }
      },
      beforeColumns: {
        type: Array,
        default () {
          return []
        }
      },
      checkInitKey: {
        type: String,
        default () {
          return 'id'
        }
      },
      checkInitArray: {
        type: Array,
        default () {
          return []
        }
      },
      selectable: {
        type: Boolean,
        default: false
      },
      searchParams: {
        type: Object,
        default () {
          return {}
        }
      },
      sortParams: {
        type: Object,
        default () {
          return {}
        }
      },
      selectedItems: {
        type: Array,
        default () {
          return []
        }
      },
      component: {
        type: String,
        default: 'Cell'
      },
      components: {
        type: Object,
        default () {
          return {}
        }
      },
      loading: {}
    },
    data () {
      return {
        selectedAll: false,
        disabled: false
      }
    },
    methods: {
      newSetSelect () {
        this.data.map((item) => {
          this.selectedItems.map((subitem, ind) => {
            if (subitem[this.checkInitKey] === item[this.checkInitKey]) {
              this.selectedItems.splice(ind, 1)
            }
          })
        })
      },
      selectAll () {
        if (this.selectedAll) {
          this.newSetSelect()
          this.selectedItems = this.data.slice().concat(this.selectedItems)
        } else {
          this.newSetSelect()
        }
        this.$emit('select', this.selectedItems)
      },
      changeSelect () {
        let count = 0
        this.data.map((item) => {
          this.selectedItems.map((subitem) => {
            if (subitem[this.checkInitKey] === item[this.checkInitKey]) {
              count++
            }
          })
        })
        if (this.data.length === count && count > 0) {
          this.selectedAll = true
        } else {
          this.selectedAll = false
        }
        this.$emit('select', this.selectedItems)
      },
      mergeCell () {
        Object.keys(this.$refs).forEach((key) => {
          if (!~key.indexOf('__group__')) return
          var firstEl = this.$refs[key][0]
          firstEl.style.display = ''
          firstEl.setAttribute('rowspan', this.$refs[key].length)
        })
      },
      onSearch (key, val) {
        this.searchParams[key] = val
        this.$forceUpdate()
      },
      onSort (key, val) {
        this.sortParams[key] = val
        this.$forceUpdate()
      },
      header (column) {
        return _.omit(column, 'style', 'class')
      },
      listenCheckBox () {
        if (this.selectable) {
          if (this.data.length > 0) {
            let count = 0
            let obj = {}
            this.selectedItems.map((item) => {
              obj[item[this.checkInitKey]] = true
            })
            // 初始化全选为可用
            this.disabled = false
            // 如果初始化数据不再当前分页，需要剥离这一部分数据
            this.data.map((item) => {
              for (let initItem = 0; initItem < this.checkInitArray.length; initItem++) {
                if (this.checkInitArray[initItem] === item[this.checkInitKey]) {
                  count++
                  if (!obj[item[this.checkInitKey]]) {
                    // 需要去重
                    this.selectedItems.push(item)
                  }
                }
              }
              // 如果当前页面有禁用的input框，全选不可用
              if (item.disabledSelect) {
                this.disabled = true
              }
            })
            if (count === this.data.length && this.data.length > 0 && count > 0) {
              this.selectedAll = true
            } else {
              this.selectedAll = false
            }
          }
        }
      }
    },
    created () {
      Object.assign(this.$options.components, this.components)
    },
    mounted () {
      this.mergeCell()
    },
    updated () {
      this.mergeCell()
    },
    watch: {
      data (val) {
        // 数据变更以后，存在分页后数据勾选问题
        this.listenCheckBox()
      },
      checkInitArray () {
        // 初始化数据变更以后，需要重新勾选
        this.listenCheckBox()
      }
    }
  }
</script>

<style>
  .zkt-table-head tr {
    background-color: #f2f2f2;
  }
  .zkt-table.table>thead>tr>th {
    vertical-align: top;
    font-weight: normal;
  }
</style>
