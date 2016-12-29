
[![Build Status](https://travis-ci.org/patrimart/overflow-js.svg?branch=master)](https://travis-ci.org/patrimart/overflow-js)
[![Coverage Status](https://coveralls.io/repos/github/patrimart/overflow-js/badge.svg?branch=master)](https://coveralls.io/github/patrimart/overflow-js?branch=master)
[![GitHub version](https://badge.fury.io/gh/patrimart%2Foverflow-js.svg)](https://badge.fury.io/gh/patrimart%2Foverflow-js)
[![npm version](https://badge.fury.io/js/overflow-js.svg)](https://badge.fury.io/js/overflow-js)

# Overflow JS

A TypeScript/JavaScript library for simple overflow math with 8/16/32/53/64/128/256/512/1024/2048-bit whole numbers.

Notes:
- Requires a JS environment that supports Typed Arrays (Int8Array, etc.).
- This library is immutable.
- 64-bit and above numbers are represented as strings.

This library includes hash code helpers that are similar to many Java hashCode() generators.


## Installation

Install via npm:
```
npm i -S overflow-js
```

## Usage

Importing with TypeScript:
```js
import { Overflow } from "overflow-js";

let num = Overflow.int;
```

Using NodeJS require():
```js
var Overflow = require("overflow-js").Overflow;

var num = Overflow.int;
```

For the browser:
```html
<script src="node_modules/dist/overflow.min.js"></script>
<script>
    var num = Overflow.int;
</scritp>
```

## A Quick Example
The library is fairly simple, so a quick example is likely all you'll need:
```js
import { Overflow } from "overflow-js";

// Initializes a 32-bit number with a zero value.
let num = Overflow.int;
// Fluent interface for chaning.
num = num.plus(10).minus(3).times(10).divide(2);
// Retrieve the current value with the "value" property.
console.log(`The current value is ${num.value}`);
// Overrides Object.prototype.valueOf()
const num2 = num + 20;
```

## API Docs

### The `IOverflow` Interface
All "Overflow" classes implements the `IOverflow<T>` interface.
```js
export interface IOverflow <T extends string | number> {

    value: T;
    valueOf (): T;

    byteLength: number;
    isSigned: boolean;
    isNegative: boolean;
    minValue: this;
    maxValue: this;

    equals (v: this | number | T): boolean;
    lessThan (v: this | number | T): boolean;
    greaterThan (v: this | number | T): boolean;

    plus (v: this | number | T): this;
    minus (v: this | number | T): this;
    times (v: this | number | T): this;
    divide (v: this | number | T): this;
    negate (): this;
}
```

### The `Overflow` Namespace.
The `Overflow` namespace supplies a all of the convenience initializers you'll need to use the library.

#### Overflow Functions
##### `Overflow.int (value=0): IOveflow<number>`
Initializes a 32-bit number with a zero value.
##### `Overflow.uint (value=0): IOveflow<number>`
Initializes an unsigned 32-bit number with a zero value.
##### `Overflow.long (value=0): IOverflow<number>`
Initializes a 53-bit number with a zero value.
##### `Overflow.ulong (value=0): IOverflow<number>`
Initializes an unsigned 53-bit number with a zero value, min is `0` and max is `Number.MAX_SAFE_INTEGER`.
##### `Overflow.custom (value: number, MIN_SAFE_VALUE:number, MAX_SAFE_VALUE:number): IOverflow<number>`
Initializes a 53-bit number with a zero value and user-defined overflow thresholds.

Other functions: `byte` (8-bit), `ubyte`, `short` (16-bit), `ushort`, `big64`, `ubig64`, `big128`, `ubig128`, `big256`, `ubig256`, `big512`, `ubig512`, `big1024`, `ubig1024`, `big2048`, `ubig2048`, and `bigInfinity`.


#### Constants
##### `Overflow.Min: IOverflow<number>`
Returns a 32-bit number with a value of -2147483648.
##### `Overflow.Max: IOverflow<number>`
Returns a 32-bit number with a value of 2147483647.
##### `Overflow.MaxU: IOverflow<number>`
Returns an unsigned 32-bit number with a value of 4294967295.
##### `Overflow.Zero: IOverflow<number>`
Returns a 32-bit number with a value of 0.
##### `Overflow.HashCode: IOverflowHashCode<number>`
Returns the 32-bit hashcode helper with a value of 1 and a multiplier of 31.

##### `Overflow.MinLong: IOverflow<number>`
Returns a 53-bit number with a value of `Number.MIN_SAFE_INTEGER`.
##### `Overflow.MaxLong: IOverflow<number>`
Returns a 53-bit number with a value of `Number.MAX_SAFE_INTEGER`.
##### `Overflow.ZeroLong: IOverflow<number>`
Returns a 53-bit number with a value of 0.
##### `Overflow.HashCodeLong: IOverflowHashCode<number>`
Returns the 53-bit hashcode helper with a value of 1 and a multiplier of 31.

##### `Overflow.ZeroInfinity: IOverflow<string>`
Returns a number with no capacity limit.

##### `Overflow.Min8: IOverflow<number>`
Returns a 8-bit number with a value of -128.
##### `Overflow.Max8: IOverflow<number>`
Returns a 8-bit number with a value of 127.
##### `Overflow.MaxU8: IOverflow<number>`
Returns an unsigned 8-bit number with a value of 255.
##### `Overflow.Zero8: IOverflow<number>`
Returns a 8-bit number with a value of 0.

##### `Overflow.Min16: IOverflow<number>`
Returns a 16-bit number with a value of -32768.
##### `Overflow.Max16: IOverflow<number>`
Returns a 16-bit number with a value of 32767.
##### `Overflow.MaxU16: IOverflow<number>`
Returns an unsigned 16-bit number with a value of 65535.
##### `Overflow.Zero16: IOverflow<number>`
Returns a 16-bit number with a value of 0.

For the following "big" number constants, replace `N` with 64, 128, 256, 512, 1024 or 2048.

##### `Overflow.MinN: IOverflow<string>`
Returns a N-bit number with an appropriate minimum value.
##### `Overflow.MaxN: IOverflow<string>`
Returns a N-bit number with an appropriate maximum value.
##### `Overflow.MaxUN: IOverflow<string>`
Returns an unsigned N-bit number with an appropriate value.
##### `Overflow.ZeroN: IOverflow<string>`
Returns a N-bit number with a value of 0.
##### `Overflow.HashCodeN: IOverflowHashCode<string>`
Returns the N-bit hashcode helper with a value of 1 and a multiplier of 31.


### The HashCode Helper Library
The `IOverflowHashCode` interface:
```js
export interface IOverflowHashCode<T extends string | number> {
    value: T;
    seed: T;
    prime: number;
    byteLength: number;
    valueOf (): T;
    of (...args: (string | number | string[] | number[])[]): this;
}
```

Example using `Overflow` namespace:
```js
import { Oveflow } from "oveflow-js";

let hashcode = Overflow.HashCode;
hashcode = hashcode.of("abcdefg");
hashcode = hashcode.of(12);
hashcode = hashcode.of(["abc", "def", "ghi"]);
hashcode = hashcode.of([1, 2, 3, 4]);
console.log(`HashCode is ${hashcode.value}.`);
// The above is equivalent to...
hashcode.of("abcdefg", 12, ["abc", "def", "ghi"], [1, 2, 3, 4]);
hashcode.of("abcdefg", 12, "abc", "def", "ghi", 1, 2, 3, 4);
```

Example using `OverflowHashCode` with custom values:
```js
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

Making this library immutable caused a performance hint, despite attempts at optimization.

Here are the current version benchmarks for `v1.0.0`:
```bash
$ node test-benchmarks/addition.js 
Regular plus/minus x 35,793,502 ops/sec ±3.63% (92 runs sampled)
Overflow.int.plus/minus x 85,940 ops/sec ±0.86% (86 runs sampled)
Overflow.long.plus/minus x 538,329 ops/sec ±0.86% (91 runs sampled)
Overflow.big128.plus/minus x 6,218 ops/sec ±1.67% (83 runs sampled)

$ node test-benchmarks/multiplication.js 
Regular multiplication x 64,838,673 ops/sec ±3.39% (92 runs sampled)
Overflow.int.times x 1,561,430 ops/sec ±2.43% (84 runs sampled)
Overflow.long.times x 196,840 ops/sec ±0.96% (89 runs sampled)
Overflow.big.times x 591 ops/sec ±2.02% (8 runs sampled)

$ node test-benchmarks/hashcode.js 
Overflow.HashCode x 34,488 ops/sec ±0.72% (89 runs sampled)
Overflow.HashCodeLong x 49,007 ops/sec ±0.96% (92 runs sampled)
Overflow.HashCodeBig x 1,404 ops/sec ±0.86% (85 runs sampled)
```

Here are the benchmarks for `v0.3.2`:
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
