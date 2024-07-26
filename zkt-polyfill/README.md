直客通前端通用基础组件
=================


# Polyfill #

载入此包，将会默认提供以下polyfill

1. Promise
2. react-tap-event-plugin
3. Object.assign


# 工具包 #

- zkt.leftpad()  https://github.com/stevemao/left-pad
- zkt.isWeixin
- zkt.title()  微信标题修改
- zkt.tap()  React的tap事件支持
- zkt.price()  处理价格显示，分转元
- zkt.addClass / removeClass 给dom添加/删除class
- zkt.goto()  软跳转，并附加很多当前页面的参数
- zkt.jumpTo() 硬跳转，并附加很多当前页面的参数
- zkt.hide / zkt.visible 给react用的，隐藏/显示某个dom
- zkt.cookie.get / set / delete 获取/设置/删除某个cookie

### zkt.config({...}) ###

设置需要的变量：
```
{
	history,  //react-router的历史提供者
	wxShareEndpoint, // 微信分享sign的url
	apiEndoint, // api请求的url
}
```

### zkt.responsive_img(url, width)  

将图片缩小到某个合理的宽度，并返回新的url。  width的参考宽度是320. 


### zkt.fetch(url, options) ###

类似原生fetch，使用axios实现。

### zkt._GET(key) ###

获取url上的参数，如果不传key，则返回所有参数的object

### zkt.initShare(title, description, image, params) ###

初始化微信分享，设置微信分享的信息。 调用此接口之前，需要配置 `wxShareEndpoint`

### zkt.showMap(hotel) ###

打开微信地图

### 日期操作 ###

- zkt.str2date
- zkt.date2str
- zkt.time2str
- zkt.compare_date
- zkt.calc_nights

### zkt.showWXShareOverlay() ###

显示微信分享提示浮层，关闭浮层用 `zkt.hideWXShareOverlay()`


### zkt.api(method, args) ###

请求通用后端api。 使用此方法前，需要配置 `apiEndpoint`









