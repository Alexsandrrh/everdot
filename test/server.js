const express = require('express');
const app = express();
const PORT = 3000;
const Everdot = require('../index');

// Init Everdot to Middleware
app.use(Everdot);

app.get('/app', (req, res) => {
  res.everDot({ id: 1, name: 'Alex' });
});

// Start Server
app.listen(PORT);
