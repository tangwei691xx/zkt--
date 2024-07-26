<template>
  <div class="zhongxin-qr">
    <div class="qr-wrap" ref="qrContent" id="qrCodeContent">
      <div class="qr-title">消费者退款二维码</div>
      <div class="qr-content">
        <div>您好：</div>
        <div>{{msg}}</div>
        <div class="align-right">为此带来不便，敬请谅解！</div>
      </div>
      <div class="align-center">
        <img class="qr-img" :src="qrdata" />
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode"
import { downLoadHtml } from './qrUtils'
export default {
  name: "ZhongxinQr",
  props: {
    url: {
      type: String,
      default: ""
    },
    msg: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      qrdata: ""
    }
  },
  created() {
    this.createQr()
  },
  methods: {
    createQr () {
      QRCode.toDataURL(this.url, {
        errorCorrectionLevel: "H",
        type: "image/jpeg",
        width: 300,
        rendererOpts: {
          quality: 1
        }
      })
      .then(url => {
        this.qrdata = url
      })
      .catch(err => {
        console.error(err)
      })
    },
    download(fileName='qrcode') {
      let qrContent = this.$refs["qrContent"]
      return downLoadHtml(qrContent, {
        name: '消费者退款二维码',
        width: 384,
        height: 441
      })
    }
  }
}
</script>

<style lang="less" scoped>
.qr-wrap {
  padding: 15px;
  width: 384px;
  margin: 0 auto;
}
.qr-title {
  font-weight: bold;
  font-size: 24px;
  width: 100%;
  text-align: center;
}
.qr-content {
  width: 100%;
  line-height: 25px;
  word-break: break-all;
}
.align-right {
  text-align: right;
}
.align-center {
  text-align: center;
}
.qr-img {
  width: 300px;
  height: 300px;
}
</style>
