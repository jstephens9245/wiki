const express = require('express');
const router = express.Router();
const Promise = require('bluebird');
const {Page, User} = require('../models')


router.get('/wiki', function(req, res) {
  Page.findAll({})
    .then(function(pages) {
      res.render('index', {
        pages: pages
      });
    })
})

router.post('/wiki', function(req,res, next) {
  User.findOrCreate({
    where: {
      name: req.body.authorName,
      email: req.body.authorEmail
    }
  }).spread(function(user, bool) {
    return Page.create({
      title: req.body.title,
      content: req.body.content,
      status: req.body.status
    }).then(function(createdPage) {
      return createdPage.setAuthor(user);
    });

  }).then(function(createdPage) {
    res.redirect(createdPage.route);
  })

})

router.get('/wiki/add', function(req, res) {
  res.render('addpage');
})

router.get('/wiki/:urlTitle', function(req, res, next) {
  let pageUrlTitle = req.params.urlTitle;

  Page.findOne({
    where: {
      urlTitle: pageUrlTitle
    }
  }).then(function (page) {
    return page.getAuthor()
        .then(function (author) {
            page.author = author;

            res.render('wikipage', {
                page: page
            });

        });
  }).catch(next)

})

module.exports = router;
