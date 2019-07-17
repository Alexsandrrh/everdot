const schemaPath = require('../schemes/getPath');
const typeData = require('./typeData');

function get(object, path, defaultValue) {
  const PATH = getCutPath(path);
  let dataPath = object;

  for (let i = 0; i < PATH.length; i++) {
    const { key, indexes } = PATH[i];
    const level = dataPath[key];

    if (typeData(level) === 'array') {
      let array = [];

      if (indexes !== null && indexes[0] !== 'auto') {
        for (let j = 0; j < indexes.length; j++) {
          array.push(level[indexes[j]]);
        }
        dataPath = array;
      } else {
        dataPath = level;
      }
    }

    if (typeData(dataPath) === 'array') {
      let array = [];
      for (let j = 0; j < dataPath.length; j++) {
        const item = dataPath[j];
        let object = {};
        object[key] = item.key;
      }

      dataPath = [];
    }
  }

  return dataPath;
}

function getCutPath(path) {
  let arrayPaths = [];
  let PATH = path.split('.');

  for (let i = 0; i < PATH.length; i++) {
    let item = PATH[i];
    let indexes = item.match(/\[(.*)\]+/);

    if (indexes !== null) {
      item = item.replace(indexes[0], '');
      indexes = indexes[1].split('][');
    }

    arrayPaths.push(schemaPath(item, indexes));
  }

  return arrayPaths;
}

console.log(
  get(
    { categories: [{ start: 'hello' }, { start: 'next' }] },
    'categories[1].start',
    ''
  )
);
