
var Benchmark = require('benchmark');
var Overflow = require('../lib').Overflow;

var suite = new Benchmark.Suite;
 
// add tests 
suite.add('Overflow.HashCode', function() {

    const hashCode = Overflow.HashCode;
    hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"])

})
.add('Overflow.HashCodeLong', function() {

    const hashCode = Overflow.HashCodeLong;
    hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"])

})
.add('Overflow.HashCodeBig', function() {

    const hashCode = Overflow.HashCode256;
    hashCode.of(12, "Hello there", [1, 2, 3, 4], ["abc", "def", "ghi"])

})
// add listeners 
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
})
// run async 
.run({ 'async': true });
