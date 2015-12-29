$(function() {

	$('input').hover(function() {
		$('span').animate({opacity: 0}, 'fast');
		$(this).parent().next('span').animate({opacity: 1}, 'slow');
	}, function() {
		$(this).parent().next('span').animate({opacity: 0}, 'fast');
	});

	$('button').on('click', function() {
		$('span').animate({opacity: 1}, 'slow');
	});

});