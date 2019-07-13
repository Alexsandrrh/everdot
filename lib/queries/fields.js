const converselySymbol = require('../common/converselySymbol');
const nameDataTypeForSymbol = require('../common/nameDataTypeForSymbol');

/**
 * @name FieldsQuery
 * @description Url convert to object
 * @param {String} data
 * @param value
 * @return {Object}
 * */

module.exports = data => {
  if (data === undefined) {
    return 'all';
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

  for (let i = 0; i < value.length; i++) {
    const item = value[i];

    if (item !== ',') {
      if (item === '[' || item === '{') {
        console.log(convertOtherTypes(i, value));

        // Set Data
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

function convertOtherTypes(start, value) {
  let type = null;
  let number = null;
  let data = '';
  let firstElem = value[start];
  let secondElem = value[start + 1];

  // Check type value
  if (firstElem === '{') {
    // converselySymbol(value[start])
    type = nameDataTypeForSymbol(firstElem);
    number = start + 1;
  } else if (firstElem === '[' && secondElem === '{') {
    // converselySymbol(value[start + 1]) + converselySymbol(value[start])
    type = nameDataTypeForSymbol(firstElem + secondElem);
    number = start + 2;
  }

  for (let i = number; i < value.length; i++) {
    if (value[i] === '}' && value[i + 1] === ']') {
      return { data: convertObject(data), type, num: i };
    } else if (value[i] === '}') {
      return { data: convertObject(data), type, num: i };
    } else {
      data += value[i];
    }
  }
}
