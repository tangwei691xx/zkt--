// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getCancelError = function (msg) {
  const error = new Error(msg || '用户取消定位');
  error.code = 'cancel';
  return error;
};

const getErrorWithCode = function (err, code) {
  let error;
  if (typeof err === 'object' && err.errMsg) {
    error = err;
  } else if (!(err instanceof Error)) {
    error = new Error(err);
  }
  error.code = code || 'error';
  return error;
};

const errorIsCancel = function (err) {
  return err && err.code === 'cancel';
};

module.exports = {
  getCancelError,
  errorIsCancel,
  getErrorWithCode,
};
