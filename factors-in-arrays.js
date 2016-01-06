(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  }
  else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  }
  else {
    root.returnExports = factory();
  }
})(this, function () {
  function findFactorsInArray(arr) {
    if (arr.constructor !== Array) {
      throw new Error('Argument must be an array');
    }
    var output = {};

    for (var i=0, len=arr.length; i<len; i++) {
      // skip if already exists
      if (output[arr[i]]) continue;
      var elem = output[arr[i]] = []

      for (var j=0; j<len; j++) {
        // If it's a factor 
        // and not equal to itself 
        // and not already in array
        if (arr[i] % arr[j] === 0 &&
            arr[i] !== arr[j] &&
            elem.indexOf(arr[j]) === -1) {

          elem.push(arr[j]);
        }
      }
    }

    return output;
  }
  return findFactorsInArray;
})
