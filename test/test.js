var nearlyEqual = nearlyEqual || require("../nearlyEqual");
var assert = assert || require("assert");

describe('nearlyEqual', function(){
  describe('Regular large numbers - generally not problematic', function(){
    it('should return true for nearly equal values', function(){
      assert.equal(true, nearlyEqual(1000000, 1000001));
      assert.equal(true, nearlyEqual(1000001, 1000000));
    });

    it('should return false for not nearly equal values', function(){
      assert.equal(false, nearlyEqual(10000, 10001));
      assert.equal(false, nearlyEqual(10001, 10000));
    });
  });

  describe('Negative large numbers', function(){
    it('should return true for nearly equal values', function(){
      assert.equal(true, nearlyEqual(-1000000, -1000001));
      assert.equal(true, nearlyEqual(-1000001, -1000000));
    });

    it('should return false for not nearly equal values', function(){
      assert.equal(false, nearlyEqual(-10000, -10001));
      assert.equal(false, nearlyEqual(-10001, -10000));
    });
  });

  describe('Numbers around 1', function(){
    it('should return true for nearly equal values', function(){
      assert.equal(true, nearlyEqual(1.0000001, 1.0000002));
      assert.equal(true, nearlyEqual(1.0000002, 1.0000001));
    });

    it('should return false for not nearly equal values', function(){
      assert.equal(false, nearlyEqual(1.0002, 1.0001));
      assert.equal(false, nearlyEqual(1.0001, 1.0002));
    });
  });

  describe('Numbers around -1', function(){
    it('should return true for nearly equal values', function(){
      assert.equal(true, nearlyEqual(-1.000001, -1.000002));
      assert.equal(true, nearlyEqual(-1.000002, -1.000001));
    });

    it('should return false for not nearly equal values', function(){
      assert.equal(false, nearlyEqual(-1.0001, -1.0002));
      assert.equal(false, nearlyEqual(-1.0002, -1.0001));
    });
  });

  describe('Numbers between 1 and 0', function(){
    it('should return true for nearly equal values', function(){
      assert.equal(true, nearlyEqual(0.000000001000001, 0.000000001000002));
      assert.equal(true, nearlyEqual(0.000000001000002, 0.000000001000001));
    });

    it('should return false for not nearly equal values', function(){
      assert.equal(false, nearlyEqual(0.000000000001002, 0.000000000001001));
      assert.equal(false, nearlyEqual(0.000000000001001, 0.000000000001002));
    });
  });

  describe('Numbers between -1 and 0', function(){
    it('should return true for nearly equal values', function(){
      assert.equal(true, nearlyEqual(-0.000000001000001, -0.000000001000002));
      assert.equal(true, nearlyEqual(-0.000000001000002, -0.000000001000001));
    });

    it('should return false for not nearly equal values', function(){
      assert.equal(false, nearlyEqual(-0.000000000001002, -0.000000000001001));
      assert.equal(false, nearlyEqual(-0.000000000001001, -0.000000000001002));
    });
  });

  describe('Comparisons involving zero', function(){
    it('should return true for zero values', function(){
      assert.equal(true, nearlyEqual(0.0, 0.0));
      assert.equal(true, nearlyEqual(0.0, -0.0));
      assert.equal(true, nearlyEqual(-0.0, -0.0));
    });

    it('should return true for 0.0 and 1e-310 with epsilon=0.01', function(){
      assert.equal(true, nearlyEqual(0.0, 1e-310, 0.01)); // fail
    });
    it('should return true for 1e-310 and 0.0 with epsilon=0.01', function(){
      assert.equal(true, nearlyEqual(1e-310, 0.0, 0.01)); // fail
    });
    it('should return true for 0.0 and -1e-310 with epsilon=0.1', function(){
      assert.equal(true, nearlyEqual(0.0, -1e-310, 0.1)); // fail
    });
    it('should return true for -1e-310 and 0.0 with epsilon=0.1', function(){
      assert.equal(true, nearlyEqual(-1e-310, 0.0, 0.1)); // fail
    });

    it('should return false for not nearly equal values', function(){
      assert.equal(false, nearlyEqual(0.00000001, 0.0));
      assert.equal(false, nearlyEqual(0.0, 0.00000001));
      assert.equal(false, nearlyEqual(-0.00000001, 0.0));
      assert.equal(false, nearlyEqual(0.0, -0.00000001));

      assert.equal(false, nearlyEqual(1e-40, 0.0, 0.000001));
      assert.equal(false, nearlyEqual(0.0, 1e-40, 0.000001));

      assert.equal(false, nearlyEqual(-1e-40, 0.0, 0.00000001));
      assert.equal(false, nearlyEqual(0.0, -1e-40, 0.00000001));
    });
  });

  describe('Comparisons involving infinities', function(){
    it('should return true for nearly equal values', function(){
      assert.equal(true, nearlyEqual(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY));
      assert.equal(true, nearlyEqual(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY));
    });

    it('should return false for not nearly equal values', function(){
      assert.equal(false, nearlyEqual(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY));
      assert.equal(false, nearlyEqual(Number.POSITIVE_INFINITY, Number.MAX_VALUE));
      assert.equal(false, nearlyEqual(Number.NEGATIVE_INFINITY, -Number.MAX_VALUE));
    });
  });

  describe('Comparisons involving NaN values', function(){
    it('should return false for comparisons with NaN values', function(){
      assert.equal(false, nearlyEqual(NaN, NaN));
      assert.equal(false, nearlyEqual(NaN, 0.0));
      assert.equal(false, nearlyEqual(-0.0, NaN));
      assert.equal(false, nearlyEqual(NaN, -0.0));
      assert.equal(false, nearlyEqual(0.0, NaN));
      assert.equal(false, nearlyEqual(NaN, Number.POSITIVE_INFINITY));
      assert.equal(false, nearlyEqual(Number.POSITIVE_INFINITY, NaN));
      assert.equal(false, nearlyEqual(NaN, Number.NEGATIVE_INFINITY));
      assert.equal(false, nearlyEqual(Number.NEGATIVE_INFINITY, NaN));
      assert.equal(false, nearlyEqual(NaN, Number.MAX_VALUE));
      assert.equal(false, nearlyEqual(Number.MAX_VALUE, NaN));
      assert.equal(false, nearlyEqual(NaN, -Number.MAX_VALUE));
      assert.equal(false, nearlyEqual(-Number.MAX_VALUE, NaN));
      assert.equal(false, nearlyEqual(NaN, Number.MIN_VALUE));
      assert.equal(false, nearlyEqual(Number.MIN_VALUE, NaN));
      assert.equal(false, nearlyEqual(NaN, -Number.MIN_VALUE));
      assert.equal(false, nearlyEqual(-Number.MIN_VALUE, NaN));
    });
  });

  describe('Comparisons of numbers on opposite sides of 0', function(){
    it('should return true for 10 * Number.MIN_VALUE and 10 * -Number.MIN_VALUE', function(){
      assert.equal(true, nearlyEqual(10 * Number.MIN_VALUE, 10 * -Number.MIN_VALUE)); // fail
    });

    it('should return false for not nearly equal values', function(){
      assert.equal(false, nearlyEqual(1.000000001, -1.0));
      assert.equal(false, nearlyEqual(-1.0, 1.000000001));
      assert.equal(false, nearlyEqual(-1.000000001, 1.0));
      assert.equal(false, nearlyEqual(1.0, -1.000000001));
      assert.equal(false, nearlyEqual(1e11 * Number.MIN_VALUE, 5e11 * -Number.MIN_VALUE));
    });
  });

  describe('The really tricky part - comparisons of numbers very close to zero.', function(){
    it('should return true for Number.MIN_VALUE and -Number.MIN_VALUE', function(){
      assert.equal(true, nearlyEqual(Number.MIN_VALUE, -Number.MIN_VALUE)); //fail
    });
    it('should return true for -Number.MIN_VALUE and Number.MIN_VALUE', function(){
      assert.equal(true, nearlyEqual(-Number.MIN_VALUE, Number.MIN_VALUE)); // fail
    });
    it('should return true for Number.MIN_VALUE and 0', function(){
      assert.equal(true, nearlyEqual(Number.MIN_VALUE, 0)); // fail
    });
    it('should return true for 0 and Number.MIN_VALUE', function(){
      assert.equal(true, nearlyEqual(0, Number.MIN_VALUE)); // fail
    });
    it('should return true for -Number.MIN_VALUE and 0', function(){
      assert.equal(true, nearlyEqual(-Number.MIN_VALUE, 0)); // fail
    });
    it('should return true for 0 and -Number.MIN_VALUE', function(){
      assert.equal(true, nearlyEqual(0, -Number.MIN_VALUE)); // fail
    });

    it('should return false for not nearly equal values', function(){
      assert.equal(false, nearlyEqual(0.000000001, -Number.MIN_VALUE));
      assert.equal(false, nearlyEqual(0.000000001, Number.MIN_VALUE));
      assert.equal(false, nearlyEqual(Number.MIN_VALUE, 0.000000001));
      assert.equal(false, nearlyEqual(-Number.MIN_VALUE, 0.000000001));
    });
  });
});
