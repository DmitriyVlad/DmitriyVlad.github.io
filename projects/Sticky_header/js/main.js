$(function() {
  var stickyOriginOffset = $('.sticky_origin').offset().top,
      strickyOriginHeight = $('.sticky_origin').css('height'),
      stickyCloneOffset = $('.sticky_clone').offset().top;

      console.log(stickyOriginOffset);
      console.log(strickyOriginHeight);

      var b = stickyCloneOffset -  2 * parseInt(strickyOriginHeight);
      console.log(b);

  $(window).on('scroll', function() {
    if($(this).scrollTop() >= stickyOriginOffset) {
      $('.sticky_origin').addClass('sticky_fixed')

      if($(this).scrollTop() >= b) {
        $('.sticky_origin').removeClass('sticky_fixed');
        $('.sticky_origin').addClass('absolute');
      } else {
        $('.sticky_clone').removeClass('sticky_fixed');
        $('.sticky_origin').removeClass('absolute');
      }
    } else {
      $('.sticky_origin').removeClass('sticky_fixed');
    }
  });
});

// $('.sticky_origin').toggleClass('sticky_fixed', $(this).scrollTop() > stickyOriginOffset);