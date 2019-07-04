const typeData = require('./typeData');

/**
 * @name CreatorTreeObject
 * @description Generate all schema current object
 * @param {Object} data
 * @return {Object}
 * */

module.exports = data => {
  let obj = {};

  for (let key in data) {
    obj[key] = typeData(data[key]);
  }

  return obj;
};
