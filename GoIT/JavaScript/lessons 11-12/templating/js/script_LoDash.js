$(function() {

	var profile = $('#profile').html();
	var data = {
			title: 'Галимов Дмитрий Владиславович',
			photo: 'http://cs407031.vk.me/v407031896/9691/Pvsjk0wy6bU.jpg',
			student: 'Студент КПИ',
			frontend: 'Хочу учить фронтенд, потому что:',
			frontendItem1: 'Виден результат работы',
			frontendItem2: 'Возможность фрилансить',
			frontendItem3: 'Перспективная отрасль',
			phoneNumber: 'Мой контактный телефона <br> +380999001495',
			myWebSite: 'Мой профиль вконтакте'
		};
	var tmpl = _.template(profile);
	var content = tmpl(data);

	$('body').append(content);
});