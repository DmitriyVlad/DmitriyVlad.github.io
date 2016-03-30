	// AJAX

$(function() {

	$('#searcher-id').on('submit', function(e) {
		var query = $('.searcher__text').val();

		e.preventDefault();
		$('.gs-result').remove();

		if (query.length) {
			$.ajax({
				url: 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&key=ABQIAAAACKQaiZJrS0bhr9YARgDqUxQBCBLUIYB7IF2WaNrkYqF0tBovNBQFDtM_KNtb3xQxWff2mI5hipc3lg&rsz=large&q=' + query + '&callback=GoogleCallback&context=?',
				dataType: 'jsonp'
			});
		}

		return false;
	});
});

function GoogleCallback(func, data) {

	console.log(data);

	var gsResult = $('#query-results').html();
	$('.wrapper').append( tmpl(gsResult, data) );
	
	// var resultObject = {};
	// var gsResult = $('#query-results').html();

	// for (var i = 0; i < data.results.length; i++) {
	// 	resultObject.visUrl = data.results[i].visibleUrl;
	// 	resultObject.url = data.results[i].url;
	// 	resultObject.title = data.results[i].title;
	// 	resultObject.content = data.results[i].content;
		// $('.wrapper').append( tmpl(gsResult, data) );
};

// 2 часть - OOP

// конструктор Human
function Human() {
	this.name = 'name';
	this.age = 0;
	this.sex = 'sex';
	this.height = 0;
	this.weight = 0;
}

// конструктор Worker
function Worker() {	
	this.name = 'Ivan';
	this.workPlace = 'Epam';
	this.salary = 1500;
}

// Наследование 
Worker.prototype = new Human();

// Методы Worker
Worker.prototype.work = function() {
	console.log(this.name + ' is working!');
}

// конструктор Student
function Student() {
	this.name = 'Taras';
	this.university = 'NTUU "KPI"';
	this.grants = '825';
}

// Наследование
Student.prototype = new Human();

// Методы Student
Student.prototype.watchFargo = function() {
	console.log(this.name + ' is watching Fargo!');
}

var worker = new Worker();
var student = new Student();

console.log('human', new Human() );
console.log('worker', worker);
console.log('student', student);

console.log(worker.name);
console.log(worker.sex);
console.log(worker.weight);
worker.work();

console.log(student.university);
console.log(student.grants);
student.watchFargo();
