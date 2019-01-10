const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost:27017/auth-example');
mongoose.connection.on('connected', () => {
  console.log('connected to mongod');
});

mongoose.connection.on('error', () => {
  console.log('failed to connect to mongod');
});

const app = new express();
const port = 8000;

app.use(cors());

app.use(express.json());

app.use(require('./controllers'));

app.listen(port, () => console.log(`CORS-enabled web server listening on http://localhost:${port}`));

// TODO: Implement a protected POST route
// TODO: Implement middleware to authenticate
// TODO: Implement a protected GET route
// TODO: Refactor project
// TODO: Implement roles middleware
// TODO: Implement JWT
// TODO: Implement front-end