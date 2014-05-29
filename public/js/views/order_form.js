Views.OrderForm = Backbone.View.extend({
  tagName: 'form',

  className: 'order-form',

  events: {
    'click header': 'toggleDisplay',
    'click .new-item': 'newItem',
    'submit': 'add'
  },

  template: _.template(
    '<header>Add Order</header>'
  + '<div class="panel">'
  +   '<div><input name="customer.name" required placeholder="Customer Name" /></div>'
  +   '<h3>Ship To Address</h3>'
  +   '<div><input name="shipto.address1" required placeholder="Address 1" /></div>'
  +   '<div><input name="shipto.address2" placeholder="Address 2" /></div>'
  +   '<div>'
  +     '<input name="shipto.city" required placeholder="City" />'
  +     '<select name="shipto.state">'
  +       '<option value="AL">AL</option>'
  +       '<option value="CO">CO</option>'
  +       '<option value="TN">TN</option>'
  +       '<option value="TX">TX</option>'
  +       '<option value="WI">WI</option>'
  +       '<option value="WY">WY</option>'
  +       '<!-- I know there are more states than this -->'
  +     '</select>'
  +     '<input name="shipto.zip" required pattern="\\d{5}(-\\d{4})?" placeholder="Zipcode" title="Enter a valid zipcode" />'
  +   '</div>'
  +   '<h3>Items Ordered</h3>'
  +   '<div class="items"></div>'
  +   '<button type="button" class="new-item">New Item</button>'
  +   '<button type="submit" class="add">Add Order</button>'
  + '</div>'
  ),

  itemTemplate: _.template(
    '<div>'
  +   '<input type="hidden" name="items[]" value="{}" />'
  +   '<input name="items[].name" required placeholder="Description" />'
  +   '<input name="items[].quantity" required pattern="\\d+" placeholder="Quantity" title="Enter a whole number" />'
  +   '<input name="items[].price" required pattern="\\d+(\\.\\d{1,2})?" placeholder="Total Price" title="Enter a dollar amount (without the dollar sign)" />'
  + '</div>'
  ),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template());

    this.newItem();
  },

  toggleDisplay: function() {
    this.$el.toggleClass('show');
  },

  newItem: function(evt) {
    this.$('.items').append(this.itemTemplate());
  },

  add: function(evt) {
    this.submit();

    evt.preventDefault();

    return false;
  },

  submit: function() {
    var order = new Models.Order(Utils.formToObject(this.$el));

    this.collection.add(order);

    order.save();
  }
});
