const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const isAuthenticated = (req, res, next) => {
  const { token } = req.headers;
  const decoded = jwt.verify(token, 'coder-academy'); // jwt secret
  console.log(decoded);
  next();
}

router.use(isAuthenticated);

router.post('/', (req, res) => {
  return res.send('authenticated');
});

router.post('/resources', (req, res) => {
  return res.send('authenticated');
});

router.get('/resources', (req, res) => {
  return res.send('You have accessed the protected resources');
});

router.get('/resources/:resourceId', (req, res) => {
  return res.send('You have accessed a particular protected resource');
});

module.exports = router;