
var Benchmark = require('benchmark');
var Overflow = require('../lib').Overflow;

var suite = new Benchmark.Suite;

const oi = Overflow.int(31);
const ol = Overflow.long(31);
var o = 31;

// add tests 
suite.add('Regular plus/minus', function() {

    o = o + 12345 + 67890 + 987654321 + 12345 + 67890 + 987654321 + 12345 + 67890 + 987654321;
    o = o - 12345 - 67890 - 987654321 - 12345 - 12345 - 67890 - 987654321 - 12345 - 12345 - 67890 - 987654321 - 12345;

})
.add('Overflow.int.plus/minus', function() {

    oi.plus(12345).plus(67890).plus(987654321).plus(12345).plus(67890).plus(987654321).plus(12345).plus(67890).plus(987654321);
    oi.minus(12345).minus(67890).minus(987654321).minus(12345).minus(12345).minus(67890).minus(987654321).minus(12345).minus(12345).minus(67890).minus(987654321).minus(12345);

})
.add('Overflow.long.plus/minus', function() {

    ol.plus(12345).plus(67890).plus(987654321).plus(12345).plus(67890).plus(987654321).plus(12345).plus(67890).plus(987654321);
    ol.minus(12345).minus(67890).minus(987654321).minus(12345).minus(12345).minus(67890).minus(987654321).minus(12345).minus(12345).minus(67890).minus(987654321).minus(12345);

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
