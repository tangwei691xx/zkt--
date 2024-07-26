<template>
  <table class="explorer-list table table-condensed table-hover">
    <thead>
      <tr class="info">
        <td width="40" v-if="isCheck">选择</td>
        <td width="40">类型</td>
        <td>名称</td>
        <td width="100" align="right">大小</td>
        <td width="144">修改时间</td>
        <td width="80" v-if="!isCheck">操作</td>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="file in files"
        :class="{success: ~value.indexOf(file)}"
        :key="file.ossDisplayId"
        @click="handleClick(file)"
      >
        <td v-if="isCheck" @click.stop>
          <label class="explorer-list__checkbox">
            <input
              type="checkbox"
              @input="$emit('check', file)"
              :checked="checkValue.indexOf(file) > -1"
            />
          </label>
        </td>
        <td>
          <span v-if="!file.isFolder" class="explorer-mime" :class="file.path|mime"></span>
          <span v-else class="explorer-mime fiv-cla fiv-icon-folder"></span>
        </td>
        <td>
          <a v-if="!file.isFolder" @click.stop :href="urlPrefix + file.path" target="_blank">{{file.displayName}}</a>
          <a v-else>{{file.displayName}}</a>
        </td>
        <td align="right"><template v-if="!file.isFolder">{{file.fileSize | fileSize}}</template></td>
        <td>{{file.createTime}}</td>
        <td v-if="!isCheck" @click.stop>
          <button class="btn btn-xs btn-link" @click="$emit('edit', file)" title="编辑">
            <i class="glyphicon glyphicon-edit"></i>
          </button>
          <button class="btn btn-xs btn-link" @click="$emit('remove', file)" title="删除">
            <i class="glyphicon glyphicon-trash"></i>
          </button>
        </td>
      </tr>
      <tr>
        <td colspan="5">
          <button v-if="isMore" class="btn btn-block btn-link" @click.prevent="$emit('more')">加载更多</button>
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
    mime,
    fileSize: function (value){
      if(!value){
        return "0 Bytes";
      }

      const unitArr = ["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"];
      let index = 0;
      const srcsize = parseFloat(value);
      index = Math.floor(Math.log(srcsize) / Math.log(1024));
      let size = srcsize / Math.pow(1024, index);
      size = size.toFixed(2);
      return size + unitArr[index];
    }
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
    checkValue: {
      type: Array,
      default () {
        return []
      }
    },
    isMore: {
      type: Boolean,
      default: false
    },
    urlPrefix: {
      type: String,
      default: ''
    },
    isCheck: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    handleClick(file) {
      const {ossDisplayId, isFolder} = file;

      if(isFolder){
        this.$emit('cd', ossDisplayId);
      }else{
        this.$emit('select', file);
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
.explorer-list {
  font-size: 12px;
  word-break: break-all;
}

.explorer-list__checkbox{
  margin: 0;
}

.explorer-list__checkbox input{
  margin: 0;
}
</style>
