const sizeFilter = require('./size');

/**
 * @name PageFilter
 * @description Generate new list objects
 * @param {Object} req
 * @param {Array} data
 * @return {Object}
 * */

function page(req, data) {
  return {
    next: pageRoute(req, data.length, 'next'),
    prev: pageRoute(req, data.length, 'prev'),
    countItems: req.size,
    dateRequest: Date.now(),
    results: sizeFilter(req.size, pageData(data, req), req.fields)
  };
}

/**
 * @name PageRoute
 * @param {Object} req
 * @param {Number} length
 * @param {String} type
 * */

function pageRoute(req, length, type) {
  const page = req.page;
  const size = req.size;

  if (type === 'prev') {
    if (page === 1) {
      return null;
    } else {
      return (
        req.domain + String(req.url).replace(`page=${page}`, `page=${page - 1}`)
      );
    }
  } else if (type === 'next') {
    if (page === length / req.size) {
      return null;
    } else {
      return (
        req.domain + String(req.url).replace(`page=${page}`, `page=${page + 1}`)
      );
    }
  }
}

/**
 * @name PageData
 * @param {Array} data
 * @param {Object} req
 * */
function pageData(data = [], req) {
  return data.splice((req.page - 1) * req.size, req.size);
}

module.exports = page;
