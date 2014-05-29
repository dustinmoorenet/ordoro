/**
 * The main view. Everything gets put in here
 */
Views.Main = Backbone.View.extend({
  className: 'main',

  template: _.template(
    '<div class="wrapper">'
  +   '<div class="content">'
  +     '<h1>Orders Management</h1>'
  +     '<form class="order-form"></form>'
  +     '<div class="order-list"></div>'
  +   '</div>'
  + '</div>'
  ),

  /**
   * Initialize view
   */
  initialize: function() {
    this.render();
  },

  /**
   * Render structure and create sub views
   */
  render: function() {
    this.$el.html(this.template());

    this.collection = new Collections.Orders();

    this.form = new Views.OrderForm({
      el: this.$('.order-form'),
      collection: this.collection
    });

    this.list = new Views.OrderList({
      el: this.$('.order-list'),
      collection: this.collection
    });
  }
});
