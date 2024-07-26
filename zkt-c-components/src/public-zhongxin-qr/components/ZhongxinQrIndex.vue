<template>
  <div class="zhongxin-qr-index">
    <zhongxin-qr-modal
      v-if="showContent"
      :url="url"
      :msg="msg"
      ref="qrmodal"
      />
    <div class="red" v-if="showContent">点击下载消费者退款二维码</div>
  </div>
</template>

<script>
import ZhongxinQrModal from './ZhongxinQrModal'
import zhognxinModule from '../store/modules/zhognxinModule'
export default {
  name: "ZhongxinQrIndex",
  components: {
    ZhongxinQrModal
  },
  data () {
    return {
      showContent: false,
      url: '',
      msg: ''
    }
  },
  beforeCreate () {
    if (!this.$store.state.zhongxin) {
      this.$store.registerModule('zhongxin', zhognxinModule)
    }
  },
  methods: {
    showZhongxinModal (platformOrderId, memberId = null, isRefund) {
      this.$store.dispatch('zhongxin/getZhongxinQr', {
        platformOrderId,
        memberId,
        isRefund
      })
      .then(res => {
        if (res.qrUrl) {
          let that = this
          this.qrModal = this.$modal({
            okText: '下载二维码', // 确认按钮文案
            cancelText: '', // 取消按钮文案
            data: {
              url: res.qrUrl,
              msg: res.alertMsg
            },
            autoClose: false,
            callback (value, type, vm) {
              if (type === 'postive') {
                vm.download()
                .then(() => {
                  that.qrModal.$destroy()
                })
              } else {
                that.qrModal.$destroy()
              }
            }
          }, ZhongxinQrModal)
        }
      })
    },
    showQrContent (platformOrderId, isRefund) {
      this.$store.dispatch('zhongxin/getZhongxinQr', {
        platformOrderId,
        isRefund
      })
      .then(res => {
        if (res.qrUrl) {
          this.url = res.qrUrl
          this.msg = res.alertMsg
          this.showContent = true
        }
      })
    },
    download () {
      this.$refs['qrmodal'].download()
    }
  }
}
</script>

<style lang="less" scoped>
.red {
  color: red;
  text-align: center;
}
</style>
