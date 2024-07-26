/**
 * 获取元素在页面中的坐标(x, y)
 * @param {Object} e
 */
export function getElementPosition(el) {
  //方法一 未考虑滚动
  // var x = 0, y = 0;
  // while(el != null) {
  //     x += el.offsetLeft;
  //     y += el.offsetTop;
  //     e = el.offsetParent;
  // }
  // return { x: x, y: y };

  // 方法二 包含滚动
  let rect = el.getBoundingClientRect()

  let sX =  window.pageXOffset
  let sY =  window.pageYOffset
  if (typeof(sX) === 'undefined') {
    sX = (((t = document.documentElement) || (t = document.body.parentNode))
    && typeof t.scrollLeft == 'number' ? t : document.body).scrollLeft
    sY = (((t = document.documentElement) || (t = document.body.parentNode))
    && typeof t.scrollTop == 'number' ? t : document.body).scrollTop
  }

  return {x: rect.left + sX, y: rect.top + sY}
}

/**
 * 唯一id生成
 */
export function generateId (prefix = 'id') {
  let random = Math.floor(Math.random() * 10000)
  let popoverId = prefix + '_' + random
  return popoverId
}
