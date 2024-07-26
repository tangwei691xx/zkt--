<template>
  <div class="product">
    <Tabs
    v-if="tabs.length > 1"
    class="mb14"
    :tabs="tabs"
    v-model="tabIndex"
    @change="changeTab"></Tabs>
    <div class="zkt-restaurant-table">
      <zkt-table
        class="table-bordered"
        :data="tableData"
        :columns="columns"
        :selectable="false"
        :components="components"
        :searchParams="searchParams"
        :sortParams="sortParams"
        ref="table"
        @search="_onSearch"
        @select="_onSelect"
        @cancel="_onCancel"
      />
    </div>
    <zkt-page
      :page-val="pageIndex"
      :total-page="totalpage"
      :total-num="totalCount"
      :page-size="pageSize"
      :page-show="pageShow"
      :first-last="true"
      :prev-next="true"
      :txt="true"
      :jump="true"
      @page-list-fn="pagenumChange"/>
  </div>
</template>

<script>
import config from './ListConfig'
export default {
  name: 'index',
  props: {
    columnsConfig: { // 支持外部传入列
      type: Array,
      default () {
        return []
      }
    },
    selectedArray: {
      type: Array,
      default () {
        return []
      }
    },
    tabs: {
      type: Array,
      default () {
        return []
      }
    },
    extras: {
      type: Object,
      default () {
        return {}
      }
    },
    multipleChoice: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      tabIndex: 0,
      pageIndex: 1, // 当前页数量
      pageSize: 10,
      tableData: [],
      totalpage: 1,
       totalCount: 0,
      pageShow: 6,
      searchParams: {},
      sortParams: {},
      columns: []
    }
  },
  computed: {
    selectedArrayCopy: function () {
      return this.selectedArray
    }
  },
  watch: {
    selectedArrayCopy: {
      handler: function () {
        this.tableData = config.processData(this.tableData, this.selectedArrayCopy)
      },
      deep: true
    }
  },
  mounted () {
    this.columns = this.mergeColumns(config.columns)
    this.fetchProducts()
  },
  methods: {
    mergeColumns (baseColumns) {
      let columns = baseColumns.slice()
      this.columnsConfig.map(item => {
        let cover = item.cover ? 1 : 0
        columns.splice(item.index, cover, item)
      })
      return columns
    },
    fetchProducts () {
      let tabParams = this.tabs[this.tabIndex] && this.tabs[this.tabIndex].params || {}
      let argObj = {
        pageindex: this.pageIndex,
        pagesize: this.pageSize,
        ...this.searchParams,
        ...this.sortParams,
        ...this.extras,
        ...tabParams
      }
      return this.$http.get(
        `api/restaurant-api/product/getRestaurantProductPageList`,
        {params: argObj}
        ).then((response) => {
          let data = response.body.data
          this.totalCount = data.count
          this.totalpage = Math.ceil(data.count / this.pageSize)
          this.tableData = config.processData(data.rows, this.selectedArray)
      })
    },
    changeTab (index) {
      this.tabIndex = index
      this.pageIndex = 1
      this.fetchProducts()
    },
    pagenumChange (obj) {
      this.pageIndex = obj.page
      this.fetchProducts()
    },
    _onSelect (data, type) {
      this.selectedArrayCopy.push(data)
      if (!this.multipleChoice) {
        this.selectedArrayCopy.splice(0, this.selectedArrayCopy.length - 1)
      }
      this.$emit('onChange', this.selectedArrayCopy)
    },
    _onCancel (data, type) {
      this.selectedArrayCopy.map((item, index) => {
        if (item.restaurant_product_id === data.restaurant_product_id) {
          this.selectedArrayCopy.splice(index, 1)
        }
      })
      this.$emit('onChange', this.selectedArrayCopy)
    },
    _onSearch (key, value) {
      this.pageIndex = 1
      this.fetchProducts()
    }
  }
}
</script>
<style scoped>
.mb14{
  margin-bottom:14px;
}
</style>
