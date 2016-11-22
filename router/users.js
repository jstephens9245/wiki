const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const {Page, User} = require('../models')

router.get('/users', function(req, res) {
  User.findAll({}).then(function(users) {
    res.render('users', {
      users: users
    })
  })
})

router.get('/users/:userId', function(req, res) {

  let idPage = Page.findAll({
    where: {
      authorId: req.params.userId
    }
  });

  let users = User.findById(req.params.userId)

  Promise.all([idPage, users]).spread(function(pages, user) {
    user.pages = pages;
    res.render('userpage', {
      user: user
    })
  })
})

module.exports = router;
