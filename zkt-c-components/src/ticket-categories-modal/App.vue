<template>
  <div>
    <span class="btn btn-primary" @click="openModal">{{title}}</span>
    <zkt-table
    v-if="showTable"
    class="table-bordered modal-tabel"
    :components="components"
    :columns="columns"
    :data="val"
    @delete="clickDelete" />
  </div>
</template>

<script>
import Com from './components/index.vue'
export default {
  name: 'app',
  components: {
    Com
  },
  props: {
    title: {
      type: String,
      default () {
        return '选择产品分类'
      }
    },
    modalTitle: {
      type: String,
      default () {
        return '产品分类'
      }
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    listConfig: { // 支持外部传入列
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
    extras: { // 调用接口的额外参数
      type: Object,
      default () {
        return {}
      }
    },
    showTable: {
      type: Boolean,
      default: false
    },
    tableConfig: {
      type: Array,
      default () {
        return []
      }
    }
  },
  data () {
    return {
      columns: [
        {
          'name': 'categoryName',
          'header': '预售券分类'
        },
        {
          name: 'opt',
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
    this.columns = this.mergeColumns(this.columns)
  },
  methods: {
    openModal () {
      let _this = this
      this.$modal({
        title: this.modalTitle, // 弹窗标题
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
          selectedArray: _this.val,
          hotelInfo: _this.hotelInfo,
          tabs: _this.tabs,
          extras: _this.extras,
          listConfig: _this.listConfig
        }
      },
      Com
      )
    },
    clickDelete (row) {
      this.val.map((item, index) => {
        if (item.ticketCategoryId === row.ticketCategoryId && item.productType === row.productType) {
          this.val.splice(index, 1)
        }
      })
    },
    mergeColumns (baseColumns) {
      let columns = baseColumns.slice()
      this.tableConfig.map(item => {
        let cover = item.cover ? 1 : 0
        columns.splice(item.index, cover, item)
      })
      return columns
    }
  }
}
</script>

<style scoped>
.modal-tabel{
  margin-top: 15px;
}
</style>
