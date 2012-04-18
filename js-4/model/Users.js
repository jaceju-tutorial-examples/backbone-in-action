define([
  'js/model/User'
], function (User) {
  return Backbone.Collection.extend({
    model: User,
    localStorage: new Backbone.LocalStorage('demo')
  });
});