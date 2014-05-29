Collections.Orders = Backbone.Collection.extend({
  url: '/order',

  model: Models.Order,

  parse: function(raw_orders) {
    return raw_orders.data;
  },

  initialize: function() {
    this.listenTo(this, 'add', this.onAdd);

    this.total_price = 0;
  },

  onAdd: function(model) {
    this.total_price += parseFloat(model.get('total_price'));
  }
});
