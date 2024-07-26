import OSS from 'ali-oss'
import dayjs from 'dayjs'
const defaults = {
  maxKeys: 1000,
  delimiter: '/',
  currentPath: ''
}

export default class OSSService {
  constructor (options) {
    this.options = Object.assign({}, defaults, options)
    this.currentPath = options.currentPath || ''
    this.expiration = ''
    this.client = null
    this.prefixes = []
    this.objects = []
    this.config = {}
  }

  getClient () {
    if (this.client && dayjs(this.expiration).isAfter(dayjs())) {
      return Promise.resolve(this.client)
    }
    return OSS.urllib.request(this.options.stsPath, {
      method: 'GET',
      beforeRequest (options) {
        options.withCredentials = true
      }
    })
      .then((res) => {
        let data = JSON.parse(res.data)
        if (res.status !== 200) {
          throw new Error(data.message)
        }
        this.expiration = data.data.expiration
        this.config = data.data
        this.client = new OSS({
          ...data.data,
          secure:true
        })
        return this.client
      })
  }

  list (params) {
    this.currentPath = params.prefix
    return this.callMethod('list', Object.assign({
      delimiter: this.options.delimiter,
      'max-keys': this.options.maxKeys
    }, params), {
      headers: {
        'Content-Type': 'application/xml'
      }
    })
      .then((res) => {
        res.prefixes = (res.prefixes || [])
          .concat(params.marker ? this.prefixes : [])
          .sort((a, b) => a > b ? -1 : 1)
        this.prefixes = res.prefixes
        res.objects = (res.objects || [])
          .concat(params.marker ? this.objects : [])
          .sort((a, b) => {
            return dayjs(a.lastModified).isAfter(dayjs(b.lastModified)) ? -1 : 1
          })
        this.objects = res.objects
        res.files = res.prefixes.map((item) => {
          return {
            name: item,
            folder: true
          }
        }).concat(res.objects)
        return res
      })
  }

  upload (name, file, options) {
    let fileName = this.currentPath + name
    return Promise.resolve()
      .then(() => {
        return this.callMethod('head', fileName, {
          headers: {
            // head请求被浏览器缓存后 会发生跨域错误
            'If-Modified-Since': 'Thu, 1 Jan 1970 00:00:00 GMT'
          }
        })
          .then((res) => {
            let arr = fileName.split('.')
            arr.splice(-1, 0, Date.now())
            fileName = arr.join('.')
            return res
          })
          .catch((res) => {
            if (res.status === 404) {
              return Promise.resolve(res)
            }
            return Promise.reject(res)
          })
      })
      .then(() => {
        return this.callMethod('put', fileName, file, options)
      })
  }

  mkdir (folderName) {
    // let content = Buffer.from('')
    return this.callMethod('put', folderName + '/', '')
  }

  delete (fileName, meta) {
    return this.callMethod('delete', fileName)
  }

  // 逻辑删除,对用户不可见,可以通过签名的URL访问
  hide (fileName) {
    return this.callMethod('putACL', fileName, 'private')
  }

  deleteMulti (objects) {
    return this.callMethod('deleteMulti', objects)
  }

  callMethod (...args) {
    return this.getClient()
      .then((client) => {
        return client[args.shift()].apply(client, args)
      })
  }
}
