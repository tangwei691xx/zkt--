<template>
  <div>
    <div class="producs-top">
      <span class="btn btn-primary" @click="openModal">{{title}}</span>
      <div class="all-select" v-if="val.length > 0" @click="val=[]">全部取消</div>
    </div>
    <zkt-table
      v-if="showTable"
      class="table-bordered modal-tabel"
      :components="components"
      :columns="currentColumns"
      :data="val"
      @delete="clickDelete" />
  </div>
</template>

<script>
import Com from './components/index.vue'
import TransTag from './components/Common/TransTag'
export default {
  name: 'app',
  components: {
    Com
  },
  props: {
    title: {
      type: String,
      default: '选择产品'
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
        return {
          // brandId: 5,
          // hotelId: 5
        }
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
    },
    apiUrl: {
      type: String,
      default: 'api/ticket-api/ticketProduct/jsonGetListTicketProduct'
    },
    method: {
      type: String,
      default: 'get'
    },
    selectProp: {
      type: String,
      default: 'ticketProductId'
    },
    exitActivityProp: {
      type: String,
      default: 'activityTypes'
    },
    isRadio:  {
      type: Boolean,
      default: false
    },
    params: {
      type: Object,
      default() {
        return {
          auditStatus: '',
          productName: '',
          posterTitle: '',
          chooseHotelId: '',
          keyword: ''
        }
      },
    },
    columns: {
      type: Array,
      default(){
        return [
          {
            name: 'productName',
            header: '产品名称',
            component: "TransTag"
          },
          {
            name: 'salePrice',
            header: '价格'
          },
          {
            name: 'statusName',
            header: '产品状态'
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
    isPage: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      components: {
        TransTag
      },
      currentColumns: [],
    }
  },
  computed: {
    val: {
      get () {
        return this.value
      },
      set (v) {
        this.$emit('input', v)
        this.$emit('change', v)
      }
    }
  },
  created () {
    this.currentColumns = this.mergeColumns(this.columns)
  },
  methods: {
    openModal () {
      let _this = this
      let vm = this.$modal({
        title: this.title, // 弹窗标题
        size: 'lg', // 弹窗大小 默认为md
        autoClose: false, // 是否自动关闭 默认为true
        okText: '',
        cancelText: '',
        closeable: true,
        callback (value, type, vm) { // 操作后的回调函数 value是输入框值， type是操作按钮类型 close,postive,negative
          console.log(value, type, vm)
          _this.$emit('onClose')
          // vm.$destroy()
        },
        events: {
          onChange (arr) {
            _this.val = arr
          },
          onSearch (name, query) {
            _this.$emit('onSearch', name, query)
          }
        },
        data: {
          selectedArray: _this.val,
          hotelInfo: _this.hotelInfo,
          tabs: _this.tabs,
          extras: _this.extras,
          listConfig: _this.listConfig,
          apiUrl: _this.apiUrl,
          isRadio: _this.isRadio,
          method: _this.method,
          selectProp: _this.selectProp,
          exitActivityProp: _this.exitActivityProp,
          params: _this.params,
          isPage: _this.isPage,
        }
      },
      Com
      )
    },
    clickDelete (row) {
      this.val.map((item, index) => {
        if (item[this.selectProp] === row[this.selectProp] && item.productType === row.productType) {
          this.val.splice(index, 1)
        }
      })
    },
    mergeColumns (baseColumns) {
      let columns = baseColumns.slice()
      this.tableConfig.forEach(item => {
        let cover = item.cover ? 1 : 0
        columns.splice(item.index, cover,item)
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

.producs-top{
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-right: 32px;
}
.all-select{
  line-height: 22px;
  color: #337ab7;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}
</style>
