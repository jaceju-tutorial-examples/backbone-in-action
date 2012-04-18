define([
  'js/view/RowView'
], function (RowView) {
  return Backbone.View.extend({

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
});