<template>
  <div>
    <span class="btn btn-primary" @click="openModal" v-if="!disabled">选择菜品</span>
    <zkt-table
    v-if="showTable"
    class="table-bordered zkt-restaurant-table"
    :columns="columns"
    :data="val"
    @delete="clickDelete"/>
  </div>
</template>

<script>
import Com from './components/index.vue'
export default {
  name: 'app',
  components: {
    Com
  },
  data () {
    return {
      columns: []
    }
  },
  props: {
    value: { // 选择的数组
      type: Array,
      default () {
        return []
      }
    },
    extras: { // 调用接口的额外参数
      type: Object,
      default () {
        return {}
      }
    },
    columnsConfig: { // 菜品列表支持外部传入列
      type: Array,
      default () {
        return []
      }
    },
    multipleChoice: { // 是否多选
      type: Boolean,
      default: true
    },
    disabled: { // 是否禁用
      type: Boolean,
      default: false
    },
    tabs: { // tabs
      type: Array,
      default () {
        return []
      }
    },
    showTable: { // 是否回显选择项
      type: Boolean,
      default: false
    },
    tableConfig: { // 回显支持外部传入列
      type: Array,
      default () {
        return []
      }
    },
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      let columns = this.getColumns()
      if (this.disabled) {
        columns.map((v, i) => {
          if (v.name === 'operation') {
            columns.splice(i, 1)
          }
        })
      }
      this.columns = this.mergeColumns(columns)
    },
    openModal () {
      let _this = this
      let vm = this.$modal({
        title: '选择菜品', // 弹窗标题
        size: 'lg', // 弹窗大小 默认为md
        autoClose: false, // 是否自动关闭 默认为true
        okText: '',
        cancelText: '',
        closeable: true,
        callback (value, type, vm) { // 操作后的回调函数 value是输入框值， type是操作按钮类型 close,postive,negative
          console.log(value, type, vm)
          // vm.$destroy()
        },
        events: {
          onChange (arr) {
            _this.val = arr
          }
        },
        data: {
          selectedArray: this.val,
          tabs: this.tabs,
          extras: this.extras,
          columnsConfig: this.columnsConfig,
          multipleChoice: this.multipleChoice
        }
      },
      Com
      )
    },
    clickDelete (row) {
      this.val.map((item, index) => {
        if (item.ticketProductId === row.ticketProductId && item.productType === row.productType) {
          this.val.splice(index, 1)
        }
      })
    },
    mergeColumns (baseColumns) {
      let columns = baseColumns.slice()
      this.tableConfig.map(item => {
        let cover = item.cover ? 1 : 0
        columns.splice(item.index, cover,item)
      })
      return columns
    },
    getColumns () {
      var _this = this
      return [
        {
          "name": "restaurantName",
          "header": "餐厅名称",
        },
        {
          "name": "name",
          "header": "产品名称",
        },
        {
          "name": "price",
          "header": "价格"
        },
        {
          "name": "status",
          "header": "产品状态",
          filter (data) {
            let json = {
              'PUBLISHED': '已上线',
              'OFFLINE': '已下线',
              'NEW': '待审核'
            }
            return json[data] || ''
          }
        },
        {
          name: 'operation',
          header: '操作',
          component: 'Buttons',
          buttons: [
            {
              name: '取消',
              class: 'btn-danger',
              value: 'delete'
            }
          ]
        }
      ]
    }
  }
}
</script>
<style scoped>
.zkt-restaurant-table{
  margin-top:14px;
}
</style>
