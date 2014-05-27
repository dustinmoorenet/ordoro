var express = require('express'),
    bodyParser = require('body-parser'),
    serveStatic = require('serve-static'),
    data = require('./data.json'),
    app = express();

app.use(serveStatic(__dirname + '/public'));

app.use(bodyParser.json());

app.get('/order', function(req, res) {
  res.json({
    start: 0,
    end: 10,
    total: data.length,
    data: data
  });
});

app.post('/order', function(req, res) {
  data.push(req.body);
})

app.listen(3000);
