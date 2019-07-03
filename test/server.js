const express = require('express');
const app = express();
const PORT = 3000;
const Everdot = require('../index');
const axios = require('axios');

// Init Everdot to Middleware
app.use(Everdot);

app.get('/app', (req, res) => {
  axios
    .get(
      'https://kudago.com/public-api/v1.2/events/?fields=id,title,slug,dates,description,body_text,place,price'
    )
    .then(response => {
      res.everDot(response.data.results);
    })
    .catch(err => {
      res.status(500);
    });
});

// Start Server
app.listen(PORT);
