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
});