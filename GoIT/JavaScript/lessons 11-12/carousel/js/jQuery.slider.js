(function($) {
	
	$.fn.slider = function() {

		var $carousel = this;
		var $leftArrow = $('.carousel-arrow-left');
		var $rightArrow = $('.carousel-arrow-right'); 

		var pixelsOffset = 345;
		var currentLeftValue = 0;
		var elementsCount = $carousel.find('li').length;
		var minOffset = -((elementsCount - 3) * pixelsOffset);
		var maxOffset = 0;


		$leftArrow.on('click', function() {
			if (currentLeftValue != maxOffset) {
				currentLeftValue += 345;
				$carousel.animate({left: currentLeftValue + 'px'}, 400);
			} else {
				currentLeftValue = minOffset;
				$carousel.animate({left: currentLeftValue + 'px'}, 400);
			}
		});

		$rightArrow.on('click', function() {
			if (currentLeftValue != minOffset) {
				currentLeftValue -= 345;
				$carousel.animate({left: currentLeftValue + 'px'}, 400);
			} else {
				currentLeftValue = 0;
				$carousel.animate({left: currentLeftValue + 'px'}, 400);
			}
		});

		return this;
	}
})(jQuery);