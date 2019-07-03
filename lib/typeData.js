/**
 * @name TypeData
 * @description Check-function type current data
 * @param {object, array} data
 */

function typeData(data) {
  let type = typeof data;

  if (type === 'object') {
    if (data.length !== undefined) {
      type = 'array';
    }
  }

  return type;
}

module.exports = typeData;
