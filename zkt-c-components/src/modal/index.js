import Modal from './Modal.vue'

function ZModal() { }

ZModal.install = function (Vue, options) {
  var ModalConstructor = Vue.extend(Modal)
  Vue.prototype.$modal = modal
  Vue.modal = modal

  function modal(opts, Component) {
    var obj = {
      propsData: opts,
      components: {
        ModalBody: Vue.component(Component) || Component
      }
    }
    var instance = new ModalConstructor(Object.assign({}, ZModal.options, options, obj))
    instance.$mount()
    document.body.appendChild(instance.$el)
    // 触发reflow 页面复杂 弹出会卡顿 换成setTimeout
    // window.getComputedStyle(instance.$el).opacity
    setTimeout(() => {
      instance.show()
    })
    return instance
  }
}

if (window && window.Vue) {
  window.Vue.use(ZModal)
}

export default ZModal
