Models.Order = Backbone.Model.extend({
  defaults: function() {
    return {
      timestamp: (new Date()).toISOString()
    }
  }
});
