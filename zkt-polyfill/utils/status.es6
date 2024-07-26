/** @format */

/**
 * @exports zkt.utils
 */
function Status() {
  this.data = {}
}

const statusEnum = {
  IDLE: 'idle',
  LOADING: 'loading',
  ERROR: 'error',
  SUCCESS: 'success',
};

Status.prototype.init = function init() {
  this.data = {
    status: statusEnum.IDLE,
  };
};

Status.prototype.reset = function reset() {
  this.data =  {
    status: statusEnum.IDLE,
  };
};

Status.prototype.loading = function loading() {
  this.data = {
    status: statusEnum.LOADING,
  };
};

Status.prototype.success = function success() {
  this.data = {
    status: statusEnum.SUCCESS,
  };
};

Status.prototype.error = function error() {
  this.data = {
    status: statusEnum.ERROR,
  };
};

Status.prototype.isLoading = function isLoading() {
  return this.data.status === statusEnum.LOADING;
};

Status.prototype.isComplete = function isComplete() {
  return this.data.status === statusEnum.ERROR || this.data.status === statusEnum.SUCCESS;
}

module.exports = Status;
