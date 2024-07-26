import html2canvas from 'html2canvas'
import dataURLtoBlob from 'blueimp-canvas-to-blob'

export function downLoadHtml (el, param) {
  // 复制节点 放到 body下的一个隐藏元素里
  let cloneNode = el.cloneNode(true)
  let nodeWrap = document.getElementById('_node_wrap_for_download')
  if (!nodeWrap) {
    nodeWrap = document.createElement('DIV')
    nodeWrap.setAttribute('id', '_node_wrap_for_download')
    nodeWrap.style.position = 'fixed';
    nodeWrap.style.top = '0';
    nodeWrap.style.left = '0';
    nodeWrap.style.opacity = '0';
    nodeWrap.style['z-index'] = '-1';
    document.body.appendChild(nodeWrap)
  }
  nodeWrap.innerHTML = ''
  nodeWrap.appendChild(cloneNode)

  return html2canvas(cloneNode, {
    width: param.width || 100,
    height: param.height || 100,
    x: param.x || 0,
    y: param.y || 0,
    backgroundColor: '#ffffff',
    scale: 1,
    scrollX: 0,
    scrollY:0
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
      mywin.document.write('<img src='+canvas.toDataURL("image/png")+'/>');
    }
  })
}