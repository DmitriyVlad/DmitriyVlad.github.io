define(
	'Model',
	[],
	function() {
		return function() {
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
	}
);