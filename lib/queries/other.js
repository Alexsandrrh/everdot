/**
 * @name OtherQueries
 * @param {String | Number} data - Queries data
 * @param {Number | Array | String} value
 * */

module.exports = (data, value = null) => {
  if (data === undefined) {
    // Return your value
    return value;
  } else {
    // Check Success
    if (typeof data === 'string') {
      const v = Number(data.replace(/\D/g, '')) || data;
      if (typeof v === 'number') {
        // Return number
        return v;
      } else {
        switch (data.split(',')[0]) {
          case 'all':
            return [];
          case value:
            return value;
          default:
            // Return array
            return data.split(',');
        }
      }
    } else {
      // Not string data
      return data;
    }
  }
};
