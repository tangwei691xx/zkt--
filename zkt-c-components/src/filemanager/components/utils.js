/**
 * 获取文件名和后缀
 * @param {File} file
 */
function getNameInfo (file) {
  let nameMatch = file.name.match(/^([\w\W]*)\.(\w+)$/)
  return {
    name: (nameMatch && nameMatch[1]) || file.name,
    suffix: (nameMatch && nameMatch[2]) || ''
  }
}

/**
 * {文件名 + 大小 + 后缀 + 修改时间} base64
 * @param {File} file
 */
export function getHashNameLong (file) {
  let {name, suffix} = getNameInfo(file)
  let fileName = ''
  try {
    fileName = btoa(JSON.stringify({
      name: encodeURIComponent(name),
      suffix: suffix,
      lastModified: file.lastModified,
      size: file.size
    })) + getSuffix(suffix)
  } catch (error) {
    fileName = file.name + getSuffix(suffix)
  }
  return {
    fileName,
    suffix
  }
}

/**
 * 文件名 + 大小 + 后缀
 * @param {File} file
 */
export function getHashName (file) {
  let {name, suffix} = getNameInfo(file)
  let fileName = ''
  try {
    fileName = btoa(encodeURIComponent(name)) + '_' + file.size + getSuffix(suffix)
  } catch (error) {
    fileName = file.name + getSuffix(suffix)
  }
  return {
    fileName,
    suffix
  }
}

/**
 * 原文件名+时间戳+后缀
 * @param {File} file
 */
export function getHashNameStamp (file) {
  let {name, suffix} = getNameInfo(file)
  let fileName = ''
  try {
    fileName = btoa(encodeURIComponent(name)) + '_' + Date.now() + getSuffix(suffix)
  } catch (error) {
    fileName = file.name + '_' + Date.now() + getSuffix(suffix)
  }
  return {
    fileName,
    suffix
  }
}

function getSuffix (suffix) {
  return suffix ? '.' + suffix : ''
}
/**
 * 获取文件名（处理过）和后缀
 * @param {File} file 文件对象
 * @param {类型} type
 */
export function getNameAndSuffix (file, type) {
  let getNameFunMap = {
    '1': getHashNameStamp,
    '2': getHashName,
    '3': getHashNameLong
  }
  return getNameFunMap[type](file)
}
