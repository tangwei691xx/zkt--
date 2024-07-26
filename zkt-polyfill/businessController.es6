/**
 * 业务线控制器
 * @author fanshaoyong
 */

const businessController = {
  markDomainMaps: {
    '消费者': 'xfz',
    '裂变红包': 'hb',
    '砍价': 'kj',
    '拼团': 'pt',
    '大转盘': 'dzp',
    '摇一摇': 'yyy',
    '任务宝': 'rwb',
    '集卡': 'jk',
    '定向发券': 'dxfq',
    '微信群发': 'wxqf',
    '小猪': 'xz'
  },
  bussinessRouterMaps: {
    '默认首页': '/Customizesnapshot/homePage',
    'BALABALA': '/Customizesnapshot',
    '预售券': '/Ticket/TicketPoster',
    '组合产品': '/Ticket/Package',
    '捆绑活动': '/Ticket/Bundle',
    '拼团活动': '/Ticket/GroupbuyDetail'
  },
  sourceTypeMaps: {
    eb: 'ShareTool',
    official_artical: 'ShareTool',
    official_menu: 'ShareTool',
    official_shop: 'ShareTool',
    wxlive_code: 'ToolsShare',
    other: 'ShareTool'
  },
  _getDomainConfigByGlobalEnv () {
    let result = {}
    try {
      result = window.GLOBAL_ENV.doMainConfig
    } catch (e) {
      console.log(e);
      result = {}
    }
    return result || {};
  },
  _getDomainConfigByServer () {
    let appid = z._GET('appid') || '';
    let apiUrl = z.getCommonServicePath() + '/api?method=getDomainConfig';
    return z.fetch(apiUrl, {
      json: {
        args: {
          appid
        }
      }
    }).then((data) => {
      if (data.data) {
        try {
          return JSON.parse(data.data)['h5'];
        } catch (e) {
          return {}
        }
      }
      return {}
    })
  },
  _checkUrlNeedZktToThirdCache: {},
  async _checkUrlNeedZktToThird (url, appid) {
    if (!this._checkUrlNeedZktToThirdCache[appid]) {
      this._checkUrlNeedZktToThirdCache[appid] = {}
    }
    if (!this._checkUrlNeedZktToThirdCache[appid][url]) {
      let result = await this._checkNeedZktToThird(url, appid)
      if (result.success) {
        this._checkUrlNeedZktToThirdCache.xzDomain = result.xzDomain
        this._checkUrlNeedZktToThirdCache[appid][url] = {
          needZktToThird: result.needZktToThird
        }
      } else {
        this._checkUrlNeedZktToThirdCache[appid][url] = {
          needZktToThird: false
        }
      }
    }
    return Promise.resolve(this._checkUrlNeedZktToThirdCache[appid][url])
  },
  async _checkNeedZktToThird (url, appid) {
    let apiUrl = z.getCommonServicePath() + '/api?method=checkUrlNeedZktToThird';
    return z.fetch(apiUrl, {
      json: {
        args: {
          appid,
          url
        }
      }
    }).then((data) => {
      if (data.success) {
        return data
      }
      return {}
    })
  },
  // 营销活动域名管理https://wiki.zhiketong.net/pages/viewpage.action?pageId=56361080
  async getMarketDomains () {
    let domains = businessController._getDomainConfigByGlobalEnv();
    if (!domains.xfz) {
      domains = await businessController._getDomainConfigByServer();
      window.GLOBAL_ENV.doMainConfig = domains;
    } else {
      domains = Promise.resolve(domains)
    }
    return domains;
  },
  getZhidaDomain () {
    try {
      return window.GLOBAL_ENV.zhidaDomain
    } catch (e) {
      return ''
    }
  },
  async getShareSignUrl (url) {
    let apiUrl = z.getCommonServicePath() + '/api?method=getShareSignUrl';
    return z.fetch(apiUrl, {
      json: {
        args: {
          url
        }
      }
    }).then((data) => {
      if (data.result) {
        return data.result;
      }
      return url;
    }).catch((e) => {
      console.log(e);
      return url;
    })
  },
  async getBusinessRouter (bussinessLine, args={}, linkType='直达', removeQuery) {
    let path = businessController.bussinessRouterMaps[bussinessLine]
    let domainKey = businessController.markDomainMaps[linkType];
    if (path) {
      path = z._addParams(path, args, removeQuery);
    }
    let params = z._GET();
    let protocol = location ? location.protocol + '//' : '';
    let link = path;
    let marketPath = ''
    let appid = args.appid || params.appid || '';
    let _linkType = linkType
    if (domainKey) {
      let marketDomains = await businessController.getMarketDomains();
      let marketDomain = marketDomains[domainKey];
      if (linkType === '消费者') {
        if (!appid) {
          return Promise.reject('请提供appid参数')
        }
        let res = await businessController._checkUrlNeedZktToThird(path, appid)
        if (res.needZktToThird) {
          _linkType = '小猪'
          marketDomain = this._checkUrlNeedZktToThirdCache.xzDomain || marketDomain
        }
        marketPath = protocol + marketDomain;
        link = protocol + marketDomain + path;
      }
    } else {
      let domain = businessController.getZhidaDomain()
      link = `${protocol}${domain}${path}`
    }
    let hid = args.hid || params.hid || ''
    if (link && hid && !params.zkt_sign) {
      // 多方分帐
      link = await businessController.getShareSignUrl(link);
    }
    if (domainKey && link) {
        // TODO 多方分帐参数处理
        link = `${marketPath}/${appid}/${businessController.sourceTypeMaps.eb}/mid?appid=${appid}&url=${encodeURIComponent(link)}`;
    }
    return {
      link,
      linkType: _linkType
    }

  }
}

module.exports = businessController;