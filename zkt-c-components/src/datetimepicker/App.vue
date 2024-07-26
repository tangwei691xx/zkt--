<template>
  <div id="app">
    <form class="form">
      <div class="form-group">
        <label for="" class="col-sm-2 control-label">日期时间</label>
        <div class="col-sm-10">
          <datetime-picker v-model="date" class="form-control"></datetime-picker>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import DatetimePicker from './datetimepicker'
export default {
  name: 'app',
  components: {
    DatetimePicker
  },
  data () {
    return {
      date: '2018-09-17T02:15:51.120Z'
    }
  }
}
</script>