(function($) {

  $(window).on('scroll', function() {
    $('.header').toggleClass('header_sticky', $(this).scrollTop() > 0);
  });

// if ($(this).scrollTop() > 1) {
//       $('.header').addClass('header_sticky');
//     } else {
//       $('.header').removeClass('header_sticky');
//     }
})(jQuery);