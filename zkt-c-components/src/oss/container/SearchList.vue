<template>
  <table class="explorer-list table table-condensed table-hover">
    <thead>
      <tr class="info">
        <td width="40">类型</td>
        <td>名称</td>
        <td>位置</td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="file in files"
        :class="{success: ~value.indexOf(file)}"
        :key="file.displayId"
        @click="handleClick(file)">
        <td>
          <span v-if="!file.isFolder" class="explorer-mime" :class="file.path|mime"></span>
          <span v-else class="explorer-mime fiv-cla fiv-icon-folder"></span>
        </td>
        <td>
          <a v-if="!file.isFolder" @click.stop :href="urlPrefix + file.path" target="_blank" v-html="renderHighlight(file.displayName)"></a>
          <a v-else v-html="renderHighlight(file.displayName)"></a>
        </td>
        <td><a href="javascript:;" @click.stop="handleClick(file, true)">{{rootDisplayName}}/{{file.parentPath}}</a></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import mime from '../filters/mime'

export default {
  name: 'ExplorerSearchList',
  filters: {
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
    urlPrefix: {
      type: String,
      default: ''
    },
    rootDisplayName: {
      type: String,
      default: ''
    },
    highlight: {
      type: String,
      default: ''
    }
  },
  methods: {
    renderHighlight(value){
      return value.split(this.highlight).join(`<span>${this.highlight}</span>`)
    },
    handleClick(file, isParent = false) {
      const {ossDisplayId, isFolder, parentDisplayId} = file;

      if(isParent) {
        this.$emit('cd', parentDisplayId);
      } else {
        if(isFolder){
          this.$emit('cd', ossDisplayId);
        }else{
          this.$emit('select', file);
        }
      }

    }
  }
}
</script>

<style>
.explorer-mime {
  font-size: 14px;
  width: 1em;
}
.explorer-list{
  font-size: 12px;
  word-break: break-all;
}

.explorer-list td a span {
  color: #b73636;
  font-weight: bold;
}
</style>
