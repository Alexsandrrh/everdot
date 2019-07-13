// Common Libs
const typeData = require('./lib/common/typeData');
const getDomain = require('./lib/common/getDomain');

// Filters Libs
const fieldsFilter = require('./lib/filters/fields');
const sizeFilter = require('./lib/filters/size');
const pageFilter = require('./lib/filters/page');

// Queries Libs
const otherQueries = require('./lib/queries/other');
const fieldsQueries = require('./lib/queries/fields');

// Tree Mode
const TreeGenerate = require('./lib/tree');

// Create Main function

/**
 * @name Everdot
 * @param {Object} options
 * @return {Function}
 * */

function Everdot(options) {
  // Options
  this.pageSize = options.pageSize || 20;
  this.keyNotValue = options.keyNotValue;
  this.debug = options.debug || false;
  this.modeTree = options.modeTree || false;

  /**
   * @name Middleware Function
   * @param {Object} req
   * @param {Object} res
   * @param {Function} next
   * */
  return (req, res, next) => {
    const { query } = req;

    // Set new [key] => [value]
    req.fields = otherQueries(query.fields, []);

    fieldsQueries(query.fields);

    req.size = otherQueries(query.size, this.pageSize);
    req.page = otherQueries(query.page, 'default');
    req.expands = otherQueries(query.expands, []);
    req.domain = getDomain(req);
    req.tree = Boolean(query.tree) || false || this.modeTree;

    // Everdot Function
    res.everDot = data => {
      const type = typeData(data);

      // TREE MODE
      if (req.tree) {
        if (type === 'object') {
          // Entry object
          res.json(TreeGenerate(data));
        } else if (type === 'array') {
          // Entry random object
          res.json(TreeGenerate(data[0]));
        }
      }

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
    };

    next();
  };
}

module.exports = Everdot;
