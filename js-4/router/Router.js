define([
  'js/model/User',
  'js/model/Users',
  'js/view/TableView',
  'js/view/FormView',
], function (User, Users, TableView, FormView) {
  return Backbone.Router.extend({

    sampleData: [
      {id: 1, first_name: 'Bob', last_name: 'Wu'},
      {id: 2, first_name: 'John', last_name: 'Wang'},
      {id: 3, first_name: 'Mary', last_name: 'Lin'},
      {id: 4, first_name: 'Jimmy', last_name: 'Chen'},
    ],

    users: null,

    initialize: function () {
      this.users = new Users(this.sampleData);
    },

    routes: {
      '': 'list',
      'new': 'newUser',
      'edit/:id': 'editUser'
    },

    list: function () {
      console.log('list');
      var tableView = new TableView({
        collection: this.users
      });
      $('#container').empty().append(tableView.render().el);
    },

    newUser: function () {
      console.log('add');
      var user = new User({
        first_name: '',
        last_name: '',
      });
      var formView = new FormView({
        model: user,
        collection: this.users
      });
      formView.on('done', function () {
        this.navigate('', { trigger: true });
      }, this);
      $('#container').empty().append(formView.render().el);
    },

    editUser: function (id) {
      console.log(id);
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