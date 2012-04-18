define([
  'js/view/RowView',
  'text!template/table.html',
], function (RowView, view_template) {
  return Backbone.View.extend({

    template: _.template(view_template),

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
});