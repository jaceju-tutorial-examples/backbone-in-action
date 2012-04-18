define([
  'js/model/User',
  'js/model/Users',
  'js/view/TableView',
  'js/view/FormView',
], function (User, Users, TableView, FormView) {
  return Backbone.Router.extend({

    users: null,

    initialize: function () {
      this.users = new Users();
      this.users.fetch();
    },

    routes: {
      '': 'list',
      'new': 'newUser',
      'edit/:id': 'editUser'
    },

    list: function () {
      var tableView = new TableView({
        collection: this.users
      });
      $('#container').empty().append(tableView.render().el);
    },

    newUser: function () {
      var user = new User({
        first_name: '',
        last_name: '',
      });
      var formView = new FormView({
        model: user,
        collection: this.users
      });
      formView.on('done', function () {
        this.users.add(user);
        this.navigate('', { trigger: true });
      }, this);
      $('#container').empty().append(formView.render().el);
    },

    editUser: function (id) {
      var user = this.users.get(id);
      var formView = new FormView({
        model: user,
        collection: this.users
      });
      formView.on('done', function () {
        this.navigate('', { trigger: true });
      }, this);
      $('#container').empty().append(formView.render().el);
    }
  });
});