/**
 * @name OtherQueries
 * @param {String | Number} data
 * @param {Number | Array | String} value
 * */

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
