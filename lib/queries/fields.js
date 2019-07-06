const converselySymbol = require('../common/converselySymbol');
const nameDataTypeForSymbol = require('../common/nameDataTypeForSymbol');
/**
 * @name FieldsQuery
 * @description Url convert to object
 * @param {String} data
 * @param value
 * @return {Object}
 * */

module.exports = (data, value = 'all') => {
  if (data === undefined) {
    return value;
  } else {
    return convertObject(data);
  }
};

function convertArray(index, value) {
  let data = '';
  let startSymbol = value[index];
  let num = index;

  for (let i = index; i < value.length; i++) {
    const item = value[i];

    if ((item !== '[') & (item !== ']') & (item !== '{') & (item !== '}')) {
      data += item;
    }

    num += 1;

    if (item === converselySymbol(startSymbol)) {
      break;
    }
  }

  return { data: convertObject(data), num };
}

function schema(key, type, schema) {
  return {
    key,
    type,
    schema
  };
}

function convertObject(value) {
  let arr = [];
  let word = '';

  console.log(value.length);

  for (let i = 0; i < value.length; i++) {
    const item = value[i];

    if (item !== ',') {
      if (item === '[' || item === '{') {
        let object = convertArray(i, value);
        arr.push(schema(word, nameDataTypeForSymbol(item), object.data));
        i = object.num;

        // Clear last word
        word = '';
      } else {
        word += item;

        if (i === value.length - 1) {
          arr.push(word);
        }
      }
    } else {
      // Insert new key
      arr.push(word);

      // Clear last word
      word = '';
    }
  }

  return arr;
}
