<template>
  <div class="zkt-count">
    <ICountUp :delay="delay" :endVal="endVal" :options="options" v-on="$listeners"/>
  </div>
</template>

<script>
  import ICountUp from 'vue-countup-v2';
  export default {
    name: 'zkt-count',
    props: {
      delay: {
        type: Number,
        default: 0
      },
      endVal: {
        type: Number,
        default: 100
      },
      options: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    components: {
      ICountUp
    },
    methods: {
    },
    mounted() {
      
    }
  }
</script>