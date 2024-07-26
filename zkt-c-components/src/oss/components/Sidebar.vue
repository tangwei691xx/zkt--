<template>
  <div class="explorer-sidebar">
    <ul class="nav">
      <li v-for="space in spaces" :class="{active:~value.indexOf(space)}">
        <a href="" @click.prevent="$emit('input', space)">{{space|nameFilter}}</a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ExplorerSidebar',
  props: {
    value: {},
    spaces: {
      type: Array,
      default () {
        return []
      }
    }
  },
  filters: {
    nameFilter (val) {
      if (!val) { return '-'}
      if (val.includes('h')) {
        return '公共文件'
      } else if (val.includes('u') || val.includes('a')) {
        return '我的文件'
      } else {
        return val
      }
    }
  }
}
</script>

<style>
.explorer-sidebar > .nav > li.active > a {
  background-color: #eee;
}
</style>
