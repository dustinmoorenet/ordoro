var Utils = {
  /**
   * Convert form values into an object
   *
   * @param {jQuery Form Element} $el A form element wrapped in a jquery object
   *
   * @returns {object} Returns all the name and values from the form as an
   *                   object
   */
  formToObject: function($el) {
    var obj = {},
        name_value_array = $el.serializeArray();

    name_value_array.forEach(function(name_value) {
      Utils.mapNameValueToObject(name_value, obj);
    });

    return obj;
  },

  /**
   * Maps a name/value pair to a point in an object
   *
   * @param {object} name_value An object of the name/value pair
   *   @attr {string} name The name of the form element
   *   @attr {string} value The value of the form element
   * @param {object} obj The object to update with name and value
   */
  mapNameValueToObject: function(name_value, obj) {
    var name = name_value.name,
        value = name_value.value,
        levels = name.split('.'),
        point = obj;

    // We have to establish array and objects before using them if we are
    // applying to an array
    if (value == '[]')
      value = [];
    else if (value == '{}')
      value = {};

    // cycle through each object level
    while (levels.length > 0) {
      var key = levels.shift();

      var arrays = key.split('[]');

      key = arrays.shift();

      // cycle through each array level at this object level
      for (var n = 0; n < arrays.length; n++) {
        // first 'index' is our key every time else it is the last element on
        // the array
        var index = n == 0 ? key : point.length - 1;

        // establish the array if not there
        // and move the point to this array
        if (!Array.isArray(point[index]))
          point = point[index] = [];
        else
          point = point[index];
      }

      if (arrays.length) {
        // push value if last level
        if (levels.length == 0)
          point.push(value);

        // point to last element in array
        point = point[point.length - 1];

      } else {
        // 
        if (levels.length == 0) {
          point[key] = value;
        } else if (!point[key]) {
          point = point[key] = {};
        } else {
          point = point[key];
        }
      }
    }
  }
}
