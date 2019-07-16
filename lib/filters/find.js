/**
 * @name FindFilter
 * @description Get some data for right filters
 * @param {Array} filters
 * @param {Array} data
 * @return {Promise}
 * */

function findFilter(filters, data = []) {
  return new Promise((resolve, reject) => {
    let array = data;

    for (let i = 0; i < filters.length; i++) {
      const { key, value } = filters[i];
      let clear = [];
      for (let j = 0; j < array.length; j++) {
        if (String(array[j][key]) === String(value)) {
          clear.push(array[j]);
        }
      }

      array = clear;
    }

    if (array.length === 0) {
      reject({
        status: 404,
        message: 'Not found for your request. Please write right request ;)'
      });
    } else {
      resolve(array);
    }
  });
}

module.exports = findFilter;
