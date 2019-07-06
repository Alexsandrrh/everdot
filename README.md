![Everdot](./everdot.png)

## Quickstart

To start using Evernote:

1. Install the package in your project. `yarn add everdot` or `npm install everdot`
2. Make the import where you initialize the middleware development.

```
const express = require('express');
const app = express();
const PORT = 3000;
const Everdot = require('everdot');

// Init Everdot to Middleware
app.use(Everdot());

// Init Routes
app.use('/api', require('./routes/user');

// Start Server
app.listen(PORT);
```

#### How to use in Router

```
const Router = require('express').Router();

// Import MongoDB Model
const User = require('../models/User');

Router.get('/user/:id', async (req, res) => {
    try {

    let user = await User.findById(req,params.id);

    // This method response with filter
    res.everDot(user)

    } catch(e) {
        res.send(e).status(500)
    }
}

module.exports = Router;
```

## Tree Mode

In order to quickly view the structure of the requested given you can simply activate **Tree Mode**. No matter what type of data you give **Everdot** itself will understand that you gave it (object | array)

###### Example

`https://everdot.io/user/all/?tree=true`

## Queries

Section about url queries-settings

### Fields

This query is made to determine which object or object keys you will need for further project development. All the necessary keys should be separated by commas and without spaces.

###### Example

`https://everdot.io/api/user/1/?fields=id,name,surname,address`

### Size

The size query will work if you specify an array with data in the data value.

**Default :** 20

###### Example
`https://everdot.io/api/user/all/?size=30`


### Page

###### Example
`https://everdot.io/api/user/all/?page=2`

### Expand
The parameter is made to extend the data of your object.

###### Example
`https://everdot.io/api/user/1/?expand=address`
