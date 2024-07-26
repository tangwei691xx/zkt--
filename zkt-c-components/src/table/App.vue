<template>
  <div id="app" class="container">
    <div class="panel panel-default">
      <div class="panel-heading">
        <button class="btn btn-default" @click="params = {};sortParams={}">清除参数</button>
      </div>
      <div class="panel-body">
        <Table
          :data="data"
          :columns="columns"
          :beforeColumns="beforeColumns"
          :selectable="true"
          :components="components"
          :loading="loading"
          :selectedItems="selectedItems"
          :checkInitKey="checkInitKey"
          :checkInitArray="checkInitArray"
          :searchParams="params"
          :sortParams="sortParams"
          ref="table"
          @sort="_onSort"
          @search="_onSearch"
          @edit="_onEdit"
          @select="_onSelect"
          class="table-bordered">
          <tr slot="thead">
            <th colspan="5">thead slot</th>
          </tr>
          <tr slot="tbody">
            <td colspan="5">tbody slot</td>
          </tr>
          <tr slot="tfoot">
            <td colspan="5">tfoot slot</td>
          </tr>
        </Table>
      </div>
    </div>
  </div>
</template>

<script>
import Table from './components'
import columns from './assets/columns'
import beforeColumns from './assets/beforeColumns'
import data from './assets/data'

export default {
  name: 'app',
  components: {
    Table
  },
  data () {
    return {
      components: {
        links: {
          template: '<a>asdasdf</a>'
        }
      },
      data: [], //require('./assets/data.json'),
      columns,
      beforeColumns,
      loading: false,
      params: {
        tel: '156$$$$$1987',
        hobby: '234'
      },
      sortParams: {
        name: 'asc',
        tel: 'desc'
      },
      selectedItems: [], // 复选时，清空已选择数据使用
      checkInitKey: 'tel', // 自定匹配data数据的key值
      checkInitArray: ['156*****1987'] // 初始化数据
    }
  },
  methods: {
    _onSort (key, value) {
      console.log('onsort', key, value)
    },
    _onSearch (key, value) {
      console.log('onSearch', key, value)
    },

    _onEdit (data) {
      console.log(data)
    },
    _onSelect (items) {
      console.log(items, 'items666')
    }
  },
  mounted () {
    console.log(this.$refs.table)
    this.loading = true
    setTimeout(() => {
        this.loading = false
        this.data = data
        this.checkInitArray.push('183*****6678')
      }, 1000)
    setTimeout(() => {
        let temp = [{"name":"吴伟","tel":"183*****6679","hobby":"唱歌","address":"上海市松江区乐都西路867-871号"}, {"name":"吴伟","tel":"183*****6680","hobby":"唱歌","address":"上海市松江区乐都西路867-871号"}]
        this.data = this.data.concat(temp)
        this.checkInitArray.push('182*****1538')
        this.checkInitArray.push('161*****0097')
        this.checkInitArray.push('197*****1123')
        this.checkInitArray.push('183*****6679')
        this.checkInitArray.push('183*****6680')
      }, 1500)
  }
}
</script>
