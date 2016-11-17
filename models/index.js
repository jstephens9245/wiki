var Sequelize = require('sequelize', { logging : false });
var db = new Sequelize('postgres://localhost:5432/wikistack');

var pageInstance = {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
};

var Page = db.define('page', pageInstance, {
  getterMethods: {
    route: function () {
      return '/wiki/' + this.urlTitle;
    }
  },
  hooks: {
    beforeValidate: function (page) {

      if(page.title) {
        return page.urlTitle = page.title.replace(/\s+/g, '_').replace(/\W/g, '');
      } else {
        return page.urlTitle = Math.random().toString(36).substring(2, 7);
      }
    }
  }
});

var userInstance = {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
};

var User = db.define('user', userInstance, {});

module.exports = {
  Page: Page,
  User: User
}
