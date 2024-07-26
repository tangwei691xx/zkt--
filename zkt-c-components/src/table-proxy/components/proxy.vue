<template>
  <div class="row" style="margin:0">
      <slot name="header"></slot>
      <slot name="container">
        <ListPage
          ref="listpage"
          v-on="$listeners"
          v-bind="$attrs"
          :data="interFaceResKey.data ? data[interFaceResKey.data || 'data'] : data"
          :pageIndex="pageIndex"
          :totalCount="data[interFaceResKey.totalCount] || totalCount"
          @getData="pageDeal"
          @sort="onSort"
          @search="onSearch"
        >
        </ListPage>
      </slot>
      <slot name="footer"></slot>
  </div>
</template>
<script>
import ListPage from './list'
export default {
  props: {
    beforeHook: {
      type: Function,
      default () {
        return Promise.resolve()
      }
    },
    dataHook: {
      type: Function,
      default () {
        return Promise.resolve()
      }
    },
    afterHook: {
      type: Function,
      default () {
        return Promise.resolve()
      }
    },
    pageIndex: {
      type: Number,
      default () {
        return 1
      }
    },
    totalCount: {
      type: Number,
      default () {
        return 0
      }
    },
    interFaceResKey: { // 接口返回结果映射
      type: Object,
      default () {
        return {
          pageSize: 'pageSize',
          totalCount: 'totalCount',
          data: 'data'
        }
      }
    },
    interFaceInfo: { // 接口入参信息
      type: Object,
      default () {
        return {
          searchParams: {},
          sortParams: {},
          pageParams: {}
        }
      }
    }
  },
  components: {
    ListPage
  },
  data () {
    return {
      data: {}
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      return this.beforeHook()
        .then(() => {
          return this.getData()
        })
        .then(() => {
          return this.afterHook()
        })
    },
    pageDeal (obj) {
      this.pageIndex = 1
      if (obj && obj.page) {
        this.pageIndex = obj.page
      }
      this.$emit('pageParamsFn', { pageIndex: this.pageIndex })
      this.getData(obj)
    },
    getData (obj) {
      let interFace = this.interFaceInfo
      let sortparam = Object.assign({}, this.$attrs['sortParams'] || {}, this.sortParams || {})
      let searchparam = Object.assign({}, this.$attrs['searchParams'] || {}, this.searchParams || {})
      let pageparam = Object.assign({}, { pageIndex: this.pageIndex })
      if (this.interFaceResKey.pageIndex !== 'pageIndex') {
        pageparam[this.interFaceResKey.pageIndex] = pageparam.pageIndex
      }
      let temp = Object.assign({}, searchparam, sortparam, pageparam) // 合并入参
      temp[this.interFaceResKey.pageIndex] = temp.pageIndex
      this.$set(this.interFaceInfo, 'searchParams', searchparam)
      this.$set(this.interFaceInfo, 'sortParams', sortparam)
      this.$set(this.interFaceInfo, 'pageParams', pageparam)
      
      return this.$http[interFace.method](interFace.url, interFace.method.toLocaleLowerCase() === 'get' ? { params: Object.assign({}, interFace.params, temp) } : Object.assign({}, interFace.params, temp))
        .then((res) => {
          if (res.body.code === '0' || res.body.code === 0) {
            this.data = res.body.data || []
            return this.dataHook(this.data, this)
          } else {
            return Promise.reject(res.body.message)
          }
        })
    },
    onSearch (key, val) {
      this.searchParams = this.$refs.listpage.$refs.table.searchParams
      this.pageIndex = 1
      this.$emit('pageParamsFn', { pageIndex: this.pageIndex })
      this.$emit('searchParamsFn', JSON.parse(JSON.stringify(this.searchParams)))
      this.getData()
    },
    onSort (key, val) {
      let obj = {}
      obj['orderType'] = key + ' ' + val
      if (obj.orderType === '') {
        obj = {}
      }
      this.sortParams = obj
      this.$emit('sortParamsFn', JSON.parse(JSON.stringify(this.sortParams)))
      this.getData()
    }
  },
  watch: {
    pageIndex: function () {
      this.pageIndex = this.pageIndex
    }
  }
}
</script>
<style scoped>
</style>
