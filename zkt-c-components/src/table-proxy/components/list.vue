<template>
  <div class="row" :data="data">
    <div class="col-sm-12 form-group">
      <slot name="container">
        <zkt-table
          ref="table"
          :class="tableClass || $attrs['tableClass']"
          v-on="$listeners"
          v-bind="$attrs"
          :components="components"
          :columns="columns"
          :data="data"
        />
        <zkt-page
          v-if="!hideZktPage"
          v-bind="$attrs"
          :page-val="pageIndex"
          :jump-page-val="pageIndex"
          :total-num="totalCount"
          :jump="jump"
          :page-size="pageSize"
          @page-list-fn="getData"
        />
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pageList',
  props: {
    tableClass: {
      type: String,
      default () {
        return 'table-bordered'
      }
    },
    hideZktPage: {
      type: Boolean,
      default () {
        return false
      }
    },
    jump: {
      type: Boolean,
      default () {
        return true
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
    pageSize: {
      type: Number,
      default () {
        return 20
      }
    },
    components: {
      type: Object,
      default () {
        return {}
      }
    },
    columns: {
      type: Array,
      default () {
        return []
      }
    },
    data: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    onSort (key, val) {
      let obj = {}
      obj[key] = val
      this.$emit('sort', obj)
    },
    onSearch (key, val) { // 父组件search事件会执行
      // let obj = {}
      // obj[key] = val
      // this.$emit('search', obj)
    },
    getData (obj) {
      this.$emit('getData', obj)
    }
  },
  updated () {
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
