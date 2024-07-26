/** @format */
const getValueByKeyInGlobal = require('../utils/getValueByKeyInGlobal.es6');
const zktURI = require('./uri.es6');

/**
 * @exports zkt.uri
 */
const riskControl = {
  /**
   * 查询当前是否是灰度酒店、灰度业务线、并查询业务线的黑名单path
   * @returns {object}
   */
  checkBlackPath(appid, projectPath) {
    const defaultRes = {
      needCheckBlackPath: false,
      blackPathList: [],
    };
    try {
      const pathIsoLationConfig = getValueByKeyInGlobal('pathIsoLationConfig', {});
      const mountPath = projectPath || getValueByKeyInGlobal('mountPath', '');
      const _appid = appid || zktURI.search('appid');
      if (pathIsoLationConfig) {
        const { hotelAppid = [], businessLine = [], blackBusinessLinePathList = {} } = pathIsoLationConfig;
        const thisBlackPathList = blackBusinessLinePathList[mountPath] ? blackBusinessLinePathList[mountPath] : [];
        if (!hotelAppid.length || hotelAppid.includes(_appid)) {
          if (businessLine.includes(mountPath)) {
            return {
              blackPathList: thisBlackPathList,
              needCheckBlackPath: true,
            };
          }
        }
      }
    } catch (e) {
      return defaultRes;
    }
    return defaultRes;
  },
  addRiskControl (url, isGoto) {
    let _url = url;
    try {
      const uri = zktURI.uri(url);
      const { appid } = uri.search(true);
      const result = zktURI.callURIStaticFunc('parse', url);
      let projectPath = uri.segment(0);
      const path = uri.pathname();
      const hostName = uri.hostname() || window.location.host;
      const { zktRiskControlBlackDomain = [], zktTopLevelDomain = [], mountPath } = getValueByKeyInGlobal();
      projectPath = projectPath || mountPath;
      if (hostName && !zktRiskControlBlackDomain.includes(hostName)) {
        const isInTopLevelDomain = zktTopLevelDomain.some((item) => {
          return hostName.indexOf(item) !== -1;
        });
        if (isInTopLevelDomain) {
          if (appid && projectPath && path) {
            result.path = riskControl.addRiskControlPath(
              path,
              zkt.TJ_config.rewriteUrlConfig,
              isGoto,
              appid,
              projectPath,
            );
            _url = zktURI.callURIStaticFunc('build', result);
          }
        }
      }
    } catch (e) {
      console.log(e.toString());
    }
    return _url;
  },
  addRiskControlPath (path, rewriteUrl = [], isGoto = false, appid, mountPath) {
    // 全站隔离灰名单酒店和业务线以及黑名单
    const { needCheckBlackPath = false, blackPathList = [] } = riskControl.checkBlackPath(appid, mountPath);
    const _appid = appid || z._GET('appid');
    let _path;
    if (path === '/') {
      _path = path;
    } else if (path.lastIndexOf('/') === path.length - 1) {
      _path = path.substring(0, path.length - 1);
    } else {
      _path = path;
    }
    const rewriteStr = _appid ? `/appid_${_appid}` : '';
    const rewritePath = '/:appid?';
    let shouldRewrite = false;
    if (isGoto) {
      if (_path.indexOf(rewriteStr) !== -1) {
        return _path;
      }
    } else if (_path.indexOf(rewritePath) !== -1) {
      return _path;
    }
    if (needCheckBlackPath) {
      if (!blackPathList.includes(_path)) {
        shouldRewrite = true;
      }
    } else if (rewriteUrl === '*' || (rewriteUrl.length > 0 && rewriteUrl.includes(_path))) {
      shouldRewrite = true;
    }
    if (shouldRewrite) {
      if (isGoto) {
        if (!riskControl.checkPathHasRiskControl(_path)) {
          // 这里需要判断路径是否已经做过风控处理
          _path += rewriteStr;
        }
      } else {
        _path += rewritePath;
      }
    }
    return _path;
  },
  checkPathHasRiskControl (path) {
    const _path = zktURI.path(path);
    const pathWithRiskControl = zktURI.pathWithRiskControl(path);
    return pathWithRiskControl !== _path;
  },
};

module.exports = riskControl;
