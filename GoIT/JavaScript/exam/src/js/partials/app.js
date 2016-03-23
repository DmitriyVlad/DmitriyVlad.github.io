$(function() {
	$('.jcarousel')
		.jcarousel({
			animation: 'slow',
			wrap: 'circular'
		});
	// 	.jcarouselAutoscroll({
	// 		interval: 3000,
	// 		target: '+=1',
	// 		autostart: true
	// });

	$('.jcarousel-control-prev')
		.on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '-=1'
	});

	$('.jcarousel-control-next')
		.on('jcarouselcontrol:active', function() {
			$(this).removeClass('inactive');
		})
		.on('jcarouselcontrol:inactive', function() {
			$(this).addClass('inactive');
		})
		.jcarouselControl({
			target: '+=1'
	});

	var queryWord = '';

	function renderImages(queryWord) {
		$.ajax({
			type: 'GET',
			dataType: 'json',
			cache: false,
			url: 'http://api.pixplorer.co.uk/image?word=' + queryWord + '&amount=7&size=tb',
			success: function (data) {
				console.log(data);

				var html = $('#ideas-tmpl').html();
				var content = tmpl( html, {
					data: data.images
				});

				$('.grid').remove();
				$('.ideas .wrapper').append(content);

				$('.grid').isotope({
					itemSelector: '.grid-item',
					layoutMode: 'masonry',
					masonry: {
						gutter: 20
					}
				});
			}
		});
	}

	$('.search__button').on('click', function(e) {
		e.preventDefault();
		var query = $('.search__input');
		renderImages(encodeURIComponent( query.val() ));
		query.val('');
	});

	renderImages();
});