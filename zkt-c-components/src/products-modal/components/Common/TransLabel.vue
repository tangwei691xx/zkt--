<template>
  <div class="zkt-table-cell-html">
    <span>{{value[name]}}</span>
    <span class="tag-style" v-for="(item, index) in labels" :key="index">{{item}}</span>
  </div>
</template>

<script>
const LABEL_MAP = {
  brandMulti: '多店通用',
  validCard: '有效期卡',
  specType: '多规格',
  limitSell: '每日限量',
  limitTime: '每日限时',
  mail: '邮寄产品',
  passZhiLian: '门票直连',
  roomZhiLian: '客房直连'
}
export default {
  name: 'TransLabel',
  data () {
    return {

    }
  },
  computed: {
    labels() {
      return Object.keys(LABEL_MAP).filter(item => _.includes(this.value.productLabelList, item)).map(item => LABEL_MAP[item])
    }
  },
  props: {
    value: {
      type: Object,
      defatul () {
        return {}
      }
    },
    name: {
      type: String,
      defatul: ''
    }
  }
}
</script>

<style scoped>
  .zkt-table-cell-html span:nth-child(1){
    word-break: break-all;
  }
  .tag-style{
    padding:2px 4px;
    background:#D84423;
    border-radius:5px;
    margin-left:4px;
    font-size:10px;
    color:#fff;
  }
</style>
