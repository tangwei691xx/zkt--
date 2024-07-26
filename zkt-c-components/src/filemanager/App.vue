<template>
  <div class="zkt-uploader-direct">
    <section class="block">
      <com
        path="test1/"
        :multiple="multiple"
        :accept="accept"
        :preview="true"
        :limit="5"
        maxSize="1024"
        allows="jpg,jpeg,png"
        v-model="list"
      ></com>
      <br>
      <div class="btn btn-success" @click="list=''">清空</div>
    </section>
    <!-- <div style="margin-top:10px;">
     <img style="height: 100px;margin:5px;" :src="item.url" v-for="item in list">
   </div> -->
  </div>
</template>

<script>
import com from './components'

export default {
  name: 'App',
  components: {
    com
  },
  data () {
    return {
      multiple: true,
      accept: 'image/*',
      list: ''
    }
  }
}
</script>

<style lang="less">
  .block {
    padding: 20px;
  }
  .img {
    height: 200px;
  }
</style>
