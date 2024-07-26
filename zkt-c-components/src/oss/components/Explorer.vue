<template lang="html">
  <div class="panel panel-default explorer">
    <div class="panel-heading clearfix">
      <toolbar
        @upload="showUploader=true"
        @remove="remove"
        @hide="hide"
        @mkdir="mkdir"
        @refresh="list"
        @userspace="changeUserspace"
        @view="changeView"
        @sort="sort"
        :multiple="multiple"
        :prefix="prefix"
      />
    </div>
    <message ref="message" />
    <div class="panel-body" ref="container">
      <div class="col-sm-2">
        <Sidebar :spaces="spaces" v-model="prefix" @input="refresh" class="row" />
      </div>
      <div class="col-sm-10 explorer-content-container">
        <div class="">
          <breadcrumb :prefix="prefix" @change="cd" class="row" />
          <div class="explorer-list-container">
            <list
              v-if="view=='list'"
              v-model="value"
              :files="files"
              :nextMarker="nextMarker"
              :prefix="prefix"
              @cd="cd"
              @select="select"
              @more="more"
              @remove="remove"
            />
            <grid
              v-if="view=='grid'"
              v-model="value"
              :files="files"
              :nextMarker="nextMarker"
              :prefix="prefix"
              @cd="cd"
              @select="select"
              @more="more"
              @remove="remove"
            />
          </div>
        </div>
      </div>

      <modal
        v-if="showUploader"
        title="上传文件"
        @close="onCloseUploader"
        ref="modal"
      >
        <uploader
          v-if="showUploader"
          @change="uploaded"
          :multiple="multiple"
          :accept="accept"
          :client="client"
          :maxSize="maxSize"
          :special-check="specialCheck"
        />
      </modal>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import OSS from '../services/oss'
import LazyLoad from 'vanilla-lazyload'
import Toolbar from './Toolbar.vue'
import Breadcrumb from './Breadcrumb.vue'
import Sidebar from './Sidebar.vue'
import Grid from './Grid.vue'
import List from './List.vue'
import Uploader from './Uploader.vue'
import Modal from './Modal.vue'
import Message from './Message.vue'
import { SPECIAL_REGEXP } from '../const'

export default {
  name: 'Explorer',
  components: {
    Toolbar,
    Breadcrumb,
    Sidebar,
    Grid,
    List,
    Modal,
    Message,
    Uploader
  },
  props: {
    client: {
      type: Object,
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    accept: {
      type: String,
      default: ''
    },
    limit: {
      type: Number,
      default: 0
    },
    path: {
      type: String,
      default: ''
    },
    specialCheck: {
      type: Boolean,
      defualt: false
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024
    }
  },
  data () {
    return {
      files: [],
      spaces: [],
      prefix: this.path, // 当前文件夹
      nextMarker: null, // 最后一个文件标记
      uploads: [],
      showUploader: false,
      view: 'grid'
    }
  },
  methods: {
    changeUserspace (userspace) {
      this.prefix = userspace === 'public' ? this.path : this.privatePath
      this.nextMarker = null
      this.files = []
      return this.list()
    },
    changeView (view) {
      this.view = view
      // 等待视图更新完毕再重新加载图片
      this.$nextTick(() => {
        this.$emit('lazyload')
      })
    },
    cd (prefix) {
      this.prefix = prefix
      this.nextMarker = null
      return this.list({
        prefix: prefix
      })
    },
    select (object) {
      let set = new Set(this.value)
      if (!set.has(object) && this.value.length >= this.limit) {
        return this.showMessage(`最多选${this.limit}个`)
      }
      set.has(object) ? set.delete(object) : set.add(object)
      this.value.splice(0, this.value.length, ...set)
      this.value.map(item => {
        item.domain = this.client.config.domain
      })
    },
    list(params) {
      let p = this.client.list(Object.assign({
        prefix: this.prefix ,
        marker: this.nextMarker
      }, params))
      // 清除上次显示结果
      .then((res) => {
        this.value.splice(0, this.value.length)
        this.files = []
        return res
      })
      .then((res) => {
        this.files = res.files
        this.nextMarker = res.nextMarker
        return res
      })
      .catch((err) => {
        this.showMessage(err)
      })
      .finally(() => {
        this.$nextTick(() => {
          this.$emit('lazyload')
        })
      })
      this.showMessage(p)
      return p
    },
    refresh () {
      this.nextMarker = ''
      return this.list()
    },
    more () {
      return this.list()
    },
    sort (sort) {
      let arr = sort.split('-')
      let key = arr[0]
      let order = arr[1] === 'asc' ? -1 : 1

      let prefixes = this.files
      .filter(item => item.folder)
      .sort((prev, next) => {
        return prev < next ? order : -order
      })
      let objects = this.files
      .filter(item => !item.folder)
      .sort((prev, next) => {
        return prev[key] < next[key] ? order : -order
      })
      this.files = []
      // 触发重新渲染
      setTimeout(() => {
        this.files = prefixes.concat(objects)
        this.$nextTick(() => {
          this.$emit('lazyload')
        })
      })
    },
    upload (fileName, file) {
      return this.client.upload(encodeURIComponent(fileName), file)
    },
    uploaded (files) {
      this.uploads = files
    },
    remove (o) {
      if (o) {
        let p = this.client.delete(o.name)
          .then(() => {
            return this.list()
          })
        this.showMessage(p)
        return p
      }
      if (!this.value.length) {
        return this.showMessage('没有选择文件')
      }
      let tasks = []
      this.value.forEach((object) => {
        tasks.push(this.client.delete(object.name))
      })
      let p = Promise.all(tasks)
        .then((res) => {
          this.value.splice(0, this.value.length)
          return this.list()
        })
        .catch((err) => {
          this.showMessage(err)
        })
        .finally(() => {
          this.loading = false
        })
      this.showMessage(p)
      return p
    },
    hide () {
      if (!this.value.length) {
        return this.showMessage('没有选择文件')
      }
      let tasks = []
      this.value.forEach((object) => {
        tasks.push(this.client.hide(object.name))
      })
      let p = Promise.all(tasks)
        .then((res) => {
          this.value.splice(0, this.value.length)
          return this.list()
        })
        .catch((err) => {
          this.showMessage(err)
        })
        .finally(() => {
          this.loading = false
        })
      this.showMessage(p)
      return p
    },
    mkdir () {
      let promptTip = '请输入文件夹名'
      this.specialCheck && (promptTip += '，文件夹名只能包含 (中文 英文 数字 . _ -)字符')
      var folderName = prompt(promptTip, dayjs().format('YYYY-MM'))
      if (!folderName) return
      if (this.specialCheck && !SPECIAL_REGEXP.test(folderName)) {
        this.showMessage('文件夹名只能包含 (中文 英文 数字 . _ -)字符')
        return
      }
      this.loading = true
      return this.client.mkdir(this.prefix + folderName)
      .then((res) => {
        return this.list()
      })
      .catch((err) => {
        this.showMessage(err)
      })
      .finally(() => {
        this.loading = false
      })
    },
    showMessage (message) {
      this.$refs.message.open(message)
    },
    onCloseUploader () {
      this.showUploader=false
      this.refresh()
    }
  },
  mounted () {
    this.lazyLoad = new LazyLoad({
      container: this.$refs.container
    })
    this.$on('lazyload', () => {
      this.lazyLoad.update()
    })
    this.client.getClient()
      .then((client) => {
        this.spaces = client.options.paths || []
      })
    this.list()
  },
  beforeDestroy () {
    this.lazyLoad.destroy()
  }
}
</script>

<style lang="css">
.explorer {
  position: relative;
}
.explorer .panel-body {
  position:relative;
  padding: 0;
}
.explorer-list-container {
  height: 370px;
  overflow-y: scroll;
  overflow-x: hidden;
}

.explorer-content-container {
  box-shadow: -1px 0px 0px #ddd;
}
</style>
