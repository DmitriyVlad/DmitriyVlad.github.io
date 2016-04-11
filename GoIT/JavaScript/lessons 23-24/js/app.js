$(function() {
	var model = new Model();
	var view = new View(model);
	var controller = new Controller(model, view);
});

function Model() {
	var self = this;

	self.data = ['learn HTML', 'learn CSS', 'learn JavaScript', 'learn frameworks'];
	self.counter = self.data.length;

	self.addItem = function(item) {
		if (item.length === 0) {
			return;
		}

		self.data.push(item);
		return self.data;
	};

	self.editItem = function(item, currentItem) {
		var index = self.data.indexOf(item);

		if (currentItem.length === 0) {
			return;
		}

		self.data[index] = currentItem;

		return self.data;
	}

	self.removeItem = function(item) {
		var index = self.data.indexOf(item);

		if (index === -1) {
			return;
		}

		self.data.splice(index, 1);

		return self.data;
	};

	self.countTask = function() {
		self.counter = self.data.length;
	};
}

function View(model) {
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

function Controller(model, view) {
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


