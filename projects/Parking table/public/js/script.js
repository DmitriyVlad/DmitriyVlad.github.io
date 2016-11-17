$(function() {

  // GET and render cars from server
  function renderCars() {
    $.ajax({
      url: '/cars',
      contentType: 'application/json',
      success: function(data) {
        var tbody = $('.table__body');
        tbody.html('');

        data.cars.forEach(function(car) {
          tbody.append('\
            <tr class="table__row">\
              <td class="table__col">' + car.id + '</td>\
              <td class="table__col">' + car.carNumber + '</td>\
              <td class="table__col">' + car.carBrand + '</td>\
              <td class="table__col">' + car.fullName + '</td>\
              <td class="table__col">' + car.phone + '</td>\
              <td class="table__col">' + car.arrivalDate + '</td>\
              <td class="table__col"></td>\
              <td class="table__col">\
                <div class="delete-control">\
                  <input type="checkbox" name="delete_car' + car.id + '" id="delete_car' + car.id + '" class="delete-control__check">\
                  <label for="delete_car' + car.id + '" class="delete-control__label"></label>\
                </div>\
              </td>\
            </tr>\
          ');
        });
      }
    });
  }

  renderCars();

  // Add new car - POST request
  $('#create_form').on('submit', function(event) {
    event.preventDefault();
    var params = $(this).serializeArray();

    $.ajax({
      url: '/cars',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(params),
      success: function(response) {
        console.log(response);
        $('#create_form')[0].reset();
        renderCars();
      }
    });
  });

  // Delete car
  $('.button_delete').on('click', function() {
    var inputs = $('.delete-control__check');
    var checkedCars = [];

    inputs.each(function(index, elem) {
      if (elem.checked) {
        checkedCars.push(jQuery(elem).closest('tr').find('td:first').text());
      }
    });

    $.ajax({
      url: '/cars',
      type: 'DELETE',
      contentType: 'application/json',
      data: JSON.stringify(checkedCars),
      success: function(response) {
        console.log(response);
        renderCars();
      }
    });
  });

  // Search cars
  $('#search_form').on('submit', function(event) {
    event.preventDefault();

    $.ajax({
      url: '/',
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ pattern: $('#search_input').val() }),
      success: function(data) {
        var tbody = $('.table__body');
        tbody.html('');

        data.cars.forEach(function(car) {
          tbody.append('\
            <tr class="table__row">\
              <td class="table__col">' + car.id + '</td>\
              <td class="table__col">' + car.carNumber + '</td>\
              <td class="table__col">' + car.carBrand + '</td>\
              <td class="table__col">' + car.fullName + '</td>\
              <td class="table__col">' + car.phone + '</td>\
              <td class="table__col">' + car.arrivalDate + '</td>\
              <td class="table__col"></td>\
              <td class="table__col">\
                <div class="delete-control">\
                  <input type="checkbox" name="delete_car' + car.id + '" id="delete_car' + car.id + '" class="delete-control__check">\
                  <label for="delete_car' + car.id + '" class="delete-control__label"></label>\
                </div>\
              </td>\
            </tr>\
          ');
        });
      }
    });
  });

});