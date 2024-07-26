<template>
  <div class="explorer-uploader">
    <div class="row">
      <div class="col-xs-3 col-md-3" v-for="(file,index) in files">
        <media
          :file="file"
          :deleteable="true"
          :class="{
            loading: uploading.displayName == file.displayName
          }"
          :urlPrefix="file.urlPrefix"
          @remove="remove"
        />


        <div
          class="text-danger explorer-uploader-message"
          v-if="errFilesMap[file.displayName]">
            {{errFilesMap[file.displayName]}}
        </div>
      </div>
      <div class="col-xs-3 col-md-3">
        <div class="explorer-media-object">
          <slot>
          <div class="thumbnail" style="border:1px dashed #ccc;">
            <span class="explorer-uploader-handle" :class="{'explorer-uploader-handle-disable': exceedLimit}">+</span>
            <input
              type="file"
              class="explorer-uploader-input"
              :title="exceedLimit?`数量不能超过${limit}`:'点击或拖动文件到这里上传文件'"
              ref="fileBox"
              :disabled="exceedLimit"
              :multiple="multiple"
              :accept="accept"
              @change="onChange">
          </div>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filesize from 'filesize'
import dayjs from 'dayjs';
import Media from './Media.vue'
import { SPECIAL_REGEXP, SPECIAL_REGEXP_TEXT } from '../const'

export default {
  name: 'ExplorerUploader',
  components: {
    Media
  },
  props: {
    multiple: {
      type: Boolean,
      default: true
    },
    accept: {
      type: String,
      default: ''
    },
    client: {
      type: Object,
      default: null
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024
    },
    limit: {
      type: Number,
      default: 1000
    },
    specialCheck: {
      type: Boolean,
      default: false
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    ossDisplayId: {
      type: Number,
    }
  },
  data () {
    return {
      files: [],
      uploading: {},
      errFilesMap: {},
    }
  },
  computed: {
    exceedLimit () {
      if (!this.files) {
        return false
      }
      let uploadedFiles = this.files.filter(file => !this.errFilesMap[file.displayName])
      return uploadedFiles.length >= this.limit
    }
  },
  methods: {
    onChange (e) {
      let files = Array.from(e.target.files)
        .map((file) => {
          return {
            displayName: file.name,
            dataURL: window.URL.createObjectURL(file),
            createTime: dayjs(file.lastModified).format('YYYY-MM-DD HH:mm:ss'),
            fileSize: file.size,
            file: file,
            path: file.name,
          }
        })
      // 同名同大小文件排除
      files = files.filter(file => {
        return !this.files.some(item => {
          return item.displayName === file.displayName && item.fileSize === file.fileSize
        })
      })
      this.files = this.files.concat(files)
      this.$emit('uploading')
      this.upload(files)
      .then(() => {
        this.uploading = {}
        this.$emit('change', this.files.filter(file => !this.errFilesMap[file.displayName]))
      })
    },
    remove (file) {
      let index = this.files.findIndex((item) => {
        return item.displayName == file.displayName
      })
      this.files.splice(index, 1)
      this.clearInput()
      this.$emit('change', this.files.filter(file => !this.errFilesMap[file.displayName]))
    },
    upload (files) {
      // 串行逐个上传文件
      let ret = Promise.resolve(null)
      files.forEach((file) => {
        let fileName = file.displayName
        ret = ret.then(() => {
          if (file.fileSize > this.maxSize) {
            this.$set(this.errFilesMap, fileName, `最大${filesize(this.maxSize)}`)
            return
          }
          if (this.specialCheck && !SPECIAL_REGEXP.test(fileName)) {
            this.$set(this.errFilesMap, fileName, `文件名${SPECIAL_REGEXP_TEXT}`)
            return
          }
          this.uploading = file
          return this.client.upload(this.ossDisplayId, fileName, file.file)
            .then((res) => {
              file.url = this.client.config.domain + '/' + res.path
              Object.keys(res || {}).map(key => {
                file[key] = res[key];
              })
            })
            .catch((err) => {
              this.$set(this.errFilesMap, fileName, err.message)
            })
        })
      })
      return ret
    },
    clearInput () {
      this.$refs.fileBox.value = ''
    },
  }
}
</script>

<style>
.explorer-media-object{
  width: 100%;
  height: 0;
  padding: 100% 0 10% 0;
  position: relative;
  overflow: visible;
  cursor: pointer;
}
.explorer-media-object .thumbnail {
  position: absolute;
  height: 90%;
  width: 100%;
  top: 0;
  left: 0;
  background-color: #f5f5f5;
  overflow: hidden;
}
.explorer-uploader-handle {
  position: absolute;
  height: 50px;
  width: 50px;
  top: 50%;
  left: 50%;
  margin-top: -25px;
  margin-left: -25px;
  font-size: 50px;
  line-height: 50px;
  text-align: center;
  opacity: 0.8;
}
.explorer-uploader-input {
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height:100%;
}
.explorer-uploader-message {
  margin-top: -10px;
  font-size: 12px;
}
.explorer-uploader .explorer-uploader-handle-disable {
  color: #eee;
}
</style>
