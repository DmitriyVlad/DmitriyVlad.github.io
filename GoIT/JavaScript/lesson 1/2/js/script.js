var names = [],
userName,
flag = false;

for (var i = 0; i < 5; i++) {
	names[i] = prompt('Введите имя');
};

userName = prompt('Введите имя пользователя');

for (var j = 0; j < names.length; j++) {
	if (userName == names[j]) {
		flag = true;
		break;
	} 
};

if (flag) {
	alert(userName + ', вы успешно вошли');
} else {
	alert('Введенное имя пользователя отсутствует');
}




