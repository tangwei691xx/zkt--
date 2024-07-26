<template>
  <div class="zkt-table-cell-html">
    <span>{{value[name]}}</span>
    <span class="tag-style" v-if="value.isBrandMultiple === 1">多店通用</span>
    <span class="tag-style" v-if="value.ecardType === 'valid_card'">有效期卡</span>
    <span class="tag-style" v-if="value.productType === 'gift'">赠券产品</span>
    <span class="tag-style" v-if="value.productSpecType === 1">多规格</span>
    <span class="tag-style" v-if="value.productStatusVmo && value.productStatusVmo.limitSell === 1">每日限量</span>
    <span class="tag-style" v-if="value.productStatusVmo && value.productStatusVmo.limitTime === 1">每日限时</span>
    <span class="tag-style" v-if="value.shipType === 'mail' || value.shipType === 'all'">邮寄产品</span>
    <span class="tag-style" v-if="value.productStatusVmo &&  value.productStatusVmo.zhiLianPass === 1">门票直连</span>
    <span class="tag-style" v-if="value.productStatusVmo && value.productStatusVmo.zhiLianRoom === 1">客房直连</span>
  </div>
</template>

<script>
export default {
  name: 'zkt-table-cell-html',
  data () {
    return {

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
