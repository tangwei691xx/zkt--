<template>
  <div class="zkt-filemanager-wrap inline-block">
    <div class="file-wrap inline-block" v-if="!disabled">
      <div
        class="upload-button"
        @click="handleUpload">
        <i class="iconfont iconordering_icon_plus__norma"></i>
        上传
      </div>
      <div
        class="upload-button top-line"
        @click="openModal">选择已上传</div>
    </div>
    <div class="preview-list inline-block" v-if="preview && value && value.length">
      <draggable v-model="val">
        <div
          class="file-wrap"
          style="border:none;"
          v-for="(item, index) in val"
          :key="index"
        >
          <div :class="{videohover: videoTypes[getExt(item)], imghover: imageReg.test(getExt(item))}" >
            <a class="iconfont iconeb_icon_xz_huaban1 download-btn" target="_blank" v-if="imageReg.test(getExt(item))" :href="item"></a>
            <div class="iconfont iconbooking_icon_delete_ delete-btn" :style="imageReg.test(getExt(item)) ? '' : 'right: 31px'" v-if="deleteFlag" @click="remove(index)"></div>
          </div>
          <span v-if="getExt(item) === 'pdf'" class="media-object-img fiv-cla fiv-icon-pdf"></span>
          <img
            v-if="imageReg.test(getExt(item)) && getExt(item)!=='pdf'"
            class="preview-img"
            :src="item"
          >
          <video
            v-if="videoTypes[getExt(item)]"
            class="preview-video"
            :src="item"
          />
        </div>
      </draggable>
    </div>
  </div>

</template>

<script>
import oss from '../../oss';
import Uploader from './Uploader'
import draggable from 'vuedraggable'

const { RegulateExplorer, Explorer, SelectTree, Regulate, OSS } = oss;

export default {
  name: 'zkt-filemamager',
  components: {
    draggable
  },
  props: {
    disabled: {
      type: Boolean,
      default () {
        return false
      }
    },
    deleteFlag: {
      type: Boolean,
      default () {
        return true
      }
    },
    value: {
      type: [Array, String],
      default () {
        return []
      }
    },
    // btnText: {
    //   type: String,
    //   default: '上传'
    // },
    // 是否可多选
    multiple: {
      type: Boolean,
      default: false
    },
    // 文件类型限制逗号分隔
    // .jpg,.png 或者 jpg,png
    allows: {
      type: String,
      default: ''
    },
    // btnClass: {
    //   type: String,
    //   default: 'btn btn-default btn-sm'
    // },
    path: {
      type: String,
      default: 'common/'
    },
    maxSize: {
      type: [String, Number],
      default: '10240kb'
    },
    // 最大单次上传数量
    // limitCount: {
    //   type: Number,
    //   default: 9999
    // },
    // 最大累计上传数量 相对ls
    // uploadMax: {
    //   type: Number,
    //   default: 9999
    // },
    // 已上传数量
    ls: {
      type: Number,
      default: 0
    },
    keyType: {
      type: String,
      default: ''
    },
    // isQrcode: {
    //   type: Boolean,
    //   default: false
    // },
    // nameType: {
    //   type: String,
    //   default: '1'
    // },
    // 选择弹窗 每次最多可选择数量
    // 最多累积选择数量
    limit: {
      type: Number,
      default: 1000
    },
    preview: {
      type: Boolean,
      default: true
    },
    store: {
      type: Object,
      default () {
        return this.$store
      }
    },
    private: {
      type: Boolean,
      default: false
    },
    app: {
      type: String,
      default: 'ebooking',
    },
    scene: {
      type: String,
      default: 'default',
    },
  },
  data () {
    return {
      sts: {},
      qrContent: '',
      client: {},
      pathOut: '',
      privatePath: '',
      uploads: [],
      // imageTypes: {
      //   png: true,
      //   jpg: true,
      //   gif: true,
      //   svg: true,
      //   bmp: true,
      //   jpeg: true,
      //   webp: true
      // },
      videoTypes: {
        mp4: true,
        ogg: true,
        avi: true,
        mov: true,
      },
      currentOssDisplayId: null,
      currentPaths: null,
      imageReg: /^(png|jpg|gif|svg|jfif|bmp|jpeg|webp|pdf|avif)/
    }
  },
  computed: {
    gateway () {
      return this.store.state.constant.DOMAIN_WEB_API_GATEWAY || this.store.state.constant.GATEWAY_URL
    },
    isSwitch() {
      const { coreHotelConfig } = this.store.state || {}
      const { ENABLE_NEW_FILE_MANAGER_SWITCH } = coreHotelConfig || {}
      return ENABLE_NEW_FILE_MANAGER_SWITCH === '1'
    },
    params() {
      const { hotel_id, brand_id, user_id } = this.auth;
      return {
        hotelId: hotel_id,
        merchantId: hotel_id,
        brandId: brand_id,
        userId: user_id,
      }
    },
    baseURL () {
      return `${location.protocol}//${this.gateway.replace(/\/\//, '')}/api/oss-api/eb/oss/`;
    },
    pathFormat () {
      if (/\/$/.test(this.path)) {
        return this.path
      } else {
        return this.path + '/'
      }
    },
    stsPath () {
      let {hotel_id, brand_id, user_id} = this.auth
      return location.protocol + `//${this.gateway.replace(/\/\//, '')}/api/oss-api/token/zktimg?hotelId=${hotel_id}&merchantId=${hotel_id}&brandId=${brand_id}&userId=${user_id}`
    },
    auth () {
      return this.store.getters.auth
    },
    token () {
      return this.store.state.token
    },
    val: {
      get () {
        if (this.multiple) {
          return this.value || []
        } else {
          return (this.value && [this.value]) || []
        }
      },
      set (value) {
        this.$emit('input', this.multiple ? value : value[value.length - 1])
      }
    },
    maxSizeBit () {
      return (this.maxSize + '').replace(/kb/, '') * 1024
    },
    accept () {
      return this.allows && this.allows.split(',').map(suffix => `.${suffix}`).join(',')
    },
    // 酒店配置判断，mis会返回false
    specialCheck () {
      return this.store.state.coreHotelConfig && this.store.state.coreHotelConfig.ENABLE_UPLOAD_CHECK + '' === '1'
    }
  },
  created () {
    
    if(!this.isSwitch){
      this.setPath()
      this.client = new OSS({
        stsPath: this.stsPath,
        token: this.token
      })
    }else{
      this.client = new Regulate({
        baseURL: this.baseURL,
        params: this.params,
        app: this.app,
        scene: this.scene,
      })
    }
    
  },
  methods: {
    setPath () {
      this.pathOut = this.auth.hotel_id ? `h${this.auth.hotel_id}/` : `a${this.auth.admin_id}/`
      this.privatePath = this.auth.user_id ? `u${this.auth.user_id}/` : `a${this.auth.admin_id}/`
    },
    openModal () {
      if (!this.limitCheck()) {
        return
      }
      if(this.isSwitch){
        this.openRegulateModal();
      }else{
        this.openOssModal();
      }
    },
    openRegulateModal () {
      let modal = this.$modal({
        title: '选择已上传文件',
        size: 'lg',
        data: {
          client: this.client,
          limit: this.limit,
          multiple: this.multiple,
          accept: this.accept,
          specialCheck: this.specialCheck,
          maxSize: this.maxSizeBit,
        },
        callback: (value, type, vm) => {
          if (type === 'postive') {
            const { urlPrefix, currentValue } = vm;
            const newValue = currentValue && currentValue.map(item => {
              return {
                ...item,
                url: urlPrefix + item.path,
                name: item.path
              }
            })
            this.onResult(newValue)
            modal.destroy()
          } else {
            modal.destroy()
          }
        },

      }, RegulateExplorer)
    },
    openOssModal () {
      let modal = this.$modal({
        title: '选择已上传文件',
        size: 'lg',
        data: {
          client: this.client,
          // 默认进入的path
          path: this.pathOut.includes('a') ? (this.pathOut + this.pathFormat) : this.pathOut,
          limit: this.limit,
          multiple: this.multiple,
          accept: this.accept,
          specialCheck: this.specialCheck,
          maxSize: this.maxSizeBit,
        },
        callback: (value, type, vm) => {
          if (type === 'postive') {
            vm.value && vm.value.map(item => {
              item.url = item.domain + '/' + item.name
            })
            this.onResult(vm.value)
            modal.destroy()
          } else {
            modal.destroy()
          }
        },

      }, Explorer)
    },
    handleUpload() {
      if (!this.limitCheck()) {
        return
      }
      if(this.isSwitch){
        this.selectTree();
      }else{
        this.upload();
      }
    },

    selectTree () {
      let modal = this.$modal({
        title: '上传到',
        size: 'md',
        data: {
          client: this.client,
          private: this.private,
        },
        callback: (value, type, vm) => {
          if (type === 'postive') {
            const { currentValue } = vm;
            if(currentValue != null){
              this.upload(currentValue)
              modal.destroy()
            }else{
              alert('请选择文件夹')
            }
          } else {
            modal.destroy()
          }
        },
        events: {
          paths: (value) => {
            this.currentPaths = value
          },
        }
      }, SelectTree)
    },
    upload (ossDisplayId) {
      // 打开弹窗前 清空已上传
      this.uploads = []
      // 直接上传

      if(!this.isSwitch){
        let rootPath = this.private ? this.privatePath : this.pathOut
        this.client.currentPath = rootPath + this.pathFormat
      }
      
      let modal = this.$modal({
        title: '上传',
        okText: '',
        cancelText: '',
        size: 'md',
        data: {
          client: this.client,
          multiple: this.multiple,
          accept: this.accept,
          maxSize: this.maxSizeBit,
          limit: this.limit,
          specialCheck: this.specialCheck,
          isSwitch: this.isSwitch,
          ossDisplayId,
        },
        callback: (value, type, vm) => {
          modal.destroy()
        },
        events: {
          sure: () => {
            this.onResult(this.uploads)
            modal.destroy()
          },
          cancel: () => {
            modal.destroy()
          },
          change: (fields) => {
            this.uploads = fields.map(item => {
              return {
                name: item.path,
                ...item
              }
            })
            // modal.destroy()
          }
        }
      }, Uploader)
    },
    onResult (fields) {
      let invalid = false
      let invalidArr = ['maxSizeInValid', 'allowsInValid']
      invalidArr.some(method => {
        invalid = this[method](fields)
        return invalid
      })
      if (invalid) {
        this.tip(invalid.message)
        return false
      }
      fields = this.cutToLimitNum(fields)
      let res = this.formatData(fields)
      if (this.multiple) {
        res = (this.val || []).concat(res)
      }
      this.emitData(res)
    },
    cutToLimitNum (fields) {
      // 限制数量
      let choosedNum = (this.val.length || this.ls)
      if (this.multiple && (fields.length + choosedNum) > this.limit) {
        fields.splice(-((fields.length + choosedNum) - this.limit))
      }
      return fields
    },
    emitData (res) {
      // // 兼容旧版上传组件
      res.map(item => {
        this.$emit('on-loaded', {
          code: 0,
          url: item,
          keyType: this.keyType
        })
      })
      this.val = res.slice()
    },
    // 数据返回统一格式化
    formatData (fields) {
      if (!fields || !fields.length) {
        return []
      }
      return fields.map(item => {
        return item.url
      }).map(url => {
        try {
          return encodeURI(url)
        } catch (error) {
          return url
        }
      })
    },
    remove (index) {
      this.val.splice(index, 1)
      this.val = (this.val && this.val.slice()) || []
    },
    limitCheck () {
      if (this.multiple && (this.val.length || this.ls) >= this.limit) {
        this.tip(`上传数量最多为${this.limit}`)
        return false
      }
      return true
    },
    maxSizeInValid (fields) {
      let invalidFile = fields.find(item => item.size > this.maxSizeBit)
      if (invalidFile) {
        let message = ''
        // 超过1M
        if (this.maxSizeBit > 1024 * 1024) {
          let sizeM = Math.round(this.maxSizeBit / (1024 * 1024))
          message = `文件大小不得超过${sizeM}M`
        } else {
          let sizeKb = Math.round(this.maxSizeBit / 1024)
          message = `文件大小不得超过${sizeKb}KB`
        }
        return {
          file: invalidFile,
          message
        }
      }
    },
    allowsInValid (fields) {
      if (!this.allows) {
        return false
      }
      let invalidFile = fields.find(item => {
        let suffix = item.name.split('.').slice(-1)[0]
        return !this.allows.split(',').includes(suffix)
      })
      if (invalidFile) {
        return {
          file: invalidFile,
          message: `文件必须为${this.allows}类型`
        }
      }
    },
    tip (message) {
      this.$modal({
        message,
        okText: '',
        size: 'sm',
        cancelText: '关闭'
      })
    },
    getExt (fileName) {
      return fileName.split('.').pop().toLowerCase()
    }
  }
}
</script>

<style lang="less" scoped>
  @btnHeith: 100px;
  .file-wrap {
    position: relative;
    display: inline-block;
    width: @btnHeith;
    height: @btnHeith;
    border: 1px dashed #dddde6;
    border-radius: 10px;
    overflow: hidden;
    margin-right: 15px;
  }
  .imghover,.videohover{
    position: absolute;
    background: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    color: #fff;
    width: @btnHeith;
    height: @btnHeith;
    font-size: 25px;
    display: none;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
  }
  .imghover::after,.videohover::after{
    content: '';
    position: absolute;
    background: #fff;
    top: 38px;
    left: 48px;
    height: 21px;
    width: 1px;
    z-index: 10;
  }
  .videohover::after{
    background: none;
  }
  .download-btn{
    position: absolute;
    text-decoration-line: none;
    top: 30px;
    left: 10px;
    height: 36px;
    width: 21px;
    z-index: 10;
  }
  .delete-btn {
    position: absolute;
    top: 30px;
    right: 5px;
    height: 36px;
    width: 33px;
    z-index: 10;
  }
  .inline-block {
    display: inline-block;
  }
  .uploader {
    margin-top: 10px;
  }
  .upload-button {
    color: #808080;
    font-size: 12px;
    text-align: center;
    line-height: @btnHeith/2;
    background: #fff;
    cursor: pointer;
  }
  .upload-button:hover {
    background: #e6e6e6 !important;
  }
  .top-line {
    border-top: 1px dashed #ddd;
  }
  .preview-img {
    width: 100%;
    height: 100%;
  }
  .preview-video {
    width: 100%;
    height: 100%;
  }
  .file-wrap:hover{
    .imghover{
      display: block;
    }
    .videohover{
      display: block;
    }
  }
</style>
