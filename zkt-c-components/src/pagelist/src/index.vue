<template>
  <div class="row" :data="data" >
    <div class="col-sm-12 form-group">
      <ZktPageList
        ref="ZktPageList"
        :components="components"
        :columns="detailTable"
        :searchParams="searchParams"
        :sortParams="sortParams"
        :data="data"
        :pageIndex="pageIndex"
        :totalCount="totalCount"
        :pageSize="pageSize"
        :hideZktPage="false"
        @getData="getData"
        @detail="detailFn"
        @sort="onSort"
        @search="onSearch"
      >
        <template v-slot:header>
          这里是头部信息
        </template>
        <template v-slot:footer>
          这里是尾部信息
        </template>
      </ZktPageList>
    </div>
  </div>
</template>

<script>
import templateEg from '../store/index'
import ListPage from '../components/list'
import Tmodal from '../components/link'
import detailTable from '../settlement-api/supplier/account/trans/detail/table.json' // npm run swagger xx-api intefaceAddress ajax/table targetDir
// import { updateField } from '../utils' // 可以针对detailTable最一些修正，遍历修改 updateField(detailTable, name, key, val)
export default {
  computed: {
    state () {
      return this.$store.state.templateEg.data
    },
    data () {
      let temp = this.$store.getters['templateEg/getData']
      return temp
    }
  },
  name: 'template',
  data () {
    return {
      components: {
        Tmodal
      },
      detailTable: detailTable,
      brandId: '',
      hotelId: '',
      totalCount: 40,
      totalPage: 0,
      pageSize: 20,
      pageIndex: 1
    }
  },
  components: {
    ListPage
  },
  beforeCreate () {
    if (!this.$store.state['templateEg']) { // 防止重复注册
      this.$store.registerModule('templateEg', templateEg)
    }
  },
  created () {
    this.init()
  },
  methods: {
    detailFn (item) {
    },
    onSearch (key, val) {
      let searchParams = this.$refs.ZktPageList.$refs.table.searchParams
      let obj = {}
      Object.entries(searchParams).map((item) => {
        obj[item[0]] = item[1]
      })
      this.searchParam = obj
      this.getData()
    },
    onSort (key, val) {
      let obj = {}
      obj['orderType'] = val
      if (obj.orderType === '') {
        obj = {}
      }
      this.sortParam = obj
      this.getData()
    },
    error (msg) {
      this.$modal({
        title: '提示信息',
        message: msg,
        okText: '',
        cancelText: '',
        timeOut: 3000
      })
    },
    init (flag) {
      this.brandId = this.$store.state.currentHotelInfo.brand_id // 包含了多集团关系，默认取值
      this.hotelId = this.$store.state.currentHotelInfo.hotel_id // 包含了多集团关系，默认取值
      this.getData()
    },
    success (path) {
      // let that = this
      this.$modal({
        title: '提示信息',
        message: '保存成功',
        okText: '',
        cancelText: '',
        timeOut: 3000,
        callback () {
        }
      })
    },
    getData (obj, param) {
      // param 用于排序，搜索传参使用
      this.pageIndex = 1
      if (obj && obj.page) {
        this.pageIndex = obj.page
      }
      let params = {
        supplierId: this.hotelId,
        pageIndex: this.pageIndex,
        pageSize: this.pageSize
      }
      Object.assign(params, this.searchParam, this.sortParam)
      this.$store.dispatch('templateEg/getData', params)
    }
  },
  destroyed () {
    this.$store.unregisterModule('templateEg')
    this.$store.commit('UN_REGISTER_MODULE')
  }
}
</script>

<style  scoped>
.padding0{
  padding: 0;
}
.btn{
  margin: 0 0 0  5px;
}
.floatright{
  float: right;
}
.lineheight35{
  line-height: 35px;
}
th{
  padding: 8px;
  border-right: 1px solid #ddd;
  background: #F2F2F2;
}
.red{
  color:#f00;
}
.strong{
  font-weight: bold;
}
</style>
