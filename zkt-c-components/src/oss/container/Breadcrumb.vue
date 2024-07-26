<template lang="html">
  <ol class="breadcrumb explorer-breadcrumb">
    <li></li>
    <li v-for="path in paths"><a @click.prevent="handleFolder(path.ossDisplayId)">{{path.displayName}}</a></li>
  </ol>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: {
    paths: {
      type: Array,
      default: []
    }
  },
  methods: {
    handleFolder (id) {
      this.$emit('change', id)
    }
  }
}
</script>

<style lang="css">
.explorer-breadcrumb {
  border-radius: 0;
  margin-bottom: 0;
}
</style>
