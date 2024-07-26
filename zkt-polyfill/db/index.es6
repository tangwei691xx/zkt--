const redisDB = require('./redisDB.es6');

module.exports = {
    init(){
        redisDB.init();
    },
    ...redisDB,
  };