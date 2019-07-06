// Common Libs
const typeData = require('./lib/common/typeData');

// Filters Libs
const fieldsFilter = require('./lib/filters/fields');
const sizeFilter = require('./lib/filters/size');
const pageFilter = require('./lib/filters/page');

// Queries Libs
const otherQueries = require('./lib/queries/other');
const fieldsQueries = require('./lib/queries/fields');

/**
 * @name EverdotMain
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * */

module.exports = (req, res, next) => {
  const { query } = req;

  // Set new [key] => [value]
  req.fields = otherQueries(query.fields, []);

  console.log(fieldsQueries(query.fields, 'all'));

  req.size = otherQueries(query.size, 'all');
  req.page = otherQueries(query.page, 'default');
  req.expand = otherQueries(query.expand, []);

  // Tree mode queries
  req.tree = query.tree;

  // Everdot Function
  res.everDot = (data, filter = true) => {
    let type = typeData(data);

    // TREE MODE
    if (req.tree === 'true') {
      if (type === 'object') {
        res.json(creatorTreeObject(data));
      } else if (type === 'array') {
        res.json(creatorTreeObject(data[0]));
      }
    }

    // Static queries
    if (type === 'object') {
      res.json(fieldsFilter(req.fields, data));
    } else if (type === 'array') {
      if (req.page === 'default') {
        res.json(sizeFilter(req.size, data, req.fields));
      } else {
        res.json(pageFilter(req, data));
      }
    } else {
      res.status(500).json({
        message: 'Everdot : Please, point your data in route',
        status: 500
      });
    }
  };

  next();
};
