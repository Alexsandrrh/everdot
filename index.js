// Common Libs
const getDomain = require('./lib/common/getDomain');

// Queries Libs
const otherQueries = require('./lib/queries/other');
const findQueries = require('./lib/queries/find');

// Core Module
const core = require('./core');

/**
 * @name Everdot
 * @param {Object} options
 * @return {Function}
 * */

function Everdot(options) {
  // Options
  // Page options
  this.pageModeAuto = options.pageModeAuto || true; // page mode on:off
  this.pageSize = options.pageSize || 25; // page size array

  // Other
  this.keyNotValue = options.keyNotValue;
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
    req.size = otherQueries(query.size, this.pageSize);
    req.page = otherQueries(query.page, 'default');
    req.expands = otherQueries(query.expands, []);
    req.domain = getDomain(req);

    // For module tree
    req.tree = Boolean(query.tree) || false || this.modeTree;

    // For module find & filter
    req.filter = findQueries(query.filter, 'none');
    req.find = findQueries(query.find, 'none');

    // Road
    req.domain = req.protocol + '://' + req.get('host');
    req.requestUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

    /**
     * @name SendByEverdot
     * @description Activate Everdot on route
     * @param {Array | Object } data
     * */
    res.sendByEverdot = data => {
      // Init module Core
      core(req, res, data);
    };

    next();
  };
}

module.exports = Everdot;
