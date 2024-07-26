<template>
  <div class="uploader-wrap">
    <regulate-uploader
      v-if="isSwitch"
      v-bind="$attrs"
      @change="change"
      @uploading="onUploading"/>
    <uploader
      v-else
      v-bind="$attrs"
      @change="change"
      @uploading="onUploading"/>
    
    <footer class="modal-footer">
      <button
        class="btn btn-primary"
        :disabled="uploading"
        @click="!uploading&&$emit('sure')"
      >{{uploading?'上传中':'确定'}}</button>
      <button
        class="btn btn-default"
        @click="$emit('cancel')"
      >取消</button>
    </footer>
  </div>
</template>

<script>

import Uploader from '../../oss/components/Uploader.vue'
import RegulateUploader from '../../oss/container/Uploader'

export default {
  name: 'UploaderWrap',
  inheritAttrs: false,
  props: {
    isSwitch: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      uploading: false
    }
  },
  components: {
    Uploader,
    RegulateUploader
  },
  methods: {
    change (val) {
      this.uploading = false
      this.$emit('change', val)
    },
    onUploading () {
      this.uploading = true
    }
  }
}
</script>

<style lang="less" scoped>
  .uploader-wrap {
    padding: 15px;
    overflow-x: hidden;
  }
</style>
