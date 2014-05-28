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
console.log('collection.total_price', model.get('total_price'));
    this.total_price += parseFloat(model.get('total_price'));
  }
});
