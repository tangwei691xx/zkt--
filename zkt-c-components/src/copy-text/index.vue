<template>
    <div
      :class="className" 
      :data-clipboard-text="text"
      :id="copyId"
      @click="copy"
    >{{btnName}}</div>
</template>
<script>
import ClipboardJS from 'clipboard';
export default {
  props: {
    btnName: {
      type: String,
      default () {
        return '复制链接'
      }
    },
    className: {
      type: String,
      default () {
        return 'btn btn-primary'
      }
    },
    copyId: {
      type: String,
      default () {
        return 'copyid_' + parseInt(Math.random() * 10000)
      }
    },
    text: {
      type: String,
      default () {
        return ''
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    copy() {
      console.log('复制触发了吗')
      let model = null;
      let that = this;
      let clipboard = null;
      clipboard = new ClipboardJS('#' + this.copyId);
      clipboard.on("success", function(e) {
        e.clearSelection();
        model = that.$modal({
          title: "提示",
          autoClose: true,
          timeOut: 3000,
          message: "复制成功",
          okText: "确认", // 确认按钮文案
          cancelText: "关闭", // 取消按钮文案
          callback(type, value, vm) {
            model.$destroy();
            clipboard.destroy();
            that.$emit('destroy', {})
          }
        });
      });
      clipboard.on("error", function(e) {
        model = that.$modal({
          title: "提示",
          autoClose: true,
          timeOut: 3000,
          message: "复制失败",
          okText: "确认", // 确认按钮文案
          cancelText: "关闭", // 取消按钮文案
          callback(type, value, vm) {
            model.$destroy();
            clipboard.destroy();
            that.$emit('destroy', {})
          }
        })
      })
    }
  }
}
</script>
<style scoped>
p{
  margin:0;
}
.errorTip{
  color: #D9534F;
  margin: 10px 0 0;
}
.zkt-auth-content{
  margin: 30px 12px 10px;
  background:rgba(247,249,251,1);
  border-radius:4px;
  padding:62px 0 30px;
  text-align:center;
}
.zkt-auth-footer{
  margin: 0 12px;
}
.zkt-auth-desc{
  display:inline-block;
  font-size:14px;
  font-weight:400;
  color:rgba(153,153,153,1);
  line-height:24px;
  text-align: left;
}
.zkt-auth-desc p:nth-child(1){
  margin:24px 0 3px;
}
.zkt-auth-desc p span{
  font-size:14px;
  font-weight:400;
  color: #333;
  padding-right:18px;
}
.zkt-auth-desc p span.active{
  color: #D9534F;
}
.zkt-auth-footer{
  text-align: center;
  padding: 18px 0;
  background:rgba(247,249,251,1);
  border-radius:4px;
}
.zkt-auth-footer a{
  font-size:14px;
  color:rgba(51,51,51,1);
}
.zkt-auth-footer a span{
  width:11px;
  height:13px;
  margin-right:6px;
}
</style>