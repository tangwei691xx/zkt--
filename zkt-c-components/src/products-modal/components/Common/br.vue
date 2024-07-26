<template>
  <div>
    <div v-for="item in value[name]" :key="item">
    {{ item }}
    </div>
  </div>
</template>

<script>
export default {
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

<style>

</style>