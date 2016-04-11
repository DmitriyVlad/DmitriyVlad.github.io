define(
	'View',
	[],
	function() {
		return function View(model) {
			var self = this;

			function init () {
				var todo = tmpl($('#todo-template').html());

				$('body').append(todo);

				self.elements = {
					input: $('.todo__input'),
					btnAdd: $('.todo__btn-add'),
					todoList: $('.todo__list'),
					todoHeader: $('.todo__header')
				};

				self.renderList(model.data, model.counter);
			}

			self.renderList = function(data, counter) {
				var list = tmpl($('#list-template').html(), {data: data});
				var pending = tmpl($('#counter').html(), {counter});

				self.elements.todoList.html(list);
				self.elements.todoHeader.html(pending);
			}

			init();
		}
	}
);