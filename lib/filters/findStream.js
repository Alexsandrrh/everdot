/**
 * @name FindStreamFilter
 * @description Find right data on stream
 * @param {Array} data
 * @param {String} query
 * @param {String} key
 * @return {Promise}
 * */

function findStreamFilter(key, query, data = []) {
  return new Promise((resolve, reject) => {
    let array = data;

    for (let i = 0; i < query.length; i++) {
      const querySymbol = String(query[i]).toLowerCase();
      let clear = [];

      // filter symbols in list
      for (let j = 0; j < array.length; j++) {
        const dataNameSymbol = String(array[j][key])[i].toLowerCase();

        if (querySymbol === dataNameSymbol) {
          clear.push(array[j]);
        }
      }

      array = clear;
    }

    if (array.length === 0) {
      reject({
        status: 404,
        query: query,
        message: 'Not found for your request. Please write right request ;)'
      });
    } else {
      resolve(array);
    }
  });
}

module.exports = findStreamFilter;
