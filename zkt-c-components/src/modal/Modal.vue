<template>
<div class="component-modal modal fade" :class="`${isOpen ? 'in ' : ''} `">
  <div class="modal-backdrop fade" :class="{'in': isOpen}" @click="backdrop"></div>
  <div class="modal-dialog" :class="`${'modal-'+size} ${position}`">
    
    <div class="modal-content clearfix">
      <button class="modal-close close" @click="close" v-if="closeable">
        <span aria-hidden="true">&times;</span>
      </button>
      <header
        class="modal-header"
        v-if="title"
        ref="header">
        {{title}}
      </header>
      <content
        class="modal-body"
        v-if="message || prompt">
        <div class="message-content">
          <p v-if="message" :class="{'active': iconType, 'marginBottom0': !this.prompt}">
            <span v-if="iconType" :class="{'success': iconType === 'success'}"></span>
            {{message}}
          </p>
          <input type="text" class="form-control" v-model="inputValue" v-if="prompt">
        </div>
      </content>
      <modal-body
        ref="body"
        v-if="$options.components.ModalBody"
        v-bind="data"
        v-on="events"
        class="modal-custom-body">
      </modal-body>
      <footer class="modal-footer" v-if="okText||cancelText" ref="footer">
        <button class="btn btn-default" v-if="cancelText" @click="negative">{{cancelText}}</button>
        <button class="btn btn-primary" v-if="okText" @click="postive">{{okText}}</button>
      </footer>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    data: {
      type: Object,
      default () {
        return {}
      }
    },
    events: {
      type: Object,
      default () {
        return {}
      }
    },
    position: {
      type: String,
      default: 'modelCenter'
    },
    size: {
      type: String,
      default: 'md'
    },
    title: {
      type: String,
      default: ''
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    message: {
      type: String,
      default: ''
    },
    prompt: {
      type: Boolean,
      default: false
    },
    inputValue: {
    },
    timeOut: {
      type: Number,
      default: 0
    },
    backDrop: {
      type: Boolean,
      default: false
    },
    autoClose: {
      type: Boolean,
      default: true
    },
    callback: {
      type: Function,
      default () {
        return function () {}
      }
    },
    closeable: {
      type: Boolean,
      default: true
    },
    iconType: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isOpen: false,
      // 是否在body上已经有class modal-open
      hasBodyClass: false
    }
  },
  methods: {
    close () {
      this.callback(this.inputValue, 'close', this.$refs.body)
      this.destroy()
    },
    postive () {
      this.callback(this.inputValue, 'postive', this.$refs.body)
      this.$emit('postive', this.inputValue)
      this.autoClose && this.destroy()
    },
    negative () {
      this.callback(this.inputValue, 'negative', this.$refs.body)
      this.$emit('negative', this.inputValue)
      this.autoClose && this.destroy()
    },
    backdrop () {
      console.log(this.backDrop, 'this.backDropthis.backDrop')
      if (this.backDrop) {
        this.callback(this.inputValue, 'backdrop', this.$refs.body)
        this.$emit('backdrop', this.inputValue)
        this.autoClose && this.destroy()
      }
    },
    destroy () {
      this.isOpen = false
      setTimeout(() => {
        this.$destroy()
      }, 150)
    },
    show () {
      if (document.body.classList.contains('modal-open')) {
        this.hasBodyClass = true
      } else {
        document.body.classList.add('modal-open')
      }

      this.isOpen = true
      if (this.timeOut) {
        let that = this
        let temp = null
        temp = setTimeout(() => {
          if (that.timeOutCount) {
            clearTimeout(temp)
          }
          that.callback(that.inputValue, 'timeOut', that.$refs.body)
          that.destroy()
        }, that.timeOut)
      }
    }
  },
  beforeDestroy () {
    this.$el.parentNode.removeChild(this.$el)
  },
  destroyed () {
    if (!this.hasBodyClass) {
      document.body.classList.remove('modal-open')
    }
  }
}
</script>

<style>
.modelCenter{
  display: flex;
  align-items: center;
  justify-content: center;
}
.component-modal.modal {
  display: flex;
  width: 100%;
  height: 100%;
  z-index: 1500;
}
.component-modal.modal > .modal-backdrop {
  z-index: 0;
}
.modal-content  .modal-close {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  margin-right: 10px;
  margin-top: 7px;
  outline: none;
  opacity:1;
  font-size:32px;
  line-height: 26px;
  color: #CBCBCB;
  font-weight: normal;
}
.component-modal.modal .modal-full {
  width: 100%;
  height: 100%;
  margin: 0;
  border-radius: 0;
}
.component-modal.modal .modal-full > .modal-content {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 0;
}
.component-modal.modal > .modal-dialog > .modal-content{
  padding: 50px 40px;
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-body {
  display: block;
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-header{
  padding: 0 0 20px!important;
  line-height:16px;
  font-size:15px;
  color: #333;
  border-bottom: none;
}
.component-modal.modal .message-content{
  margin: -15px;
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-body, .component-modal.modal .modal-custom-body{
  font-size:14px;
  color:#666666;
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-body > p.marginBottom0{
  margin-bottom: 0;
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-body > p.active{
  position:relative;
  padding-left: 54px;
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-body > p.active span{
  position:absolute;
  left: 0;
  top: 50%;
  width:39px;
  height:39px;
  margin-top:-19px;
  font-size:39px;
  color: #3479B7;
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-body > p span.success{
  background-image:url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACcAAAAnCAYAAACMo1E1AAAFVklEQVRYR81YW2wUZRT+zmxaicZERU3QUHjAaEy8dacFocZyabuztKIYeBCiRmOJEo3ESPtXTbcqndKYaJpItEYRFR8gxUhhZ6FU66WkdqcFfTAaSSwQS1SKGo1JrTvHzGW3s9u9zCz74LxsNnO+c745c/4z5zuEIq/q547KRmKmkSVpETEWM7CYYP1OEDDBhAkyjNNSoOzQ6I56vZgw5AdULY40GsT3gbkOwEIf2LMgGpCYPhpVGw55xXkiZ5MymsFoyuL4AkA/MPgUsXGKSVpCoCUA3wDgqjn2hH6JpV4vJAuSk4XWB2B9RpBhgA8iQB/rLyvf58qE/Lx2IxK8DqB7AKzIsDugq8r9+bKYl5wstHEAd6Qc+HjqzKA5sn9CV5XKXARzkpNF9DeArrCBfFJC4AUvr6JQPVkkkXgJoNsd37/ravjKbLis5GQR+wng60wAAZ9cvYDD2lPh6UKBvd5XeqKXnD9HUQZW2Ria1NXQ9Zn4OeTkNu1gqvDZ6NC71ka8BvVrJ7dq7SDY/gn9eqdi1qarilx/ZKHtA7DBepGgt8bUULPfgH7tgyLWS+DHHNx+XVU2Jn2kMmfXgtFvE8MXmDqzeqx3y4zfYH7tg81vlmF+xSABd5lYCVJTsrZT5Nyv023gN1gx9u7EuF+vRS7XzWICFYvJlhyLnNwW2wPmBzPTWmygbDin+Gv//uPPpm93bfwr0yY9QfSe3hl6yCY32zrGdFWRS0nK9BVsjb5CRM9Yfhkr9S5lKOsDCM0cEILJ1kKyOLoCSHxpnWainfHOUGspyVUL7U4DOG77x8hl5fPqhiIr52TOvF/VFuti5hY7fqCG5NbDEZDUbv41CLeNdyrflJKcLDROtQZJuju+o+HzXP4r27RbJcbXdoaNDgq2abuJ8TCAC7qqzC8lsSqhxRhosH3SNl0NvVbIvyy0KXOaYcK7JAvtUwC1AH2lq6FlhcBe7wdF9HEC7XKIva+rIevAFbpkERsBeCmAIQoK7Udngt07piqbC4G93F8eOXLtP9PGz47t6UQisPxEd/2kF2xQaB8QsMmaqFM1UcLvqCw0s25vseoYRtO4utbz9Os+A74yVyW09Qz0gaivvJyeOB5p+CUzG3Kr1g3Cs1aVgdvjavhFLxlL2mRmznPNpTVKYFSSAlvd4qWyNbpKIhp0An2mq0qtH2KmbXrN+Tytsog+DdCrTtBJAp6Mq8oB27F2HoB94gO4Kd8In4t0+ml19TmvDoMiei9B2g2wMynTNoYhE2iT9TqZN8e7wnt9Z83SHPjOwpl9ztKfRiJuO+IWXQ13e3EaFIeXEgJvAOyM207TAPbEVcXsm74vWUS3A7TTBEpSoMr5tmpnHB06rKtKjVevwZaBCgr82wPGOvvZMNk4L7QwEiHDqw+3nSw08zNqqrSzuqpUJKeSt8H8iMXYNex5CXBzZF/5pdOX9wDYAnCNroaHveAybTKmknf0ztCjJZvnzP50MXoj5zxnnTSXsPGbvWIy5cbknYRNw/QexievWYBlpZSDuR7AlIm/nsNIUsdm1RBOn0qtHky9GleV1ReblUL4KqENzupXpK0o5upW9wqCEdG7lI5CAYq97/6OApizmsih+GdXEaZ+xdTpraWUibYcXPT6rF7lrCuJPLuS2ZWEqWMDkLpLtStJwNie1Km5VhHm28i/ZXKvJmxrz7u1rH0sc8eXZQXhxnnZz6VWFC7gGBEdS4A/zKc5TE0QAD3AzGtsVZV2pa0estVtQXKpNvN/3GzOaZbEG8BYk1yReTupNAnCMYlpv5+69ZS5bAQsvcszdYW26aCyAV2tL+p7+x9KyIl8MXV92QAAAABJRU5ErkJggg==');
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-footer{
  border-top:none;
  text-align:center;
  padding: 38px 0 0!important;
  background:none;
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-footer .btn{
  display:inline-block;
  min-width: 120px;
  height: 35px;
  line-height: 35px;
  border-radius: 4px;
  cursor: pointer;
  padding:0 10px;
  margin:0;
  box-shadow: none;
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-footer .btn-default{
  background: #fff;
  border: 1px solid rgba(203,203,203,1);
  color:#999;
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-footer .btn:nth-child(1){
  margin-right:14px;
}
.component-modal.modal > .modal-dialog > .modal-content > .modal-footer .btn-primary{
  color:#fff;
  background: #3479b7;
  border: 1px solid #3479b7;
}
@media (min-width: 768px){
  .component-modal.modal > .modal-sm {
    width: 400px;
  }
}
</style>
