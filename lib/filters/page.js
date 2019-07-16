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
    status: 200,
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
    if (page >= length / size) {
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
  const numStart = req.page * req.size - 1;
  const numEnd = numStart + req.size;

  let arr = [];

  for (let i = numStart; i <= numEnd; i++) {
    arr.push(data[i]);
  }

  return arr;
}

module.exports = page;
