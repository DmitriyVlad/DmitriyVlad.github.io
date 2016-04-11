define(
	'Controller',
	[],
	function() {
		return function Controller(model, view) {
			var self = this;

			view.elements.btnAdd.on('click', addItem);
			view.elements.todoList.on('click', '.todo__btn_remove', removeItem);
			view.elements.todoList.on('click', '.todo__btn_edit', editItem);

			function addItem() {
				var newItem = view.elements.input.val();
				model.addItem(newItem);
				model.countTask();
				view.renderList(model.data, model.counter);
				view.elements.input.val('');
			}

			function removeItem() {
				var item = $(this).attr('data-value');
				model.removeItem(item);
				model.countTask();
				view.renderList(model.data, model.counter);
			}

			function editItem() {
				var item = $(this).attr('data-value');
				view.elements.input.val(item);
				view.elements.btnAdd.text('Edit')
				.addClass('todo__btn_green')
				.off('click', addItem)
				.on('click', edit);

				function edit(e) {
					var currentItem = view.elements.input.val();
					model.editItem(item, currentItem);
					model.countTask();
					view.renderList(model.data, model.counter);
					view.elements.input.val('');
					view.elements.btnAdd.text('add')
					.removeClass('todo__btn_green')
					.off('click', edit)
					.add('click', addItem);
				}
			}
		}
	}
);