<template lang="html">
  <div class="thumbnails row">
    <div class="do-not-dragable" :class="uploadBtnTxt?'col-sm-1':'col-sm-2'" v-if="!disabled">
      <div class="col-sm-12 row">
        <div class="thumbnail-wrapper">
          <a class="thumbnail thumbnail-blank" v-if="!uploadBtnTxt">
            <button type="button" class="btn btn-sm btn-link btn-block" @click="openModal">
              <i class="glyphicon glyphicon-plus"></i>
            </button>
          </a>
          <button
            v-if="uploadBtnTxt"
            type="button"
            class="btn btn-primary zkt-upload-btn"
            @click="openModal">{{uploadBtnTxt}}</button>
        </div>
      </div>

    </div>
    <div class="col-sm-10" ref="thumbnails" v-show="preview">
      <div class="col-sm-2 mb10" v-for="(img, i) in val" :key="img">
        <div class="thumbnail-wrapper" v-if="img">
          <a class="thumbnail zkt-thumbnail-img">
            <button type="button" class="btn btn-xs btn-block btn-warning" v-if="!disabled" @click="remove(img)">删除</button>
            <img :src="img" alt="" class="img-responsive">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'Finder',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    uploadBtnTxt: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number,
      default: 1000
    },
    maxKeys: {
      type: Number,
      default: 1000
    },
    // 统一使用zktimg
    // legacy: {
    //   type: Boolean,
    //   default: true
    // },
    preview: {
      type: Boolean,
      default: true
    },
    value: {},
    maxSize: { //传kb
      type: Number,
      default: 10240
    },
    allows: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    originName: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      clientConfig: null,
      defaultImage: '/static/img/default-50x50.gif',
      urls: []
    }
  },
  computed: {
    tokenUrl () {
      return 'api/oss-api/token/zktimg'
    },
    val: {
      get () {
        return this.multiple ? this.value : [this.value]
      },
      set (v) {
        this.$emit('input', this.multiple ? v : v[0])
      }
    }
  },
  methods: {
    openModal () {
      var that = this
      let path = ''
      if (this.multiple && this.val.length >= this.limit) {
        alert(`图片最多可上传${this.limit}张`)
        return
      }
      if (this.path) {
        path = this.path + '/'
      }
      this.getClientConfig((clientConfig) => {
        var modal = this.$modal({
          // title: '选择或上传文件',
          size: 'zkt-oss',
          closeable: false,
          data: {
            multiple: true,
            limit: that.limit,
            maxKeys: that.maxKeys,
            clientConfig,
            path: clientConfig.path + path,
            originName: this.originName,
            layout: 'col-xs-3',
            style: {
              margin: 0
            }
          },
          callback (value, type, vm) {
            if (type !== 'postive') return
            let sizeFlag = false
            let allowsFlag = false
            vm.selectedObjects.map((v, i) => {
              // 图片类型限制
              let arr = v.name.split('.')
              let suffix = arr[arr.length - 1]
              if (that.allows && that.allows.indexOf(suffix) === -1) {
                allowsFlag = true
                return
              }
              // 图片大小限制
              if (v.size / 1024 > that.maxSize) {
                sizeFlag = true
                return
              }
              var url = clientConfig.domain + '/' + v.name
              that.multiple ? that.val.push(url) : that.val.splice(0, 1, url)
            })

            // 限制图片数量
            if (that.val.length > that.limit) {
              that.val.splice(-(that.val.length - that.limit))
            }
            that.val = that.val.slice(0)

            // 图片大小和图片类型限制
            if (allowsFlag && sizeFlag) {
              alert(`图片必须为${that.allows}类型，且图片大小不得超过${that.maxSize / 1024}M`)
            } else if (allowsFlag) {
              alert(`图片必须为${that.allows}类型`)
            } else if (sizeFlag) {
              if (that.maxSize > 1024) {
                alert(`图片大小不得超过${that.maxSize / 1024}M`)
              } else {
                alert(`图片大小不得超过${that.maxSize}KB`)
              }
            }
            modal.close()
          }
        }, 'ZktOSS')
      })
    },
    getClientConfig (cb) {
      if (this.clientConfig) {
        cb(this.clientConfig)
      } else {
        this.$http.get(this.tokenUrl)
        .then((res) => {
          cb(res.body.data)
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    remove (img) {
      var index = this.val.indexOf(img)
      if (index > -1) {
        this.val.splice(index, 1)
      }
      this.val = this.val.slice(0)
    }
  },
  mounted () {
    var vm = this
    this._sortable = new Sortable(this.$refs.thumbnails, {
      group: this.name,
      filter: '.do-not-dragable',
      onUpdate (e) {
        var item = vm.val[e.oldIndex]
        vm.val.splice(e.oldIndex, 1)
        vm.val.splice(e.newIndex, 0, item)
        vm.val = vm.val.slice(0)
      }
    })
  }
}
</script>

<style lang="css">
.mb10{
  margin-bottom:10px;
}
.thumbnails {
  width: 100%;
}
.thumbnails .thumbnail-wrapper {
  position: relative;
  height: 0;
  padding-top: 100%;
}
.thumbnails .thumbnail {
  position: absolute;
  top:0;
  left: 0;
  right:0;
  bottom: 0;
  margin-bottom: 0;
  padding: 0;
}
.thumbnails .zkt-thumbnail-img{
  overflow:hidden;
}
.thumbnails .thumbnail img {
  width: 100%;
  height: 100%;
}
.thumbnails .thumbnail .btn {
  position: relative;
  margin-bottom: -20px;
}
.thumbnails .thumbnail-blank {
  border-style: dashed;
  background-color: transparent;
  text-align: center;
}
.thumbnails .thumbnail-blank .btn {
  height: 100%;
  margin: 0;
}
.modal-zkt-oss {
  width: 650px;
  height: 500px;
}
.modal-zkt-oss .panel-body {
  height: 450px;
  overflow-y: auto;
}
</style>
<style scoped>
.zkt-upload-btn{
  position: absolute;
  left: 0;
  top: 0;
}
</style>
