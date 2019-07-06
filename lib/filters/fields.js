/**
 * @name FieldsFilter
 * @description Generate new object with the right keys
 * @param {Array} fields
 * @param {Object} data
 * @return {Object}
 * */

function fields(fields = [], data) {
  // Set new object
  let obj = {};

  if (fields.length === 0) {
    return data;
  } else {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i];

      // Create right [key] => [value]
      if (data[field] !== undefined) {
        obj[field] = data[field];
      }
    }
    return obj;
  }
}

module.exports = fields;
