const typeData = require('./lib/typeData');
const fieldsFilter = require('./lib/filters/fieldsFilter');
const sizeFilter = require('./lib/filters/sizeFilter');
const pageFilter = require('./lib/filters/pageFilter');
const checkQueries = require('./lib/checkQueries');
const creatorTreeObject = require('./lib/creatorTreeObject');

/**
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * */

module.exports = (req, res, next) => {
  const { query } = req;

  // Set new [key] => [value]
  req.fields = checkQueries(query.fields, []);
  req.size = checkQueries(query.size, 'all');
  req.page = checkQueries(query.page, 'default');
  req.expand = checkQueries(query.expand, []);

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
