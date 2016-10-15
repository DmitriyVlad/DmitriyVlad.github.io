$(function() {
  // slider
  var pixelOffset = 400,
  currentLeftValue = 0,
  elementsList = $('.slider__list'),
  index = 0;

  $('.slider__pagination__btn').on('click', function() {
    if ( $(this).hasClass('active') ) return;

    $(this).addClass('active').siblings().removeClass('active');

    var currentIndex = $(this).index();

    if (currentIndex > index) {
      currentLeftValue -= (currentIndex - index) * pixelOffset;
    } else {
      currentLeftValue += (index - currentIndex) * pixelOffset;
    }

    $('.slide').removeClass('slide_active').eq(currentIndex).addClass('slide_active');
    $('.pager__item').removeClass('pager-active').eq(currentIndex).addClass('pager-active');

    elementsList.animate({left: currentLeftValue + "px"}, 500);
    index = currentIndex;
  });

  $('.pager__item').on('click', function(e) {
    e.preventDefault();
    if ( $(this).hasClass('pager-active') ) return;

    $(this).addClass('pager-active').siblings().removeClass('pager-active');

    var currentIndex = $(this).index();

    if (currentIndex > index) {
      currentLeftValue -= (currentIndex - index) * pixelOffset;
    } else {
      currentLeftValue += (index - currentIndex) * pixelOffset;
    }

    $('.slider__pagination__btn').removeClass('active').eq(currentIndex).addClass('active');
    $('.slide').removeClass('slide_active').eq(currentIndex).addClass('slide_active');

    elementsList.animate({left: currentLeftValue + "px"}, 500);
    index = currentIndex;
  });
});
