Views.OrderForm = Backbone.View.extend({
  tagName: 'form',

  className: 'order-form',

  events: {
    'click header': 'toggleDisplay',
    'click .add': 'add',
    'click .new-item': 'newItem'
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
  +     '<input name="shipto.zip" required placeholder="Zipcode" />'
  +   '</div>'
  +   '<h3>Items Ordered</h3>'
  +   '<div class="items"></div>'
  +   '<button class="new-item">New Item</button>'
  +   '<button class="add">Add Order</button>'
  + '</div>'
  ),

  itemTemplate: _.template(
    '<div>'
  +   '<input type="hidden" name="items[]" value="{}" />'
  +   '<input name="items[].name" required placeholder="Description" />'
  +   '<input name="items[].quantity" required placeholder="Quantity" />'
  +   '<input name="items[].price" required placeholder="Total Price" />'
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

    if (evt)
      evt.preventDefault();

    return false;
  },

  add: function(evt) {
    var is_valid = this.$el.validate({submitHandler: function() {}}).valid();

    if (is_valid)
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
