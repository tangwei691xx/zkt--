<!--
图片裁切组件
弹窗包含图片上传功能
支持多上传按钮裁切
直接返回裁切图片，裁切框位置
传参：
originImage: '' // 裁切的原图
options：{aspectRatio: 16/9} // 图片裁切初始化options
isShowPreview： true  // 是否显示预览图  默认显示
setData: {x:10,y:12,width:100,height:80} //裁切框初始化 裁切图片相对原图的宽高位置数据
unique: '' // 非必传 按钮id 传参代表页面有多个上传按钮，弹窗不显示上传按钮
canvasData: canvas裁切图的width height fillcolor
@closeFn="closeFn" // 非必传 关闭回调
@saveFn="saveFn" // 确认回调
maxSize：1024 // 图片大小限制 
-->
<template lang="html">
  <div class="component-zkt-cropper">
    <slot name="customTop"></slot>
    <upload-button
      v-if="!unique"
      :allows="allows"
      :max-size="maxSize"
      @input="uploadCallBack"/>
    <div class="row cropArea" v-if="originImg">
      <div class="img-container" :class="[(isShowPreview || isShowChangeRatio) ? 'col-sm-7' : 'col-sm-12']">
        <img id="image" :src="originImg" alt="Picture">
      </div>
      <div class="col-sm-4" v-if="isShowPreview || isShowChangeRatio">
        <div class="preview-box" v-if="isShowPreview">
          <p class="text-muted active">预览</p>
          <div class="docs-preview">
            <div class="img-preview" style="width:140px;height:140px"></div>
          </div>
        </div>
        <div class="cropper-ratio-area" v-if="isShowChangeRatio">
          <p class="text-muted active">裁切比例</p>
          <div class="radio row">
            <label
              v-for="(item, index) in aspectRatioList"
              :key="index"
              class="col-sm-6">
              <input
                type="radio"
                name="ratio"
                :value="item.value"
                v-model="currentRatio"
                @change="changeAspectRatio">
              {{item.ratio}}
            </label>
          </div>
        </div>
      </div>
    </div>
    <slot name="customBottom"></slot>
    <footer class="modal-footer">
      <button class="btn btn-primary" @click="saveFn">确定</button>
      <button class="btn btn-default" @click="closeFn">取消</button>
    </footer>
  </div>
</template>

<script>
import Wrapper from 'ali-oss'
import md5 from 'md5'
import Cropper from 'cropperjs'
import "../assets/css/cropper.css";

const REGEXP_ORIGINS = /^https?/i
export default {
  props: {
    originImage: {
      type: String,
      default: ''
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    },
    setData: {
      type: Object,
      default: null
    },
    isShowPreview: {
      type: Boolean,
      default: true
    },
    unique: {
      type: String,
      default: ''
    },
    canvasData: {
      type: Object,
      default () {}
    },
    maxSize: {
      type: Number,
      default: 1024
    },
    allows: {
      type: String,
      default: ''
    },
    path: {
      type: String,
      default: ''
    },
    isShowChangeRatio: {
      type: Boolean,
      default: false
    },
    directUpload: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      isInit: false, // 是否已初始化
      isSubmit: false, // 是否已经提交
      originImg: '', // 原图
      currentRatio: 1,
      aspectRatioList: [
        {
          ratio: '原图比例',
          value: 0
        },
        {
          ratio: '1:1',
          value: 1
        },
        {
          ratio: '4:3',
          value: 2
        },
        {
          ratio: '3:4',
          value: 3
        },
        {
          ratio: '标准屏比例',
          value: 4
        },
        {
          ratio: '自定义',
          value: 5
        },
      ]
    }
  },
  created () {
    this.originImg = this.originImage
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    init () {
      if (this.originImg && !this.isInit) {
        this.isInit = true
        this.initCropper()
      } else if (this.originImg && this.isInit) {
        if (!REGEXP_ORIGINS.test(this.originImg)) {
          this.originImg = location.protocol + this.originImg
        }
        this.cropper.replace(this.originImg)
      } else if (!this.originImg) {
        this.isInit = false
      }
    },
    // 初始化裁切图片
    initCropper () {
      let _this = this
      let options = {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'move',
        rotatable: false,
        preview: '.img-preview',
        minCropBoxWidth: 50,
        minCropBoxHeight: 50,
        minContainerWidth: 300,
        minContainerHeight: 300,
        crop: function (e) {

        },
        ready: function () {
          if (_this.setData) {
            _this.cropper.setData({
              x: Math.round(_this.setData.x),
              y: Math.round(_this.setData.y),
              width: Math.round(_this.setData.width),
              height: Math.round(_this.setData.height),
              scaleX: _this.setData.scaleX || 1,
              scaleY: _this.setData.scaleY || 1,
              rotate: _this.setData.rotate || 0
            })
          }
        }
      }
      options = Object.assign(options, this.options)
      let image = document.getElementById('image')
      this.cropper = new Cropper(image, options)
    },
    // 点击确定按钮
    saveFn () {
      if (this.isSubmit) {
        alert('正在提交中...')
        return false
      }
      if (this.originImg) {
        this.isSubmit = true
        this.getHeadimg()
      } else {
        alert('请上传图片')
      }
    },
    // 获取裁切图
    getHeadimg () {
      // let canvasData = Object.assign({width: 140, height: 140, fillColor: '#fff'}, this.canvasData)
      let result = this.cropper.getCroppedCanvas(this.canvasData)
      result.toBlob((blob) => {
        if (this.directUpload) {
          this.osspic(blob)
        } else {
          this.submit(blob)
        }
      }, 'image/jpeg')
    },
    // 上传阿里云
    osspic (blob) {
      let _this = this
      this.$http.get('api/oss-api/token/zktimg')
      .then((res) => {
        let data = res.body.data
        let client = new Wrapper({
          region: data.region,
          accessKeyId: data.accessKeyId,
          accessKeySecret: data.accessKeySecret,
          stsToken: data.stsToken,
          bucket: data.bucket
        })
        let paramimg = md5('wxa' + new Date().getTime())
        let name = `${data.path}${this.path}${paramimg}.png`
        client.put(name, blob)
        .then((res) => {
          let url = res.url.split('aliyuncs.com')[1]
          url = data.domain + url
          _this.submit(url)
        })
        .catch((res) => {
          console.log(res)
          this.isSubmit = false
          alert('上传图片错误！')
        })
      })
    },
    // 最终提交回调
    submit (url) {
      let originData = this.cropper.getData(true)
      this.isSubmit = false
      this.$emit('saveFn', {getData: originData, originImage: this.originImg, cropImage: url, unique: this.unique})
    },
    closeFn () {
      this.isSubmit = false
      this.$emit('closeFn')
    },
    // 点击上传按钮
    uploadCallBack (url) {
      let _this = this
      if (url) {
        if (!REGEXP_ORIGINS.test(url)) {
          url = location.protocol + url
        }
        this.$set(this, 'originImg', url)
        this.$nextTick(function () {
          // 是否已经初始化裁切功能
          if (_this.isInit) {
            _this.cropper.replace(url)
          } else {
            _this.isInit = true
            _this.initCropper()
          }
          // $('#cropperModal').modal('handleUpdate')
        })
      } else {
        alert('上传图片失败，请重试')
      }
    },
    // 切换裁切比例
    changeAspectRatio () {
      if (this.currentRatio === 0) {
        let img = new Image()
          img.src= this.originImg
          img.onload = () => {
            let ratio = (img.width / img.height).toFixed(2)
            this.cropper.setAspectRatio(ratio)
          }
      } else {
        this.cropper.setAspectRatio(this.formatRatio(this.currentRatio))
      }
    },
    // 转换裁切比例
    formatRatio (value) {
      let ratio = ''
      switch (value) {
        case 1:
          ratio = 1 / 1
          break
        case 2:
          ratio = 4 / 3
          break
        case 3:
          ratio = 3 / 4
          break
        case 4:
          ratio = 0.56
          break
        case 5:
          ratio = NaN
          break
      }
      return ratio
    }
  }
}
</script>

<style scoped>
.help-block{
  display: inline-block;
  color: red;
}
.text-muted{
  margin-top: 6px;
  color: #333;
}
.component-zkt-cropper{
  padding: 20px 10px 0;
  min-height: 100px;
}
.component-zkt-cropper .cropArea.row{
  margin: 10px 0;
}
.img-preview{
  background-color: #f7f7f7;
  overflow: hidden;
}
img-preview img{
  width: 100%;
}
.img-container{
  margin-right: 20px;
  max-height: 400px;
  overflow: hidden;
}
.img-container img{
  max-width: 100%
} 
.preview-box{
  padding:10px;
  background:#f7f7f7;
}
.text-muted.active{
  color: #888;
  margin-bottom: 10px;
}
.component-zkt-cropper .row{
  margin: 0;
}
.modal-footer{
  margin-top: 20px;
}
.component-zkt-cropper .radio label{
  margin-bottom:14px;
}
.cropper-ratio-area{
  margin-top:14px;
}
</style>
<style>
.component-zkt-cropper .col-sm-2.do-not-dragable{
  max-width:90px;
}
.component-zkt-cropper .col-sm-7,.component-zkt-cropper .col-sm-12{
  padding:0;
}
</style>
