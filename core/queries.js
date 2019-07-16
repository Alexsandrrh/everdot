// Filters Libs
const fieldsFilter = require('../lib/filters/fields');
const sizeFilter = require('../lib/filters/size');
const pageFilter = require('../lib/filters/page');

/**
 * @name Queries
 * @param {Object} req
 * @param {Object} res
 * @param {String} type
 * @param {Array | Object} data
 * */

function Queries(req, res, type, data) {
  // Static queries
  switch (type) {
    case 'object':
      // Working Query Fields
      res.json(fieldsFilter(req.fields, data));
      break;
    case 'array':
      if (req.page === 'default') {
        // Working Queries Size, Fields
        res.json(sizeFilter(req.size, data, req.fields));
      } else {
        // Working Queries Page, Size, Fields
        res.json(pageFilter(req, data));
      }
      break;
    default:
      // Error
      res.status(500).json({
        message: 'Everdot : Please, point your data in route',
        status: 500
      });
  }
}

module.exports = Queries;
