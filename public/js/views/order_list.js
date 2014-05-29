Views.OrderList = Backbone.View.extend({
  className: 'order-list',

  template: _.template(
    '<header>'
  +   '<div class="left">Order Count: '
  +     '<span class="order-count"></span></div>'
  +   '<div class="right">Total order value: $'
  +     '<span class="total-price"></span></div>'
  + '</header>'
  + '<div class="orders-items"></div>'
  ),

  initialize: function() {
    this.render();

    this.collection.fetch()
    .then(this.renderOrders.bind(this));
  },

  render: function() {
    this.$el.html(this.template());

    this.$items = this.$('.orders-items');
    this.$order_count = this.$('.order-count');
    this.$total_price = this.$('.total-price');
  },

  renderOrders: function() {
    this.collection.forEach(this.renderOrder.bind(this));

    // From here on out we will listen to individual adds
    this.listenTo(this.collection, 'add', this.renderOrder);
  },

  renderOrder: function(order) {
    var view = new Views.OrderList.Order({model: order});

    this.$items.append(view.$el);

    var price = Math.round(this.collection.total_price * 100) / 100;

    this.$total_price.text(price.toFixed(2));

    this.$order_count.text(this.collection.length);
  }
});
