$(function() {

	var $links = $('.menu li');

	$links.hover(
		function() {
			var linkClass = $(this).attr('class');
			if(linkClass != 'active') {
				$(this).addClass('hover');
			};
		}, 
		function() {
			$('.menu li').removeClass('hover');
		}
	);

	$links.on('click', function(e) {
		e.preventDefault();
		var tabId = $(this).find('a').attr('href');
		$('.menu li').removeClass('active');
		$(this).addClass('active');
		$('.tab').hide();
		$(tabId).show();
	});
});
