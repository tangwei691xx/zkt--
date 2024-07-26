<template>
  <div class="col-sm-12 text-center" >
    <div class="col-sm-12 form-group text-center">
      <slot name="header">
         <div class="input-group  text-center">
          <input type="text" class="form-control" :placeholder="placeholder" @keyup="keyup" v-model="searchVal" :disabled="!useFlag">
          <span class="input-group-btn">
            <div class="btn btn-default" v-if="!useFlag" v-html="searchName"></div>
            <div class="btn btn-primary"  v-if="useFlag" @click="search" v-html="searchName"></div>
          </span>
        </div>
      </slot>
    </div>
    <div class="col-sm-12 form-group">
      <div id="allmap" :style="mapStyle"></div>
    </div>
     <div class="col-sm-12 form-group text-center">
      <slot name="footer">
      </slot>
    </div>
  </div>
</template>
<script>
import map from './store/index'
export default {
  props: {
    placeholder: {
      type: String,
      default () {
        return '请输入搜索内容'
      }
    },
    searchName: {
      type: String,
      default () {
        return '&nbsp;搜索&nbsp;'
      }
    },
    mapStyle: {
      type: String,
      default () {
        return 'height:100%;min-height:300px;'
      }
    },
    value: {
      type: Object,
      default () {
        return {
          longitude: '', // 经度
          latitude: '', // 纬度
          level: 11,
        }
      }
    },
    level: {
      type: Number,
      default () {
        return 10
      }
    },
  },
  data () {
    return {
      map: null,
      useFlag: false,
      instance: null,
      searchVal: '',
      address: '',
    }
  },
  beforeCreate () {
    if (!this.$store.state['map']) { // 防止重复注册
      this.$store.registerModule('map', map)
    }
  },
  created () {
    const params = {
      appCode: "gaode_map_b"
    }
    this.$store.dispatch('map/getData', params)
    .then((res) => {
      const {appKey, appSecret } = res;
      this.loadJS({ appKey, appSecret });
    })
  },
  destroyed () {
    this.$store.commit('UN_REGISTER_MODULE')
  },
  methods: {
    keyup (code) {
      if (code.keyCode === 13) {
        this.search()
      }
    },
    isIncludeJs(name){
      var es = document.getElementsByTagName('script');
      for(var i = 0; i < es.length; i += 1){
        if(es[i]['src'].indexOf(name) !== -1) {
          return true;
        }
      }
      return false;
    },
    loadJS ({ appKey, appSecret }) {
      var that = this
      window._AMapSecurityConfig = {
        securityJsCode: appSecret,
      }
      if (!this.isIncludeJs('https://webapi.amap.com/loader.js')) {
        const scriptEle = document.createElement('script');
        scriptEle.src = 'https://webapi.amap.com/loader.js'
        document.getElementsByTagName("head")[0].appendChild(scriptEle);
        let url = `https://webapi.amap.com/maps?v=1.4.15&key=${appKey}&callback=mapinit`
        let jsapi = document.createElement('script')
        jsapi.charset = 'utf-8'
        jsapi.src = url
        document.head.appendChild(jsapi)
        window.mapinit = function () {
          that.deal(that.value)
        }
      } else {
        that.deal(that.value)
      }
    },
    search () {
      // // 创建地址解析器实例
      let that = this
      let marker = new AMap.Marker()
      // let geocoder = new AMap.Geocoder({
      //   city: '' //城市设为北京，默认：“全国”
      // });
      // geocoder.getLocation(that.searchVal, function (status, result) {
      //   if (status === 'complete' && result.geocodes.length) {
      //     let lnglat = result.geocodes[0].location
      //     marker.setPosition(lnglat)
      //     that.map.add(marker)
      //     that.map.setFitView(marker)
      //     console.log(lnglat, 'lnglat')
      //   }else{
      //     console.error('根据地址查询位置失败')
      //   }
      // })
      AMap.plugin('AMap.Autocomplete', function () {
        // 实例化Autocomplete
        var autoOptions = {
          // city 限定城市，默认全国
          city: '全国'
        }
        let autoComplete = new AMap.Autocomplete(autoOptions)
        autoComplete.search(that.searchVal, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (result.info === 'OK') {
            try {
              let ind = 0
              let id = result.tips[ind].id
              if (!id) {
                ind = 1
              }
              let point = result.tips[ind].location
              let obj = {
                longitude: point.lng,
                latitude: point.lat,
                level: that.level
              }
              that.value.latitude = point.lat
              that.value.longitude = point.lng
              that.setMaker(obj)
              that.$emit('input', obj)
              that.$emit('res', {
                longitudelatitude: Object.assign(point, { level: that.level, address: '' }),
                mapObj: that.map
              })
            } catch (error) {
            }
          } else {
            that.$emit('err', '您选择地址没有解析到结果!')
            console.warn('您选择地址没有解析到结果!')
          }
        })
      })
    },
    updateValue () {
      let that = this
      that.value.level = that.level
      that.$emit('input', that.value)
      that.$emit('res', {
        longitudelatitude: {
          lng: that.value.longitude,
          lat: that.value.latitude,
          level: that.level,
          address: that.address || '',
        },
        mapObj: that.map
      })
    },
    setMaker (val) {
      // 创建点覆盖物
      let marker = new AMap.Marker({
        position: new AMap.LngLat(val.longitude, val.latitude)
      })
      this.map.clearMap()
      this.map.add(marker)
      this.map.setFitView()
      this.map.setZoom(this.level)
    },
    deal (val) {
      let that = this
      // 高德地图api
      this.map = new AMap.Map('allmap', {
        zoom: that.level, // 级别
        resizeEnable: true,
        viewMode: '2D' // 使用3D视图
      })
      // 添加工具条
      AMap.plugin([
        'AMap.ToolBar',
        'AMap.Scale',
        'AMap.Geocoder'
      ], function () {
        // 在图面添加工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        that.map.addControl(new AMap.ToolBar())
        // 在图面添加比例尺控件，展示地图在当前层级和纬度下的比例尺
        that.map.addControl(new AMap.Scale())
      })
      if (that.value.longitude) {
        this.setMaker(that.value)
      }
      this.useFlag = true
      this.map.on( 'click',  async function (e) {
        that.value.latitude = e.lnglat.lat
        that.value.longitude = e.lnglat.lng
        that.setMaker(that.value)
        const { formattedAddress } = await that.lngLatToAddress([e.lnglat.lng, e.lnglat.lat])
        that.address = formattedAddress
        that.updateValue()
      })
      this.map.on('zoomchange', async function (e) {
        that.level = that.map.getZoom()
        that.map.setZoom(that.level)
        if (that.value.latitude && that.value.longitude) {
          const { formattedAddress } = await that.lngLatToAddress([that.value.longitude, that.value.latitude])
          that.address = formattedAddress
          that.updateValue()
        }
      })
    },
    // 逆地理编码(把经纬度转换成地址信息)
    lngLatToAddress(lnglat) {
      return new Promise((resolve, reject) => {
        let geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        geocoder.getAddress(lnglat, function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            resolve(result.regeocode)
          } else {
            reject('获取地址信息出错啦！')
          }
        })
      })
    },
    // 提供给外部调用搜索地址的方法
    searchAddress (keyWord) {
      // // 创建地址解析器实例
      let that = this
      let marker = new AMap.Marker()
      AMap.plugin('AMap.Autocomplete', function () {
        // 实例化Autocomplete
        var autoOptions = {
          city: '全国'
        }
        let autoComplete = new AMap.Autocomplete(autoOptions)
        autoComplete.search(keyWord, function (status, result) {
          // 搜索成功时，result即是对应的匹配数据
          if (result.info === 'OK') {
            try {
              let ind = 0
              let id = result.tips[ind].id
              if (!id) {
                ind = 1
              }
              let point = result.tips[ind].location
              let obj = {
                longitude: point.lng,
                latitude: point.lat,
                level: that.level
              }
              that.value.latitude = point.lat
              that.value.longitude = point.lng
              that.setMaker(obj)
              that.$emit('input', obj)
              that.$emit('res', {
                longitudelatitude: Object.assign(point, { level: that.level, address: '' }),
                mapObj: that.map
              })
            } catch (error) {
            }
          } else {
            that.$emit('err', '您选择地址没有解析到结果!')
            console.warn('您选择地址没有解析到结果!')
          }
        })
      })
    }
  }
}
</script>
<style scoped>
</style>
