![Everdot](./everdot.png)

**Queries manager for your response data**

## Quickstart

To start using Everdot:

1. Install the package in your project. `yarn add everdot` or `npm install everdot`
2. Make the import where you initialize the middleware development.

```
const express = require('express');
const app = express();
const PORT = 3000;
const Everdot = require('everdot');

// Init Everdot to Middleware
app.use(Everdot('YOUR OPTIONS'));

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
    
    // Get some beautifully
    let user = await User.findById(req,params.id);

    // This method response with filter
    res.sendEverdot(user)

    } catch(e) {
        res.send(e).status(500)
    }
}

module.exports = Router;
```

## Options:

### pageSize

**Default :** 20

### debug

**Default :** false

### keyNotValue

**Default :** null

### treeMode

**Default :** false

## Tree Mode

In order to quickly view the structure of the requested given you can simply activate **Tree Mode**. No matter what type of data you give **Everdot** itself will understand that you gave it (object | array)

###### Example

```
// Initial Data
    {
        "id": 1,
        "name": "John",
        "surname": "Smith",
        "address": "Wall Street, New York, NY 10005",
        "email: "johnsmith@mail.com",
        "age": 28
    }

// Activate treeMode = true
https://everdot.io/user/all/?tree=true

// On Response
    {
        "id": "number",
        "name": "string",
        "surname": "string",
        "address": "string",
        "email: "email",
        "age": "number"
    }
```

## Queries

Section about url queries-settings.

**P.S**
All listed queries will be available and decoded in request.

### Fields

This query is made to determine which object or object keys you will need for further project development. All the necessary keys should be separated by commas and without spaces.

###### Example

```
// Url address
https://everdot.io/api/user/1/?fields=id,name,surname,address,email,age

// On Response
    {
        "id": 1,
        "name": "John",
        "surname": "Smith",
        "address": "Wall Street, New York, NY 10005",
        "email: "johnsmith@mail.com",
        "age": 28
    }
```

### Size

The size query will work if you specify an array with data in the data value.

**Default :** 20

###### Example

```
// Url address
https://everdot.io/api/user/all/?size=30

// On Response Array[30]
```

### Page

This value allows you to access the data more easily. That is, all your data will be divided into pages based on the parameters you set. This rule will take effect after you enter **query page** into the address bar.

###### Example

```
// Url address
// Works
https://everdot.io/api/user/all/?page=2

// On Response
 {
    "next": "URL NEXT PAGE WITH DATA",
    "prev": "URL PREV PAGE WITH DATA",
    "countItems: pageSize,
    "dateRequest": "DATE NOW",
    "results": Array[pageSize]
 }
```

### Expands

The parameter is made to extend the data of your object.

###### Example

```
// Url address
https://everdot.io/api/user/1/?expands=address,price

// On Route
Router.get('/event', (req, res) => {
    res.send(req.expands) // On Response ['address', 'price']
})
```
