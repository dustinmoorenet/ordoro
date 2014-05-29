/**
 * A model of an order
 */
Models.Order = Backbone.Model.extend({
  defaults: function() {
    return {
      timestamp: (new Date()).toISOString(),
      total_price: 0
    }
  },

  /**
   * Initialize the model
   */
  initialize: function() {
    this.listenTo(this, 'change:items', this.itemsChanged);

    this.itemsChanged();
  },

  /**
   * The items array is different (different reference)
   */
  itemsChanged: function() {
    var items = this.get('items'),
        total_price = 0;

    items.forEach(function(item) {
      total_price += parseFloat(item.price);
    });

    this.set('total_price', total_price);
  }
});
