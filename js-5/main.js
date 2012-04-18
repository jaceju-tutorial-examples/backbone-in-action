require({
  baseUrl: './',
  paths: {
    js: 'js-5',
    order: 'lib/requirejs/order',
    text: 'lib/requirejs/text'
  },
});

require([
  'order!lib/jquery/jquery-min',
  'order!lib/underscore/underscore-min',
  'order!lib/backbone/backbone-min',
  'order!lib/backbone/backbone.localStorage-min',
  'order!js/app',
], function () {
  App = _.last(arguments);
  App.initialize();
});