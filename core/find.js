// Filters Libs
const findFilter = require('../lib/filters/find');
const findStreamFilter = require('../lib/filters/findStream');

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
  if (req.find !== 'none') {
    findFilter(req.find, data)
      .then(response => {
        Queries(req, res, type, response);
      })
      .catch(err => {
        res
          .status(404)
          .send(err)
          .end();
      });
  } else if (req.findStream !== 'none') {
    const { key, value } = req.findStream;
    findStreamFilter(key, value, data)
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
