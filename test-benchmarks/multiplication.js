
var Benchmark = require('benchmark');
var Overflow = require('../lib').Overflow;

var suite = new Benchmark.Suite;

var o = 31;
const oi = Overflow.int(31);
const ol = Overflow.long(31);

// add tests 
suite.add('Regular multiplication', function() {

    o = o * 313;

})
.add('Overflow.int.times', function() {

    oi.times(313);

})
.add('Overflow.long.times', function() {

    ol.times(313);

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
