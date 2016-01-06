var chai = require('chai');
var factorsInArrays = require('../factors-in-arrays');
var expect = chai.expect;

describe('Factors In Arrays', function() {
  it('should find all of the factors', function() {
    input = [10, 5, 2, 20];
    expectedOutput = { 10: [5, 2], 5: [], 2: [], 20: [10, 5, 2] };

    expect(factorsInArrays(input)).to.deep.equal(expectedOutput);
  });

  it('should only put the factor in one time when there are duplicates', function() {
    input = [10, 5, 5, 2, 20];
    expectedOutput = { 10: [5, 2], 5: [], 2: [], 20: [10, 5, 2] };

    expect(factorsInArrays(input)).to.deep.equal(expectedOutput);
  });
});
