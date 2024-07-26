import xssCustom from '../utils/xssCustom'
import {getElementPosition, generateId} from '../utils'

/**
 * 类型默认是tootip
 * v-tooltip:top="xxx"
 * v-tooltip:top="{
 *  content: '',
 *  type: 'tooltip',
 *  margin: 5
 * }"
 */

export default {
  bind (el, binding) {
    let direction = binding.arg || binding.value.placement || 'bottom'
    let type = typeof(binding.value) === 'string' ? 'tooltip' : binding.value.type || 'tooltip'
    let json = initStyle(direction, type)
    let content = typeof(binding.value) === 'string' ? binding.value : binding.value.content
    let margin = typeof(binding.value) === 'string' ? 5 : binding.value.margin || 5
    let warpStyle = (typeof(binding.value) === 'object' && binding.value.warpStyle) ? (json.warpStyle + binding.value.warpStyle) : json.warpStyle
    let contentStyle = (typeof(binding.value) === 'object' && binding.value.contentStyle) ? (json.contentStyle + binding.value.contentStyle) : json.contentStyle
    let poverContent = getPopoverContent(content, type, contentStyle, json.arrowStyle)
    
    el.setAttribute('popover-direction', direction)
    el.setAttribute('popover-margin', margin)
    el.setAttribute('popover-content', poverContent)
    el.setAttribute('popover-type', type)

    let popoverId = generateId('popover')
    el.setAttribute('popover-id', popoverId)

    let div = document.createElement('div')
    div.setAttribute('class', `${type} fade ${direction} in hide`)
    div.setAttribute('id', popoverId)
    div.setAttribute('style', warpStyle)
    div.innerHTML = poverContent

    document.body.appendChild(div)
  },
  inserted (el) {
    el.addEventListener('mouseenter', enter)
    el.addEventListener('mouseleave', leave)
  },
  update (el, binding) {
    let direction = binding.arg || binding.value.placement || 'bottom'
    let type = typeof(binding.value) === 'string' ? 'tooltip' : binding.value.type || 'tooltip'
    let json = initStyle(direction, type)
    let content = typeof(binding.value) === 'string' ? binding.value : binding.value.content
    let contentStyle = (typeof(binding.value) === 'object' && binding.value.contentStyle) ? (json.contentStyle + binding.value.contentStyle) : json.contentStyle
    let poverContent = getPopoverContent(content, type, contentStyle, json.arrowStyle)
    el.setAttribute('popover-content', poverContent)
  },
  unbind (el) {
    let popover = getPopover(el)
    popover.remove()
    el.removeEventListener('mouseenter', enter)
    el.removeEventListener('mouseleave', leave)
  }
}

/**
 * 获取popver内部结构
 * @param {String} content html字符串
 */
function getPopoverContent (content, type, contentStyle, arrowStyle) {
  let safeContent = xssCustom.process(content)
  let popoverContent = ''
  if (type === 'popover') {
    popoverContent = `
      <div class="arrow" style="${arrowStyle}"></div>
      <div class="popover-content" style="${contentStyle}">${safeContent}</div>
    `
  } else if (type === 'tooltip') {
    popoverContent = `
      <div class="tooltip-arrow"></div>
      <div class="tooltip-inner" style="${contentStyle}">${safeContent}</div>
    `
  }
  return popoverContent
}
/**
 * 获取初始化样式
 */
function initStyle (direction, type) {
  let warpStyle = ''
  let arrowStyle = ''
  let contentStyle = ''
  if (type === 'popover') {
    warpStyle = 'border: 1px solid #e5e9f2;box-shadow: 0 5px 15px #ededed;'
    arrowStyle = 'border-width:6px;'
    contentStyle = 'padding: 14px 17px;font-size:14px;color:#333;'
    switch (direction) {
      case 'top':
        warpStyle += 'margin-top:-6px;'
        arrowStyle += 'bottom:-12px;margin-left:-6px;border-top-color:#e5e9f2;'
        break
      case 'bottom':
        warpStyle += 'margin-top:6px;'
        arrowStyle += 'top:-12px;margin-left:-6px;border-bottom-color:#e5e9f2;'
        break
      case 'left':
        warpStyle += 'margin-left:-6px;'
        arrowStyle += 'right:-12px;margin-top:-6px;border-left-color:#e5e9f2;'
        break
      case 'right':
        warpStyle += 'margin-left:6px;'
        arrowStyle += 'left:-12px;margin-top:-6px;border-right-color:#e5e9f2;'
        break
    }
  } else {
    contentStyle = 'padding: 10px 18px;font-size:14px;'
  }
  
  return {
    warpStyle,
    arrowStyle,
    contentStyle
  }
}
/**
 * 获取popover弹窗
 * @param {*} el 绑定元素
 */
function getPopover (el) {
  let popoverId = el.getAttribute('popover-id')
  let popover = document.getElementById(popoverId)
  return popover
}

/**
 * 鼠标移入事件
 * @param {*} e
 */
function enter (e) {
  let target = e.target
  // 行内元素 clientWidth=0
  let targetRect = target.getBoundingClientRect()
  let elBox = {w: targetRect.width, h: targetRect.height}
  let position = getElementPosition(target)
  let margin = target.getAttribute('popover-margin') * 1
  let direction = target.getAttribute('popover-direction')
  let popoverContent = target.getAttribute('popover-content')
  let popoverType = target.getAttribute('popover-type')
  let popover = getPopover(target)

  // id重复的话 执行这些 未找到 判断id重复的合适方法
  // js原生判断复杂 不如不判断
  let idConflict = true
  if (idConflict) {
    let classes = ['left', 'right', 'top', 'bottom', 'tooltip', 'popover']
    classes.map(item => {
      popover.classList.remove(item)
    })
    popover.classList.add(direction)
    popover.classList.add(popoverType)
    popover.innerHTML = popoverContent
  }

  popover.classList.add('show')
  popover.classList.remove('hide')

  let p_top = position.y
  let p_left = position.x

  if (direction === 'bottom') {
    p_top = p_top + elBox.h + margin
    p_left = p_left - popover.clientWidth / 2 + elBox.w / 2
  } else if (direction === 'top') {
    p_top = p_top - popover.clientHeight - margin
    p_left = p_left - popover.clientWidth / 2 + elBox.w / 2
  } else if (direction === 'left') {
    p_top = p_top + elBox.h / 2 - popover.clientHeight / 2
    p_left = p_left - popover.clientWidth - margin
  } else if (direction === 'right') {
    p_top = p_top + elBox.h / 2 - popover.clientHeight / 2
    p_left = p_left + elBox.w + margin
  }
  popover.style.top = p_top + 'px'
  popover.style.left = p_left + 'px'
}

/**
 * 鼠标移出事件
 * @param {*} e
 */
function leave (e) {
  let popover = getPopover(e.target)
  popover.classList.remove('show')
  popover.classList.add('hide')
}
