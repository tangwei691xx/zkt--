/** @format */

// interface config {
// 	className?: string, //全局需要增加的className
// 	customFont1?: string, //覆盖ui字体的自定义字体的链接，可选
// 	customFont2?: string,
// }
const getValueByKeyInGlobal = require('./utils/getValueByKeyInGlobal.es6')

const theme = {
  /**
   * 全局设置theme
   *
   */
  initTheme(config) {
    try {
      this.config = config;
      this.themeData = GLOBAL_ENV && GLOBAL_ENV.themeData ? GLOBAL_ENV.themeData : {};
      if (!this.themeData) {
        return;
      }
      let themeInfo = this.getTheme();
      this.themeInfo = themeInfo;
      let className =
        (config && config.className) || (themeInfo && themeInfo.themeName && this.templateEnum[themeInfo.themeName]);
      if (className) {
        document.documentElement.setAttribute('theme-version', className);
      }
      this.injectThemeVariable(config);
      return this.themeInfo;
    } catch (e) { }
  },
  getTheme() {
    let themeName = zkt._GET('templateCode') || this.themeData.templateCode;
    return {
      themeName,
      templateCode: themeName,
      isBlueGolden: themeName === '蓝金版',
      isRedGolden: themeName === '红白版',
      isDark: themeName === '深色版',
      isLight: themeName === '浅色版',
      subThemeConfigs: this.themeData.subThemeConfig,
    };
  },
  /**
   * 获取当前主题颜色
   * @param colorKey 颜色值对应的key
   * @returns {String} 对应的颜色值
   */
  getCurrentColor(colorKey = 'Primary') {
    if (!this) return '';
    const { themeInfo = {}, lightThemeVariables = {}, darkThemeVariables = {} } = this || {};
    const { isDark = false } = themeInfo || {};
    const currentThemeVariables = (isDark ? darkThemeVariables : lightThemeVariables) || {};
    return currentThemeVariables[colorKey] || '';
  },

  /**
   * rgba 转换 hex
   * @param color rgba的颜色值，格式为 rgba(255, 255, 255, 0.5)
   */
  rgbaToHex(color = '') {
    if (!color) return '';
    const values = color
      .replace(/rgba?\(/, '')
      .replace(/\)/, '')
      .replace(/[\s+]/g, '')
      .split(',');
    const a = parseFloat(values[3] || 1);
    const r = Math.floor(a * parseInt(values[0]) + (1 - a) * 255);
    const g = Math.floor(a * parseInt(values[1]) + (1 - a) * 255);
    const b = Math.floor(a * parseInt(values[2]) + (1 - a) * 255);
    return `#${`0${r.toString(16)}`.slice(-2)}${`0${g.toString(16)}`.slice(-2)}${`0${b.toString(16)}`.slice(-2)}`;
  },

  /**
   * 计算颜色值加上透明度得到一个纯色值
   */
  calculateColorWithOpacity(color = '', opacity = 0.5) {
    if (!this) return '';
    if (!color) return '';
    if (!opacity) return color;
    const rgbaColor = this.hexToRgba(color, opacity);
    return this.rgbaToHex(rgbaColor) || '';
  },

  calculateColorWithOpacityByColorKey(colorKey = 'Primary', opacity = 0.5) {
    if (!this) return '';
    if (!colorKey) return '';
    if (!opacity) return '';

    return this.calculateColorWithOpacity(
      this.getCurrentColor(colorKey), opacity
    ) || '';
  },

  templateEnum: {
    蓝金版: 'blue-golden',
    红白版: 'red-golden',
    深色版: 'dark',
    浅色版: 'light',
  },
  injectThemeVariable(initConfig) {
    let isDark = this.themeInfo.isDark,
      setDocumentStyle = document.documentElement.style.setProperty.bind(document.documentElement.style),
      customConfig = this.themeData.customConfig || {};

    let finalVariables = isDark ? this.darkThemeVariables : this.lightThemeVariables;
    if (customConfig.mainTonal) {
      finalVariables['Primary'] = customConfig.mainTonal;
    }
    if (customConfig.auxiliaryTonal) {
      finalVariables['Secondary'] = customConfig.auxiliaryTonal;
    }
    Object.keys(finalVariables).forEach((key) => {
      setDocumentStyle(`--${key}`, finalVariables[key]);
    });

    //注入透明度对应的主辅色
    let AlphaArray = [10, 20, 30, 40, 50, 60, 70, 80, 90];
    AlphaArray.forEach((alpha) => {
      setDocumentStyle(`--Primary${alpha}`, this.hexToRgba(finalVariables['Primary'], alpha / 100));
      setDocumentStyle(`--Secondary${alpha}`, this.hexToRgba(finalVariables['Secondary'], alpha / 100));
    });

    let AlphaHexArray = [10];
    AlphaHexArray.forEach((alpha) => {
      setDocumentStyle(`--PrimaryHex${alpha}`, this.calculateColorWithOpacity(finalVariables['Primary'], alpha / 100));
      setDocumentStyle(`--SecondaryHex${alpha}`, this.calculateColorWithOpacity(finalVariables['Secondary'], alpha / 100));
    });

    //自定义的字体为 字体1 EV0007 字体2 EV0008
    let customFont = customConfig.typeface,
      fontLink;

    if (customFont && customFont === 'EV0007' && initConfig.customFont1) {
      fontLink = initConfig.customFont1;
    }
    if (customFont && customFont === 'EV0008' && initConfig.customFont2) {
      fontLink = initConfig.customFont2;
    }
    if (fontLink) {
      var newStyle = document.createElement('style');
      newStyle.appendChild(
        document.createTextNode(`@font-face {
                font-family: zktFont;
                src: url(${fontLink}) format("woff");

                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;

                font-weight: 400;
                font-style: normal;
            }`),
      );
      document.head.appendChild(newStyle);
    }
  },
  lightThemeVariables: {
    //Primary
    Primary: '#bb3522',
    Secondary: '#bb3522',
    // Primary: '#a8282f',    // 黑白版完全上线后切换为这个红色
    // Secondary: '#a8282f',  //

    //Background
    Bg: '#f4f4f4',
    BgCenter: '#f4f4f4',
    BgLight: '#ffffff',

    //Block
    BlockLight: '#ffffff',
    BlockMedium: '#ffffff',
    BlockDark: '#ffffff',

    //BottomBar
    BottomWhite: '#ffffff',

    //Text
    TextLight: '#bfbfbf',
    TextMedium: '#808080',
    TextDark: '#333333',

    //ButtonDisabled
    TextDisabled: '#afafaf',
    ButtonDisabled: '#e9e9e9',

    //Separator
    Separator: '#e0e0e0',

    // button text color
    ButtonTextTonal: '#fff',
  },
  darkThemeVariables: {
    //Primary
    Primary: '#a64146',
    Secondary: '#a64146',

    //Background
    Bg: '#101010', //101010 - 1a1a1a - 101010 不可以直接用
    BgCenter: '#1a1a1a',
    BgLight: '#101010',

    //Block
    BlockLight: '#2c2c2c',
    BlockMedium: '#262626',
    BlockDark: '#111111',

    //BottomBar
    BottomWhite: '#222222',

    //Text
    TextLight: '#686868',
    TextMedium: '#bfbfbf',
    TextDark: '#ffffff',

    //ButtonDisabled
    TextDisabled: '#808080',
    ButtonDisabled: '#333333',

    //Separator
    Separator: '#363636',

    // button text color
    ButtonTextTonal: '#fff',
  },
  hexToRgba(hex, opacity) {
    return (
      'rgba(' +
      parseInt('0x' + hex.slice(1, 3)) +
      ',' +
      parseInt('0x' + hex.slice(3, 5)) +
      ',' +
      parseInt('0x' + hex.slice(5, 7)) +
      ',' +
      opacity +
      ')'
    );
  },
  getSubThemeConfig(productLineName) {
    return z.get(this.themeInfo || {}, 'subThemeConfigs.' + productLineName + '.relatedCode');
  },
  reInitTheme(themeData) {
    try {
      if (typeof themeData === 'object' && Object.keys(themeData).length) {
        window.GLOBAL_ENV.themeData = themeData;
        this.initTheme(this.config);
      }
      setTimeout(() => {
        this.setPageThemeInfo(true);
      }, 0);
    } catch (e) { }
  },
  getPageThemeCustomStatus() {
    const routeInfo = zkt.zktRouteInfo || {};
    const routeMeta = routeInfo.meta || { customTheme: false };
    return routeMeta.customTheme || false;
  },
  setPageThemeInfo(status, path) {
    const _path = path || (zkt.zktRouteInfo || {}).path;
    if (_path) {
      if (!zkt.zktPageTheme) {
        zkt.zktPageTheme = {};
      }
      if (!zkt.zktPageTheme[_path]) {
        zkt.zktPageTheme[_path] = {};
      }
      if (status !== zkt.zktPageTheme[_path].status) {
        zkt.zktPageTheme[_path].status = status;
        if (status) {
          this.noticePageThemeInfo();
        }
      }
    }
  },
  initPageThemeInfo() {
    const { path } = zkt.zktRouteInfo || {};
    if (path) {
      const pageThemeShouldCustom = theme.getPageThemeCustomStatus();
      if (!zkt.zktPageTheme) {
        zkt.zktPageTheme = {};
      }
      zkt.zktPageTheme[path] = {
        status: !pageThemeShouldCustom,
      };
      // 后期改成proxy的方法
      if (zkt.zktPageTheme[path].status) {
        theme.noticePageThemeInfo();
      }
    }
  },
  noticePageThemeInfo() {
    const { path } = zkt.zktRouteInfo || {};
    let pageThemeInfo = null;
    if (zkt.zktPageTheme && zkt.zktPageTheme[path]) {
      pageThemeInfo = zkt.zktPageTheme[path];
    }
    if (pageThemeInfo && pageThemeInfo.status) {
      zkt.eventBus.triggerDelay('pageThemeComplete');
    }
  },
  getLoadingConfig() {
    let themeData;
    let defaultText;
    let lang;
    /* #region 浅色默认loading */
    const defaultLoadingLight = 'https://static.zhiketong.com/static/img/clientstyle/preview/loading_light.gif';
    const defaultLoadingBackgroundMap = {
      "light": "#f4f4f4",
      "dark": "#19171a"
    }

    /* #endregion */
    /* #region 默认深色lading */
    const defaultLoadingDark = 'https://static.zhiketong.com/static/img/clientstyle/preview/loading_dark.gif'
    /* #endregion */
    try {
      themeData = getValueByKeyInGlobal('themeData', null);
      lang = zkt.intl && zkt.intl.currentLocale
      // 中英文的默认文案
      defaultText = lang === 'en' ? 'The best price will come at once...' : '好价优选即刻就来...';
    } catch (e) {
      if (typeof process !== 'undefined' && process.env) {
        if (process.env.NODE_ENV === 'development') {
          throw e;
        }
      }
    }
    // 默认Loading
    if (!themeData) {
      themeData = {
        templateCode: '浅色版',
        customConfig: {
          loadingImage: defaultLoadingLight,
          loadingText: defaultText,
          loadingBackgroundMap: defaultLoadingBackgroundMap
        },
      };
    }
    // 读取配置的链接、深浅色
    let themeVersion = 'light';
    let loadingImage = defaultLoadingLight;
    let loadingText = defaultText;
    let loadingBackgroundColor = defaultLoadingBackgroundMap.light;
    let type = 'normal';
    if (themeData.templateCode) {
      themeVersion = theme.templateEnum[themeData.templateCode] || '';
    }
    if (themeVersion !== 'dark') {
      themeVersion = 'light';
    }
    if (themeData.customConfig) {
      loadingImage =
        themeData.customConfig.loadingImage || (themeVersion === 'dark' ? defaultLoadingDark : defaultLoadingLight);
      loadingText = (lang === 'en' ? themeData.customConfig.loadingTextEn : themeData.customConfig.loadingTextCn);
      type = themeData.customConfig.skeleton * 1 === 1 ? 'skeleton' : 'normal';
      loadingBackgroundColor = themeData.customConfig.loadingBackgroundMap[themeVersion] || defaultLoadingBackgroundMap.light;
    }
    return {
      themeVersion,
      loadingImage,
      loadingBackgroundColor,
      loadingText,
      type,
    };
  },
};

module.exports = theme;
