define([
  'text!template/form.html'
], function (view_template) {
  return Backbone.View.extend({

    template: _.template(view_template),

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
        this.trigger('done');
      }, this);

      this.model.save({
        first_name: $("input[name=first_name]", this.el).val(),
        last_name: $("input[name=last_name]", this.el).val(),
      });
    }
  });
});