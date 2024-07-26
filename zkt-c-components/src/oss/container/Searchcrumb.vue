<template lang="html">
  <ol class="breadcrumb explorer-breadcrumb">
    <li>搜索“{{value}}”结果</li>
  </ol>
</template>

<script>
export default {
  name: 'SearchCrumb',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
}
</script>

<style>
  .explorer-breadcrumb{
    margin-bottom: 0;
  }
</style>
