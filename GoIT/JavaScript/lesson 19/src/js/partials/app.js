$(function() {

	// Slider
	$('.bxslider').bxSlider({
		mode: 'fade',
		captions: true
	});

	// Banners Accordion

	var $bannerPanel = $('.banners__accordion h3');

	$('.banners__accordion h3').eq(0).addClass('banners__title--active');
	$('.banners__accordion p').eq(0).show();

	$bannerPanel.on('click', function(e) {
		e.preventDefault();
		$(this).next('p').slideToggle('slow')
		.siblings('p:visible').slideUp('fast');
		$(this).toggleClass('banners__title--active');
		$(this).siblings('h3').removeClass('banners__title--active');
	});
});
