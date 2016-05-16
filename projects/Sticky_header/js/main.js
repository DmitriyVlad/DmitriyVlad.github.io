(function($) {

  $(window).on('scroll', function() {
    if ($(this).scrollTop() > 1) {
      $('.header').addClass('header_sticky');
    } else {
      $('.header').removeClass('header_sticky');
    }
  });
  
//   $(window).scroll(function() {
// if ($(this).scrollTop() > 1){  
//     $('.header').addClass("sticky");
//   }
//   else{
//     $('.header').removeClass("sticky");
//   }
// });
})(jQuery);