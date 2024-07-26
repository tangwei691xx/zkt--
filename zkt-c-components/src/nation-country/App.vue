<template>
  <div class="zkt-nation-country">
    <zkt-cascade
      :deleteFlag="deleteFlag"
      :searchFlag="searchFlag"
      :id-key="idKey"
      :key-name="keyName"
      :placeholder="placeholder"
      :style="style"
      :forbid="forbid"
      :data="data"
      :box-info="boxInfo"
      v-model="value"
    >
    </zkt-cascade>
  </div>
</template>

<script>
import nationcountryModule from './store/modules/nationcountry'
export default {
  name: 'zkt-nation-country',
  props: {
    style: {
      type: String,
      default () {
        return ''
      }
    },
    deleteFlag: {
      type: Boolean,
      default () {
        return true
      }
    },
    forbid: {
      type: Boolean,
      default () {
        return false
      }
    },
    searchFlag: {
      type: Boolean,
      default () {
        return true
      }
    },
    idKey: {
      type: String,
      default () {
        return 'id'
      }
    },
    keyName: {
      type: String,
      default () {
        return 'name'
      }
    },
    dictType: {
      type: String,
      default () {
        return 'zkt-country'
      }
    },
    initId: {
      type: String,
      default () {
        return ''
      }
    },
    value: {
      type: Array,
      default () {
        return []
      }
    },
    boxInfo: {
      type: Object,
      default () {
        return {
          width: 300,
          height: 38,
          maxheight: 260
        }
      }
    },
  },
  data () {
    return {
      data: []
    }
  },
  created () {
    this.$http.get('api/cms-api/dict/getDictByType?dictType=' + this.dictType)
    .then((res) => {
      this.data = res.body.data
      if (this.initId !== '') {
        this.data.map((item) => {
          if (Number(item.value) === Number(this.initId)) {
            this.value = [{id: item.value, keyname: item[this.keyName]}]
          }
        })
      }
    })
  },
  watch: {
    value: function (val, oldval) {
      this.$emit('input', val)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
