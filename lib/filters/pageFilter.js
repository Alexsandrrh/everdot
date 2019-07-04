const sizeFilter = require('./sizeFilter');

/**
 * @name PageFilter
 * @description Generate new list objects
 * @param {Object} req
 * @param {Array} data
 * @return {Object}
 * */

function pageFilter(req, data) {
  let pageObject = {
    next: pageRoute(req, data.length, 'next'),
    prev: pageRoute(req, data.length, 'prev'),
    countItems: Number(req.size[0]),
    results: sizeFilter(req.size, data, req.fields)
  };

  return pageObject;
}

/**
 * @name PageRoute
 * @param {Object} req
 * @param {Number} length
 * @param {String} type
 * */

function pageRoute(req, length, type) {
  const page = Number(req.page[0]);
  const size = Number(req.size[0]);

  if (type === 'prev') {
    if (page === 1) {
      return null;
    } else {
      return String(req.url).replace(`page=${page}`, `page=${page - 1}`);
    }
  } else if (type === 'next') {
    if (page === length / req.page) {
      return null;
    } else {
      console.log(length - page * size);
      return String(req.url).replace(`page=${page}`, `page=${page + 1}`);
    }
  }
}

function pageData (data = []) {

}
module.exports = pageFilter;
