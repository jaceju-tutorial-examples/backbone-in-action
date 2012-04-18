//////////////////////////////////
// App
//////////////////////////////////
var App = Backbone.Router.extend({

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

//////////////////////////////////
// User
//////////////////////////////////
var User = Backbone.Model.extend({
  defaults: {
    id: null,
    first_name: '',
    last_name: ''
  },

  localStorage: new Backbone.LocalStorage('demo'),

  validate: function(attrs) {
    if (attrs.first_name === '') {
      return "'first_name' cannot be empty";
    }
    if (attrs.last_name === '') {
      return "'last_name' cannot be empty";
    }
  }
});

//////////////////////////////////
// Users
//////////////////////////////////
var Users = Backbone.Collection.extend({
  model: User,
  localStorage: new Backbone.LocalStorage('demo')
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
  },

  events: {
    'click button[type=submit]': 'saveUser'
  },

  saveUser: function (e) {
    e.preventDefault();

    this.model.off('error');
    this.model.on('error', function (model, error) {
      alert(error);
    });
    this.model.on('sync', function () {
      console.log('sync');
      this.trigger('done');
    }, this);

    this.model.save({
      first_name: $("input[name=first_name]", this.el).val(),
      last_name: $("input[name=last_name]", this.el).val(),
    });
  }
});

//////////////////////////////////
// Run
//////////////////////////////////
$(function () {
  new App();
  Backbone.history.start();
});