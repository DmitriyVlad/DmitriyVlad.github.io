module.exports = function pow(x, n) {
	var result = 1;

	if (n < 0) {
		return('n < 0');
	} else {

		for (var i = 0; i < n; i++) {
		result *= x;
		}

		return result;
	}
};
