/** @format */
/* eslint-disable max-params */

const getValueByKeyInGlobal = require('./utils/getValueByKeyInGlobal.es6');

/**
 * 直连相关,所有数据为 {@link https://test5-bg-api-gateway.zhiketong.net/merchant-api/swagger-ui.html#/default/brand-info-controller/getBrandConfigByAppIdUsingGET 依据appid查询到的集团配置信息}中的dc 及dcConfig
 *
 * @namespace zhilian
 */
const zhilian = {
  /**
   * 验证全局直连配置是否开启了直连，有则返回配置
   * @this zhilian
   * @returns {*}
   */
  checkZhiLianConfig() {
    const zhilianConfig = getValueByKeyInGlobal('zhilianConfig', null);
    if (zhilianConfig && zhilianConfig.dc) {
      /**
       * @property {boolean} isOpen 集团是否开启直连
       *
       */
      this.isOpen = true;
      /**
       * @property {object} allConfig 直连配置信息
       */
      this.allConfig = zhilianConfig.dcConfig;
      /**
       * @property {object} zhilianConfig 直连相关原始配置
       */
      this.zhilianConfig = zhilianConfig;
      return this.zhilianConfig;
    }
    return undefined;
  },
  /**
   * 根据key值获取对应配置
   * @inner
   * @param {string} key 需要获取的key值，可用.进行分隔，获取多层级值
   * @returns {*}
   */
  getZhiLianConfig(key) {
    const val = { ...this.allConfig };
    if (val) {
      return z.get(val, key);
    }
    return val;
  },
  /**
   * 初始化直连信息
   *
   * @inner
   * @this zhilian
   * @returns {*}
   */
  init() {
    this.checkZhiLianConfig();
    if (!this.isOpen) {
      return;
    }
    /**
     * 直连登录态标识,值为0[表示未直连任何会员]，1[表示已注册为直连会员]，2[已激活为粉丝会员]，会员维度
     */
    this.zhilianLoginKey = `${z.cookie.get('member_id')}_is_logined_zhilian`;
    /**
     * 直连登录会员ID，会员维度
     */
    this.zhiLianMemberIdKey = `${z.cookie.get('member_id')}_zhilian_member_id`;
    /**
     * 直连会员跳转注册登录次数，主要用于拦截直连登录 会员维度
     */
    this.cookieKey = `${z.cookie.get('member_id')}_zhilian_login_times`;
    /**
     * 直连跳转会员登录次数统计时效性，默认1天
     */
    this.cookieKeyExpires = `${this.cookieKey}_expires`;
    /**
     * 直连支持业务线配置,java原始数据
     */
    this.businessConfig = this.getZhiLianConfig('brandBusinessConfigResponse');
    /**
     * 直连红包配置，java原始数据
     */
    this.couponConfig = this.getZhiLianConfig('brandCouponConfigResponse');
    /**
     * 直连积分配置, java原始数据
     */
    this.pointConfig = this.getZhiLianConfig('brandPointConfigResponse');

    /**
     * 集团绑定配置项，注册第一步需要填写项配置
     * @todo 确认bindConfig与regConfig的关系
     */
    this.bindConfig = this.getZhiLianConfig('brandBindConfigResponse');
    /**
     * 直连注册配置，注册第二步需要填写项配置
     */
    this.regConfig = this.getZhiLianConfig('brandRegisterConfigResponse');
    // 当注册必须先经过绑定操作后，才能进行第二步注册时，才处理
    // 是否分开展示登录和注册按钮，false时即表示登录即注册
    if (!this.getZhiLianConfig('separateDisplayLoginAndRegister')) {
      // 将注册第二步中，已经在第一步注册已经有的填写项，设置为只读，因为第一步中已填写的数据将会传到第二步，并不可写，只展示
      if (this.bindConfig && this.regConfig) {
        Object.keys(this.regConfig).forEach((item) => {
          if (this.bindConfig[item]) {
            this.regConfig[item] = 'onlyRead';
          }
        });
      }
    }

    /**
     * 是否开启了会员直连
     * @alias checkOpenZhiLianRegister
     */
    this.enableZhilianRegister = this.checkOpenZhiLianRegister();
    /** 是否开启了储值卡直连 */
    this.enableZhilianPrePaidCard = this.businessConfig && this.businessConfig.prepaidcard;
    /** 是否开启了日历房直连 */
    this.enableZhilianRoom = this.businessConfig && this.businessConfig.hotel;
    /** 是否开启了积分直连 */
    this.enableZhilianPoint = this.businessConfig && this.businessConfig.point;
    /** 是否开启了预售券直连 */
    this.enableZhilianTicket = this.businessConfig && this.businessConfig.ticket;
    /**
     * 直连特殊标识 君庭直连: junting 温德姆直连: wyndham 新直连: new
     */
    this.specialFlag = this.allConfig && this.allConfig.specialFlag;
    /** 是否是君亭直连 */
    this.isJunTing = this.specialFlag === 'junting';
    /** 君亭直连是否已注册 */
    this.isJunTingMember = this.isJunTing && this.getRegStatus('isZhilianUser');

    /** 是否是温德姆直连 */
    this.isWyndham = this.specialFlag === 'wyndham';
    /**
     * 是否开启了直连注册后送新人红包
     * @alias checkZhiLianRegisterCoupon
     */
    this.enableZhiLianRegisterCoupon = this.checkZhiLianRegisterCoupon();
    /**
     * 是否开启了直连第二步注册
     * @alias checkNeedSecondStepRegister
     */
    this.enableNeedSecondStepRegister = this.checkNeedSecondStepRegister();

    /** 麦当劳标识 */
    this.isMcdonalds = this.specialFlag === 'mcdonalds';
    /** 是否是麦当劳已注册会员 */
    this.isMcdonaldsMember = this.isMcdonalds && this.getRegStatus('isZhilianUser');


	/** 是否是朗廷直连直连 */
	 this.isLangTing = this.specialFlag === 'langhamhotels';
  },
  /**
   * 是否展示积分，当非直连或未开通积分直连或积分直连字段中 isShowPointValue :true，展示积分
   * @returns {boolean|*|module.exports.isShowPointValue}
   */
  isShowPointValue() {
    return !this.pointConfig || (this.pointConfig && this.pointConfig.isShowPointValue);
  },
  /**
   * 获取直连会员信息允许修改信息
   * 根据不同的直连配置，在会员信息页面中，判断是否允许修改指定字段会员信息，返回字段
   *
   * @param {string} editKey 要获取的字段名，如mobile,name，如为空，则返回所有
   * @returns {json | number} 如果ediKey为空或找不到，则返回所有信息，如果editKey有值，则返回对应数字
   * 0:表示不允许修改并且不同步，1:表示始终允许修改，2:表示只在空时才允许修改
   */
  getMemberEdit(editKey) {
    const keys = ['memberEdit'];
    if (editKey) {
      keys.push(editKey);
    }
    const editor = this.getZhiLianConfig(keys.join('.'));
    return editor;
  },
  /**
   * 判断当前会员信息key是否允许被修改
   *
   * @param {string} editKey 待编辑属性信息
   * @param {string} val 待编辑的值
   * @returns {boolean} 如果是非直连返回true
   * 如果是直连时：0:不允许编辑  1：允许编辑 2：为空是允许编辑
   */
  checkAllowEditMemberInfoByKey(editKey, val = '') {
    if (!this.isOpen) {
      return true;
    }
    const res = this.getMemberEdit(editKey);
    if (typeof res !== 'number') {
      return true;
    }
    let result = true;
    switch (res) {
      case 0:
        result = false;
        break;
      case 1:
        result = true;
        break;
      case 2:
        result = !val;
        break;
      default:
        result = true;
        break;
    }
    return result;
  },
  /**
   *
   * 直连登录拦截，主要用于在某个业务场景需要依据直连配置做未登录拦截，拦截成功则跳转到直连注册，注册成功后回跳到指定页面
   * @param {string} [backurl=location.href] 注册成功后跳转Url,默认当前页面
   * @param {string} buyurl 点击直接预订跳转url,主要用于日历房散客预订，如果不填，则会取backurl
   * @param {string} [nobuy=0] 判断是否显示 直接预订 按钮参数，如果某个业务场景不想显示直接预订，则传为1
   * @param {number} [times=3] 在点击多少次后，再点击不跳转到注册
   * @param {string} registerTrigger 枚举值 hotelbook-点击客房预订按钮时候引导，forcehotelbook-客房预订强制注册，memberaccount-点击账户管理，membercoupon-点击红包，memberpoint-点击积分，ticketbuy-点击预售券购买按钮，passbuy-点击门票购买按钮，restaurantbuy-点击订餐购买按钮，ecardbuy-点击权益卡购买按钮，prepaycardbuy-点击储值卡充值"membercoupon-点击红包 memberpoint-点击积分 @see {@link https://test5-bg-api-gateway.zhiketong.net/dcs-api/swagger-ui.html#/default/直连-获取相关配置/getBrandConfigUsingGET brandRegisterConfigResponse.registerTrigger}
   * @param {string} [url=/NewHome/LoginZhiLian] 直连拦截成功后跳转到的注册url，通常不用改
   * @returns {boolean}
   */
  redirectZhiLianLogin(
    backurl = window.location.href,
    buyurl,
    nobuy = 0,
    times = 3,
    registerTrigger,
    url = '/NewHome/LoginZhiLian',
  ) {
    const isLogined = zkt.cookie.get(`${zkt.cookie.get('member_id')}_is_logined_zhilian`);
    // 开启会员直连且用户未登录
    if (this.enableZhilianRegister && isLogined !== '1') {
      // 无触发点或者无直连注册配置或者传入的触发点包含在直连注册配置触发点中
      if (
        !registerTrigger ||
        !this.regConfig ||
        (registerTrigger &&
          this.regConfig &&
          this.regConfig.registerTrigger &&
          this.regConfig.registerTrigger.indexOf(registerTrigger) !== -1)
      ) {
        if (this.checkRecordTimes(times)) {
          z.jumpTo(
            `${url}?nobuy=${nobuy}&register_trigger=${registerTrigger}&backurl=${encodeURIComponent(
              backurl,
            )}&buyurl=${encodeURIComponent(buyurl || backurl)}`,
          );
          return true;
        }
      }
    }
    return undefined;
  },
  /**
   * 判斷是否开启了直连登录
   * @returns {*|{}|MemberCard.state.member|member|{idcard}}
   */
  checkOpenZhiLianRegister() {
    return this.businessConfig && this.businessConfig.member;
  },
  /**
   * 判断直连是否配置了注册直连后发送新人红包
   * @returns {*|boolean}
   */
  checkZhiLianRegisterCoupon() {
    return (
      (this.enableZhilianRegister && this.couponConfig && this.couponConfig.newCouponTrigger === 'register') || false
    );
  },
  /**
   * 判断直连是否需要第二步注册,需要补充会员信息
   * @returns {boolean}
   */
  checkNeedSecondStepRegister() {
    let result = false;
    if (this.enableZhilianRegister && this.regConfig) {
      Object.keys(this.regConfig).some((item) => {
        if (item.indexOf('require') === 0 && this.regConfig[item]) {
          result = true;
          return true;
        }
        return false;
      });
    }
    return result;
  },
  /**
   * 设置跳转到直连注册的次数，在24小时内如果跳转到指定次数的直连，则不再跳转,存到主域下
   * @param {number} times 次数
   * @param {number} days 记录登录次数有效期，单位为天
   */
  setRecordTimes(times, days = 1) {
    let _times = times || z.cookie.get(this.cookieKey) * 1;
    const expires = z.cookie.get(this.cookieKeyExpires) || Date.now() + days * 24 * 60 * 60 * 1000;
    console.log('times--------', z.cookie.get(this.cookieKey));
    z.cookie.set(this.cookieKey, ++_times, '', '', '', expires);
    z.cookie.set(this.cookieKeyExpires, expires, 1);
  },
  /**
   * 检测当前跳转注册次数是否小于最大可跳转次数
   * @param {number} maxTimes 可跳转最大次数
   * @returns {boolean}
   */
  checkRecordTimes(maxTimes) {
    return z.cookie.get(this.cookieKey) * 1 < maxTimes;
  },
  /**
   * @typedef {Object} regStatus 注册相关配置
   * @property {boolean} regFans 是否允许注册为粉丝会员,开通了直连，并且开通了微信注册模块，并且直连登录cookie值为0时，说明此用户未注册过任何直连帐号，才能注册粉丝会员
   * @property {boolean} regZhilian 开通了直连，并且当前登录态不是已注册直连值，则才能注册直连会员
   * @property {boolean} isFansUser 是否粉丝会员
   * @property {boolean} isZhilianUser 是否直连会员
   */
  /**
   * 获取当前会员注册直连状态，分为是否允许注册粉丝会员（目前金陵专用），是否允许注册直连会员
   * @param {string} [key] 获取直连登录注册参数
   * @returns {regStatus}
   */
  getRegStatus(key) {
    const zhilianLoginKey = `${z.cookie.get('member_id')}_is_logined_zhilian`;
    const regStatus = z.cookie.get(zhilianLoginKey);
    const res = {
      // 是否允许注册为粉丝会员,开通了直连，并且开通了微信注册模块，并且直连登录cookie值为0时，说明此用户未注册过任何直连帐号，才能注册粉丝会员
      regFans: this.enableZhilianRegister && this.getZhiLianConfig('wechatRegister') && regStatus === '0',
      // 开通了直连，并且当前登录态不是已注册直连值，则才能注册直连会员
      regZhilian: this.enableZhilianRegister && regStatus !== '1',
      isFansUser: this.enableZhilianRegister && this.getZhiLianConfig('wechatRegister') && regStatus === '2',
      isZhilianUser: this.enableZhilianRegister && regStatus === '1',
    };
    if (key) {
      if (key in res) {
        return res[key];
      }
      alert(`${key}不存在，重检查代码，现有key值为：${JSON.stringify(res)}`);
    }
    return res;
  },
  /**
   * 设置直连登录状态cookie，值为0[表示未直连任何会员]，1[表示已注册为直连会员]，2[已激活为粉丝会员]
   * @param {number} val 登录状态
   * @returns {undefined}
   */
  setRegStatus(val) {
    return z.cookie.set(this.zhilianLoginKey, val);
  },
  /**
   * 获取直连的memberId
   * @returns {*}
   */
  getZhiLianMemberId() {
    return z.cookie.get(this.zhiLianMemberIdKey);
  },


  /**
   * 获取免密登录配置
   */
  getUnionidLoginDcsWithoutPasswordConfig() {
    return z.request.fetchHome('getUnionidLoginDcsWithoutPasswordConfig')
  },

  async getUnionidLoginMisConfig(unionidLoginPropsConfig) {
    let unionidLoginMisConfig = {
      ENABLE_USE_UNIONID_LOGIN_DCS_WITHOUT_PASSWORD: false,
      unionId: '',
    }

    // function
    if (typeof unionidLoginPropsConfig === 'function') {
      try {
        unionidLoginMisConfig = await unionidLoginPropsConfig();
      } catch(e) {}
    }

    // Promise
    if (unionidLoginPropsConfig && unionidLoginPropsConfig.then && typeof unionidLoginPropsConfig.then === 'function') {
      try {
        unionidLoginMisConfig = await unionidLoginPropsConfig;
      } catch (e) {
      }
    }

    // Object
    if (unionidLoginPropsConfig && Object.prototype.toString.call(unionidLoginPropsConfig) === '[object Object]') {
      unionidLoginMisConfig = unionidLoginPropsConfig;
    }

    // null || undefined
    if (!unionidLoginPropsConfig) {
      try {
        unionidLoginMisConfig = await zhilian.getUnionidLoginDcsWithoutPasswordConfig();
      } catch (e) {
      }
    }


    return unionidLoginMisConfig;
  },

  /**
   * 免密登录缓存管理
   */
  unionidLoginDcsCacheControl: {
    getKey() {
      return `${z._GET('appid')}_${z.member.getCurrentMemberId()}_NO_PASSWORD_REQUIRE_LOGIN`
    },
    remove() {
      try {
        window.sessionStorage.removeItem(this.getKey());
      } catch (e) {
        console.log(e);
      }
    },
    set() {
      try {
        window.sessionStorage.setItem(this.getKey(), '1');
      } catch (e) {}
    },
    get() {
      return window.sessionStorage.getItem(this.getKey());
    }
  },


  async unionidLoginDcs(params = {}) {
    return z.request.fetchHome('unionidLoginDcsWithoutPassword', params, {
      silent: true,
    })
  },

  /**
   * 免密登录 错误跳转
   */
  jumpToZhiLianLoginFromUnionidLoginDcs() {
    z.jumpTo('/NewHome/LoginZhiLian', {
      backurl: encodeURIComponent(window.location.href),
      isFromUnionidLoginDcs: '1',
    });
  },

  /**
   * 直连免密登录（使用unionid登录）
   * @param {string} config.currentMemberUnionid 当前用户的unionid
   * @param {Function} config.unionidLoginConfig 免密登录配置
   * @param {Function} config.callback 免密登录成功的回调
   * @param {Function} config.dcsLoginCallback 不开启免密登录回调
   * @param {Function} config.unionidLoginCallback 免密登录成功回调
   * @param {Function} config.beforeUnionidLoginCallback 免密登录前的回调
   */
  async unionidLoginDcsWithoutPassword(config) {
    let { currentMemberUnionid, unionidLoginConfig, dcsLoginCallback, unionidLoginCallback, beforeUnionidLoginCallback } = config || {};
    // 读取配置是否使用免密登录

    const unionidLoginMisConfig = await zhilian.getUnionidLoginMisConfig(unionidLoginConfig) || {};

    if (currentMemberUnionid === null && unionidLoginMisConfig && unionidLoginMisConfig.unionId) {
      currentMemberUnionid = unionidLoginMisConfig.unionId;
    } else if (currentMemberUnionid === null) {
      currentMemberUnionid = (await z.member.getCurrentMemberUnionIdByOpenIdAppId() || {}).unionId || '';;
    }

    if (unionidLoginMisConfig.ENABLE_USE_UNIONID_LOGIN_DCS_WITHOUT_PASSWORD) {
      // 免密登录
      if (!currentMemberUnionid) {
        // 拉起授权
        const res = await z.request.fetchCommon('getUserinfoByUserConfirm', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res && res.authorizedUrl) {
          window.location.href = res.authorizedUrl;
          // 记录缓存
          zhilian.unionidLoginDcsCacheControl.set(); // 设置缓存后，注意需要
        } else {
          z.Toast('唤起用户授权信息失败.');
        }
      } else {

        try {
          typeof beforeUnionidLoginCallback === 'function' && beforeUnionidLoginCallback()
        } catch (e) {}

        try {
          // 使用unionid执行免密登录, 
          const data = await zhilian.unionidLoginDcs({
            unionid: currentMemberUnionid,
            loginType: 'unionId'
          });

          console.log(data, '---- data ----'); // 获取详情

          const { result } = data || {};

          if (result === 'logined') {
            // 免密登录完成，刷新数据
            typeof unionidLoginCallback === 'function' && unionidLoginCallback(data);
          } else {
            zhilian.jumpToZhiLianLoginFromUnionidLoginDcs();
          }

        } catch (e) {
          console.log('----- 免密登录失败 -----', e);
          // 如果报错跳转过去注册
          zhilian.jumpToZhiLianLoginFromUnionidLoginDcs();
        }
      }
    } else {
      // 走回历史的逻辑
      try {
        typeof dcsLoginCallback === 'function' && dcsLoginCallback();
      } catch (e) {}
    }
  },

  /**
   * 异步执行
   */
  async asyncUnionidLoginDcsWithoutPassword(currentMemberUnionid, beforeLogin, afterLogin, defaultBehavior) {
    const unionidLoginDcsCache = zhilian.unionidLoginDcsCacheControl.get();

    if (!unionidLoginDcsCache) {

      try {
        typeof defaultBehavior === 'function' && defaultBehavior();
      } catch (e) {}

      return
    }

    let beforeLoginTime = 0;

    if (currentMemberUnionid === null) {
      try {
        beforeLoginTime = 1;
        typeof beforeLogin === 'function' && beforeLogin();
      } catch (e) {}
      try {
        currentMemberUnionid = (await z.member.getCurrentMemberUnionIdByOpenIdAppId() || {}).unionId || '';
      } catch (error) {
        zhilian.handleNoUnionId(afterLogin);
      }
    }

    if (unionidLoginDcsCache && currentMemberUnionid) {
      try {
        beforeLoginTime === 0 && typeof beforeLogin === 'function' && beforeLogin();
      } catch (e) {}

      // 免密登录
      try {
        const data =  await zhilian.unionidLoginDcs({
          unionid: currentMemberUnionid,
          loginType: 'unionId'
        });

        const { result } = data || {};

        if (result === 'logined') {
          // 免密登录完成，刷新数据
          typeof afterLogin === 'function' && afterLogin(data);
          zhilian.unionidLoginDcsCacheControl.remove();
        } else {
          zhilian.unionidLoginDcsCacheControl.remove();
          zhilian.jumpToZhiLianLoginFromUnionidLoginDcs();
        }
      } catch (e) {
        console.log('----- 免密登录失败 -----', e);
        zhilian.unionidLoginDcsCacheControl.remove();
        zhilian.jumpToZhiLianLoginFromUnionidLoginDcs();
      }
    } else {
      zhilian.handleNoUnionId(afterLogin);
    }
  },

  /**
   * 处理免密登录获取unionId失败的函数
   * @param fn 
   */
  handleNoUnionId(fn) {
    typeof fn === 'function' && fn({
      noUnionId: true
    });
    zhilian.unionidLoginDcsCacheControl.remove();
  }


};

/**
 * @exports zkt.zhilian
 * @see {@link zhilian}
 */
module.exports = zhilian;
