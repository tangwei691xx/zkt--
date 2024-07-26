<template>
  <div class="modal fade in explorer-modal">
    <div class="modal-backdrop fade in" @click="$emit('close')"></div>
    <div class="modal-dialog" :class="{[`modal-${size}`]: !!size}" ref="dialog">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" @click="$emit('close')" aria-label="Close"><span aria-hidden="true">×</span></button>
          <h4 class="modal-title">{{title}}</h4>
        </div>
        <div v-if="$slots.default" class="modal-body">
          <slot></slot>
        </div>
        <div v-if="$slots.footer" class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ExplorerModal',
  props: {
    title: {
      type: String,
      default: ''
    },
    size: {
      type: String,
      default: 'sm'
    },
  },
  mounted () {
    this.$el.style.height = this.$el.parentNode.scrollHeight + 'px'
    this.$refs.dialog.style.top = this.$el.parentNode.scrollTop + 'px'
  }
}
</script>

<style>
.explorer-modal {
  display: block;
  position: absolute;
}
.explorer-modal .modal-backdrop {
  position: absolute;
  z-index: -1;
}
.explorer-modal .modal-body {
  max-height: 250px;
  overflow-y: scroll;
}
.explorer-modal > .modal-lg {
  width: 90% !important;
}

.explorer-modal > .modal-sm {
  width: 60% !important;
}
@media (max-width: 768px) {
  .explorer-modal .modal-dialog {
    width: auto !important;
  }
}
</style>
