Views.OrderList.Order = Backbone.View.extend({
  className: 'order',

  template: _.template(
    '<div class="title"><%= customer.name %></div>'
  + '<ul class="items">'
  + '<h2>Ordered Items</h2>'
  + '</ul>'
  + '<div class="shipto">'
  +   '<h2>Ship To Address</h2>'
  +   '<div><%= shipto.address1 %></div>'
  +   '<div><%= shipto.address2 %></div>'
  +   '<div><%= shipto.city %>, <%= shipto.state %> <%= shipto.zip %></div>'
  + '</div>'
  + '<div class="total-price"><%= total_price %></div>'
  ),

  itemTemplate: _.template(
    '<li><%= name %> - <%= price %></li>'
  ),

  initialize: function() {
    this.render();
  },

  render: function() {
console.log('order.render');
    this.$el.html(this.template(this.model.toJSON()));

    this.$items = this.$('.items');

    this.renderItems(this.model.get('items'));
  },

  renderItems: function(items) {
    items.forEach(this.renderItem.bind(this));
  },

  renderItem: function(item) {
    this.$items.append(this.itemTemplate(item));
  }
});

