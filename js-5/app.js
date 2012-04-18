define([
  'js/router/Router'
], function (Router) {
  return {
    initialize: function () {
      var router = new Router;
      Backbone.history.start();
    }
  }
});
