$(function() {

	let info = [
		{
			question: 'Как называют главный .html-файл?',
			answer: [
				'main.html',
				'index.html',
				'page.html'
			],
			correctAnswer: {
				2: true
			}
		},
		{
			question: 'Какой тег используют для вставки аудио?',
			answer: [
				'< audio >',
				'< mp3 >',
				'< sound >'
			],
			correctAnswer: {
				1: true
			}
		},
		{
			question: 'Что такое CSS?',
			answer: [
				'Creative Style Sheets',
				'Cascading Style Sheets',
				'Computer Style Sheets'
			],
			correctAnswer: {
				2: true
			}
		}
	];

	localStorage.setItem('data', JSON.stringify(info));
	const questions = JSON.parse(localStorage.getItem('data'));

	let test = $('#webTest').html();
	let content = tmpl(test, {
		data: questions
	});
	$('.questions').append(content);

	$('.check').on('click', checkAnswer);

	function checkAnswer(e) {
		e.preventDefault();

		let error = false;
		const user = [];
	  
		for (let i = 0; i < questions.length; i++) {
	 		let inputs = $(`.box${i} input:checkbox`);
	  	let userAnswered = {};

	 			for (let k = 0; k < inputs.length; k++) { 
	   		  let checked = inputs[k].checked;
	     		let right = questions[i].correctAnswer[k+1] == true;
	      
	     		if (checked !== right) {
	     			userAnswered[k]=false;
	     		  error = true;   
	     		} else {
	      		userAnswered[k]=true;
	      	}
				};
		
	      user.push(userAnswered);
		};

		function showModal() {
			const $body = $('body');
			const	$modal = $('<div class="modal animation"><h2 class="center-text">Тест ' + (error ? 'не пройден! <span class="try-later">Попробуйте снова!</span>' : 'пройден!' ) + '</h2></div>');
			const	$overlay = $('<div class="overlay"></div>');
			const $buttonClose = $('<button class="btn btn-danger">Close</button>');

			$buttonClose.on('click', hideModal);
			$body.append($overlay);
			$body.append($modal);
			$modal.append($buttonClose);

			function hideModal() {
				$modal.remove();
				$overlay.remove();
			}
		}

		showModal();
	}
});