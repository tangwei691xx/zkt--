<template lang="html">
    <div class="explorer-media-object">
      <div class="thumbnail">
        <img
          v-if="imageTypes[ext]"
          :key="file.displayName"
          class="media-object-img"
          :src="file.dataURL"
          :data-src="url | thumbnail"
          @click="select(file)">
        <!-- <video
          v-if="videoTypes[ext]"
          class="media-object-img"
          :src="file.dataURL"
          controls
        >
        </video> -->
        <span v-if="!file.isFolder&&!imageTypes[ext]"
          class="media-object-img"
          :class="file.path|mime"
          @click="select(file)">
        </span>
        <span v-if="file.isFolder"
         class="media-object-img"
         :class="'.folder'|mime"
         @click="$emit('cd', file.ossDisplayId)">
        </span>
        <a class="media-object-name"
          v-if="file.isFolder"
          @click="$emit('cd', file.ossDisplayId)"
        >
          {{file.displayName}}
        </a>
        <a class="media-object-name"
          v-else
          :href="url"
          target="_blank"
        >
          {{file.displayName}}
        </a>
      </div>
      <template v-if="!deleteable">
        <div class="explorer-media-operation">
          <button class="btn btn-link btn-operation is-check" @click="$emit('check', file)" title="选择"><i class="glyphicon glyphicon-check"></i><i class="glyphicon glyphicon-unchecked"></i></button>
        </div>
        <div class="explorer-media-operation">
          <button class="btn btn-link btn-operation" @click="$emit('edit', file)" title="编辑"><i class="glyphicon glyphicon-edit"></i></button>
          <button class="btn btn-link btn-operation" @click="$emit('remove', file)" title="删除"><i class="glyphicon glyphicon-trash"></i></button>
        </div>
      </template>
      <button
        type="button"
        class="close"
        v-else
        @dblclick.stop="$emit('remove', file)"
        title="双击删除">
        <span aria-hidden="true">×</span>
      </button>
    </div>
</template>

<script>
import mime from '../filters/mime'
import thumbnail from '../filters/thumbnail'

export default {
  name: 'Media',
  filters: {
    mime,
    thumbnail
  },
  props: {
    file: {
      type: Object,
      default () {
        return {}
      }
    },
    deleteable: {
      type: Boolean,
      default: false
    },
    urlPrefix: {
      type: String,
      default: ''
    },
  },
  data () {
    return {
      imageTypes: {
        png: true,
        jpg: true,
        gif: true,
        svg: true,
        bmp: true,
        jpeg: true,
        webp: true,
        avif: true,
      },
      videoTypes: {
        mp4: true,
        ogg: true,
        avi: true
      }
    }
  },
  computed: {
    ext () {
      return this.file.path && this.file.path.split('.').pop().toLowerCase()
    },
    url () {
      return this.urlPrefix + this.file.path
    }
  },
  methods: {
    select (file) {
      this.$emit('select', file)
    }
  },
   watch: {
    file() {
      console.log('---- watch file change2 ----', this.file);
    }
  },
}
</script>

<style lang="css">
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
.media-object-img {
  display: block;
  width: 100% !important;
  height: 100% !important;
  background-size: 50%;
}
.explorer-media-object .media-object-name {
  position: absolute;
  display:block;
  height: 1.5em;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding-left: 2px;
  background: #000;
  color: #fff;
  opacity: 0.6;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;
}
.explorer-media-object .close {
  display: none;
  position: absolute;
  right: -10px;
  top: -10px;
  width: 20px;
  height: 20px;
  /* border: 1px solid #333; */
  border-radius: 100%;
  background: #fff;
  font-size: 12px;
  opacity: 0.8;
}
.explorer-media-object:hover .close {
  display: block;
}


.explorer-media-object .btn-operation{
  display: none;
  position: absolute;
  top: 0;
  right: 0;
  color: #666;
  font-size: 16px;
  padding: 5px;
  line-height: 0;
}

.explorer-media-object .btn-operation.is-check {
  display: block;
}

.explorer-media-object .btn-operation:first-of-type{
  right: auto;
  left: 0;
}

.explorer-media-object:hover .btn-operation, .explorer-media-object.check .btn-operation{
  display: block;
}

.explorer-media-object.active .thumbnail {
  box-shadow: 0px 1px 6px 4px #337ab7;
}
.explorer-media-object.loading .thumbnail {
  animation-timing-function: ease-in-out;
  animation-name: media-breath;
  animation-duration: 1500ms;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

.explorer-media-object .explorer-media-operation{
  display: none;
}

.explorer-media-object .explorer-media-operation:last-of-type{
  display: block;
}

.explorer-media-object.is-operation .explorer-media-operation{
  display: block;
}

.explorer-media-object.is-operation .explorer-media-operation:last-of-type{
  display: none;
}

.explorer-media-object .glyphicon-unchecked {
  display: inline-block;
}

.explorer-media-object .glyphicon-check {
  display: none;
  color:#0093df;
}

.explorer-media-object.check .glyphicon-unchecked {
  display: none;
}

.explorer-media-object.check .glyphicon-check {
  display: inline-block;
}

@keyframes media-breath {
    0% {
        opacity: .4;
        box-shadow: 0 1px 2px rgba(0, 147, 223, 0.4), 0 1px 1px rgba(0, 147, 223, 0.1);
    }

    100% {
        opacity: 1;
        box-shadow: 0 1px 4px #0093df, 0 1px 10px #0093df;
    }
}
</style>
