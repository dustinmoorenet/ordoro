Views.OrderList = Backbone.View.extend({
  className: 'order-list',

  template: _.template(
    '<div class="orders-items"></div>'
  + '<div class="total-price"></div>'
  ),

  initialize: function() {
    this.render();

    this.collection.fetch()
    .then(this.renderOrders.bind(this));
  },

  render: function() {
    this.$el.html(this.template());

    this.$items = this.$('.orders-items');
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

    this.$total_price.text(price);
  }
});
