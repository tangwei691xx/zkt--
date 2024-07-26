<template>
  <div class="explorer-grid">
    <div>
      <div
        class="col-xs-4 col-md-3"
        v-for="file in files"
      >
        <media
          :class="{
            active: ~value.indexOf(file),
            check: ~checkValue.indexOf(file),
            'is-operation': isCheck
          }"
          :key="file.ossDisplayId"
          :file="file"
          :urlPrefix="urlPrefix"
          @edit="$emit('edit', $event)"
          @remove="$emit('remove', $event)"
          @select="$emit('select', $event)"
          @check="$emit('check', $event)"
          @cd="$emit('cd', $event)"
        />
      </div>
    </div>
    <div class="row">
      <button v-if="isMore" class="btn btn-block btn-link" @click.prevent="$emit('more')">加载更多</button>
    </div>
  </div>
</template>

<script>
  import Media from './Media.vue'
  export default {
    name: 'ExplorerGrid',
    components: {
      Media
    },
    props: {
      files: {
        type: Array,
        default () {
          return []
        }
      },
      isMore: {
        type: Boolean,
        default: false
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
      urlPrefix: {
        type: String,
        default: ''
      },
      isCheck: {
        type: Boolean,
        default: false
      },
    }
  }
</script>
