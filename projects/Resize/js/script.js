$(function() {
  // var prevTextWidth, currentTextWidth;
  // var text = $('.text');
  // var textWidth = text.width();
  // var displayWidth = $(window).width();

  // console.log('textWidth: ' + textWidth);
  // console.log('displayWidth: ' + displayWidth)

  // if (displayWidth >= 320 && displayWidth <= 380) {
  //   text.css({'color': 'red'});
  // }

  // $(window).resize(function() {
  //   prevTextWidth = currentTextWidth;
  //   currentTextWidth = text.width();

  //   if (currentTextWidth < textWidth && prevTextWidth === currentTextWidth) {
  //     text.css({'color' : 'red'});
  //   } else {
  //     text.css({'color' : 'grey'});
  //   }

  //   console.log('prevTextWidth: ' + prevTextWidth);
  //   console.log('currentTextWidth: ' + currentTextWidth);
  // });

  var left = $('.left'),
      right = $('.right'),
      leftWidth = left.width(),
      rightWidth = right.width() - 1,
      prevLeftWidth,
      prevRightWidth;

  if (leftWidth < rightWidth || leftWidth > rightWidth + 3) {
    $('.text').css({'color': 'red'});
  }

  $(window).resize(function() {
    leftWidth = left.width();
    rightWidth = right.width();

    if (leftWidth < rightWidth - 1 || leftWidth > rightWidth + 2) {
      $('.text').css({'color': 'red'});
    } else {
      $('.text').css({'color': 'grey'});
    }

    console.log('leftWidth: ' + leftWidth);
    console.log('rightWidth: ' + rightWidth);
  });

  console.log(leftWidth);
  console.log(rightWidth);
});






