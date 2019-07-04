const typeData = require('./lib/typeData');
const fieldsFilter = require('./lib/fieldsFilter');
const sizeFilter = require('./lib/sizeFilter');
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
  req.size = checkQueries(query.size, 20);
  req.expand = checkQueries(query.expand, []);
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
      res.json(sizeFilter(req.size, data, req.fields));
    } else {
      res.status(500).json({
        message: 'Everdot : Please, point your data in route',
        status: 500
      });
    }
  };

  next();
};
