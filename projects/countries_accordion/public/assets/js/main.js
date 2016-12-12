$(function() {

  var data = [
    {
      "title": "United Kingdom",
      "text": "The United Kingdom of Great Britain and Northern Ireland, commonly known as the United Kingdom (UK) or Britain, is a sovereign state in Europe."
    },
    {
      "title": "France",
      "text": "France, officially the French Republic (French: R\u00e9publique fran\u00e7aise), is a unitary sovereign state comprising territory in western Europe and several overseas regions and territories."
    },
    {
      "title": "Spain",
      "text": "Spain (Spanish: Espa\u00f1a), officially the Kingdom of Spain (Spanish: Reino de Espa\u00f1a), is a sovereign state located on the Iberian Peninsula in southwestern Europe."
    },
    {
      "title": "Germany",
      "text": "Germany, officially the Federal Republic of Germany (German: Bundesrepublik Deutschland), is a federal parliamentary republic in western-central Europe."
    }
  ];

  // Sort data in alphabetic order
  var countries = data.sort(function(a, b) {
    if (a.title > b.title) return 1;
    if (a.title < b.title) return -1;
    return 0;
  });

  var countriesAccord = $('.countries-accordion');
  var countriesAccordBody = $('.countries-accordion__body');
  renderCountries();

  // Change the sorting order
  $('.countries-accordion__sort-btn').on('click', function(e) {
    e.preventDefault();

    $(this).toggleClass('countries-accordion__sort-btn_rotate');
    countries.reverse();
    renderCountries();
  });

  // Accordion
  countriesAccord.on('click', function(event) {
    var target = jQuery(event.target);

    while (target[0] !== this) {
      if (target.hasClass('fa-trash-o')) {
        var currentTitle = target.closest('.countries-accordion__title').find('span').html();

        countries.forEach(function(country, index) {
          if (country.title === currentTitle) {
            countries.splice(index, 1);
          }
        });
        renderCountries();

        return;
      }

      if (target.hasClass('countries-accordion__title')) {
        target.next('p').slideToggle('fast');
        target.toggleClass('countries-accordion__title_active');
      }

      target = target.parent();
    }
  });

  function renderCountries() {
    countriesAccordBody.html('');
    countries.forEach(function(country) {
      countriesAccordBody.append('\
        <div class="countries-accordion__title">\
          <span>' + country.title + '</span>\
          <span class="countries-accordion__delete">\
            <i class="fa fa-trash-o" aria-hidden="true"></i>\
          </span>\
        </div>\
        <p class="countries-accordion__text">' + country.text + '</p>\
      ');
    });
  }

});