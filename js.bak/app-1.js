// //////////////////////////////////
// // App
// //////////////////////////////////
// var App = Backbone.Router.extend({

//   initialize: function () {
//   },

//   routes: {
//     '': 'list',
//     'new': 'newUser',
//     'edit/:id': 'editUser'
//   },

//   list: function () {
//     console.log('list');
//     var tableView = new TableView({});
//     $('#container').empty().append(tableView.render().el);
//   },

//   newUser: function () {
//     console.log('add');
//     var formView = new FormView({});
//     $('#container').empty().append(formView.render().el);
//   },

//   editUser: function (id) {
//     console.log(id);
//     var formView = new FormView({});
//     $('#container').empty().append(formView.render().el);
//   }
// });

// //////////////////////////////////
// // Row View
// //////////////////////////////////
// var RowView = Backbone.View.extend({
//   tagName: 'tr',

//   template: _.template($('#row-view').html()),

//   render: function () {
//     this.$el.html(this.template());
//     return this;
//   }
// });

// //////////////////////////////////
// // Table View
// //////////////////////////////////
// var TableView = Backbone.View.extend({

//   template: _.template($('#table-view').html()),

//   render: function () {
//     this.$el.html(this.template());

//     $tbody = $('tbody', this.$el);
//     var rowView = new RowView({});
//     $tbody.append(rowView.render().el);

//     return this;
//   }
// });

// //////////////////////////////////
// // Form View
// //////////////////////////////////
// var FormView = Backbone.View.extend({

//   template: _.template($('#form-view').html()),

//   render: function () {
//     this.$el.html(this.template());
//     return this;
//   }
// });

// //////////////////////////////////
// // Run
// //////////////////////////////////
// $(function () {
//   new App();
//   Backbone.history.start();
// });