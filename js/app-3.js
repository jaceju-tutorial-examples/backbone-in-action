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

//////////////////////////////////
// User
//////////////////////////////////
var User = Backbone.Model.extend({
  defaults: {
    id: null,
    first_name: '',
    last_name: ''
  },

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
  },

  events: {
    'click button[type=submit]': 'saveUser'
  },

  saveUser: function (e) {
    e.preventDefault();

    var model = this.model;
    model.off('error');
    model.on('error', function (model, error) {
      alert(error);
    });

    // 將表單欄位值對應到 model 上。
    model.set({
      first_name: $("input[name=first_name]", this.el).val(),
      last_name: $("input[name=last_name]", this.el).val(),
    });

    // 通過驗證時，就將 model 新增或更新至列表裡面。
    if (model.isValid()) {

      // 如果是新增的話，就取得列表裡最大的 `id` 值並加一，當做新的 `id` 值。
      if (!model.id) {
        var users = this.collection;
        var newId = _.max(users.pluck('id')) + 1;
        model.set('id', newId);
        users.add(model);
      }

      // 完成編輯動作。
      this.trigger('done');
    }
  }
});

//////////////////////////////////
// Run
//////////////////////////////////
$(function () {
  new App();
  Backbone.history.start();
});