// Common Libs
const typeData = require('../lib/common/typeData');

// Other modules
const Tree = require('./tree');
const Find = require('./find');

/**
 * @name Core
 * @description Main func it is controlling modules
 * @param {Object} req
 * @param {Object} res
 * @param {Array | Object} data
 * */

function core(req, res, data) {
  const type = typeData(data);

  // Set module tree mode
  Tree(req, res, type, data);

  // Set module find mode and checking queries filtering
  Find(req, res, type, data);
}

module.exports = core;
