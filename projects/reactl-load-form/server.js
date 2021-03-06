/**
 * This file is based on Facebook's version of server.js, included in the
 * download for this tutorial: https://facebook.github.io/react/docs/tutorial.html
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var DONATIONS_FILE = path.join(__dirname, 'donations.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/donations', function(req, res) {
  fs.readFile(DONATIONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/donations', function(req, res) {
  fs.readFile(DONATIONS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var donations = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newDonation = {
      id: Date.now(),
      contributor: req.body.contributor,
      amount: req.body.amount,
      comment: req.body.comment
    };
    donations.push(newDonation);
    fs.writeFile(DONATIONS_FILE, JSON.stringify(donations, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(donations);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
