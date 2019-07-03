const typeData = require('./lib/typeData');
const fieldsFilter = require('./lib/fieldsFilter');
const sizeFilter = require('./lib/sizeFilter');
const checkQueries = require('./lib/checkQueries');

/**
 * @param {object} req
 * @param {object} res
 * @param {function} next*/

module.exports = (req, res, next) => {
  const { query } = req;

  // Set new [key] => [value]
  req.fields = checkQueries(query.fields, []);
  req.size = checkQueries(query.size, 20);
  req.expand = checkQueries(query.expand, []);

  // Everdot Function
  res.everDot = data => {
    switch (typeData(data)) {
      case 'object':
        res.json(fieldsFilter(req.fields, data));
        break;
      case 'array':
        res.json(sizeFilter(req.size, data, req, fields));
        break;
      default:
        res.status(500).json({
          message: 'Everdot : Please, point your data in route',
          status: 500
        });
    }
  };

  next();
};
