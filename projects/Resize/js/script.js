$(function() {
  var prevTextWidth, currentTextWidth;
  var text = $('.text');
  var textWidth = text.width();
  var displayWidth = $(window).width();

  console.log(textWidth);
  console.log(displayWidth)

  if (displayWidth >= 320 && displayWidth <= 380) {
    text.css({'color': 'red'});
  }

  $(window).resize(function() {
    prevTextWidth = currentTextWidth;
    currentTextWidth = text.width();

    if (currentTextWidth < textWidth && prevTextWidth === currentTextWidth) {
      text.css({'color' : 'red'});
    } else {
      text.css({'color' : 'grey'});
    }

    console.log(prevTextWidth);
    console.log(currentTextWidth);
  });

});






