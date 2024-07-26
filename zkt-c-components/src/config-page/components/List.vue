<template>
  <div class="" ref="list" v-if="showList">
    <zkt-table
        :class="tableClass"
        :columns="columns"
        :data="data"
        :loading="loading"
        :searchParams="searchParams"
        :components="components"
        v-on="$listeners"
        ></zkt-table>
        
      <zkt-page
        v-if="usePage"
        :page-val="pageval"
        :total-page="totalpage"
        :total-num="totalnum"
        :page-size="pageSize"
        :jump="jump"
        :first-last="firstLast"
        :prev-next="prevNext"
        @page-list-fn="pagelistfn">
      </zkt-page>
  </div>
</template>

<script>
export default {
  name: 'List',
  props: {
    tableClass: {
      type: String,
      default: 'table-bordered'
    },
    apiInfo: {
      type: Object,
      default () {
        return {
          type: '',
          url: '',
          params: {}
        }
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    jump: {
      type: Boolean,
      default: false
    },
    firstLast: {
      type: Boolean,
      default: true
    },
    prevNext: {
      type: Boolean,
      default: true
    },
    searchParams: { // 参数
      type: Object,
      default () {
        return {}
      }
    },
    fields: { // 默认返回值字段名称
      type: Object,
      default () {
        return {
          page: 'pageNum',
          list: 'list',
          total: 'total'
        }
      }
    },
    isReady: { // 判断接口参数是否准备完毕，准备好后开始请求接口
      type: Boolean,
      default: false
    },
    components: { // 增加自定义组件
      type: Object,
      default () {
        return {}
      }
    },
    usePage: {
      type: Boolean,
      default: true
    },
    showList: {
      type: Boolean,
      default: true
    },
    filterFields: { // 兼容老接口，为true时过滤掉请求参数为空的值
      type: Boolean,
      default: false
    }
  },
  watch: {
    searchParams: {
      handler (params) { // 获取改变的参数
        Object.keys(params).forEach((val) => {
          Object.keys(this.apiInfo.params).forEach((key, idx) => {
            if (val === key) {
              let str = params[val].toString().replace(/(^\s*)|(\s*)/, '')
              this.apiInfo.params[key] = str
              this.$emit("tracker", params, str, val, this.columns)
            }
          })
        })
        this.pageval = 1
        this.apiInfo.params[this.fields.page] = 1
        this.handleData()
        
      },
      deep: true
    }
  },
  computed: {
    totalpage () {
      return Math.ceil(this.totalnum / this.pageSize)
    },
    pageSize () {
      return this.apiInfo.params.pageSize || 20
    }
  },
  data () {
    return {
      pageval: 1,
      loading: false,
      data: [],
      totalnum: 0
    }
  },
  mounted () {
    this.apiInfo.params[this.fields.page] = 1
    this.$watch('isReady', (val) => {
      if (val) {
        this.handleData()
      }
    }, {immediate: true})
  },
  methods: {
    handleData () {
      this.getData()
      .then((val) => {
        if (!this.usePage) { // 不使用分页的接口
          this.data = val || []
        } else {
          this.data = val[this.fields.list] || []
          this.totalnum = val[this.fields.total] || 0
        }
        this.$emit('data', val)
      })
    },
    getData () {
      let API = this.apiInfo
      let params = {}
      Object.keys(API.params).forEach((val) => {
        if (this.filterFields && API.params[val] !== '') { // 兼容老接口，过滤掉字段为空的参数
          params[val] = API.params[val]
        }
        if (!this.filterFields) {
          params[val] = API.params[val]
        }
      })
      params = API.type === 'get' ? { params } : { body: params }
      return new Promise((resolve, reject) => {
        this.$http({
          method: API.type,
          url: API.url,
          ...params
        }).then((res) => {
          resolve(res.body.data)
        })
      })
    },
    pagelistfn (e) {
      if (e.page === 0) {
        return
      }
      this.pageval = e.page
      this.apiInfo.params[this.fields.page] = e.page
      this.handleData()
    }
  }
}
</script>

<style scoped>
 .table >>> td {
   word-break: break-all;
 }
</style>
