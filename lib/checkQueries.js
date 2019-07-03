/**
 * @name CheckQueries
 * @param {string, number} data
 * @param {number, array} value*/

module.exports = (data, value) => {
  if (data === undefined) {
    return value;
  } else {
    if (typeof data === 'string') {
      if (data.split(',')[0] === 'all') {
        return [];
      } else {
        return data.split(',');
      }
    } else {
      return data;
    }
  }
};
