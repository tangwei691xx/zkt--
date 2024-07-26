<template lang="html">
  <div class="explorer-toolbar btn-toolbar clearfix "
    role="toolbar"
    aria-label="...">
    <div class="btn-group btn-group-sm"
      :class="{'pull-right': group.pullRight,'open':group.open}"
      v-for="group in toolbar">
      <button class="btn btn-default btn-sm"
        v-for="btn in group.type=='radio'&&group.options||[group]"
        v-if="!group.hidden"
        v-show="group.type=='search' ? !searchVisible : true"
        :class="[btn.className, btn.name==group.value&&'active']"
        :title="btn.label"
        @click="onClick(group, btn)">
        <i v-if="btn.icon" class="glyphicon" :class="'glyphicon-'+btn.icon"></i>
        <span v-if="btn.showLabel">{{btn.label}}</span>
        <span class="caret" v-if="group.type=='select'">
        </span>
      </button>
      <form v-on:submit.prevent class="form-inline" v-show="searchVisible" v-if="group.type=='search'">
        <div class="form-group form-group-sm">
          <input type="text" v-model.trim="searchValue" class="form-control" placeholder="请输入要搜索的文件或文件夹名称">
        </div>
        <button type="submit" @click="onSearch(group)" class="btn btn-primary btn-sm">搜索</button>
      </form>
      <ul class="dropdown-menu" v-if="group.type=='select'">
        <li v-for="option in group.options">
          <a href="#" @click.prevent="onClick(group, option)">
            <i v-if="option.icon" class="glyphicon" :class="'glyphicon-'+option.icon"></i>
            {{option.label}}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',
  props: {
    toolbar: {
      type: Array,
      default () {
        return [
          {
            name: 'upload',
            label: '上传文件',
            icon: 'upload'
          },
          {
            name: 'mkdir',
            label: '新建文件夹',
            icon: 'folder-open'
          },
          {
            name: 'refresh',
            label: '刷新',
            icon: 'refresh'
          },
          {
            name: 'search',
            label: '搜索',
            icon: 'search',
            type: 'search',
          },
          {
            name: 'sort',
            value: 'createTime-desc',
            label: '排序',
            type: 'select',
            icon: 'sort-by-attributes-alt',
            className: 'dropdown-toggle',
            open: false,
            pullRight: true,
            options: [
              {
                name: 'createTime-desc',
                label: '按时间倒序',
              },
              {
                name: 'createTime-asc',
                label: '按时间正序',
              },
              {
                name: 'displayName-asc',
                label: '按文件名正序',
              },
              {
                name: 'displayName-desc',
                label: '按文件名倒序',
              }
            ]
          },
          {
            name: 'view',
            value: 'grid',
            type: 'radio',
            pullRight: true,
            options: [
              {
                name: 'grid',
                label: '按缩略图显示',
                icon: 'th'
              },
              {
                name: 'list',
                label: '按列表显示',
                icon: 'th-list'
              }
            ]
          },
        ]
      }
    }
  },
  data(){
    return {
      searchVisible: true,
      searchValue: '',
    }
  },
  methods: {
    onClick (group, option) {
      if(group.type === 'search'){
        this.searchVisible = true;
        return;
      }
      group.open = !group.open
      if (option.options) return
      group.value = option.name
      this.$emit(group.name, option.name)
    },
    onSearch(group) {
      this.$emit(group.name, this.searchValue);
    }
  }
}
</script>

<style lang="css">
  .explorer-toolbar .form-inline{
    white-space: nowrap;
  }
  .explorer-toolbar .form-inline .btn{
    float: none;
  }

  .explorer-toolbar .form-inline .form-control{
    width: 250px;
  }
</style>
