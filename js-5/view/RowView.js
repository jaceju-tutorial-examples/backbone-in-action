define([
  'text!template/row.html'
], function (view_template) {
  return Backbone.View.extend({
    tagName: 'tr',

    template: _.template(view_template),

    render: function () {
      this.$el.html(this.template(this.model.toJSON()));
      return this;
    }
  });
});