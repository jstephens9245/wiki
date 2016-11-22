const express = require('express');
const app = express();
const morgan = require('morgan');
const wiki = require('./router/wiki');
const users = require('./router/users')
const fs = require('fs');
const nunjucks = require('nunjucks');
const models = require('./models/index.js')
const bodyParser = require('body-parser');

app.engine('html', nunjucks.render);
app.set('view engine', 'html');
var env = nunjucks.configure('views', {noCache: true});

// var db = new Sequelize('postgres://localhost:5432/wikistack', {
//     logging: false
// });

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use('/', wiki);
app.use('/', users);

app.get('/', function (req, res) {
  res.redirect( '/wiki' );
});

// app.use('/', function(err, req, res, next) {
//   res.send('ITS NOT WORKING !!!!!!!', err);
// })

models.User.sync().then(function () {
  return models.Page.sync();
}).then(function () {
  app.listen(3000, function () {
    console.log('Servers up, were good to go!');
  });
})
