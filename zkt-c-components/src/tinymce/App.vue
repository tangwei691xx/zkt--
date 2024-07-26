<template>
  <div class="zkt-tinymce-app">
    <editor v-model="datas" :init="config"></editor>
  </div>
</template>

<script>
import Editor from './components/index.vue'

export default {
  name: 'app',
  components: {
    Editor
  },
  data () {
    return {
      datas: 'aaa',

      config: {
        // height: '500px',
        base_url: '/tinymce_5.5.0/'
        // menubar: 'file edit insert view format table tools help'
      }
    }
  }
}
</script>
