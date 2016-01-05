$(function () {

	var $links = $('.dropdown');

	$links.hover(
		function() {
			$(this).children('.submenu').animate({opacity: 1, width: '200'}, 200)
			.animate({height: '205'}, 500, 'easeOutBounce')
			.animate({backgroundColor:'#EB4E23'}, 400, 'easeOutBack');
		},
		function() {
			$(this).children('.submenu').animate({height: '10', backgroundColor: '#4D3B36'}, 250)
			.animate({width: 0, opacity: 0}, 250);
		}
		);

	// simple animation

	// .animate({height: '10'}, 'fast')
	/*$( '.dropdown' ).hover(
            function(){
                $(this).children('.submenu').slideDown(200);
            },
            function(){
                $(this).children('.submenu').slideUp(200);
            }
        );*/
});