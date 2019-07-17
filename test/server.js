const express = require('express');
const app = express();
const PORT = 3000;
const Everdot = require('../index');
const data = require('./data');

// Init Everdot to Middleware
app.use(
  Everdot({
    pageSize: 'all',
    pageModeAuto: true,
    debug: true,
    keyNotValue: null
  })
);

app.get('/app', (req, res) => {
  res.sendByEverdot(data);
});

// Start Server
app.listen(PORT);
