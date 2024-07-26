<template>
  <div class="zkt-tinymce">
    <upload-button
      :store="store"
      :multiple="true"
      v-model="urlArr"
      v-show="false"
      @input="insertImg"
      ref="uploadBtn"></upload-button>
    <editor
      v-if="canLoad"
      v-bind="$props"
      v-on="$listeners"
      @onInit="editorLoaded"
      @onUploadbtnClick="openUploadBtnModal" />
  </div>
</template>

<script>
import oss from '../../oss';
import Editor from './Editor'
import {editorProps} from './Editor/EditorPropTypes'
import filesize from 'filesize'
const { Regulate } = oss;

export default {
  name: 'zkt-tinymce',
  components: {
    Editor
  },
  props: {
    ...editorProps,
    store: {
      type: Object,
      default () {
        return undefined
      }
    },
    app: {
      type: String,
      default: 'ebooking',
    },
    scene: {
      type: String,
      default: 'default',
    },
    ossDisplayId: {
      type: Number,
    },
    maxSize: {
      type: Number,
      default: 10 * 1024 * 1024
    },
  },
  data () {
    return {
      editor: null,
      urlArr: [],
      client: {},
      isAllowPasteIamges: this.$props.init.powerpaste_allow_local_images,
      canLoad: !this.$props.init.powerpaste_allow_local_images,
    }
  },
  created() {
    // 开启粘贴本地图片
    if (this.isAllowPasteIamges) {
      // 初始化oss
      this.getOssClient();
      // 获取“我的文件”目录id
      this.getTreeOfUser().then((ossDisplayId) => {
        // 自定义图片上传配置
        this.addImagesUploadHandlerFn(ossDisplayId);
        // 自定义图片URL转换
        this.addUrlconverterCallbackFn();
        // 粘贴到内容区前的校验处理（待完善）
        // this.addPastePostprocessFn();
        this.canLoad = true;
      });
    }
  },
  computed: {
    gateway () {
      return this.$store.state.constant.DOMAIN_WEB_API_GATEWAY || this.$store.state.constant.GATEWAY_URL
    },
    baseURL () {
      return `${location.protocol}//${this.gateway.replace(/\/\//, '')}/api/oss-api/eb/oss/`;
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
    auth () {
      return this.$store.getters.auth
    },
  },
  methods: {
    editorLoaded (evtName, editor) {
      this.editor = editor
    },
    insertImg (urlArr) {
      if (urlArr && urlArr.length) {
        urlArr.forEach(url => {
          this.editor.insertContent('<img src="' + url + '"/>');
        })
      }
    },
    openUploadBtnModal () {
      this.urlArr = []
      if (this.$refs['uploadBtn'] && this.$refs['uploadBtn'].openModal) {
        this.$refs['uploadBtn'].openModal()
      }
      this.$emit('on-upload-btn', this.editor)
    },
    getOssClient() {
      this.client = new Regulate({
        baseURL: this.baseURL,
        params: this.params,
        app: this.app,
        scene: this.scene,
      });
    },
    getTreeOfUser() {
      return new Promise((resolve, reject) => {
        this.client.tree(true).then((tree) => {
          this.ossDisplayId = tree.ossDisplayId;
          resolve(tree.ossDisplayId);
        });
      });
    },
    // 托管图片上传处理
    addImagesUploadHandlerFn (ossDisplayId) {
      let that = this;
      this.$props.init.images_upload_handler = function (blobInfo, succFun, failFun, progress) {
        // console.log('imgUpload blobInfo=', blobInfo, blobInfo.blob(), blobInfo.filename());
        let blob = blobInfo.blob();
        if (blob.size > that.maxSize) {
          failFun(`${blob.name}图片大小请控制在${filesize(that.maxSize)}以内，否则保存不生效`);
          return;
        }
        let file = new File([blob], blobInfo.filename(), {type: blob.type, lastModified: blob.lastModified});
        if(!that.client) return;
        that.client.upload(ossDisplayId, blobInfo.filename(), file)
        .then((res) => {
          if (res.path) {
            file.url = that.client.config.domain + '/' + res.path
            Object.keys(res || {}).map(key => {
              file[key] = res[key];
            })
            succFun(file.url);
            return;
          }
          failFun('上传图片失败')
        })
        .catch((err) => {
          console.log('上传图片出错', err.message);
          failFun('上传图片出错' + err.message)
        })
      }
    },
    // 上传完成后回调更新编辑框的图片url
    addUrlconverterCallbackFn () {
      this.$props.init.urlconverter_callback = function (url, node, onSave, name) {
        // console.log('urlCallback params=', url, node, onSave, name);
        // if (node === 'img' && url.indexOf('blob:') !== -1) {
        //   // 不是oss链接不回显

        // }
        return url;
      }
    },
    // 在粘贴的内容被解析DOM结构，但在被插入到编辑器之前，对其进行修改
    addPastePostprocessFn () {
      this.$props.init.paste_postprocess = function(pluginApi, data) {
        console.log('paste_postprocess=', pluginApi, data);
        if (data.node.firstChild.nodeName === 'IMG') {
          data.node.innerHTML = '<img src="">';
        }
      }
    }
  },
}
</script>
