/**
 * @name NameDataTypeForSymbol
 * @description Get name data type for symbol
 * @param {String} symbol
 * @return {String}
 * */

module.exports = symbol => {
  let symbols = {
    '{': 'object',
    '[': 'array',
    '}': 'object',
    ']': 'array',
    '(': 'tuple',
    ')': 'tuple'
  };

  return symbols[symbol];
};
