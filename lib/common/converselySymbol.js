/**
 * @name ConverselySymbol
 * @description Get conversely symbol
 * @param {String} symbol
 * @return {String}
 * */

module.exports = function(symbol) {
  const symbols = {
    '{': '}',
    '[': ']',
    '}': '{',
    ']': '[',
    '(': ')',
    ')': '(',
    '<': '>',
    '>': '<',
    '>>': '<<',
    '<<': '>>'
  };

  return symbols[symbol];
};
