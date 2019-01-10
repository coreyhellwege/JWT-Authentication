const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');

const generateToken = (user) => {
  const token = jwt.sign(
    { username: user.username },
    'coder-academy', // jwt secret
    { expiresIn: '1h' }
  );
  return token;
}

router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username) {
    User.findOne({ username })
      .then(doc => {
        if (!doc) {
          return res.status(403).send('Bad credentials');
        }
        console.log(doc)
        // Load hash from your password DB.
        bcrypt.compare(password, doc.password, function(err, resp) {
          // res == true
          console.log(resp)
          if ( !resp ) {
            res.status(403).send('Bad credentials')
          }
          const token = generateToken(doc);
          return res.send({ token });
        });
      });
  } else {
    return res.status(403).send('Bad credentials');
  }
});

const saltRounds = 10;
// const myPlaintextPassword = 's0/\/\P4$$w0rD';
// const someOtherPlaintextPassword = 'not_bacon';

router.post('/register', (req, res) => {
  console.log(req.body)
  const { username, password } = req.body
  if (username && password) {
    User.findOne({ username })
      .then(doc => {
        if (doc) {
          // console.log("DOC FOUND")
          res.status(409).send('Username already taken')
        }
        else {
          bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                // Store hash in your password DB.
                console.log(hash)
                User.create({ username: username, password: hash })
                .then(doc => {

                  // console.log("USER CREATED")
                  const token = generateToken(doc)
                  return res.send({ token })
                })
                .catch(err => {
                  res.send("creating user failed")
                })
            });
          });

        }
      })
      .catch(err => {
        res.send("Error")
      })
  } 
})

module.exports = router;
