/**
 * @name FindQueries
 * @param {String} data
 * @param {String | Object | Array} value
 * @return {Array}
 * */

module.exports = (data, value = null) => {
  if (data !== undefined) {
    let arr = [];
    let newData = data.replace(/[(){}]/g, '').split(',');

    for (let i = 0; i < newData.length; i++) {
      let obj = newData[i].split(':');
      arr.push({ key: obj[0], value: obj[1] });
    }

    return arr;
  } else {
    return value;
  }
};
