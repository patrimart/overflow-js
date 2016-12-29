
var Benchmark = require('benchmark');
var Overflow = require('../lib').Overflow;

var suite = new Benchmark.Suite;

var o = 31;
var oi = Overflow.int(31);
var ol = Overflow.long(31);
var ob = Overflow.big128(31);

// add tests 
suite.add('Regular multiplication', function() {

    o = o * 313;

})
.add('Overflow.int.times', function() {

    oi = oi.times(313);

})
.add('Overflow.long.times', function() {

    ol = ol.times(313);

})
.add('Overflow.big.times', function() {

    ob = ob.times(313);

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
