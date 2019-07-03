const typeData = require('./lib/typeData');
const fieldsFilter = require('./lib/fieldsFilter');
const sizeFilter = require('./lib/sizeFilter');

/**
 * @param {object} req
 * @param {object} res
 * @param {function} next*/

function f(req, res, next) {
  const { query } = req;

  // Set new [key] => [value]
  req.fields = query.fields.split(',');
  req.size = query.size;
  req.expand = query.expand.split(',');

  // Everdot Function
  req.everdot = data => {
    switch (typeData(data)) {
      case 'array':
        return sizeFilter(req.size, data, req.fields);
      case 'object':
        return fieldsFilter(req.fields, data);
        break;
      default:
        throw new Error('Point project data, please!');
    }
  };

  req.everdot([
    { id: 1, name: 'Alex', surname: 'Sadov', address: 'Esenina street 1' }
  ]);

  console.log(req);
  next();
}

f({
  query: {
    fields: 'id,name,surname,address',
    size: 40,
    expand: 'address'
  }
});
