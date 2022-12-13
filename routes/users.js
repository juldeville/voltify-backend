var express = require('express');
var router = express.Router();

require('../models/connection');
const User = require('../models/user');
const { checkBody } = require('../modules/checkBody');
const uid2 = require('uid2');
const bcrypt = require('bcrypt');

// Sign up new user
router.post('/signup', (req, res) => {
  if (!checkBody(req.body, ['firstName', 'lastName', 'email', 'password',])) {
    res.json({result: false, error: 'Missing or empty fields'})
    return
  } 


  // Check if the user has not already been registered
  User.findOne({ email: req.body.email }).then(data => {
    
    if (data === null) {
      const hash = bcrypt.hashSync(req.body.password, 10);

      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        photo: req.body.photo,
        iban: req.body.iban,
        address: {
          number: req.body.number,
          street: req.body.street,
          zipcode: req.body.zipcode,
          city: req.body.city
        },
        token: uid2(32),
      });

      newUser.save().then(newDoc => {
        res.json({ result: true, token: newDoc.token });
      });
    } else {
      // User already exists in database
      res.json({ result: false, error: 'User already exists' });
    }
  });
});

// Sign in user

router.post('/signin', (req, res) => {
  if (!checkBody(req.body, ['email', 'password',])) {
    res.json({ result: false, error: 'Missing or empty fields' });
    return;
  }

  User.findOne({ email: req.body.email }).then(data => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, token: data.token });
    } else {
      res.json({ result: false, error: 'User not found or wrong password' });
    }
  });
});

// Get user profile info

router.get('/viewUser/:token', (req, res) => {
  User.findOne({ token: req.params.token }).then(data => {
    console.log(data)
    if (data) {
      res.json({ result: true, profile: data});
    } else {
      res.json({ result: false, error: 'User not found' });
    }
  });
});

// Delete user profile
router.delete('/deleteUser', (req, res) => {
  User.deleteOne({token: req.body.token}).then(data => {
    console.log(data)
      if (data.deletedCount > 0) {
          res.json({result: true})
      } else {
          res.json({result: false, error: 'User not found'})
      }
  })
})

module.exports = router;
