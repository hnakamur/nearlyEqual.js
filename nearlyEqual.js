(function(root) {
  'use strict';

  var DEFAULT_EPSILON = 1e-5;

  // See http://en.wikipedia.org/wiki/Double_precision_floating-point_format
  // http://docs.oracle.com/javase/8/docs/api/java/lang/Double.html#MIN_NORMAL
  var MIN_NORMAL = Math.pow(2, -1022); // = 2.2250738585072014e-308

  // Compare two floats are almost equal.
  // Ported to JavaScript from http://floating-point-gui.de/errors/comparison/
  function nearlyEqual(a, b, epsilon) {
    var diff;

    if (a === b) {
      return true;
    }

    if (epsilon === undefined) {
      epsilon = DEFAULT_EPSILON;
    }

    diff = Math.abs(a - b);
    if (a === 0 || b === 0 || diff < MIN_NORMAL) {
      // a or b is zero or both are extreme close.
      // relative error becomes meaningless here.
      // use absolute error.
      return diff < epsilon * MIN_NORMAL;
    } else {
      // use relative error.
      return diff / (Math.abs(a) + Math.abs(b)) < epsilon;
    }
  }

  if (typeof module !== 'undefined') {
    module.exports = nearlyEqual;
  } else {
    root.nearlyEqual = nearlyEqual;
  }
})(this);
