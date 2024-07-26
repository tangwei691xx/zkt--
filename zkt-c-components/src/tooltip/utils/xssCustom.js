import xss from 'xss'

let whiteList = xss.whiteList

for (const key in whiteList) {
  if (whiteList.hasOwnProperty(key)) {
    whiteList[key] = whiteList[key].concat(['class', 'style'])
  }
}
let xssOption = {
  whiteList
}
let xssCustom = new xss.FilterXSS(xssOption)

export default xssCustom