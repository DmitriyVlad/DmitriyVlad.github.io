requirejs.config({
	paths: {
		'jquery': 'http://code.jquery.com/jquery-1.12.0.min'
	},
	shim: {
		'jquery': {
			exports: 'jQuery'
		}
	}
});

require(
	[
		'jquery',
		'tmpl',
		'Model',
		'View',
		'Controller'
	],
	function($, tmpl, Model, View, Controller) {
			var model = new Model();
			var view = new View(model);
			var controller = new Controller(model, view);
	}
);










