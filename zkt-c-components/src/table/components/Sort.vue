<template>
  <i class="glyphicon" :class="{
    'glyphicon-sort': sortQuery=='',
    'glyphicon-sort-by-attributes-alt': sortQuery=='desc',
    'glyphicon-sort-by-attributes': sortQuery=='asc',
    }"
     @click="setDir">
  </i>
</template>
<script>
export default {
  name: 'TableSort',
  props: {
    sortQuery: {
      type: String,
      default: ''
    }
  },
  methods: {
    setDir () {
      const arr = ['','desc','asc']
      const currentIndex = arr.indexOf(this.sortQuery)
      const nextOrder = arr[(currentIndex + 1)% arr.length]
      this.$emit('sort', nextOrder)
    }
  }
}
</script>
