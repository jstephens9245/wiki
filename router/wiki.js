const express = require('express');
const router = express.Router();
const {Page, User} = require('../models')


router.get('/', function (req, res) {
  res.redirect( '/wiki' );
});

router.post('/wiki', function(req,res, next) {


  Page.build(req.body).save()

    .then((instance) => {

      res.redirect(instance.route);
    }).catch((next));
})

router.get('/wiki/add', function(req, res) {
  res.render('addpage');
})

router.get('/wiki/:urlTitle', function(req, res) {
  let urlTitle = req.params.urlTitle;

  res.render('wikipage');
})

module.exports = router;
