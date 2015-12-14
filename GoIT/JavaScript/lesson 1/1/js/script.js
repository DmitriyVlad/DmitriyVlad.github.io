var x = +prompt('Введите значение х', 'поле для ввода'),
n = +prompt('Введите степень n', 'поле для ввода');

if (n < 0) {
	alert('Введите значение степеня больше 0');
} else {
	console.log( pow(x, n) );
}

function pow(x, n) {
	var result = 1;

	for (var i = 0; i < n; i++) {
		result *= x;
	}

	return result;
}