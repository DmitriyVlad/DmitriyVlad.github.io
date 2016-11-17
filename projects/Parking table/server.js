var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cars = require('./data/cars');

var currentId = 3;

var PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

app.get('/cars', function(req, res) {
  res.send({ cars: cars });
});

// Add cars
app.post('/cars', function(req, res) {
  var carParams = {};
  currentId++;

  req.body.forEach(function(param) {
    carParams[param.name] = param.value;
  });

  cars.push({
    id: currentId,
    carNumber: carParams['car_number'],
    carBrand: carParams['car_brand'],
    fullName: carParams['full_name'],
    phone: carParams.phone,
    arrivalDate: carParams['arrival_date']
  });

  res.send('Successfully add car!');
});

// Delete cars
app.delete('/cars', function(req, res) {
  var checkedCars = req.body;

  for (var i = 0; i < checkedCars.length; i++) {
    cars.forEach(function(car, index) {
      if (car.id === Number(checkedCars[i])) {
        cars.splice(index, 1);
      }
    });
  }

  res.send('Successfully deleted!');
});

// Search cars
app.post('/', function(req, res) {
  console.log(req.body.pattern);
  var pattern = req.body.pattern.toLowerCase();
  var resultCars = [];

  cars.forEach(function(car, index) {
    if (car.carBrand.toLowerCase().indexOf(pattern) !== -1) {
      resultCars.push(car);
    }
  });

  console.log(resultCars);


  res.send({ cars: resultCars });
});

app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});