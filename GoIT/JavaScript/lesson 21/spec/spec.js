var pow = require('../js/app.js');

describe("pow function", function() {
  it("should returns x raised to the power of n", function() {
  	// prepare
  	var result;
  	
  	// act
  	result = pow(5,2);

  	// assert
  	expect(result).toBe(25);
  });

  it("should returns x raised to the power of n", function() {
  	// prepare
  	var result;
  	
  	// act
  	result = pow(0,2);

  	// assert
  	expect(result).toBe(0);
  });

  it("should returns 'n < 0' ", function() {
  	// prepare
  	var result;
  	
  	// act
  	result = pow(5,-2);

  	// assert
  	expect(result).toBe('n < 0');
  });
});
