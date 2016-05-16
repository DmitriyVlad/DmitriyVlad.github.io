$(function() {
  var stickyTopOffset = $('.sticky').offset().top;

  $(window).on('scroll', function() {
    $('.sticky').toggleClass('sticky_fixed', $(this).scrollTop() > stickyTopOffset);
  });
});