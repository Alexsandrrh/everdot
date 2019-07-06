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
