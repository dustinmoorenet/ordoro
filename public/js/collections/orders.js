/**
 * A collection of orders
 */
Collections.Orders = Backbone.Collection.extend({
  url: '/order',

  model: Models.Order,

  /**
   * Transform the raw orders structure
   *
   * @param {object} raw_orders The structure from the server
   *
   * @return {array} Returns just the rows of data
   */
  parse: function(raw_orders) {
    return raw_orders.data;
  },

  /**
   * Initialize the collection
   */
  initialize: function() {
    this.setSort('customer.name');

    this.listenTo(this, 'add', this.onAdd);

    this.total_price = 0;
  },

  /**
   * An order was add to the collection
   *
   * @param {Models.Order} order The order
   */
  onAdd: function(order) {
    this.total_price += parseFloat(order.get('total_price'));
  },

  /**
   * Set the sort function for the collection
   *
   * @param {string} sort A valid sort string
   */
  setSort: function(sort) {
    this.comparator = this[sort + ' Sort'];

    this.sort();
  },

  /**
   * Sort the collection by customer name
   *
   * @param {Models.Order} order A single order
   *
   * @return {string} Returns the customer name
   */
  'customer.name Sort': function(order) {
    return order.get('customer').name;
  },

  /**
   * Sort the collection by total price (ascending)
   *
   * @param {Models.Order} order_a A single order
   * @param {Models.Order} order_b A single order
   *
   * @return {float} Returns a postive number if a is greater than b
   *                 and a negative number if b is greater than a
   *                 and zero if they are equal
   */
  'total_price asc Sort': function(order_a, order_b) {
    return order_a.get('total_price') - order_b.get('total_price');
  },

  /**
   * Sort the collection by total price (descending)
   *
   * @param {Models.Order} order_a A single order
   * @param {Models.Order} order_b A single order
   *
   * @return {float} Returns a postive number if b is greater than a
   *                 and a negative number if a is greater than b
   *                 and zero if they are equal
   */
  'total_price desc Sort': function(order_a, order_b) {
    return order_b.get('total_price') - order_a.get('total_price');
  }
});
