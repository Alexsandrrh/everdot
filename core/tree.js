// Tree Mode
const TreeGenerate = require('../lib/tree');

/**
 * @name Tree
 * @param {Object} req
 * @param {Object} res
 * @param {String} type
 * @param {Array | Object} data
 * */

function Tree(req, res, type, data) {
  if (req.tree) {
    if (type === 'object') {
      // Entry object
      res.json(TreeGenerate(data));
    } else if (type === 'array') {
      // Entry random object
      res.json(TreeGenerate(data[0]));
    }
  }
}

module.exports = Tree;
