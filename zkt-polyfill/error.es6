
/**
 *
 * @format
 */

/* eslint-disable import/no-unresolved */
import { ConfirmV3 } from 'zkt-react-components';

const zhidaError = require('zhida-error');

const { EErrorServeAction, EErrorUserAction, BrowserErrorContext, getUIModel } = zhidaError;
const adaptor = require('./adaptor.es6');
const debug = require('./debug.es6');

const errorInteraction = {
  /**
   * 解析error
   *
   * @param {string} msg 错误信息
   * @param {object} data 错误对象
   * @returns {Error} 返回错误信息
   */
  parseErrorObj(msg, data) {
    const error = new Error(msg);
    if (data.errorInteraction) {
      error.errorInteraction = data.errorInteraction;
    }
    return error;
  },
  /**
   * 解析友好交互数据
   *
   * @param {Error}  err 错误对象
   * @param {object} params object
   * @returns {Error} 错误对象
   */
  parseInteraction(err, params) {
    const _err = err;
    if (_err && params && !_err.errorInteraction) {
      try {
        const errorContext = new BrowserErrorContext(params);
        const _errorInteraction = errorContext.getErrorModel();
        _err.errorInteraction = _errorInteraction;
        try {
          // 浏览器层日志上报
          const messageObj = {
            ...errorContext.errorContext,
            message:
              (typeof _err === 'object' && (_err.message || _err.msg)) || (typeof _err === 'string' && _err) || '',
          };
          debug.log(JSON.stringify(messageObj), { level: 'error' });
        } catch (e) {
          console.log(e);
        }
      } catch (e) {
        console.log(e);
        return _err;
      }
    }
    return _err;
  },
  showBrowserError(err, useNewInteraction = true) {
    let errorObj = err;
    if (typeof err === 'string') {
      errorObj = new Error(err);
    }
    if (!errorObj.errorInteraction && useNewInteraction) {
      errorObj.errorInteraction = {
        message: errorObj.message,
      };
    }
    return errorInteraction.parseErrorUI(errorObj.message || '', errorObj);
  },
  shouldUseNewInteraction (err) {
    let shouldUseNewInteraction = false;
    if (window.GLOBAL_ENV && window.GLOBAL_ENV.themeData) {
      if (zkt._GET('debug') === undefined && err && err.errorInteraction) {
        shouldUseNewInteraction = Object.keys(err.errorInteraction).length > 0;
      }
    }
    return shouldUseNewInteraction;
  },
  parseErrorUI (msg, err) {
    const shouldUseNewInteraction = errorInteraction.shouldUseNewInteraction(err);
    if (!shouldUseNewInteraction) {
      return zkt.Toast(msg);
    }
    const errorInteractionConfig = (err && err.errorInteraction) || {};

    const errorUiModel = getUIModel(errorInteractionConfig);
    if (!errorUiModel) {
      return undefined;
    }

    const { message, userActionConfig, errorCode } = errorUiModel;
    const { userAction, extra = {} } = errorInteractionConfig;
    // 忽略
    if (userAction === EErrorUserAction.IGNORE) {
      return undefined;
    }

    const buttons = errorInteraction.getUserButtonConfigs(userActionConfig, userAction);
    if (ConfirmV3) {
      ConfirmV3.Confirm({
        content: message,
        buttons,
        tip: errorCode ? `${errorCode}` : false,
        hasClose: false,
      });
    }
    let timer = null;
    if (userAction === EErrorUserAction.AUTO) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (ConfirmV3 && ConfirmV3.current) {
          ConfirmV3.current.destory();
        }
      }, extra.time || 2000);
    }
  },
  parseActionCallback (action) {
    let callbackFn = null;
    switch (action) {
      case EErrorServeAction.RELOAD:
        callbackFn = function a() {
          window.location.reload();
        };
        break;
      case EErrorServeAction.RE_LOGIN:
        callbackFn = errorInteraction.reLogin;
        break;
      case EErrorServeAction.GO_HOME:
        callbackFn = function a() {
          console.log('去首页');
        }
        break;
      case EErrorServeAction.CUSTOMIZE:
      case EErrorServeAction.NONE:
      default:
        callbackFn = null;
    }
    console.log(callbackFn);
  },
  getUserButtonConfigs (userActionConfig = {}, userAction) {
    const { label, action } = (userActionConfig || {}).confirmAction || {};
    const { label: cancelLabel, action: cancelAction } = (userActionConfig || {}).cancelAction || {};
    let buttons = [];
    switch (userAction) {
      case EErrorUserAction.ALERT:
        buttons = [
          {
            label: label || '确认',
            onTap: errorInteraction.parseActionCallback(action),
          },
        ];
        break;
      case EErrorUserAction.CONFIRM:
        buttons = [
          {
            label: cancelLabel || '取消',
            onTap: errorInteraction.parseActionCallback(cancelAction),
          },
          {
            label: label || '确认',
            onTap: errorInteraction.parseActionCallback(action),
          },
        ];
        break;
      default:
    }
    return buttons;
  },
  // 后期抽到zhida-bridge
  reLogin() {
    if (adaptor.isMini() || adaptor.isAliMini()) {
      adaptor.login();
    } else {
      window.location.href = `${window.zkt.projectPath}/reset?referer_url=1`;
    }
  },
};

module.exports = errorInteraction;
