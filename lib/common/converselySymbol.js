module.exports = function(symbol) {
  const symbols = {
    '{': '}',
    '[': ']',
    '}': '{',
    ']': '['
  };

  return symbols[symbol];
};
