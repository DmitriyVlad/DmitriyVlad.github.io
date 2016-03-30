(function($) {

	$.support.cors = true;

	$(function() {
		$('.jcarousel')
			.jcarousel({
				animation: 'slow',
				wrap: 'circular'
			})
			.jcarouselAutoscroll({
				interval: 5000,
				target: '+=1',
				autostart: true
		});

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


	// AJAX
		var queryWord = '';
		var API_KEY = '2272138-78bddf30ad93af5874e7a0791';
		var page = 1;
		var perPage = 7;

		// function renderImages(queryWord) {
		// 	
		// }
		function renderImages(queryWord) {
			if (document.all && document.documentMode && 8 === document.documentMode || 9 === document.documentMode) {
				var xmlhttp = getXmlHttp()
				xmlhttp.open('GET', 'https://pixabay.com/api/?key=' + API_KEY + '&q=' + queryWord + '&page=' + page + '&per_page=' + perPage + '&image_type=photo', true);
				xmlhttp.onreadystatechange = function() {
					if (xmlhttp.readyState == 4) {
					 if(xmlhttp.status == 200) {
							var data = eval('('+xmlhttp.responseText+')');
							console.log(data);

							var html = $('#ideas-tmpl').html();
							var content = tmpl( html, {
								data: data.hits
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
					}
				};

				xmlhttp.send(null);

				function getXmlHttp(){
					var xmlhttp;
					try {
						xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
					} catch (e) {
						try {
							xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
						} catch (E) {
							xmlhttp = false;
						}
					}
					if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
						xmlhttp = new XMLHttpRequest();
					}
					return xmlhttp;
				}
			} else {
					$.ajax({
						type: 'GET',
						dataType: 'json',
						cache: false,
						url: 'https://pixabay.com/api/?key=' + API_KEY + '&q=' + queryWord + '&page=' + page + '&per_page=' + perPage + '&image_type=photo',
						success: function (data) {
							console.log(data);

							var html = $('#ideas-tmpl').html();
							var content = tmpl( html, {
								data: data.hits
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
		}
		
		$('.search__button').on('click', function(e) {
			e.preventDefault();
			var query = $('.search__input');
			renderImages(encodeURIComponent( query.val() ));
			query.val('');
		});

		renderImages(queryWord);
	});

})(jQuery);