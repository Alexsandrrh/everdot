/**
 * @name TypeData
 * @description Check-function type current data
 * @param {Object | Array} data
 * @return {String}
 */

function typeData(data) {
  let type = typeof data;

  if (type === 'object') {
    if (data === null) {
      type = 'object';
    } else if (data.length !== undefined) {
      type = 'array';
    }
  }

  return type;
}

module.exports = typeData;
