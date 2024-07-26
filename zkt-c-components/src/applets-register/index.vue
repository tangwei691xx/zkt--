<template>
  <div class="row" style="margin:0">
    <div class="zkt-auth-content"
      :style="`
        background: #f7f9fb url(//${constant.DOMAIN_STATICRESOURCE}/static/appletsConfig/auth.png) no-repeat center 40px ;
        min-height:360px
      `"
    >
      <Button
        v-model="buttonData"
        @click="authRegisterFn('')"
        style="margin-top:280px"
      />
      <p v-if="errorTip" class="errorTip">错误原因：{{errorTip}}</p>
      <div class="zkt-auth-desc" v-if="appletStatus !== '3'">
        <p>通过第三方快速注册小程序，以下权限必须授权，若未授权成功，请查看小程序注册教程</p>
        <p>
          <span v-if="appletRegister" >[已授权]</span>
          <span v-if="!appletRegister" class="active">[未授权]</span>1、快速注册小程序权限；<br>
          <span v-if="appletManager">[已授权]</span>
          <span v-if="!appletManager" class="active">[未授权]</span>2、小程序管理权限；<br>
          <span v-if="platformRegister">[已授权]</span>
          <span v-if="!platformRegister" class="active">[未授权]</span>3、开放平台账号管理权限；
        </p>
      </div>
    </div>
     <div class="zkt-auth-footer">
      <router-link to="/applets/help" target="_self"><span class="iconfont iconorder"></span>小程序快速注册教程</router-link>
    </div>
  </div>
</template>
<script>
import Button from './components/Button'
import GetAppletsStatus from './store/index'
export default {
  data () {
    return {
      errorTip: '',
      buttonData: {
        type: 'big',
        text: '授权快速注册小程序'
      },
      constant: {},
      ST: this.$store,
      retryAuth: null,
      retryRegist: null
    }
  },
  computed: {
    appletStatus () {
      return this.$store.getters['GetAppletsStatus/getAppletStatus']
    },
    allBrandRelation () {
      return this.$store.state.allBrandRelation
    },
    appletRegister () {
      return this.$store.getters['GetAppletsStatus/appletRegister']
    },
    appletManager () {
      return this.$store.getters['GetAppletsStatus/appletManager']
    },
    platformRegister () {
      return this.$store.getters['GetAppletsStatus/platformRegister']
    }
  },
  components: {
    Button
  },
  created () {
    this.init()
  },
  methods: {
    init () {
      this.ST = this.$store
      this.constant = this.ST.state.constant
      /*
        * 检查小程序当前状态
        * 0 未授权  1.未注册 2. 没有 3小程序注册完成 4.未保存或者已保存审核中  5.基本信息审核成功  6.基本信息审核失败
        */
      this.checkAppletsStatus()
    },
    checkAppletsStatus () {
      this.$store.dispatch('GetAppletsStatus/getAppletStatus')
    },
    judgeStatus () {
      if (this.appletStatus === '0') {
        this.getAuthStatus()
        this.buttonData.text = '授权快速注册小程序'
      } else if (this.appletStatus === '1') {
        this.buttonData.text = '立即开通'
        this.$store.commit('GetAppletsStatus/updateAuthStatus')
        this.getRegisterStatus()
      } else {
        this.buttonData.text = '授权成功'
        this.$store.commit('GetAppletsStatus/getAppletStatus', '3')
      }
      this.$emit('appletsSuccess', this)
    },
    getAuthStatus () {
      this.$store.dispatch('GetAppletsStatus/authorization')
      .then((res) => {
        this.dealAuthStatus(res)
      })
    },
    partAuth (res) {
      if (res.appletRegister || res.appletManager || res.platformRegister) {
        let arr = []
        if (!res.appletRegister) {
          arr.push('快速注册小程序权限未授权')
        }
        if (!res.appletManager) {
          arr.push('小程序管理权限未授权')
        }
        if (!res.platformRegister) {
          arr.push('开放平台账号管理权限未授权')
        }
        this.errorTip = arr.join(',')
        this.buttonData.text = '尝试重新授权'
      }
    },
    dealAuthStatus (res) {
      if (!res.appletRegister || !res.appletManager || !res.platformRegister) {
        // 有一部分授权，则给授权失败提示
        this.partAuth(res)
        // 3秒重试
        this.retryAuthFn()
      } else {
        this.errorTip = ''
        this.buttonData.text = '立即开通'
        this.$store.commit('GetAppletsStatus/getAppletStatus', '1')
        this.getRegisterStatus()
        this.$store.dispatch('GetAppletsStatus/insert')
      }
    },
    getRegisterStatus () {
      this.$store.dispatch('GetAppletsStatus/register')
        .then((res) => {
          this.dealGetRegisterStatus(res)
        })
    },
    dealGetRegisterStatus (res) {
      if (!res) {
        this.retryRegistFn()
      } else {
        this.$store.commit('GetAppletsStatus/getAppletStatus', '3')
        this.$store.dispatch('GetAppletsStatus/updateRegister')
      }
    },
    retryRegistFn () {
      if (this.retryRegist) {
        clearTimeout(this.retryRegist)
        this.retryRegist = null
      }
      this.retryRegist = setTimeout(this.getRegisterStatus, 3000)
    },
    retryAuthFn () {
      if (this.retryAuth) {
        clearTimeout(this.retryAuth)
        this.retryAuth = null
      }
      this.retryAuth = setTimeout(this.getAuthStatus, 3000)
    },
    authRegisterFn (val) {
      if (val) {
        if (this.appletStatus === '0') {
          window.open(`//${this.constant.DOMAIN_WXAPP}/auth?brand_id=${this.allBrandRelation[0].brand_id}`, '_blank')
        } else if (this.appletStatus === '1') {
          window.open(`//${this.constant.DOMAIN_WXAPP}/fast_register?appid=${this.allBrandRelation[0].app_id}&type=home`, '_blank')
        }
      } else {
        if (this.appletStatus === '0') {
          window.open(`//wxapp.${this.constant.DOMAIN_PRODUCTION}/auth?brand_id=${this.allBrandRelation[0].brand_id}`, '_blank')
        } else if (this.appletStatus === '1') {
          window.open(`//wxapp.${this.constant.DOMAIN_PRODUCTION}/fast_register?appid=${this.allBrandRelation[0].app_id}&type=home`, '_blank')
        }
      }
    }
  },
  watch: {
    appletStatus: function () {
      this.judgeStatus()
    }
  },
  beforeCreate () {
    // 如果没有注册当前页面，则注册
    !this.$store.state.GetAppletsStatus && this.$store.registerModule('GetAppletsStatus', GetAppletsStatus)
  },
  destroyed () {
    // 离开爷面前销毁数据，注销store
    this.ST.commit('GetAppletsStatus/UN_REGISTER_MODULE')
    this.ST.unregisterModule('GetAppletsStatus')
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