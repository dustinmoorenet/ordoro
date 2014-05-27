Views.Main = Backbone.View.extend({
  className: 'main',

  template: _.template(
    '<h1>Orders</h1>'
  + '<form class="order-form"></form>'
  + '<div class="order-list"></div>'
  ),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template());

    this.collection = new Collections.Orders();

    this.form = new Views.OrderForm({
      el: this.$('.order-form'),
      collection: this.collection
    });

    this.list = new Views.OrderList({
      el: this.$('.order-list'),
      collection: this.collection
    });
  }
});
