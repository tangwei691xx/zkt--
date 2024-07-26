import Toast from './component'
import { iconsMap } from './config'
const ToastPlugin = {
  install (Vue, options = {}) {
    const ToastConstructor = Vue.extend(Toast)
    Vue.prototype.$toast = toast

    function buildProps (args) {
      let props = args[0]
      // 类型
      if (args[0] && args[0].type) props.type = args[0].type
      else props.type = 'info'
      // 位置
      if (args[0] && args[0].position) props.position = args[0].position
      else props.position = 'topCenter'
      // 默认关闭时间
      if (args[0] && args[0].closeTime) props.closeTime = args[0].closeTime
      else props.closeTime = 3
      // 自动关闭
      if (args[0] && Object.prototype.hasOwnProperty.call(args[0], 'autoClose')) props.autoClose = args[0].autoClose
      else props.autoClose = true
      // 默认宽度
      if (args[0] && Object.prototype.hasOwnProperty.call(args[0], 'width')) props.width = args[0].width
      else props.width = 300
      // 默认高度
      if (args[0] && Object.prototype.hasOwnProperty.call(args[0], 'height')) props.height = args[0].height
      else props.height = 80
      console.log(props, 'props.title')
      props.title = args[0] && args[0].title
      props.icon = iconsMap[props.type]
      props.callback = args[0] && args[0].callback ? args[0].callback : null
      return props
    }

    function toast () {
      if (!arguments[0]) return
      const propsData = buildProps(arguments)
      const instance = new ToastConstructor({ propsData })
      document.body.appendChild(instance.$mount().$el)
    }
  }
}

export default ToastPlugin
