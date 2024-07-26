import OSS from 'ali-oss'
import dayjs from 'dayjs'
import axios from 'axios'

const defaults = {
  app: 'ebooking',
  scene: 'default',
  maxKeys: 1000,
  delimiter: '/',
  baseURL: 'http://ebgate.zhiketong.net/api/oss-api/eb/oss/',
  params: {
    hotelId: 5,
    brandId: 5
  },
  publicName: '全部文件',
  privateName: '我的文件'
}

function rand(max) {
  return Math.floor(Math.random() * max);
}

//passwordUnique  是否重复， quantity 生成数量   passwordLength 字符长度
function randomNumber(passwordUnique = false, passwordLength = 5, quantity = 1) {
  var chars = '';
  var passwords = [];

  chars += '0123456789';
  chars += 'abcdefghijklmnopqrstuvwxyz';
  chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  while (passwords.length < quantity) {
    var _chars = chars.split('');
    var password = '';

    for (var i = 0, l = passwordLength; i < l; i++) {
      if (_chars.length < 1) break;

      var idx = rand(_chars.length);
      password += _chars[idx];
      if (passwordUnique) _chars.splice(idx, 1);
    }

    if (passwords.indexOf(password) === -1) passwords.push(password);
  }

  return passwords
}


function checkHttpStatus(response) {
  const { status='502' } = response || {}
  if (status >= 200 && status < 300) {
    return response.data;
  }

  const message = `ERROR : ${status}`;
  const error = new Error(message);
  error.response = response;
  throw error;
}

function checkSuccess(res) {
  if (res instanceof ArrayBuffer || typeof res === 'string') {
    return res;
  }

  const { code, data, message } = res || {}

  if ( Number(code) === 0 ) {
    return data;
  }

  const error = new Error(message || '服务端返回异常');
  error.data = res;
  throw error;
}



export default class OSSService {
  constructor(options) {
    this.options = Object.assign({}, defaults, options)
    this.currentPath = ''
    this.expiration = ''
    this.client = null
    this.prefixes = []
    this.objects = []
    this.config = {}
    this.pageIndex = 0;

    this.instance = axios.create({
      baseURL: this.options.baseURL,
      timeout: 30000,
      withCredentials: true,
    });
  }

  getClient() {
    if (this.client && dayjs(this.expiration).isAfter(dayjs())) {
      return Promise.resolve(this.client)
    }
    return this.request({
      url: 'get_token',
      data: {
        app: this.options.app,
        scene: this.options.scene
      },
      params: this.options.params,
    }, 'POST').then((data) => {
      this.expiration = data.expiration
      this.config = data
      this.currentPath = data.path
      this.client = new OSS({
        ...data,
        secure: true
      })
      return this.client
    })
  }

  tree(isUser = false) {
    return this.request({
      url: isUser ? 'tree_of_user' : 'tree',
      params: this.options.params,
    }).then(data => {
      const { tree } = data || {}
      if (tree) {
        tree.displayName = !isUser ? this.options.publicName : this.options.privateName
      }
      return tree;
    })
  }

  search(keyword, ossDisplayId) {
    return this.request({
      url: 'search',
      params: {
        ...this.options.params,
        keyword,
        ossDisplayId
      },
    })
  }

  files(ossDisplayId, isMore = false) {

    if (!isMore) {
      this.pageIndex = 0;
      this.prefixes = [];
      this.objects = [];
    }

    this.pageIndex = this.pageIndex + 1

    return this.request({
      url: 'directory_files',
      params: {
        ...this.options.params,
        ossDisplayId,
        pageIndex: this.pageIndex ,
        pageSize: this.options.maxKeys,
      },
    }).then(data => {
      const { list = [], total, urlPrefix } = data;

      let prefixes = list.filter(item => item.isFolder)
      let objects = list.filter(item => !item.isFolder)

      this.prefixes = [...this.prefixes, ...prefixes]

      this.objects = [...this.objects, ...objects]

      const files = this.prefixes.concat(this.objects);
      return {
        list: files,
        isMore: list.length ? list.length < total : false,
        urlPrefix
      }
    })
  }

  move(ossDisplayIds, parentDisplayId) {
    return this.request({
      url: 'move',
      data: {
        ossDisplayIds,
        parentDisplayId
      },
      params: {
        ...this.options.params,
      },
    }, 'POST')
  }

  delete(ossDisplayIds, forceDelete = false) {
    return this.request({
      url: 'delete',
      data: {
        forceDelete,
        ossDisplayIds
      },
      params: {
        ...this.options.params,
      },
    }, 'POST')
  }

  create(ossDisplayId, displayName) {
    return this.request({
      url: 'directory_create',
      params: {
        ...this.options.params,
        ossDisplayId,
        displayName
      },
    })
  }

  rename(ossDisplayId, newDisplayName, folder = false) {
    return this.request({
      url: folder ? 'directory_rename' : 'file_rename',
      params: {
        ...this.options.params,
        ossDisplayId,
        [folder ? 'newDisplayName' : 'newName']: newDisplayName
      },
    })
  }

  upload(ossDisplayId, name, file, options) {
    return Promise.resolve()
      .then(() => {
        return this.getClient().then((client) => {
          const fileName = `${this.currentPath}${dayjs().format(`YYYYMMDDHHmmssSSS`)}_${randomNumber()}${this.fileExtension(name)}`;
          return client.put(fileName, file, options).then(() => {
            return this.request({
              url: 'file_uploaded',
              data: {
                app: this.options.app,
                scene: this.options.scene,
                fileName: name,
                key: fileName,
                ossDisplayId,
              },
              params: {
                ...this.options.params,
              },
            }, 'POST')
          })
        })
      })
  }

  fileExtension(fileName) {
    const arr = fileName.split('.');

    if (arr.length > 1) {
      return '.' + arr.pop().toLowerCase();
    }
    return ''
  }

  request(options, method = 'GET') {
    const {
      header = {},
      contentType,
      errorHandlers = {},
      ignoreMessage = false,
      ...other
    } = options;
    let newIgnoreMessage = ignoreMessage;
    return new Promise((resolve, reject) => {
      this.instance({
        ...other,
        method,
        header: {
          'content-type': contentType || 'application/json',
          ...header,
        },
      }).then(checkHttpStatus).then(checkSuccess).then((data) => {
        resolve(data);
      }).catch((error) => {
        if (error.data) {
          const { code, message } = error.data || {};
          let msg = message || '服务端返回异常';
          const handler = errorHandlers[code];
          if (typeof handler === 'string') {
            msg = handler;
          } else if (typeof handler === 'function') {
            newIgnoreMessage = true;
            handler(error.data);
          }

          if (!newIgnoreMessage && msg) {
            error.message = msg;
          }
        }
        reject(error);
      });
    });
  }

}
