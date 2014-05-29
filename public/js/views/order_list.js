Views.OrderList = Backbone.View.extend({
  className: 'order-list',

  events: {
    'change .sort select': 'sortChanged'
  },

  template: _.template(
    '<header>Order List</header>'
  + '<div class="summary">'
  +   '<div class="left">Order Count: '
  +     '<span class="order-count"></span></div>'
  +   '<div class="right">Total order value: $'
  +     '<span class="total-price"></span></div>'
  + '</div>'
  + '<div class="orders-items"></div>'
  + '<div class="sort">'
  +   '<span>Sort: </span>'
  +   '<select>'
  +     '<option value="customer.name">Customer Name</option>'
  +     '<option value="total_price asc">Lower Price First</option>'
  +     '<option value="total_price desc">Higher Price First</option>'
  +   '</select>'
  + '</div>'
  ),

  initialize: function() {
    this.render();

    this.collection.fetch()
    .then(this.renderOrders.bind(this));

    this.listenTo(this.collection, 'sort', this.renderOrders);
  },

  render: function() {
    this.$el.html(this.template());

    this.$items = this.$('.orders-items');
    this.$order_count = this.$('.order-count');
    this.$total_price = this.$('.total-price');
  },

  renderOrders: function() {
    this.$items.empty();

    this.collection.forEach(this.renderOrder.bind(this));

    var price = Math.round(this.collection.total_price * 100) / 100;

    this.$total_price.text(price.toFixed(2));

    this.$order_count.text(this.collection.length);
  },

  renderOrder: function(order) {
    var view = new Views.OrderList.Order({model: order});

    this.$items.append(view.$el);
  },

  sortChanged: function() {
    var sort_val = this.$('.sort select').val();

    this.collection.setSort(sort_val);
  }
});
