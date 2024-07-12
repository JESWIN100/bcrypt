const express = require('express');
const app = express();
require('dotenv').config();
require('./db');
const routes = require('./router');
const port = process.env.PORT || 3690;

app.use(express.json());
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
