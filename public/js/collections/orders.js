Collections.Orders = Backbone.Collection.extend({
  url: '/order',

  model: Models.Order,

  parse: function(raw_orders) {
    return raw_orders.data;
  },

  initialize: function() {
    this.setSort('customer.name');

    this.listenTo(this, 'add', this.onAdd);

    this.total_price = 0;
  },

  onAdd: function(model) {
    this.total_price += parseFloat(model.get('total_price'));
  },

  setSort: function(sort) {
    this.comparator = this[sort + ' Sort'];

    this.sort();
  },

  'customer.name Sort': function(model) {
    return model.get('customer').name;
  },

  'total_price asc Sort': function(model_a, model_b) {
    return model_a.get('total_price') - model_b.get('total_price');
  },

  'total_price desc Sort': function(model_a, model_b) {
    return model_b.get('total_price') - model_a.get('total_price');
  }
});
