<template>
  <div class="zkt-custom-button">
    <span class="big-button" v-if="value.type === 'big' && !value.disabled" @click="$emit('click')">{{value.text}}</span>
    <span class="big-button disabled" v-if="value.type === 'big' && value.disabled">{{value.text}}</span>
    <span class="small-button" v-if="value.type === 'small' && !value.disabled" @click="$emit('click')">{{value.text}}</span>
    <span class="small-button disabled" v-if="value.type === 'small' && value.disabled">{{value.text}}</span>
  </div>
</template>

<script>
export default {
  name: 'zkt-custom-button',
  props: {
    value: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.zkt-custom-button span{
  display: inline-block;
  font-size:14px;
  font-weight:400;
  color:rgba(255,255,255,1);
  text-align: center;
  border-radius:4px;
  cursor: pointer;
}
.zkt-custom-button .big-button{
  width:302px;
  height:36px;
  line-height: 36px;
  background:rgba(50,122,182,1);
}
.zkt-custom-button .big-button.disabled{
  background:rgba(238,238,238,1);
  color: #999;
  cursor: default;
}
.zkt-custom-button .small-button{
  height:35px;
  line-height: 35px;
  background:rgba(50,122,183,1);
  padding: 0 20px;
}
.zkt-custom-button .small-button.disabled{
  background:rgba(238,238,238,1);
  color: #999;
  cursor: default;
}
</style>
