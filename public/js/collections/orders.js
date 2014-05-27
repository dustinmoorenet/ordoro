Collections.Orders = Backbone.Collection.extend({
  url: '/order',

  parse: function(raw_orders) {
    return raw_orders.data;
  }
});
