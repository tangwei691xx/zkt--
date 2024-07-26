export const types = {
  'UN_REGISTER_MODULE': 'UN_REGISTER_MODULE',
  'authorization': 'authorization',
  'appletRegister': 'appletRegister',
  'appletManager': 'appletManager',
  'platformRegister': 'platformRegister',
  'getAppletStatus': 'getAppletStatus',
  'updateAppletStatus': 'updateAppletStatus',
  'updateAuthStatus': 'updateAuthStatus',
  'insert': 'insert',
  'updateRegister': 'updateRegister'
}
export function getInitialState () {
  return {
    data: {
      registerStatus: '',
      appletStatus: '',
      appletRegister: false,
      appletManager: false,
      platformRegister: false
    }
  }
}
