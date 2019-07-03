![Everdot](./everdot.svg)

## Quickstart
To start using Evernote: 
1. Install the package in your project. `yarn add everdot` or `npm install everdot`
2. Make the import where you initialize the middleware development.

`
const express = require('express');
const app = express();
const Everdot = require('everdot');
// Init Everdot to Middleware
app.use(Everdot())
`
## Queries
Section about url queries-settings

#### Fields
This query is made to determine which object or object keys you will need for further project development. All the necessary keys should be separated by commas and without spaces.
###### Example
`http://everdot.io/api/user/1/?fields=id,name,surname,address`
#### Size
###### Example
`http://everdot.io/api/user/all/?size=30`

#### Expand
###### Example
`http://everdot.io/api/user/1/?expand=address`

