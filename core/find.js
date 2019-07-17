// Filters Libs
const filter = require('../lib/filters/filter');
const findFilter = require('../lib/filters/find');

// Other modules
const Queries = require('./queries');

/**
 * @name Find
 * @param {Object} req
 * @param {Object} res
 * @param {String} type
 * @param {Array | Object} data
 * */

function Find(req, res, type, data) {
  if (req.filter !== 'none') {
    filter(req.filter, data)
      .then(response => {
        Queries(req, res, type, response);
      })
      .catch(err => {
        res
          .status(404)
          .send(err)
          .end();
      });
  } else if (req.find !== 'none') {
    const { key, value } = req.find[0];
    findFilter(key, value, data)
      .then(response => {
        Queries(req, res, type, response);
      })
      .catch(err => {
        res
          .status(404)
          .send(err)
          .end();
      });
  } else {
    Queries(req, res, type, data);
  }
}

module.exports = Find;
