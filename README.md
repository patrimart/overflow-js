
[![Build Status](https://travis-ci.org/patrimart/overflow-js.svg?branch=master)](https://travis-ci.org/patrimart/overflow-js)
[![Coverage Status](https://coveralls.io/repos/github/patrimart/overflow-js/badge.svg?branch=master)](https://coveralls.io/github/patrimart/overflow-js?branch=master)
[![GitHub version](https://badge.fury.io/gh/patrimart%2Foverflow-js.svg)](https://badge.fury.io/gh/patrimart%2Foverflow-js)
[![npm version](https://badge.fury.io/js/overflow-js.svg)](https://badge.fury.io/js/overflow-js)

# Overflow JS

A TypeScript/JavaScript library for simple overflow math with 64-bit and 32-bit numbers.

This library includes a hash code helper that is similar to many Java hashCode() generators.


## Installation

Install via npm:

`npm install overflow-js`


## Usage

Importing with TypeScript:

```ts
import { Overflow } from "overflow-js";

const num = Overflow.int();

```

Using NodeJS require():
```js
var Overflow = require("overflow-js").Overflow;

var num = Overflow.int();
```

For the browser:
```html
<script src="node_modules/dist/overflow.min.js"></script>
<script>
    var num = Overflow.int();
</scritp>
```

## A Quick Example
The library is fairly simple, so a quick example is likely all you'll need:
```ts
import { Overflow } from "overflow-js";

// Initializes a 32-bit number with a zero value.
const num = Overflow.int();
// Fluent interface for chaning.
num.plus(10).minus(3).times(10).divide(2);
// Retrieve the current value with the "value" property.
console.log(`The current value is ${num.value}`);
// Overrides Object.prototype.valueOf()
const num2 = num + 20;
```

## API Docs

### The `IOverflow` Interface
All "Overflow" classes implements the `IOverflow` interface.
```ts
interface IOverflow {
    value: number;
    valueOf (): number;
    plus (v: number): this;
    minus (v: number): this;
    times (v: number): this;
    divide (v: number): this;
}
```

### The `Overflow` Namespace.
The `Overflow` namespace supplies a all of the convenience initializers you'll need to use the library.

#### `Overflow.int (value=0): IOveflow`
Initializes a 32-bit number with a zero value.

#### `Overflow.long (value=0): IOverflow`
Initializes a 64-bit number with a zero value.

#### `Overflow.custom (value: number, MIN_SAFE_VALUE:number, MAX_SAFE_VALUE:number): IOverflow`
Initializes a 64-bit number with a zero value and user-defined overflow thresholds.

#### `Overflow.Min(): IOverflow`
Initializes a 32-bit number with a value of -2147483648.
#### `Overflow.Max(): IOverflow`
Initializes a 32-bit number with a value of 2147483647.
#### `Overflow.Zero(): IOverflow`
Initializes a 32-bit number with a value of 0.
#### `Overflow.HashCode(): OverflowHashCode`
Initializes the 32-bit hashcode helper with a value of 1 and a multiplier of 31.

#### `Overflow.MinLong(): IOverflow`
Initializes a 34-bit number with a value of `Number.MIN_SAFE_INTEGER`.
#### `Overflow.MaxLong(): IOverflow`
Initializes a 64-bit number with a value of `Number.MAX_SAFE_INTEGER`.
#### `Overflow.ZeroLong(): IOverflow`
Initializes a 64-bit number with a value of 0.
#### `Overflow.HashCodeLong(): OverflowHashCode`
Initializes the 64-bit hashcode helper with a value of 1 and a multiplier of 31.

### The HashCode Helper Library
The `IOverflowHashCode` interface:
```ts
interface IOverflowHashCode {
    value: number;
    valueOf (): number;
    of (...args: (string | number | string[] | number[])[]): this;
}
```

Example using `Overflow` namespace:
```ts
import { Oveflow } from "oveflow-js";

const hashcode = Overflow.HashCode();
hashcode.of("abcdefg");
hashcode.of(12);
hashcode.of(["abc", "def", "ghi"]);
hashcode.of([1, 2, 3, 4]);
console.log(`HashCode is ${hashcode.value}.`);
// The above is equivalent to...
hashcode.of("abcdefg", 12, ["abc", "def", "ghi"], [1, 2, 3, 4]);
```

Example using `OverflowHashCode` with custom values:
```ts
import { OverflowHashCode } from "overflow-js/OverflowHashCode";

/**
 * Initializes the class.
 * @param {number} [seed=1] - the initial value.
 * @param {number} [PRIME=31] - the prime multiplier.
 * @param {number} [isInt=true] - If true, 32-bit; else 64-bit.
 */
const hashcode = new OverflowHashCode(31, 17, false);
```

## Benchmarks
This kind of library has endless opportunities for optimization. As of `v0.3.1`, no great effort has been invested into optimization. Tips, suggestions and contributions are always welcome.

Here are the current version benchmarks for `v0.3.1`:
```bash
$ node test-benchmarks/addition.js 
Regular plus/minus x 38,508,258 ops/sec ±5.66% (81 runs sampled)
Overflow.int.plus/minus x 14,165,406 ops/sec ±3.70% (82 runs sampled)
Overflow.long.plus/minus x 3,390,859 ops/sec ±4.56% (77 runs sampled)

$ node test-benchmarks/multiplication.js 
Regular multiplication x 75,953,518 ops/sec ±3.44% (86 runs sampled)
Overflow.int.times x 1,897,824 ops/sec ±5.11% (89 runs sampled)
Overflow.long.times x 12,711 ops/sec ±6.03% (72 runs sampled)

$ node test-benchmarks/hashcode.js 
Overflow.HashCode x 397,131 ops/sec ±6.42% (84 runs sampled)
Overflow.HashCodeLong x 9,128 ops/sec ±8.43% (69 runs sampled)
```


