<template>
  <table class="explorer-list table table-hover">
    <thead>
      <tr class="info">
        <td>类型</td>
        <td>文件名</td>
        <td>大小</td>
        <td>修改时间</td>
        <td v-if="false">操作</td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="o in files"
        v-if="o.name!=prefix||o.size"
        :class="{success: ~value.indexOf(o)}"
        :key="o.name"
        @click="o.folder?$emit('cd', o.name):$emit('select', o)">
        <td>
          <span v-if="!o.folder" class="explorer-mime" :class="o.name|mime"></span>
          <span v-if="o.folder" class="explorer-mime fiv-cla fiv-icon-folder"></span>
        </td>
        <td>
          <a :href="o.url" target="_blank" >{{o.name|cutpath}}</a>
        </td>
        <td>{{o.size}}</td>
        <td>{{o.lastModified}}</td>
        <td v-if="false">
          <button class="btn btn-sm btn-link" @dblclick="$emit('remove', o)" title="双击删除">删除</button>
        </td>
      </tr>
      <tr>
        <td colspan="5">
          <button v-if="nextMarker" class="btn btn-block btn-link" @click.prevent="$emit('more')">加载更多</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import mime from '../filters/mime'
import cutpath from '../filters/cutpath'

export default {
  name: 'ExplorerList',
  filters: {
    cutpath,
    mime
  },
  props: {
    files: {
      type: Array,
      default () {
        return []
      }
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    nextMarker: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.explorer-mime {
  width: 1em;
}
</style>
