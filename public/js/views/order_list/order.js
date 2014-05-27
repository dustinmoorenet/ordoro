Views.OrderList.Order = Backbone.View.extend({
  className: 'order',

  template: _.template(
    '<span><%= timestamp %></span>'
  + '<ul class="items"></ul>'
  ),

  itemTemplate: _.template(
    '<li><%= name %></li>'
  ),

  initialize: function() {
    this.render();
  },

  render: function() {
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

