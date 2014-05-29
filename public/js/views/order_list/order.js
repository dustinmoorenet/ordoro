/**
 * A single order on the list
 */
Views.OrderList.Order = Backbone.View.extend({
  className: 'order',

  template: _.template(
    '<header><%= customer.name %></header>'
  + '<div class="summary">'
  +   '<ul class="items">'
  +   '<h2>Ordered Items</h2>'
  +   '</ul>'
  +   '<div class="total-price">Grand Total: $<%= parseFloat(total_price || 0).toFixed(2) %></div>'
  + '</div>'
  + '<div class="shipto">'
  +   '<h2>Ship To Address</h2>'
  +   '<div><%= shipto.address1 %></div>'
  +   '<div><%= shipto.address2 %></div>'
  +   '<div><%= shipto.city %>, <%= shipto.state %> <%= shipto.zip %></div>'
  + '</div>'
  ),

  itemTemplate: _.template(
    '<li>'
  +   '<span class="quantity"><%= quantity %> x</span>'
  +   '<span class="name"><%= name %></span>'
  +   '<span class="price">= $<%= parseFloat(price || 0).toFixed(2) %></span>'
  + '</li>'
  ),

  /**
   * Initialize the view
   */
  initialize: function() {
    this.render();
  },

  /**
   * Render the order and all its items
   */
  render: function() {
    this.$el.html(this.template(this.model.toJSON()));

    this.$items = this.$('.items');

    this.renderItems();
  },

  /**
   * Render the items
   */
  renderItems: function() {
    this.model.get('items').forEach(this.renderItem.bind(this));
  },

  /**
   * Render a single item
   *
   * @param {object} item An item that was ordered
   */
  renderItem: function(item) {
    this.$items.append(this.itemTemplate(item));
  }
});

