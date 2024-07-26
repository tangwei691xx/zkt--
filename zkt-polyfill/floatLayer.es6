/**
 * 1、无底部栏，距离底部比有底部加100px，即算上有底部的高度，在距离屏幕底部140px的位置为第一个悬浮入口位
2、有底部栏，离底部栏40px位置，为第一个悬浮入口位

40px是指设计稿750x1624px尺寸下的

一般来说，菜单栏都是100px,除了自定义的菜单有大中小之分，故只需要默认100px，然后加上40的空白，自定义菜单单独处理即可
 */
const defaultTabbarHeight = 100;
const defaultTabbarGap = 40;
const defaultGapBetweenItem = 20;
const orders = {
  channelQr: 500,
  salesCall: 400,
  telePhone: 100,
  adBtn: 200,
  customerBtn: 300
}
const floatLayer = {
  _init() {
    floatLayer.list = {};
    floatLayer.queue = {};
    floatLayer.gapBetweenItem = defaultGapBetweenItem;
    floatLayer.bottom = defaultTabbarHeight;
    floatLayer.bottomGap = defaultTabbarGap;
    floatLayer.tabbarId = '';
  },
  init() {
    floatLayer._init();
  },
  reset(){
    floatLayer._init();
  },
  _add (id, order, force) {
    if (floatLayer.list[id] && !force) {
      return;
    }
    floatLayer.queue[id] = {
      id,
      order
    }
    floatLayer.queueChangeAsync();
  },
  remove(id) {
    if (floatLayer.queue[id]) {
      delete floatLayer.queue[id];
      floatLayer.queueChangeAsync();
    } else if (floatLayer.list[id]) {
      delete floatLayer.list[id];
      floatLayer.change();
    }
  },
  calcQueue () {
    const queue = floatLayer.queue;
    let newQueue = {}
    let shouldChange = false;
    for (let i in queue) {
      const item = queue[i];
      const wh = floatLayer.calcWh(item);
      if (wh) {
        item.wh = wh;
        shouldChange = true;
        floatLayer.list[i] = item;
      } else {
        newQueue[i] = item;
      }
    }
    floatLayer.queue = newQueue;
    if (shouldChange) {
      floatLayer.change();
    }
  },
  // 异步执行，便于渲染已经完成，能正常获取到元素的宽高
  queueChangeAsync() {
    setTimeout(() => {
      floatLayer.calcQueue();
    }, 50)
  },
  // 变化
  change(forceCalc) {
    const list = floatLayer.list;
    let items = [];
    for (let i in list) {
      let item = list[i];
      items.push(item);
    };
    const _items = items.filter(item => item.wh).sort((a,b) => a.order - b.order);
    floatLayer.calcPosition(_items, forceCalc);
  },
  // 计算
  calcPosition(items, forceCalc) {
    let initValue = {
      px: 0,
      int: 0,
    }
    if (/.+px/.test(floatLayer.bottom)) {
      initValue.px = parseFloat(floatLayer.bottom);
      initValue.int = floatLayer.bottomGap
    } else {
      initValue.int = floatLayer.bottom + floatLayer.bottomGap;
    }
    items.reduce((prevBottom, currItem, index) => {
      if (forceCalc || currItem.oldIndex !== index) {
        currItem.oldIndex = index;
        currItem.pos = floatLayer.calcPos(currItem, prevBottom);
        currItem._render = true;
      }
      return {
        px: prevBottom.px + (currItem.wh.height || 0),
        int: prevBottom.int + floatLayer.gapBetweenItem,
      }
    }, initValue);
    floatLayer.render(items);
  },
  calcWh(item) {
    try {
      const ele = document.getElementById(item.id);
      const w = ele.offsetWidth;
      const h = ele.offsetHeight;
      if (w && h) {
        return {
          width: w,
          height: h
        }
      }
      return null;
    }catch(e) {
      floatLayer.throwErrorInLocal(`请确认Id为${item.id}的元素是否存在`);
      return null;
    }
  },
  calcPos(item, bottom) {
    return {
      bottom: `calc(${bottom.int/200}rem + ${bottom.px}px + env(safe-area-inset-bottom))`
    }
  },
  render(items) {
    items.forEach(item => {
      if (item._render){
        item._render = false;
        floatLayer.renderItem(item);
      }
    })
  },
  renderItem(item) {
    try{
      const ele = document.getElementById(item.id);
      ele.style.bottom = item.pos.bottom
    } catch(e) {
      console.error(e);
    }
  },
  registerCustomTabbar(id) {
    if (id && floatLayer.tabbarId !== id) {
      floatLayer.tabbarId = id;
      setTimeout(() => {
        let tabbarHeight = floatLayer.calcTabbarHeight();
        if (tabbarHeight > 0) {
          floatLayer.bottom = tabbarHeight + 'px';
          floatLayer.change(true);
        }
      }, 10)
    }
  },
  calcTabbarHeight() {
    try {
      const ele = document.getElementById(floatLayer.tabbarId);
      return ele.offsetHeight;
    } catch(e) {
      return 0
    }
  },
  register(name, id) {
    if (!orders[name]) {
      floatLayer.throwErrorInLocal(`${name}未注册，请先注册`)
    }
    let _id = id || `name-${Math.random().toString().slice(2)}`
    floatLayer._add(_id, orders[name]);
    return id;
  },
  throwErrorInLocal (msg){
    if (typeof process !== 'undefined' && process.env) {
      if (process.env.NODE_ENV === 'development') {
        throw Error(msg);
      }
    }
    console.error(msg)
  }
}

module.exports = floatLayer;