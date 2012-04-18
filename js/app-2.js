//////////////////////////////////
// App
//////////////////////////////////
var App = Backbone.Router.extend({

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
      first_name: '',
    });
    var formView = new FormView({
      model: user
    });
    $('#container').empty().append(formView.render().el);
  },

  editUser: function (id) {
    console.log(id);
    var user = this.users.get(id);
    var formView = new FormView({
      model: user
    });
    $('#container').empty().append(formView.render().el);
  }
});

//////////////////////////////////
// User
//////////////////////////////////
var User = Backbone.Model.extend({
  defaults: {
    id: null,
    first_name: '',
    last_name: ''
  }
});

//////////////////////////////////
// Users
//////////////////////////////////
var Users = Backbone.Collection.extend({
  model: User
});

//////////////////////////////////
// Row View
//////////////////////////////////
var RowView = Backbone.View.extend({
  tagName: 'tr',

  template: _.template($('#row-view').html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

//////////////////////////////////
// Table View
//////////////////////////////////
var TableView = Backbone.View.extend({

  template: _.template($('#table-view').html()),

  render: function () {
    this.$el.html(this.template());

    $tbody = $('tbody', this.$el);
    this.collection.forEach(function (model) {
      var rowView = new RowView({
        model: model
      });
      $tbody.append(rowView.render().el);
    }, this);

    return this;
  }
});

//////////////////////////////////
// Form View
//////////////////////////////////
var FormView = Backbone.View.extend({

  template: _.template($('#form-view').html()),

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }
});

//////////////////////////////////
// Run
//////////////////////////////////
$(function () {
  new App();
  Backbone.history.start();
});