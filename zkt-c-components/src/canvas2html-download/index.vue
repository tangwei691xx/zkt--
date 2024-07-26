<template>
    <div
      :class="className"
      @click="downLoadHtml"
    >{{btnName}}</div>
</template>
<script>
import html2canvas from 'html2canvas'
import dataURLtoBlob from 'blueimp-canvas-to-blob'
export default {
  props: {
    btnName: {
      type: String,
      default () {
        return ''
      }
    },
    className: {
      type: String,
      default () {
        return ''
      }
    },
    id: {
      type: String,
      default () {
        return ''
      }
    },
    param: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    downLoadHtml () {
      if (!this.id || !this.param) {
        this.$modal({
          message: '请设置id或者必要的入参'
        })
        return false
      }
      let param = this.param
      let el = document.getElementById(this.id)
      // 复制节点 放到 body下的一个隐藏元素里
      let cloneNode = el.cloneNode(true)
      cloneNode.style.transform = "scale(1)"
      cloneNode.style.zoom = 1
      cloneNode.style.left = 0
      cloneNode.style.top = 0
      let posterDownWrap = document.getElementById('poster-down-warp')
      if (!posterDownWrap) {
        posterDownWrap = document.createElement('DIV')
        posterDownWrap.setAttribute('id', 'poster-down-warp')
        posterDownWrap.style.position = 'fixed';
        posterDownWrap.style.top = '0';
        posterDownWrap.style.left = '0';
        posterDownWrap.style.opacity = '0';
        posterDownWrap.style['z-index'] = '-1';
        document.body.appendChild(posterDownWrap)
      }
      posterDownWrap.innerHTML = ''
      posterDownWrap.appendChild(cloneNode)
      html2canvas(cloneNode, {
        width: param.width || 100,
        height: param.height || 100,
        x: param.x || 0,
        y: param.y || 0,
        backgroundColor: '#ffffff',
        scale: 1,
        scrollX: 0,
        scrollY: 0
      })
        .then((canvas) => {
          let blob = dataURLtoBlob(canvas.toDataURL("image/png"))
          let broswer = navigator.userAgent.toLowerCase()
          if (blob) {
            let ie1011 = (broswer.match(/.(msie)[\\/: ]([10.]+)/) !== null || broswer.match(/.(clr)*[rv:]([11.]+)/) !== null || broswer.match(/edge/gi) !== null)
            if (ie1011) {
              // if (isIE()) { // ie10 ie11 使用微软api自动下载
              window.navigator.msSaveOrOpenBlob(blob, param.name + '.png')
            } else { // chrome firefox使用标准api下载
              let dlLink = document.createElement('a')
              dlLink.setAttribute('download', param.name + '.png')
              dlLink.href = URL.createObjectURL(blob)
              document.body.appendChild(dlLink)
              dlLink.click()
              document.body.removeChild(dlLink)
            }
          } else {
            var winparam = 'toolbar=no, location=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no,width=750,height=1334'
            var mywin = window.open('', '_blank', winparam);
            mywin.document.write('<img src=' + canvas.toDataURL("image/png") + '/>');
          }
          if (typeof param.callback === 'function') {
            param.callback()
          }
        })
    }
  }
}
</script>
<style scoped>
</style>