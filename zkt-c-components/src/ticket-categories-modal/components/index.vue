<template>
  <div class="product">
    <div class="col-sm-12">
      <Tabs
      v-if="tabs.length > 1"
      :tabs="tabs"
      class="template_tab margin_bottom"
      v-model="tabIndex"
      @change="onChange"></Tabs>
    </div>
    <div class="product-list">
      <zkt-table
      :data="listArray"
      :columns="columns"
      :selectable="false"
      :components="components"
      ref="table"
      @search="_onSearch"
      @select="_onSelect"
      @cancel="_onCancel"
      class="table-bordered producs-table"
      />
      <zkt-page
      class="products-end-page"
      :page-val="args.pageNum"
      :total-page="totalpage"
      :total-num="totalnum"
      :page-size="args.pageSize"
      :page-show="pageShow"
      :first-last="true"
      :prev-next="true"
      :txt="true"
      :jump="false"
      @page-list-fn="pagenumChange"></zkt-page>
    </div>
  </div>
</template>

<script>
import config from './ListConfig'
export default {
  name: 'index',
  props: {
    listConfig: { // 支持外部传入列
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
    hotelInfo: {
      type: Object,
      default () {
        return {}
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
    }
  },
  data () {
    return {
      tabIndex: 0,
      listArray: [],
      basicInfo: {},
      selectVal: [],
      totalpage: 1,
      pageShow: 6,
      totalnum: 1,
      auditStatus: 4,
      chooseHotelId: '',
      strategy: 12,
      args: {
        pageNum: 1, // 当前页数量
        pageSize: 10,
        auditStatus: '',
        productName: '',
        posterTitle: '',
        chooseHotelId: '',
        keyword: ''
      },
      columns: []
    }
  },
  computed: {
    selectedArrayCopy: function () {
      return this.selectedArray
    },
    internalListConfig: function () {
      return config[this.tabs[this.tabIndex].value] || config.base
    }
  },
  watch: {
    selectedArrayCopy: {
      handler: function () {
        this.internalListConfig.processData(this.listArray, this.selectedArrayCopy, this.tabs[this.tabIndex].value)
      },
      deep: true
    },
    args: {
      handler: function () {
        this.fetchList()
      },
      deep: true
    }
  },
  mounted () {
    this.columns = this.mergeColumns(this.internalListConfig.columns)
    this.fetchList()
  },
  methods: {
    mergeColumns (baseColumns) {
      let columns = baseColumns.slice()
      this.listConfig.map(item => {
        let cover = item.cover ? 1 : 0
        columns.splice(item.index, cover, item)
      })
      return columns
    },
    fetchList () {
      this.fetchProducts(this.tabs[this.tabIndex].value, this.args)
        .then((res) => {
          this.totalnum = res.body.data.total
          this.totalpage = Math.ceil(res.body.data.total / this.args.pageSize)
          this.listArray = this.internalListConfig.processData(res.body.data, this.selectedArray, this.tabs[this.tabIndex].value)
        })
    },
    fetchProducts (type, args) { // 预售券分类
      return this.$http.get(
        `api/ticket-api/ticketCategory/listTicketCategoryByHotelId/${this.hotelInfo.hotelId}`
      ).then((response) => {
        return response
      })
    },
    onChange (index) {
      this.tabIndex = index
      this.columns = this.mergeColumns(this.internalListConfig.columns)
      this.args.pageNum = 1
      this.fetchList()
    },
    pagenumChange (obj) {
      this.args.pageNum = obj.page
    },
    search (e) {
      this.args.keyword = e.target.value
      this.args.pageNum = 1
    },
    close () {
      this.$emit('close')
    },
    _onSelect (data, type) {
      this.selectedArrayCopy.push(data)
      this.$emit('onChange', this.selectedArrayCopy)
    },
    _onCancel (data, type) {
      this.selectedArrayCopy.map((item, index) => {
        if (item.ticketCategoryId === data.ticketCategoryId) {
          this.selectedArrayCopy.splice(index, 1)
        }
      })
      this.$emit('onChange', this.selectedArrayCopy)
    },
    _onSearch (key, value) {
      this.args[key] = value
      this.args.pageNum = 1
    }
  }
}
</script>
<style scoped>
/* >>> table{
  width: 867px;
  margin: auto;
}
>>> .end-pager{
  margin-left: 15px;
  margin-top: 10px;
} */
.col-sm-9{
  margin-bottom: -1px;
}
.products-end-page{
  margin-top: -35px;
}
.producs-table{
  margin-bottom: 40px;
}
.product-list{
  padding: 0 10px;
}
</style>
