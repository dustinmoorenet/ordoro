describe('Utils.mapNameValueToObject', function() {
  it('should take a name and value and apply to object', function() {
    var obj = {};

    Utils.mapNameValueToObject(example[2], obj);

    expect(obj.date).to.eql(outcome.date);
  });

  it('should take a nested object name and value and apply to object', function() {
    var obj = {};

    Utils.mapNameValueToObject(example[0], obj);
    Utils.mapNameValueToObject(example[1], obj);

    expect(obj.name).to.eql(outcome.name);
  });

  it('should take an array name and value, create array and apply to object', function() {
    var obj = {};

    Utils.mapNameValueToObject(example[3], obj);
    Utils.mapNameValueToObject(example[4], obj);
    Utils.mapNameValueToObject(example[5], obj);

    expect(obj.friends).to.eql(outcome.friends);
  });

  it('should take an array of objects and apply to object', function() {
    var obj = {};

    Utils.mapNameValueToObject(example[6], obj);
    Utils.mapNameValueToObject(example[7], obj);
    Utils.mapNameValueToObject(example[8], obj);
    Utils.mapNameValueToObject(example[9], obj);
    Utils.mapNameValueToObject(example[10], obj);
    Utils.mapNameValueToObject(example[11], obj);
    Utils.mapNameValueToObject(example[12], obj);
    Utils.mapNameValueToObject(example[13], obj);

    expect(obj.items).to.eql(outcome.items);
  });

  it('should take an array of arrays and apply to object', function() {
    var obj = {};

    Utils.mapNameValueToObject(example[14], obj);
    Utils.mapNameValueToObject(example[15], obj);
    Utils.mapNameValueToObject(example[16], obj);
    Utils.mapNameValueToObject(example[17], obj);
    Utils.mapNameValueToObject(example[18], obj);
    Utils.mapNameValueToObject(example[19], obj);

    expect(obj.points).to.eql(outcome.points);
  });

  it('should be fine with establishing an object first', function() {
    var obj = {};

    Utils.mapNameValueToObject(example[20], obj);
    Utils.mapNameValueToObject(example[21], obj);
    Utils.mapNameValueToObject(example[22], obj);
    Utils.mapNameValueToObject(example[23], obj);
    Utils.mapNameValueToObject(example[24], obj);

    expect(obj.shipto).to.eql(outcome.shipto);
  });

  it('should take an array of name and value pairs and apply to object', function() {
    var obj = {};

    example.forEach(function(name_value) {
      Utils.mapNameValueToObject(name_value, obj);
    });

    expect(obj).to.eql(outcome);
  });
});

var example = [
  {name: 'name.first', value: 'Harry'},
  {name: 'name.last', value: 'Moore'},
  {name: 'date', value: '2006-01-01T12:00:01'},
  {name: 'friends[]', value: 'James'},
  {name: 'friends[]', value: 'Tony'},
  {name: 'friends[]', value: 'Mark'},
  {name: 'items[]', value: '{}'},
  {name: 'items[].name', value: 'Cow'},
  {name: 'items[].quantity', value: 12},
  {name: 'items[].total_price', value: 2038.23},
  {name: 'items[]', value: '{}'},
  {name: 'items[].name', value: 'Pig'},
  {name: 'items[].quantity', value: 2},
  {name: 'items[].total_price', value: 543.23},
  {name: 'points[]', value: '[]'},
  {name: 'points[][]', value: 12},
  {name: 'points[][]', value: 24},
  {name: 'points[]', value: '[]'},
  {name: 'points[][]', value: 2},
  {name: 'points[][]', value: 4},
  {name: 'shipto', value: '{}'},
  {name: 'shipto.address1', value: '123 Fake st'},
  {name: 'shipto.city', value: 'Austin'},
  {name: 'shipto.state', value: 'TX'},
  {name: 'shipto.zip', value: '78729'}
];

var outcome = {
  name: {first: 'Harry', last: 'Moore'},
  date: '2006-01-01T12:00:01',
  friends: ['James', 'Tony', 'Mark'],
  items: [
    {name: 'Cow', quantity: 12, total_price: 2038.23},
    {name: 'Pig', quantity: 2, total_price: 543.23}
  ],
  points: [[12,24],[2,4]],
  shipto: {
    address1: '123 Fake st',
    city: 'Austin',
    state: 'TX',
    zip: '78729'
  }
}
