/**
 * @name CheckQueries
 * @param {string, number} data
 * @param {number, array} value*/

module.exports = (data, value) => {
  if (data === undefined) {
    return value;
  } else {
    if (typeof data === 'string') {
      return data.split(',');
    } else {
      return data;
    }
  }
};
