<template>
  <div class="row" :data="data" >
    <div class="btn btn" @click="pageFn(4)">4</div><div class="btn btn"  @click="pageFn(5)">5</div>
    <div class="col-sm-12 form-group">{{interFaceInfo}}
      <ListPage
        ref="ZktPageList"
        :components="components"
        :pageShow="6"
        :columns="detailTable"
        :searchParams="searchParams"
        :interFaceInfo="interFaceInfo"
        :pageIndex="pageIndex"
        :beforeHook="beforeHook"
        :dataHook="dataHook"
        :afterHook="afterHook"
        @detail="detail"
        @add="add"
        @edit="edit"
        @copy="copy"
        @view="view"
        @log="log"
      >
      </ListPage>
    </div>
  </div>
</template>

<script>
import templateEg from '../store/index'
import ListPage from '../components/proxy'
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
      interFaceInfo: {},
      searchParams: {
        'businessTypeName': 123
      },
      brandId: '',
      hotelId: '',
      totalCount: 40,
      totalPage: 0,
      pageSize: 10,
      pageIndex: 2,
      timeOut: ''
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
    pageFn (val) {
      this.pageIndex = val
    },
    detail (item) {
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
      // this.getData()
      this.interFaceInfo = {
        method: 'post',
        url: 'api/settlement-api/supplier/account/trans/detail',
        params: {
          supplierId: this.hotelId,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          startTime: '2020-1-10 10:10:00',
          endTime: '2020-3-10 10:10:00'
        }
      }
      this.dataHook = (res) => {
        res.totalCount = 220
      }
      this.afterHook = () => {
        this.t3 = this.getTime()
        return Promise.resolve(true)
      }
      this.beforeHook = () => {
        let params = {
          supplierId: this.hotelId,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          startTime: '2020-1-10 10:10:00',
          endTime: '2020-3-10 10:10:00'
        }
        let p1 = new Promise((resolve, reject) => {
          this.$store.dispatch('templateEg/getData', params)
            .then((res) => {
              resolve(res)
            })
        })
        let p2 = new Promise((resolve, reject) => {
          this.$store.dispatch('templateEg/getData', params)
            .then((res) => {
              resolve(res)
            })
        })
        let promise3 = Promise.resolve(this.$store.dispatch('templateEg/getData', params))
        return Promise.all([p1, p2, promise3]).then((res) => {
          this.t1 = this.getTime()
        })
      }
    },
    getTime () {
      return new Date().getTime()
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
    }
  },
  destroyed () {
    this.$store.commit('UN_REGISTER_MODULE')
  },
  watch: {
    'interFaceInfo': {
      handler () {
        try {
        } catch (error) {
        }
      },
      deep: true,
      immediate: true
    }
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
