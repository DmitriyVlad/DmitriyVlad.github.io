var names = [];

for (var i = 0; i < 5; i++) {
	names[i] = prompt('Введите имя');
};

var userName = prompt('Введите имя пользователя');

for (var j = 0; j < names.length; j++) {
	if (userName == names[j]) {
		alert(userName + ', вы успешно вошли');
		break;
	} 
};

if (userName != names[j]) {
	alert('Введенное имя пользователя отсутствует');
}



