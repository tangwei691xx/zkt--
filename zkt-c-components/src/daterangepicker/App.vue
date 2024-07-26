<template>
  <div id="app">
    <form class="form">
      <div class="row">
        <label for="" class="col-sm-2 control-label">日期时间</label>
        <div class="col-sm-10">
          <daterange-picker
            placeholder="请输入。。"
            readonly="readonly"
            name="inputName"
            class="w400"
            v-model="date"
            :options="options"
            @change="change"
            clear-icon="glyphicon glyphicon-remove">
          </daterange-picker>
        </div>
      </div>
      <div class="row input-custom">
        <label for="" class="col-sm-2 control-label">日期时间</label>
        <div class="col-sm-10">
          <daterange-picker
            placeholder="请输入。。"
            readonly="readonly"
            name="inputName"
            class="w400"
            input-class="input-class"
            v-model="date"
            :options="options"
            @change="change"
            clear-icon="glyphicon glyphicon-remove">
          </daterange-picker>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DaterangePicker from './daterangepicker'
export default {
  name: 'app',
  components: {
    DaterangePicker
  },
  data () {
    return {
      date: '2021-01-17 至 2021-01-19',
      options: {
        separator:' 至 ',
        stickyMonths: true,
        format: 'YYYY-MM-DD HH:mm:ss',
        format2: 'YYYY-MM-DD HH:mm:ss',
        autoClose: false,
        language:'cn',
        endDate: '2021-01-20',
        time: {
            enabled: true
        },
        showShortcuts: true,
        shortcuts :
        {
          'next-days': [3,5,7],
          'next': ['week','month','year']
        }
      },
      clear: true
    }
  },
  methods: {
    change () {
      console.log('change:' + this.date)
    }
  },
  mounted() {
    setTimeout(() => {
      // this.options.separator = ' , '
    }, 5000)
  }
}
</script>

<style scoped>
@import '~bootstrap/dist/css/bootstrap.css';
.w400 {
  width: 400px;
}
.input-custom {
  margin-top: 20px;
}
.input-custom>>>.input-class {
  width: 100%;
  color: red;
}
.input-custom>>>.glyphicon-remove {
  top: 5px;
}
</style>
