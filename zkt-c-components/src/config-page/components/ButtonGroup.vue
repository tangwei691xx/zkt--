<template lang="">
  <div>
    <zkt-button-group
      class="btn-group-sm"
      v-bind="$attrs"
      v-model="text"
      v-on="$listeners"/>
  </div>
</template>
<script>
export default {
  name: 'ButtonGroup',
  inheritAttrs: false,
  data () {
    return {
      text: ''
    }
  }
}
</script>
