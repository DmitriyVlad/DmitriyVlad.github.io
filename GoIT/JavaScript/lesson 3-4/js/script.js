var app = {
	createElement: function(params) {
		var element = document.createElement(params.tagName);

		if (params.inputType) {
			element.setAttribute('type', params.inputType);
		}

		if (params.inputType === 'submit') {
			if (params.inputValue) {
				element.setAttribute('value', params.inputValue);
			}
		}

		if (params.className) {
			element.className = params.className;
		}

		if (params.content) {
			element.innerHTML = params.content;
		}

		if (params.parentElement) {
			params.parentElement.appendChild(element);
		}

		return element;
	},
	generateQuestions: function(amount, answers) {
		for (var i = 0; i < amount; i++) {
			this.createElement({
				tagName: 'h2',
				content: (i+1) + '. ' + 'Вопрос №' + (i+1),
				className: 'col-md-offset-2',
				parentElement: form
			});
			for (var j = 0; j < answers; j++) {

				var label = this.createElement({
					tagName: 'label',
					content: 'Вариант ответа №' + (j+1),
					className: 'col-md-offset-2',
					parentElement: form
				});

				var checkbox = this.createElement({
					tagName: 'input',
					inputType: 'checkbox',
				});

				label.insertAdjacentElement('afterBegin', checkbox);
			};
		};
	}
}

var body = document.querySelector('body');

var wrap = app.createElement({
	tagName: 'div',
	className: 'container',
	parentElement: body
});

app.createElement({
	tagName: 'h1', 
	className: 'center-block', 
	content: 'Тест по программированию', 
	parentElement: wrap
});

var form = app.createElement ({
	tagName: 'form',
	parentElement: wrap
});

app.generateQuestions(3, 3);

app.createElement({
	tagName: 'input', 
	className: 'btn btn-success btn-lg center-block',  
	inputType: 'submit',
	inputValue: 'Проверить мои результаты',
	parentElement: form
});


