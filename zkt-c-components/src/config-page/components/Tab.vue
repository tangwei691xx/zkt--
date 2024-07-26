<template lang="">
  <div>
    <Tabs 
      v-if="$attrs.tabs && $attrs.tabs.length"
      v-model="tabIndex"
      v-bind="$attrs"
      @change="_onChangeTab"
       />
  </div>
</template>
<script>
export default {
  name: 'configTab',
  props: ['value'],
  inheritAttrs: false,
  data(){
    return {
      tabIndex:this.value,
    }
  },
  methods: {
    _onChangeTab (val,sss) {
      this.$emit('changeTab',val,sss)
    }
  }
}
</script>
